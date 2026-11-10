import React, { useState, useEffect } from 'react';

export default function JurnalHarian({ onBack }) {
  // State form utama Jurnal Harian
  const [form, setForm] = useState({
    jumlahAwal: '',
    ikanMati: '',
    kondisiAir: '',
    keterangan: ''
  });

  // State daftar jurnal tersimpan (sinkron dengan localStorage)
  const [jurnalList, setJurnalList] = useState(() => {
    try {
      const saved = localStorage.getItem("jurnalDataV2");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [activeMenuId, setActiveMenuId] = useState(null);

  // State untuk edit langsung di dalam kartu
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Simpan otomatis ke localStorage setiap ada perubahan jurnalList
  useEffect(() => {
    localStorage.setItem("jurnalDataV2", JSON.stringify(jurnalList));
  }, [jurnalList]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataBaru = {
      id: Date.now(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...form
    };

    setJurnalList([dataBaru, ...jurnalList]);
    setForm({ jumlahAwal: '', ikanMati: '', kondisiAir: '', keterangan: '' });
    alert("Jurnal Harian Berhasil Disimpan!");
  };

  const handleHapusJurnal = (index) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus jurnal ini?")) {
      const list = [...jurnalList];
      list.splice(index, 1);
      setJurnalList(list);
    }
    setActiveMenuId(null);
  };

  const startEdit = (item, index) => {
    setEditingIndex(index);
    setEditForm({
      jumlahAwal: item?.jumlahAwal || '',
      ikanMati: item?.ikanMati || '',
      kondisiAir: item?.kondisiAir || '',
      keterangan: item?.keterangan || ''
    });
    setActiveMenuId(null); // Tutup menu dropdown setelah tombol edit diklik
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = (index) => {
    const updatedList = [...jurnalList];
    updatedList[index] = {
      ...updatedList[index],
      ...editForm
    };
    setJurnalList(updatedList);
    setEditingIndex(null);
    alert("Jurnal Harian Berhasil Diperbarui!");
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      {/* Tombol Kembali */}
      <button 
        type="button" 
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px', cursor: 'pointer' }} 
        onClick={onBack}
      >
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', margin: '0 0 5px 0' }}>Jurnal Harian</h3>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Catat perkembangan harian kondisi kolam dan ikan</p>
      </div>

      {/* Form Input Jurnal Harian */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
        
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>JUMLAH AWAL IKAN (EKOR)</label>
          <input type="number" className="form-input" name="jumlahAwal" placeholder="Contoh: 100" value={form.jumlahAwal} onChange={handleChange} />
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>JUMLAH IKAN MATI (EKOR)</label>
          <input type="number" className="form-input" name="ikanMati" placeholder="Contoh: 2" value={form.ikanMati} onChange={handleChange} />
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>KONDISI AIR</label>
          <input type="text" className="form-input" name="kondisiAir" placeholder="Contoh: Jernih / pH 7.2" value={form.kondisiAir} onChange={handleChange} />
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>CATATAN / KETERANGAN TAMBAHAN</label>
          <textarea 
            className="form-input" 
            name="keterangan" 
            rows="3" 
            placeholder="Tulis kegiatan atau kondisi hari ini..." 
            value={form.keterangan} 
            onChange={handleChange}
            style={{ resize: 'vertical' }}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn-primary" 
          style={{ backgroundColor: '#10b981', color: '#ffffff', fontWeight: 'bold', marginTop: '5px', cursor: 'pointer' }}
        >
          💾 Simpan Jurnal Harian
        </button>
      </form>

      {/* Daftar Jurnal Harian Tersimpan */}
      <div style={{ marginTop: '25px', borderTop: '1px solid #334155', paddingTop: '15px' }}>
        <h4 style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center' }}>Jurnal Harian Tersimpan</h4>
        
        {jurnalList.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem', border: '1px dashed #334155' }}>
            Belum ada jurnal harian tersimpan.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {jurnalList.map((item, index) => (
              <div key={item.id || index} style={{ position: 'relative', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.75rem', overflow: 'visible' }}>
                
                {/* Header Kartu */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>📅 {item.tanggal || 'Hari ini'}</div>
                  
                  {editingIndex !== index && (
                    <div style={{ position: 'relative' }}>
                      <button 
                        type="button" 
                        onClick={() => setActiveMenuId(activeMenuId === index ? null : index)} 
                        style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}
                      >
                        ⋮
                      </button>

                      {activeMenuId === index && (
                        <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 99, overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.7)', minWidth: '90px' }}>
                          <button type="button" onClick={() => startEdit(item, index)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#38bdf8', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem', borderBottom: '1px solid #334155' }}>Edit</button>
                          <button type="button" onClick={() => handleHapusJurnal(index)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Mode Edit Langsung di Kartu */}
                {editingIndex === index ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #38bdf8' }}>
                    <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.7rem' }}>Edit Jurnal Harian:</div>
                    
                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Jumlah Awal Ikan (Ekor):</span>
                      <input type="number" className="form-input" name="jumlahAwal" value={editForm.jumlahAwal || ''} onChange={handleEditChange} />
                    </div>

                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Jumlah Ikan Mati (Ekor):</span>
                      <input type="number" className="form-input" name="ikanMati" value={editForm.ikanMati || ''} onChange={handleEditChange} />
                    </div>

                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Kondisi Air:</span>
                      <input type="text" className="form-input" name="kondisiAir" value={editForm.kondisiAir || ''} onChange={handleEditChange} />
                    </div>

                    <div>
                      <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Catatan / Keterangan:</span>
                      <textarea className="form-input" name="keterangan" rows="2" value={editForm.keterangan || ''} onChange={handleEditChange}></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <button type="button" onClick={() => saveEdit(index)} style={{ flex: 1, backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', padding: '6px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.75rem' }}>
                        Perbarui
                      </button>
                      <button type="button" onClick={() => setEditingIndex(null)} style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Tampilan Normal Kartu Jurnal */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#cbd5e1' }}>
                    {item.jumlahAwal && <div>🐟 Jumlah Awal Ikan: {item.jumlahAwal} ekor</div>}
                    {item.ikanMati && <div style={{ color: '#ef4444' }}>⚠️ Ikan Mati: {item.ikanMati} ekor</div>}
                    {item.kondisiAir && <div>💧 Kondisi Air: {item.kondisiAir}</div>}
                    {item.keterangan && <div style={{ marginTop: '4px', color: '#f59e0b', fontStyle: 'italic' }}>📝 "{item.keterangan}"</div>}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}