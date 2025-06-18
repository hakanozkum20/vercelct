"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen, Plus, TrendingUp, Target, Award, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// TYT-AYT Ders ve Konu Yapısı
const examStructure = {
  TYT: {
    Türkçe: ["Sözcükte Anlam", "Cümlede Anlam", "Paragrafta Anlam", "Yazım Kuralları", "Noktalama İşaretleri"],
    Matematik: ["Temel Kavramlar", "Sayılar", "Cebir", "Geometri", "Veri"],
    "Fen Bilimleri": ["Fizik", "Kimya", "Biyoloji"],
    "Sosyal Bilimler": ["Tarih", "Coğrafya", "Felsefe", "Din Kültürü"],
  },
  AYT: {
    Matematik: ["Fonksiyonlar", "Polinomlar", "Logaritma", "Trigonometri", "Analitik Geometri", "İntegral", "Olasılık"],
    Fizik: ["Kuvvet ve Hareket", "Enerji", "İtme ve Momentum", "Dalgalar", "Elektrik", "Manyetizma", "Modern Fizik"],
    Kimya: [
      "Atom ve Periyodik Sistem",
      "Kimyasal Türler Arası Etkileşimler",
      "Maddenin Halleri",
      "Çözeltiler",
      "Kimyasal Tepkimeler",
      "Enerji Değişimleri",
      "Kimyasal Denge",
    ],
    Biyoloji: [
      "Hücre",
      "Canlıların Temel Bileşenleri",
      "Hücresel Solunum",
      "Fotosentez",
      "Mitoz ve Mayoz",
      "Kalıtım",
      "Ekosistem",
    ],
    Edebiyat: ["Şiir", "Roman", "Hikaye", "Tiyatro", "Deneme", "Dil Bilgisi"],
    Tarih: ["İlk Çağ", "Orta Çağ", "Yeni Çağ", "Yakın Çağ", "Türk Tarihi"],
    Coğrafya: ["Fiziki Coğrafya", "Beşeri Coğrafya", "Ekonomik Coğrafya", "Türkiye Coğrafyası"],
    Felsefe: ["Felsefenin Konusu", "Bilgi Felsefesi", "Ahlak Felsefesi", "Siyaset Felsefesi"],
  },
}

interface SubjectResult {
  subject: string
  correct: number
  wrong: number
  empty: number
  total: number
  net_score: number
}

interface ExamResult {
  id: string
  user_id?: string
  type: "deneme" | "test"
  examType: "TYT" | "AYT"
  date: string
  subject?: string
  topic?: string
  subjects?: SubjectResult[]
  correct: number
  wrong: number
  empty: number
  total: number
  score: number
  created_at?: string
  updated_at?: string
}

export function ExamTracker() {
  const [activeTab, setActiveTab] = useState("add")
  const [examResults, setExamResults] = useState<ExamResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchExamResults = async () => {
      const { data, error: authError } = await supabase.auth.getUser();
      const user = data?.user;

      if (authError || !user) {
        setError("Kullanıcı girişi yapılmamış veya kimlik doğrulama hatası oluştu.");
        setLoading(false);
        return;
      }

      const { data: examData, error: examError } = await supabase
        .from("exam_results")
        .select(`
          *,
          subjects:exam_subject_results(*)
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (examError) {
        console.error("Error fetching exam results:", examError)
        setError("Sınav sonuçları getirilirken bir hata oluştu: " + examError.message)
      } else {
        const mappedResults: ExamResult[] = examData.map((result: any) => ({
          id: result.id,
          user_id: result.user_id,
          type: result.type,
          examType: result.exam_type,
          date: result.date,
          subject: result.subject,
          topic: result.topic,
          subjects: result.subjects ? result.subjects.map((sub: any) => ({
            subject: sub.subject,
            correct: sub.correct,
            wrong: sub.wrong,
            empty: sub.empty,
            total: sub.total,
            net_score: sub.net_score
          })) : undefined,
          correct: result.total_correct,
          wrong: result.total_wrong,
          empty: result.total_empty,
          total: result.total_questions,
          score: result.total_score,
          created_at: result.created_at,
          updated_at: result.updated_at,
        }));
        setExamResults(mappedResults)
      }
      setLoading(false)
    }

    fetchExamResults()
  }, [])

  // Form State
  const [formData, setFormData] = useState({
    type: "",
    examType: "",
    subject: "",
    topic: "",
    correct: "",
    wrong: "",
    empty: "",
    total: "",
  })

  // Deneme için ders bazlı sonuçlar
  const [subjectResults, setSubjectResults] = useState<Record<string, SubjectResult>>({})

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [examToDeleteId, setExamToDeleteId] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Reset subject results when exam type changes
    if (field === "examType" || field === "type") {
      setSubjectResults({})
    }

    // Auto calculate total for test
    if (field === "correct" || field === "wrong" || field === "empty") {
      if (formData.type === "test") {
        const correct = field === "correct" ? Number.parseInt(value) || 0 : Number.parseInt(formData.correct) || 0
        const wrong = field === "wrong" ? Number.parseInt(value) || 0 : Number.parseInt(formData.wrong) || 0
        const empty = field === "empty" ? Number.parseInt(value) || 0 : Number.parseInt(formData.empty) || 0

        setFormData((prev) => ({
          ...prev,
          total: (correct + wrong + empty).toString(),
        }))
      }
    }
  }

  const handleSubjectResultChange = (subject: string, field: string, value: string) => {
    const numValue = Number.parseInt(value) || 0;

    setSubjectResults((prev) => {
      // Ensure all numeric fields are initialized to 0 for a new subject entry
      const existingSubjectData = prev[subject] || {
        subject: subject,
        correct: 0,
        wrong: 0,
        empty: 0,
        total: 0,
        net_score: 0, // Ensure net_score is also initialized
      };

      const updated = {
        ...prev,
        [subject]: {
          ...existingSubjectData,
          [field]: numValue,
        },
      };

      // Auto calculate total for this subject
      const subjectData = updated[subject];
      if (field === "correct" || field === "wrong" || field === "empty") {
        updated[subject] = {
          ...subjectData,
          total: (subjectData.correct || 0) + (subjectData.wrong || 0) + (subjectData.empty || 0),
        };
        // Re-calculate net_score after total is updated
        updated[subject].net_score = calculateScore(updated[subject].correct, updated[subject].wrong, formData.examType);
      }

      return updated;
    });
  }

  const calculateScore = (correct: number, wrong: number, examType: string) => {
    if (examType === "TYT") {
      return (correct - wrong * 0.25) * 4
    } else {
      return (correct - wrong * 0.25) * 4
    }
  }

  const calculateTotalFromSubjects = () => {
    const subjects = Object.values(subjectResults)
    return subjects.reduce(
      (acc, subject) => ({
        correct: acc.correct + (subject.correct || 0),
        wrong: acc.wrong + (subject.wrong || 0),
        empty: acc.empty + (subject.empty || 0),
        total: acc.total + (subject.total || 0),
      }),
      { correct: 0, wrong: 0, empty: 0, total: 0 },
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const { data: userData, error: authError } = await supabase.auth.getUser()
      const user = userData?.user

      if (authError || !user) {
        throw new Error("Kullanıcı girişi yapılmamış veya kimlik doğrulama hatası oluştu.")
      }

      let newResultData: any
      let subjectResultsToInsert: any[] = []

      if (formData.type === "deneme") {
        const totals = calculateTotalFromSubjects()
        const score = calculateScore(totals.correct, totals.wrong, formData.examType)

        newResultData = {
          user_id: user.id,
          type: "deneme",
          exam_type: formData.examType,
          date: new Date().toISOString().split("T")[0],
          total_correct: totals.correct,
          total_wrong: totals.wrong,
          total_empty: totals.empty,
          total_questions: totals.total,
          total_score: score,
        }
        subjectResultsToInsert = Object.values(subjectResults).map((sub) => ({
          subject: sub.subject,
          correct: sub.correct,
          wrong: sub.wrong,
          empty: sub.empty,
          total: sub.total,
          net_score: calculateScore(sub.correct, sub.wrong, formData.examType)
        }))

      } else {
        const correct = Number.parseInt(formData.correct) || 0
        const wrong = Number.parseInt(formData.wrong) || 0
        const empty = Number.parseInt(formData.empty) || 0
        const total = Number.parseInt(formData.total) || 0
        const score = calculateScore(correct, wrong, formData.examType)

        newResultData = {
          user_id: user.id,
          type: "test",
          exam_type: formData.examType,
          date: new Date().toISOString().split("T")[0],
          subject: formData.subject,
          topic: formData.topic,
          total_correct: correct,
          total_wrong: wrong,
          total_empty: empty,
          total_questions: total,
          total_score: score,
        }
      }

      // exam_results tablosuna ekle
      const { data: insertedExamResult, error: insertExamError } = await supabase
        .from("exam_results")
        .insert(newResultData)
        .select()

      if (insertExamError) {
        throw insertExamError
      }

      // Deneme ise ders bazlı sonuçları ekle
      if (formData.type === "deneme" && insertedExamResult && insertedExamResult.length > 0) {
        const examResultId = insertedExamResult[0].id
        const subjectDataWithExamId = subjectResultsToInsert.map(sub => ({
          ...sub,
          exam_result_id: examResultId
        }))

        const { error: insertSubjectsError } = await supabase
          .from("exam_subject_results")
          .insert(subjectDataWithExamId)

        if (insertSubjectsError) {
          throw insertSubjectsError
        }
      }

      // Verileri yeniden çekerek UI'ı güncelle
      const { data: updatedUserData, error: updatedAuthError } = await supabase.auth.getUser();
      const updatedUser = updatedUserData?.user;

      if (updatedAuthError || !updatedUser) {
        setError("Kullanıcı verileri güncellenirken bir hata oluştu.");
        setLoading(false);
        return;
      }

      const { data: updatedExamData, error: updatedExamError } = await supabase
        .from("exam_results")
        .select(`
          *,
          subjects:exam_subject_results(*)
        `)
        .eq('user_id', updatedUser.id) 
        .order('date', { ascending: false });

      if (updatedExamError) {
        console.error("Error fetching updated exam results:", updatedExamError)
        setError("Güncel sınav sonuçları getirilirken bir hata oluştu: " + updatedExamError.message)
      } else {
        const mappedResults: ExamResult[] = updatedExamData.map((result: any) => ({
          id: result.id,
          user_id: result.user_id,
          type: result.type,
          examType: result.exam_type,
          date: result.date,
          subject: result.subject,
          topic: result.topic,
          subjects: result.subjects ? result.subjects.map((sub: any) => ({
            subject: sub.subject,
            correct: sub.correct,
            wrong: sub.wrong,
            empty: sub.empty,
            total: sub.total,
            net_score: sub.net_score
          })) : undefined,
          correct: result.total_correct,
          wrong: result.total_wrong,
          empty: result.total_empty,
          total: result.total_questions,
          score: result.total_score,
          created_at: result.created_at,
          updated_at: result.updated_at,
        }));
        setExamResults(mappedResults);
      }

      // Formu ve state'leri sıfırla
      setFormData({
        type: "",
        examType: "",
        subject: "",
        topic: "",
        correct: "",
        wrong: "",
        empty: "",
        total: "",
      })
      setSubjectResults({})
      setIsDialogOpen(false)

    } catch (err) {
      if (err instanceof Error) {
        console.error("Sınav sonucu eklenirken hata:", err.message);
        setSubmitError(err.message || "Sınav sonucu eklenirken beklenmeyen bir hata oluştu.");
      } else {
        console.error("Sınav sonucu eklenirken bilinmeyen bir hata oluştu:", err);
        setSubmitError("Sınav sonucu eklenirken beklenmeyen bir hata oluştu.");
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!examToDeleteId) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Kullanıcı ID'sini al
      const { data: userData, error: authError } = await supabase.auth.getUser();
      const user = userData?.user;

      if (authError || !user) {
        throw new Error("Kullanıcı girişi yapılmamış veya kimlik doğrulama hatası oluştu.");
      }

      // Silinecek sınav sonucunun tipini kontrol et (deneme mi, test mi)
      const { data: examResultToDelete, error: fetchError } = await supabase
        .from('exam_results')
        .select('type')
        .eq('id', examToDeleteId)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      // Eğer deneme sınavı ise, ilişkili ders sonuçlarını da sil
      if (examResultToDelete.type === 'deneme') {
        const { error: deleteSubjectsError } = await supabase
          .from('exam_subject_results')
          .delete()
          .eq('exam_result_id', examToDeleteId);

        if (deleteSubjectsError) {
          throw deleteSubjectsError;
        }
      }

      // Ana sınav sonucunu sil
      const { error: deleteExamError } = await supabase
        .from('exam_results')
        .delete()
        .eq('id', examToDeleteId);

      if (deleteExamError) {
        throw deleteExamError;
      }

      // UI'ı güncellemek için verileri yeniden çek
      const { data: updatedUserData, error: updatedAuthError } = await supabase.auth.getUser();
      const updatedUser = updatedUserData?.user;

      if (updatedAuthError || !updatedUser) {
        setError("Kullanıcı verileri güncellenirken bir hata oluştu.");
        setLoading(false);
        return;
      }

      const { data: updatedExamData, error: updatedExamError } = await supabase
        .from("exam_results")
        .select(`
          *,
          subjects:exam_subject_results(*)
        `)
        .eq('user_id', updatedUser.id) 
        .order('date', { ascending: false });

      if (updatedExamError) {
        console.error("Error fetching updated exam results:", updatedExamError)
        setError("Güncel sınav sonuçları getirilirken bir hata oluştu: " + updatedExamError.message)
      } else {
        const mappedResults: ExamResult[] = updatedExamData.map((result: any) => ({
          id: result.id,
          user_id: result.user_id,
          type: result.type,
          examType: result.exam_type,
          date: result.date,
          subject: result.subject,
          topic: result.topic,
          subjects: result.subjects ? result.subjects.map((sub: any) => ({
            subject: sub.subject,
            correct: sub.correct,
            wrong: sub.wrong,
            empty: sub.empty,
            total: sub.total,
            net_score: sub.net_score
          })) : undefined,
          correct: result.total_correct,
          wrong: result.total_wrong,
          empty: result.total_empty,
          total: result.total_questions,
          score: result.total_score,
          created_at: result.created_at,
          updated_at: result.updated_at,
        }));
        setExamResults(mappedResults);
      }

      setIsDeleteDialogOpen(false); // Diyaloğu kapat
      setExamToDeleteId(null); // Silinecek ID'yi sıfırla

    } catch (err: any) {
      console.error("Sınav silinirken hata:", err);
      setSubmitError(err.message || "Sınav silinirken beklenmeyen bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubjects = () => {
    if (!formData.examType) return []
    return Object.keys(examStructure[formData.examType as keyof typeof examStructure])
  }

  const getTopics = () => {
    if (!formData.examType || !formData.subject) return []
    const examType = formData.examType as keyof typeof examStructure
    const subject = formData.subject as keyof (typeof examStructure)[typeof examType]
    return examStructure[examType][subject] || []
  }

  const getPerformanceColor = (score: number, total: number) => {
    const percentage = (score / total) * 100
    if (percentage >= 80) return "text-green-600 dark:text-green-400"
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const stats = [
    {
      title: "Toplam Deneme",
      value: examResults.filter((r) => r.type === "deneme").length.toString(),
      icon: BookOpen,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Toplam Test",
      value: examResults.filter((r) => r.type === "test").length.toString(),
      icon: Target,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Ortalama TYT",
      value:
        examResults.filter((r) => r.examType === "TYT").length > 0
          ? (
              examResults.filter((r) => r.examType === "TYT").reduce((acc, r) => acc + r.score, 0) /
              examResults.filter((r) => r.examType === "TYT").length
            ).toFixed(1)
          : "0",
      icon: TrendingUp,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Ortalama AYT",
      value:
        examResults.filter((r) => r.examType === "AYT").length > 0
          ? (
              examResults.filter((r) => r.examType === "AYT").reduce((acc, r) => acc + r.score, 0) /
              examResults.filter((r) => r.examType === "AYT").length
            ).toFixed(1)
          : "0",
      icon: Award,
      color: "text-orange-600 dark:text-orange-400",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">TYT-AYT Takip Sistemi</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Deneme ve test sonuçlarınızı takip edin, performansınızı analiz edin
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Sonuç Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yeni Sınav Sonucu Ekle</DialogTitle>
              <DialogDescription>Deneme veya test sonucunuzu girin ve performansınızı takip edin.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Sınav Türü</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deneme">Deneme</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="examType">Sınav Tipi</Label>
                  <Select value={formData.examType} onValueChange={(value) => handleInputChange("examType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TYT">TYT</SelectItem>
                      <SelectItem value="AYT">AYT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Deneme için ders bazlı giriş */}
              {formData.type === "deneme" && formData.examType && (
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                      {formData.examType} Dersleri
                    </h3>
                    <div className="space-y-4">
                      {getSubjects().map((subject) => (
                        <Card key={subject} className="p-4 bg-slate-50 dark:bg-slate-800/50">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-slate-900 dark:text-white">{subject}</h4>
                            <Badge variant="outline" className="text-xs">
                              Toplam: {subjectResults[subject]?.total || 0}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-3">
                            <div className="space-y-1">
                              <Label className="text-xs">Doğru</Label>
                              <Input
                                type="number"
                                min="0"
                                value={subjectResults[subject]?.correct || ""}
                                onChange={(e) => handleSubjectResultChange(subject, "correct", e.target.value)}
                                className="h-8 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Yanlış</Label>
                              <Input
                                type="number"
                                min="0"
                                value={subjectResults[subject]?.wrong || ""}
                                onChange={(e) => handleSubjectResultChange(subject, "wrong", e.target.value)}
                                className="h-8 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Boş</Label>
                              <Input
                                type="number"
                                min="0"
                                value={subjectResults[subject]?.empty || ""}
                                onChange={(e) => handleSubjectResultChange(subject, "empty", e.target.value)}
                                className="h-8 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Net</Label>
                              <div className="h-8 px-3 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md flex items-center text-sm font-medium">
                                {(
                                  (subjectResults[subject]?.correct || 0) -
                                  (subjectResults[subject]?.wrong || 0) * 0.25
                                ).toFixed(1)}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Deneme Toplamları */}
                    {Object.keys(subjectResults).length > 0 && (
                      <Card className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Deneme Toplamı</h4>
                        <div className="grid grid-cols-5 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                              {calculateTotalFromSubjects().correct}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Doğru</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                              {calculateTotalFromSubjects().wrong}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Yanlış</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                              {calculateTotalFromSubjects().empty}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Boş</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {(
                                calculateTotalFromSubjects().correct -
                                calculateTotalFromSubjects().wrong * 0.25
                              ).toFixed(1)}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Net</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                              {calculateScore(
                                calculateTotalFromSubjects().correct,
                                calculateTotalFromSubjects().wrong,
                                formData.examType,
                              ).toFixed(1)}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Puan</div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {/* Test için tek ders/konu girişi */}
              {formData.type === "test" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Ders</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Ders seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {getSubjects().map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="topic">Konu</Label>
                      <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Konu seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {getTopics().map((topic: string) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="correct">Doğru</Label>
                      <Input
                        id="correct"
                        type="number"
                        min="0"
                        value={formData.correct}
                        onChange={(e) => handleInputChange("correct", e.target.value)}
                        className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wrong">Yanlış</Label>
                      <Input
                        id="wrong"
                        type="number"
                        min="0"
                        value={formData.wrong}
                        onChange={(e) => handleInputChange("wrong", e.target.value)}
                        className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="empty">Boş</Label>
                      <Input
                        id="empty"
                        type="number"
                        min="0"
                        value={formData.empty}
                        onChange={(e) => handleInputChange("empty", e.target.value)}
                        className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total">Toplam</Label>
                      <Input
                        id="total"
                        type="number"
                        min="0"
                        value={formData.total}
                        onChange={(e) => handleInputChange("total", e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        disabled
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={
                    formData.type === "deneme"
                      ? Object.keys(subjectResults).length === 0
                      : !formData.subject || !formData.topic
                  }
                >
                  Kaydet
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-slate-200 dark:border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</CardTitle>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Table */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-white">Sınav Sonuçları</CardTitle>
          <CardDescription>Tüm deneme ve test sonuçlarınızın detaylı listesi</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarih</TableHead>
                <TableHead>Tür</TableHead>
                <TableHead>Sınav</TableHead>
                <TableHead>Ders/Konu</TableHead>
                <TableHead>Doğru</TableHead>
                <TableHead>Yanlış</TableHead>
                <TableHead>Boş</TableHead>
                <TableHead>Toplam</TableHead>
                <TableHead>Net</TableHead>
                <TableHead>Puan</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {examResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{new Date(result.date).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell>
                    <Badge variant={result.type === "deneme" ? "default" : "secondary"}>
                      {result.type === "deneme" ? "Deneme" : "Test"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        result.examType === "TYT"
                          ? "border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
                          : "border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300",
                      )}
                    >
                      {result.examType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {result.type === "deneme" ? (
                      <div>
                        <div className="font-medium">Tüm Dersler</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{result.subjects?.length} ders</div>
                      </div>
                    ) : result.subject ? (
                      <div>
                        <div className="font-medium">{result.subject}</div>
                        {result.topic && (
                          <div className="text-sm text-slate-500 dark:text-slate-400">{result.topic}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400">Genel</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium">
                      {result.correct}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm font-medium">
                      {result.wrong}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-sm font-medium">
                      {result.empty}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{result.total}</TableCell>
                  <TableCell className="font-bold">{(result.correct - result.wrong * 0.25).toFixed(1)}</TableCell>
                  <TableCell>
                    <span className={cn("font-bold", getPerformanceColor(result.score, result.total * 4))}>
                      {result.score.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Menü aç</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Önizle
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setExamToDeleteId(result.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
