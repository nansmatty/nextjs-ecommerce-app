// 1
import { PrismaClient, Product, User } from '@/app/generated/prisma/client';
import { hashPassword } from '@/lib/auth';
import { withAccelerate } from '@prisma/extension-accelerate';

// 2
const prisma = new PrismaClient().$extends(withAccelerate());

// 3
async function main() {
	// ... you will write your Prisma Client queries here
	await prisma.orderItem.deleteMany({});
	await prisma.cartItem.deleteMany({});
	await prisma.order.deleteMany({});
	await prisma.cart.deleteMany({});
	await prisma.product.deleteMany({});
	await prisma.category.deleteMany({});
	await prisma.user.deleteMany({});

	const electronics = await prisma.category.create({
		data: { name: 'Electronics', slug: 'electronics' },
	});

	const clothing = await prisma.category.create({
		data: { name: 'Clothing', slug: 'clothing' },
	});

	const home = await prisma.category.create({
		data: { name: 'Home', slug: 'home' },
	});

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Headphones',
			description: 'Premium noise-cancelling wireless headphones with long battery life.',
			price: 199.99,
			imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
			categoryId: electronics.id,
			slug: 'wireless-headphones',
			inventory: 50, // Example inventory count
		},
		{
			id: '2',
			name: 'Smart Watch',
			description: 'Fitness tracker with heart rate monitoring and sleep analysis.',
			price: 149.99,
			imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
			categoryId: electronics.id,
			slug: 'smart-watch',
			inventory: 30, // Example inventory count
		},
		{
			id: '3',
			name: 'Running Shoes',
			description: 'Lightweight running shoes with responsive cushioning.',
			price: 89.99,
			imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
			categoryId: clothing.id,
			slug: 'running-shoes',
			inventory: 100, // Example inventory count
		},
		{
			id: '4',
			name: 'Ceramic Mug',
			description: 'Handcrafted ceramic mug with minimalist design.',
			price: 24.99,
			imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d',
			categoryId: home.id,
			slug: 'ceramic-mug',
			inventory: 200, // Example inventory count
		},
		{
			id: '5',
			name: 'Leather Backpack',
			description: 'Durable leather backpack with multiple compartments.',
			price: 79.99,
			imageUrl: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7',
			categoryId: clothing.id,
			slug: 'leather-backpack',
			inventory: 75, // Example inventory count
		},
	];

	for (const product of products) {
		await prisma.product.create({
			data: product,
		});
	}

	const users: User[] = [
		{
			id: '1',
			email: 'admin@example.com',
			password: 'Passw0rd123',
			name: 'Admin User',
			role: 'admin',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
		{
			id: '2',
			email: 'user@example.com',
			password: 'Passw0rd456',
			name: 'Regular User',
			role: 'user',
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	];

	for (const user of users) {
		const hashedPassword = await hashPassword(user.password);
		await prisma.user.create({
			data: {
				...user,
				password: hashedPassword,
			},
		});
	}

	console.log('Users created');
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
