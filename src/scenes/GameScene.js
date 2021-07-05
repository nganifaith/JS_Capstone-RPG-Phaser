import Phaser from 'phaser';
import Model from '../Model';
import config from '../Config/config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('platform', 'assets/platform.png');
    this.load.spritesheet('player', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  addPlatform(platformWidth, posX) {
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
    } else {
      platform = this.physics.add.sprite(posX, config.height * 0.8, 'platform');
      platform.setImmovable(true);
      platform.setVelocityX(Model.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      Model.spawnRange[0],
      Model.spawnRange[1],
    );
  }

  create() {
    this.platformGroup = this.add.group({
      // once a platform is removed, it's added to the pool
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      // once a platform is removed from the pool, it's added to the active platforms group
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(config.width, config.width / 2);

    // adding the player;
    this.player = this.physics.add.sprite(
      Model.playerStartPosition,
      config.height / 2,
      'player',
    );
    this.player.setGravityY(Model.playerGravity);

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
  }

  jump() {
    if (
      this.player.body.touching.down
      || (this.playerJumps > 0 && this.playerJumps < Model.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(Model.jumpForce * -1);
      this.playerJumps += 1;
    }
  }
}
