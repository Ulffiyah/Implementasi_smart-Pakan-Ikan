import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  signUp: vi.fn(),
  signIn: vi.fn(),
  unsubscribe: vi.fn(),
}))

vi.mock('@supabase/supabase-js', () => {
  const chain = {
    select: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null }),
  }
  return {
    createClient: () => ({
      auth: {
        signUp: mocks.signUp,
        signInWithPassword: mocks.signIn,
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: mocks.unsubscribe } } }),
      },
      from: () => chain,
    }),
  }
})

import App from './App'

const isiLogin = (email, pass) => {
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } })
  fireEvent.change(screen.getByLabelText('Kata Sandi'), { target: { value: pass } })
  fireEvent.submit(screen.getByRole('button', { name: 'Masuk' }).closest('form'))
}

describe('App - autentikasi', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
  })

  it('menampilkan layar welcome secara default', () => {
    render(<App />)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })

  it('error validasi email di layar masuk', async () => {
    localStorage.setItem('app_screen', 'masuk')
    render(<App />)
    isiLogin('salah', 'abcdefgh')
    expect(await screen.findByText(/format email tidak valid/i)).toBeInTheDocument()
  })

  it('error jika kata sandi kurang dari 8 karakter', async () => {
    localStorage.setItem('app_screen', 'masuk')
    render(<App />)
    isiLogin('a@b.com', 'abc')
    expect(await screen.findByText(/minimal 8 karakter/i)).toBeInTheDocument()
  })

  it('login gagal menampilkan pesan error', async () => {
    mocks.signIn.mockResolvedValue({ data: null, error: { message: 'invalid' } })
    localStorage.setItem('app_screen', 'masuk')
    render(<App />)
    isiLogin('a@b.com', 'abcdefgh')
    expect(await screen.findByText(/gagal masuk/i)).toBeInTheDocument()
  })

  it('login ditolak jika email belum dikonfirmasi', async () => {
    mocks.signIn.mockResolvedValue({
      data: { user: { email: 'a@b.com', email_confirmed_at: null, user_metadata: {} } },
      error: null,
    })
    localStorage.setItem('app_screen', 'masuk')
    render(<App />)
    isiLogin('a@b.com', 'abcdefgh')
    expect(await screen.findByText(/belum dikonfirmasi/i)).toBeInTheDocument()
  })

  it('login berhasil membuka menu', async () => {
    mocks.signIn.mockResolvedValue({
      data: { user: { email: 'a@b.com', email_confirmed_at: '2026-01-01', user_metadata: { full_name: 'Dewi' } } },
      error: null,
    })
    localStorage.setItem('app_screen', 'masuk')
    render(<App />)
    isiLogin('a@b.com', 'abcdefgh')
    await waitFor(() => expect(screen.getByText('Jurnal RAB Petani')).toBeInTheDocument())
  })

  it('daftar menampilkan error jika kolom kosong', async () => {
    localStorage.setItem('app_screen', 'daftar')
    render(<App />)
    fireEvent.submit(screen.getByRole('button', { name: 'Daftar Sekarang' }).closest('form'))
    expect(await screen.findByText(/semua kolom wajib diisi/i)).toBeInTheDocument()
  })

  it('daftar menolak nomor telepon tidak valid', async () => {
    localStorage.setItem('app_screen', 'daftar')
    render(<App />)
    fireEvent.change(screen.getByLabelText('Nama Lengkap'), { target: { value: 'Dewi' } })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'dewi@mail.com' } })
    fireEvent.change(screen.getByLabelText('Nomor Telepon'), { target: { value: '12345' } })
    fireEvent.change(screen.getByLabelText('Buat Kata Sandi'), { target: { value: 'abcdefgh' } })
    fireEvent.change(screen.getByLabelText('Konfirmasi Kata Sandi'), { target: { value: 'abcdefgh' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Daftar Sekarang' }).closest('form'))
    expect(await screen.findByText(/nomor telepon tidak valid/i)).toBeInTheDocument()
  })

  it('daftar berhasil pindah ke layar masuk', async () => {
    mocks.signUp.mockResolvedValue({ error: null })
    localStorage.setItem('app_screen', 'daftar')
    render(<App />)
    fireEvent.change(screen.getByLabelText('Nama Lengkap'), { target: { value: 'Dewi' } })
    fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'dewi@mail.com' } })
    fireEvent.change(screen.getByLabelText('Nomor Telepon'), { target: { value: '081234567890' } })
    fireEvent.change(screen.getByLabelText('Buat Kata Sandi'), { target: { value: 'abcdefgh' } })
    fireEvent.change(screen.getByLabelText('Konfirmasi Kata Sandi'), { target: { value: 'abcdefgh' } })
    fireEvent.submit(screen.getByRole('button', { name: 'Daftar Sekarang' }).closest('form'))
    expect(await screen.findByText('Silakan masuk ke akun Anda:')).toBeInTheDocument()
    expect(window.alert).toHaveBeenCalled()
  })
})

describe('App - menu', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    localStorage.setItem('app_screen', 'menu')
  })

  it.each([
    [/Jurnal RAB Petani/, 'Rencana Anggaran & Jurnal RAB'],
    [/Pengaturan Pakan/, 'Pengaturan Jadwal Pakan'],
    [/Jurnal Harian/, 'Jurnal Harian'],
    [/Pengaturan Wi-Fi/, 'Pengaturan Wi-Fi Alat'],
    [/Akun/, 'Menu Akun'],
  ])('membuka halaman %s lalu kembali', async (menu, judul) => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: menu }))
    expect(await screen.findByRole('heading', { name: judul })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /kembali/i }))
    expect(await screen.findByText('Jurnal RAB Petani')).toBeInTheDocument()
  })

  it('menyimpan pengaturan pakan', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Pengaturan Pakan/ }))
    fireEvent.submit((await screen.findByRole('button', { name: /perbarui data/i })).closest('form'))
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Data berhasil dikirim ke alat!'))
  })

  it('menyimpan pengaturan wifi', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Pengaturan Wi-Fi/ }))
    fireEvent.submit((await screen.findByRole('button', { name: /sinkronisasi/i })).closest('form'))
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Konfigurasi Wi-Fi berhasil dikirim ke alat!'))
  })

  it('logout dari halaman akun kembali ke welcome', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /Akun/ }))
    fireEvent.click(await screen.findByRole('button', { name: /keluar akun/i }))
    await waitFor(() => expect(localStorage.getItem('app_screen')).toBe('welcome'))
  })
})
