import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header.jsx'
import { Home } from "./pages/Home.jsx"
import NotFound from './pages/NotFound.jsx';
import Footer from './components/layout/Footer.jsx'
import {Productos} from "./pages/Productos.jsx"
import Contacto from "./pages/Contacto.jsx"
import Terminos from "./pages/Terminos.jsx"
import Privacidad from "./pages/Privacidad.jsx"
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import Login from './pages/Login.jsx'
import Register from './pages/Registro.jsx'
import Cuenta from './pages/Cuenta.jsx'
import { useAuth } from './hooks/useAuth.js'
import CambiosDevoluciones from './pages/CambiosDevoluciones.jsx';

function App() {
    const { usuario, registrarUsuario, iniciarSesion, cerrarSesion, actualizarUsuario } = useAuth()
    
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contacto" element={<Contacto/>}/>
                <Route path="/terminos" element={<Terminos/>}/>
                <Route path="/privacidad" element={<Privacidad/>}/> 
                <Route path="/productos" element={<Productos/>}/>
                <Route path="/cambios-devoluciones" element={<CambiosDevoluciones/>}/>
                <Route
                    path="/login"
                    element={usuario ? <Navigate to="/cuenta" replace /> : <Login onLogin={iniciarSesion} />}
                />
                <Route
                    path="/register"
                    element={usuario ? <Navigate to="/cuenta" replace /> : <Register onRegistrar={registrarUsuario} />}
                />
                <Route
                    path="/cuenta"
                    element={usuario ? <Cuenta usuario={usuario} onActualizar={actualizarUsuario} onLogout={cerrarSesion} /> : <Navigate to="/login" replace />}
                />
                <Route path="*" element={<NotFound/>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;