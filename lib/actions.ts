'use server';

import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export interface GetProductsParams {
	slug?: string;
	sort?: string;
	query?: string;
	page?: number;
	pageSize?: number;
}

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
