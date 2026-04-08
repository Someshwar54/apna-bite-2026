import React from 'react';
import { TrendingUp, Layers, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PartnerDashboard = ({ data }) => {
  const { t } = useTranslation();
  const activeRiders = data.riders.filter(r => r.status === 'available').length || 0;

  return (
    <div className="flex gap-4">
      {/* Micro-Batching Overview */}
      <div className="flex-col gap-4" style={{ flex: '1' }}>
        
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--surface)' }}>
           <h2 style={{ marginBottom: '0.5rem' }}>{t('pd_portal')}</h2>
           <p>{t('pd_active')} <strong>{activeRiders}</strong></p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem' }}>
             <Layers size={18} color="var(--primary)" /> {t('pd_queues')}
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            {t('pd_queue_desc')}
          </p>
          
          {/* Mock Queue Items */}
          <div className="flex-col gap-2">
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--success)' }}>
               <div className="flex justify-between items-center mb-2">
                 <strong>{t('pd_batch')} #8492</strong>
                 <span className="badge badge-success">{t('pd_ready')}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span style={{ color: 'var(--text-muted)' }}>3 {t('pd_orders')} • 1.2km</span>
                 <strong style={{ color: 'var(--success)' }}>{t('pd_earn')} 120</strong>
               </div>
               <button className="btn btn-glass" style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}>{t('pd_accept')}</button>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--warning)' }}>
               <div className="flex justify-between items-center mb-2">
                 <strong>{t('pd_batch')} #8493</strong>
                 <span className="badge badge-warning">{t('pd_forming')} (4/5)</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span style={{ color: 'var(--text-muted)' }}>Connaught Place Area</span>
                 <strong style={{ color: 'var(--accent)' }}>{t('pd_est')} 180</strong>
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Heatmap Section */}
      <div className="glass-panel flex-col" style={{ flex: '2', padding: '1.5rem' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
          <h3><TrendingUp size={18} style={{ display: 'inline', marginRight: '0.5rem' }}/> {t('pd_heatmap')}</h3>
          <button className="btn btn-glass"><Compass size={16}/> {t('pd_go')}</button>
        </div>
        <p style={{ marginBottom: '1rem' }}>{t('pd_map_desc')}</p>
        
        {/* Mock visual presentation */}
        <div 
          style={{ 
            flex: '1', 
            background: 'url(https://stadiamaps.com/wp-content/themes/stadiamaps/assets/img/hero-bg.jpg) center center', 
            backgroundSize: 'cover',
            borderRadius: 'var(--radius-md)',
            position: 'relative',
            minHeight: '400px'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(11, 15, 25, 0.6)' }}></div>
          
          <div style={{ position: 'absolute', top: '30%', left: '45%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(230,57,70,0.8) 0%, rgba(230,57,70,0) 70%)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '50%', left: '25%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(246,174,45,0.8) 0%, rgba(246,174,45,0) 70%)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', top: '20%', left: '75%', width: '120px', height: '120px', background: 'radial-gradient(circle, rgba(38,196,133,0.8) 0%, rgba(38,196,133,0) 70%)', borderRadius: '50%' }}></div>
          
          <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.7)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)' }}>
             <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', background: 'var(--danger)', borderRadius: '50%' }}></div> {t('pd_high')}</div>
             <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '50%' }}></div> {t('pd_form')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
