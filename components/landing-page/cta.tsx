import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CTA() {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80">
            İlk 1000 kullanıcıya özel %50 indirim fırsatını kaçırmayın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
            />
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Hemen Katılın
            </Button>
          </div>
          <p className="text-sm mt-4 text-primary-foreground/60">
            Spam göndermiyoruz. Sadece önemli güncellemeleri paylaşıyoruz.
          </p>
        </div>
      </div>
    </section>
  )
} 