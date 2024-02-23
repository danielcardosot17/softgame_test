import { Container, Ticker } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { GameScene } from './GameScene';
import { CardStack } from '../ui/CardStack';
import { MenuScene } from './MenuScene';
import { CardMoverComponent } from '../ui/CardMoverComponent';

export class CardsScene extends Container implements IScene {
	private menuSceneButton: LargeButton;

	private numCards: number = 144;

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

		this.leftCardStack = new CardStack(
			this.numCards,
			this.numCards,
			'Card Clubs A'
		);

		this.currentCardIndex = this.numCards - 1;

		this.rightCardStack = new CardStack(this.numCards, 0, 'Card Clubs A');

		this.addChild(this.menuSceneButton);
		this.addChild(this.rightCardStack);
		this.addChild(this.leftCardStack);
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
				// remove sprite from container
				this.leftCardStack.removeCard(this.movers[i].cardSprite);
				this.movers.splice(i, 1); // remove from movers
				this.rightCardStack.addCard('Card Clubs A');
			}
		}
	}
}
