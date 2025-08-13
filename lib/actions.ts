'use server';

import prisma from '@/lib/prisma';

export async function getProductBySlug(slug: string) {
	const product = await prisma.product.findUnique({
		where: { slug },
	});

	if (!product) return null;

	return product;
}
