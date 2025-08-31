import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},
	webpack: (config) => {
		config.watchOptions = {
			...config.watchOptions,
			ignored: [
				'**/node_modules/**',
				'**/.git/**',
				'**/Application Data/**',
				'**/AppData/**',
				'**/System Volume Information/**',
				'**/$Recycle.Bin/**',
			],
		};
		return config;
	},
};

export default nextConfig;
