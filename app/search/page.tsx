import Breadcrumbs from '@/components/breadcrumbs';
import React, { Suspense } from 'react';
import ProductCard from '../ProductCard';
import prisma from '@/lib/prisma';
import ProductsSkeleton from '../ProductsSkeleton';

// In promise because everything in nextjs 15 is promise based
type SearchPageProps = {
	searchParams: Promise<{ query?: string }>;
};

async function Products({ query }: { query: string }) {
	const products = await prisma.product.findMany({
		where: {
			OR: [{ name: { contains: query, mode: 'insensitive' } }, { description: { contains: query, mode: 'insensitive' } }],
		},
		take: 18, // Limit the number of products returned
	});

	if (products.length === 0) {
		return <div className='text-center text-muted-foreground'>No products found for "{query}"</div>;
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

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const params = await searchParams;
	const query = params.query?.trim() ?? '';

	const breadcrumbs = [
		{ label: 'Products', href: '/' },
		{ label: `Result for "${query}"`, href: `/search?query=${encodeURIComponent(query)}` },
	];

	return (
		<main className='container mx-auto py-4 md:px-0 px-4'>
			<Breadcrumbs items={breadcrumbs} />
			<Suspense key={query} fallback={<ProductsSkeleton />}>
				<Products query={query} />
			</Suspense>
		</main>
	);
};

export default SearchPage;
