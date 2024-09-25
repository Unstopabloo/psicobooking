import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../Avatar";
import { MessageIcon, Calendar03Icon } from "../icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export function Activities() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Link href="/dashboard">
        <Card className="p-3 border hover:shadow-md hover:shadow-primary/50 transition-shadow duration-200">
          <CardHeader className="p-2">
            <CardTitle className="">
              Caminata de 15 minutos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 p-2">
            <Avatar name="Lusiana Varela" avatarUrl="/placeholder.svg?height=40&width=40" />
            <strong className="text-foreground/90 font-normal">Lusiana Varela</strong>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2 p-2">
            <TooltipProvider>
              <Tooltip delayDuration={400}>
                <TooltipTrigger className="flex items-center gap-1">
                  <MessageIcon width={18} height={18} />
                  <small>3</small>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cantidad de mensajes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={400}>
                <TooltipTrigger className="flex items-center gap-1">
                  <Calendar03Icon width={18} height={18} />
                  <small>20 / 09</small>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fecha de actividad</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </Link>

      <Link href="/dashboard">
        <Card className="p-3 border hover:shadow-md hover:shadow-primary/50 transition-shadow duration-200">
          <CardHeader className="p-2">
            <CardTitle className="">
              Caminata de 15 minutos
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2 p-2">
            <Avatar name="Lusiana Varela" avatarUrl="/placeholder.svg?height=40&width=40" />
            <strong className="text-foreground/90 font-normal">Lusiana Varela</strong>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2 p-2">
            <TooltipProvider>
              <Tooltip delayDuration={400}>
                <TooltipTrigger className="flex items-center gap-1">
                  <MessageIcon width={18} height={18} />
                  <small>3</small>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cantidad de mensajes</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={400}>
                <TooltipTrigger className="flex items-center gap-1">
                  <Calendar03Icon width={18} height={18} />
                  <small>20 / 09</small>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fecha de actividad</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </Link>


    </div>
  )
}