"use server"

import { auth } from "@clerk/nextjs/server"
import { turso } from "../db"
import { psychologistByIdDTO, psychologistsDTO } from "../dtos"

interface GetPsychologistsParams {
  search?: string
}

export async function getPsychologists({ search }: GetPsychologistsParams) {
  const { userId } = auth()

  if (!userId) {
    console.error('Unauthorized')
    throw new Error('Unauthorized')
  }

  const defaultQuery = `SELECT id, first_name, last_name, email, avatar, focus FROM psicobooking_user psy WHERE psy.role = 'psychologist'`
  const searchQuery = `AND (LOWER(psy.first_name) LIKE LOWER(?) OR LOWER(psy.last_name) LIKE LOWER(?) OR psy.focus LIKE ?)`

  try {
    const { rows: defaultRes } = await turso.execute({
      sql: defaultQuery,
      args: []
    })

    console.log('defaultRes', defaultRes)

    let rows
    if (search) {
      console.log('search', search)

      const { rows: sortedRows } = await turso.execute({
        sql: `
          ${defaultQuery}
          ${searchQuery}
        `,
        args: [`%${search}%`, `%${search}%`, `%${search}%`]
      })
      console.log('sortedRows', sortedRows)

      rows = sortedRows
    } else {
      rows = defaultRes
    }

    console.log('rows', rows)

    const psychologists = psychologistsDTO(rows)

    console.log(psychologists)
    return psychologists
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch psychologists')
  }
}

export async function getPsychologistById(id: number) {
  console.log('getPsychologistById', id)
  const { userId } = auth()

  if (!userId) {
    console.error('Unauthorized')
    throw new Error('Unauthorized')
  }

  try {
    const res = await turso.batch([
      {
        sql: `
          select 
            spe.name,
            spe.description
          from psicobooking_psychologist_speciality ssp
          left join psicobooking_speciality spe on spe.id = ssp.speciality_id
          where ssp.user_id = ?;`,
        args: [id]
      },
      {
        sql: `
          SELECT id, first_name, last_name, email, avatar, focus, video_presentation_url, price, country FROM psicobooking_user WHERE id = ?
        `,
        args: [id]
      },
      {
        sql: `
          SELECT day_of_week, hour_from, hour_to, is_online FROM psicobooking_availability WHERE psychologist_id = ?
        `,
        args: [id]
      },
      {
        sql: `
          SELECT state, date_from, date_to FROM psicobooking_appointment WHERE psychologist_id = ? AND state = 'scheduled' AND date_from >= CURRENT_DATE
        `,
        args: [id]
      }
    ])

    if (!res[0]?.columnTypes) {
      console.error('no se encontraron especialidades')
      throw new Error('no se encontraron especialidades')
    }

    if (!res[1]?.columnTypes) {
      console.error('no se encontró el psicólogo')
      throw new Error('no se encontró el psicólogo')
    }

    if (!res[2]?.columnTypes) {
      console.error('no se encontraron disponibilidades')
      throw new Error('no se encontraron disponibilidades')
    }

    if (!res[3]?.columnTypes) {
      console.error('no se encontraron citas')
      throw new Error('no se encontraron citas')
    }

    const specialities = res[0]?.rows
    const psychologist = res[1]?.rows[0]
    const availability = res[2]?.rows
    const appointments = res[3]?.rows

    if (!psychologist) {
      console.error('no se encontró el psicólogo')
      throw new Error('no se encontró el psicólogo')
    }

    if (!specialities) {
      console.error('no se encontraron especialidades')
      throw new Error('no se encontraron especialidades')
    }

    if (!availability) {
      console.error('no se encontraron disponibilidades')
      throw new Error('no se encontraron disponibilidades')
    }

    if (!appointments) {
      console.error('no se encontraron citas')
      throw new Error('no se encontraron citas')
    }

    const data = psychologistByIdDTO(psychologist, specialities, availability, appointments)
    console.log('data', data)
    return data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch psychologist')
  }
}