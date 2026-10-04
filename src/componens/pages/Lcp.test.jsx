import { render, screen, fireEvent } from '@testing-library/react';
import Lcp from './Lcp';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key, i18n: { dir: () => 'ltr' } }) }));

test('background video can be paused and resumed', () => {
  render(<Lcp />);
  fireEvent.click(screen.getByRole('button', { name: 'pause video' }));
  expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: 'play video' }));
  expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
});

test('reduced motion starts with a paused video', () => {
  window.matchMedia.mockReturnValue({ matches: true });
  render(<Lcp />);
  expect(screen.getByRole('button', { name: 'play video' })).toBeInTheDocument();
  expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
});
