import Breadcrumbs from '@/components/breadcrumbs';
import React, { Suspense } from 'react';
import ProductCard from '../../ProductCard';
import prisma from '@/lib/prisma';
import ProductsSkeleton from '../../ProductsSkeleton';
import { notFound } from 'next/navigation';

// In promise because everything in nextjs 15 is promise based
type CategoryPageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ sort?: string }>;
};

async function Products({ slug, sort }: { slug: string; sort?: string }) {
	let orderBy: Record<string, 'asc' | 'desc'> | undefined = undefined;

	if (sort === 'price-asc') {
		orderBy = { price: 'asc' };
	} else if (sort === 'price-desc') {
		orderBy = { price: 'desc' };
	}

	const products = await prisma.product.findMany({
		where: {
			category: {
				slug,
			},
		},
		...(orderBy ? { orderBy } : {}),
		take: 18, // Limit the number of products returned
	});

	if (products.length === 0) {
		return <div className='text-center text-muted-foreground'>No products found.</div>;
	}

	return (
		<>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
	const { slug } = await params;
	const { sort } = await searchParams;

	const category = await prisma.category.findUnique({
		where: { slug },
		select: { name: true, slug: true },
	});
	if (!category) {
		notFound();
	}

	const breadcrumbs = [
		{ label: 'Products', href: '/' },
		{ label: category.name, href: `/search/${category.slug}` },
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />

			<Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
				<Products slug={slug} sort={sort} />
			</Suspense>
		</>
	);
};

export default CategoryPage;
