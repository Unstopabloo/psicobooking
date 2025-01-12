"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cancelSuscription } from "@/server/actions/suscriptions"
import { CreditCard } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from 'sonner'
import { useRouter } from "next/navigation"

export function SuscriptionPlanData({ suscription_id, status }: { suscription_id: string, status: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Cambiar Plan
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex flex-col items-start">
            Mi Suscripción
            <small className="text-primary">{status === "on_trial" ? 'Prueba' : 'Pro'}</small>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>Cancelar Suscripción</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CancelSuscriptionDialog suscription_id={suscription_id} open={open} setOpen={setOpen} />
    </>
  )
}

function CancelSuscriptionDialog({ suscription_id, open, setOpen }: { suscription_id: string, open: boolean, setOpen: (open: boolean) => void }) {
  const router = useRouter()
  const handleCancelSuscription = async () => {
    toast.promise(cancelSuscription(suscription_id), {
      loading: 'Cancelando suscripción...',
      success: 'Suscripción cancelada correctamente, en breve se reflejaran los cambios',
      error: 'Error al cancelar la suscripción'
    })
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Estás seguro de cancelar la suscripción?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Esto eliminará tu suscripción y limitará tu acceso a las funciones de la plataforma.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button onClick={handleCancelSuscription}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}