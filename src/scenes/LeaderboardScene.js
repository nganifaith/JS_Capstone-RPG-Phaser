import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
    this.users = [];
  }

  create() {
    this.texts = [
      this.add.text(config.width / 2 - 300, 10, 'Leader Board', {
        fontSize: '75px',
        fill: '#fff',
      }),
    ];

    this.optionsButton = new Button(
      this,
      config.width / 2 - 500,
      50,
      'blueButton1',
      'blueButton2',
      'Back',
      'Title',
    );

    this.sys.game.globals.api.fetchScores().then(({ result }) => {
      this.users = [...result].sort((a, b) => (a.score > b.score ? -1 : 1));
      this.texts = [
        ...this.texts,
        ...this.users.map((user, index) => this.add.text(
          config.width / 2 - 250,
          (index + 1) * 50 + 100,
          `${user.user}: ${user.score}`,
          {
            fontSize: '40px',
            fill: '#fff',
          },
        )),
      ];
    });
  }
}
