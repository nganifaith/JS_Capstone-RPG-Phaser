import Phaser from 'phaser';
import config from '../Config/config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
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
      platform = this.physics.add
        .sprite(posX, config.height * 0.96, 'platform')
        .setScale(0.7);
      platform.setImmovable(true);
      platform.setVelocityX(this.model.platformStartSpeed * -1);
      this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(
      this.model.spawnRange[0],
      this.model.spawnRange[1],
    );
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.runner = this.sys.game.globals.player;
    this.api = this.sys.game.globals.api;

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

    this.addLayer('sky');
    this.addLayer('clouds_1');
    this.addLayer('clouds_2');
    this.addLayer('clouds_3');
    this.addLayer('clouds_4');
    this.addLayer('rocks_1');
    this.addLayer('rocks_2');

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.playerJumps = 0;

    // adding a platform to the game, the arguments are platform width and x position
    this.addPlatform(config.width, config.width / 2);

    // adding the player;
    this.player = this.physics.add.sprite(
      this.model.playerStartPosition,
      config.height / 2,
      'player',
    );
    this.player.setGravityY(this.model.playerGravity);
    this.player.anims.play('right', true);

    this.playerName = this.add.text(16, 16, this.runner.name, {
      fontSize: '32px',
      fill: '#000',
    });
    this.highScore = this.add.text(16, 50, `HI ${this.runner.highScore}`, {
      fontSize: '32px',
      fill: '#000',
    });
    this.scoreText = this.add.text(16, 85, this.runner.currentScore, {
      fontSize: '32px',
      fill: '#000',
    });

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
    this.runner.startScoring();
  }

  addLayer(name) {
    this[name] = this.add.tileSprite(0, 0, config.width, config.height, name);
    // Set its pivot to the top left corner
    this[name].setOrigin(0, 0);
    // fixe it so it won't move when the camera moves.
    // Instead we are moving its texture on the update
    this[name].setScrollFactor(0);
  }

  jump() {
    if (
      this.player.body.touching.down
      || (this.playerJumps > 0 && this.playerJumps < this.model.jumps)
    ) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(this.model.jumpForce * -1);
      this.playerJumps += 1;
    }
  }

  update() {
    // game over
    if (this.player.y > config.height) {
      this.scene.start('Credits');
      this.runner.stopScoring();
      this.highScore.setText(`HI ${this.runner.highScore}`);
      this.api.createScore(this.runner.name, this.runner.currentScore);
    }
    this.player.x = this.model.playerStartPosition;
    this.scoreText.setText(this.runner.currentScore);

    this.sky.tilePositionX += 1;
    this.clouds_1.tilePositionX += 1.5;
    this.clouds_2.tilePositionX += 2;
    this.clouds_3.tilePositionX += 2.5;
    this.clouds_4.tilePositionX += 3;
    this.rocks_1.tilePositionX += 3.5;
    this.rocks_2.tilePositionX += 4.5;

    // recycling platforms
    let minDistance = config.width;
    this.platformGroup.getChildren().forEach((platform) => {
      const platformDistance = config.width - platform.x - platform.displayWidth / 2;
      minDistance = Math.min(minDistance, platformDistance);
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    // adding new platforms
    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser.Math.Between(
        this.model.platformSizeRange[0],
        this.model.platformSizeRange[1],
      );
      this.addPlatform(nextPlatformWidth, config.width + nextPlatformWidth / 2);
    }
  }
}
