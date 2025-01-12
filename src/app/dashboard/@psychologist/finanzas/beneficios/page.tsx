import { Crown } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Container } from "@/app/dashboard/_layout-components/container"
import H1 from "@/components/H1"
import { GoldIcon, BronceIcon, PlataIcon } from "@/components/icons"
import { BenefitsLoader, BenefitsLoaderSkeleton } from "@/components/benefits/beneficios-loader"
import { Suspense } from 'react'

const tiers = [
  {
    name: "Bronce",
    icon: BronceIcon,
    period: "0 a 3 meses",
    active: true
  },
  {
    name: "Plata",
    icon: PlataIcon,
    period: "3 a 6 meses",
    active: true
  },
  {
    name: "Oro",
    icon: GoldIcon,
    period: "6 a 12 meses",
    current: true,
    active: true
  },
  {
    name: "Black",
    icon: Crown,
    period: "12+ meses",
    active: false,
    isBlack: true
  }
]



export default async function BenefitsSection() {
  return (
    <Container className="xl:px-0 2xl:px-0">
      <header className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <H1>Beneficios</H1>
          <p className="text-muted-foreground">
            Accede a los beneficios que tienes segun tu suscripción
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Disponibles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Disponibles</SelectItem>
            <SelectItem value="all">Todos</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <div className="flex gap-8">
        <div className="w-48 space-y-12">
          {tiers.map((tier, index) => {
            return (
              <div
                key={tier.name}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  !tier.active && "opacity-50"
                )}
              >
                <div className={cn(
                  "p-3 rounded-full bg-gray-100",
                  tier.active && "bg-primary/10 border border-primary"
                )}>
                  <tier.icon className={cn(
                    "w-5 h-5",
                    tier.active && tier.name === "Bronce" && "text-orange-500",
                    tier.active && tier.name === "Plata" && "text-blue-500",
                    tier.active && tier.name === "Oro" && "text-yellow-500",
                    tier.active && tier.name === "Black" && "text-black",
                  )} />
                </div>
                <div>
                  <div className="font-medium">{tier.name}</div>
                  <div className="text-sm text-gray-500">{tier.period}</div>
                </div>
                {index < tiers.length - 1 && (
                  <div className={cn(
                    "absolute left-9 mt-28 w-[2px] h-12 bg-gray-200 rounded-xl",
                    tier.active && tiers[index + 1]?.active && "bg-primary",
                  )} />
                )}
              </div>
            )
          })}
        </div>

        {/* Benefits grid */}
        <Suspense fallback={<BenefitsLoaderSkeleton />}>
          <BenefitsLoader />
        </Suspense>
      </div>
    </Container>
  )
}

