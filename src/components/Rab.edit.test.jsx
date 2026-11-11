import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Rab from './Rab'

const item = {
  id: 1,
  tanggal: '1 Nov 2026',
  bibitQty: '10',
  bibitHarga: '10000',
  peletQty: '500',
  peletHarga: '5000',
  extraPengeluaran: [{ id: 5, nama: 'Obat', qty: '', satuan: '1 botol', harga: '2000' }],
  total: 17000,
}

const bukaEdit = () => {
  fireEvent.click(screen.getByRole('button', { name: '⋮' }))
  fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
}

describe('Rab - kartu tersimpan dan edit', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('rabListDataV2', JSON.stringify([item]))
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('menampilkan rincian jurnal tersimpan', () => {
    render(<Rab onBack={() => {}} />)
    expect(screen.getByText(/Bibit: 10 ekor/)).toBeInTheDocument()
    expect(screen.getByText(/Pelet: 500 gram/)).toBeInTheDocument()
    expect(screen.getByText(/Obat: 1 botol/)).toBeInTheDocument()
    expect(screen.getByText(/Total Pengeluaran/)).toHaveTextContent(/17\.000/)
  })

  it('mengedit harga bibit lalu menyimpan', () => {
    render(<Rab onBack={() => {}} />)
    bukaEdit()
    fireEvent.change(screen.getByDisplayValue('10000'), { target: { value: '20000' } })
    fireEvent.click(screen.getByRole('button', { name: 'Perbarui' }))
    expect(window.alert).toHaveBeenCalledWith('Jurnal RAB Berhasil Diperbarui!')
    expect(screen.getByText(/Total Pengeluaran/)).toHaveTextContent(/27\.000/)
  })

  it('mengedit pengeluaran tambahan', () => {
    render(<Rab onBack={() => {}} />)
    bukaEdit()
    fireEvent.change(screen.getByDisplayValue('Obat'), { target: { value: 'Vitamin' } })
    fireEvent.change(screen.getByDisplayValue('1 botol'), { target: { value: '2 botol' } })
    fireEvent.change(screen.getByDisplayValue('2000'), { target: { value: '3000' } })
    fireEvent.click(screen.getByRole('button', { name: 'Perbarui' }))
    expect(screen.getByText(/Vitamin: 2 botol/)).toBeInTheDocument()
    expect(screen.getByText(/Total Pengeluaran/)).toHaveTextContent(/18\.000/)
  })

  it('menghapus dan menambah baris pengeluaran saat edit', () => {
    render(<Rab onBack={() => {}} />)
    bukaEdit()
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(screen.queryByDisplayValue('Obat')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /tambah baris pengeluaran/i }))
    expect(screen.getByPlaceholderText('Nama')).toBeInTheDocument()
  })

  it('membatalkan edit', () => {
    render(<Rab onBack={() => {}} />)
    bukaEdit()
    fireEvent.click(screen.getByRole('button', { name: 'Batal' }))
    expect(screen.getByText(/Bibit: 10 ekor/)).toBeInTheDocument()
  })

  it('tidak menghapus jurnal jika konfirmasi ditolak', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<Rab onBack={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: '⋮' }))
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(screen.getByText(/Bibit: 10 ekor/)).toBeInTheDocument()
  })

  it('mengisi lalu menghapus pengeluaran tambahan di form utama', () => {
    render(<Rab onBack={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /\+ tambah pengeluaran/i }))
    fireEvent.change(screen.getByPlaceholderText('Nama Pengeluaran'), { target: { value: 'Listrik' } })
    fireEvent.change(screen.getByPlaceholderText('Jumlah & Satuan'), { target: { value: '1 bulan' } })
    const hargaInputs = screen.getAllByPlaceholderText('Harga (Rp)')
    fireEvent.change(hargaInputs[hargaInputs.length - 1], { target: { value: '7000' } })
    expect(screen.getByDisplayValue('Listrik')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(screen.queryByPlaceholderText('Nama Pengeluaran')).not.toBeInTheDocument()
  })
})
