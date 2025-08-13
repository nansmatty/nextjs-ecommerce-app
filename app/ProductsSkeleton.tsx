import ProductCardSkeleton from './ProductCardSkeleton';

const ProductsSkeleton = () => {
	return (
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{Array.from({ length: 3 }).map((_, index) => (
				<ProductCardSkeleton key={index} />
			))}
		</div>
	);
};

export default ProductsSkeleton;
