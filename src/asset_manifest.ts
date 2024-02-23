import type { AssetsManifest } from 'pixi.js';

export const assetManifest: AssetsManifest = {
	bundles: [
		{
			name: 'cardScene',
			assets: {
				'Card Back': './cards/card_back.png',
				'Card Clubs A': './cards/card_clubs_A.png',
			},
		},
	],
};
