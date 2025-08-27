import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function SignInPage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-4'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='text-center'>Sign-in to your account</CardTitle>
					<CardDescription className='text-center'>Enter your email and password to sign in to you account</CardDescription>
				</CardHeader>
				<CardContent>
					<form className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input type='email' id='email' placeholder='Email' />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='password'>Password</Label>
							<Input type='password' id='password' placeholder='Password' />
						</div>
						<Button type='submit' className='w-full'>
							Sign In
						</Button>
					</form>
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
