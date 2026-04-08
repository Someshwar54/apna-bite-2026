import React, { useState, useEffect } from 'react';
import { Mic, Megaphone, CheckCircle, IndianRupee, Package, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VendorDashboard = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [orderCount, setOrderCount] = useState(0);
  const [showFlashSale, setShowFlashSale] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setOrderCount(prev => (prev < 5 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const progressPercent = (orderCount / 5) * 100;
  const isBatchReady = orderCount >= 5;

  const handleCashout = () => {
    setOrderCount(0);
    alert('UPI Transfer: ₹450');
  };

  return (
    <div className="flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2>{t('stall_status')}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '0.5rem 1rem' }}>
          <button 
            onClick={() => setShowFlashSale(true)}
            className="btn btn-warning flex items-center gap-2" 
            style={{ background: 'var(--warning)', color: '#000', outline: 'none', border: 'none', fontSize: '1.2rem', padding: '1rem' }}
          >
            <Megaphone size={28} /> {t('discount_sale')}
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Massive Toggles for Accessibility */}
        <div className="glass-panel items-center flex-col justify-center gap-4" style={{ flex: '1', padding: '2rem' }}>
          
          <div 
            className={`toggle-btn ${isOpen ? 'status-green' : 'status-red'}`}
            style={{ width: '180px', height: '180px', fontSize: '2rem' }}
            onClick={() => setIsOpen(!isOpen)}
          >
             <span>{isOpen ? t('open') : t('closed')}</span>
          </div>
          
          <button className="btn btn-glass flex items-center justify-center gap-2 mt-4" style={{ width: '100%', padding: '1.5rem', fontSize: '1.2rem' }}>
             <Mic size={32} color="var(--primary)" /> 
             {t('voice_btn')}
          </button>
        </div>

        {/* Highly Visual Progress and Cash */}
        <div className="glass-panel flex-col justify-between" style={{ flex: '1', padding: '2rem' }}>
           
           <div className="flex-col items-center justify-center text-center gap-2" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '16px', padding: '2rem' }}>
             <Package size={48} color={isBatchReady ? 'var(--success)' : 'var(--text-muted)'} />
             <h2 style={{ fontSize: '2.5rem', color: isBatchReady ? 'var(--success)' : '#fff' }}>{orderCount} / 5</h2>
             <p style={{ fontSize: '1.2rem' }}>{isBatchReady ? t('rider_called') : t('orders_ready')}</p>
             <div className="progress-container" style={{ height: '20px', marginTop: '1rem' }}>
               <div className={`progress-bar ${isBatchReady ? 'ready' : ''}`} style={{ width: `${progressPercent}%` }}></div>
             </div>
           </div>

           <div className="flex justify-between items-center mt-4" style={{ background: 'rgba(38, 196, 133, 0.15)', padding: '1.5rem', borderRadius: '16px' }}>
              <div className="flex items-center gap-3">
                 <div style={{ background: 'var(--success)', padding: '1rem', borderRadius: '50%' }}>
                    <IndianRupee size={32} color="#000"/>
                 </div>
                 <div>
                    <p style={{ fontSize: '1.1rem', color: 'var(--success)' }}>{t('earnings')}</p>
                    <h2 style={{ fontSize: '2rem' }}>₹{orderCount * 90}</h2>
                 </div>
              </div>
              <button 
                className="btn" 
                onClick={handleCashout}
                disabled={!isBatchReady}
                style={{ 
                  background: isBatchReady ? 'var(--success)' : 'rgba(255,255,255,0.1)', 
                  color: isBatchReady ? '#000' : 'var(--text-muted)',
                  fontSize: '1.2rem', padding: '1rem 2rem' 
                }}
              >
                 {t('cash_out')}
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;
