'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RegisterSchema, RegisterSchemaType } from '@/lib/schema';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/actions/register-auth';

export default function SignUpPage() {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: RegisterSchemaType) => {
		setError(null);
		form.clearErrors();
		try {
			const result = await registerUser(data);

			if (!result?.success) {
				setError(result?.error || 'An error occurred while creating an account.');
				return;
			}

			router.push('/auth/signin');
		} catch (err) {
			console.error('Registration error', err);
			setError('An error occurred while creating an account.');
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-center'>Create an account</CardTitle>
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
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Name' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
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
							<FormField
								control={form.control}
								name='confirmPassword'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm Password</FormLabel>
										<FormControl>
											<Input type='password' placeholder='Confirm Password' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
								Sign Up
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					<div className='w-full flex justify-center text-sm'>
						<p>Already have an account ?</p>&nbsp;{' '}
						<Link href='/auth/signin' className='text-primary hover:underline'>
							Sign In
						</Link>
					</div>
				</CardFooter>
			</Card>
		</main>
	);
}
