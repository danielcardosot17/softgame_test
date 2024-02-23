import { Assets, Container, Sprite, Texture } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { GameScene } from './GameScene';
import { MenuScene } from './MenuScene';
import { CustomTextDisplay } from '../ui/CustomTextDisplay';

export class TextScene extends Container implements IScene {
	private menuSceneButton: LargeButton;
	private customTextDisplay: CustomTextDisplay;
	private reservedEmotesTextures;
	private emotesStringTextureMap: Map<string, Texture> = new Map<
		string,
		Texture
	>();
	private predefinedEmoteStrings: string[] = [];
	private predefinedTexts: string[] = [
		'Hello',
		'Welcome',
		'potato',
		'tomato',
		'monkey',
		'horse',
		'duck',
	];

	private timer: number = 0;
	constructor() {
		super();
		this.menuSceneButton = new LargeButton({ text: 'Back to Menu' });
		this.menuSceneButton.onPress.connect(() =>
			Manager.changeScene(new MenuScene())
		);

		this.reservedEmotesTextures = Assets.cache.get('emoticons').textures;

		for (const emoteName in this.reservedEmotesTextures) {
			// var finalString = ':' + emoteName.replace('.png', '') + '::';
			this.predefinedEmoteStrings.push(emoteName);
			this.emotesStringTextureMap.set(
				emoteName,
				this.reservedEmotesTextures[emoteName]
			);
		}

		this.customTextDisplay = new CustomTextDisplay(this.emotesStringTextureMap);

		this.addChild(this.menuSceneButton);
		this.addChild(this.customTextDisplay);
	}

	resize(screenWidth: number, screenHeight: number): void {
		this.menuSceneButton.x = screenWidth * 0.5;
		this.menuSceneButton.y = screenHeight * 0.9;

		this.customTextDisplay.x = screenWidth * 0.5;
		this.customTextDisplay.y = screenHeight * 0.4;
	}

	update(framesPassed: number): void {
		var deltaTime = framesPassed / 60;
		this.timer += deltaTime;
		if (this.timer >= 2) {
			this.timer = 0;
			this.customTextDisplay.updateText(
				this.getRandomText(),
				this.getRandomEmoteName()
			);
		}
	}
	getRandomEmoteName(): string {
		var randomEmoteIndex = Math.floor(
			Math.random() * this.predefinedEmoteStrings.length
		);
		var emoteString = this.predefinedEmoteStrings[randomEmoteIndex];
		return emoteString;
	}

	getRandomText(): string {
		var randomIndexForText = Math.floor(
			Math.random() * this.predefinedTexts.length
		);
		// var randomEmoteIndex = Math.floor(
		// 	Math.random() * this.predefinedEmoteStrings.length
		// );
		// var emoteString = this.predefinedEmoteStrings[randomEmoteIndex];
		// return this.predefinedTexts[randomIndexForText] + ' ' + emoteString;
		return this.predefinedTexts[randomIndexForText];
	}
}
