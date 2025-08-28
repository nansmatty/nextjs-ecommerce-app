import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import Navbar from '@/components/navbar';
import { SessionProvider } from 'next-auth/react';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'E-commerce Store',
	description: 'A simple e-commerce store built with Next.js and TypeScript',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<SessionProvider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
						<>
							<header>
								<Navbar />
							</header>
							{children}
							<footer className='border-t border-dashed py-6'>
								<div className='container mx-auto text-sm text-muted-foreground text-center'>
									© {new Date().getFullYear()} Your Company. All rights reserved.
								</div>
							</footer>
						</>
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
