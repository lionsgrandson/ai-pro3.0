import 'react-bootstrap/dist/react-bootstrap.min.js'
import { Route, Routes, Link, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Home from './componens/pages/Home'
import Header from './componens/Header'
import Calibration from './componens/pages/Calibration'
import Validation from './componens/pages/Validation'
import Repair from './componens/pages/Repair'
import Engineering from './componens/pages/Engineering'
import Contact from './componens/pages/Contact'
import Footer from './componens/Footer'
import WhatsApp from './componens/WhatsApp'
import './componens/style.css'

function App() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const previousPath = useRef(pathname)
  const pageKey = {
    '/': 'home', '/calibration': 'calibration', '/engineering': 'engineering',
    '/repair': 'repair services', '/validation': 'validation', '/contact': 'contact',
  }[pathname.replace(/\/$/, '') || '/']

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en'
    document.documentElement.dir = i18n.dir()
    document.body.dir = i18n.dir()
    document.title = `${t(pageKey || 'page not found')} | AI Pro`
    document.querySelector('meta[name="description"]')?.setAttribute('content', t(`seo ${pageKey || 'home'}`))
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://ai-pro.co.il${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', pageKey ? 'index, follow' : 'noindex, follow')
  }, [i18n, i18n.resolvedLanguage, t, pathname, pageKey])

  useEffect(() => {
    if (previousPath.current !== pathname) {
      mainRef.current?.focus()
      window.scrollTo(0, 0)
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <div>
      <a className='skipLink' href='#main-content'>{t('skip to content')}</a>
      <WhatsApp />
      <Header />
      <main id='main-content' ref={mainRef} tabIndex={-1} className='appRoutes'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/calibration' element={<Calibration />} />
          <Route path='/engineering' element={<Engineering />} />
          <Route path='/repair' element={<Repair />} />
          <Route path='/validation' element={<Validation />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<div className='notFoundPage'>
            <h1>{t('page not found')}</h1>
            <Link to='/'>{t('back to home')}</Link>
          </div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
