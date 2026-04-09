import React, { useState, useEffect } from 'react';
import { Mic, Megaphone, CheckCircle, XCircle, IndianRupee, Package, Clock, BellRing, Plus, MenuSquare, Trash2, Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const VendorDashboard = ({ data }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [orderCount, setOrderCount] = useState(0);
  const [showFlashSale, setShowFlashSale] = useState(false);
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [showMenuInterface, setShowMenuInterface] = useState(false);

  // New: Menu State loaded from LocalStorage or default
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem('apnabite_vendor_menu');
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, item: "2x Samosa", price: 30, available: true },
      { id: 2, item: "1x Paneer Tikka", price: 80, available: true },
      { id: 3, item: "4x Vada Pav", price: 60, available: true },
      { id: 4, item: "2x Masala Chai", price: 20, available: true }
    ];
  });
  
  const [newItem, setNewItem] = useState({ item: '', price: '' });

  // Save menu changes to local storage
  useEffect(() => {
    localStorage.setItem('apnabite_vendor_menu', JSON.stringify(menu));
  }, [menu]);

  // Initialize browser notification privileges on mount
  useEffect(() => {
    if (window.Notification && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  // Listen for the global header button click to snap the menu open
  useEffect(() => {
    const handleOpenMenu = () => setShowMenuInterface(true);
    window.addEventListener('openVendorMenu', handleOpenMenu);
    return () => window.removeEventListener('openVendorMenu', handleOpenMenu);
  }, []);

  // Simulating incoming orders randomly from AVAILABLE menu items
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setIncomingOrders(prev => {
        // Only accept new incoming orders if queue is not overly filled
        if (prev.filter(o => o.status === 'pending').length < 3) {
          
          const availableItems = menu.filter(m => m.available);
          if (availableItems.length === 0) return prev; // Don't generate orders if everything is disabled

          const randomOrder = availableItems[Math.floor(Math.random() * availableItems.length)];
          const finalPrice = showFlashSale ? Math.ceil(randomOrder.price / 2) : randomOrder.price;
          const newOrder = { ...randomOrder, id: Date.now(), status: 'pending', price: finalPrice };
          
          if (window.Notification && Notification.permission === 'granted') {
             new Notification('Apna Bite - New Order!', { body: `Vendor Request: ${randomOrder.item}` });
          }
          setToastMessage(`New Order Arrived: ${randomOrder.item}`);
          setTimeout(() => setToastMessage(null), 4000);

          return [...prev, newOrder];
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isOpen, menu]);

  const progressPercent = (orderCount / 5) * 100;
  const isBatchReady = orderCount >= 5;
  const prepCount = incomingOrders.filter(order => order.status === 'preparing').length;

  const handleCashout = () => {
    setOrderCount(0);
    alert('UPI Transfer Successful');
  };

  const handleAcceptOrder = (id) => {
    setIncomingOrders(prev => prev.map(order => 
       order.id === id ? { ...order, status: 'preparing' } : order
    ));
  };

  const handleRejectOrder = (id) => {
    setIncomingOrders(prev => prev.filter(order => order.id !== id));
  };

  const handleMarkReady = (id) => {
    if (!isBatchReady) {
      setOrderCount(prev => prev + 1);
    }
    setIncomingOrders(prev => prev.filter(order => order.id !== id));
  };

  // Menu Handlers
  const toggleAvailable = (id) => {
    setMenu(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item));
  };

  const deleteMenuItem = (id) => {
    setMenu(prev => prev.filter(item => item.id !== id));
  };

  const addMenuItem = (e) => {
    e.preventDefault();
    if (!newItem.item || !newItem.price) return;
    setMenu(prev => [...prev, { id: Date.now(), item: newItem.item, price: Number(newItem.price), available: true }]);
    setNewItem({ item: '', price: '' });
  };

  return (
    <div className="flex-col gap-4 relative">
      
      {/* Toast Overlay */}
      {toastMessage && (
        <div style={{ position: 'fixed', top: '100px', right: '30px', zIndex: 9999, background: 'var(--success)', color: '#000', padding: '1rem 2rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(38,196,133,0.4)', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }} className="animate-in">
           <BellRing size={24} /> {toastMessage}
        </div>
      )}

      {/* Menu Management Modal Overlay */}
      {showMenuInterface && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9990, display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '1rem' }}>
           <div className="glass-panel animate-in" style={{ width: '100%', maxWidth: '900px', padding: '2.5rem', margin: '0 auto', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
              <div className="flex justify-between items-center mb-6" style={{ flexShrink: 0 }}>
                 <h3 className="flex items-center gap-2" style={{ fontSize: '2rem', color: 'var(--primary)' }}>
                    <MenuSquare size={32} /> Live Menu Catalog
                 </h3>
                 <button onClick={() => setShowMenuInterface(false)} className="btn btn-glass hover-scale" style={{ padding: '0.8rem', borderRadius: '50%' }}>
                    <XCircle size={32} color="var(--danger)" />
                 </button>
              </div>

              <form onSubmit={addMenuItem} className="flex gap-3 mb-6" style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', alignItems: 'center', flexShrink: 0, flexWrap: 'wrap' }}>
                 <input required type="text" placeholder="e.g. 2x Dosa" className="input-field" style={{ flex: '1 1 250px', padding: '1.2rem', fontSize: '1.2rem' }} value={newItem.item} onChange={e => setNewItem({...newItem, item: e.target.value})} />
                 <input required type="number" placeholder="₹ Price" className="input-field" style={{ flex: '1 1 100px', padding: '1.2rem', fontSize: '1.2rem' }} value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                 <button type="submit" className="btn btn-primary hover-scale" style={{ flex: '1 1 150px', padding: '1.2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <Plus size={24} /> Add Item
                 </button>
              </form>

              <div className="flex flex-col gap-3" style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
                 {menu.length === 0 && <p className="text-center text-muted" style={{ padding: '2rem 0' }}>Your menu is empty.</p>}
                 {menu.map(m => (
                   <div key={m.id} className="flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem 1.5rem', borderRadius: '8px', borderLeft: m.available ? '4px solid var(--success)' : '4px solid var(--text-muted)', opacity: m.available ? 1 : 0.6 }}>
                      <div>
                        <strong style={{ display: 'block', fontSize: '1.2rem', marginBottom: '0.2rem' }}>{m.item}</strong>
                        {showFlashSale ? (
                          <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>
                             <span style={{ textDecoration: 'line-through', color: 'var(--danger)', fontSize: '0.9rem', marginRight: '0.5rem', opacity: 0.8 }}>₹{m.price}</span>
                             ₹{Math.ceil(m.price / 2)}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>₹{m.price}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                           onClick={() => toggleAvailable(m.id)}
                           className="btn btn-glass"
                           style={{ padding: '0.6rem 1.2rem', borderColor: m.available ? 'var(--success)' : '', color: m.available ? 'var(--success)' : '' }}
                        >
                           {m.available ? 'Active' : 'Sold Out'}
                        </button>
                        <button onClick={() => deleteMenuItem(m.id)} className="btn btn-glass hover-scale" style={{ padding: '0.6rem', border: 'none', color: 'var(--danger)' }}>
                           <Trash2 size={24} />
                        </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 style={{ fontSize: '1.8rem' }}>{t('stall_status')}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '0.5rem 1rem' }}>
          <button 
            onClick={() => setShowFlashSale(!showFlashSale)}
            className="btn btn-warning flex items-center gap-2" 
            style={{ 
               background: showFlashSale ? 'rgba(246, 174, 45, 0.2)' : 'var(--warning)', 
               color: showFlashSale ? 'var(--warning)' : '#000', 
               outline: 'none', 
               border: showFlashSale ? '1px solid var(--warning)' : 'none', 
               fontSize: '1.2rem', 
               padding: '1rem' 
            }}
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
             <h2 style={{ fontSize: '2.5rem', color: isBatchReady ? 'var(--success)' : '#fff', marginBottom: '-5px' }}>{orderCount} / 5</h2>
             <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{isBatchReady ? t('rider_called') : t('orders_ready')}</p>
             
             <div className="progress-container" style={{ height: '20px', margin: '1rem 0' }}>
               <div className={`progress-bar ${isBatchReady ? 'ready' : ''}`} style={{ width: `${progressPercent}%` }}></div>
             </div>

             {prepCount > 0 && (
                <div className="badge badge-warning animate-in inline-flex items-center" style={{ fontSize: '1rem', padding: '0.4rem 1rem', background: 'rgba(246, 174, 45, 0.2)', border: '1px solid var(--accent)' }}>
                   <span style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', marginRight: '8px', animation: 'pulsate 2s infinite' }}></span>
                   Currently Cooking: {prepCount}
                </div>
             )}
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

      <div className="flex gap-4 mt-2 mb-8">

        {/* Incoming Live Order Manager (Full width restored) */}
        <div className="glass-panel" style={{ flex: '1', padding: '1.5rem' }}>
          <h3 className="flex items-center gap-2 mb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', fontSize: '1.5rem' }}>
            <BellRing size={24} color="var(--primary)" /> 
            Live Order Requests
            {incomingOrders.length > 0 && <span className="badge badge-warning" style={{ marginLeft: '1rem', padding: '0.4rem 1rem' }}>{incomingOrders.length} Waiting</span>}
          </h3>
          
          {incomingOrders.length === 0 ? (
             <div className="flex items-center justify-center" style={{ padding: '3rem 0', color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                <Clock size={28} style={{ marginRight: '0.8rem' }} /> No new orders pending. Waiting for customers...
             </div>
          ) : (
             <div className="flex flex-col gap-3">
                {incomingOrders.map(order => (
                   <div key={order.id} className="flex justify-between items-center animate-in" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '12px', borderLeft: order.status === 'preparing' ? '4px solid var(--accent)' : '4px solid var(--primary)' }}>
                      <div>
                         <strong style={{ fontSize: '1.2rem', display: 'block', marginBottom: '0.2rem' }}>{order.item}</strong>
                         {order.status === 'pending' ? (
                            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>₹{order.price}</span>
                         ) : (
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>• Preparing in Kitchen</span>
                         )}
                      </div>
                      <div className="flex gap-3">
                         {order.status === 'pending' ? (
                            <>
                               <button 
                                  onClick={() => handleRejectOrder(order.id)}
                                  className="btn flex items-center justify-center hover-scale" 
                                  style={{ background: 'rgba(230,57,70,0.2)', border: '1px solid var(--danger)', color: 'var(--danger)', width: '60px', height: '60px', borderRadius: '12px', padding: 0 }}
                               >
                                  <XCircle size={28} />
                               </button>
                               <button 
                                  onClick={() => handleAcceptOrder(order.id)}
                                  className="btn flex items-center justify-center hover-scale" 
                                  style={{ background: 'var(--success)', color: '#000', width: '60px', height: '60px', borderRadius: '12px', border: 'none', padding: 0 }}
                               >
                                  <CheckCircle size={28} />
                               </button>
                            </>
                         ) : (
                            <button 
                               onClick={() => handleMarkReady(order.id)}
                               disabled={isBatchReady}
                               className="btn flex items-center justify-center hover-scale" 
                               style={{ background: isBatchReady ? 'rgba(38,196,133,0.1)' : 'var(--primary)', color: isBatchReady ? 'rgba(38,196,133,0.3)' : '#fff', padding: '0.5rem 1.5rem', height: '60px', borderRadius: '12px', border: 'none' }}
                            >
                               <Package size={20} style={{ marginRight: '0.5rem' }}/> Mark Ready
                            </button>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default VendorDashboard;
