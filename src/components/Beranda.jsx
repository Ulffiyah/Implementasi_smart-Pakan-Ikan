import React from 'react';

export default function Beranda({ setActivePage, catatanLength }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>

      {/* Menu 1: Jurnal RAB Petani */}
      <button type="button" className="card-menu" onClick={() => setActivePage('rab')}>
        <span style={{ display: 'block', fontSize: '28px', marginBottom: '4px' }}>📊</span>
        <span style={{ display: 'block', fontWeight: 'bold', fontSize: '0.95rem' }}>Jurnal RAB Petani</span>
        <small style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem' }}>Rencana Anggaran Biaya & Jurnal Keuangan</small>
      </button>

      {/* Menu 2: Pengaturan Pakan */}
      <button type="button" className="card-menu" onClick={() => setActivePage('pengaturan')}>
        <span style={{ display: 'block', fontSize: '28px', marginBottom: '4px' }}>🐟</span>
        <span style={{ display: 'block', fontWeight: 'bold', fontSize: '0.95rem' }}>Pengaturan Pakan</span>
        <small style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem' }}>Sinkronisasi Alat Otomatis</small>
      </button>

      {/* Menu 3: Jurnal Harian */}
      <button type="button" className="card-menu" onClick={() => setActivePage('jurnal')}>
        <span style={{ display: 'block', fontSize: '28px', marginBottom: '4px' }}>📝</span>
        <span style={{ display: 'block', fontWeight: 'bold', fontSize: '0.95rem' }}>Jurnal Harian</span>
        <small style={{ display: 'block', color: '#34d399', fontSize: '0.8rem', fontWeight: '500' }}>
          {catatanLength} Catatan Tersimpan
        </small>
      </button>

      {/* Menu 4: Pengaturan Wi-Fi */}
      <button type="button" className="card-menu" onClick={() => setActivePage('wifi')}>
        <span style={{ display: 'block', fontSize: '28px', marginBottom: '4px' }}>📶</span>
        <span style={{ display: 'block', fontWeight: 'bold', color: '#38bdf8', fontSize: '0.95rem' }}>Pengaturan Wi-Fi</span>
        <small style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem' }}>Ganti Koneksi Internet Alat</small>
      </button>

      {/* Menu 5: Akun */}
      <button type="button" className="card-menu" onClick={() => setActivePage('akun')}>
        <span style={{ display: 'block', fontSize: '28px', marginBottom: '4px' }}>👤</span>
        <span style={{ display: 'block', fontWeight: 'bold', fontSize: '0.95rem' }}>Akun</span>
        <small style={{ display: 'block', color: '#94a3b8', fontSize: '0.75rem' }}>Kelola Data Pengguna</small>
      </button>

    </div>
  );
}