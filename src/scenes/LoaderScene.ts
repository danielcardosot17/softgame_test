import { Container, Graphics, Assets } from 'pixi.js';
import { IScene, Manager } from '../Manager';
import { assetManifest } from '../asset_manifest';
import { MenuScene } from './MenuScene';

export class LoaderScene extends Container implements IScene {
	// for making our loader graphics...
	private loaderBar: Container;
	private loaderBarBoder: Graphics;
	private loaderBarFill: Graphics;
	constructor() {
		super();

		const loaderBarWidth = Manager.width * 0.8;

		this.loaderBarFill = new Graphics();
		this.loaderBarFill.beginFill(0x008800, 1);
		this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
		this.loaderBarFill.endFill();
		this.loaderBarFill.scale.x = 0;

		this.loaderBarBoder = new Graphics();
		this.loaderBarBoder.lineStyle(10, 0x0, 1);
		this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

		this.loaderBar = new Container();
		this.loaderBar.addChild(this.loaderBarFill);
		this.loaderBar.addChild(this.loaderBarBoder);
		this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
		this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
		this.addChild(this.loaderBar);

		this.initializeLoader().then(() => {
			this.goToMenuScene();
		});
	}

	resize(screenWidth: number, screenHeight: number): void {}

	private async initializeLoader(): Promise<void> {
		await Assets.init({ manifest: assetManifest });

		const bundleIds = assetManifest.bundles.map((bundle) => bundle.name);

		const loadedBundles = await Assets.loadBundle(
			bundleIds,
			this.downloadProgress.bind(this)
		);
	}

	private downloadProgress(progressRatio: number): void {
		this.loaderBarFill.scale.x = progressRatio;
	}

	private goToMenuScene(): void {
		Manager.changeScene(new MenuScene());
	}

	public update(framesPassed: number): void {
		// To be a scene we must have the update method even if we don't use it.
	}
}
