import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Jurnal from './Jurnal';

describe('Komponen Jurnal', () => {
  it('menampilkan judul dan tombol kembali dengan benar', () => {
    render(<Jurnal onBack={() => {}} />);
    
    expect(screen.getByRole('heading', { name: 'Jurnal Harian', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /kembali/i })).toBeInTheDocument();
  });

  it('memanggil fungsi onBack saat tombol kembali diklik', () => {
    const handleBack = vi.fn();
    render(<Jurnal onBack={handleBack} />);
    
    const backButton = screen.getByRole('button', { name: /kembali/i });
    fireEvent.click(backButton);
    
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('mengisi form dan menyimpan jurnal harian', () => {
    // Mock localStorage
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    
    render(<Jurnal onBack={() => {}} />);

    // Simulasi pengisian input form
    const jumlahAwalInput = screen.getByPlaceholderText(/Contoh: 100/i);
    const ikanMatiInput = screen.getByPlaceholderText(/Contoh: 2/i);
    const kondisiAirInput = screen.getByPlaceholderText(/Contoh: Jernih/i);
    const keteranganInput = screen.getByPlaceholderText(/Tulis kegiatan/i);

    fireEvent.change(jumlahAwalInput, { target: { value: '150' } });
    fireEvent.change(ikanMatiInput, { target: { value: '1' } });
    fireEvent.change(kondisiAirInput, { target: { value: 'pH 7.5 Jernih' } });
    fireEvent.change(keteranganInput, { target: { value: 'Ikan aktif dan makan lahap' } });

    expect(jumlahAwalInput.value).toBe('150');
    expect(ikanMatiInput.value).toBe('1');

    // Simulasi klik tombol simpan
    const submitButton = screen.getByRole('button', { name: /simpan jurnal harian/i });
    fireEvent.click(submitButton);

    // Memastikan data disimpan ke localStorage
    expect(setItemSpy).toHaveBeenCalled();
    setItemSpy.mockRestore();
  });
});