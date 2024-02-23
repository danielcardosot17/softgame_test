import type { AssetsManifest } from 'pixi.js';

export const assetManifest: AssetsManifest = {
	bundles: [
		{
			name: 'menuScene',
			assets: {
				'button-large': './ui/button-large.png',
				'button-large-hover': './ui/button-large-hover.png',
				'button-large-press': './ui/button-large-press.png',
				'sfx-hover': './ui/sfx-hover.wav',
				'sfx-press': './ui/sfx-press.wav',
			},
		},
		{
			name: 'cardScene',
			assets: {
				'Card Back': './cards/card_back.png',
				'Card Clubs A': './cards/card_clubs_A.png',
			},
		},
		{
			name: 'fireScene',
			assets: {
				'fire sparks': './fire_particle/firespark.json',
				'poof-sprite': './poof_sprite.png',
			},
		},
		{
			name: 'textScene',
			assets: {
				emoticons: './emoticons/emoticons.json',
			},
		},
	],
};
