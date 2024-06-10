import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { Box } from "../types";
import { boxSchema } from "../schemas/boxSchemas";

export async function registerPostBoxesRoute(
    fastify: FastifyInstance,
    prisma: PrismaClient,
) {
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
                console.log(
                    "An error occurred while creating a box: \n",
                    error,
                );
            }
        },
    );
}
