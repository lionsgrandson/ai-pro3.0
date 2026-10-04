import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logo_cut, israel_color, usa_color } from '../assets'
import { useTranslation } from 'react-i18next'
import { MDBIcon } from 'mdb-react-ui-kit'
export default function Header() {
  const [expanded, setExpanded] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const dir = i18n.dir()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    setExpanded(false)
  }, [location.pathname])

  return (
    <div className='siteHeader' style={{ direction: 'rtl' }}>
      <Navbar
        collapseOnSelect
        expand='xl'
        bg='light'
        variant='light'
        expanded={expanded}
        onToggle={setExpanded}
        id='togNav'
        className='mainNavbar'
        style={{ direction: dir, flexWrap: 'wrap' }}
      >
        <Navbar.Brand>
          <div style={{ marginLeft: '20px' }}>
            <Link to='/' aria-label={t('home')}>
              <img
                src={logo_cut}
                style={{ width: '40px', borderRadius: '50%' }}
                alt='brand logo'
              />
            </Link>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav'
          label={t('toggle navigation')}
          aria-expanded={expanded}
          style={{ marginRight: '20px' }}
        />
        <Navbar.Collapse id='responsive-navbar-nav' style={{ direction: dir }}>
          <Nav className='headerNavLinks me-auto my-2 my-lg-0 text-secondary d-flex align-items-center col-10'>
            <Nav.Link as={Link} to='/' className='test2'>
              <strong>{t('home').toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to='/calibration' className='test2'>
              <strong>{t('calibration').toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to='/validation' className='test2'>
              <strong>{t('validation').toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to='/engineering' className='test2'>
              <strong>{t('engineering').toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to='/repair' className='test2'>
              <strong>{t('repair services').toUpperCase()}</strong>
            </Nav.Link>
            <Nav.Link as={Link} to='/contact' className='test2'>
              <strong>{t('contact').toUpperCase()}</strong>
            </Nav.Link>
            <div style={{ display: 'flex' }} className='test2'>
              <Nav.Link
                href='https://www.linkedin.com/in/itai-amrofel-8b006a11/'
                aria-label='LinkedIn'
                className='test2'
                style={{ margin: ' 0 0.5rem' }}
              >
                <MDBIcon aria-hidden="true" fab icon='linkedin' />
              </Nav.Link>

              <Nav.Link
                href='mailto:office@ai-pro.co.il'
                aria-label={t('email')}
                className='test2'
              >
                <MDBIcon aria-hidden="true" icon='envelope' />
              </Nav.Link>
            </div>
          </Nav>

          <div
            className='headerLangSwitch col-3 col-md-1 d-flex align-items-center justify-content-center justify-content-md-evenly'
            style={{
              marginRight: '20px',
              marginLeft: '20px',
            }}
          >
            <button type='button' className='languageButton' lang='en'
              aria-label='English' aria-pressed={i18n.resolvedLanguage === 'en'}
              onClick={() => changeLanguage('en')}
            >
              <img src={usa_color} width='30' alt='' />
            </button>
            <button type='button' className='languageButton' lang='he'
              aria-label='עברית' aria-pressed={i18n.resolvedLanguage === 'he'}
              onClick={() => changeLanguage('he')}
            >
              <img src={israel_color} width='30' alt='' />
            </button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
