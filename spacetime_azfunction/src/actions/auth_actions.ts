import { HttpRequest, InvocationContext, HttpResponseInit, app } from "@azure/functions";
import { z } from 'zod'
import axios from 'axios'
import { prisma } from "../lib/prisma";
import * as jwt from 'jsonwebtoken'

export async function registerAccess(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  context.log(request.headers.get("Authorization"))

  const bodySchema = z.object({
    code: z.string(),
  })

  const { code } = bodySchema.parse({ code: request.query.get('code') })

  const accessTokenResponse = await axios.post(
    'https://github.com/login/oauth/access_token',
    null,
    {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    }
  )

  const { access_token } = accessTokenResponse.data

  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  
  const userSchema = z.object({
    id: z.number(),
    login: z.string(),
    name: z.string().nullable(),
    avatar_url: z.string(),
  })

  const userInfo = userSchema.parse(userResponse.data);

  let user = await prisma.user.findUnique({
    where: {
      githubId: userInfo.id,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        githubId: userInfo.id,
        login: userInfo.login,
        name: userInfo.name || userInfo.login,
        avatarUrl: userInfo.avatar_url,
      },
    });
  }

  const token = jwt.sign(
    {
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
    process.env.JWT_SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "7d",
    }
  );

  return {
    body: token
  };
};