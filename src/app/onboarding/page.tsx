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

export default function OnboardingComponent() {
  const { user } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = React.useState<"psychologist" | "patient">("psychologist")

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
            <div className={`flex items-center cursor-pointer justify-between gap-3 max-w-md border rounded-lg py-4 ps-4 pe-4 md:pe-12 ${selectedRole === "psychologist" ? "border-primary" : "border-border"}`}>
              <div className='min-w-5'>
                <RadioGroupItem value="psychologist" id="psychologist" />
              </div>
              <Label htmlFor="psychologist" className='text-pretty font-normal cursor-pointer'>
                <strong className='font-medium'>Si,</strong>
                <span className='text-foreground/85'> quiero registrarme como un profesional de la salud mental</span>
              </Label>
            </div>
            <div className={`flex items-center cursor-pointer justify-between gap-3 border max-w-md rounded-lg py-4 ps-4 pe-4 md:pe-12 ${selectedRole === "patient" ? "border-primary" : "border-border"}`}>
              <div className='min-w-5'>
                <RadioGroupItem value="patient" id="patient" />
              </div>
              <Label htmlFor="patient" className='text-pretty font-normal cursor-pointer'>
                <strong className='font-medium'>No,</strong>
                <span className='text-foreground/85'> quiero registrarme como un usuario de la aplicación</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit">Continuar</Button>
      </form>
    </main>
  )
}