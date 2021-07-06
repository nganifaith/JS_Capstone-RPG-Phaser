import Phaser from 'phaser';
import config from '../Config/config';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('mountains-back', 'assets/mountains-back.png');
    this.load.image('mountains-mid1', 'assets/mountains-mid1.png');
    this.load.image('mountains-mid2', 'assets/mountains-mid2.png');
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
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.model = this.sys.game.globals.model;
    this.runner = this.sys.game.globals.player;

    // Set the games background colour
    this.cameras.main.setBackgroundColor('#697e96');
    const { width, height } = config;

    // this.mountainsBack = this.add.image(0, 0, 'mountains-back').setOrigin(0, 0);

    this.mountainsBack = this.add.tileSprite(
      0,
      height - this.textures.get('mountains-back').getSourceImage().height,
      width,
      this.textures.get('mountains-back').getSourceImage().height,
      'mountains-back',
    );

    // this.mountainsMid1 = this.add.tileSprite(
    //   0,
    //   this.game.height -
    //     this.textures.get('mountains-mid1').getSourceImage().height,
    //   this.game.width,
    //   this.textures.get('mountains-mid1').getSourceImage().height,
    //   'mountains-mid1'
    // );

    // this.mountainsMid2 = this.add.tileSprite(
    //   0,
    //   this.game.height -
    //     this.textures.get('mountains-mid2').getSourceImage().height,
    //   this.game.width,
    //   this.textures.get('mountains-mid2').getSourceImage().height,
    //   'mountains-mid2'
    // );

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
    this.scoreText = this.add.text(16, 75, this.runner.currentScore, {
      fontSize: '32px',
      fill: '#000',
    });

    // setting collisions between the player and the platform group
    this.physics.add.collider(this.player, this.platformGroup);

    // checking for input
    this.input.on('pointerdown', this.jump, this);
    this.runner.startScoring();
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
      // this.scene.start('PlayGame');
      this.runner.stopScoring();
      this.highScore.setText(`HI ${this.runner.highScore}`);
    }
    this.mountainsBack.x -= 0.05;
    // this.mountainsMid1.x -= 0.3;
    // this.mountainsMid2.x -= 0.75;

    this.player.x = this.model.playerStartPosition;
    this.scoreText.setText(this.runner.currentScore);
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
