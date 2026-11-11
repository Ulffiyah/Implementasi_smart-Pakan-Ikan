import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Akun from './Akun'

const data = { nama: 'Dewi', email: 'dewi@mail.com', noHp: '08123456789' }

describe('Akun - alur edit', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('mengubah data lalu menyimpan dengan sanitasi', () => {
    const onUpdateAkun = vi.fn()
    render(<Akun akunData={data} onUpdateAkun={onUpdateAkun} onBack={() => {}} onLogout={() => {}} />)

    fireEvent.click(screen.getByRole('button', { name: /edit data akun/i }))
    fireEvent.change(screen.getByLabelText('Nama Pengguna'), { target: { name: 'nama', value: '  Santika  ' } })
    fireEvent.click(screen.getByRole('button', { name: /perbarui akun/i }))

    expect(onUpdateAkun).toHaveBeenCalledWith({ nama: 'Santika', email: 'dewi@mail.com', noHp: '08123456789' })
    expect(JSON.parse(localStorage.getItem('user_akun_data')).nama).toBe('Santika')
    expect(window.alert).toHaveBeenCalled()
  })

  it('membatalkan edit', () => {
    render(<Akun akunData={data} onUpdateAkun={() => {}} onBack={() => {}} onLogout={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /edit data akun/i }))
    fireEvent.click(screen.getByRole('button', { name: /batal/i }))
    expect(screen.getByRole('button', { name: /edit data akun/i })).toBeInTheDocument()
  })

  it('memanggil onLogout', () => {
    const onLogout = vi.fn()
    render(<Akun akunData={data} onUpdateAkun={() => {}} onBack={() => {}} onLogout={onLogout} />)
    fireEvent.click(screen.getByRole('button', { name: /keluar akun/i }))
    expect(onLogout).toHaveBeenCalled()
  })
})