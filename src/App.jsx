import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Cookies from './pages/Cookies';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy />} />
        <Route path="/polityka-cookies" element={<Cookies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
