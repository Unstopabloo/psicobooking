import { openai } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { tools } from '@/lib/ai/tools';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: Request) {
  const { messages } = await request.json();
  const { userId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: `Eres un asistente IA de un psicologo que responde amablemente, estas especializado en psicología y psicoterapia, evita contestar en formato md o mdx. La id del psicologo es: ${userId}`,
    messages: convertToCoreMessages(messages),
    maxSteps: 5,
    tools,
  });

  return result.toDataStreamResponse();
}