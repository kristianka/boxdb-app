import { Prisma, PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

import { updateBoxSchema } from "../schemas/boxSchemas";
import { validateDimensions } from "../misc";
import { Box, RouteParams } from "../types";

export async function registerPutBoxRoute(
    fastify: FastifyInstance,
    prisma: PrismaClient,
) {
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

                const validationError = validateDimensions(
                    width,
                    height,
                    depth,
                );
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

                return reply.code(200).send(updatedBox);
            } catch (error) {
                console.log(
                    "An error occurred while updating a box: \n",
                    error,
                );
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
}
