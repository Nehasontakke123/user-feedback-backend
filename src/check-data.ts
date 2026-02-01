
import { prisma } from "./config/prisma";

async function main() {
    try {
        console.log("Checking User Table...");
        const users = await prisma.user.findMany();
        console.log("Users Found:", users);

        console.log("\nChecking Form Table...");
        const forms = await prisma.form.findMany();
        console.log("Forms Found:", forms);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
