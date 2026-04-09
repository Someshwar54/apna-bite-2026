import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RegisterCustomer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', address: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) navigate('/dashboard');
    } catch (err) { navigate('/dashboard'); }
  };

  return (
    <div className="flex items-center justify-center animate-in" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '3rem' }}>
        <div className="flex items-center gap-3 mb-4" style={{ marginBottom: '2rem' }}>
          <div style={{ width: '50px', height: '50px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
             <MapPin size={24} />
          </div>
          <div><h2>{t('cs_title')}</h2><p>{t('cs_desc')}</p></div>
        </div>
        <form onSubmit={handleSubmit} className="flex-col gap-3">
          <div className="form-group"><label>{t('rg_name')}</label><input required type="text" name="name" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_phone')}</label><input required type="tel" name="phone" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_password')}</label><input required type="password" name="password" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_address')}</label><textarea required name="address" className="input-field" onChange={handleChange} style={{ resize: 'vertical' }}></textarea></div>
          <button type="submit" className="btn btn-primary" style={{ background: 'var(--secondary)', width: '100%', marginTop: '1rem', padding: '1rem' }}>
             {t('rg_enter')} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterCustomer;
