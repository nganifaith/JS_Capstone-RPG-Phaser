/* eslint-disable no-underscore-dangle */
export default class Player {
  constructor() {
    this._name = '';
    this._currentScore = 0;
    this._highScore = 0;
    this.playTime = null;
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set currentScore(value) {
    this._currentScore = value;
  }

  get currentScore() {
    return this._currentScore;
  }

  set highScore(value) {
    this._highScore = value;
  }

  get highScore() {
    return this._highScore;
  }

  startScoring() {
    this.currentScore = 0;
    this.playTime = setInterval(() => {
      this.currentScore += 1;
    }, 1000);
  }

  stopScoring() {
    clearInterval(this.playTime);
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
    }
  }
}
