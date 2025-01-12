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
import { ChevronLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { countryPhoneCodes, SPECIALITIES } from '@/lib/consts'
import { Switch } from '@/components/ui/switch'
import { enrollNewPsychologist } from '@/server/actions/users'

interface OnBoardingDataFirstStep {
  role: "psychologist" | "patient"
  acceptedPrivacyPolicy: boolean
}

interface OnBoardingDataPersonal {
  name: string
  lastname: string
  country: string
  phone: string
  dni: string
}

interface OnBoardingDataProfessional {
  studyHouse: string
  studyYear: string
  studyBranch: string
  document: File | undefined
  recommendationLetter?: File | undefined
}

interface OnBoardingDataConduct {
  conductRecord: boolean
  conductRecordDetails?: string | undefined
  consent: boolean
}

export interface OnBoadingData {
  firstStep: OnBoardingDataFirstStep
  personal: OnBoardingDataPersonal
  professional: OnBoardingDataProfessional
  conduct: OnBoardingDataConduct
}

export default function OnboardingComponent() {
  const url = process.env.NODE_ENV === 'production' ? 'https://www.psicobooking.vercel.app/privacy-policy' : 'http://localhost:3000/privacy-policy'
  const { user } = useUser()
  const router = useRouter()
  const [selectedRole, setSelectedRole] = React.useState<"psychologist" | "patient">("psychologist")
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = React.useState(false)
  const [personalData, setPersonalData] = React.useState<OnBoardingDataPersonal>({
    name: '',
    lastname: '',
    country: '',
    phone: '',
    dni: ''
  })
  const [professionalData, setProfessionalData] = React.useState<OnBoardingDataProfessional>({
    studyHouse: '',
    studyYear: '',
    studyBranch: '',
    document: undefined,
    recommendationLetter: undefined
  })
  const [conductData, setConductData] = React.useState<OnBoardingDataConduct>({
    conductRecord: false,
    conductRecordDetails: '',
    consent: false
  })
  const [data, setData] = React.useState<OnBoadingData>({
    firstStep: {
      role: "psychologist",
      acceptedPrivacyPolicy: false
    },
    personal: {
      name: '',
      lastname: '',
      country: '',
      phone: '',
      dni: ''
    },
    professional: {
      studyHouse: '',
      studyYear: '',
      studyBranch: '',
      document: undefined,
      recommendationLetter: undefined
    },
    conduct: {
      conductRecord: false,
      conductRecordDetails: '',
      consent: false
    }
  })
  const [step, setStep] = React.useState(1)

  React.useEffect(() => {
    console.log('data', data)
  }, [data])

  const handleSubmit = async (formData: FormData) => {
    if (step === 1) {
      const role = formData.get('role') as "psychologist" | "patient"

      if (role === 'patient' && acceptedPrivacyPolicy) {
        console.log('eres un paciente')
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
        return
      }

      setData(prev => ({
        ...prev,
        firstStep: {
          role,
          acceptedPrivacyPolicy
        }
      }))
      setStep(2)
    }

    if (step === 2) {
      setData(prev => ({
        ...prev,
        personal: personalData
      }))
      setStep(3)
    }

    if (step === 3) {
      setData(prev => ({
        ...prev,
        professional: professionalData
      }))
      setStep(4)
    }

    if (step === 4) {
      console.log("============= onboarding finished =============")
      console.log('data', data)
      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = error => reject(error)
        })
      }

      const documentBase64 = data.professional.document ?
        await fileToBase64(data.professional.document) : null
      const recommendationBase64 = data.professional.recommendationLetter ?
        await fileToBase64(data.professional.recommendationLetter) : null

      const dataToSend = {
        ...data,
        professional: {
          ...data.professional,
          document: documentBase64,
          recommendationLetter: recommendationBase64
        }
      }

      toast.promise(enrollNewPsychologist(dataToSend), {
        loading: 'Registrando profesional...',
        success: 'Profesional registrado correctamente! Redirigiendo...',
        error: 'Hubo un error al registrar el profesional. Por favor, inténtalo de nuevo más tarde.'
      })

      console.log("proceso de enrollNewPsychologist terminado")
      router.push('/dashboard')
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingStep1
            handleSubmit={handleSubmit}
            setSelectedRole={setSelectedRole}
            setAcceptedPrivacyPolicy={setAcceptedPrivacyPolicy}
            acceptedPrivacyPolicy={acceptedPrivacyPolicy}
            url={url}
          />
        )
      case 2:
        return (
          <OnboardingStep2
            handleSubmit={handleSubmit}
            setStep={setStep}
            step={step}
            personalData={personalData}
            setPersonalData={setPersonalData}
          />
        )
      case 3:
        return (
          <OnboardingStep3
            handleSubmit={handleSubmit}
            setStep={setStep}
            step={step}
            professionalData={professionalData}
            setProfessionalData={setProfessionalData}
          />
        )
      case 4:
        return (
          <OnboardingStep4
            handleSubmit={handleSubmit}
            setStep={setStep}
            step={step}
            conductData={conductData}
            setConductData={setConductData}
          />
        )
      default:
        return null
    }
  }

  const renderTitle = () => {
    switch (step) {
      case 1:
        return 'Antes de comenzar'
      case 2:
        return 'Datos personales'
      case 3:
        return 'Datos profesionales'
      case 4:
        return 'Confirmación'
      default:
        return ''
    }
  }

  const renderDescription = () => {
    switch (step) {
      case 1:
        return 'Porfavor indicanos si eres un profesional de la salud mental o un usuario de la aplicación'
      case 2:
        return 'Por favor, ingresa tus datos personales'
      case 3:
        return 'Por favor, ingresa tus datos profesionales'
      case 4:
        return 'Por favor, confirma tus datos'
      default:
        return ''
    }
  }

  return (
    <main className='container mx-auto flex flex-col items-start justify-start gap-12 py-14 px-10 lg:px-60 xl:px-96'>
      <header>
        <Image src="/logo-full.png" alt="logo psicobooking" className='py-10' width={150} height={250} />
        <h1 className="text-3xl text-foreground">
          {renderTitle()}
        </h1>
        <p className='text-foreground/75 text-pretty max-w-lg'>
          {renderDescription()}
        </p>
      </header>
      {renderStep()}
    </main>
  )
}

function OnboardingStep1({
  handleSubmit,
  setSelectedRole,
  setAcceptedPrivacyPolicy,
  acceptedPrivacyPolicy,
  url
}: {
  handleSubmit: (formData: FormData) => void,
  setSelectedRole: (value: "psychologist" | "patient") => void,
  setAcceptedPrivacyPolicy: (value: boolean) => void,
  acceptedPrivacyPolicy: boolean,
  url: string
}) {
  return (
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
              <p id="psychologist-description" className="text-xs text-muted-foreground min-h-10">
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
              <p id="patient-description" className="text-xs text-muted-foreground min-h-10">
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
  )
}

function OnboardingStep2({
  handleSubmit,
  setStep,
  step,
  personalData,
  setPersonalData
}: {
  handleSubmit: (formData: FormData) => void,
  setStep: (value: number) => void,
  step: number,
  personalData: OnBoardingDataPersonal,
  setPersonalData: (value: OnBoardingDataPersonal) => void
}) {
  const NATIONALITIES = countryPhoneCodes.map((country) => ({
    label: country.name,
    value: country.code,
    flag: country.flag
  }))
  return (
    <form action={handleSubmit} className='flex flex-col gap-10 w-full'>
      <div className='flex flex-col gap-4'>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="name">Nombre</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder='Juan'
              className="rounded-lg border border-input p-2"
              required
              value={personalData.name}
              onChange={(e) => setPersonalData({ ...personalData, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="lastname">Apellidos</Label>
            <Input
              type="text"
              name="lastname"
              id="lastname"
              placeholder='Pérez'
              className="rounded-lg border border-input p-2"
              required
              value={personalData.lastname}
              onChange={(e) => setPersonalData({ ...personalData, lastname: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="country">Nacionalidad</Label>
            <Select
              name="country"
              required
              value={personalData.country}
              onValueChange={(value) => setPersonalData({ ...personalData, country: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu nacionalidad" />
              </SelectTrigger>
              <SelectContent>
                {NATIONALITIES.map((nationality, index) => (
                  <SelectItem className='flex items-center gap-2' key={index} value={nationality.label}>
                    <span className='mr-2'>{nationality.flag}</span>
                    <span>{nationality.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="phone">Teléfono</Label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              className="rounded-lg border border-input p-2"
              required
              placeholder='948873212'
              value={personalData.phone}
              onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
            />
            <small className='text-muted-foreground'>
              Por favor, ingresa tu número de teléfono SIN el código de país.
            </small>
          </div>

          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="dni">DNI/NIE</Label>
            <Input
              type="text"
              name="dni"
              id="dni"
              className="rounded-lg border border-input p-2"
              required
              value={personalData.dni}
              onChange={(e) => setPersonalData({ ...personalData, dni: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        <Button
          className='flex items-center justify-center gap-1'
          variant="outline"
          type="button"
          onClick={() => setStep(step - 1)}
        >
          <ChevronLeft className='w-4 h-4' />
          Volver
        </Button>
        <Button
          type="submit"
          className='flex-1'
          disabled={
            !personalData.name ||
            !personalData.lastname ||
            !personalData.country ||
            !personalData.phone ||
            !personalData.dni
          }
        >
          Continuar
        </Button>
      </div>
    </form>
  )
}

function OnboardingStep3({
  handleSubmit,
  setStep,
  step,
  professionalData,
  setProfessionalData
}: {
  handleSubmit: (formData: FormData) => void,
  setStep: (value: number) => void,
  step: number,
  professionalData: OnBoardingDataProfessional,
  setProfessionalData: (value: OnBoardingDataProfessional) => void
}) {
  return (
    <form action={handleSubmit} className='flex flex-col gap-10 w-full'>
      <div className='flex flex-col gap-4'>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="studyHouse">Casa de estudios</Label>
            <Input
              type="text"
              name="studyHouse"
              id="studyHouse"
              placeholder='Universidad de Granada'
              className="rounded-lg border border-input p-2"
              required
              value={professionalData.studyHouse}
              onChange={(e) => setProfessionalData({ ...professionalData, studyHouse: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="studyYear">Año de finalización de estudios</Label>
            <Input
              type="text"
              name="studyYear"
              id="studyYear"
              placeholder='2024'
              className="rounded-lg border border-input p-2"
              required
              value={professionalData.studyYear}
              onChange={(e) => setProfessionalData({ ...professionalData, studyYear: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="studyBranch">Seleciona tu especialidad</Label>
            <Select
              name="studyBranch"
              required
              value={professionalData.studyBranch}
              onValueChange={(value) => setProfessionalData({ ...professionalData, studyBranch: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu especialidad" />
              </SelectTrigger>
              <SelectContent>
                {SPECIALITIES.map((speciality) => (
                  <SelectItem className='flex items-center gap-2' key={speciality.value} value={speciality.value}>
                    <span>{speciality.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label className='after:content-["*"] after:text-red-500' htmlFor="document">Documento de titulación</Label>
            <Input
              type="file"
              accept=".pdf"
              name="document"
              id="document"
              className="rounded-lg border border-input p-2"
              required
              onChange={(e) => setProfessionalData({ ...professionalData, document: e.target.files![0] })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="recommendationLetter">Carta de recomendación</Label>
            <Input
              type="file"
              accept=".pdf"
              name="recommendationLetter"
              id="recommendationLetter"
              className="rounded-lg border border-input p-2"
              onChange={(e) => setProfessionalData({ ...professionalData, recommendationLetter: e.target.files?.[0] })}
            />
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        <Button
          className='flex items-center justify-center gap-1'
          variant="outline"
          type="button"
          onClick={() => setStep(step - 1)}
        >
          <ChevronLeft className='w-4 h-4' />
          Volver
        </Button>
        <Button
          type="submit"
          className='flex-1'
          disabled={
            !professionalData.studyHouse ||
            !professionalData.studyYear ||
            !professionalData.studyBranch ||
            !professionalData.document
          }
        >
          Continuar
        </Button>
      </div>
    </form>
  )
}

function OnboardingStep4({
  handleSubmit,
  setStep,
  step,
  conductData,
  setConductData
}: {
  handleSubmit: (formData: FormData) => void,
  setStep: (value: number) => void,
  step: number,
  conductData: OnBoardingDataConduct,
  setConductData: (value: OnBoardingDataConduct) => void
}) {
  return (
    <form action={handleSubmit} className='flex flex-col gap-10 w-full'>
      <div className='flex flex-col gap-4'>
        <div className="grid grid-cols-2 gap-6">
          <div className='flex flex-col gap-2'>
            <Label htmlFor="conduct-switch">
              ¿Ha enfrentado alguna acción disciplinaria?
            </Label>
            <div className="relative inline-grid max-w-28 h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
              <Switch
                id="conduct-switch"
                checked={conductData.conductRecord}
                onCheckedChange={(checked) => setConductData({ ...conductData, conductRecord: checked as boolean })}
                className="peer absolute inset-0 h-[inherit] w-auto rounded-lg data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=checked]:[&_span]:translate-x-full rtl:data-[state=checked]:[&_span]:-translate-x-full"
              />
              <span className="min-w-78flex pointer-events-none relative ms-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full rtl:peer-data-[state=unchecked]:-translate-x-full">
                <span className="text-[10px] font-medium uppercase">No</span>
              </span>
              <span className="min-w-78flex pointer-events-none relative me-0.5 items-center justify-center px-2 text-center transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background rtl:peer-data-[state=checked]:translate-x-full">
                <span className="text-[10px] font-medium uppercase">Si</span>
              </span>
            </div>
            <small className='text-muted-foreground'>
              Si has enfrentado alguna acción disciplinaria, por favor, explica en el siguiente campo.
            </small>
          </div>
          <div className={`flex flex-col gap-2 ${conductData.conductRecord ? 'block' : 'hidden'}`}>
            <Label htmlFor="conductRecordDetails">Detalles de la acción disciplinaria</Label>
            <Input
              type="text"
              name="conductRecordDetails"
              id="conductRecordDetails"
              placeholder='Detalles de la acción disciplinaria'
              className="rounded-lg border border-input p-2"
              value={conductData.conductRecordDetails}
              onChange={(e) => setConductData({ ...conductData, conductRecordDetails: e.target.value })}
            />
          </div>
          <div className="col-span-2 my-4 flex items-center gap-2">
            <Checkbox
              onCheckedChange={(checked) => setConductData({ ...conductData, consent: checked as boolean })}
              checked={conductData.consent}
              required
              id="consent"
            />
            <Label htmlFor="consent">
              Autorizo la verificación de mis credenciales
            </Label>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        <Button
          className='flex items-center justify-center gap-1'
          variant="outline"
          type="button"
          onClick={() => setStep(step - 1)}
        >
          <ChevronLeft className='w-4 h-4' />
          Volver
        </Button>
        <Button
          type="submit"
          className='flex-1'
          disabled={!conductData.consent || (conductData.conductRecord && !conductData.conductRecordDetails)}
        >
          Continuar
        </Button>
      </div>
    </form>
  )
}
