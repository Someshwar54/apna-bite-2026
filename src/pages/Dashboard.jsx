import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, X, Check, MenuSquare, Wallet } from 'lucide-react';
import VendorDashboard from '../components/VendorDashboard';
import CustomerInterface from '../components/CustomerInterface';
import PartnerDashboard from '../components/PartnerDashboard';
import LanguageToggle from '../components/LanguageToggle';
import { getStalls, getMenu, getOrders, getRiders, API_URL } from '../dataApi';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState({ stalls: [], menu: [], orders: [], riders: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const session = localStorage.getItem('apnabite_user');
    if (!session) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(session);
    setUser(parsedUser);
    setEditForm(parsedUser.details);

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('apnabite_user');
    navigate('/login');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving...');
    try {
      const endpoint = user.role + 's'; // vendors, partners, customers
      const res = await fetch(`${API_URL}/${endpoint}/${user.details.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        const updatedDetails = await res.json();
        const updatedUser = { ...user, details: updatedDetails };
        setUser(updatedUser);
        localStorage.setItem('apnabite_user', JSON.stringify(updatedUser));
        setSaveStatus('Saved successfully!');
        setTimeout(() => {
          setSaveStatus('');
          setShowProfile(false);
        }, 1500);
      } else {
        setSaveStatus('Error saving details.');
      }
    } catch (err) {
      setSaveStatus('Connection Error.');
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center flex-col gap-2" style={{ height: '100vh' }}>
        <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>Apna Bite</div>
        <div style={{ color: 'var(--text-muted)' }}>Loading Secure Interface...</div>
      </div>
    );
  }

  const getRoleText = () => {
    if (user.role === 'vendor') return t('nav_vendor');
    if (user.role === 'partner') return t('nav_partner');
    return t('nav_customer');
  };

  return (
    <div className="app-container">
      <header className="app-header" style={{ justifyContent: 'space-between' }}>
        
        <div className="flex items-center gap-4">
           <div className="logo flex items-center gap-2" style={{ marginRight: '1rem' }}>
             <img src="/logo.png" alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
             <div>Apna<span style={{ color: 'var(--primary)' }}>Bite</span></div>
           </div>
           
           <div className="badge badge-warning" style={{ fontSize: '0.9rem', padding: '0.4rem 1rem' }}>
              {getRoleText()} Interface
           </div>

           {user.role === 'vendor' && (
              <button 
                onClick={() => window.dispatchEvent(new Event('openVendorMenu'))}
                className="btn btn-glass flex items-center gap-2" 
                style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
              >
                 <MenuSquare size={18} /> Manage Menu
              </button>
           )}

           {user.role === 'partner' && (
              <button 
                onClick={() => window.dispatchEvent(new Event('openPartnerWallet'))}
                className="btn btn-glass flex items-center gap-2" 
                style={{ marginLeft: '1rem', padding: '0.5rem 1rem', borderColor: 'var(--accent)' }}
              >
                 <Wallet size={18} color="var(--accent)" /> Earnings Hub
              </button>
           )}
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          <button 
             onClick={() => setShowProfile(true)}
             className="btn btn-glass flex items-center gap-2" 
             style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)' }}
          >
             <User size={18} /> {user.details.name}
          </button>
          
          <button 
             onClick={handleLogout}
             className="btn flex items-center gap-2" 
             style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)' }}
          >
             <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Profile Edit Modal */}
      {showProfile && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div className="glass-panel animate-in" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
              <div className="flex justify-between items-center mb-4" style={{ marginBottom: '1.5rem' }}>
                 <h2>Edit Profile</h2>
                 <button onClick={() => setShowProfile(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              
              <form onSubmit={handleSaveProfile} className="flex-col gap-3">
                 <div className="form-group">
                   <label>Name</label>
                   <input className="input-field" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})} />
                 </div>
                 <div className="form-group">
                   <label>Phone Number</label>
                   <input className="input-field" value={editForm.phone || ''} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                 </div>
                 <div className="form-group">
                   <label>Password</label>
                   <input className="input-field" type="password" value={editForm.password || ''} onChange={e => setEditForm({...editForm, password: e.target.value})} />
                 </div>
                 
                 {user.role === 'vendor' && (
                   <>
                     <div className="form-group">
                       <label>Shop Name</label>
                       <input className="input-field" value={editForm.shopName || ''} onChange={e => setEditForm({...editForm, shopName: e.target.value})} />
                     </div>
                     <div className="form-group">
                       <label>Banking (UPI)</label>
                       <input className="input-field" value={editForm.bankingDetails || ''} onChange={e => setEditForm({...editForm, bankingDetails: e.target.value})} />
                     </div>
                   </>
                 )}

                 {user.role === 'partner' && (
                   <div className="form-group">
                       <label>Banking (UPI)</label>
                       <input className="input-field" value={editForm.bankingDetails || ''} onChange={e => setEditForm({...editForm, bankingDetails: e.target.value})} />
                   </div>
                 )}

                 {user.role === 'customer' && (
                   <div className="form-group">
                       <label>Delivery Address</label>
                       <input className="input-field" value={editForm.address || ''} onChange={e => setEditForm({...editForm, address: e.target.value})} />
                   </div>
                 )}

                 <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%' }}>Save Changes</button>
                 {saveStatus && <p style={{ color: 'var(--success)', textAlign: 'center', marginTop: '0.5rem' }}>{saveStatus}</p>}
              </form>
           </div>
        </div>
      )}

      <main className="container animate-in">
        {user.role === 'vendor' && <VendorDashboard data={data} />}
        {user.role === 'customer' && <CustomerInterface data={data} />}
        {user.role === 'partner' && <PartnerDashboard data={data} />}
      </main>
    </div>
  );
}

export default Dashboard;
