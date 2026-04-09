import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check Vendors
      let res = await fetch(`http://localhost:3001/vendors`);
      let data = await res.json();
      let match = data.find(user => user.phone === phone && user.password === password);
      if (match) {
        localStorage.setItem('apnabite_user', JSON.stringify({ role: 'vendor', details: match }));
        navigate('/dashboard');
        return;
      }

      // Check Partners
      res = await fetch(`http://localhost:3001/partners`);
      data = await res.json();
      match = data.find(user => user.phone === phone && user.password === password);
      if (match) {
        localStorage.setItem('apnabite_user', JSON.stringify({ role: 'partner', details: match }));
        navigate('/dashboard');
        return;
      }

      // Check Customers
      res = await fetch(`http://localhost:3001/customers`);
      data = await res.json();
      match = data.find(user => user.phone === phone && user.password === password);
      if (match) {
        localStorage.setItem('apnabite_user', JSON.stringify({ role: 'customer', details: match }));
        navigate('/dashboard');
        return;
      }

      // If nothing found
      setError('No account found with this phone number. Please register first.');
    } catch (err) {
      console.error(err);
      setError('Database connection error. Ensure json-server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center animate-in" style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      position: 'relative',
      background: 'linear-gradient(rgba(11, 15, 25, 0.85), rgba(11, 15, 25, 0.85)), url("/bg.png") center/cover no-repeat'
    }}>
      <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', zIndex: 1000 }}>
        <LanguageToggle />
      </div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '3rem', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', background: 'rgba(20, 25, 40, 0.6)' }}>
        
        <div className="flex items-center gap-3 mb-4" style={{ marginBottom: '2rem' }}>
          <img src="/logo.png" alt="Apna Bite Logo" style={{ width: '50px', height: '50px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(242, 100, 25, 0.4)' }} />
          <div>
            <h2 style={{ color: 'var(--primary)', lineHeight: '1.2' }}>Apna Bite</h2>
            <p style={{ fontSize: '0.9rem' }}>Welcome back to the dashboard.</p>
          </div>
        </div>

        {error && (
            <div style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.9rem' }}>{error}</span>
            </div>
        )}

        <form onSubmit={handleLogin} className="flex-col gap-3">
          
          <div className="form-group">
            <label>Phone Number</label>
            <input 
               required 
               type="tel" 
               className="input-field" 
               placeholder="e.g. 111, 222, 333 (for demo)" 
               value={phone}
               onChange={(e) => setPhone(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
               required 
               type="password" 
               className="input-field" 
               placeholder="e.g. 123" 
               value={password}
               onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button disabled={loading} type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
             {loading ? 'Verifying...' : 'Login Securely'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem' }}>
             Don't have an account? <span onClick={() => navigate('/')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>Register Here</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
