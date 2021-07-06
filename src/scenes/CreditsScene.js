import Phaser from 'phaser';
import config from '../Config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.runner = this.sys.game.globals.player;
    this.creditsText = this.add.text(0, 0, 'Game Over', {
      fontSize: '52px',
      fill: '#fff',
    });

    this.highScoreText = this.add.text(0, 0, `Hi: ${this.runner.highScore}`, {
      fontSize: '26px',
      fill: '#fff',
    });

    this.currentScoreText = this.add.text(
      0,
      0,
      `Last Score: ${this.runner.currentScore}`,
      {
        fontSize: '26px',
        fill: '#fff',
      },
    );

    this.madeByText = this.add.text(0, 0, 'Created By: Ngani Faith', {
      fontSize: '26px',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(this.creditsText, this.zone);

    Phaser.Display.Align.In.Center(this.currentScoreText, this.zone);
    Phaser.Display.Align.In.Center(this.highScoreText, this.zone);
    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.currentScoreText.setY(1000);
    this.highScoreText.setY(1000);
    this.madeByText.setY(1000);

    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete: () => {
        this.creditsTween.stop();
      },
    });

    this.currentScoreTween = this.tweens.add({
      targets: this.currentScoreText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => {
        this.currentScoreTween.stop();
      },
    });

    this.highScoreTween = this.tweens.add({
      targets: this.highScoreText,
      y: -500,
      ease: 'Power1',
      duration: 13000,
      delay: 1000,
      onComplete: () => {
        this.highScoreTween.stop();
      },
    });

    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -700,
      ease: 'Power1',
      duration: 18000,
      delay: 1000,
      onComplete: () => {
        this.madeByTween.stop();
        this.scene.start('Title');
      },
    });
  }
}
