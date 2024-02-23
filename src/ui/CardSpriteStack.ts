import { Container, Sprite } from 'pixi.js';
import { Card } from './Card';
import { assetManifest } from '../asset_manifest';

export class CardSpriteStack extends Container {
	cards: Card[] = [];
	constructor(cardInitialAmount: number) {
		super();

		var cardNames: string[] = this.getCardNames();

		for (let i = 0; i < cardInitialAmount; i++) {
			this.addCard(this.getRandomName(cardNames));
		}
	}

	getRandomName(cardNames: string[]): string {
		var randomIndex = Math.floor(Math.random() * cardNames.length);
		return cardNames[randomIndex];
	}

	getCardNames(): string[] {
		return Object.keys(assetManifest.bundles[1].assets);
	}

	public addCard(cardSpriteName: string) {
		var card = new Card(cardSpriteName);
		card.sprite.anchor.set(0.5);
		card.sprite.x = this.cards.length * 1;
		card.sprite.y = this.cards.length * 0.5;
		card.sprite.zIndex = this.cards.length;
		this.addChild(card.sprite);
		this.cards.push(card);
	}

	public removeCard(card: Card) {
		const index = this.cards.indexOf(card);
		if (index > -1) {
			this.cards.splice(index, 1);
		}
		this.removeChild(card.sprite);
	}

	public getLastCardGlobalPosition(): { x: number; y: number } {
		if (this.cards.length == 0) {
			return {
				x: this.getGlobalPosition().x,
				y: this.getGlobalPosition().y,
			};
		} else {
			return {
				x: this.getChildAt(this.cards.length - 1).getGlobalPosition().x,
				y: this.getChildAt(this.cards.length - 1).getGlobalPosition().y,
			};
		}
	}

	public getCardAt(index: number) {
		return this.cards[index];
	}
}
