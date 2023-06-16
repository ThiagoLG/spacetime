import { HttpHandler, HttpRequest, InvocationContext, HttpResponseInit } from "@azure/functions";
import { validateToken } from "../services/AuthServices";

export function authenticatedRoute(routeFunction: Function): HttpHandler {
  return async function (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`)

    const [authenticatedUser, invalidResponse] = await validateToken(request);
    if (invalidResponse) return invalidResponse

    return await routeFunction(request, context, authenticatedUser)
  }
}