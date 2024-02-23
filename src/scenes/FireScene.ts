import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js';
import * as particles from '@pixi/particle-emitter';
import { IScene, Manager } from '../Manager';
import { LargeButton } from '../ui/LargeButton';
import { MenuScene } from './MenuScene';

export class FireScene extends Container implements IScene {
	private menuSceneButton: LargeButton;
	private animatedSprite: AnimatedSprite;
	private particleEmitter: particles.Emitter;
	private emitterContainer: Container;

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

		this.emitterContainer = new Container();
		this.addChild(this.emitterContainer);
		//////////////////
		this.particleEmitter = new particles.Emitter(
			// The PIXI.Container to put the emitter in
			// if using blend modes, it's important to put this
			// on top of a bitmap, and not use the root stage Container
			this.emitterContainer,
			// Emitter configuration, edit this to change the look
			// of the emitter
			{
				lifetime: {
					min: 1,
					max: 5,
				},
				frequency: 0.4,
				spawnChance: 1,
				maxParticles: 10,
				pos: {
					x: 0,
					y: 0,
				},
				addAtBack: false,
				behaviors: [
					{
						type: 'alpha',
						config: {
							alpha: {
								list: [
									{
										value: 1,
										time: 0,
									},
									{
										value: 0.8,
										time: 0.6,
									},
									{
										value: 0.4,
										time: 0.9,
									},
									{
										value: 0.2,
										time: 1,
									},
								],
								isStepped: false,
							},
						},
					},
					{
						type: 'moveSpeed',
						config: {
							speed: {
								list: [
									{
										value: 500,
										time: 0,
									},
									{
										value: 450,
										time: 0.7,
									},
									{
										value: 450,
										time: 1,
									},
								],
								isStepped: true,
							},
							minMult: 1,
						},
					},
					{
						type: 'scale',
						config: {
							scale: {
								list: [
									{
										value: 0.5,
										time: 0,
									},
									{
										value: 1,
										time: 1,
									},
								],
								isStepped: false,
							},
							minMult: 1,
						},
					},
					{
						type: 'color',
						config: {
							color: {
								list: [
									{
										value: 'fff191',
										time: 0,
									},
									{
										value: 'ff622c',
										time: 0.6,
									},
									{
										value: '111111',
										time: 0.7,
									},
									{
										value: '333333',
										time: 1,
									},
								],
								isStepped: false,
							},
						},
					},
					{
						type: 'rotation',
						config: {
							accel: 10,
							minSpeed: 20,
							maxSpeed: 50,
							minStart: 240,
							maxStart: 280,
						},
					},
					{
						type: 'textureSingle',
						config: {
							texture: Texture.from('poof-sprite'),
						},
					},
					{
						type: 'spawnShape',
						config: {
							type: 'torus',
							data: {
								x: 0,
								y: 0,
								radius: 20,
								innerRadius: 0,
								affectRotation: false,
							},
						},
					},
				],
			}
		);

		// Start emitting
		this.particleEmitter.emit = true;
	}

	resize(screenWidth: number, screenHeight: number): void {
		this.menuSceneButton.x = screenWidth * 0.5;
		this.menuSceneButton.y = screenHeight * 0.9;

		this.animatedSprite.x = screenWidth * 0.05;
		this.animatedSprite.y = screenHeight * 0.3;

		this.emitterContainer.x = screenWidth * 0.75;
		this.emitterContainer.y = screenHeight * 0.6;
		this.emitterContainer.scale.set(0.1);

		this.animatedSprite.scale.set(3);
	}

	update(framesPassed: number): void {
		this.particleEmitter.update(framesPassed / 60);
	}
}
