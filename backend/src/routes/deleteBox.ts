import { Prisma, PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { deleteBoxSchema } from "../schemas/boxSchemas";
import { RouteParams } from "../types";

export async function registerDeleteBoxRoute(
    fastify: FastifyInstance,
    prisma: PrismaClient,
) {
    fastify.delete<{ Params: RouteParams }>(
        "/boxes/:id",
        { schema: deleteBoxSchema },
        async function handler(request, reply) {
            try {
                const { id } = request.params;
                const numericId = Number(id);
                const box = await prisma.boxes.delete({
                    where: { id: numericId },
                });

                console.log("Box deleted:", box);
                reply.code(200).send({ message: "Box deleted successfully." });
            } catch (error) {
                console.log(
                    "An error occurred while deleting a box: \n",
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
