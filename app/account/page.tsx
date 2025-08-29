import Breadcrumbs from '@/components/breadcrumbs';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import OrderStatusBadge from '@/components/order-status-badge';
import { formatPrice } from '@/lib/utils';

export default async function AccountPage() {
	const session = await auth();

	if (!session?.user) {
		redirect('/auth/signin');
	}

	const orders = await prisma.order.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return (
		<main className='container mx-auto py-4 md:px-0 px-4'>
			<Breadcrumbs
				items={[
					{
						label: 'My Account',
						href: '/account',
						active: true,
					},
				]}
			/>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Order #</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.map((order) => (
						<TableRow key={order.id}>
							<TableCell className='font-medium'>{order.id}</TableCell>
							<TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
							<TableCell>{formatPrice(order.total)}</TableCell>
							<TableCell>
								<OrderStatusBadge status={order.status} />
							</TableCell>
							<TableCell>
								<Link className='underline' href={`/order/${order.id}`}>
									View
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</main>
	);
}
