import { ClinicalHistory } from "@/types/entities"

export async function getClinicalHistories(patientId: number): Promise<{ clinicalHistory: ClinicalHistory[] | undefined, error?: Error }> {
  console.log('get clinical histories')
  try {
    const response = await fetch(`http://localhost:3000/api/clinical-histories?patientId=${patientId}`, {
      next: {
        tags: [`clinical-histories`]
      }
    })

    if (!response.ok) {
      return { clinicalHistory: undefined, error: new Error('Failed to fetch clinical histories') }
    }

    return { clinicalHistory: await response.json() }
  } catch (error) {
    console.error(error)
    return { clinicalHistory: undefined, error: new Error('Error inesperado') }
  }
}