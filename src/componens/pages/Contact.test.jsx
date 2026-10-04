import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import emailjs from '@emailjs/browser';
import Contact from './Contact';

jest.mock('@emailjs/browser', () => ({ init: jest.fn(), send: jest.fn() }));
jest.mock('react-i18next', () => ({ useTranslation: () => ({ t: (key) => key }) }));

beforeEach(() => jest.clearAllMocks());

function getForm() {
  // The existing form has no accessible name; locate it through its submit button.
  // eslint-disable-next-line testing-library/no-node-access
  return screen.getByRole('button').closest('form');
}

function fillForm() {
  const fields = screen.getAllByRole('textbox');
  ['Alice', 'alice@example.com', 'Calibration', '<b>Please contact me</b>']
    .forEach((value, index) => fireEvent.change(fields[index], { target: { value } }));
  return getForm();
}

test('keeps EmailJS payload and blocks simultaneous submissions', async () => {
  let finish;
  emailjs.send.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
  render(<Contact />);
  const form = fillForm();
  fireEvent.submit(form);
  fireEvent.submit(form);
  expect(emailjs.send).toHaveBeenCalledTimes(1);
  expect(emailjs.send).toHaveBeenCalledWith(expect.any(String), expect.any(String), {
    name: 'Alice', email: 'alice@example.com', subject: 'Calibration',
    message: '<b>Please contact me</b>',
  });
  expect(emailjs.init).toHaveBeenCalledWith(expect.objectContaining({
    limitRate: { id: 'ai-pro-contact', throttle: 1000 },
  }));
  await act(async () => finish({ status: 200 }));
  expect(screen.getByText('Email sent successfully!')).toBeInTheDocument();
  expect(screen.getAllByRole('textbox')[0]).toHaveValue('');
});

test('failed sends preserve input and allow retry', async () => {
  emailjs.send.mockRejectedValueOnce(new Error('network failure')).mockResolvedValueOnce({ status: 200 });
  render(<Contact />);
  const form = fillForm();
  fireEvent.submit(form);
  await screen.findByText('Failed to send email. Please try again.');
  expect(screen.getAllByRole('textbox')[0]).toHaveValue('Alice');
  fireEvent.submit(form);
  await waitFor(() => expect(emailjs.send).toHaveBeenCalledTimes(2));
  await screen.findByText('Email sent successfully!');
});

test('incomplete forms do not send email', () => {
  render(<Contact />);
  fireEvent.submit(getForm());
  expect(emailjs.send).not.toHaveBeenCalled();
  expect(screen.getByText('All fields are required')).toBeInTheDocument();
});
