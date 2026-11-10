import React, { useState } from 'react';

export default function Daftar({ handleRegister, rNama, setRNama, rMail, setRMail, rHp, setRHp, rPass, setRPass, rPass2, setRPass2, regErr, onNavigate, styles }) {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <section className="screen auth-screen" style={styles?.screen || { padding: '20px', maxWidth: '400px', margin: '0 auto', boxSizing: 'border-box', position: 'relative', zIndex: 10 }}>
      
      {/* Tombol Kembali ke Beranda */}
      <div style={{ marginBottom: '10px', position: 'relative', zIndex: 20 }}>
        <button 
          type="button"
          onClick={() => onNavigate('welcome')}
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.85rem', padding: '5px 0', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
        >
          ← Kembali ke Beranda
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 'bold', margin: '0 0 5px 0' }}>SMART PAKAN IKAN</h3>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Silakan isi data untuk mendaftar:</p>
      </div>

      {regErr && (
        <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '8px', borderRadius: '6px', fontSize: '0.75rem', marginBottom: '10px', textAlign: 'center', position: 'relative', zIndex: 20 }}>
          {regErr}
        </div>
      )}

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px', margin: '0 auto', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>Nama Lengkap</label>
          <input 
            type="text" 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} 
            placeholder="Nama Anda" 
            value={rNama} 
            onChange={(e) => setRNama(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>E-mail</label>
          <input 
            type="email" 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} 
            placeholder="nama@email.com" 
            value={rMail} 
            onChange={(e) => setRMail(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>Nomor Telepon</label>
          <input 
            type="tel" 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} 
            placeholder="08xxxxxxxxxx" 
            value={rHp} 
            onChange={(e) => setRHp(e.target.value)} 
            required 
          />
        </div>

        {/* Input Buat Kata Sandi dengan Ikon Mata */}
        <div style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>Buat Kata Sandi</label>
          <input 
            style={{ width: '100%', padding: '10px 40px 10px 10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} 
            type={showPass ? "text" : "password"} 
            placeholder="Minimal 8 karakter" 
            value={rPass} 
            onChange={(e) => setRPass(e.target.value)} 
            required 
          />
          <button 
            type="button" 
            onClick={() => setShowPass(!showPass)} 
            style={{ position: 'absolute', right: '12px', top: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', zIndex: 20 }}
          >
            {showPass ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            )}
          </button>
        </div>

        {/* Input Konfirmasi Kata Sandi dengan Ikon Mata */}
        <div style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>Konfirmasi Kata Sandi</label>
          <input 
            style={{ width: '100%', padding: '10px 40px 10px 10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} 
            type={showPass2 ? "text" : "password"} 
            placeholder="Ulangi kata sandi" 
            value={rPass2} 
            onChange={(e) => setRPass2(e.target.value)} 
            required 
          />
          <button 
            type="button" 
            onClick={() => setShowPass2(!showPass2)} 
            style={{ position: 'absolute', right: '12px', top: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', zIndex: 20 }}
          >
            {showPass2 ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            )}
          </button>
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', zIndex: 20 }}
        >
          Daftar Sekarang
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', color: '#94a3b8', fontSize: '0.8rem', position: 'relative', zIndex: 20 }}>
        Sudah punya akun?{' '}
        <span 
          style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }} 
          onClick={() => onNavigate('masuk')}
        >
          Masuk di sini
        </span>
      </p>
    </section>
  );
}