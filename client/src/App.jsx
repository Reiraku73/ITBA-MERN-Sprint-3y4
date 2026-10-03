import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.jsx'
import { Home } from "./pages/Home.jsx"
import {Productos} from "./pages/Productos.jsx"
import NotFound from './pages/NotFound.jsx';


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/productos" element={<Productos/>}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;