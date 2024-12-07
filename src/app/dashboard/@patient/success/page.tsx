'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Container } from "../../_layout-components/container";
import isotipo from "../../../../../public/isotipo.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function SuccessPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const isFromStripe = searchParams.get('stripe') === 'true';
    setShowConfetti(isFromStripe);

    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });

    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return (
    <Container className="overflow-hidden">
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <div className="flex flex-col items-start justify-center h-[80dvh]">
        <h1 className="text-4xl font-bold">¡Pago exitoso!</h1>
        <div className="flex items-center justify-center gap-2 py-4">
          <Image src={isotipo} priority alt="logo" width={70} height={70} />
          <div className="flex flex-col gap-1">
            <p className="font-medium text-foreground/80">Agradecemos tu confianza</p>
            <p className="text-sm text-muted-foreground">
              Pronto recibirás un correo de confirmación de tu cita y podras ponerte en contacto con tu psicólogo.
            </p>
          </div>
        </div>
        <Button asChild className="my-10">
          <Link href="/dashboard"><ArrowLeft className="w-4 h-4 mr-2" /> Volver al dashboard</Link>
        </Button>
      </div>
    </Container>
  )
}

