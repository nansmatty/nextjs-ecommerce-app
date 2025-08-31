import Breadcrumbs from '@/components/breadcrumbs';
import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import ProductsSkeleton from '../../ProductsSkeleton';
import { notFound } from 'next/navigation';
import ProductListServerWrapper from '@/components/product-list-sever-wrapper';

// In promise because everything in nextjs 15 is promise based
type CategoryPageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ sort?: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const category = await prisma.category.findUnique({
		where: { slug },
		select: { name: true },
	});

	if (!category) {
		return {};
	}

	return {
		title: category.name,
		openGraph: {
			title: category.name,
		},
	};
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
	const { slug } = await params;
	const { sort } = await searchParams;

	const category = await prisma.category.findUnique({
		where: { slug },
		select: { name: true, slug: true },
	});
	if (!category) {
		notFound();
	}

	const breadcrumbs = [
		{ label: 'Products', href: '/' },
		{ label: category.name, href: `/search/${category.slug}` },
	];

	return (
		<>
			<Breadcrumbs items={breadcrumbs} />

			<Suspense key={`${slug}-${sort}`} fallback={<ProductsSkeleton />}>
				<ProductListServerWrapper params={{ slug, sort }} />
			</Suspense>
		</>
	);
};

export default CategoryPage;
