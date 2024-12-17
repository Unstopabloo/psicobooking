import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, userExists } from '@/server/db/users'
import { redirect } from 'next/navigation'
import { CLERK_WH_SECRET } from "@/lib/env"

export async function POST(req: Request) {
  console.log('Received webhook request')
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = CLERK_WH_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  // const { id } = evt.data
  const eventType = evt.type
  // console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  // console.log('Webhook body:', body)

  if (eventType === 'user.created') {
    const { id: clerk_id, first_name, last_name, email_addresses, image_url } = evt.data
    const email = email_addresses[0]?.email_address

    if (!email || !clerk_id || !first_name || !last_name || !image_url) {
      return new Response('Error creating user', { status: 400 })
    }

    // Verificar si el usuario ya existe en la base de datos
    const existsUser = await userExists(clerk_id)
    if (existsUser) {
      return new Response('User already exists', { status: 400 })
    }

    // Crear nuevo usuario en base de datos
    const { user, error } = await createUser({
      clerk_id,
      first_name: first_name,
      last_name: last_name,
      email,
      avatar: image_url ?? null,
      role: 'psychologist'
    })

    if (error) {
      console.error(error)
      return new Response('Error creating user', { status: 400 })
    }

    redirect('/onboarding')
  }

  return new Response('', { status: 200 })
}