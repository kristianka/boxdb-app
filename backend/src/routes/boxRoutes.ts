import { FastifyInstance } from "fastify";
import { registerGetBoxesRoute } from "./getBoxes";
import { PrismaClient } from "@prisma/client";
import { registerPostBoxesRoute } from "./postBox";
import { registerPutBoxRoute } from "./putBox";
import { registerDeleteBoxRoute } from "./deleteBox";

export default async function (fastify: FastifyInstance, prisma: PrismaClient) {
    await registerGetBoxesRoute(fastify, prisma);
    await registerPostBoxesRoute(fastify, prisma);
    await registerPutBoxRoute(fastify, prisma);
    await registerDeleteBoxRoute(fastify, prisma);
}
