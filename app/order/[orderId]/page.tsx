import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import OrderEntry from './order-entry';
import OrderSummary from './order-summary';
import { auth } from '@/lib/auth';
import Breadcrumbs from '@/components/breadcrumbs';

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

	const session = await auth();
	const isOwner = session?.user?.id === order.userId;

	return (
		<main className='container mx-auto py-4 md:px-0 px-4'>
			{isOwner && (
				<Breadcrumbs
					items={[
						{
							label: 'My Account',
							href: '/account',
						},
						{
							label: 'Order',
							href: `/order/${order.id}`,
						},
					]}
				/>
			)}
			<ul>
				{order.items.map((item) => (
					<OrderEntry key={item.id} orderItem={item} />
				))}
			</ul>
			<OrderSummary order={order} />
		</main>
	);
}
