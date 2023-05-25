import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "path";

const app = fastify();

app.register(cors, {
  origin: true, // limit URLs that can access the APIS
});
app.register(multipart);
app.register(memoriesRoutes);
app.register(authRoutes);
app.register(uploadRoutes);
app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

app.register(jwt, {
  secret: `${process.env.JWT_SECRET}`,
});

app
  .listen({
    port: 3333,
    // host: "localhost", // from web
    host: "0.0.0.0", // from mobile
  })
  .then(() => {
    console.log("🚀 HTTP Server listening on port 3333 (http://localhost:3333");
  });
