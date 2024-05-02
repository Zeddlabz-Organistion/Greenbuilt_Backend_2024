import { PrismaClient, Prisma } from '@prisma/client'
import { hashPassword } from '../helpers/auth'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
	{
		name: 'user',
		email: 'user@greenbuilt.com',
		encrypted_password: hashPassword('123456', process.env.SALT || '')
	},
	{
		name: 'corporate',
		email: 'corporate@greenbuilt.com',
		encrypted_password: hashPassword('123456', process.env.SALT || ''),
		points: 2000,
		role: 2
	},
	{
		name: 'admin',
		email: 'admin@greenbuilt.com',
		encrypted_password: hashPassword('123456', process.env.SALT || ''),
		role: 3
	}
]

async function main() {
	console.log(`Start seeding ...`)
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u
		})
		console.log(`Created user with id: ${user.id}`)
	}
	console.log(`Seeding finished.`)
}

main()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
