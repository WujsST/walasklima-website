import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/sklep" element={<Shop />} />
        <Route path="/sklep/:handle" element={<Product />} />
        <Route path="/koszyk" element={<Cart />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
        <Route path="/polityka-cookies" element={<Cookies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
