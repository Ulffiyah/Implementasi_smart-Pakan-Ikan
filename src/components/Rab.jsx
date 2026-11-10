import React, { useState, useEffect } from 'react';

const formatRupiah = (angka) => {
  if (!angka || isNaN(angka)) return 'Rp 0,00';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(angka);
};

export default function Rab({ onBack }) {
  const [form, setForm] = useState({ bibitQty: '', bibitHarga: '', peletQty: '', peletHarga: '' });
  const [extraPengeluaran, setExtraPengeluaran] = useState([]);
  
  // Ambil data dari localStorage secara otomatis agar tidak hilang saat pindah menu
  const [jurnalList, setJurnalList] = useState(() => {
    try {
      const saved = localStorage.getItem("rabListDataV2");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeMenuId, setActiveMenuId] = useState(null);

  // State untuk edit langsung di kartu
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editExtra, setEditExtra] = useState([]);

  // Simpan otomatis ke localStorage setiap kali ada perubahan pada jurnalList
  useEffect(() => {
    localStorage.setItem("rabListDataV2", JSON.stringify(jurnalList));
  }, [jurnalList]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTambahPengeluaran = () => {
    setExtraPengeluaran([...extraPengeluaran, { id: Date.now(), nama: '', qty: '', satuan: '', harga: '' }]);
  };

  const handleExtraChange = (id, field, value) => {
    setExtraPengeluaran(extraPengeluaran.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleHapusExtra = (id) => {
    setExtraPengeluaran(extraPengeluaran.filter(item => item.id !== id));
    setActiveMenuId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let total = Number(form.bibitHarga || 0) + Number(form.peletHarga || 0);
    extraPengeluaran.forEach(ex => { total += Number(ex.harga || 0); });

    const dataItem = {
      id: Date.now(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...form,
      extraPengeluaran: [...extraPengeluaran],
      total
    };

    setJurnalList([dataItem, ...jurnalList]);
    setForm({ bibitQty: '', bibitHarga: '', peletQty: '', peletHarga: '' });
    setExtraPengeluaran([]);
    alert("Jurnal RAB Berhasil Disimpan!");
  };

  const handleHapusJurnal = (index) => {
    if (window.confirm("Hapus jurnal ini?")) {
      const list = [...jurnalList];
      list.splice(index, 1);
      setJurnalList(list);
    }
    setActiveMenuId(null);
  };

  // Mulai Edit (termasuk pengeluaran tambahan)
  const startEdit = (item, index) => {
    setEditingIndex(index);
    setEditForm({
      bibitQty: item.bibitQty || '',
      bibitHarga: item.bibitHarga || '',
      peletQty: item.peletQty || '',
      peletHarga: item.peletHarga || ''
    });
    setEditExtra(item.extraPengeluaran ? [...item.extraPengeluaran] : []);
    setActiveMenuId(null);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditExtraChange = (id, field, value) => {
    setEditExtra(editExtra.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAddEditExtra = () => {
    setEditExtra([...editExtra, { id: Date.now(), nama: '', qty: '', satuan: '', harga: '' }]);
  };

  const handleRemoveEditExtra = (id) => {
    setEditExtra(editExtra.filter(item => item.id !== id));
  };

  // Simpan Perubahan
  const saveEdit = (index) => {
    let total = Number(editForm.bibitHarga || 0) + Number(editForm.peletHarga || 0);
    editExtra.forEach(ex => { total += Number(ex.harga || 0); });

    const updatedList = [...jurnalList];
    updatedList[index] = {
      ...updatedList[index],
      ...editForm,
      extraPengeluaran: [...editExtra],
      total
    };

    setJurnalList(updatedList);
    setEditingIndex(null);
    alert("Jurnal RAB Berhasil Diperbarui!");
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <button type="button" className="btn-primary" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px', cursor: 'pointer' }} onClick={onBack}>
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', margin: '0 0 5px 0' }}>Rencana Anggaran & Jurnal RAB</h3>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Masukkan rincian pengeluaran (opsional)</p>
      </div>

      {/* Form Input Utama */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA BIBIT IKAN</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="bibitQty" placeholder="Jumlah (Ekor)" value={form.bibitQty} onChange={handleChange} />
            <input type="number" className="form-input" name="bibitHarga" placeholder="Harga (Rp)" value={form.bibitHarga} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA PELET</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="peletQty" placeholder="Berat (Gram)" value={form.peletQty} onChange={handleChange} />
            <input type="number" className="form-input" name="peletHarga" placeholder="Harga (Rp)" value={form.peletHarga} onChange={handleChange} />
          </div>
        </div>

        {extraPengeluaran.map((item, index) => (
          <div key={item.id} style={{ position: 'relative', background: '#1e293b', padding: '10px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>PENGELUARAN TAMBAHAN {index + 1}</label>
              <button type="button" onClick={() => handleHapusExtra(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer' }}>Hapus</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input type="text" className="form-input" placeholder="Nama Pengeluaran" value={item.nama} onChange={(e) => handleExtraChange(item.id, 'nama', e.target.value)} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" className="form-input" placeholder="Jumlah & Satuan" value={item.satuan} onChange={(e) => handleExtraChange(item.id, 'satuan', e.target.value)} />
                <input type="number" className="form-input" placeholder="Harga (Rp)" value={item.harga} onChange={(e) => handleExtraChange(item.id, 'harga', e.target.value)} />
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={handleTambahPengeluaran} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', padding: '8px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', margin: '5px 0' }}>
          + Tambah Pengeluaran
        </button>

        <button type="submit" className="btn-primary" style={{ backgroundColor: '#10b981', color: '#ffffff', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>
          Simpan ke Jurnal RAB
        </button>
      </form>

      {/* Daftar Jurnal Tersimpan */}
      <div style={{ marginTop: '25px', borderTop: '1px solid #334155', paddingTop: '15px' }}>
        <h4 style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center' }}>Jurnal RAB Tersimpan</h4>
        
        {jurnalList.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem', border: '1px dashed #334155' }}>
            Belum ada jurnal RAB tersimpan.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {jurnalList.map((item, index) => (
              <div key={item.id || index} style={{ position: 'relative', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.75rem' }}>
                
                {/* Header Kartu */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>📅 {item.tanggal || 'Hari ini'}</div>
                  
                  {editingIndex !== index && (
                    <div style={{ position: 'relative' }}>
                      <button type="button" onClick={() => setActiveMenuId(activeMenuId === index ? null : index)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}>
                        ⋮
                      </button>

                      {activeMenuId === index && (
                        <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                          <button type="button" onClick={() => startEdit(item, index)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#38bdf8', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem', borderBottom: '1px solid #334155' }}>Edit</button>
                          <button type="button" onClick={() => handleHapusJurnal(index)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mode Edit Lengkap di Dalam Kartu */}
                {editingIndex === index ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #38bdf8' }}>
                    <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.7rem' }}>Edit Semua Data RAB:</div>
                    
                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Bibit Ikan:</span>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                        <input type="number" className="form-input" name="bibitQty" value={editForm.bibitQty || ''} onChange={handleEditChange} placeholder="Ekor" />
                        <input type="number" className="form-input" name="bibitHarga" value={editForm.bibitHarga || ''} onChange={handleEditChange} placeholder="Harga Rp" />
                      </div>
                    </div>

                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Pelet:</span>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                        <input type="number" className="form-input" name="peletQty" value={editForm.peletQty || ''} onChange={handleEditChange} placeholder="Gram" />
                        <input type="number" className="form-input" name="peletHarga" value={editForm.peletHarga || ''} onChange={handleEditChange} placeholder="Harga Rp" />
                      </div>
                    </div>

                    {/* Edit Pengeluaran Tambahan */}
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ color: '#f59e0b', fontSize: '0.65rem', fontWeight: 'bold' }}>Pengeluaran Tambahan:</span>
                      {editExtra.map((ex, exIdx) => (
                        <div key={ex.id || exIdx} style={{ background: '#1e293b', padding: '6px', borderRadius: '6px', marginTop: '4px', border: '1px solid #334155' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.65rem', color: '#38bdf8' }}>Item {exIdx + 1}</span>
                            <button type="button" onClick={() => handleRemoveEditExtra(ex.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.65rem', cursor: 'pointer' }}>Hapus</button>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <input type="text" className="form-input" placeholder="Nama" value={ex.nama || ''} onChange={(e) => handleEditExtraChange(ex.id, 'nama', e.target.value)} />
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <input type="text" className="form-input" placeholder="Satuan" value={ex.satuan || ''} onChange={(e) => handleEditExtraChange(ex.id, 'satuan', e.target.value)} />
                              <input type="number" className="form-input" placeholder="Harga Rp" value={ex.harga || ''} onChange={(e) => handleEditExtraChange(ex.id, 'harga', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={handleAddEditExtra} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.7rem', cursor: 'pointer', marginTop: '4px' }}>
                        + Tambah Baris Pengeluaran
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                      <button type="button" onClick={() => saveEdit(index)} style={{ flex: 1, backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '6px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>
                        Perbarui
                      </button>
                      <button type="button" onClick={() => setEditingIndex(null)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Tampilan Normal Kartu */
                  <>
                    {item.bibitHarga && <div>🐟 Bibit: {item.bibitQty || 0} ekor ({formatRupiah(item.bibitHarga)})</div>}
                    {item.peletHarga && <div>🥣 Pelet: {item.peletQty || 0} gram ({formatRupiah(item.peletHarga)})</div>}
                    
                    {item.extraPengeluaran && item.extraPengeluaran.map((ex, idx) => (
                      ex.nama && (
                        <div key={idx} style={{ color: '#f59e0b', marginTop: '2px' }}>
                          📌 {ex.nama}: {ex.satuan} ({formatRupiah(ex.harga)})
                        </div>
                      )
                    ))}

                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed #334155', color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>
                      💰 Total Pengeluaran: {formatRupiah(item.total)}
                    </div>
                  </>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}