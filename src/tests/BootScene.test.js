/**
 * @jest-environment jsdom
 */
import BootScene from '../scenes/BootScene';

require('jest-canvas-mock');

jest.mock('../Scenes/BootScene');

beforeEach(() => {
  BootScene.mockClear();
});

test('Boot Scene Test', () => {
  expect(new BootScene()).toBeInstanceOf(BootScene);
});
