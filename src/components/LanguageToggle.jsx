import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, ChevronDown, Check } from 'lucide-react';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी (Hindi)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' }
  ];

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef} style={{ position: 'relative' }}>
      
      {/* The main button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2" 
        style={{ 
          background: 'rgba(20, 25, 40, 0.9)', 
          border: '1px solid var(--primary)',
          padding: '0.6rem 1.2rem', 
          borderRadius: '50px',
          boxShadow: isOpen ? '0 4px 20px rgba(242, 100, 25, 0.4)' : '0 4px 15px rgba(242, 100, 25, 0.2)',
          color: '#fff',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s ease',
          fontSize: '1rem',
          fontWeight: 'bold'
        }}
      >
        <Languages size={20} color="var(--primary)" />
        <span style={{ minWidth: '70px', textAlign: 'left' }}>{currentLang.label.split(' ')[0]}</span>
        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }} />
      </button>

      {/* The Custom Dropdown Menu */}
      {isOpen && (
        <div 
          className="animate-in"
          style={{ 
            position: 'absolute', 
            top: '120%', 
            right: 0, 
            background: 'var(--surface)', 
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            minWidth: '180px',
            overflow: 'hidden',
            zIndex: 9999
          }}
        >
          {languages.map((lang) => (
            <div 
              key={lang.code}
              className="lang-option"
              onClick={() => changeLanguage(lang.code)}
              style={{
                padding: '0.8rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: i18n.language === lang.code ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: i18n.language === lang.code ? 'bold' : 'normal',
                background: i18n.language === lang.code ? 'rgba(242, 100, 25, 0.1)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              <span>{lang.label}</span>
              {i18n.language === lang.code && <Check size={16} />}
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default LanguageToggle;
