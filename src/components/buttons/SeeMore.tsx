import Link from "next/link";
import { Button } from "../ui/button";

export function SeeMore({ href, text }: { href: string, text: string }) {
  return (
    <Button asChild variant="link" className="font-normal">
      <Link href={href}>{text}</Link>
    </Button>
  )
}