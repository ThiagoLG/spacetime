import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function Teste(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    return { body: `Teste hahahaha` };
};

app.http('Teste', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: Teste
});
