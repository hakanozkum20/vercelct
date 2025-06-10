import { CTA } from "./cta"
import { Features } from "./features"
import { Footer } from "./footer"
import { Header } from "./header"
import { Hero } from "./hero"
import { MobileApp } from "./mobile-app"
import { Pricing } from "./pricing"
import { Testimonials } from "./testimonials"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <MobileApp />
        <CTA />
      </main>
      <Footer />
    </div>
  )
} 