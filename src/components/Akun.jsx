import React, { useState, useEffect } from 'react';

export default function Akun({ akunData, onUpdateAkun, onBack, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAkun, setTempAkun] = useState(akunData || {
    nama: '',
    email: '',
    noHp: ''
  });

  // Sinkronisasi jika akunData dari App.jsx berubah
  useEffect(() => {
    if (akunData) {
      setTempAkun(akunData);
    }
  }, [akunData]);

  const handleChange = (e) => {
    setTempAkun({ ...tempAkun, [e.target.name]: e.target.value });
  };

  // Simpan perubahan dan perbarui state global di App.jsx + localStorage
  const handleSave = (e) => {
    e.preventDefault();
    onUpdateAkun(tempAkun);
    localStorage.setItem('user_akun_data', JSON.stringify(tempAkun));
    setIsEditing(false);
    alert("Data Akun Berhasil Diperbarui!");
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Tombol Kembali ke Menu Utama */}
      <button 
        type="button" 
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px', cursor: 'pointer' }} 
        onClick={onBack}
      >
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', margin: '0 0 5px 0' }}>Menu Akun</h3>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Kelola informasi data diri dan keluar akun</p>
      </div>

      <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', padding: '15px', textAlign: 'left', fontSize: '0.8rem' }}>
        
        {!isEditing ? (
          /* Mode Tampilan Informasi Akun */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block' }}>NAMA PENGGUNA</span>
              <strong style={{ color: '#38bdf8', fontSize: '0.9rem' }}>👤 {akunData?.nama || 'Belum diisi'}</strong>
            </div>

            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block' }}>EMAIL</span>
              <span style={{ color: '#e2e8f0' }}>✉️ {akunData?.email || 'Belum diisi'}</span>
            </div>

            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.7rem', display: 'block' }}>NOMOR HP</span>
              <span style={{ color: '#e2e8f0' }}>📱 {akunData?.noHp || 'Belum diisi'}</span>
            </div>

            <button 
              type="button" 
              onClick={() => { setTempAkun(akunData); setIsEditing(true); }}
              className="btn-primary"
              style={{ backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}
            >
              Edit Data Akun
            </button>
          </div>
        ) : (
          /* Form Edit Akun Sekaligus (Nama, Email, No. HP) */
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '4px' }}>Edit Informasi Akun:</div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>Nama Pengguna</label>
              <input type="text" className="form-input" name="nama" value={tempAkun.nama} onChange={handleChange} required />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>Email</label>
              <input type="email" className="form-input" name="email" value={tempAkun.email} onChange={handleChange} required />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block', marginBottom: '3px' }}>Nomor HP</label>
              <input type="text" className="form-input" name="noHp" value={tempAkun.noHp} onChange={handleChange} required />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button type="submit" style={{ flex: 1, backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '8px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>
                Perbarui Akun
              </button>
              <button type="button" onClick={() => setIsEditing(false)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>
                Batal
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Tombol Keluar Akun / Logout */}
      <button 
        type="button"
        onClick={onLogout}
        style={{ width: '100%', background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', padding: '12px', marginTop: '20px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}
      >
        Keluar Akun
      </button>

    </div>
  );
}