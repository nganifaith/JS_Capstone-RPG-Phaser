/**
 * @jest-environment jsdom
 */
import GameScene from '../scenes/GameScene';

require('jest-canvas-mock');

jest.mock('../scenes/GameScene');

beforeEach(() => {
  GameScene.mockClear();
});

test('Game Scene Test', () => {
  expect(new GameScene()).toBeInstanceOf(GameScene);
});
