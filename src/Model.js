/* eslint-disable no-underscore-dangle */
export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._platformStartSpeed = 250;
    this._spawnRange = [100, 350];
    this._platformSizeRange = [50, 250];
    this._playerGravity = 900;
    this._jumpForce = 400;
    this._playerStartPosition = 200;
    this._jumps = 2;
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }

  get platformSizeRange() {
    return this._platformSizeRange;
  }

  get platformStartSpeed() {
    return this._platformStartSpeed;
  }

  get spawnRange() {
    return this._spawnRange;
  }

  get playerGravity() {
    return this._playerGravity;
  }

  get jumpForce() {
    return this._jumpForce;
  }

  get jumps() {
    return this._jumps;
  }

  get playerStartPosition() {
    return this._playerStartPosition;
  }
}
