import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions"
import { z } from "zod"
import { prisma } from '../lib/prisma'

export async function getAllMemories(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  const allMemories = await prisma.memory.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return { body: JSON.stringify(allMemories) }
}

export async function getMemoryByID(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  const paramsSchema = z.object({
    id: z.string().uuid("the ID param must be passed as uuid format")
  })

  const { id } = paramsSchema.parse(request.params)

  const memory = await prisma.memory.findUnique({
    where: {
      id
    }
  })

  return { body: JSON.stringify(memory) }
}
