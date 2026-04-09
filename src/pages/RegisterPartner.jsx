import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const RegisterPartner = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', phone: '', password: '', licenseProof: '', bankingDetails: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/partners', {
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
          <div style={{ width: '50px', height: '50px', background: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
             <Bike size={24} />
          </div>
          <div><h2>{t('pt_title')}</h2><p>{t('pt_desc')}</p></div>
        </div>
        <form onSubmit={handleSubmit} className="flex-col gap-3">
          <div className="form-group"><label>{t('rg_name')}</label><input required type="text" name="name" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_phone')}</label><input required type="tel" name="phone" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_password')}</label><input required type="password" name="password" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_license')}</label><input required type="text" name="licenseProof" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_bank')}</label><input required type="text" name="bankingDetails" className="input-field" onChange={handleChange} /></div>
          <button type="submit" className="btn btn-primary" style={{ background: 'var(--success)', width: '100%', marginTop: '1rem', padding: '1rem' }}>
             {t('rg_start')} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterPartner;
