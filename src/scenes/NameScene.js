import Phaser from 'phaser';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super('Name');
  }

  create() {
    const element = this.add
      .dom(window.innerWidth / 2, window.innerHeight / 6)
      .createFromCache('nameForm');

    this.runner = this.sys.game.globals.player;

    element.addListener('click');

    element.on('click', () => {
      const inputText = document.querySelector('.nameField');
      if (inputText.value !== '') {
        this.runner.name = inputText.value;
        this.runner.highScore = 0;
        this.scene.start('Title');
      }
    });
  }
}
