/**
 * @jest-environment jsdom
 */
import OptionsScene from '../scenes/OptionsScene';

require('jest-canvas-mock');

jest.mock('../scenes/OptionsScene');

beforeEach(() => {
  OptionsScene.mockClear();
});

test('Boot Scene Test', () => {
  expect(new OptionsScene()).toBeInstanceOf(OptionsScene);
});
