import { Container, Sprite } from 'pixi.js';
import { IScene, Manager } from '../Manager';

export class MenuScene extends Container implements IScene {
	constructor() {
		super();
	}

	resize(screenWidth: number, screenHeight: number): void {}

	update(framesPassed: number): void {}
}
