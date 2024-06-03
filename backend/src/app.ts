import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "@fastify/cors";
dotenv.config();

const prisma = new PrismaClient();

const fastify = Fastify({
    logger: true
});

// to do change to env variable
fastify.register(cors, {
    origin: process.env.FRONTEND_URL
});

const PORT = Number(process.env.PORT) || 3000;

fastify.get("/", async function handler(request, reply) {
    return {
        message: "hello world"
    };
});

fastify.get("/boxes", async function handler(request, reply) {
    try {
        const boxes = prisma.boxes.findMany();
        return boxes;
    } catch (error) {
        reply.code(500).send({
            error: "Internal Server Error. Read the server console for more information."
        });
        console.log("An error occurred while fetching boxes: \n", error);
    }
});

const start = async () => {
    try {
        if (!process.env.FRONTEND_URL) {
            throw new Error("FRONTEND_URL is not set");
        }
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL is not set");
        }
        await fastify.listen({ port: PORT });
        console.log(`Server listening on ${PORT}`);
    } catch (err) {
        console.log("Error starting the server: \n", err);
        process.exit(1);
    }
};

start();
