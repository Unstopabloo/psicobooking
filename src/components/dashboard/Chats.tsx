import {
  Card,
  CardTitle,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { Avatar } from "@/components/Avatar";
import Link from "next/link";

export async function Chats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
      <Link href="/dashboard">
        <Card className="p-3 border hover:shadow-md hover:shadow-primary/50 transition-shadow duration-200">
          <CardHeader className="gap-4">
            <Avatar name="Jaime Chavez" avatarUrl="/placeholder.svg?height=40&width=40" />
            <CardTitle className="flex items-center gap-2 font-normal">
              Jaime Chavez
              <strong className="font-semibold text-xl">·</strong> <span className="text-foreground/85 font-normal text-[15px]">Hace 3 Horas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur ...
            </p>
          </CardContent>
        </Card>
      </Link>
      <Link href="/dashboard">
        <Card className="p-3 border hover:shadow-md hover:shadow-primary/50 transition-shadow duration-200">
          <CardHeader className="gap-4">
            <Avatar name="Jaime Chavez" avatarUrl="/placeholder.svg?height=40&width=40" />
            <CardTitle className="flex items-center gap-2 font-normal">
              Jaime Chavez
              <strong className="font-semibold text-xl">·</strong> <span className="text-foreground/85 font-normal text-[15px]">Hace 3 Horas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur ...
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}