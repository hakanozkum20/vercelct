import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { features } from "./data/features"

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Neden CoachTale?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Yapay zeka teknolojisi ile desteklenen özellikleriyle başarı hikayanizi yazın
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                  index === 0 && "bg-blue-500/10",
                  index === 1 && "bg-purple-500/10",
                  index === 2 && "bg-green-500/10",
                  index === 3 && "bg-orange-500/10",
                  index === 4 && "bg-red-500/10",
                  index === 5 && "bg-pink-500/10"
                )}>
                  <feature.icon className={cn(
                    "w-6 h-6",
                    index === 0 && "text-blue-500",
                    index === 1 && "text-purple-500",
                    index === 2 && "text-green-500",
                    index === 3 && "text-orange-500",
                    index === 4 && "text-red-500",
                    index === 5 && "text-pink-500"
                  )} />
                </div>
                <CardTitle className="text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 