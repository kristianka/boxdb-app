import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

export async function registerGetBoxesRoute(
    fastify: FastifyInstance,
    prisma: PrismaClient,
) {
    fastify.get("/boxes", async function handler(_request, reply) {
        try {
            const boxes = await prisma.boxes.findMany();
            console.log("Boxes fetched");
            reply.code(200).send(boxes);
        } catch (error) {
            reply.code(500).send({
                error: "Internal Server Error. Read the server console for more information. Very likely the database is just not running.",
            });
            console.log("An error occurred while fetching boxes: \n", error);
        }
    });
}
