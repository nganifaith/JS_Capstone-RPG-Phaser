import { Scene } from 'phaser';

class BootScene extends Scene {
  constructor() {
    super('scene-boot');
  }

  preload() {
    // Load any assets here from your assets directory
    this.load.image('cat-like', 'assets/cat-like-creature.png');
  }

  create() {
    this.scene.start('scene-game');
  }
}

export default BootScene;
