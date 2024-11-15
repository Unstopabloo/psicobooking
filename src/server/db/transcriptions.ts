"server-only"

import { turso } from ".";
import { transcriptionCardDTO, transcriptionContentDTO } from "../dtos";
import { TranscriptionCard, TranscriptionContent } from "@/types/entities";

export async function getTranscriptions(userId: string, limit?: boolean): Promise<TranscriptionCard[]> {
  console.log("getTranscriptions: ");
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const limitQuery = limit ? `LIMIT 6` : "";

    const { rows } = await turso.execute({
      sql: `
        SELECT 
          audio.id,
          audio.appointment_id,
          audio.title,
          audio.is_transcribed,
          users.first_name || ' ' || users.last_name as patient,
          users.avatar as patient_avatar,
          appointments.session_type,
          appointments.date_from
        FROM 
          psicobooking_audio audio
        LEFT JOIN psicobooking_appointment appointments ON audio.appointment_id = appointments.id
        LEFT JOIN psicobooking_user users ON appointments.patient_id = users.id
        LEFT JOIN psicobooking_user psy ON appointments.psychologist_id = psy.id
        WHERE psy.clerk_id = :userId
        ${limitQuery};
      `,
      args: { userId }
    })

    if (!rows) {
      console.error("No rows found");
      return [];
    }

    console.log("rows: ", rows);

    const transcriptions = transcriptionCardDTO(rows);
    console.log("transcriptions: ", transcriptions);

    return transcriptions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTranscriptionContent(transcriptionId: string, userId: string): Promise<TranscriptionContent | null> {
  console.log("getTranscriptionContent: ", transcriptionId, userId);
  if (!userId) {
    throw new Error("User not authenticated");
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          audio.id,
          audio.appointment_id,
          audio.title,
          audio.is_transcribed,
          audio.content,
          users.first_name || ' ' || users.last_name as patient,
          users.avatar as patient_avatar,
          appointments.session_type,
          appointments.date_from
        FROM 
          psicobooking_audio audio
        LEFT JOIN psicobooking_appointment appointments ON audio.appointment_id = appointments.id
        LEFT JOIN psicobooking_user users ON appointments.patient_id = users.id
        LEFT JOIN psicobooking_user psy ON appointments.psychologist_id = psy.id
        WHERE psy.clerk_id = :userId AND audio.id = :transcriptionId
      `,
      args: { userId, transcriptionId }
    })

    if (!rows[0]) {
      console.error("No rows found");
      return null;
    }

    const transcriptionContent = transcriptionContentDTO(rows[0]);
    console.log("transcriptionContent: ", transcriptionContent);

    return transcriptionContent;
  } catch (error) {
    console.error(error);
    return null;
  }
}