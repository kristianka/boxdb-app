import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "@fastify/cors";
dotenv.config();

import boxRoutes from "./routes/boxRoutes";

const PORT = Number(process.env.PORT) || 3000;

const prisma = new PrismaClient();
const fastify = Fastify({
    logger: false,
});

fastify.register(cors, {
    origin: process.env.FRONTEND_URL,
});

fastify.get("/", async function handler(_request, reply) {
    reply
        .code(200)
        .send({ message: "See GitHub readme for routes and information" });
});

const start = async () => {
    try {
        if (!process.env.FRONTEND_URL) {
            throw new Error("FRONTEND_URL is not set");
        }
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not set");
        }
        await boxRoutes(fastify, prisma);
        await fastify.listen({ port: PORT, host: "0.0.0.0" });
        console.log(`Server listening on ${PORT}`);
    } catch (err) {
        console.log("Error starting the server: \n", err);
        process.exit(1);
    }
};

start();
