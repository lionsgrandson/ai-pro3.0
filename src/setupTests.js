// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// MDB observes input visibility; jsdom has no layout or IntersectionObserver.
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeEach(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false, media: query, addEventListener: jest.fn(), removeEventListener: jest.fn(),
  }));
  window.scrollTo = jest.fn();
  HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(undefined);
  HTMLMediaElement.prototype.pause = jest.fn();
});
