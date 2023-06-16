import { HttpRequest, HttpResponseInit } from "@azure/functions";
import * as jwt from 'jsonwebtoken'

export function validateToken(request: HttpRequest): HttpResponseInit[] {

  const authorizationHeader = request.headers.get('Authorization') || '';
  const token = authorizationHeader.split('Bearer ')[1];

  try {
    if (!token) {
      return [null, {
        body: 'Unauthorized. Please verify your authorization token.',
        status: 401
      }]
    }

    const tokenInfos = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!tokenInfos) {
      return [null, {
        body: 'Invalid token. Please verify your authorization token.',
        status: 401
      }]
    }

    return [{
      jsonBody: tokenInfos
    }, null]

  } catch (e) {

    return [null, {
      body: 'Unauthorized. Please verify your authorization token.',
      status: 401
    }]

  }
}