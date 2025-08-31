'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		// global-error must include html and body tags
		<html>
			<body>
				<main className='container mx-auto flex flex-col items-center justify-center h-screen gap-4'>
					<h1 className='text-2xl font-bold'>Something went wrong!</h1>
					<p className='text-sm text-center text-muted-foreground'>An error occurred while fetching the product.</p>
					<Button onClick={() => reset()}>Try again</Button>
					<Link href='/' className='text-sm text-muted-foreground hover:underline'>
						Go back to home
					</Link>
				</main>
			</body>
		</html>
	);
}
