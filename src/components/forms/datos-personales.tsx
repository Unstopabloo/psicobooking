"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SinglePatientTicket } from "@/types/entities"
import { countryPhoneCodes } from "@/lib/consts"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { CalendarIcon, CheckIcon, Divide } from "lucide-react"
import { es } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { CaretSortIcon } from "@radix-ui/react-icons"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import React from "react"
import { PatientSchema } from "@/types/schemas"
import { updatePatient } from "@/server/actions/users"
import { Spinner } from "../Loader"

export function DatosPersonalesForm({ patient }: { patient: SinglePatientTicket }) {
  const [isCountrySelected, setIsCountrySelected] = React.useState<string | null>(null)
  const [isStateSelected, setIsStateSelected] = React.useState<string | null>(null)

  const form = useForm<z.infer<typeof PatientSchema>>({
    resolver: zodResolver(PatientSchema),
    defaultValues: {
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      phone: parseInt(patient.phone ?? ''),
      gender: patient.gender ?? undefined,
      birth_day: patient.birth_day ? new Date(patient.birth_day) : undefined,
      ocupation: patient.ocupation ?? undefined,
      country: patient.country ?? undefined,
      state: patient.state ?? undefined,
      city: patient.city ?? undefined,
      street: patient.street ?? undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof PatientSchema>) {
    const res = await updatePatient(data)

    if (res?.data?.error) {
      toast.error("Hubo un error al actualizar los datos", { description: JSON.stringify(res?.data?.error) })
      return
    }

    toast.success("Datos actualizados: ", {
      description: JSON.stringify(res?.data?.data),
      action: <Button onClick={() => {
        window.location.reload()
      }}>Actualizar</Button>
    })
  }

  React.useEffect(() => {
    if (patient.country) {
      setIsCountrySelected(patient.country);
    }
    if (patient.state) {
      setIsStateSelected(patient.state);
    }
  }, [patient.country, patient.state]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 bg-card/35 rounded-xl p-5">
        <section>
          <h2 className="pb-4 font-semibold">Datos personales</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Nombre</FormLabel>
                    <strong className="text-red-500">*</strong>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Apellido</FormLabel>
                    <strong className="text-red-500">*</strong>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birth_day"
              render={({ field }) => (
                <FormItem className="self-end flex flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Dia de nacimiento</FormLabel>
                  </div>
                  <FormMessage />
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
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
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Email</FormLabel>
                    <strong className="text-red-500">*</strong>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="ejemplo@correo.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Genero</FormLabel>
                  </div>
                  <FormMessage />
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un genero" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Femenino</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Telefono</FormLabel>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Numero sin codigo ej: 90423456" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ocupation"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Ocupación</FormLabel>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Abogado, Ingeniero, etc." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </section>
        <section>
          <h2 className="pb-4 font-semibold">Dirección</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="self-end flex flex-col gap-1">
                  <FormLabel>Pais</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Selecciona un pais"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Busca un pais..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No se encontraron paises.</CommandEmpty>
                          <CommandGroup>
                            {countryPhoneCodes.map((country) => (
                              <CommandItem
                                value={country.name}
                                key={country.name}
                                onSelect={() => {
                                  form.setValue("country", country.name)
                                  form.setValue("state", undefined)
                                  form.setValue("city", undefined)
                                  setIsCountrySelected(country.name)
                                }}
                              >
                                {country.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    country.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="self-end flex flex-col gap-1">
                  <FormLabel>Estado / Provincia</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={!isCountrySelected && !field.value}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Selecciona un estado"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Busca un estado..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No se encontraron estados.</CommandEmpty>
                          <CommandGroup>
                            {
                              countryPhoneCodes.find((country) => country.name === isCountrySelected)?.states.map((state) => (
                                <CommandItem
                                  value={state.name}
                                  key={state.name}
                                  onSelect={() => {
                                    form.setValue("state", state.name)
                                    form.setValue("city", undefined)
                                    setIsStateSelected(state.name)
                                  }}
                                >
                                  {state.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      state.name === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="self-end flex flex-col gap-1">
                  <FormLabel>Ciudad</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={!isStateSelected}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value || "Selecciona una ciudad"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Busca una ciudad..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No se encontraron ciudades.</CommandEmpty>
                          <CommandGroup>
                            {
                              countryPhoneCodes.find((country) => country.name === isCountrySelected)?.states.find((state) => state.name === isStateSelected)?.cities.map((city) => (
                                <CommandItem
                                  value={city}
                                  key={city}
                                  onSelect={() => {
                                    form.setValue("city", city)
                                  }}
                                >
                                  {city}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      city === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Calle</FormLabel>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Avenida siempre viva 347" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_house"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between gap-2">
                    <FormLabel>Casa / Depto. / Block</FormLabel>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="1532" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </section>
        <div className="w-full flex justify-end pt-10">
          <Button
            className="w-2/4"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting ? <div className="flex items-center gap-2"><Spinner className="border-t-white" />Guardando...</div> : "Guardar datos"}
          </Button>
        </div>
      </form>
    </Form >
  )
}
