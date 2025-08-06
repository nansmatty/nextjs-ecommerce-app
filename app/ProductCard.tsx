import { Product } from '@/lib/mocks';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

function ProductCard({ product }: { product: Product }) {
	return (
		<div className='border p-4 rounded-lg shadow hover:shadow-lg transition-shadow'>
			<div className='relative w-full h-48 mb-4'>
				<Image
					src={product.imageUrl}
					alt={product.name}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className='object-cover'
					fill
				/>
			</div>
			<h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
			<p className='text-gray-700 mb-2'>{formatPrice(product.price)}</p>
			<p className='text-gray-500'>{product.description}</p>
			{/* <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>Add to Cart</button> */}
		</div>
	);
}

export default ProductCard;
