import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header.jsx'
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';
import { Home } from "./pages/Home.jsx"
import NotFound from './pages/NotFound.jsx';
import Producto from './pages/Producto.jsx';
import Productos from './pages/Productos.jsx';
import Carrito from './pages/Carrito.jsx';
import EnConstruccion from './pages/EnConstruccion.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { useCart } from './hooks/useCart.js';

// Aparte de App porque useLocation necesita estar DENTRO del Router. El
// `key` reinicia el ErrorBoundary al cambiar de página: si una pantalla
// falla, navegar a otra la recupera sin recargar.
function AppRoutes() {
    const { pathname } = useLocation();
    const { agregar } = useCart();

    return (
        <ErrorBoundary key={pathname}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/productos" element={<Productos onAgregar={agregar}/>}/>
                <Route path="/productos/:id" element={<Producto onAgregar={agregar}/>}/>
                <Route path="/contacto" element={<EnConstruccion titulo="Contacto"/>}/>
                <Route path="/carrito" element={<Carrito/>}/>
                <Route path="/cuenta" element={<EnConstruccion titulo="Cuenta"/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </ErrorBoundary>
    );
}

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <Header />
                {/* Región para anuncios accesibles (ej. "Producto agregado al
                    carrito"). Los anuncios se escriben con utils/announce.js. */}
                <div id="live-region" className="visually-hidden" role="status" aria-live="polite" />
                <AppRoutes />
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
