import { Container, Sprite } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { GameScene } from './GameScene';
import { CardsScene } from './CardsScene';
import { TextScene } from './TextScene';
import { FireScene } from './FireScene';

export class MenuScene extends Container implements IScene {
	/** Button that leads to gameplay */
	private cardsSceneButton: LargeButton;
	private textSceneButton: LargeButton;
	private fireSceneButton: LargeButton;

	constructor() {
		super();

		this.cardsSceneButton = new LargeButton({ text: 'Cards Scene' });
		this.textSceneButton = new LargeButton({ text: 'Text Scene' });
		this.fireSceneButton = new LargeButton({ text: 'Fire Scene' });

		this.cardsSceneButton.onPress.connect(() =>
			Manager.changeScene(new CardsScene())
		);
		this.textSceneButton.onPress.connect(() =>
			Manager.changeScene(new TextScene())
		);
		this.fireSceneButton.onPress.connect(() =>
			Manager.changeScene(new FireScene())
		);
		this.addChild(this.cardsSceneButton);
		this.addChild(this.textSceneButton);
		this.addChild(this.fireSceneButton);
	}

	resize(screenWidth: number, screenHeight: number): void {}

	update(framesPassed: number): void {}
}
