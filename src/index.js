import './styles.css';
import Phaser from 'phaser';
import config from './Config/config';
import Model from './Model';
import Player from './player';
import {
  GameScene,
  TitleScene,
  PreloaderScene,
  BootScene,
  CreditsScene,
  OptionsScene,
} from './Scenes';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    const player = new Player();
    this.globals = { model, bgMusic: null, player };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

function resize() {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = window.game.config.width / window.game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  } else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
}

window.onload = () => {
  window.game = new Game();
  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};
