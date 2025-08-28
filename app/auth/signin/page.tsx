'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LoginSchema, LoginSchemaType } from '@/lib/schema';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
	const [error, setError] = useState<string | null>(null);
	const { data: session, update: updateSession } = useSession();

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const router = useRouter();

	const onSubmit = async (data: LoginSchemaType) => {
		setError(null);
		try {
			const result = await signIn('credentials', {
				email: data.email,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				if (result.error === 'CredentialsSignin') {
					setError('Invalid Credentials');
				} else {
					setError('An error occurred while signing in');
				}
			} else {
				await updateSession();
				router.push('/');
			}
		} catch (err) {
			console.error('Sign in error', err);
			setError('An error occurred while signing in');
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-center'>Sign-in to your account</CardTitle>
					<CardDescription className='text-center'>Enter your email and password to sign in to you account</CardDescription>
				</CardHeader>
				<CardContent>
					{error && (
						<Alert variant='destructive' className='mb-4'>
							<AlertCircleIcon />
							<AlertTitle>{error}</AlertTitle>
						</Alert>
					)}
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder='Email' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type='password' placeholder='Password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full'>
								Sign In
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<div className='w-full flex justify-center text-sm'>
						<p>Don't have an account ?</p>&nbsp;{' '}
						<Link href='/auth/signup' className='text-primary hover:underline'>
							Sign Up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
