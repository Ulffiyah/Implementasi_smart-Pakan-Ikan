import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PengaturanPakan from './PengaturanPakan';

describe('Komponen PengaturanPakan', () => {
  const mockData = {
    tglMulai: 1,
    tglSelesai: 30,
    jamPagi: 8,
    menitPagi: 0,
    jamSore: 17,
    menitSore: 0,
    durasi: 5
  };

  it('menampilkan formulir pengaturan pakan dengan benar', () => {
    render(<PengaturanPakan data={mockData} onUpdate={() => {}} onBack={() => {}} loading={false} />);
    
    expect(screen.getByRole('heading', { name: /pengaturan jadwal pakan/i })).toBeInTheDocument();
  });

  it('menampilkan status loading saat prop loading bernilai true', () => {
    render(<PengaturanPakan data={mockData} onUpdate={() => {}} onBack={() => {}} loading={true} />);
    
    // Sesuaikan pencarian tombol dengan teks saat loading: "MENYIMPAN..."
    const submitButton = screen.getByRole('button', { name: /menyimpan/i });
    expect(submitButton).toBeDisabled();
  });

  it('memanggil fungsi onBack saat tombol kembali diklik', () => {
    const handleBack = vi.fn();
    render(<PengaturanPakan data={mockData} onUpdate={() => {}} onBack={handleBack} loading={false} />);
    
    const backButton = screen.getByRole('button', { name: /kembali/i });
    fireEvent.click(backButton);
    
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('mengubah nilai form dan memanggil onUpdate saat disimpan', () => {
    const handleUpdate = vi.fn();
    render(<PengaturanPakan data={mockData} onUpdate={handleUpdate} onBack={() => {}} loading={false} />);

    const durasiInput = screen.getByDisplayValue('5');
    fireEvent.change(durasiInput, { target: { value: '8' } });

    expect(durasiInput.value).toBe('8');

    const submitButton = screen.getByRole('button', { name: /perbarui data/i });
    const form = submitButton.closest('form');
    
    fireEvent.submit(form);

    expect(handleUpdate).toHaveBeenCalled();
  });
});