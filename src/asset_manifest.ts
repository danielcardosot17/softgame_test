import type { AssetsManifest } from 'pixi.js';

export const assetManifest: AssetsManifest = {
	bundles: [
		{
			name: 'bundleName',
			assets: {
				'Clampy the clamp': './clampy.png',
			},
		},
	],
};
