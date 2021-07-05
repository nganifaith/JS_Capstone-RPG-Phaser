import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1334,
  height: 750,
  backgroundColor: 0x444444,

  // physics settings
  physics: {
    default: 'arcade',
  },
};
