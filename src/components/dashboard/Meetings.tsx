import { MeetingCard } from "../users/MeetingCard";

export async function Meetings() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-center lg:text-start items-center">
      <MeetingCard name="Pablo Oyarce Ramirez" status="C.I: Firmado" avatarUrl="/placeholder.svg?height=40&width=40" documentCount={3} timestamp="20/08 | 15:45 PM" />
      <MeetingCard name="Pablo Oyarce Ramirez" status="C.I: Firmado" avatarUrl="/placeholder.svg?height=40&width=40" documentCount={3} timestamp="20/08 | 15:45 PM" />
      <MeetingCard name="Pablo Oyarce Ramirez" status="C.I: Firmado" avatarUrl="/placeholder.svg?height=40&width=40" documentCount={3} timestamp="20/08 | 15:45 PM" />
      <MeetingCard name="Pablo Oyarce Ramirez" status="C.I: Firmado" avatarUrl="/placeholder.svg?height=40&width=40" documentCount={3} timestamp="20/08 | 15:45 PM" />
    </div>
  )
}