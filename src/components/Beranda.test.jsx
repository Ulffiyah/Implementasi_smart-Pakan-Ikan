import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Beranda from './Beranda'

describe('Beranda', () => {
  it('menampilkan semua menu dan jumlah catatan', () => {
    render(<Beranda setActivePage={() => {}} catatanLength={3} />)
    expect(screen.getByText('Jurnal RAB Petani')).toBeInTheDocument()
    expect(screen.getByText('Pengaturan Pakan')).toBeInTheDocument()
    expect(screen.getByText('Pengaturan Wi-Fi')).toBeInTheDocument()
    expect(screen.getByText('3 Catatan Tersimpan')).toBeInTheDocument()
  })

  it.each([
    [/Jurnal RAB Petani/, 'rab'],
    [/Pengaturan Pakan/, 'pengaturan'],
    [/Jurnal Harian/, 'jurnal'],
    [/Pengaturan Wi-Fi/, 'wifi'],
    [/Akun/, 'akun'],
  ])('klik menu %s membuka halaman %s', (nama, halaman) => {
    const setActivePage = vi.fn()
    render(<Beranda setActivePage={setActivePage} catatanLength={0} />)
    fireEvent.click(screen.getByRole('button', { name: nama }))
    expect(setActivePage).toHaveBeenCalledWith(halaman)
  })
})