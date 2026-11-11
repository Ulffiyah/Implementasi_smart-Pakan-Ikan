import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PengaturanPakan from './PengaturanPakan'

describe('PengaturanPakan - semua kolom', () => {
  it('mengubah semua kolom lalu mengirim', () => {
    const onUpdate = vi.fn()
    render(<PengaturanPakan onUpdate={onUpdate} onBack={() => {}} />)
    fireEvent.change(screen.getByLabelText('RENTANG TANGGAL'), { target: { value: '2' } })
    fireEvent.change(screen.getByLabelText('Tanggal selesai'), { target: { value: '28' } })
    fireEvent.change(screen.getByLabelText('JADWAL PAGI'), { target: { value: '7' } })
    fireEvent.change(screen.getByLabelText('Menit pagi'), { target: { value: '15' } })
    fireEvent.change(screen.getByLabelText('JADWAL SORE'), { target: { value: '16' } })
    fireEvent.change(screen.getByLabelText('Menit sore'), { target: { value: '45' } })
    fireEvent.click(screen.getByRole('button', { name: /perbarui data/i }))
    expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
      tglMulai: '2', tglSelesai: '28', jamPagi: '7', menitPagi: '15', jamSore: '16', menitSore: '45',
    }))
  })

  it('mengisi menit jadwal tambahan dan menekan Edit', () => {
    render(<PengaturanPakan onUpdate={() => {}} onBack={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /tambah jadwal pakan/i }))
    fireEvent.change(screen.getByPlaceholderText('Menit'), { target: { value: '30' } })
    expect(screen.getByPlaceholderText('Menit')).toHaveValue(30)
    fireEvent.click(screen.getByRole('button', { name: '⋮' }))
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }))
    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument()
  })
})
