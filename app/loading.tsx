import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductsSkeleton from './ProductsSkeleton';
import { BreadcrumbsSkeleton } from '@/components/breadcrumbs-skeleton';

export default function loading() {
	return (
		<main className='container mx-auto py-4'>
			<BreadcrumbsSkeleton />
			<ProductsSkeleton />
		</main>
	);
}
