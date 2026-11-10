import React, { useState } from 'react';

export default function PengaturanPakan({ data = { tglMulai: '1', tglSelesai: '30', jamPagi: '10', menitPagi: '56', jamSore: '10', menitSore: '57', durasi: '10' }, onUpdate, onBack, loading }) {
  const [form, setForm] = useState(data);

  // State untuk jadwal tambahan (hanya jam & menit saja)
  const [extraJadwal, setExtraJadwal] = useState([]);
  const [menuId, setMenuId] = useState(null);

  // Fungsi menambah kolom jadwal baru (Jam : Menit)
  const handleTambahKolom = () => {
    setExtraJadwal([
      ...extraJadwal, 
      { id: Date.now(), jam: '', menit: '' }
    ]);
  };

  // Fungsi update isi input jadwal tambahan
  const handleExtraChange = (id, field, value) => {
    setExtraJadwal(extraJadwal.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Hapus jadwal tambahan
  const handleHapusJadwal = (id) => {
    setExtraJadwal(extraJadwal.filter(item => item.id !== id));
    setMenuId(null);
  };

  const handleEditJadwal = (id) => {
    setMenuId(null);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tombol Kembali */}
      <button type="button" className="btn-primary" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px' }} onClick={onBack}>
        ← Kembali ke Menu
      </button>

      <h3 style={{ color: '#38bdf8', textAlign: 'center', margin: '0 0 15px 0' }}>Pengaturan Jadwal Pakan</h3>

      {/* Form Utama */}
      <form onSubmit={(e) => { e.preventDefault(); onUpdate({ ...form, extraJadwal }); }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Rentang Tanggal */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>RENTANG TANGGAL</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input type="number" className="form-input" value={form.tglMulai || ''} onChange={(e) => setForm({...form, tglMulai: e.target.value})} required />
            <span style={{ color: '#94a3b8' }}>s/d</span>
            <input type="number" className="form-input" value={form.tglSelesai || ''} onChange={(e) => setForm({...form, tglSelesai: e.target.value})} required />
          </div>
        </div>

        {/* Jadwal Pagi */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>JADWAL PAGI</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input type="number" className="form-input" value={form.jamPagi || ''} onChange={(e) => setForm({...form, jamPagi: e.target.value})} required />
            <span style={{ color: '#fff', fontWeight: 'bold' }}>:</span>
            <input type="number" className="form-input" value={form.menitPagi || ''} onChange={(e) => setForm({...form, menitPagi: e.target.value})} required />
          </div>
        </div>

        {/* Jadwal Sore */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>JADWAL SORE</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input type="number" className="form-input" value={form.jamSore || ''} onChange={(e) => setForm({...form, jamSore: e.target.value})} required />
            <span style={{ color: '#fff', fontWeight: 'bold' }}>:</span>
            <input type="number" className="form-input" value={form.menitSore || ''} onChange={(e) => setForm({...form, menitSore: e.target.value})} required />
          </div>
        </div>

        {/* --- DAFTAR JADWAL TAMBAHAN (Hanya Jam & Menit + Menu Titik Tiga) --- */}
        {extraJadwal.map((item, index) => (
          <div key={item.id} style={{ position: 'relative', background: '#1e293b', padding: '10px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>JADWAL TAMBAHAN {index + 1}</label>
              
              {/* Tombol Titik Tiga Vertikal (⋮) */}
              <div style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  onClick={() => setMenuId(menuId === item.id ? null : item.id)} 
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}
                >
                  ⋮
                </button>

                {/* Menu Dropdown Edit / Hapus */}
                {menuId === item.id && (
                  <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
                    <button type="button" onClick={() => handleEditJadwal(item.id)} style={{ display: 'block', width: '100%', padding: '6px 12px', background: 'none', border: 'none', color: '#38bdf8', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem', borderBottom: '1px solid #334155' }}>Edit</button>
                    <button type="button" onClick={() => handleHapusJadwal(item.id)} style={{ display: 'block', width: '100%', padding: '6px 12px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="number" className="form-input" placeholder="Jam" value={item.jam} onChange={(e) => handleExtraChange(item.id, 'jam', e.target.value)} required />
              <span style={{ color: '#fff', fontWeight: 'bold' }}>:</span>
              <input type="number" className="form-input" placeholder="Menit" value={item.menit} onChange={(e) => handleExtraChange(item.id, 'menit', e.target.value)} required />
            </div>
          </div>
        ))}

        {/* Tombol Tambah Jadwal Pakan */}
        <button 
          type="button" 
          onClick={handleTambahKolom}
          style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', padding: '8px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', margin: '5px 0' }}
        >
          + Tambah Jadwal Pakan
        </button>

        {/* Durasi (Detik) - Cukup 1 di bawah */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>DURASI (DETIK)</label>
          <input type="number" className="form-input" value={form.durasi || ''} onChange={(e) => setForm({...form, durasi: e.target.value})} required />
        </div>

        {/* Tombol Simpan / Perbarui */}
        <button type="submit" className="btn-primary" style={{ backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', marginTop: '10px' }} disabled={loading}>
          {loading ? 'MENYIMPAN...' : 'PERBARUI DATA & AKTIFKAN'}
        </button>

      </form>
    </div>
  );
}