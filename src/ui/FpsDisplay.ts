import { BitmapFont, BitmapText, Container, Text, TextStyle } from 'pixi.js';

export class FpsDisplay extends Container {
	private pixiText: BitmapText;
	constructor() {
		super();

		BitmapFont.from('comic 32', {
			fill: '#ffffff', // White, will be colored later
			fontFamily: 'Comic Sans MS',
			fontSize: 24,
		});

		this.pixiText = new BitmapText('FPS ', {
			fontName: 'comic 32',
			fontSize: 24, // Making it too big or too small will look bad
			tint: 0x000000, // Here we make it red.
		});
		this.addChild(this.pixiText);
	}

	public updateFps(fps: number): void {
		this.pixiText.text = 'FPS ' + fps.toFixed(0);
	}
}
