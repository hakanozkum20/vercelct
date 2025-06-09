"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart3, Eye, Plus, TrendingUp, BookOpen, Target, Award, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for exam results
const examData = {
  totalExams: 45,
  totalTests: 128,
  tytAverage: 425.5,
  aytAverage: 387.2,
  recentExams: [
    { id: 1, type: "TYT", score: 445.5, date: "2024-01-15", subjects: 4 },
    { id: 2, type: "AYT", score: 398.0, date: "2024-01-14", subjects: 7 },
    { id: 3, type: "TYT", score: 412.0, date: "2024-01-13", subjects: 4 },
    { id: 4, type: "AYT", score: 375.5, date: "2024-01-12", subjects: 7 },
    { id: 5, type: "TYT", score: 438.0, date: "2024-01-11", subjects: 4 },
  ],
  subjectPerformance: {
    TYT: [
      { subject: "Türkçe", correct: 85, wrong: 15, percentage: 85 },
      { subject: "Matematik", correct: 72, wrong: 28, percentage: 72 },
      { subject: "Fen Bilimleri", correct: 78, wrong: 22, percentage: 78 },
      { subject: "Sosyal Bilimler", correct: 81, wrong: 19, percentage: 81 },
    ],
    AYT: [
      { subject: "Matematik", correct: 68, wrong: 32, percentage: 68 },
      { subject: "Fizik", correct: 74, wrong: 26, percentage: 74 },
      { subject: "Kimya", correct: 71, wrong: 29, percentage: 71 },
      { subject: "Biyoloji", correct: 76, wrong: 24, percentage: 76 },
      { subject: "Edebiyat", correct: 79, wrong: 21, percentage: 79 },
    ],
  },
  monthlyProgress: [
    { month: "Ekim", tyt: 380, ayt: 340 },
    { month: "Kasım", tyt: 395, ayt: 355 },
    { month: "Aralık", tyt: 410, ayt: 370 },
    { month: "Ocak", tyt: 425, ayt: 387 },
  ],
}

// Pie Chart Component
function PieChart({ data, title, className }: { data: any[]; title: string; className?: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  const colors = [
    "hsl(160 84% 39%)", // emerald
    "hsl(262 83% 58%)", // violet
    "hsl(45 93% 47%)", // amber
    "hsl(346 77% 49%)", // rose
    "hsl(217 91% 60%)", // blue
    "hsl(142 71% 45%)", // green
    "hsl(280 100% 70%)", // purple
  ]

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100
            const strokeDasharray = `${percentage} ${100 - percentage}`
            const strokeDashoffset = -cumulativePercentage
            cumulativePercentage += percentage

            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={colors[index % colors.length]}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">{total}</div>
            <div className="text-xs text-muted-foreground">Toplam</div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
              <span className="text-foreground">{item.label}</span>
            </div>
            <span className="font-medium text-muted-foreground">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Progress Bar Component
function ProgressBar({ value, max, label, color }: { value: number; max: number; label: string; color: string }) {
  const percentage = (value / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-foreground font-medium">{label}</span>
        <span className="text-muted-foreground">{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function Dashboard() {
  const stats = [
    {
      title: "Toplam Deneme",
      value: examData.totalExams.toString(),
      change: "+12 bu ay",
      changeType: "positive" as const,
      icon: BookOpen,
      color: "accent-emerald",
    },
    {
      title: "Toplam Test",
      value: examData.totalTests.toString(),
      change: "+28 bu ay",
      changeType: "positive" as const,
      icon: Target,
      color: "accent-violet",
    },
    {
      title: "TYT Ortalama",
      value: examData.tytAverage.toFixed(1),
      change: "+15.2 puan",
      changeType: "positive" as const,
      icon: Award,
      color: "accent-amber",
    },
    {
      title: "AYT Ortalama",
      value: examData.aytAverage.toFixed(1),
      change: "+22.8 puan",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "accent-rose",
    },
  ]

  const examTypeData = [
    { label: "TYT Denemeleri", value: 25 },
    { label: "AYT Denemeleri", value: 20 },
    { label: "Konu Testleri", value: 128 },
  ]

  const performanceData = [
    { label: "Mükemmel (80%+)", value: 45 },
    { label: "İyi (60-79%)", value: 78 },
    { label: "Orta (40-59%)", value: 32 },
    { label: "Geliştirilmeli (<40%)", value: 18 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={cn("w-4 h-4", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Sınav Türü Dağılımı</CardTitle>
                <CardDescription>Son 3 aydaki sınav türleriniz</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={examTypeData} title="" />
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Performans Dağılımı</CardTitle>
                <CardDescription>Başarı oranlarınıza göre dağılım</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart data={performanceData} title="" />
              </CardContent>
            </Card>
          </div>

          {/* Subject Performance */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Ders Bazlı Performans</CardTitle>
              <CardDescription>TYT ve AYT derslerindeki başarı oranlarınız</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      TYT
                    </Badge>
                    Temel Yeterlilik Testi
                  </h4>
                  <div className="space-y-4">
                    {examData.subjectPerformance.TYT.map((subject, index) => (
                      <ProgressBar
                        key={index}
                        value={subject.percentage}
                        max={100}
                        label={subject.subject}
                        color="hsl(160 84% 39%)"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      AYT
                    </Badge>
                    Alan Yeterlilik Testi
                  </h4>
                  <div className="space-y-4">
                    {examData.subjectPerformance.AYT.map((subject, index) => (
                      <ProgressBar
                        key={index}
                        value={subject.percentage}
                        max={100}
                        label={subject.subject}
                        color="hsl(262 83% 58%)"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Exams Table */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Son Sınavlar</CardTitle>
                  <CardDescription>Son 5 deneme sonucunuz</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => (window.location.href = "/exam-tracker")}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Tümünü Gör
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tür</TableHead>
                    <TableHead>Puan</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {examData.recentExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            exam.type === "TYT"
                              ? "border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300"
                              : "border-violet-200 text-violet-700 dark:border-violet-800 dark:text-violet-300",
                          )}
                        >
                          {exam.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{exam.score}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(exam.date).toLocaleDateString("tr-TR")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={exam.score > 400 ? "default" : exam.score > 350 ? "secondary" : "outline"}
                          className={
                            exam.score > 400
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                              : exam.score > 350
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                : "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200"
                          }
                        >
                          {exam.score > 400 ? "Mükemmel" : exam.score > 350 ? "İyi" : "Geliştirilmeli"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Monthly Progress */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Aylık İlerleme</CardTitle>
              <CardDescription>Son 4 aydaki ortalama puanlarınız</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examData.monthlyProgress.map((month, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{month.month}</span>
                      <div className="flex gap-4 text-xs">
                        <span className="text-emerald-600">TYT: {month.tyt}</span>
                        <span className="text-violet-600">AYT: {month.ayt}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-emerald-500"
                          style={{ width: `${(month.tyt / 500) * 100}%` }}
                        />
                      </div>
                      <div className="bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-violet-500"
                          style={{ width: `${(month.ayt / 500) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Hızlı İşlemler</CardTitle>
              <CardDescription>Sık kullanılan işlemler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Yeni Deneme Ekle
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="w-4 h-4 mr-2" />
                Test Sonucu Ekle
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Detaylı Analiz
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Çalışma Planı
              </Button>
            </CardContent>
          </Card>

          {/* Study Tips */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Çalışma Önerileri</CardTitle>
              <CardDescription>Performansınıza göre öneriler</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Matematik'e odaklanın</p>
                    <p className="text-xs text-muted-foreground">Son testlerde %72 başarı oranı</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Türkçe performansınız harika</p>
                    <p className="text-xs text-muted-foreground">%85 başarı oranı ile güçlü alanınız</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Düzenli deneme çözün</p>
                    <p className="text-xs text-muted-foreground">Haftalık 2-3 deneme öneriliyor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
