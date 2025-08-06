import { Product } from '@/lib/mocks';

function ProductCard({ product }: { product: Product }) {
	return (
		<div className='border p-4 rounded-lg shadow hover:shadow-lg transition-shadow'>
			<img src={product.imageUrl} alt={product.name} className='w-full h-48 object-cover mb-4 rounded' />
			<h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
			<p className='text-gray-700 mb-2'>${product.price.toFixed(2)}</p>
			<p className='text-gray-500'>{product.description}</p>
			{/* <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'>Add to Cart</button> */}
		</div>
	);
}

export default ProductCard;
