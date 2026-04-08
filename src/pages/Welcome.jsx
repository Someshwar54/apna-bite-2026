import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Bike } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center flex-col animate-in" style={{ minHeight: '100vh', padding: '2rem' }}>
      
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
           {t('welcome_title')}
        </h1>
      </div>

      <div className="flex gap-4" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Vendor Role */}
        <div 
          className="glass-panel" 
          style={{ padding: '2rem', width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          onClick={() => navigate('/register/vendor')}
        >
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(242, 100, 25, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--primary)' }}>
            <Store size={48} />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>{t('vendor_btn')}</h2>
        </div>

        {/* Partner Role */}
        <div 
          className="glass-panel" 
          style={{ padding: '2rem', width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          onClick={() => navigate('/register/partner')}
        >
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(38, 196, 133, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--success)' }}>
            <Bike size={48} />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>{t('partner_btn')}</h2>
        </div>

        {/* Customer Role */}
        <div 
          className="glass-panel" 
          style={{ padding: '2rem', width: '300px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
          onClick={() => navigate('/register/customer')}
        >
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(51, 101, 138, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
            <MapPin size={48} />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>{t('customer_btn')}</h2>
        </div>

      </div>
    </div>
  );
};

export default Welcome;
