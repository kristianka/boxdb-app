import Fastify, { FastifySchema } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import { Box } from "./types";
dotenv.config();

const prisma = new PrismaClient();

const fastify = Fastify({
    logger: false,
});

fastify.register(cors, {
    origin: process.env.FRONTEND_URL,
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

const updateBoxSchema: FastifySchema = {
    params: {
        type: "object",
        properties: {
            id: { type: "string" },
        },
        required: ["id"],
    },
    body: {
        type: "object",
        properties: {
            width: { type: "number" },
            height: { type: "number" },
            depth: { type: "number" },
            comment: { type: "string" },
        },
    },
};

function validateDimensions(
    width: unknown,
    height: unknown,
    depth: unknown,
): string | null {
    // Check if the values exist and are less than or equal to 0
    if (
        (width !== null && width !== undefined && Number(width) <= 0) ||
        (height !== null && height !== undefined && Number(height) <= 0) ||
        (depth !== null && depth !== undefined && Number(depth) <= 0)
    ) {
        return "Width, height, and depth must be greater than 0.";
    }
    // no error
    return null;
}

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
            error: "Internal Server Error. Read the server console for more information. Very likely the database is just not running.",
        });
        console.log("An error occurred while fetching boxes: \n", error);
    }
});

fastify.post<{ Body: Box }>(
    "/boxes",
    { schema: boxSchema },
    async function handler(request, reply) {
        try {
            // Fastify schema validation ensures that width, height, and depth are not missing
            // string is converted automatically to number if possible
            const { width, height, depth, comment } = request.body;

            if (width <= 0 || height <= 0 || depth <= 0) {
                reply.code(400).send({
                    error: "Width, height, and depth must be greater than 0.",
                });
                return;
            }

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

// Step 1: Define an interface for the route parameters
interface RouteParams {
    id: string; // Assuming id is passed as a string
}

fastify.put<{ Params: RouteParams; Body: Partial<Box> }>(
    "/boxes/:id",
    { schema: updateBoxSchema },
    async function handler(request, reply) {
        try {
            // Fastify schema validation ensures that width, height, and depth are not missing
            // string is converted automatically to number if possible
            const { width, height, depth, comment } = request.body;
            const { id } = request.params;
            const numericId = Number(id);

            const validationError = validateDimensions(width, height, depth);
            if (validationError) {
                return reply.code(400).send({ error: validationError });
            }

            // update only necessary fields
            const updatedBox = await prisma.boxes.update({
                where: { id: numericId },
                data: {
                    ...(width !== undefined && { width }),
                    ...(height !== undefined && { height }),
                    ...(depth !== undefined && { depth }),
                    ...(comment !== undefined && { comment }),
                },
            });

            return reply.code(201).send(updatedBox);
        } catch (error) {
            console.log("An error occurred while creating a box: \n", error);
            // prisma errors
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                console.log("Prisma error", error.code);
                if (error.code === "P2025") {
                    // Prisma's code for record not found
                    return reply.code(404).send({
                        error: "Box not found.",
                    });
                }
            }

            return reply.code(500).send({
                error: "Internal Server Error. Read the server console for more information.",
            });
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
