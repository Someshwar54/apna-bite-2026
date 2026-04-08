import React, { useState, useEffect } from 'react';
import { Store, MapPin, Bike } from 'lucide-react';
import VendorDashboard from '../components/VendorDashboard';
import CustomerInterface from '../components/CustomerInterface';
import PartnerDashboard from '../components/PartnerDashboard';
import { getStalls, getMenu, getOrders, getRiders } from '../dataApi';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('vendor');
  const [data, setData] = useState({ stalls: [], menu: [], orders: [], riders: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stalls, menu, orders, riders] = await Promise.all([
          getStalls(), getMenu(), getOrders(), getRiders()
        ]);
        setData({ stalls, menu, orders, riders });
      } catch (err) {
        console.error("Data load failed", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-col gap-2" style={{ height: '100vh' }}>
        <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>Apna Bite</div>
        <div style={{ color: 'var(--text-muted)' }}>Loading Hackathon Modules...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          🛍️ Apna<span>Bite</span>
        </div>
        
        <div className="nav-tabs">
          <div className={`nav-tab flex items-center gap-1 ${activeTab === 'vendor' ? 'active' : ''}`} onClick={() => setActiveTab('vendor')}>
            <Store size={18} /> {t('nav_vendor')}
          </div>
          <div className={`nav-tab flex items-center gap-1 ${activeTab === 'customer' ? 'active' : ''}`} onClick={() => setActiveTab('customer')}>
            <MapPin size={18} /> {t('nav_customer')}
          </div>
          <div className={`nav-tab flex items-center gap-1 ${activeTab === 'partner' ? 'active' : ''}`} onClick={() => setActiveTab('partner')}>
            <Bike size={18} /> {t('nav_partner')}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full" style={{ background: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%' }}></div>
        </div>
      </header>

      <main className="container animate-in">
        {activeTab === 'vendor' && <VendorDashboard data={data} />}
        {activeTab === 'customer' && <CustomerInterface data={data} />}
        {activeTab === 'partner' && <PartnerDashboard data={data} />}
      </main>
    </div>
  );
}

export default Dashboard;
