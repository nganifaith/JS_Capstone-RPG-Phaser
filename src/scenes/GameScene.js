import { Scene } from 'phaser';

class GameScene extends Scene {
  constructor() {
    super('scene-game');
  }

  create() {
    // Add, scale, and make up a speed for our creature
    this.cat = this.physics.add.sprite(10, 10, 'cat-like');
    this.cat.body.setAllowGravity(false);
    this.cat.setScale(0.5);
    this.catSpeed = 300;
    // Create a helper object for our arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // Listen for keyboard input
    const { left, right, up, down } = this.cursors;
    if (left.isDown) {
      this.cat.setVelocityX(-this.catSpeed);
    } else if (right.isDown) {
      this.cat.setVelocityX(this.catSpeed);
    } else {
      this.cat.setVelocityX(0);
    }
    if (up.isDown) {
      this.cat.setVelocityY(-this.catSpeed);
    } else if (down.isDown) {
      this.cat.setVelocityY(this.catSpeed);
    } else {
      this.cat.setVelocityY(0);
    }
  }
}
export default GameScene;
