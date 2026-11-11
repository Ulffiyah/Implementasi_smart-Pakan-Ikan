import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Wifi from './Wifi'

describe('Wifi', () => {
  it('menampilkan data wifi dan memanggil onBack', () => {
    const onBack = vi.fn()
    render(<Wifi wifiData={{ ssid: 'Kolam', password: '12345678' }} onUpdateWifi={() => {}} onBack={onBack} />)
    expect(screen.getByLabelText(/nama wi-fi/i)).toHaveValue('Kolam')
    fireEvent.click(screen.getByRole('button', { name: /kembali/i }))
    expect(onBack).toHaveBeenCalled()
  })

  it('mengubah input dan mengirim form', () => {
    const onUpdateWifi = vi.fn()
    render(<Wifi wifiData={{ ssid: '', password: '' }} onUpdateWifi={onUpdateWifi} onBack={() => {}} />)
    fireEvent.change(screen.getByLabelText(/nama wi-fi/i), { target: { name: 'ssid', value: 'WifiBaru' } })
    fireEvent.change(screen.getByLabelText(/kata sandi/i), { target: { name: 'password', value: 'sandi123' } })
    fireEvent.click(screen.getByRole('button', { name: /sinkronisasi/i }))
    expect(onUpdateWifi).toHaveBeenCalledWith({ ssid: 'WifiBaru', password: 'sandi123' })
  })

  it('menonaktifkan tombol saat loading', () => {
    render(<Wifi wifiData={{ ssid: '', password: '' }} onUpdateWifi={() => {}} onBack={() => {}} loading />)
    expect(screen.getByRole('button', { name: /menyimpan/i })).toBeDisabled()
  })
})