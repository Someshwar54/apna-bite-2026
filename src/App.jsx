import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import RegisterVendor from './pages/RegisterVendor';
import RegisterPartner from './pages/RegisterPartner';
import RegisterCustomer from './pages/RegisterCustomer';
import Dashboard from './pages/Dashboard';
import LanguageToggle from './components/LanguageToggle';
import './index.css';
import './i18n'; // Ensure backend translation is hooked

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: 'absolute', top: '1.5rem', right: '7rem', zIndex: 1000 }}>
        <LanguageToggle />
      </div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register/vendor" element={<RegisterVendor />} />
        <Route path="/register/partner" element={<RegisterPartner />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
