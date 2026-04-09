import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Clock, ShieldCheck, Tag, MapPin, ShoppingCart, Truck, CheckCircle, X, Trash2, CreditCard, Banknote, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CustomerInterface = ({ data }) => {
  const { t } = useTranslation();
  const [selectedStall, setSelectedStall] = useState(null);
  
  // Cart & Checkout States
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [checkoutPhase, setCheckoutPhase] = useState('cart'); // cart, address, payment, processing, success, receipt
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
     const user = JSON.parse(localStorage.getItem('apnabite_user')) || {};
     if (user?.details?.address) {
        setDeliveryAddress(user.details.address);
     }
  }, []);

  const addToCart = (stall, item) => {
     const existingItem = cart.find(c => c.itemId === item.id);
     if (existingItem) {
        setCart(cart.map(c => c.itemId === item.id ? { ...c, qty: c.qty + 1 } : c));
     } else {
        setCart([...cart, { itemId: item.id, item: item.item, price: item.price, vendor: stall.stallName, qty: 1 }]);
     }
  };

  const removeFromCart = (itemId) => {
     setCart(cart.filter(c => c.itemId !== itemId));
  };

  const processOrder = () => {
     setCheckoutPhase('processing');
     
     const orderDetails = {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        items: [...cart],
        vendorNames: [...new Set(cart.map(c => c.vendor))].join(', '),
        totalAmount: cart.reduce((a,b)=>a+(b.price*b.qty), 0),
        orderTime: new Date().toLocaleTimeString(),
        orderDate: new Date().toLocaleDateString(),
        paymentMethod: paymentMethod.toUpperCase(),
        deliveryAddress: deliveryAddress,
        deliveryInstructions: deliveryInstructions || 'None'
     };

     setTimeout(() => {
        setReceiptData(orderDetails);
        setCheckoutPhase('success');
        setCart([]); // Clear cart behind the scenes
     }, 2000);
  };

  const stallsToRender = data.stalls || [];
  const centerCoord = [12.9352, 77.6245]; // Hard-locked to Koramangala, Bangalore

  if (checkoutPhase === 'receipt' && receiptData) {
     return (
        <div className="flex justify-center items-center" style={{ height: '75vh', padding: '1rem' }}>
           <div className="glass-panel animate-in flex-col" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex justify-between items-center mb-4" style={{ paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                 <div>
                    <h2 style={{ color: 'var(--success)', marginBottom: '0.25rem' }}>Order Confirmed</h2>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{receiptData.orderDate} at {receiptData.orderTime}</div>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold' }}>{receiptData.orderId}</div>
                    <div style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>Preparing...</div>
                 </div>
              </div>

              <div style={{ margin: '1.5rem 0' }}>
                 <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Order Details from: <span style={{ color: 'var(--accent)' }}>{receiptData.vendorNames}</span></h3>
                 <div className="flex flex-col gap-3">
                    {receiptData.items.map(item => (
                       <div key={item.itemId} className="flex justify-between items-center" style={{ padding: '0.75rem', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
                          <div>{item.qty}x {item.item}</div>
                          <div>₹{item.price * item.qty}</div>
                       </div>
                    ))}
                 </div>
              </div>

              <div style={{ background: 'rgba(246, 174, 45, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid rgba(246, 174, 45, 0.2)' }}>
                 <div className="flex justify-between items-center mb-2">
                    <span style={{ color: 'var(--text-muted)' }}>Payment Method</span>
                    <strong>{receiptData.paymentMethod}</strong>
                 </div>
                 <div className="flex justify-between items-center mb-2">
                    <span style={{ color: 'var(--text-muted)' }}>Deliver to</span>
                    <strong style={{ textAlign: 'right', maxWidth: '200px' }}>{receiptData.deliveryAddress}</strong>
                 </div>
                 {receiptData.deliveryInstructions !== 'None' && (
                    <div className="flex justify-between items-start mb-2">
                       <span style={{ color: 'var(--text-muted)' }}>Instructions</span>
                       <strong style={{ textAlign: 'right', maxWidth: '200px', fontStyle: 'italic' }}>"{receiptData.deliveryInstructions}"</strong>
                    </div>
                 )}
                 <div className="flex justify-between items-center mt-4" style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '1.3rem', fontWeight: 'bold' }}>
                    <span>Total Paid</span>
                    <span style={{ color: 'var(--success)' }}>₹{receiptData.totalAmount}</span>
                 </div>
              </div>

              <button onClick={() => { setCheckoutPhase('cart'); setReceiptData(null); }} className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Explore More Vendors</button>
           </div>
        </div>
     );
  }

  return (
    <div className="flex gap-4" style={{ height: '75vh' }}>
      <div className="glass-panel" style={{ flex: '2', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1rem' }}>Local Vendors in Bangalore</h3>
        <div style={{ flex: '1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
          <MapContainer center={centerCoord} zoom={14} style={{ height: '100%', width: '100%' }}>
            <TileLayer 
               url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" 
               attribution="&copy; Google Maps" 
            />
            {stallsToRender.map((stall, i) => (
              <CircleMarker 
                 key={stall.stallId || i} 
                 center={[stall.lat, stall.lng]} 
                 pathOptions={{ color: '#fff', weight: 2, fillColor: 'var(--danger)', fillOpacity: 0.9 }} 
                 radius={12}
                 eventHandlers={{click: () => setSelectedStall(stall)}}
              >
                <Popup>
                  <strong>{stall.stallName}</strong><br/>
                  {stall.category}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="flex-col gap-4" style={{ flex: '1' }}>
        <div className="glass-panel items-center justify-center p-4 flex-col text-center" style={{ padding: '2rem 1.5rem', background: 'rgba(246, 174, 45, 0.1)' }}>
            <div style={{ background: 'var(--accent)', color: '#000', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 'bold' }}>
               {t('ci_zero_waste')}
            </div>
            <p style={{ marginTop: '0.5rem' }}><Tag size={14}/> {t('ci_samosa')}</p>
        </div>

        <div className="glass-panel flex-col" style={{ flex: '1', padding: '1.5rem', overflowY: 'auto' }}>
          {selectedStall ? (
            <div className="animate-in">
              <h2 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>{selectedStall.stallName}</h2>
              <p style={{ marginBottom: '1rem' }}>{selectedStall.category} • ₹{selectedStall.avgPrice}</p>
              
               <div className="flex items-center gap-2" style={{ padding: '0.75rem', background: 'rgba(38, 196, 133, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(38, 196, 133, 0.3)', marginBottom: '1.5rem' }}>
                 <ShieldCheck size={24} color="var(--success)" />
                 <div>
                    <div style={{ fontWeight: '600', color: 'var(--success)' }}>FSSAI Verified</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{selectedStall.rating} / 5.0 Hygiene Rating</div>
                 </div>
              </div>

              <h3>{t('ci_menu')}</h3>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedStall.menu && selectedStall.menu.length > 0 ? selectedStall.menu.map(item => (
                   <div key={item.id} className="flex justify-between items-center" style={{ padding: '0.75rem', borderBottom: '1px solid var(--glass-border)' }}>
                      <div>
                         <div style={{ fontWeight: '500' }}>{item.item}</div>
                         <div className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: item.status === 'Hot' ? 'var(--danger)' : 'var(--accent)' }}>
                            <Clock size={12} /> {item.status}
                         </div>
                      </div>
                      <div>₹{item.price} <button onClick={() => addToCart(selectedStall, item)} className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{t('ci_add')}</button></div>
                   </div>
                )) : (
                   <div style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'center' }}>No menu available</div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col text-center" style={{ height: '100%', color: 'var(--text-muted)', opacity: 0.6 }}>
               <MapPin size={48} style={{ marginBottom: '1rem' }} />
               <p>{t('ci_select')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Action Cart Tag */}
      {cart.length > 0 && (
         <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }} className="glass-panel animate-in">
            <button onClick={() => setShowCartModal(true)} className="btn btn-primary flex items-center gap-2" style={{ fontSize: '1.1rem', padding: '0.75rem 1.5rem', boxShadow: '0 4px 15px rgba(246, 174, 45, 0.4)' }}>
               <ShoppingCart size={22} /> View Cart ({cart.reduce((a,b)=>a+b.qty, 0)}) • ₹{cart.reduce((a,b)=>a+(b.price*b.qty), 0)}
            </button>
         </div>
      )}

      {/* Secure Checkout Overlay Modal */}
      {showCartModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div className="glass-panel animate-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
              
              {checkoutPhase === 'cart' && (
                 <>
                    <div className="flex justify-between items-center mb-4" style={{ marginBottom: '1.5rem' }}>
                       <h2>Your Cart</h2>
                       <button onClick={() => setShowCartModal(false)} className="btn btn-glass" style={{ padding: '0.5rem' }}><X size={20} /></button>
                    </div>
                    <div style={{ flex: '1', overflowY: 'auto' }}>
                       {cart.map(item => (
                          <div key={item.itemId} className="flex justify-between items-center" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', marginBottom: '0.5rem' }}>
                             <div>
                                <div style={{ fontWeight: 'bold' }}>{item.item} (x{item.qty})</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.vendor}</div>
                             </div>
                             <div className="flex items-center gap-3">
                                <span>₹{item.price * item.qty}</span>
                                <button onClick={() => removeFromCart(item.itemId)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><Trash2 size={16}/></button>
                             </div>
                          </div>
                       ))}
                       {cart.length === 0 && <p className="text-center" style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>Your cart is empty.</p>}
                    </div>
                    {cart.length > 0 && (
                       <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <div className="flex justify-between mb-4" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                             <span>Total Due</span>
                             <span>₹{cart.reduce((a,b)=>a+(b.price*b.qty), 0)}</span>
                          </div>
                          <button onClick={() => setCheckoutPhase('address')} className="btn btn-primary w-full flex items-center justify-center gap-2" style={{ padding: '1rem' }}><Truck size={20} /> Proceed to Address Check</button>
                       </div>
                    )}
                 </>
              )}

              {checkoutPhase === 'address' && (
                 <>
                    <div className="flex justify-between items-center mb-4" style={{ marginBottom: '1.5rem' }}>
                       <h2>Confirm Delivery Details</h2>
                       <button onClick={() => setCheckoutPhase('cart')} className="btn btn-glass" style={{ padding: '0.5rem' }}>Back</button>
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                       <div className="form-group">
                          <label>Delivery Location</label>
                          <textarea 
                             className="input-field" 
                             rows={2} 
                             value={deliveryAddress} 
                             onChange={(e) => setDeliveryAddress(e.target.value)}
                             placeholder="E.g. Tower B, 3rd Floor"
                          />
                       </div>
                       <div className="form-group">
                          <label>Special Instructions</label>
                          <textarea 
                             className="input-field" 
                             rows={2} 
                             value={deliveryInstructions} 
                             onChange={(e) => setDeliveryInstructions(e.target.value)}
                             placeholder="E.g. Leave at door, or bring extra ketchup"
                          />
                       </div>
                       <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                         We will dispatch a Delivery Partner to this exact location once your order is confirmed.
                       </p>
                    </div>
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem' }}>
                       <button onClick={() => setCheckoutPhase('payment')} className="btn btn-primary w-full flex items-center justify-center gap-2" style={{ padding: '1rem' }}>Proceed to Payment Options</button>
                    </div>
                 </>
              )}

              {checkoutPhase === 'payment' && (
                 <>
                    <div className="flex justify-between items-center mb-4" style={{ marginBottom: '1.5rem' }}>
                       <h2>Secure Payment</h2>
                       <button onClick={() => setCheckoutPhase('address')} className="btn btn-glass" style={{ padding: '0.5rem' }}>Back</button>
                    </div>
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                       <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-lg)', textAlign: 'center', marginBottom: '0.5rem' }}>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Amount to Pay</div>
                          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>₹{cart.reduce((a,b)=>a+(b.price*b.qty), 0)}</div>
                       </div>
                       
                       <label style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Select Method</label>
                       
                       <div className="flex flex-col gap-2">
                          <div onClick={() => setPaymentMethod('upi')} style={{ padding: '1rem', border: paymentMethod === 'upi' ? '2px solid var(--accent)' : '2px solid transparent', background: paymentMethod === 'upi' ? 'rgba(246, 174, 45, 0.1)' : 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                             <ShieldCheck size={24} color={paymentMethod === 'upi' ? 'var(--accent)' : '#fff'} />
                             <div style={{ fontWeight: '500' }}>UPI (GPay / PhonePe)</div>
                          </div>
                          
                          <div onClick={() => setPaymentMethod('cod')} style={{ padding: '1rem', border: paymentMethod === 'cod' ? '2px solid var(--accent)' : '2px solid transparent', background: paymentMethod === 'cod' ? 'rgba(246, 174, 45, 0.1)' : 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                             <Banknote size={24} color={paymentMethod === 'cod' ? 'var(--accent)' : '#fff'} />
                             <div style={{ fontWeight: '500' }}>Cash on Delivery</div>
                          </div>

                          <div onClick={() => setPaymentMethod('card')} style={{ padding: '1rem', border: paymentMethod === 'card' ? '2px solid var(--accent)' : '2px solid transparent', background: paymentMethod === 'card' ? 'rgba(246, 174, 45, 0.1)' : 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                             <CreditCard size={24} color={paymentMethod === 'card' ? 'var(--accent)' : '#fff'} />
                             <div style={{ fontWeight: '500' }}>Credit / Debit Card</div>
                          </div>
                       </div>
                    </div>
                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem' }}>
                       <button onClick={processOrder} className="btn btn-success w-full flex items-center justify-center gap-2" style={{ padding: '1rem' }}>Place Order securely</button>
                    </div>
                 </>
              )}

              {checkoutPhase === 'processing' && (
                 <div className="flex flex-col items-center justify-center gap-4 text-center" style={{ flex: '1', minHeight: '300px' }}>
                    <Clock size={40} color="var(--primary)" style={{ animation: 'pulsate 1s infinite' }} />
                    <h3 style={{ color: 'var(--text-muted)' }}>Executing Secure Handoff...</h3>
                 </div>
              )}

              {checkoutPhase === 'success' && (
                 <div className="flex flex-col items-center justify-center gap-4 text-center animate-in" style={{ flex: '1', minHeight: '300px' }}>
                    <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ color: 'var(--success)' }}>Order Dispatched!</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', padding: '0 2rem' }}>
                      Riders in your area have been pinged via the active radar grid mapping to {deliveryAddress || "your location"}.
                    </p>
                    <button onClick={() => { setShowCartModal(false); setCheckoutPhase('receipt'); }} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>View Order Receipt</button>
                 </div>
              )}

           </div>
        </div>
      )}
    </div>
  );
};

export default CustomerInterface;
