import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import { testimonials } from "./data/testimonials"

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Öğrencilerimiz Ne Diyor?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Binlerce öğrencinin başarı hikayelerinden sadece birkaçı
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 group relative after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-gradient-to-r after:from-primary/0 after:via-primary/20 after:to-primary/0 after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <CardDescription className="text-foreground italic group-hover:text-primary/90 transition-colors duration-300">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                    {testimonial.role}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
