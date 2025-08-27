import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { Prisma } from '@/app/generated/prisma';

interface OrderEntryProps {
	orderItem: Prisma.OrderItemGetPayload<{
		include: {
			product: true;
		};
	}>;
}

export default function OrderEntry({ orderItem }: OrderEntryProps) {
	return (
		<li className='border-b border-muted flex py-4 justify-between'>
			<div className='flex space-x-4'>
				<div className='overflow-hidden rounded-md border border-muted w-20 h-16'>
					{orderItem.product.imageUrl && (
						<Image className='h-full w-full object-cover' width={128} height={128} src={orderItem.product.imageUrl} alt={orderItem.product.name} />
					)}
				</div>
				<div className='flex flex-col'>
					<div className='font-medium'>{orderItem.product.name}</div>
				</div>
			</div>

			<div className='flex flex-col justify-between items-end gap-2'>
				<p className='font-medium'>{formatPrice(orderItem.price)}</p>

				<div className='flex items-center border border-muted rounded-full'>
					<p className='px-1 py-1 text-center'>Quantity: {orderItem.quantity}</p>
				</div>
			</div>
		</li>
	);
}
