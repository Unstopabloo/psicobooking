import { Roles } from "@/types/global";
import { zfd } from "zod-form-data"

const roleMapping: Record<string, Roles> = {
  patient: "patient",
  psychologist: "psychologist",
  admin: "admin",
};

export const onBoardingSchema = zfd.formData({
  role: zfd.text().refine((role) => ["patient", "psychologist", "admin"].includes(role)).transform(role => roleMapping[role])
})