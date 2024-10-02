"server-only"

import { db } from "./db";
import { users, appointments } from "./db/schema";
import { eq, and, sql } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { Paciente } from "@/components/table/columns";
import { format, parseISO } from "date-fns";

export type User = typeof users.$inferInsert
type Role = typeof users.$inferSelect["role"]

export async function userExists(id: string): Promise<Boolean> {
  const resultdb = await db.select({ clerk_id: users.clerk_id }).from(users).where(eq(users.clerk_id, id))
  if (resultdb.length > 0) {
    return true
  }

  return false
}

export async function createUser(data: User) {
  try {
    const user = await db.insert(users).values({
      clerk_id: data.clerk_id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatar: data.avatar
    }).returning({ insertedId: users.id })

    return { user }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export async function updateRole(role: Role) {
  console.log('updateRole')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    throw new Error('No user found')
  }

  try {
    const res_id = await db.update(users).set({ role }).where(eq(users.clerk_id, userId)).returning({ updatedId: users.id })
    console.log('res_id', res_id)
    return { res_id }
  } catch (error) {
    console.error(error)
    return { error }
  }
}


// =================== Pacientes ===================
export async function getPatientsWithAppointments(): Promise<{ patientsWithAppointments: Paciente[] | undefined, error?: Error }> {
  console.log('updateRole')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { patientsWithAppointments: undefined, error: new Error('No user found') }
  }

  try {
    const res = await db.select({ id: users.id }).from(users).where(eq(users.clerk_id, userId))

    if (!res[0]) {
      console.log('No user found')
      return { patientsWithAppointments: undefined, error: new Error('No user found') }
    }

    const patientsWithAppointments = await db
      .select({
        id: users.id,
        name: sql<string>`${users.firstName} || ' ' || ${users.lastName}`,
        email: users.email,
        telefono: sql<string>`COALESCE(CAST(${users.phone} AS TEXT), '')`,
        nacionalidad: sql<string>`COALESCE(${users.nationality}, '')`,
        genero: sql<string>`COALESCE(${users.gender}, '')`,
        edad: sql<number>`COALESCE(CAST((julianday('now') - julianday(${users.birthDay})) / 365.25 AS INTEGER), 0)`,
        tipoDeSesion: appointments.sessionType,
        consentimientoInformado: sql<"Firmado" | "Pendiente">`CASE WHEN ${appointments.informedConsent} = 1 THEN 'Firmado' ELSE 'Pendiente' END`,
        appointmentDate: sql<string>`strftime('%Y-%m-%dT%H:%M:%SZ', ${appointments.dateFrom})`,
        appointmentState: appointments.state
      })
      .from(users)
      .innerJoin(appointments, eq(users.id, appointments.patientId))
      .where(
        and(
          eq(users.role, 'patient'),
          eq(appointments.psychologistId, res[0].id)
        )
      )
      .orderBy(appointments.dateFrom);

    // Use a type guard to ensure the fetched data matches the Paciente type
    const isPaciente = (patient: unknown): patient is Paciente => {
      return (
        typeof patient === 'object' &&
        patient !== null &&
        'id' in patient &&
        'name' in patient &&
        'email' in patient &&
        'telefono' in patient &&
        'nacionalidad' in patient &&
        'genero' in patient &&
        'edad' in patient &&
        'tipoDeSesion' in patient &&
        'consentimientoInformado' in patient &&
        'appointmentDate' in patient &&
        'appointmentState' in patient
      );
    };

    const validatedPatients = patientsWithAppointments.map(patient => ({
      ...patient,
      appointmentDate: parseISO(patient.appointmentDate),
      appointmentDateFormatted: format(parseISO(patient.appointmentDate), 'dd/MM/yyyy HH:mm')
    })).filter(isPaciente);

    return { patientsWithAppointments: validatedPatients }
  } catch (error) {
    console.error(error)
    return { patientsWithAppointments: undefined, error: error instanceof Error ? error : new Error('Unknown error') }
  }
}