import { tool as createTool } from 'ai';
import { z } from 'zod';
import { getNextAppointment } from '@/server/db/users';

export const nextAppointmentTool = createTool({
  description: 'Busca la proxima cita del psicologo',
  parameters: z.object({
    psychologistId: z.number(),
  }),
  execute: async function ({ psychologistId }) {
    const { nextAppointment, error } = await getNextAppointment()

    if (error) {
      return { error: error.message }
    }

    return { nextAppointment };
  },
});

export const tools = {
  nextAppointment: nextAppointmentTool,
};
