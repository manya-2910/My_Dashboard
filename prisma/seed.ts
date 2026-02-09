import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const email = 'test@test.com'
    const password = 'Test123@123'
    const hashedPassword = await bcrypt.hash(password, 10)

    // Upsert the admin user: update if exists, create if not
    const admin = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'ADMIN',
            isApproved: true,
        },
        create: {
            email,
            password: hashedPassword,
            role: 'ADMIN',
            isApproved: true,
        },
    })

    console.log({ admin })
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
