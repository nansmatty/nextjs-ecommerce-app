import { getProductBySlug } from '@/lib/actions';
import { formatPrice } from '@/lib/utils';
import React from 'react';

const ProductPage = async ({ params }: { params: { slug: string } }) => {
	const product = await getProductBySlug(params.slug);

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>{product.name}</h1>
			<p>{product.description}</p>
			<p>{formatPrice(product.price)}</p>
		</div>
	);
};

export default ProductPage;
