"use client"

import { useQueryState, parseAsInteger } from 'nuqs'
import { Editor } from '@/components/editor'
import { useClinicalHistory } from '@/server/queries/queries'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function HistorialesMain({ patientId }: { patientId: string }) {
  const [historial, setHistorial] = useQueryState('historial', parseAsInteger.withDefault(0))
  const [editorContent, setEditorContent] = useState('')

  const { data, isLoading } = useClinicalHistory(historial || null)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (historial && historial !== 0) {
      queryClient.invalidateQueries({ queryKey: ['clinical-history', historial] })
    }
  }, [historial, queryClient])

  useEffect(() => {
    if (data?.clinicalHistory?.content) {
      setEditorContent(data.clinicalHistory.content)
    } else {
      setEditorContent('')
    }
  }, [data])

  if (isLoading) {
    return <div className='w-full h-[600px] bg-card/80 animate-pulse duration-1000'></div>
  }

  return (
    <section className="bg-card/30 space-y-10 p-4 rounded-md">
      <h2 className='font-semibold'>Redactar nueva historia clinica</h2>
      <Editor defaultValue={editorContent} currentPatientId={patientId} />
    </section>
  )
}