import useSWR, { mutate } from 'swr';

export function useCart() {
	const { data, isLoading, error } = useSWR('/api/cart', (url) => fetch(url).then((res) => res.json()), {
		fallbackData: { itemCount: 0 },
	});

	const revalidateCart = () => {
		mutate('/api/cart');
	};

	return {
		itemCount: data?.itemCount || 0,
		isLoading,
		error,
		revalidateCart,
	};
}
