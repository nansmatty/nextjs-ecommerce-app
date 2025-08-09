import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ProductCardSkeleton() {
	return (
		<Card className='pt-0 overflow-hidden min-h-[300px]'>
			<div className='relative aspect-video'>
				<Skeleton className='w-full h-full' />
			</div>
			<CardHeader>
				<Skeleton className='h-5 w-4/5' />
				<Skeleton className='h-4 w-full mt-2' />
			</CardHeader>
			<CardFooter className='flex justify-between items-center'>
				<Skeleton className='h-6 w-24' />
			</CardFooter>
		</Card>
	);
}

export default ProductCardSkeleton;
