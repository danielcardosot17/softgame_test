import { Sprite } from 'pixi.js';
import { lerp } from '../utils/lerp';

export class CardMoverComponent {
	private elapsedTime: number;
	public cardSprite: Sprite;
	private initialX: number;
	private initialY: number;
	private movementTime: number = 2;
	public hasArrived: boolean = false;
	public invertZindex: boolean = false;

	constructor(cardSprite: Sprite, initialX: number, initialY: number) {
		this.elapsedTime = 0;
		this.cardSprite = cardSprite;
		this.initialX = initialX;
		this.initialY = initialY;
	}

	updatePosition(deltaTime: number, finalX: number, finalY: number) {
		this.elapsedTime += deltaTime;
		this.cardSprite.x = lerp(
			this.initialX,
			finalX,
			this.movementTime,
			this.elapsedTime
		);
		this.cardSprite.y = lerp(
			this.initialY,
			finalY,
			this.movementTime,
			this.elapsedTime
		);

		if (this.elapsedTime >= this.movementTime / 2 && !this.invertZindex) {
			this.invertZindex = true;
			this.cardSprite.zIndex *= -1;
		}

		if (this.cardSprite.x == finalX && this.cardSprite.y == finalY) {
			this.hasArrived = true;
		}
	}
}
