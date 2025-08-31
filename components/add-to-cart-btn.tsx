'use client';

import { Product } from '@/app/generated/prisma';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { addToCart } from '@/lib/actions';
import { useCart } from '@/lib/use-cart';

export default function AddToCartButton({ product }: { product: Product }) {
	const [isAdding, setIsAdding] = useState(false);
	const { revalidateCart } = useCart();

	const handleAddToCart = async () => {
		try {
			setIsAdding(true);
			await addToCart(product.id, 1);
			revalidateCart();
		} catch (error) {
			console.error('Error adding product to cart:', error);
		} finally {
			setIsAdding(false);
		}
	};

	return (
		<Button
			onClick={handleAddToCart}
			disabled={product.inventory === 0 || isAdding}
			className='px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors w-full'>
			<ShoppingCart className='w-4 h-4' />
			{product.inventory > 0 ? 'Add to Cart' : 'Out of Stock'}
		</Button>
	);
}
