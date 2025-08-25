import CartEntry from '@/components/cart-entry';
import { getCart } from '@/lib/actions';

export default async function CartPage() {
	const cart = await getCart();

	return (
		<main className='container mx-auto py-4 md:px-0 px-4'>
			{!cart || cart.items.length === 0 ? (
				<div className='text-center'>
					<h2 className='text-2xl'>Your cart is empty</h2>
					<p className='text-gray-500'>Add some items to your cart to get started.</p>
				</div>
			) : (
				<div>
					{cart.items.map((item) => (
						<CartEntry key={item.id} cartItem={item} />
					))}
				</div>
			)}
		</main>
	);
}
