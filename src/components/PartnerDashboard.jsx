import React, { useState, useEffect } from 'react';
import { TrendingUp, Layers, Compass, MapPin, Navigation, Package, CheckCircle, Clock, Wallet, XCircle, AlertTriangle, Power } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PartnerDashboard = ({ data }) => {
  const { t } = useTranslation();
  const activeRiders = data.riders.filter(r => r.status === 'available').length || 0;

  // Mock incoming single deliveries targeted at the partner
  const initialDeliveries = [
    { id: 101, vendor: "Raju Chaat Corner", item: "3x Samosa, 2x Vada Pav", vendorLoc: "Koramangala 5th Block", destLoc: "HSR Layout Sector 2", dist: "2.4 km", pay: "₹55" },
    { id: 102, vendor: "South Tiffins", item: "1x Masala Dosa, 2x Chai", vendorLoc: "Indiranagar 100ft Rd", destLoc: "Domlur", dist: "4.1 km", pay: "₹85" }
  ];

  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [activeDelivery, setActiveDelivery] = useState(null);
  const [batchAccepted, setBatchAccepted] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  
  // Wallet states
  const [showWallet, setShowWallet] = useState(false);
  const [pendingPayout, setPendingPayout] = useState(1250);
  const [payoutMsg, setPayoutMsg] = useState("");

  // Notification Permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
       Notification.requestPermission();
    }
  }, []);

  // Window Event Listener
  useEffect(() => {
    const handleOpenWallet = () => setShowWallet(true);
    window.addEventListener('openPartnerWallet', handleOpenWallet);
    return () => window.removeEventListener('openPartnerWallet', handleOpenWallet);
  }, []);

  // Live Order Simulator Engine
  useEffect(() => {
    let timer;
    if (isAvailable && !activeDelivery) {
       timer = setInterval(() => {
          if (Math.random() > 0.5) { // 50% chance every 8 seconds to spawn a hit
             const mockVendors = ["Koramangala 1st Block", "HSR Layout Sector 4", "BTM Layout Phase 1", "Indiranagar 100ft", "Adugodi Market"];
             const mockDests = ["Bellandur Tech Park", "Silk Board Junction", "Domlur Embassy", "Ejipura Residentials"];
             const newPing = {
                id: Date.now(),
                vendor: "Live Order Match",
                item: "Hot Food Package",
                vendorLoc: mockVendors[Math.floor(Math.random() * mockVendors.length)],
                destLoc: mockDests[Math.floor(Math.random() * mockDests.length)],
                dist: (Math.random() * 4 + 1).toFixed(1) + " km",
                pay: "₹" + Math.floor(Math.random() * 80 + 40)
             };
             setDeliveries(prev => [newPing, ...prev]);
             
             // Trigger OS Action
             if (window.Notification && Notification.permission === 'granted') {
                new Notification('Apna Bite - Delivery Ping!', { body: `New ₹${newPing.pay} delivery order available near Koramangala!` });
             }
          }
       }, 8000);
    } else if (!isAvailable) {
       // Clear queues if they aggressively went offline
       setDeliveries(initialDeliveries);
    }
    return () => clearInterval(timer);
  }, [isAvailable, activeDelivery]);

  const handleWithdraw = () => {
    const today = new Date().getDay(); // 0 Sun, 1 Mon, 2 Tue, 3 Wed, 4 Thu, 5 Fri, 6 Sat
    if (today === 1 || today === 3 || today === 5) {
      if (pendingPayout > 0) {
        setPayoutMsg("Success! ₹" + pendingPayout + " transferred to your UPI.");
        setPendingPayout(0);
      }
    } else {
      setPayoutMsg("Restricted: Withdrawals are only authorized on Mondays, Wednesdays, and Fridays.");
    }
  };

  // Dynamic Google Maps Routing query based on selection
  let mapSource = `https://maps.google.com/maps?q=Koramangala,+Bangalore&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const partnerCurrentLoc = "Koramangala, Bangalore"; // Mocked Rider GPS
  
  if (activeDelivery) {
    const saddr = encodeURIComponent(partnerCurrentLoc);
    
    if (activeDelivery.isBatch && activeDelivery.waypoints) {
       // Chain waypoints: saddr=Driver & daddr=Vendor1+to:Vendor2+to:Dropoff1...
       const daddrArray = activeDelivery.waypoints.map(w => encodeURIComponent(w + ", Bangalore"));
       const daddr = daddrArray.join("+to:");
       mapSource = `https://maps.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
    } else {
       // Standard Single Route: Driver -> Vendor -> Dropoff
       const daddr = encodeURIComponent(activeDelivery.vendorLoc + ", Bangalore") + "+to:" + encodeURIComponent(activeDelivery.destLoc + ", Bangalore");
       mapSource = `https://maps.google.com/maps?saddr=${saddr}&daddr=${daddr}&output=embed`;
    }
  }

  const acceptDelivery = (delivery) => {
    setActiveDelivery(delivery);
    setDeliveries(prev => prev.filter(d => d.id !== delivery.id));
  };

  const completeDelivery = () => {
    setActiveDelivery(null);
    // In a real app we'd trigger a payment success toast here
  };

  return (
    <div className="flex-col gap-6 relative">
      
      {/* Wallet Modal Overlay */}
      {showWallet && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
           <div className="glass-panel animate-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--accent)' }}>
              
              <div className="flex justify-between items-center mb-6">
                 <h3 className="flex items-center gap-2" style={{ fontSize: '1.8rem', color: 'var(--accent)' }}>
                    <Wallet size={28} /> Earnings Hub
                 </h3>
                 <button onClick={() => {setShowWallet(false); setPayoutMsg("");}} className="btn btn-glass hover-scale" style={{ padding: '0.6rem', borderRadius: '50%' }}>
                    <XCircle size={28} color="var(--danger)" />
                 </button>
              </div>

              <div className="flex gap-4 mb-6" style={{ flexWrap: 'wrap' }}>
                 <div style={{ flex: '1', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Lifetime Earnings</div>
                    <strong style={{ fontSize: '1.5rem', color: '#fff' }}>₹14,500</strong>
                 </div>
                 <div style={{ flex: '1', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Deliveries</div>
                    <strong style={{ fontSize: '1.5rem', color: '#fff' }}>342</strong>
                 </div>
              </div>

              <div style={{ background: 'rgba(246, 174, 45, 0.1)', border: '1px solid var(--accent)', padding: '2rem', borderRadius: '16px', textAlign: 'center', marginBottom: '1.5rem' }}>
                 <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Acquired Balance Available</p>
                 <h1 style={{ fontSize: '3.5rem', color: 'var(--accent)', margin: '1rem 0' }}>₹{pendingPayout}</h1>
                 
                 <button 
                  onClick={handleWithdraw} 
                  disabled={pendingPayout === 0}
                  className="btn hover-scale" 
                  style={{ width: '100%', background: pendingPayout === 0 ? 'var(--bg-color)' : 'var(--accent)', color: pendingPayout === 0 ? '#555' : '#000', fontSize: '1.2rem', padding: '1rem', fontWeight: 'bold' }}>
                   {pendingPayout === 0 ? "No Funds to Withdraw" : "Withdraw Funds"}
                 </button>
              </div>

              {payoutMsg && (
                 <div className="animate-in" style={{ padding: '1rem', background: payoutMsg.includes("Success") ? 'rgba(38,196,133,0.1)' : 'rgba(230,57,70,0.1)', borderLeft: payoutMsg.includes("Success") ? '4px solid var(--success)' : '4px solid var(--danger)', borderRadius: '8px' }}>
                    <span className="flex items-center gap-2" style={{ color: payoutMsg.includes("Success") ? 'var(--success)' : 'var(--danger)' }}>
                      {!payoutMsg.includes("Success") && <AlertTriangle size={18}/>} {payoutMsg}
                    </span>
                 </div>
              )}
           </div>
        </div>
      )}

      {/* 🔝 UPPER FOLD: Primary Radar & Navigation View */}
      <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
        
        {/* Left: Active Delivery / Incoming Radar */}
        <div className="flex-col gap-4" style={{ flex: '1', minWidth: '350px' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div>
               <h2 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Compass color="var(--primary)" /> {activeDelivery ? "Active Delivery Route" : "Delivery Radar"}
               </h2>
               <p style={{ color: 'var(--text-muted)' }}>{activeDelivery ? "Proceed to the vendor location immediately." : isAvailable ? "Searching for nearby orders in Koramangala..." : "You are currently Offline."}</p>
             </div>

             {!activeDelivery && (
               <button 
                  onClick={() => { setIsAvailable(!isAvailable); setDeliveries([]); }}
                  className="btn hover-scale" 
                  style={{ 
                    background: isAvailable ? 'rgba(230,57,70,0.1)' : 'rgba(38,196,133,0.1)', 
                    border: isAvailable ? '1px solid var(--danger)' : '1px solid var(--success)', 
                    color: isAvailable ? 'var(--danger)' : 'var(--success)', 
                    padding: '0.6rem 1.2rem', fontWeight: 'bold', display: 'flex', gap: '0.5rem', alignItems: 'center' 
                  }}
               >
                  <Power size={20} /> {isAvailable ? "Offline" : "Online"}
               </button>
             )}
          </div>

          {activeDelivery ? (
            // Active Delivery View
            <div className="glass-panel animate-in" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 style={{ fontSize: '1.4rem' }}>{activeDelivery.vendor}</h3>
                   <span className="badge badge-warning" style={{ marginTop: '0.5rem', display: 'inline-block' }}>En Route to Pickup</span>
                 </div>
                 <h2 style={{ color: 'var(--success)', fontSize: '1.8rem' }}>{activeDelivery.pay}</h2>
               </div>
               
               <div className="flex-col gap-2 mb-6 text-sm" style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                 <div className="flex items-center gap-2 mb-2"><Package size={16} color="var(--primary)"/> <strong>Order:</strong> {activeDelivery.item}</div>
                 
                 {activeDelivery.isBatch ? (
                   <div className="flex-col gap-2 relative" style={{ paddingLeft: '8px', borderLeft: '2px solid rgba(255,255,255,0.2)', marginLeft: '8px' }}>
                     {activeDelivery.waypoints.map((wp, index) => {
                       const isVendor = index < 2; // Assuming first 2 are vendors for this batch
                       return (
                         <div key={index} className="flex items-center gap-2">
                           <div style={{ width: '8px', height: '8px', background: isVendor ? 'var(--danger)' : 'var(--success)', borderRadius: '50%', position: 'absolute', left: '-5px' }}></div>
                           <strong style={{ color: isVendor ? 'var(--danger)' : 'var(--success)' }}>{isVendor ? 'Pickup:' : 'Dropoff:'}</strong> {wp}
                         </div>
                       );
                     })}
                   </div>
                 ) : (
                   <>
                     <div className="flex items-center gap-2 mb-2"><MapPin size={16} color="var(--danger)"/> <strong>Pickup:</strong> {activeDelivery.vendorLoc}</div>
                     <div className="flex items-center gap-2"><MapPin size={16} color="var(--success)"/> <strong>Dropoff:</strong> {activeDelivery.destLoc}</div>
                   </>
                 )}
               </div>

               <div className="flex gap-2">
                 <button onClick={completeDelivery} className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem' }}>
                    <CheckCircle size={20} /> Mark Delivered
                 </button>
               </div>
            </div>
          ) : (
            // Incoming Single Request List
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 className="flex items-center gap-2 mb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                 <Clock size={20} color="var(--success)" /> Live Local Requests
              </h3>
              
              {deliveries.length === 0 ? (
                 <div className="text-center" style={{ padding: '3rem 0', color: 'var(--text-muted)' }}>
                    {isAvailable ? "Radar scanning... Waiting for local vendor pings." : "You are Offline. Go Online to receive deliveries."}
                 </div>
              ) : (
                 <div className="flex-col gap-3">
                   {deliveries.map(d => (
                      <div key={d.id} className="animate-in" style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <div className="flex justify-between items-center mb-2">
                           <strong style={{ fontSize: '1.1rem' }}>{d.vendor}</strong>
                           <strong style={{ color: 'var(--success)', fontSize: '1.2rem' }}>{d.pay}</strong>
                         </div>
                         <div className="text-sm" style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                           {d.dist} total distance • {d.destLoc}
                         </div>
                         <button onClick={() => acceptDelivery(d)} className="btn hover-scale" style={{ width: '100%', background: 'var(--success)', color: '#000', fontWeight: 'bold' }}>
                            Accept Delivery
                         </button>
                      </div>
                   ))}
                 </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Dynamic Interactive Navigation Map */}
        <div className="glass-panel flex-col" style={{ flex: '2', minWidth: '400px', padding: '1rem' }}>
           <div className="flex justify-between items-center mb-3">
             <h3 className="flex items-center gap-2"><Navigation size={20} color="var(--primary)"/> GPS Navigation</h3>
             {activeDelivery && <span className="badge badge-success">Routing Active</span>}
           </div>
           
           <div style={{ flex: '1', borderRadius: '12px', overflow: 'hidden', position: 'relative', minHeight: '500px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe 
                width="100%" 
                height="100%" 
                style={{ border: 0, position: 'absolute', inset: 0, filter: 'invert(100%) hue-rotate(180deg) contrast(110%) brightness(80%)' }} 
                src={mapSource}
                allowFullScreen
                allow="geolocation"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Dynamic Routing"
              />
              
              {/* Optional slight dark overlay to blend the map slightly better, pointer-events none to preserve interactivity */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(11, 15, 25, 0.1)', pointerEvents: 'none' }}></div>
           </div>
        </div>
      </div>

      
      {/* 🔽 LOWER FOLD: Secondary Intelligence (Micro-Batching & Predictive Heatmaps) */}
      <h3 style={{ marginTop: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Area Intelligence</h3>
      
      <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
        
        <div className="glass-panel" style={{ flex: '1', minWidth: '350px', padding: '1.5rem' }}>
          <h3 className="flex items-center gap-2 mb-4">
             <Layers size={18} color="var(--primary)" /> Smart Batch Queues
          </h3>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            {t('pd_queue_desc')}
          </p>
          
          <div className="flex-col gap-2">
            {!batchAccepted && (
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--success)', opacity: 0.8 }}>
                 <div className="flex justify-between items-center mb-2">
                   <strong>{t('pd_batch')} #8492</strong>
                   <span className="badge badge-success">{t('pd_ready')}</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span style={{ color: 'var(--text-muted)' }}>3 {t('pd_orders')} • Koramangala</span>
                   <strong style={{ color: 'var(--success)' }}>{t('pd_earn')} 120</strong>
                 </div>
                 {activeDelivery ? (
                    <div style={{ marginTop: '1rem', padding: '0.6rem', textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)' }}>
                       <Clock size={16} style={{ display: 'inline', marginBottom: '2px' }}/> Complete current delivery to accept new batches
                    </div>
                 ) : (
                   <button 
                      onClick={() => {
                         acceptDelivery({
                           id: 'batch_8492',
                           isBatch: true,
                           vendor: 'Smart Batch (Optimized Route)',
                           item: '2x Pickups • 2x Dropoffs',
                           waypoints: [
                             "Koramangala 4th Block",   
                             "Koramangala 5th Block",   
                             "HSR Layout Sector 2",     
                             "BTM Layout Stage 2"       
                           ],
                           pay: '₹145'
                         });
                         setBatchAccepted(true);
                      }}
                      className="btn btn-glass hover-scale" 
                      style={{ width: '100%', marginTop: '1rem', padding: '0.6rem', border: '1px solid var(--success)', color: 'var(--success)', fontWeight: 'bold' }}>
                      {t('pd_accept')} Batch
                   </button>
                 )}
              </div>
            )}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--warning)', opacity: 0.8 }}>
               <div className="flex justify-between items-center mb-2">
                 <strong>{t('pd_batch')} #8493</strong>
                 <span className="badge badge-warning">{t('pd_forming')} (4/5)</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span style={{ color: 'var(--text-muted)' }}>HSR Layout</span>
                 <strong style={{ color: 'var(--accent)' }}>{t('pd_est')} 180</strong>
               </div>
            </div>
          </div>
        </div>

        <div className="glass-panel flex-col" style={{ flex: '1', minWidth: '350px', padding: '1.5rem' }}>
          <h3 className="flex items-center gap-2 mb-4"><TrendingUp size={18} color="var(--primary)"/> Predictive Crowd Heatmap</h3>
          <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>General forecast of high-demand areas. Navigate here if you are idle.</p>
          
          <div style={{ flex: '1', borderRadius: 'var(--radius-md)', position: 'relative', minHeight: '200px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <iframe 
              width="100%" height="100%" 
              style={{ border: 0, position: 'absolute', inset: 0, filter: 'invert(100%) hue-rotate(180deg) contrast(110%) brightness(80%) grayscale(50%)' }} 
              src="https://maps.google.com/maps?q=Bangalore&t=&z=12&ie=UTF8&iwloc=&output=embed" 
              loading="lazy"
            />
            {/* Mock heatmap over the wide view */}
            <div style={{ position: 'absolute', top: '30%', left: '45%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(230,57,70,0.8) 0%, rgba(230,57,70,0) 70%)', borderRadius: '50%', pointerEvents: 'none', mixBlendMode: 'screen' }}></div>
            <div style={{ position: 'absolute', top: '50%', left: '25%', width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(246,174,45,0.8) 0%, rgba(246,174,45,0) 70%)', borderRadius: '50%', pointerEvents: 'none', mixBlendMode: 'screen' }}></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PartnerDashboard;
