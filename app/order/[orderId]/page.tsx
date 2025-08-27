import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import OrderEntry from './order-entry';
import OrderSummary from './order-summary';

interface OrderPageProps {
	params: Promise<{
		orderId: string;
	}>;
}

export default async function OrderPage({ params }: OrderPageProps) {
	const { orderId } = await params;

	const order = await prisma.order.findUnique({
		where: {
			id: orderId,
		},
		include: {
			items: {
				include: {
					product: true,
				},
			},
		},
	});

	if (!order) {
		notFound();
	}

	return (
		<main className='container mx-auto py-4 md:px-0 px-4'>
			<ul>
				{order.items.map((item) => (
					<OrderEntry key={item.id} orderItem={item} />
				))}
			</ul>
			<OrderSummary order={order} />
		</main>
	);
}
