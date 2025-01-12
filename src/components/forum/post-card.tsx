import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageCircle, Heart, MoreVertical, CornerUpRight } from 'lucide-react'
import { Avatar } from "../Avatar"
import { cn } from "@/lib/utils"

interface ForumPostProps {
  author: string
  timeAgo: string
  content: string
  likes: number
  comments: number
  avatarUrl: string
  className?: string
  isMain?: boolean
  isComment?: boolean
}

export function ForumPost({ author, timeAgo, content, likes, comments, avatarUrl, className, isMain = false, isComment = false }: ForumPostProps) {
  return (
    <Card className={cn(
      "mb-4 p-4 bg-card/70 flex flex-col justify-between",
      isComment && "bg-transparent border-none",
      className,
    )}>
      <CardHeader className="px-6 flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10" name={author} avatarUrl={avatarUrl} />
          <div>
            <p className="font-medium leading-none">{author}</p>
            <p className="text-sm text-muted-foreground">Hace {timeAgo}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex flex-col justify-between space-y-4">
          <p className={cn("text-foreground/90", !isMain && "post-content")}>
            {content}
          </p>
          <footer className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="group space-x-1">
                <Heart className="h-4 w-4 group-hover:text-red-500" />
                <span>{likes}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="hover:text-primary space-x-2 text-primary/90 z-10">
              <CornerUpRight className="h-4 w-4" />
              <span>Responder</span>
            </Button>
          </footer>
        </div>
      </CardContent>
    </Card>
  )
}
