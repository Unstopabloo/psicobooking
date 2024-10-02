"use server"

import { eq, sql } from "drizzle-orm"
import { db } from "../db"
import { appointments, users } from "../db/schema"

export async function checkUserExists(id: string): Promise<Boolean> {
  const resultdb = await db.select({ clerk_id: users.clerk_id }).from(users).where(eq(users.clerk_id, id))

  console.log(resultdb)
  return true
}

export async function addExamplePatients() {
  console.log('addExamplePatients')

  const psychologistId = 13;

  const examplePatients = [
    { firstName: 'Ana', lastName: 'García', email: 'ana.garcia@example.com', phone: '123456789', nationality: 'Española', gender: 'female' as const },
    { firstName: 'Carlos', lastName: 'Rodríguez', email: 'carlos.rodriguez@example.com', phone: '987654321', nationality: 'Mexicano', gender: 'male' as const },
    { firstName: 'María', lastName: 'López', email: 'maria.lopez@example.com', phone: '456789123', nationality: 'Argentina', gender: 'female' as const },
    { firstName: 'Juan', lastName: 'Martínez', email: 'juan.martinez@example.com', phone: '789123456', nationality: 'Colombiano', gender: 'male' as const },
    { firstName: 'Laura', lastName: 'Fernández', email: 'laura.fernandez@example.com', phone: '321654987', nationality: 'Chilena', gender: 'female' as const },
    { firstName: 'Pedro', lastName: 'Sánchez', email: 'pedro.sanchez@example.com', phone: '654987321', nationality: 'Peruano', gender: 'male' as const },
    { firstName: 'Sofía', lastName: 'Gómez', email: 'sofia.gomez@example.com', phone: '147258369', nationality: 'Uruguaya', gender: 'female' as const },
    { firstName: 'Diego', lastName: 'Torres', email: 'diego.torres@example.com', phone: '369258147', nationality: 'Ecuatoriano', gender: 'male' as const },
    { firstName: 'Valentina', lastName: 'Ruiz', email: 'valentina.ruiz@example.com', phone: '258369147', nationality: 'Venezolana', gender: 'female' as const },
    { firstName: 'Javier', lastName: 'Herrera', email: 'javier.herrera@example.com', phone: '963852741', nationality: 'Boliviano', gender: 'male' as const },
  ];

  for (const patient of examplePatients) {
    // Insert patient into users table
    const [insertedUser] = await db.insert(users).values({
      clerk_id: sql`(SELECT hex(randomblob(16)))`, // Generate a random clerk_id
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      role: 'patient' as const,
      phone: parseInt(patient.phone),
      nationality: patient.nationality,
      gender: patient.gender,
      birthDay: sql`date('now', '-' || (18 + abs(random()) % 50) || ' years')`, // Random age between 18 and 67
      createdAt: sql`CURRENT_TIMESTAMP`,
    }).returning({ id: users.id });

    // Insert appointment for the patient
    await db.insert(appointments).values({
      psychologistId: psychologistId,
      patientId: insertedUser?.id as number,
      sessionType: Math.random() > 0.5 ? 'online' : 'in-person',
      informedConsent: Math.random() > 0.3, // 70% chance of having informed consent
      state: 'scheduled' as const,
      dateFrom: sql`datetime('now', '+' || (1 + abs(random()) % 30) || ' days', '+' || (9 + abs(random()) % 8) || ' hours')`, // Random date in the next 30 days, between 9 AM and 5 PM
    });
  }

  console.log('Example patients and appointments added successfully.');
}