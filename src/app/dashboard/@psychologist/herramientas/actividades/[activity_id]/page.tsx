import { Container } from "@/app/dashboard/_layout-components/container";
import { Avatar } from "@/components/Avatar";
import H1 from "@/components/H1";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getActivityById } from "@/server/db/activity";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, Send } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommentActivity } from "@/types/entities";
import { Textarea } from "@/components/ui/textarea";
import { addActivityComment } from "@/server/actions/activity";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AddActivityForm } from "@/components/actividades/add-activity-form";

export default async function ActivityPage({ params }: { params: { activity_id: number } }) {
  const activity = await getActivityById(params.activity_id)

  return (
    <Container className="2xl:max-w-4xl 2xl:px-0">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <Button asChild variant="link" className="p-0">
            <Link className="flex items-center gap-1" href="/dashboard/herramientas/actividades">
              <ChevronLeft className="size-4" />
              <span className="text-sm">Volver</span>
            </Link>
          </Button>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-2">
            <H1>{activity.title}</H1>
            <div className="flex items-center gap-2">
              <Avatar className="size-6" name={activity.patient_name} avatarUrl={activity.patient_avatar} />
              <span className="text-sm text-muted-foreground">
                {activity.patient_name}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <time className="text-sm text-muted-foreground">
              {format(activity.date_from, "dd MMMM, yy", { locale: es }) + " - " + format(activity.date_to, "dd MMMM, yy", { locale: es })}
            </time>
            <Badge
              variant="outline"
              className={cn(
                "text-xs border",
                activity.status === "en_curso" && "bg-primary/10 text-primary border-primary",
                activity.status === "completada" && "bg-green-500/10 text-green-500 border-green-500",
                activity.status === "cancelada" && "bg-destructive/10 text-destructive border-destructive",
                activity.status === "retrasada" && "bg-orange-500/10 text-orange-500 border-orange-500"
              )}
            >
              {activity.status === "en_curso" ? "En curso" : activity.status}
            </Badge>
          </div>
        </div>
      </header>
      <Tabs defaultValue="description" className="my-10 w-full">
        <TabsList className="w-full bg-background">
          <TabsTrigger className="p-4 w-full data-[state=active]:bg-card data-[state=active]:border border-border data-[state=active]:text-foreground data-[state=active]:shadow-none" value="description">Descripción</TabsTrigger>
          <TabsTrigger className="p-4 w-full data-[state=active]:bg-card data-[state=active]:border border-border data-[state=active]:text-foreground data-[state=active]:shadow-none" value="notes">Notas</TabsTrigger>
        </TabsList>
        <div className="w-full flex justify-center p-8">
          <TabsContent value="description" className="min-w-full prose min-h-96">
            {activity.description}
          </TabsContent>
        </div>
        <div className="w-full flex justify-center px-6">
          <TabsContent value="notes" className="min-w-full">
            <ScrollArea className="h-[450px]">
              {activity.comments.length > 0 ? activity.comments.map((comment: CommentActivity) => (
                <ActivityComment key={comment.published_at} comment={comment} />
              )) : <div className="text-center text-sm text-muted-foreground">No hay notas para esta actividad</div>}
            </ScrollArea>
            <AddActivityForm activityId={activity.id} />
          </TabsContent>
        </div>
      </Tabs>
    </Container>
  )
}

function ActivityComment({ comment }: { comment: CommentActivity }) {
  return (
    <article className="flex flex-col gap-2 border border-border rounded-lg p-6 bg-card/20 first:mt-0 mt-4 me-4">
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-start gap-2">
          <Avatar className="size-6" name={comment.author_name} avatarUrl={comment.author_avatar} />
          <span className="text-sm text-muted-foreground">{comment.author_name}</span>
        </div>
        <time className="text-sm text-muted-foreground">{format(comment.published_at, "dd MMMM, yyyy", { locale: es })}</time>
      </header>
      <div className="px-3 py-1">
        <p className="prose">{comment.content}</p>
      </div>
    </article>
  )
}