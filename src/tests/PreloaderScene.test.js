/**
 * @jest-environment jsdom
 */
import PreloaderScene from '../scenes/PreloaderScene';

require('jest-canvas-mock');

jest.mock('../Scenes/PreloaderScene');

beforeEach(() => {
  PreloaderScene.mockClear();
});

test('Preloader Scene Test', () => {
  expect(new PreloaderScene()).toBeInstanceOf(PreloaderScene);
});
