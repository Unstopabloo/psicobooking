import { zfd } from "zod-form-data"

export const onBoardingSchema = zfd.formData({
  role: zfd.text().refine((role) => ['paciente', 'psicologo'].includes(role))
})