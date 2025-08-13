import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductsSkeleton from './ProductsSkeleton';

export default function loading() {
	return (
		<main className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Home Page</h1>
			<p className='mb-5'>Showing 5 products</p>
			<ProductsSkeleton />
		</main>
	);
}
