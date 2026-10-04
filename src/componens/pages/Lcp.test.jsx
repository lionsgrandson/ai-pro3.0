import { act, render, screen } from '@testing-library/react';
import Lcp from './Lcp';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key, i18n: { dir: () => 'ltr' } }) }));

test('decorative video stops within five seconds without a visible control', () => {
  jest.useFakeTimers();
  render(<Lcp />);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
  act(() => jest.advanceTimersByTime(5000));
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  jest.useRealTimers();
});

test('reduced motion keeps the video paused without starting playback', () => {
  window.matchMedia.mockReturnValue({ matches: true });
  render(<Lcp />);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});
