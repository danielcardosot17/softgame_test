import { ParticleContainer, Sprite } from 'pixi.js';

export class CardStack extends ParticleContainer {
	private cards: number;
	constructor(cardAmount: number, cardSpriteName: string) {
		super(cardAmount, {
			scale: true,
			position: true,
			rotation: true,
			uvs: true,
			alpha: true,
		});

		for (let i = 0; i < cardAmount; i++) {
			const cardSprite = Sprite.from(cardSpriteName);
			cardSprite.anchor.set(0.5);
			cardSprite.x = i * 1;
			cardSprite.y = i * 0.5;
			this.addChild(cardSprite);
		}

		this.cards = cardAmount;
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
