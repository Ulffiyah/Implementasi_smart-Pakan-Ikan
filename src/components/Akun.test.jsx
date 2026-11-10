import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Akun from './Akun';

describe('Komponen Akun', () => {
  const mockAkunData = {
    nama: 'Budi',
    email: 'budi@example.com',
    telepon: '08123456789'
  };

  it('menampilkan informasi akun dengan benar', () => {
    render(<Akun data={mockAkunData} onUpdate={() => {}} onBack={() => {}} />);
    
    expect(screen.getByRole('heading', { name: /menu akun/i })).toBeInTheDocument();
  });

  it('memanggil fungsi onBack saat tombol kembali diklik', () => {
    const handleBack = vi.fn();
    render(<Akun data={mockAkunData} onUpdate={() => {}} onBack={handleBack} />);
    
    const backButton = screen.getByRole('button', { name: /kembali/i });
    fireEvent.click(backButton);
    
    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('menampilkan tombol edit data akun', () => {
    render(<Akun data={mockAkunData} onUpdate={() => {}} onBack={() => {}} />);

    const editButton = screen.getByRole('button', { name: /edit data akun/i });
    expect(editButton).toBeInTheDocument();
  });
});