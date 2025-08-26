'use server';

import { cookies } from 'next/headers';
import { getCart } from './actions';
import prisma from './prisma';
import { createCheckoutSession } from './stripe';

export async function processCheckout() {
	const cart = await getCart();

	if (!cart || cart.items.length === 0) {
		throw new Error('Cart is empty');
		1;
	}

	let orderId: string | null = null;

	try {
		const order = await prisma.$transaction(async (tx) => {
			const total = cart.subtotal;

			const newOrder = await tx.order.create({
				data: {
					total,
				},
			});

			const orderItems = cart.items.map((item) => ({
				productId: item.product.id,
				quantity: item.quantity,
				orderId: newOrder.id,
				price: item.product.price,
			}));

			await tx.orderItem.createMany({
				data: orderItems,
			});

			await tx.cartItem.deleteMany({
				where: {
					cartId: cart.id,
				},
			});

			await tx.cart.deleteMany({
				where: {
					id: cart.id,
				},
			});

			return newOrder;
		});

		orderId = order.id;

		// 1. Reload full order

		const fullOrder = await prisma.order.findUnique({
			where: { id: order.id },
			include: {
				items: {
					include: {
						product: true,
					},
				},
			},
		});

		// 2. Confirm the order was loaded

		if (!fullOrder) {
			throw new Error('Order not found.');
		}

		// 3. Create the stripe session

		const { sessionId, sessionUrl } = await createCheckoutSession(fullOrder);

		// 4. Return the session url and handle the errors

		if (!sessionId || !sessionUrl) {
			throw new Error('Failed to create checkout session.');
		}

		// 5. Store the session id in the order & change the order status

		await prisma.order.update({
			where: { id: order.id },
			data: { stripeSessionId: sessionId, status: 'pending' },
		});

		(await cookies()).delete('cartId');

		return order;
	} catch (error) {
		// 1. OPTIONAL: the change the order status to failed

		if (orderId && error instanceof Error && error.message.includes('Stripe')) {
			await prisma.order.update({
				where: { id: orderId },
				data: { status: 'failed' },
			});
		}

		console.error('Error creating order:', error);
		throw new Error('Failed to create order');
	}
}
