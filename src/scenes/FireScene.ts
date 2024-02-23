import { Container, Sprite } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { GameScene } from './GameScene';

export class FireScene extends Container implements IScene {
	constructor() {
		super();
	}

	resize(screenWidth: number, screenHeight: number): void {}

	update(framesPassed: number): void {}
}
