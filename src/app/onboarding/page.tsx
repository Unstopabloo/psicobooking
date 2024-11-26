'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { onBoarding } from '@/server/actions/onBoarding'

import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox'

export default function OnboardingComponent() {
  const url = process.env.NODE_ENV === 'production' ? 'https://www.psicobooking.vercel.app/privacy-policy' : 'http://localhost:3000/privacy-policy'
  const { user } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = React.useState<"psychologist" | "patient">("psychologist")
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = React.useState(false)

  const handleSubmit = async (formData: FormData) => {
    const res = await onBoarding(formData)
    if (res?.data?.message) {
      // Reloads the user's data from Clerk's API
      await user?.reload()
      router.push('/dashboard')
      toast.success("Registro completado!")
    }
    if (res?.data?.error) {
      toast.error("Hubo un error al completar el proceso de registro. Por favor, inténtalo de nuevo más tarde.")
    }
  }

  return (
    <main className='container mx-auto flex flex-col items-start justify-start gap-12 py-14 px-10 lg:px-60 xl:px-96'>
      <header>
        <Image src="/logo-full.png" alt="logo psicobooking" className='py-10' width={150} height={250} />
        <h1 className="text-3xl text-foreground">Antes de comenzar</h1>
        <p className='text-foreground/75 text-pretty max-w-lg'>Porfavor indicanos si eres un profesional de la salud mental o un usuario de la aplicación</p>
      </header>
      <form action={handleSubmit} className='flex flex-col gap-10'>
        <div className='flex flex-col gap-4'>
          <strong className='font-medium'>¿Eres un profesional de la salud mental?</strong>
          <RadioGroup
            name='role'
            className='flex flex-col md:flex-row items-center gap-4'
            defaultValue="psychologist"
            onValueChange={(value) => setSelectedRole(value as "psychologist" | "patient")}
          >
            {/* Radio card #1 */}
            <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <RadioGroupItem
                value="psychologist"
                id="psychologist"
                aria-describedby="psychologist-description"
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-2">
                <Label htmlFor="psychologist">
                  Si{" "}
                </Label>
                <p id="psychologist-description" className="text-xs text-muted-foreground">
                  Quiero registrarme como un profesional de la salud mental
                </p>
              </div>
            </div>
            {/* Radio card #2 */}
            <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
              <RadioGroupItem
                value="patient"
                id="patient"
                aria-describedby="patient-description"
                className="order-1 after:absolute after:inset-0"
              />
              <div className="grid grow gap-2">
                <Label htmlFor="patient">
                  No{" "}
                </Label>
                <p id="patient-description" className="text-xs text-muted-foreground">
                  Quiero registrarme como un usuario de la aplicación
                </p>
              </div>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Checkbox
              checked={acceptedPrivacyPolicy}
              onCheckedChange={(checked) => setAcceptedPrivacyPolicy(checked as boolean)}
              name="privacy-policy"
              id="privacy-policy"
            />
            <Label htmlFor="privacy-policy">
              Acepto la{" "}
              <a className="underline" href={url} target="_blank">
                política de privacidad
              </a>
            </Label>
          </div>
        </div>

        <Button type="submit" disabled={!acceptedPrivacyPolicy}>Continuar</Button>
      </form>
    </main>
  )
}
