import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { MenuScene } from './MenuScene';

export class FireScene extends Container implements IScene {
	private menuSceneButton: LargeButton;
	private animatedSprite: AnimatedSprite;

	constructor() {
		super();
		this.menuSceneButton = new LargeButton({ text: 'Back to Menu' });
		this.menuSceneButton.onPress.connect(() =>
			Manager.changeScene(new MenuScene())
		);

		const fireTextures: Texture[] = [];
		for (let i = 1; i <= 19; i++) {
			fireTextures.push(Texture.from('Fire+Sparks' + i + '.png'));
		}

		this.animatedSprite = new AnimatedSprite(fireTextures);
		this.animatedSprite.animationSpeed = 0.4;
		this.animatedSprite.play();

		this.addChild(this.menuSceneButton);
		this.addChild(this.animatedSprite);
	}

	resize(screenWidth: number, screenHeight: number): void {
		this.menuSceneButton.x = screenWidth * 0.5;
		this.menuSceneButton.y = screenHeight * 0.9;

		this.animatedSprite.x = screenWidth * 0.05;
		this.animatedSprite.y = screenHeight * 0.3;

		this.animatedSprite.scale.set(3);
	}

	update(framesPassed: number): void {}
}
