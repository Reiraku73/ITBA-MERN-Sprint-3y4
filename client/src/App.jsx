import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';

import { useAuth } from './hooks/useAuth.js';

import { Home } from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Productos from './pages/Productos.jsx';
import Producto from './pages/Producto.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Registro.jsx';
import Cuenta from './pages/Cuenta.jsx';
import Contacto from './pages/Contacto.jsx';

// Importo las legales asumiendo que ya las pasaste a tu carpeta. 
// Si te tiran error de que no existen, borrá estas 3 líneas.
import Terminos from './pages/Terminos.jsx';
import Privacidad from './pages/Privacidad.jsx';
import CambiosDevoluciones from './pages/CambiosDevoluciones.jsx';

function AppRoutes() {
    const { pathname } = useLocation();
    const { usuario, registrarUsuario, iniciarSesion, cerrarSesion, actualizarUsuario } = useAuth();

    return (
        <ErrorBoundary key={pathname}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto/:id" element={<Producto />} />
                
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/terminos" element={<Terminos />} />
                <Route path="/privacidad" element={<Privacidad />} />
                <Route path="/cambios-devoluciones" element={<CambiosDevoluciones />} />

                <Route path="/login" element={usuario ? <Navigate to="/cuenta" replace /> : <Login onLogin={iniciarSesion} />} />
                <Route path="/register" element={usuario ? <Navigate to="/cuenta" replace /> : <Register onRegistrar={registrarUsuario} />} />
                <Route path="/cuenta" element={usuario ? <Cuenta usuario={usuario} onActualizar={actualizarUsuario} onLogout={cerrarSesion} /> : <Navigate to="/login" replace />} />

                <Route path="*" element={<NotFound />} />
            </Routes>
        </ErrorBoundary>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            <div id="live-region" className="visually-hidden" role="status" aria-live="polite" />
            <AppRoutes />
            <Footer />
        </BrowserRouter>
    );
}

export default App;