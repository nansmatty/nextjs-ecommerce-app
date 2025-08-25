'use client';

import { CartItemWithProduct } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { Button } from './ui/button';
import { Minus, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { updateCartItem } from '@/lib/actions';

interface CartEntryProps {
	cartItem: CartItemWithProduct;
}

export default function CartEntry({ cartItem }: CartEntryProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleUpdateCartItem = async (quantity: number) => {
		setIsLoading(true);
		try {
			await updateCartItem(cartItem.productId, quantity);
		} catch (error) {
			console.error('Error changing the quantity of cart items: ', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<li className='border-b border-muted flex py-4 justify-between'>
			<div className='flex gap-x-4'>
				<div className='absolute z-10 -ml-2.5 -mt-2'>
					<Button
						variant='ghost'
						size='icon'
						disabled={isLoading}
						className='w-7 h-7 rounded-full bg-muted text-muted-foreground'
						onClick={() => handleUpdateCartItem(0)}>
						<X className='w-4 h-4' />
					</Button>
				</div>
				<div className='overflow-hidden rounded-md border border-muted h-28 w-32'>
					<Image className='h-full w-full object-cover' width={128} height={128} src={cartItem.product.imageUrl!} alt={cartItem.product.name} />
				</div>
				<div className='flex flex-col'>
					<div className='font-medium'>{cartItem.product.name}</div>
				</div>
			</div>
			<div className='flex flex-col justify-between items-end'>
				<p className='font-medium'>{formatPrice(cartItem.product.price)}</p>
				<div className='flex items-center border border-muted rounded-full'>
					<Button
						variant='ghost'
						size='icon'
						className='rounded-l-full'
						onClick={() => handleUpdateCartItem(cartItem.quantity - 1)}
						disabled={isLoading}>
						<Minus className='h-4 w-4' />
					</Button>
					<p className='w-6 text-center'>{cartItem.quantity}</p>
					<Button
						variant='ghost'
						size='icon'
						className='rounded-r-full'
						onClick={() => handleUpdateCartItem(cartItem.quantity + 1)}
						disabled={isLoading}>
						<Plus className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</li>
	);
}
