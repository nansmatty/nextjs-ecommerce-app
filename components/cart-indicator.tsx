import Link from 'next/link';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '@/lib/actions';

export default async function CartIndicator() {
	// Fetch the cart data from the server
	const cart = await getCart();
	const cartSize = cart?.size ?? 0;

	return (
		<Button variant='ghost' size='icon' className='relative' asChild>
			<Link href='/cart'>
				<ShoppingCart className='h-5 w-5' />
				{cartSize > 0 && (
					<span className='absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full'>
						{cartSize}
					</span>
				)}
			</Link>
		</Button>
	);
}
