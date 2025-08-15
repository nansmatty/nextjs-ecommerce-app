'use client';

import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialQuery = searchParams.get('query') || '';
	const [query, setQuery] = useState(initialQuery);

	useEffect(() => {
		setQuery(initialQuery);
	}, [initialQuery]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedQuery = query.trim();
		const params = new URLSearchParams();

		if (trimmedQuery) {
			params.set('query', trimmedQuery);
			router.push(`/search?${params.toString()}`);
		} else {
			router.push(`/search`);
		}
	};

	return (
		<form className='w-full relative' onSubmit={handleSearch}>
			<SearchIcon className='absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
			<Input type='search' placeholder='Search' className='pl-8' value={query} onChange={(e) => setQuery(e.target.value)} />
		</form>
	);
};

export default SearchInput;
