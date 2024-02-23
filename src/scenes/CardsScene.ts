import { Container, Sprite, Ticker } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { GameScene } from './GameScene';
import { CardStack } from '../ui/CardStack';
import { MenuScene } from './MenuScene';
import { lerp } from '../utils/lerp';

export class CardsScene extends Container implements IScene {
	private menuSceneButton: LargeButton;

	private numCards: number = 10;

	private leftCardStack: CardStack;
	private rightCardStack: CardStack;

	private currentCardIndex: number;
	private timer: number = 0;
	private movers: CardMoverComponent[] = [];

	constructor() {
		super();
		this.menuSceneButton = new LargeButton({ text: 'Back to Menu' });
		this.menuSceneButton.onPress.connect(() =>
			Manager.changeScene(new MenuScene())
		);

		this.leftCardStack = new CardStack(this.numCards, 'Card Clubs A');

		this.currentCardIndex = this.numCards - 1;

		this.rightCardStack = new CardStack(1, 'Card Clubs A');

		this.addChild(this.menuSceneButton);
		this.addChild(this.leftCardStack);
		this.addChild(this.rightCardStack);
	}

	resize(screenWidth: number, screenHeight: number): void {
		this.menuSceneButton.x = screenWidth * 0.5;
		this.menuSceneButton.y = screenHeight * 0.9;

		this.leftCardStack.x = screenWidth * 0.2;
		this.leftCardStack.y = screenHeight * 0.6;

		this.rightCardStack.x = screenWidth * 0.6;
		this.rightCardStack.y = screenHeight * 0.3;
	}

	update(framesPassed: number): void {
		let deltaTime = framesPassed / 60;
		this.timer += deltaTime;
		if (this.timer >= 1) {
			this.timer = 0;
			if (this.currentCardIndex >= 0) {
				this.addNewCardToMovers();
			}
		}

		this.updateMovers(deltaTime);
	}

	addNewCardToMovers() {
		var lastCardSprite = this.leftCardStack.getCardSpriteAt(
			this.currentCardIndex
		);

		var { x, y } = this.rightCardStack.getLastCardGlobalPosition();

		var finalX = x - this.leftCardStack.getGlobalPosition().x;
		var finalY = y - this.leftCardStack.getGlobalPosition().y;

		this.movers.push(
			new CardMoverComponent(
				lastCardSprite,
				lastCardSprite.x,
				lastCardSprite.y,
				finalX,
				finalY
			)
		);

		this.currentCardIndex--;
	}

	updateMovers(deltaTime: number) {
		for (let i = this.movers.length - 1; i >= 0; i--) {
			this.movers[i].updatePosition(deltaTime);
			if (this.movers[i].hasArrived) {
				this.movers.splice(i, 1); // remove from movers
			}
		}
	}
}

class CardMoverComponent {
	private elapsedTime: number;
	private cardSprite: Sprite;
	private finalX: number;
	private finalY: number;
	private initialX: number;
	private initialY: number;
	private movementTime: number = 2;
	public hasArrived: boolean = false;

	constructor(
		cardSprite: Sprite,
		initialX: number,
		initialY: number,
		finalX: number,
		finalY: number
	) {
		this.elapsedTime = 0;
		this.cardSprite = cardSprite;
		this.finalX = finalX;
		this.finalY = finalY;
		this.initialX = initialX;
		this.initialY = initialY;
	}

	updatePosition(deltaTime: number) {
		this.elapsedTime += deltaTime;
		this.cardSprite.x = lerp(
			this.initialX,
			this.finalX,
			this.movementTime,
			this.elapsedTime
		);
		this.cardSprite.y = lerp(
			this.initialY,
			this.finalY,
			this.movementTime,
			this.elapsedTime
		);

		if (this.cardSprite.x == this.finalX && this.cardSprite.y == this.finalY) {
			this.hasArrived = true;
		}
	}
}
