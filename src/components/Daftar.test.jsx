import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Daftar from './Daftar'

const setup = (props = {}) => {
  const defaults = {
    handleRegister: vi.fn((e) => e.preventDefault()),
    rNama: '', setRNama: vi.fn(),
    rMail: '', setRMail: vi.fn(),
    rHp: '', setRHp: vi.fn(),
    rPass: '', setRPass: vi.fn(),
    rPass2: '', setRPass2: vi.fn(),
    regErr: '', onNavigate: vi.fn(),
  }
  const merged = { ...defaults, ...props }
  render(<Daftar {...merged} />)
  return merged
}

describe('Daftar', () => {
  it('menampilkan semua kolom dan pesan error', () => {
    setup({ regErr: 'Semua kolom wajib diisi!' })
    expect(screen.getByLabelText('Nama Lengkap')).toBeInTheDocument()
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument()
    expect(screen.getByLabelText('Nomor Telepon')).toBeInTheDocument()
    expect(screen.getByLabelText('Buat Kata Sandi')).toBeInTheDocument()
    expect(screen.getByLabelText('Konfirmasi Kata Sandi')).toBeInTheDocument()
    expect(screen.getByText('Semua kolom wajib diisi!')).toBeInTheDocument()
  })

  it('mengubah semua input', () => {
    const p = setup()
    fireEvent.change(screen.getByLabelText('Nama Lengkap'), { target: { value: 'Dewi' } })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'd@e.com' } })
    fireEvent.change(screen.getByLabelText('Nomor Telepon'), { target: { value: '0812345678' } })
    fireEvent.change(screen.getByLabelText('Buat Kata Sandi'), { target: { value: 'abcd1234' } })
    fireEvent.change(screen.getByLabelText('Konfirmasi Kata Sandi'), { target: { value: 'abcd1234' } })
    expect(p.setRNama).toHaveBeenCalledWith('Dewi')
    expect(p.setRMail).toHaveBeenCalledWith('d@e.com')
    expect(p.setRHp).toHaveBeenCalledWith('0812345678')
    expect(p.setRPass).toHaveBeenCalledWith('abcd1234')
    expect(p.setRPass2).toHaveBeenCalledWith('abcd1234')
  })

  it('menampilkan dan menyembunyikan kedua kata sandi', () => {
    setup()
    const pass = screen.getByLabelText('Buat Kata Sandi')
    const pass2 = screen.getByLabelText('Konfirmasi Kata Sandi')
    fireEvent.click(screen.getByRole('button', { name: 'Tampilkan kata sandi' }))
    expect(pass).toHaveAttribute('type', 'text')
    fireEvent.click(screen.getByRole('button', { name: 'Tampilkan konfirmasi kata sandi' }))
    expect(pass2).toHaveAttribute('type', 'text')
  })

  it('submit dan navigasi', () => {
    const p = setup()
    fireEvent.submit(screen.getByRole('button', { name: 'Daftar Sekarang' }).closest('form'))
    expect(p.handleRegister).toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: /kembali ke beranda/i }))
    expect(p.onNavigate).toHaveBeenCalledWith('welcome')
    fireEvent.click(screen.getByRole('button', { name: 'Masuk di sini' }))
    expect(p.onNavigate).toHaveBeenCalledWith('masuk')
  })
})