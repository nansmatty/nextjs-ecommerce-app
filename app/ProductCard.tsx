import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import { Product } from './generated/prisma';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

function ProductCard({ product }: { product: Product }) {
	return (
		<Card className='pt-0 overflow-hidden min-h-[300px]'>
			<div className='relative aspect-video'>
				{product.imageUrl && (
					<Image
						src={product.imageUrl}
						alt={product.name}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						className='object-cover'
						fill
					/>
				)}
			</div>
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
				<CardDescription>{product.name}</CardDescription>
			</CardHeader>
			<CardFooter>
				<p>{formatPrice(product.price)}</p>
			</CardFooter>
		</Card>
	);
}

export default ProductCard;
