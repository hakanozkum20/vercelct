"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { createBrowserClient } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string | null
  plan_type: "basic" | "standard" | "premium"
  is_admin: boolean
}

interface UserContextType {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createBrowserClient()

  const fetchUserProfile = useCallback(
    async (currentUser: User | null) => {
      if (currentUser) {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", currentUser.id).single()

        if (error) {
          console.error("Error fetching profile:", error)
          setProfile(null)
        } else {
          setProfile(data)
        }
      } else {
        setProfile(null)
      }
      setIsLoading(false)
    },
    [supabase],
  )

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user || null
      setUser(currentUser)
      await fetchUserProfile(currentUser)
    })

    // Initial fetch
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user || null
      setUser(currentUser)
      await fetchUserProfile(currentUser)
    })

    return () => {
      authListener.subscription?.unsubscribe()
    }
  }, [supabase, fetchUserProfile])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error)
    } else {
      setUser(null)
      setProfile(null)
    }
    setIsLoading(false)
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    setIsLoading(true)
    await fetchUserProfile(user)
  }, [fetchUserProfile, user])

  return (
    <UserContext.Provider value={{ user, profile, isLoading, signOut, refreshProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
