// 1
import { PrismaClient } from '@/app/generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// 2
const prisma = new PrismaClient().$extends(withAccelerate());

// 3
async function main() {
	// ... you will write your Prisma Client queries here
	await prisma.product.deleteMany({});
	await prisma.category.deleteMany({});

	const electronics = await prisma.category.create({
		data: { name: 'Electronics', slug: 'electronics' },
	});

	const clothing = await prisma.category.create({
		data: { name: 'Clothing', slug: 'clothing' },
	});

	const home = await prisma.category.create({
		data: { name: 'Home', slug: 'home' },
	});
}

// 4
main()
	.then(async () => {
		console.log('Seeding completed successfully.');
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
