"use client"

import { useState, useEffect, useRef, useCallback, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Target,
  Loader2,
  MessageSquare,
  Brain,
  Lightbulb,
  ImageIcon,
  FileUp,
  Figma,
  MonitorIcon,
  CircleUserRound,
  ArrowUpIcon,
  Paperclip,
  PlusIcon,
  XIcon,
  LoaderIcon,
  Command,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/utils/supabase/client"
import VoiceChatInput from "@/components/ui/voice-chat-input"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  isLoading?: boolean
}

interface ExamData {
  totalExams: number
  totalTests: number
  tytAverage: number
  aytAverage: number
  recentExams: Array<{
    id: number
    type: "TYT" | "AYT"
    score: number
    date: string
    subjects: number
  }>
  subjectPerformance: {
    TYT: Array<{
      subject: string
      correct: number
      wrong: number
      percentage: number
    }>
    AYT: Array<{
      subject: string
      correct: number
      wrong: number
      percentage: number
    }>
  }
}

interface ExamResult {
  id: string;
  user_id?: string;
  type: "deneme" | "test";
  examType: "TYT" | "AYT";
  date: string;
  subject?: string;
  topic?: string;
  subjects?: SubjectResult[];
  correct: number;
  wrong: number;
  empty: number;
  total: number;
  score: number;
  created_at?: string;
  updated_at?: string;
}

interface SubjectResult {
  subject: string;
  correct: number;
  wrong: number;
  empty: number;
  total: number;
  net_score: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const adjustHeight = useCallback((reset?: boolean) => {
    const textarea = textareaRef.current
    if (!textarea) return
    if (reset) {
      textarea.style.height = `${minHeight}px`
      return
    }
    textarea.style.height = `${minHeight}px`
    const newHeight = Math.max(
      minHeight,
      Math.min(
        textarea.scrollHeight,
        maxHeight ?? Number.POSITIVE_INFINITY
      )
    )
    textarea.style.height = `${newHeight}px`
  }, [minHeight, maxHeight])
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = `${minHeight}px`
    }
  }, [minHeight])
  useEffect(() => {
    const handleResize = () => adjustHeight()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [adjustHeight])
  return { textareaRef, adjustHeight }
}

const commandSuggestions = [
  { icon: <ImageIcon className="w-4 h-4" />, label: "Clone UI", description: "Generate a UI from a screenshot", prefix: "/clone" },
  { icon: <Figma className="w-4 h-4" />, label: "Import Figma", description: "Import a design from Figma", prefix: "/figma" },
  { icon: <MonitorIcon className="w-4 h-4" />, label: "Create Page", description: "Generate a new web page", prefix: "/page" },
  { icon: <Sparkles className="w-4 h-4" />, label: "Improve", description: "Improve existing UI design", prefix: "/improve" },
]

const rippleKeyframes = `
@keyframes ripple {
  0% { transform: scale(0.5); opacity: 0.6; }
  100% { transform: scale(2); opacity: 0; }
}
`
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = rippleKeyframes
  document.head.appendChild(style)
}

function TypingDots() {
  return (
    <div className="flex items-center ml-1">
      {[1, 2, 3].map((dot) => (
        <motion.div
          key={dot}
          className="w-1.5 h-1.5 bg-white/90 rounded-full mx-0.5"
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: [0.3, 0.9, 0.3],
            scale: [0.85, 1.1, 0.85]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.15,
            ease: "easeInOut",
          }}
          style={{
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)"
          }}
        />
      ))}
    </div>
  )
}

export function ChatInterface() {
  const [messages, setMessages] = useState<{id: string, content: string, sender: "user"|"ai", timestamp: Date}[]>([
    {
      id: "1",
      content: "Merhaba! Ben senin kişisel eğitim asistanın. Sınav sonuçlarını analiz edip sana özel öneriler sunabilirim. Hangi konuda destek istersin? 📚",
      sender: "ai",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [examData, setExamData] = useState<ExamData | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 60, maxHeight: 200 })
  const [inputFocused, setInputFocused] = useState(false)
  const commandPaletteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Supabase'den sınav verilerini çek
    const fetchExamData = async () => {
      const supabase = createClient();
      const { data: userData, error: authError } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) return;
      const { data: examResults, error: examError } = await supabase
        .from("exam_results")
        .select(`*, subjects:exam_subject_results(*)`)
        .eq("user_id", user.id)
        .order("date", { ascending: false });
      if (examError || !examResults) return;
      // TYT/AYT ortalamalarını ve son sınavları hesapla
      const tytExams = examResults.filter((r: any) => r.exam_type === "TYT");
      const aytExams = examResults.filter((r: any) => r.exam_type === "AYT");
      const tytAverage = tytExams.length > 0 ? (tytExams.reduce((acc: number, r: any) => acc + r.total_score, 0) / tytExams.length) : 0;
      const aytAverage = aytExams.length > 0 ? (aytExams.reduce((acc: number, r: any) => acc + r.total_score, 0) / aytExams.length) : 0;
      // Son 3 sınav
      const recentExams = examResults.slice(0, 3).map((r: any) => ({
        id: r.id,
        type: r.exam_type,
        score: r.total_score,
        date: r.date,
        subjects: r.subjects?.length || 0,
      }));
      // Ders performansları (örnek: Türkçe, Matematik, Fen, Sosyal)
      const tytSubjects = ["Türkçe", "Matematik", "Fen Bilimleri", "Sosyal Bilimler"];
      const aytSubjects = ["Matematik", "Fizik", "Kimya", "Biyoloji", "Edebiyat"];
      const subjectPerformance = {
        TYT: tytSubjects.map((subject) => {
          const subjectResults = examResults
            .filter((r: any) => r.exam_type === "TYT" && r.subjects)
            .flatMap((r: any) => r.subjects)
            .filter((s: any) => s.subject === subject);
          const correct = subjectResults.reduce((acc: number, s: any) => acc + (s.correct || 0), 0);
          const wrong = subjectResults.reduce((acc: number, s: any) => acc + (s.wrong || 0), 0);
          const total = subjectResults.reduce((acc: number, s: any) => acc + (s.total || 0), 0);
          const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
          return { subject, correct, wrong, percentage };
        }),
        AYT: aytSubjects.map((subject) => {
          const subjectResults = examResults
            .filter((r: any) => r.exam_type === "AYT" && r.subjects)
            .flatMap((r: any) => r.subjects)
            .filter((s: any) => s.subject === subject);
          const correct = subjectResults.reduce((acc: number, s: any) => acc + (s.correct || 0), 0);
          const wrong = subjectResults.reduce((acc: number, s: any) => acc + (s.wrong || 0), 0);
          const total = subjectResults.reduce((acc: number, s: any) => acc + (s.total || 0), 0);
          const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
          return { subject, correct, wrong, percentage };
        }),
      };
      setExamData({
        totalExams: examResults.filter((r: any) => r.type === "deneme").length,
        totalTests: examResults.filter((r: any) => r.type === "test").length,
        tytAverage,
        aytAverage,
        recentExams,
        subjectPerformance,
      });
    };
    fetchExamData();
  }, []);

  useEffect(() => {
    if (value.startsWith('/') && !value.includes(' ')) {
      setInputFocused(true)
    } else {
      setInputFocused(false)
    }
  }, [value])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const commandButton = document.querySelector('[data-command-button]')
      if (commandPaletteRef.current && 
        !commandPaletteRef.current.contains(target) && 
        !commandButton?.contains(target)) {
        setInputFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Kişiselleştirilmiş prompt fonksiyonu
  const generatePrompt = (userInput: string, data: ExamData | null): string => {
    if (!data) return userInput;
    return `Sen bir eğitim asistanısın. Öğrencinin sınav sonuçlarını analiz edip, kısa ve sohbetvari cevaplar veriyorsun. Gereksiz detaydan kaçın, doğrudan ve motive edici ol. Her cevabın sonunda öğrenciye yeni bir soru veya öneriyle sohbeti devam ettir.

Öğrencinin verileri:
- Toplam Deneme: ${data.totalExams}
- Toplam Test: ${data.totalTests}
- TYT Ortalama: ${data.tytAverage.toFixed(1)}
- AYT Ortalama: ${data.aytAverage.toFixed(1)}
Son sınavlar: ${data.recentExams.map(exam => `${exam.type}: ${exam.score} puan`).join(", ") || "Veri yok"}
TYT Ders Performansları: ${data.subjectPerformance.TYT.map(sub => `${sub.subject}: %${sub.percentage}`).join(", ") || "Veri yok"}
AYT Ders Performansları: ${data.subjectPerformance.AYT.map(sub => `${sub.subject}: %${sub.percentage}`).join(", ") || "Veri yok"}

Öğrencinin sorusu: ${userInput}

Cevabın sonunda öğrenciye yeni bir soru sor veya bir sonraki adım için öneride bulun. Türkçe, samimi ve motive edici bir dil kullan. Emoji kullanabilirsin.`;
  };

  // Mesaj gönderme fonksiyonu (hem text hem voice için kullanılacak)
  const handleSendMessage = async (msg: string) => {
    if (!msg.trim()) return;
    const userMessage = {
      id: Date.now().toString(),
      content: msg,
      sender: "user" as const,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    // Promptu hazırla
    const prompt = generatePrompt(msg, examData);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: prompt }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: "ai" as const,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "Üzgünüm, şu anda yardımcı olamıyorum. Birazdan tekrar dener misin?",
          sender: "ai" as const,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        handleSendMessage(value);
      }
    }
  };

  const quickActions = [
    { text: "Performansımı analiz et", icon: TrendingUp },
    { text: "Çalışma planı öner", icon: BookOpen },
    { text: "Zayıf konularımı göster", icon: Target },
    { text: "Motivasyon mesajı ver", icon: Sparkles },
  ]

  return (
    <div className="min-h-screen flex flex-col w-full items-center justify-center bg-transparent text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-0 relative">
        <motion.div 
          className="relative z-10 space-y-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block"
            >
              <h1 className="text-3xl font-medium tracking-tight bg-clip-text text-gray-900 dark:text-white pb-1">
                Sana nasıl yardımcı olabilirim ?
              </h1>
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-white/20 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            <motion.p 
              className="text-sm text-gray-600 dark:text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sohbete başlayabilirsiniz..
            </motion.p>
          </div>

          <motion.div 
            className="relative w-full min-h-[40vh] max-h-[70vh] backdrop-blur-2xl bg-white/80 dark:bg-white/[0.02] rounded-2xl border border-gray-200 dark:border-white/[0.05] shadow-2xl p-4 sm:p-6"
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="p-0 sm:p-2 md:p-4 space-y-4 max-h-[50vh] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-6 py-3 max-w-6xl break-words whitespace-pre-line",
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4">
              <VoiceChatInput
                onSendMessage={handleSendMessage}
                onVoiceStart={() => console.log("Sesli konuşma başladı")}
                onVoiceStop={(duration) => console.log(`Sesli konuşma durdu: ${duration} sn`)}
                placeholder="Mesajınızı yazın veya sesli mesaj gönderin..."
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isTyping && (
          <motion.div 
            className="fixed bottom-8 mx-auto transform -translate-x-1/2 backdrop-blur-2xl bg-white/[0.02] rounded-full px-4 py-2 shadow-lg border border-white/[0.05]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-center">
                <span className="text-xs font-medium text-white/90 mb-0.5">zap</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span>Asistan yazıyor...</span>
                <TypingDots />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {inputFocused && (
        <motion.div 
          className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 blur-[96px]"
          animate={{
            x: mousePosition.x - 400,
            y: mousePosition.y - 400,
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 150,
            mass: 0.5,
          }}
        />
      )}
    </div>
  )
} 