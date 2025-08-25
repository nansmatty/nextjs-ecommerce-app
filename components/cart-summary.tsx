import { getCart } from '@/lib/actions';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import Link from 'next/link';

export default async function CartSummary() {
	const cart = await getCart();

	if (!cart || cart.items.length === 0) {
		return null;
	}

	const taxes = 0;
	const shipping = 0;
	const subTotal = cart.subtotal;
	const total = subTotal + taxes + shipping;

	return (
		<div className='flex flex-col pt-4'>
			<div className='text-sm text-muted-foreground'>
				<div className='flex items-center justify-between border-b pb-1 mb-3'>
					<p>Subtotal</p>
					<p className='text-base text-foreground'>{formatPrice(subTotal)}</p>
				</div>
				<div className='flex items-center justify-between border-b pb-1 mb-3'>
					<p>Taxes</p>
					<p>Calculated at checkout</p>
				</div>
				<div className='flex items-center justify-between border-b pb-1 mb-3'>
					<p>Shipping</p>
					<p>Calculated at checkout</p>
				</div>
				<div className='flex items-center justify-between border-b pb-1 mb-3 font-bold'>
					<p className='text-lg'>Total</p>
					<p className='text-base text-foreground'>{formatPrice(total)}</p>
				</div>
			</div>
			<Button size='lg' asChild className='mt-4 w-full'>
				<Link href='/checkout'>Proceed to Checkout</Link>
			</Button>
		</div>
	);
}
