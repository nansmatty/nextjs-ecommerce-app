import { getProducts, GetProductsParams } from '@/lib/actions';
import ProductList from './product-list';

interface ProductListServerWrapperProps {
	params: GetProductsParams;
}

export default async function ProductListServerWrapper({ params }: ProductListServerWrapperProps) {
	const products = await getProducts(params);
	return <ProductList products={products} />;
}
