import AddToCartButton from '@/components/add-to-cart-btn';
import Breadcrumbs from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProductBySlug } from '@/lib/actions';
import { formatPrice } from '@/lib/utils';
import { HeartIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		return {};
	}

	return {
		title: product.name,
		description: product.description,
		openGraph: {
			title: product.name,
			description: product.description,
			images: [
				{
					url: product.imageUrl,
					alt: product.name,
				},
			],
		},
	};
}

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	if (!product) {
		notFound();
	}

	const breadcrumbItems = [
		{ label: 'Products', href: `/`, active: true },
		{ label: product.category?.name || 'Category', href: `/search/${product.category?.slug}`, active: false },
		{ label: product.name, href: `/product/${slug}`, active: true },
	];

	return (
		<main className='container mx-auto py-4 md:px-0 px-4'>
			<Breadcrumbs items={breadcrumbItems} />
			<Card className=' mx-auto'>
				<CardContent className='py-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						<div className='relative rounded-lg overflow-hidden aspect-video'>
							{product.imageUrl && (
								<Image src={product.imageUrl} alt={product.name} fill priority sizes='(max-width:768px) 100vw, 50vw' className='object-cover' />
							)}
						</div>
					</div>
					<div>
						<h1 className='text-3xl font-bold mb-2'>{product.name}</h1>
						<div className='flex items-center gap-2 mb-4'>
							<span className='font-semibold text-lg'>{formatPrice(product.price)}</span>
							<Badge variant='outline'>{product.category?.name}</Badge>
						</div>
						<Separator className='my-4' />
						<div className='space-y-2'>
							<h2 className='font-medium'>Description</h2>
							<p>{product.description}</p>
						</div>
						<Separator className='my-4' />
						<div className='space-y-2'>
							<h2 className='font-medium'>Availablity</h2>
							<div className='flex items-center gap-2'>
								{product.inventory > 0 ? (
									<Badge variant='outline' className='text-green-600 font-semibold'>
										In Stock
									</Badge>
								) : (
									<Badge variant='outline' className='text-red-600 font-semibold'>
										Out of Stock
									</Badge>
								)}

								{product.inventory > 0 && <span className='text-xs text-gray-500'>({product.inventory} items available)</span>}
							</div>
							<Separator className='my-4' />

							<div className='flex flex-col items-center gap-4'>
								<AddToCartButton product={product} />
								<Button className='px-4 py-2 bg-gray-200 w-full text-gray-800 rounded cursor-pointer hover:bg-gray-300 transition-colors'>
									<HeartIcon className='w-4 h-4' />
									Add to Wishlist
								</Button>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
};

export default ProductPage;
