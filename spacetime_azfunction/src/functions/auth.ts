import { app } from "@azure/functions";
import { registerAccess } from "../actions/auth_actions";

app.http('auth', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'register',
    handler: registerAccess
});
