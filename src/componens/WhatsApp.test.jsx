import { render, screen, fireEvent } from '@testing-library/react';
import WhatsApp from './WhatsApp';

jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key }) }));

test('chat focuses its input and Escape returns focus to the opener', () => {
  render(<WhatsApp />);
  fireEvent.click(screen.getByRole('button', { name: 'open whatsapp' }));
  const input = screen.getByRole('textbox', { name: 'whatsapp message' });
  expect(input).toHaveFocus();
  fireEvent.keyDown(input, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'open whatsapp' })).toHaveFocus();
});

test('WhatsApp preserves special characters in messages and isolates the new tab', () => {
  const open = jest.spyOn(window, 'open').mockImplementation(() => null);
  render(<WhatsApp />);
  fireEvent.click(screen.getByRole('button', { name: 'open whatsapp' }));
  const text = 'שלום & calibration? #details';
  fireEvent.change(screen.getByRole('textbox', { name: 'whatsapp message' }), { target: { value: text } });
  fireEvent.submit(screen.getByRole('form', { name: 'whatsapp message' }));
  expect(open).toHaveBeenCalledTimes(1);
  const [destination, target, features] = open.mock.calls[0];
  const url = new URL(destination);
  expect(url.origin).toBe('https://api.whatsapp.com');
  expect(url.searchParams.get('phone')).toBe('972505100018');
  expect(url.searchParams.get('text')).toBe(text);
  expect(target).toBe('_blank');
  expect(features).toBe('noopener,noreferrer');
  open.mockRestore();
});
