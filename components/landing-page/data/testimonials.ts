export interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: "Ahmet Yılmaz",
    role: "12. Sınıf Öğrencisi",
    content: "TYT puanım 3 ayda 380'den 450'ye çıktı. AI önerileri gerçekten işe yarıyor!",
    rating: 5,
  },
  {
    name: "Zeynep Kaya",
    role: "Mezun Öğrenci",
    content: "Çalışma planım çok daha organize oldu. Hangi konulara odaklanacağımı biliyorum artık.",
    rating: 5,
  },
  {
    name: "Mehmet Demir",
    role: "11. Sınıf Öğrencisi",
    content: "Motivasyon AI'ı sayesinde çalışma disiplinimi koruyabiliyorum. Harika bir uygulama!",
    rating: 5,
  },
] 