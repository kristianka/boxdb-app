import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const box = await prisma.boxes.create({
        data: {
            width: 10,
            height: 11,
            depth: 12,
            comment: "Created with Prisma Client"
        }
    });
    console.log(box);
    const boxes = await prisma.boxes.findMany();
    console.log(boxes);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
