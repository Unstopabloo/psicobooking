import { api } from "@/lib/mercado-pago";

export async function POST(request: Request) {
  console.log("POST")
  const body: { data: { id: string } } = await request.json();
  const id = body.data.id;

  console.log("id", id)

  await api.appointment.addPayment(id)

  return new Response('Payment added', { status: 200 })
}