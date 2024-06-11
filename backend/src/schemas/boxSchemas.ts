import { FastifySchema } from "fastify";

export const boxSchema: FastifySchema = {
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

export const updateBoxSchema: FastifySchema = {
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

export const deleteBoxSchema: FastifySchema = {
    params: {
        type: "object",
        properties: {
            id: { type: "string" },
        },
        required: ["id"],
    },
};
