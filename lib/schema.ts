import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.email({
		message: 'Please enter a valid email address.',
	}),
	password: z.string().min(8, {
		message: 'Password mist be at least 8 characters long.',
	}),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
	.object({
		name: z.string().min(3, {
			message: 'name must be at least 3 chracters long.',
		}),
		email: z.email({
			message: 'Please enter a valid email address.',
		}),
		password: z.string().min(8, {
			message: 'Password mist be at least 8 characters long.',
		}),
		confirmPassword: z.string().min(8, {
			message: 'Password mist be at least 8 characters long.',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
