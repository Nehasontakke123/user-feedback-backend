
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create Users
    const user1 = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: {
            email: 'alice@example.com',
            name: 'Alice',
        },
    })

    const user2 = await prisma.user.upsert({
        where: { email: 'bob@example.com' },
        update: {},
        create: {
            email: 'bob@example.com',
            name: 'Bob',
        },
    })

    console.log({ user1, user2 })

    // Create Forms
    const form1 = await prisma.form.create({
        data: {
            title: 'Feedback Form 1',
            description: 'Please provide your feedback',
            createdBy: user1.id,
        },
    })

    const form2 = await prisma.form.create({
        data: {
            title: 'Survey 2026',
            description: 'Annual survey',
            createdBy: user2.id,
        },
    })

    console.log({ form1, form2 })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
