import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../dataApi';

const RegisterVendor = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '', phone: '', password: '', shopName: '', shopAddress: '', panNumber: '', bankingDetails: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/vendors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) navigate('/dashboard');
    } catch (err) {
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="flex items-center justify-center animate-in" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '3rem' }}>
        <div className="flex items-center gap-3 mb-4" style={{ marginBottom: '2rem' }}>
          <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
             <Store size={24} />
          </div>
          <div>
            <h2>{t('vn_title')}</h2>
            <p>{t('vn_desc')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-col gap-3">
          <div className="form-group"><label>{t('rg_name')}</label><input required type="text" name="name" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_phone')}</label><input required type="tel" name="phone" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_password')}</label><input required type="password" name="password" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_shop_name')}</label><input required type="text" name="shopName" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_shop_address')}</label><input required type="text" name="shopAddress" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_pan')}</label><input required type="text" name="panNumber" className="input-field" onChange={handleChange} /></div>
          <div className="form-group"><label>{t('rg_bank')}</label><input required type="text" name="bankingDetails" className="input-field" onChange={handleChange} /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
             {t('rg_submit')} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterVendor;
