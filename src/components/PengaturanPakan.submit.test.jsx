import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import PengaturanPakan from './PengaturanPakan'

describe('PengaturanPakan - submit dan jadwal tambahan', () => {
  it('mengirim data saat form disimpan', () => {
    const onUpdate = vi.fn()
    render(<PengaturanPakan onUpdate={onUpdate} onBack={() => {}} />)
    fireEvent.change(screen.getByLabelText('DURASI (DETIK)'), { target: { value: '15' } })
    fireEvent.click(screen.getByRole('button', { name: /perbarui data/i }))
    expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({ durasi: '15', extraJadwal: [] }))
  })

  it('menambah, mengisi, dan menghapus jadwal tambahan', () => {
    render(<PengaturanPakan onUpdate={() => {}} onBack={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /tambah jadwal pakan/i }))
    expect(screen.getByText('JADWAL TAMBAHAN 1')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Jam'), { target: { value: '12' } })
    expect(screen.getByPlaceholderText('Jam')).toHaveValue(12)

    fireEvent.click(screen.getByRole('button', { name: '⋮' }))
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(screen.queryByText('JADWAL TAMBAHAN 1')).not.toBeInTheDocument()
  })
})