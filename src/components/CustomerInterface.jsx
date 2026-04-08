import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Clock, ShieldCheck, Tag, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow,
});

const CustomerInterface = ({ data }) => {
  const { t } = useTranslation();
  const [selectedStall, setSelectedStall] = useState(null);
  const center = data.stalls.length > 0 && data.stalls[0].lat ? [data.stalls[0].lat, data.stalls[0].lng] : [28.6139, 77.2090];

  return (
    <div className="flex gap-4" style={{ height: '75vh' }}>
      <div className="glass-panel" style={{ flex: '2', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '1rem' }}>{t('ci_find')}</h3>
        <div style={{ flex: '1', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            {data.stalls.slice(0, 15).map(stall => (
              stall.lat && stall.lng ? (
                <Marker key={stall.stallId} position={[stall.lat, stall.lng]} eventHandlers={{click: () => setSelectedStall(stall)}}>
                  <Popup>
                    <strong>{stall.stallName}</strong><br/>
                    {stall.category}
                  </Popup>
                </Marker>
              ) : null
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
                    <div style={{ fontWeight: '600', color: 'var(--success)' }}>{t('ci_hygiene')}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('ci_rating')}</div>
                 </div>
              </div>

              <h3>{t('ci_menu')}</h3>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                 <div className="flex justify-between items-center" style={{ padding: '0.75rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <div>
                       <div style={{ fontWeight: '500' }}>Vegetable Samosa</div>
                       <div className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>
                          <Clock size={12} /> {t('ci_fresh')}
                       </div>
                    </div>
                    <div>₹15 <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{t('ci_add')}</button></div>
                 </div>
                 
                 <div className="flex justify-between items-center" style={{ padding: '0.75rem', borderBottom: '1px solid var(--glass-border)' }}>
                    <div>
                       <div style={{ fontWeight: '500' }}>Paneer Tikka Roll</div>
                       <div className="flex items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <Clock size={12} /> {t('ci_last')}
                       </div>
                    </div>
                    <div>₹60 <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}>{t('ci_add')}</button></div>
                 </div>
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
    </div>
  );
};

export default CustomerInterface;
