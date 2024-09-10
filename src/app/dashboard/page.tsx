import { SignedIn, UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  return (
    <div className="container mx-auto">
      <h1>Dashboard</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}