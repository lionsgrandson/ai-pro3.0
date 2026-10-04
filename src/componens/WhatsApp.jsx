import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './whatsapp.css';

const phone = '972505100018';
const avatar = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/San_Diego_Comic-Con_2024_Masquerade_-_Cosplay_of_Batman_3.jpg/960px-San_Diego_Comic-Con_2024_Masquerade_-_Cosplay_of_Batman_3.jpg';

export default function WhatsApp() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const opener = useRef(null);
  const input = useRef(null);

  const close = () => {
    setOpen(false);
    opener.current?.focus();
  };

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  const send = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    const url = new URL('https://api.whatsapp.com/send/');
    url.searchParams.set('phone', phone);
    url.searchParams.set('text', message);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <aside className='whatsappWidget' aria-label='WhatsApp'>
      {open && <section className='whatsappChat' role='dialog' aria-modal='false'
        id='whatsapp-chat' aria-labelledby='whatsapp-title'
        onKeyDown={(event) => { if (event.key === 'Escape') close(); }}>
        <header className='whatsappHeader'>
          <img src={avatar} alt='' width='44' height='44' />
          <h2 id='whatsapp-title'>AI Pro</h2>
          <button type='button' onClick={close} aria-label={t('close chat')}>×</button>
        </header>
        <div className='whatsappBody'><p>{t('whatsapp greeting')}</p></div>
        <form onSubmit={send} aria-label={t('whatsapp message')}>
          <label className='visually-hidden' htmlFor='whatsapp-message'>{t('whatsapp message')}</label>
          <input id='whatsapp-message' ref={input} value={message} dir='auto'
            placeholder={t('whatsapp placeholder')} onChange={(event) => setMessage(event.target.value)} required />
          <button type='submit'>{t('send')}</button>
        </form>
      </section>}
      <button type='button' className='whatsappOpener' ref={opener}
        aria-label={t(open ? 'close chat' : 'open whatsapp')}
        aria-expanded={open} aria-controls={open ? 'whatsapp-chat' : undefined}
        onClick={() => { if (open) close(); else setOpen(true); }}>
        <svg aria-hidden='true' viewBox='0 0 24 24' width='44' height='44'>
          <path fill='currentColor' d='M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z' />
        </svg>
      </button>
    </aside>
  );
}
