/**
 * @jest-environment jsdom
 */
import TitleScene from '../scenes/TitleScene';

require('jest-canvas-mock');

jest.mock('../scenes/TitleScene');

beforeEach(() => {
  TitleScene.mockClear();
});

test('Title Scene Test', () => {
  expect(new TitleScene()).toBeInstanceOf(TitleScene);
});
