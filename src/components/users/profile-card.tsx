import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, fromUnixTime } from 'date-fns'
import { es } from 'date-fns/locale'
import { Avatar } from "../Avatar";
import { getUserProfile } from "@/server/db/users";
import { Skeleton } from "../ui/skeleton";
import { EditProfileForm } from "./edit-profile-form";
import { VideoPlayer } from "../cloudinary/video-player";
import { CloudinaryUploadButton } from "../cloudinary/upload-button";

export default async function PsychologistCard() {
  const userProfile = await getUserProfile()

  if (!userProfile) {
    return <div>No user found</div>
  }

  const specialities = userProfile.specialities?.map((speciality) => speciality.name).join(', ').split(', ') || []

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto bg-card/30">
        <CardHeader className="flex justify-between items-center p-6 gap-2">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="size-10" avatarUrl={userProfile.avatar} name={`${userProfile.first_name} ${userProfile.last_name}`} />
            <div>
              <CardTitle className="text-xl text-foreground">{userProfile.first_name} {userProfile.last_name}</CardTitle>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
          <EditProfileForm profile={userProfile} specialities={specialities} />
        </CardHeader>
        <CardContent className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 [&>div>p]:text-muted-foreground [&>div>p>span]:text-foreground/95">
            <div className="">
              <h3 className="font-semibold mb-2">Información Personal</h3>
              <p className="flex items-center gap-1 justify-between max-w-[85%]">
                <span className="font-medium">Teléfono:</span> {userProfile.phone || 'No especificado'}
              </p>
              <p className="flex items-center gap-1 justify-between max-w-[85%]">
                <span className="font-medium">Nacionalidad:</span> {userProfile.nationality || 'No especificada'}
              </p>
              <p className="flex items-center gap-1 justify-between max-w-[85%]">
                <span className="font-medium">Género:</span> {userProfile.gender === 'male' ? 'Masculino' : 'Femenino' || 'No especificado'}
              </p>
              <p className="flex items-center gap-1 justify-between max-w-[85%] text-muted-foreground [&>span]:text-foreground/95">
                <span className="font-medium">Fecha de nacimiento:</span>
                {userProfile.birth_day || 'No especificada'}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Ubicación</h3>
              <p className="flex items-center gap-1 justify-between max-w-[85%]">
                <span className="font-medium">País:</span> {userProfile.country || 'No especificado'}
              </p>
              <p className="flex items-center gap-1 justify-between max-w-[85%]">
                <span className="font-medium">Estado:</span> {userProfile.state || 'No especificado'}
              </p>
              <p className="flex items-center gap-1 justify-between max-w-[85%]">
                <span className="font-medium">Ciudad:</span> {userProfile.city || 'No especificada'}
              </p>
              <p className="flex items-center gap-1 justify-between max-w-[85%]">
                <span className="font-medium">Dirección:</span> {userProfile.street && userProfile.num_house ? `${userProfile.street} ${userProfile.num_house}` : 'No especificada'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div>
              <h3 className="font-semibold mb-2">Enfoque Principal</h3>
              <p className="text-muted-foreground">{userProfile.focus || 'No especificado'}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.specialities && userProfile.specialities.length > 0 ? (
                  userProfile.specialities.map((speciality) => (
                    <Badge key={speciality.id} variant="outline" className="text-sm bg-primary/15 text-primary font-normal border-primary">
                      {speciality.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No se han especificado especialidades</p>
                )}
              </div>
            </div>
          </div>
          <CardFooter className="text-sm text-muted-foreground p-0">
            Miembro desde: {format(fromUnixTime(parseInt(userProfile.created_at)), 'd \'de\' MMMM \'de\' yyyy', { locale: es })}
          </CardFooter>
        </CardContent>
      </Card>
      <section className="max-w-3xl mx-auto mt-8">
        <h3 className="text-lg font-semibold mb-2">Presentación</h3>
        <div className={`rounded-xl overflow-hidden ${userProfile.video_presentation_url && "shadow-lg"}`}>
          {
            userProfile.video_presentation_url
              ? <VideoPlayer publicId={userProfile.video_presentation_url} />
              : <div className="flex flex-col justify-center items-center h-full"><p className="text-muted-foreground">No se ha subido ningún video de presentación</p><CloudinaryUploadButton /></div>
          }
        </div>
      </section>
    </>
  )
}

export function ProfileCardSkeleton() {
  return (
    <Skeleton className="w-full max-w-3xl h-96" />
  )
}
