import Fastify, { FastifySchema } from "fastify";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { Box } from "./types";
dotenv.config();

const prisma = new PrismaClient();

const fastify = Fastify({
    logger: true,
});

fastify.register(cors, {
    origin: process.env.FRONTEND_URL,
});

const PORT = Number(process.env.PORT) || 3000;

fastify.get("/", async function handler(_request, _reply) {
    return {
        message: "hello world",
    };
});

fastify.get("/boxes", async function handler(_request, reply) {
    try {
        const boxes = await prisma.boxes.findMany();
        reply.code(200).send(boxes);
    } catch (error) {
        reply.code(500).send({
            error: "Internal Server Error. Read the server console for more information.",
        });
        console.log("An error occurred while fetching boxes: \n", error);
    }
});

const boxSchema: FastifySchema = {
    body: {
        type: "object",
        properties: {
            width: { type: "number" },
            height: { type: "number" },
            depth: { type: "number" },
            comment: { type: "string" },
        },
        required: ["width", "height", "depth"],
    },
};

fastify.post<{ Body: Box }>(
    "/boxes",
    { schema: boxSchema },
    async function handler(request, reply) {
        try {
            const { width, height, depth, comment } = request.body;

            const box = await prisma.boxes.create({
                data: {
                    width,
                    height,
                    depth,
                    comment,
                },
            });

            reply.code(201).send(box);
        } catch (error) {
            reply.code(500).send({
                error: "Internal Server Error. Read the server console for more information.",
            });
            console.log("An error occurred while creating a box: \n", error);
        }
    },
);

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
