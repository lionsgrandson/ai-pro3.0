import { render, screen, act } from '@testing-library/react';
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
  });
});
