import 'react-bootstrap/dist/react-bootstrap.min.js'
import { Route, Routes } from 'react-router-dom'
import Home from './componens/pages/Home'
import Header from './componens/Header'
import Calibration from './componens/pages/Calibration'
import Validation from './componens/pages/Validation'
import Repair from './componens/pages/Repair'
import Engineering from './componens/pages/Engineering'
import Contact from './componens/pages/Contact'
import Footer from './componens/Footer'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

function App() {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber='972505100018'
        accountName='AI Pro'
        avatar='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/San_Diego_Comic-Con_2024_Masquerade_-_Cosplay_of_Batman_3.jpg/960px-San_Diego_Comic-Con_2024_Masquerade_-_Cosplay_of_Batman_3.jpg'
      />
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/calibration' element={<Calibration />} />
        <Route path='/engineering' element={<Engineering />} />
        <Route path='/repair' element={<Repair />} />
        <Route path='/validation' element={<Validation />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
