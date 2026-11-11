import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Jurnal from './Jurnal'

const item = {
  id: 1,
  tanggal: '1 Nov 2026',
  jumlahAwal: '100',
  ikanMati: '2',
  kondisiAir: 'Jernih',
  keterangan: 'Baik',
}

const bukaMenu = () => fireEvent.click(screen.getByRole('button', { name: '⋮' }))

describe('Jurnal - kartu tersimpan', () => {
  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('jurnalDataV2', JSON.stringify([item]))
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('menampilkan jurnal yang tersimpan', () => {
    render(<Jurnal onBack={() => {}} />)
    expect(screen.getByText(/Jumlah Awal Ikan: 100 ekor/)).toBeInTheDocument()
    expect(screen.getByText(/Ikan Mati: 2 ekor/)).toBeInTheDocument()
    expect(screen.getByText(/Kondisi Air: Jernih/)).toBeInTheDocument()
    expect(screen.getByText(/"Baik"/)).toBeInTheDocument()
  })

  it('mengedit jurnal lalu menyimpan perubahan', () => {
    render(<Jurnal onBack={() => {}} />)
    bukaMenu()
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))

    fireEvent.change(screen.getByDisplayValue('100'), { target: { value: '150' } })
    fireEvent.change(screen.getByDisplayValue('2'), { target: { value: '5' } })
    fireEvent.change(screen.getByDisplayValue('Jernih'), { target: { value: 'Keruh' } })
    fireEvent.change(screen.getByDisplayValue('Baik'), { target: { value: 'Perlu ganti air' } })
    fireEvent.click(screen.getByRole('button', { name: 'Perbarui' }))

    expect(window.alert).toHaveBeenCalledWith('Jurnal Harian Berhasil Diperbarui!')
    expect(screen.getByText(/Jumlah Awal Ikan: 150 ekor/)).toBeInTheDocument()
    expect(screen.getByText(/Ikan Mati: 5 ekor/)).toBeInTheDocument()
    expect(screen.getByText(/Kondisi Air: Keruh/)).toBeInTheDocument()
    expect(screen.getByText(/Perlu ganti air/)).toBeInTheDocument()
  })

  it('membatalkan edit', () => {
    render(<Jurnal onBack={() => {}} />)
    bukaMenu()
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    fireEvent.click(screen.getByRole('button', { name: 'Batal' }))
    expect(screen.getByText(/Jumlah Awal Ikan: 100 ekor/)).toBeInTheDocument()
  })

  it('menghapus jurnal setelah konfirmasi', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<Jurnal onBack={() => {}} />)
    bukaMenu()
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(screen.getByText('Belum ada jurnal harian tersimpan.')).toBeInTheDocument()
  })

  it('tidak menghapus jika konfirmasi ditolak', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)
    render(<Jurnal onBack={() => {}} />)
    bukaMenu()
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(screen.getByText(/Jumlah Awal Ikan: 100 ekor/)).toBeInTheDocument()
  })

  it('mengabaikan data localStorage yang rusak atau bukan array', () => {
    localStorage.setItem('jurnalDataV2', '{bukan json')
    const { unmount } = render(<Jurnal onBack={() => {}} />)
    expect(screen.getByText('Belum ada jurnal harian tersimpan.')).toBeInTheDocument()
    unmount()

    localStorage.setItem('jurnalDataV2', '{"a":1}')
    render(<Jurnal onBack={() => {}} />)
    expect(screen.getByText('Belum ada jurnal harian tersimpan.')).toBeInTheDocument()
  })
})
