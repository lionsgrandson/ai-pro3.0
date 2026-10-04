import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';

const routes = [
  ['/', 'slogen'], ['/calibration', 'calibration'],
  ['/engineering', 'engineering'], ['/repair', 'repair services'],
  ['/validation', 'validation'], ['/contact', 'contact'],
];

describe.each(['en', 'he'])('existing routes in %s', (language) => {
  test.each(routes)('%s renders its translated heading', async (route, key) => {
    await act(async () => { await i18n.changeLanguage(language); });
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[route]}><App /></MemoryRouter>
      </I18nextProvider>
    );
    expect(await screen.findByRole('heading', { level: 1, name: i18n.t(key) }))
      .toBeInTheDocument();
    expect(document.title).toContain('AI Pro');
    expect(document.documentElement).toHaveAttribute('lang', language);
    expect(document.documentElement).toHaveAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
  });
});

test('language buttons and the logo are accessible navigation controls', async () => {
  await act(async () => { await i18n.changeLanguage('en'); });
  render(<MemoryRouter initialEntries={['/contact']}><App /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: 'עברית' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'צור קשר' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'English' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Contact' })).toBeInTheDocument();
  fireEvent.click(screen.getAllByRole('link', { name: /^home$/i })[0]);
  expect(await screen.findByRole('heading', { level: 1, name: i18n.t('slogen') })).toBeInTheDocument();
  expect(screen.getByRole('main')).toHaveFocus();
});

test('unknown paths provide a translated recovery link', async () => {
  await act(async () => { await i18n.changeLanguage('en'); });
  render(<MemoryRouter initialEntries={['/missing-page']}><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
});
