import { PsychologistProfile } from "@/types/entities";
import Image from "next/image";
import { Button } from "../ui/button";
import { SentIcon } from "@/components/icons";

interface PsychologistCardProps {
  psychologist: Omit<PsychologistProfile, 'specialities' | 'created_at' | 'phone' | 'nationality' | 'gender' | 'birth_day' | 'country' | 'state' | 'city' | 'street' | 'num_house' | 'video_presentation_url' | 'price'>
  selectedPsychologist: number | null
  setSelectedPsychologist: (psychologistId: number) => void
}

export const PsychologistCard = ({
  psychologist,
  selectedPsychologist,
  setSelectedPsychologist
}: PsychologistCardProps) => {
  const { first_name, last_name, avatar, focus } = psychologist
  const fullName = `${first_name} ${last_name}`

  return (
    <article className='relative flex items-end p-3 col-span-1 rounded-3xl overflow-hidden min-h-72'>
      <Image
        src={avatar || ''}
        fill
        style={{ objectFit: 'cover' }}
        alt={`Imagen de ${first_name} ${last_name}`}
        className='absolute inset-0 object-cover w-full h-full'
      />
      <div className='flex items-center justify-between p-2 rounded-2xl filter bg-primary/70 saturate-50 backdrop-blur-md w-full'>
        <header className='flex flex-col items-start justify-center'>
          <h3 className='text-white'>{fullName.split(' ').slice(0, 2).join(' ')}</h3>
          <small className='text-white/70 text-start'>{focus || 'Aún sin definir'}</small>
        </header>
        <Button
          aria-label='Enviar mensaje'
          size="icon"
          className='bg-white hover:bg-white/80 flex items-center justify-center gap-2 rounded-lg size-9'
          onClick={() => setSelectedPsychologist(psychologist.id)}
        >
          <SentIcon width={16} height={16} color='black' />
        </Button>
      </div>
    </article>
  )
}
