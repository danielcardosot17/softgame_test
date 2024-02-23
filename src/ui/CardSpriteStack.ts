import { Container, Sprite } from 'pixi.js';

export class CardSpriteStack extends Container {
	private cards: number = 0;
	constructor(cardInitialAmount: number) {
		super();

		for (let i = 0; i < cardInitialAmount; i++) {
			this.addCard(cardSpriteName);
		}
	}

	public addCard(cardSpriteName: string) {
		const cardSprite = Sprite.from(cardSpriteName);
		cardSprite.anchor.set(0.5);
		cardSprite.x = this.cards * 1;
		cardSprite.y = this.cards * 0.5;
		cardSprite.zIndex = this.cards;
		this.addChild(cardSprite);
		this.cards++;
	}

	public removeCard(cardSprite: Sprite) {
		this.removeChild(cardSprite);
		this.cards--;
	}

	public getLastCardGlobalPosition(): { x: number; y: number } {
		if (this.cards == 0) {
			return {
				x: this.getGlobalPosition().x,
				y: this.getGlobalPosition().y,
			};
		} else {
			return {
				x: this.getChildAt(this.cards - 1).getGlobalPosition().x,
				y: this.getChildAt(this.cards - 1).getGlobalPosition().y,
			};
		}
	}

	public getCardSpriteAt(index: number) {
		return this.getChildAt(index);
	}
}
