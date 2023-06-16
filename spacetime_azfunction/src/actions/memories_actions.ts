import { HttpHandler, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions"
import { z } from "zod"
import { IUserToken } from "../interfaces/IUserToken";
import { prisma } from '../lib/prisma'

export async function getAllMemories(
  request: HttpRequest,
  context: InvocationContext,
  authenticatedUser: IUserToken
): Promise<HttpResponseInit> {

  const allMemories = await prisma.memory.findMany({
    where: {
      userId: authenticatedUser.sub,
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

export async function getMemoryByID(
  request: HttpRequest,
  context: InvocationContext,
  authenticatedUser: IUserToken
): Promise<HttpResponseInit> {

  const paramsSchema = z.object({
    id: z.string().uuid("the ID param must be passed as uuid format")
  })

  const { id } = paramsSchema.parse(request.params)

  const memory = await prisma.memory.findUniqueOrThrow({
    where: {
      id
    }
  })

  if (!memory.isPublic && memory.userId !== authenticatedUser.sub) {
    return {
      body: `This memory is not public or does not belong to you.`,
      status: 401
    }
  }

  return { jsonBody: memory, status: 200 }
}

export async function insertMemory(
  request: HttpRequest,
  context: InvocationContext,
  authenticatedUser: IUserToken
): Promise<HttpResponseInit> {

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
      userId: authenticatedUser.sub,
    },
  });

  return {
    jsonBody: memory,
    status: 200
  };
}

export async function updateMemory(
  request: HttpRequest,
  context: InvocationContext,
  authenticatedUser: IUserToken
): Promise<HttpResponseInit> {

  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  const bodySchema = z.object({
    content: z.string(),
    coverUrl: z.string(),
    isPublic: z.coerce.boolean().default(false),
  });

  const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

  let memory = await prisma.memory.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (memory.userId !== authenticatedUser.sub) {
    return {
      body: `This memory is not public or does not belong to you.`,
      status: 401
    }
  }

  memory = await prisma.memory.update({
    where: {
      id,
    },
    data: {
      content,
      coverUrl,
      isPublic,
    },
  });

  return {
    jsonBody: memory,
    status: 200
  }

}

export async function deleteMemory(
  request: HttpRequest,
  context: InvocationContext,
  authenticatedUser: IUserToken
): Promise<HttpResponseInit> {

  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  const memory = await prisma.memory.delete({
    where: {
      id,
    },
  });

  return {
    jsonBody: memory,
    status: 200
  }
}