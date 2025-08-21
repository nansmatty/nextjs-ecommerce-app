import Breadcrumbs from '@/components/breadcrumbs';
import React, { Suspense } from 'react';
import ProductsSkeleton from '../ProductsSkeleton';
import ProductListServerWrapper from '@/components/product-list-sever-wrapper';

// In promise because everything in nextjs 15 is promise based
type SearchPageProps = {
	searchParams: Promise<{ query?: string; sort?: string }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const params = await searchParams;
	const query = params.query?.trim() ?? '';
	const sort = params.sort;

	const breadcrumbs = [
		{ label: 'Products', href: '/' },
		{ label: `Result for "${query}"`, href: `/search?query=${encodeURIComponent(query)}` },
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />
			<Suspense key={`${query}-${sort}`} fallback={<ProductsSkeleton />}>
				<ProductListServerWrapper params={{ query, sort }} />
			</Suspense>
		</>
	);
};

export default SearchPage;
