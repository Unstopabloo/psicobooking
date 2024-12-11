"use client"

import { useClerk } from '@clerk/nextjs'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogOutIcon } from 'lucide-react'

export function SignOutButton() {
  const { signOut } = useClerk()

  return (
    <DropdownMenuItem className='flex items-center gap-2' onClick={() => signOut()}>
      <LogOutIcon className='w-4 h-4' />
      Cerrar sesión
    </DropdownMenuItem>
  )
}
