import { Container } from "@/app/dashboard/_layout-components/container";
import { ForumPost } from "@/components/forum/post-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function PostPage({ params }: { params: { post_id: string } }) {
  return (
    <Container>
      <header>
        <Button variant="link" className="space-x-2">
          <Link className="flex items-center space-x-2" href="/dashboard/comunidad">
            <ChevronLeft className="h-4 w-4" />
            <span>Volver</span>
          </Link>
        </Button>
      </header>
      <section className="mt-4 border-b pb-4">
        <ForumPost
          className="shadow-none"
          author="John Doe"
          timeAgo="10 mins"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          likes={10}
          comments={2}
          avatarUrl="https://github.com/shadcn.png"
        />
      </section>
      <section className="mt-10 flex flex-col gap-4">
        <ForumPost
          className="shadow-none"
          author="John Doe"
          timeAgo="10 mins"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
          likes={10}
          comments={2}
          avatarUrl="https://github.com/shadcn.png"
          isComment
        />
      </section>
    </Container>
  )
}