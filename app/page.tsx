import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Suspense } from 'react';
import ProductsSkeleton from './ProductsSkeleton';
import Breadcrumbs from '@/components/breadcrumbs';
import ProductListServerWrapper from '@/components/product-list-sever-wrapper';
import { getProductsCountCached } from '@/lib/actions';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const pageSize = 3;

export default async function HomePage(props: { searchParams: SearchParams }) {
	const searchParams = await props.searchParams;

	const page = Number(searchParams.page) || 1;

	const total = await getProductsCountCached();
	const totalPages = Math.ceil(total / pageSize);

	return (
		<main className='container mx-auto py-4 md:px-0 px-4'>
			<Breadcrumbs items={[{ label: 'Products', href: '/' }]} />

			<Suspense key={page} fallback={<ProductsSkeleton />}>
				<ProductListServerWrapper params={{ page, pageSize }} />
			</Suspense>

			<Pagination className='mt-8'>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href={`?page=${page - 1}`} />
					</PaginationItem>

					{Array.from({ length: totalPages }, (_, index) => (
						<PaginationItem key={index}>
							<PaginationLink href={`?page=${index + 1}`} className={page === index + 1 ? 'active border-2 border-background' : ''}>
								{index + 1}
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext href={`?page=${page + 1}`} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</main>
	);
}
