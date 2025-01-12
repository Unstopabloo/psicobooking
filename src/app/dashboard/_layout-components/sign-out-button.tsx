'use client'

import { Button } from '@/components/ui/button'
import { useClerk } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    <Button className="flex items-center gap-2" variant="ghost" onClick={() => signOut({ redirectUrl: '/' })}>
      <LogOutIcon className="w-4 h-4" />
      Cerrar sesión
    </Button>
  )
}