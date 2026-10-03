import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx'
import { Home } from "./pages/Home.jsx"
import NotFound from './pages/NotFound.jsx';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/contacto" element={<Contacto/>}/>
                <Route path="/terminos" element={<Terminos/>}/>
                <Route path="/privacidad" element={<Privacidad/>}/> 
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;