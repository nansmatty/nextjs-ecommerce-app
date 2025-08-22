import Link from 'next/link';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { getCart } from '@/lib/actions';

export default function CartIndicatorSkeleton() {
	return (
		<Button variant='ghost' size='icon' className='relative' disabled asChild>
			<Link href='/cart'>
				<ShoppingCart className='h-5 w-5' />
			</Link>
		</Button>
	);
}
