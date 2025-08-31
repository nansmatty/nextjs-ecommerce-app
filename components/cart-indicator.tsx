'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/use-cart';
import React from 'react';

function CartButton({ children }: { children: React.ReactNode }) {
	return (
		<Button variant='ghost' size='icon' className='relative' asChild>
			<Link href='/cart'>{children}</Link>
		</Button>
	);
}

export default function CartIndicator() {
	// Fetch the cart data from the server

	const { itemCount, isLoading } = useCart();

	if (isLoading) {
		return (
			<CartButton>
				<ShoppingCart className='h-5 w-5' />
			</CartButton>
		);
	}

	return (
		<CartButton>
			<ShoppingCart className='h-5 w-5' />
			{itemCount > 0 && (
				<span className='absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full'>
					{itemCount}
				</span>
			)}
		</CartButton>
	);
}
