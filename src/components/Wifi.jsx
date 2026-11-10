import React, { useState } from 'react';

export default function Wifi({ wifiData, onUpdateWifi, onBack, loading }) {
  // Menggunakan state tunggal (objek) agar lebih ringkas
  const [form, setForm] = useState(wifiData);

  // Handler universal untuk input Wi-Fi
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateWifi(form);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tombol Kembali */}
      <button 
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }} 
        onClick={onBack}
        type="button"
      >
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'left' }}>
        <h3 style={{ color: '#38bdf8', marginTop: '0', marginBottom: '20px', textAlign: 'center', fontSize: '1.1rem' }}>
          Pengaturan Wi-Fi Alat
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Input Nama Wi-Fi (SSID) */}
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              NAMA WI-FI (SSID)
            </label>
            <input 
              type="text" 
              className="form-input" 
              name="ssid"
              placeholder="Masukkan nama Wi-Fi Anda" 
              value={form.ssid} 
              onChange={handleChange} 
            />
          </div>

          {/* Input Kata Sandi (Password) */}
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              KATA SANDI (PASSWORD)
            </label>
            <input 
              type="text" 
              className="form-input" 
              name="password"
              placeholder="Masukkan kata sandi Wi-Fi" 
              value={form.password} 
              onChange={handleChange} 
            />
            <small style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '6px', display: 'block' }}>
              * Kosongkan jika jaringan bersifat publik/terbuka.
            </small>
          </div>

          {/* Tombol Sinkronisasi */}
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', marginTop: '10px' }} 
            disabled={loading}
          >
            {loading ? 'MENYIMPAN...' : 'SINKRONISASI WI-FI KE ALAT'}
          </button>

        </form>
      </div>
    </div>
  );
}