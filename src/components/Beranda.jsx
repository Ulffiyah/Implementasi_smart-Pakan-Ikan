import React from 'react';

export default function Beranda({ setActivePage, onLogout, catatanLength }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
      
      {/* Menu 1: Jurnal RAB Petani */}
      <div className="card-menu" onClick={() => setActivePage('rab')}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>📊</div>
        <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Jurnal RAB Petani</div>
        <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Rencana Anggaran Biaya & Jurnal Keuangan</small>
      </div>

      {/* Menu 2: Pengaturan Pakan */}
      <div className="card-menu" onClick={() => setActivePage('pengaturan')}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>🐟</div>
        <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Pengaturan Pakan</div>
        <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Sinkronisasi Alat Otomatis</small>
      </div>
      
      {/* Menu 3: Jurnal Harian */}
      <div className="card-menu" onClick={() => setActivePage('jurnal')}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>📝</div>
        <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Jurnal Harian</div>
        <small style={{ color: '#34d399', fontSize: '0.8rem', fontWeight: '500' }}>
          {catatanLength} Catatan Tersimpan
        </small>
      </div>

      {/* Menu 4: Pengaturan Wi-Fi */}
      <div className="card-menu" onClick={() => setActivePage('wifi')}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>📶</div>
        <div style={{ fontWeight: 'bold', color: '#38bdf8', fontSize: '0.95rem' }}>Pengaturan Wi-Fi</div>
        <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Ganti Koneksi Internet Alat</small>
      </div>

      {/* --- MENU BARU: AKUN --- */}
      <div className="card-menu" onClick={() => setActivePage('akun')}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>👤</div>
        <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Akun</div>
        <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Kelola Data Pengguna</small>
      </div>

    </div>
  );
}