import { Sprite } from 'pixi.js';

export class Card {
	private name: string;
	private sprite: Sprite;

	constructor(name: string) {
		this.name = name;
		this.sprite = Sprite.from(name);
	}
}
