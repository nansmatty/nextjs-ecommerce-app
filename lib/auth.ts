import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schema';
import prisma from './prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},

			authorize: async (credentials) => {
				const parsedCredentials = LoginSchema.safeParse(credentials);
				if (!parsedCredentials.success) {
					console.log('Invalid credentials format');
					return null;
				}

				const { email, password } = parsedCredentials.data;

				try {
					const user = await prisma.user.findUnique({
						where: { email },
					});

					if (!user) {
						console.log('No user found with this email.');
						return null;
					}

					const passwordMatch = await comparePassword(password, user.password);

					if (!passwordMatch) {
						throw new Error('Invalid credentials');
					}

					return user;
				} catch (error) {
					console.error('Error finding user:', error);
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
});

export async function hashPassword(password: string) {
	const saltRounds = 10;
	return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hashedPassword: string) {
	return await bcrypt.compare(password, hashedPassword);
}
