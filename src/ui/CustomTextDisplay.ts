import {
	BitmapFont,
	BitmapText,
	Container,
	Sprite,
	Text,
	TextStyle,
	Texture,
} from 'pixi.js';

export class CustomTextDisplay extends Container {
	private pixiText: BitmapText;
	private imageSprite: Sprite;
	private emotesStringTextureMap: Map<string, Texture> = new Map<
		string,
		Texture
	>();
	constructor(emotesStringTextureMap: Map<string, Texture>) {
		super();

		this.emotesStringTextureMap = emotesStringTextureMap;
		const bitmapFont = BitmapFont.from('comic 32', {
			fill: '#ffffff', // White, will be colored later
			fontFamily: 'Comic Sans MS',
			fontSize: 24,
		});

		this.pixiText = new BitmapText('Random Text', {
			fontName: 'comic 32',
			fontSize: 24, // Making it too big or too small will look bad
			tint: 0x000000, // Here we make it red.
		});

		this.imageSprite = new Sprite(
			this.emotesStringTextureMap.get('emote_alert.png')
		);

		this.addChild(this.pixiText);
		this.addChild(this.imageSprite);
		this.pixiText.anchor.set(0.5);
		this.pixiText.x = -70;
		this.pixiText.y = 0;
		this.imageSprite.anchor.set(0.5);
		this.imageSprite.x = 70;
		this.imageSprite.y = 0;
	}

	public updateText(text: string, emoteName: string): void {
		var texture = this.emotesStringTextureMap.get(emoteName);
		if (texture) this.imageSprite.texture = texture;
		this.imageSprite.scale.set(this.randomIntFromInterval(0.2, 2));
		this.pixiText.text = text;
		this.pixiText.fontSize = this.randomIntFromInterval(16, 42);
	}

	randomIntFromInterval(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
}
