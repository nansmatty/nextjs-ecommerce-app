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
						<div key={item.id} className='border-b py-4'>
							<h2 className='text-lg font-semibold'>{item.product.name}</h2>
							<p>Quantity: {item.quantity}</p>
							<p>Price: ${item.product.price}</p>
						</div>
					))}
					<div className='mt-4'>
						<h2 className='text-xl font-bold'>Total: ${cart.subtotal}</h2>
					</div>
				</div>
			)}
		</main>
	);
}
