"use client"

import { createPortal } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Check, ChevronsUpDown, Edit } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { EditProfileSchema } from "@/types/schemas"
import { Gender, PsychologistProfile, SpecialityName } from "@/types/entities"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { es } from "date-fns/locale"
import { useEffect, useState } from "react"
import { countryPhoneCodes } from "@/lib/consts"
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { SPECIALITIES } from "@/lib/consts";
import { Label } from "../ui/label"
import { updateUserProfile } from "@/server/actions/users"

export function EditProfileForm({ profile, specialities }: { profile: PsychologistProfile, specialities: string[] }) {
  const [isCountrySelected, setIsCountrySelected] = useState<string | null>(null)
  const [isStateSelected, setIsStateSelected] = useState<string | null>(null)
  const [selectedSpecialities, setSelectedSpecialities] = useState<Option[]>(SPECIALITIES.filter((speciality) => specialities.includes(speciality.value)).map((speciality) => ({
    label: speciality.label,
    value: speciality.value,
    id: speciality.id
  })))

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      phone: profile.phone || "",
      gender: profile.gender || "",
      birth_day: profile.birth_day ? new Date(profile.birth_day) : undefined,
      country: profile.country || "",
      state: profile.state || "",
      city: profile.city || "",
      street: profile.street || "",
      num_house: profile.num_house || "",
      focus: profile.focus || "",
      specialities: SPECIALITIES.filter((speciality) => specialities.includes(speciality.value)).map((speciality) => ({
        label: speciality.label,
        value: speciality.value,
        id: speciality.id
      }))
    },
  })

  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {

    const profile: Omit<PsychologistProfile, "id" | "avatar" | "nationality" | "created_at" | "video_presentation_url"> = {
      first_name: values.first_name!,
      last_name: values.last_name!,
      email: values.email!,
      phone: values.phone ?? null,
      gender: values.gender as Gender ?? null,
      birth_day: values.birth_day ? format(values.birth_day, "yyyy-MM-dd") : null,
      country: values.country ?? null,
      state: values.state ?? null,
      city: values.city ?? null,
      street: values.street ?? null,
      num_house: values.num_house ?? null,
      focus: values.focus as SpecialityName ?? null,
      specialities: selectedSpecialities.map((speciality) => ({
        id: speciality.id,
        name: speciality.label as SpecialityName,
        description: ""
      }))
    }

    await updateUserProfile(profile)
  }

  let countries = []
  for (let country of countryPhoneCodes) {
    countries.push({
      name: country.name,
      flag: country.flag
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button aria-label="Editar perfil" variant="outline" size="icon" className="bg-transparent">
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Edita tus datos personales y profesionales.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="edit-profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid grid-cols-3 gap-4">
              <h3 className="col-span-3 text-base font-medium text-foreground/85">Información personal</h3>
              <FormField
                control={form.control}
                name="first_name"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Jaime" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="García" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jaime@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormDescription>
                      Sin código de país.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un género" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent >
                        <SelectItem value="male">Masculino</SelectItem>
                        <SelectItem value="female">Femenino</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birth_day"
                render={({ field }) => (
                  <FormItem className="mt-3 flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      {
                        createPortal(
                          <PopoverContent style={{ zIndex: 9999 }} className="rounded-lg bg-card w-auto p-0" align="end">
                            <Calendar
                              isPerfil
                              mode="single"
                              captionLayout="dropdown"
                              fromDate={new Date("1900-01-01")}
                              toDate={new Date()}
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>,
                          document.body
                        )
                      }
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <h3 className="col-span-3 text-base font-medium text-foreground/85">Ubicación</h3>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <Select onValueChange={(value) => {
                      form.setValue("country", value)
                      form.setValue("state", undefined)
                      form.setValue("city", undefined)
                      setIsCountrySelected(value)
                      setIsStateSelected(null)
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un país" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          countries.map((country) => (
                            <SelectItem value={country.name} key={country.name}>
                              <div className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.name}</span>
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado / Provincia</FormLabel>
                    <Select onValueChange={(value) => {
                      form.setValue("state", value)
                      form.setValue("city", undefined)
                      setIsStateSelected(value)
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          countryPhoneCodes.find((country) => country.name === isCountrySelected)?.states.map((state) => (
                            <SelectItem value={state.name} key={state.name}>
                              <span>{state.name}</span>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ciudad</FormLabel>
                    <Select onValueChange={(value) => {
                      form.setValue("city", value)
                    }} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una ciudad" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          countryPhoneCodes.find((country) => country.name === isCountrySelected)?.states.find((state) => state.name === isStateSelected)?.cities.map((city) => (
                            <SelectItem value={city} key={city}>
                              <span>{city}</span>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calle</FormLabel>
                    <FormControl>
                      <Input placeholder="Calle principal" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="num_house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de casa</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="focus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foco principal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un foco" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          SPECIALITIES.map((focus) => (
                            <SelectItem value={focus.value} key={focus.value}>
                              <div className="flex items-center gap-2">
                                <span>{focus.label}</span>
                              </div>
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <Label>Especialidades</Label>
                <MultipleSelector
                  commandProps={{
                    label: "Selecciona especialidades",
                  }}
                  defaultOptions={SPECIALITIES}
                  placeholder="Selecciona especialidades"
                  emptyIndicator={<p className="text-center text-sm">No se encontraron especialidades</p>}
                  value={selectedSpecialities}
                  onChange={(options) => setSelectedSpecialities(options)}
                />
              </div>
            </div>
            <Button className="w-full" type="submit">Guardar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  )
}
