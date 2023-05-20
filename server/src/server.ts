import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import jwt from "@fastify/jwt";

const app = fastify();

app.register(cors, {
  origin: true, // limit URLs that can access the APIS
});

app.register(memoriesRoutes);
app.register(authRoutes);

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
});

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP Server listening on port 3333 (http://localhost:3333");
  });
