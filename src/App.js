import 'react-bootstrap/dist/react-bootstrap.min.js'
import { Route, Routes } from 'react-router-dom';
import Home from './componens/pages/Home';
import  Header  from './componens/Header';
import Calibration from './componens/pages/Calibration';
import Validation from './componens/pages/Validation';
import Repair from './componens/pages/Repair';
import Engineering from './componens/pages/Engineering';
import Contact from './componens/pages/Contact';
import Footer from './componens/Footer';


function App() {
  return (
    <div >
      <Header/>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/calibration' element={<Calibration/>}/>
      <Route path='/engineering' element={<Engineering/>}/>
      <Route path='/repair' element={<Repair/>}/>
      <Route path='/validation' element={<Validation/>}/>
      <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
