import React from 'react';
import ProductCardSkeleton from './ProductCardSkeleton';

export default function loading() {
	return (
		<main className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Home Page</h1>
			<p className='mb-5'>Showing 5 products</p>
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{Array.from({ length: 6 }).map((_, index) => (
					<ProductCardSkeleton key={index} />
				))}
			</div>
		</main>
	);
}
