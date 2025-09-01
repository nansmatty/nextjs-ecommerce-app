import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		ignores: [
			'.next/**', // Next.js build output
			'node_modules/**', // dependencies
			'app/generated/**', // Prisma client output
			'prisma/generated/**', // (if you ever generate there)
			'.prisma/**', // prisma’s hidden client cache
		],
	},
	{
		rules: {
			'react/no-unescaped-entities': 'off', // Next.js does this for some reason'
			'@typescript-eslint/triple-slash-reference': 'off', // Next.js requires this for some reason'
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
		},
	},
];

export default eslintConfig;
