import { render, screen, fireEvent } from '@testing-library/react'
import Rab from './Rab'

beforeEach(() => {
  localStorage.clear()
  vi.spyOn(window, 'alert').mockImplementation(() => {})
  vi.spyOn(window, 'confirm').mockImplementation(() => true)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Rab - tampilan awal', () => {
  it('menampilkan judul dan pesan jurnal kosong', () => {
    render(<Rab onBack={() => {}} />)
    expect(screen.getByText('Rencana Anggaran & Jurnal RAB')).toBeInTheDocument()
    expect(screen.getByText('Belum ada jurnal RAB tersimpan.')).toBeInTheDocument()
  })

  it('memanggil onBack saat tombol kembali diklik', () => {
    const onBack = vi.fn()
    render(<Rab onBack={onBack} />)
    fireEvent.click(screen.getByText(/Kembali ke Menu/))
    expect(onBack).toHaveBeenCalledTimes(1)
  })
})

describe('Rab - simpan jurnal', () => {
  it('menghitung total dari harga bibit dan pelet', () => {
    render(<Rab onBack={() => {}} />)

    const harga = screen.getAllByPlaceholderText('Harga (Rp)')
    fireEvent.change(screen.getByPlaceholderText('Jumlah (Ekor)'), { target: { value: '100' } })
    fireEvent.change(harga[0], { target: { value: '50000' } })
    fireEvent.change(screen.getByPlaceholderText('Berat (Gram)'), { target: { value: '500' } })
    fireEvent.change(harga[1], { target: { value: '25000' } })

    fireEvent.click(screen.getByText('Simpan ke Jurnal RAB'))

    expect(window.alert).toHaveBeenCalledWith('Jurnal RAB Berhasil Disimpan!')
    expect(screen.getByText(/Total Pengeluaran/)).toHaveTextContent(/Rp\s?75\.000,00/)
    expect(screen.queryByText('Belum ada jurnal RAB tersimpan.')).not.toBeInTheDocument()
  })

  it('menambahkan pengeluaran tambahan ke total', () => {
    render(<Rab onBack={() => {}} />)

    fireEvent.change(screen.getAllByPlaceholderText('Harga (Rp)')[0], { target: { value: '10000' } })
    fireEvent.click(screen.getByText('+ Tambah Pengeluaran'))

    fireEvent.change(screen.getByPlaceholderText('Nama Pengeluaran'), { target: { value: 'Obat' } })
    fireEvent.change(screen.getByPlaceholderText('Jumlah & Satuan'), { target: { value: '2 botol' } })
    fireEvent.change(screen.getAllByPlaceholderText('Harga (Rp)')[2], { target: { value: '5000' } })

    fireEvent.click(screen.getByText('Simpan ke Jurnal RAB'))

    expect(screen.getByText(/Obat/)).toBeInTheDocument()
    expect(screen.getByText(/Total Pengeluaran/)).toHaveTextContent(/Rp\s?15\.000,00/)
  })

  it('mengosongkan form setelah disimpan', () => {
    render(<Rab onBack={() => {}} />)
    const bibitHarga = screen.getAllByPlaceholderText('Harga (Rp)')[0]
    fireEvent.change(bibitHarga, { target: { value: '10000' } })
    fireEvent.click(screen.getByText('Simpan ke Jurnal RAB'))
    expect(screen.getAllByPlaceholderText('Harga (Rp)')[0]).toHaveValue(null)
  })
})

describe('Rab - localStorage', () => {
  it('memuat jurnal yang sudah tersimpan', () => {
    const data = [{ id: 1, tanggal: '1 Nov 2026', bibitQty: '10', bibitHarga: '20000', extraPengeluaran: [], total: 20000 }]
    localStorage.setItem('rabListDataV2', JSON.stringify(data))

    render(<Rab onBack={() => {}} />)

    expect(screen.getByText(/1 Nov 2026/)).toBeInTheDocument()
    expect(screen.getByText(/Total Pengeluaran/)).toHaveTextContent(/Rp\s?20\.000,00/)
  })

  it('tidak crash jika data localStorage rusak', () => {
    localStorage.setItem('rabListDataV2', '{bukan json')
    render(<Rab onBack={() => {}} />)
    expect(screen.getByText('Belum ada jurnal RAB tersimpan.')).toBeInTheDocument()
  })
})

describe('Rab - hapus jurnal', () => {
  it('menghapus jurnal lewat menu titik tiga', () => {
    const data = [{ id: 1, tanggal: '1 Nov 2026', bibitHarga: '20000', extraPengeluaran: [], total: 20000 }]
    localStorage.setItem('rabListDataV2', JSON.stringify(data))

    render(<Rab onBack={() => {}} />)

    fireEvent.click(screen.getByText('⋮'))
    fireEvent.click(screen.getByText('Hapus'))

    expect(window.confirm).toHaveBeenCalled()
    expect(screen.getByText('Belum ada jurnal RAB tersimpan.')).toBeInTheDocument()
  })
})