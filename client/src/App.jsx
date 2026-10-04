import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx'
import { Home } from "./pages/Home.jsx"
import NotFound from './pages/NotFound.jsx';
import Footer from './components/layout/Footer.jsx'
import {Productos} from "./pages/Productos.jsx"
import Contacto from "./pages/Contacto.jsx"
import Terminos from "./pages/Terminos.jsx"
import Privacidad from "./pages/Privacidad.jsx"

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contacto" element={<Contacto/>}/>
                <Route path="/terminos" element={<Terminos/>}/>
                <Route path="/privacidad" element={<Privacidad/>}/> 
                <Route path="/productos" element={<Productos/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;