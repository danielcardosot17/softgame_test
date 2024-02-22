import type { AssetsManifest } from 'pixi.js';

export const manifest: AssetsManifest = {
	bundles: [
		{
			name: 'bundleName',
			assets: {
				'Clampy the clamp': './clampy.png',
			},
		},
	],
};
