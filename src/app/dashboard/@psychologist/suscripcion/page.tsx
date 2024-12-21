import H1 from "@/components/H1";
import { Container } from "../../_layout-components/container";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/mercado-pago";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function SuscripcionPage() {

  async function suscribir(formData: FormData) {
    "use server"
    console.log("suscribir")

    const email = formData.get("email")
    console.log("email", email)

    const initPoint = await api.user.suscribe(email as string)
    console.log("initPoint", initPoint)
    redirect(initPoint)
  }


  return (
    <Container>
      <header className="pb-8">
        <H1>Suscripción</H1>
        <p className="text-muted-foreground">Aquí podrás ver los datos financieros de tu cuenta.</p>
      </header>
      <section className="flex flex-col items-start justify-center gap-4">
        <form className="flex flex-col items-start justify-center gap-4 bg-card/50 p-4 rounded-md" action={suscribir}>
          <header className="flex flex-col items-start justify-center gap-1">
            <h3 className="font-semibold">Suscribirse a Psicobooking</h3>
            <p className="text-sm text-muted-foreground max-w-[90%] text-pretty">Con una suscripción mensual de $1000, podrás tener acceso a todas las funcionalidades de Psicobooking.</p>
          </header>
          <div className="space-y-2 w-96 pt-6">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Input required id="email" name="email" className="peer pe-9" placeholder="psicobooking@gmail.com" type="email" />
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <Mail size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
          </div>
          <Button type="submit">
            Suscribirse
          </Button>
        </form>
      </section>
    </Container>
  )
}