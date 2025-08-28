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
