import { Sprite } from 'pixi.js';

export class Card {
	name: string;
	sprite: Sprite;

	constructor(name: string) {
		this.name = name;
		this.sprite = Sprite.from(name);
	}
}
