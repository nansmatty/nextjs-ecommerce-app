'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@/app/generated/prisma';
import { CartWithProducts, GetProductsParams, ShoppingCart } from './types';
import { cookies } from 'next/headers';
import { revalidateTag, unstable_cache } from 'next/cache';

export async function getProductBySlug(slug: string) {
	const product = await prisma.product.findUnique({
		where: { slug },
		include: {
			category: true,
		},
	});

	if (!product) return null;

	return product;
}

export async function getProducts({ slug, sort, query, page = 1, pageSize = 3 }: GetProductsParams) {
	const whereClause: Prisma.ProductWhereInput = {};

	if (query) {
		whereClause.OR = [{ name: { contains: query, mode: 'insensitive' } }, { description: { contains: query, mode: 'insensitive' } }];
	}

	if (slug) {
		whereClause.category = { slug };
	}

	let orderBy: Record<string, 'asc' | 'desc'> | undefined = undefined;

	if (sort === 'price-asc') {
		orderBy = { price: 'asc' };
	} else if (sort === 'price-desc') {
		orderBy = { price: 'desc' };
	}

	const skip = pageSize ? (page - 1) * pageSize : undefined;
	const take = pageSize;

	return await prisma.product.findMany({
		where: whereClause,
		orderBy,
		skip,
		take,
	});
}

async function findCartFromCookie(): Promise<CartWithProducts | null> {
	const cartId = (await cookies()).get('cartId')?.value;
	if (!cartId) return null;

	return unstable_cache(
		async (id: string) => {
			return await prisma.cart.findUnique({
				where: { id },
				include: { items: { include: { product: true } } },
			});
		},
		[`cart-${cartId}`],
		{ tags: [`cart-${cartId}`] }
	)(cartId);
}

export async function getCart(): Promise<ShoppingCart | null> {
	const cart = await findCartFromCookie();
	if (!cart) return null;

	return {
		...cart,
		size: cart.items.length,
		subtotal: cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0),
	};
}

async function getOrCreateCart() {
	let cart = await findCartFromCookie();

	if (cart) return cart;
	cart = await prisma.cart.create({ data: {}, include: { items: { include: { product: true } } } });

	(await cookies()).set('cartId', cart.id, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/', sameSite: 'lax' });

	return cart;
}

export async function addToCart(productId: string, quantity: number = 1) {
	if (quantity < 1) {
		throw new Error('Quantity must be at least 1');
	}

	const cart = await getOrCreateCart();
	const existingItem = cart.items.find((item) => item.productId === productId);

	if (existingItem) {
		await prisma.cartItem.update({
			where: { id: existingItem.id },
			data: { quantity: existingItem.quantity + quantity },
		});
	} else {
		await prisma.cartItem.create({
			data: { cartId: cart.id, productId, quantity },
		});
	}

	revalidateTag(`cart-${cart.id}`);
}
