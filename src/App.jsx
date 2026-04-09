import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import RegisterVendor from './pages/RegisterVendor';
import RegisterPartner from './pages/RegisterPartner';
import RegisterCustomer from './pages/RegisterCustomer';
import Dashboard from './pages/Dashboard';
import LanguageToggle from './components/LanguageToggle';
import './index.css';
import './i18n'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/vendor" element={<RegisterVendor />} />
        <Route path="/register/partner" element={<RegisterPartner />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
