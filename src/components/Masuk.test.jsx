import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Masuk from './Masuk'

const setup = (props = {}) => {
  const defaults = {
    handleLogin: vi.fn((e) => e.preventDefault()),
    lMail: '', setLMail: vi.fn(),
    lPass: '', setLPass: vi.fn(),
    loginErr: '', onNavigate: vi.fn(),
  }
  const merged = { ...defaults, ...props }
  render(<Masuk {...merged} />)
  return merged
}

describe('Masuk', () => {
  it('menampilkan judul dan form', () => {
    setup()
    expect(screen.getByRole('heading', { name: /smart pakan ikan/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Kata Sandi')).toBeInTheDocument()
  })

  it('menampilkan pesan error login', () => {
    setup({ loginErr: 'Email salah' })
    expect(screen.getByText('Email salah')).toBeInTheDocument()
  })

  it('mengubah input email dan kata sandi', () => {
    const p = setup()
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.com' } })
    fireEvent.change(screen.getByLabelText('Kata Sandi'), { target: { value: 'rahasia123' } })
    expect(p.setLMail).toHaveBeenCalledWith('a@b.com')
    expect(p.setLPass).toHaveBeenCalledWith('rahasia123')
  })

  it('menampilkan dan menyembunyikan kata sandi', () => {
    setup()
    const input = screen.getByLabelText('Kata Sandi')
    expect(input).toHaveAttribute('type', 'password')
    fireEvent.click(screen.getByRole('button', { name: 'Tampilkan kata sandi' }))
    expect(input).toHaveAttribute('type', 'text')
    fireEvent.click(screen.getByRole('button', { name: 'Sembunyikan kata sandi' }))
    expect(input).toHaveAttribute('type', 'password')
  })

  it('memanggil handleLogin saat form dikirim', () => {
    const p = setup()
    fireEvent.submit(screen.getByRole('button', { name: 'Masuk' }).closest('form'))
    expect(p.handleLogin).toHaveBeenCalled()
  })

  it('navigasi ke beranda dan daftar', () => {
    const p = setup()
    fireEvent.click(screen.getByRole('button', { name: /kembali ke beranda/i }))
    expect(p.onNavigate).toHaveBeenCalledWith('welcome')
    fireEvent.click(screen.getByRole('button', { name: 'Daftar di sini' }))
    expect(p.onNavigate).toHaveBeenCalledWith('daftar')
  })
})