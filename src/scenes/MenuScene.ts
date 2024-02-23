import { Container, Text } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { CardsParticleScene } from './CardsParticleScene';
import { TextScene } from './TextScene';
import { FireScene } from './FireScene';
import { FpsDisplay } from '../ui/FpsDisplay';
import { CardsSpriteScene } from './CardsSpriteScene';

export class MenuScene extends Container implements IScene {
	/** Button that leads to gameplay */
	private cardsParticleSceneButton: LargeButton;
	private cardsSpriteSceneButton: LargeButton;
	private textSceneButton: LargeButton;
	private fireSceneButton: LargeButton;

	constructor() {
		super();

		this.cardsSpriteSceneButton = new LargeButton({
			text: 'Cards Sprites Scene',
		});

		this.cardsParticleSceneButton = new LargeButton({
			text: 'Cards Particle Scene',
		});

		this.textSceneButton = new LargeButton({ text: 'Text Scene' });

		this.fireSceneButton = new LargeButton({ text: 'Fire Scene' });

		this.cardsSpriteSceneButton.onPress.connect(() =>
			Manager.changeScene(new CardsSpriteScene())
		);

		this.cardsParticleSceneButton.onPress.connect(() =>
			Manager.changeScene(new CardsParticleScene())
		);

		this.textSceneButton.onPress.connect(() =>
			Manager.changeScene(new TextScene())
		);

		this.fireSceneButton.onPress.connect(() =>
			Manager.changeScene(new FireScene())
		);

		this.addChild(this.cardsParticleSceneButton);
		this.addChild(this.cardsSpriteSceneButton);
		this.addChild(this.textSceneButton);
		this.addChild(this.fireSceneButton);
	}

	resize(screenWidth: number, screenHeight: number): void {
		this.cardsParticleSceneButton.x = screenWidth * 0.75;
		this.cardsParticleSceneButton.y = screenHeight * 0.25;

		this.cardsSpriteSceneButton.x = screenWidth * 0.25;
		this.cardsSpriteSceneButton.y = screenHeight * 0.25;

		this.textSceneButton.x = screenWidth * 0.5;
		this.textSceneButton.y = screenHeight * 0.5;

		this.fireSceneButton.x = screenWidth * 0.5;
		this.fireSceneButton.y = screenHeight * 0.75;
	}

	update(framesPassed: number): void {}
}
