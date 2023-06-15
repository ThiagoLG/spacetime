import { HttpRequest, HttpResponseInit, InvocationContext} from "@azure/functions"
import { z } from "zod"
import { prisma } from '../lib/prisma'

export async function getAllMemories(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  const allMemories = await prisma.memory.findMany({
    where: {
      // userId: request.user?.sub,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return {
    jsonBody: allMemories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat("..."),
        createdAt: memory.createdAt,
      };
    })
  }
}

export async function getMemoryByID(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  const paramsSchema = z.object({
    id: z.string().uuid("the ID param must be passed as uuid format")
  })

  const { id } = paramsSchema.parse(request.params)

  const memory = await prisma.memory.findUniqueOrThrow({
    where: {
      id
    }
  })

  return { jsonBody: memory }
}

export async function insertMemory(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`)

  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  });

  const { content, isPublic, coverUrl } = bodySchema.parse(request.body);

  const memory = await prisma.memory.create({
    data: {
      content,
      coverUrl,
      isPublic,
      userId: 'request.user.sub',
    },
  });

  return {
    jsonBody: memory
  };
}
