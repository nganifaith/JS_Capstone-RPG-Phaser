/**
 * @jest-environment jsdom
 */
import CreditsScene from '../scenes/CreditsScene';

require('jest-canvas-mock');

jest.mock('../scenes/CreditsScene');

beforeEach(() => {
  CreditsScene.mockClear();
});

test('Boot Scene Test', () => {
  expect(new CreditsScene()).toBeInstanceOf(CreditsScene);
});
