import '../support/jsdom-setup.js';
import React from 'react';
import assert from 'assert';
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PengaturanPakan from '../../src/components/PengaturanPakan.jsx';

let onUpdateCalls = [];

Before(function () {
  onUpdateCalls = [];
});

After(function () {
  cleanup();
});

const isiAngka = (input, nilai) => {
  fireEvent.change(input, { target: { value: nilai } });
};

Given('Pengguna membuka halaman Pengaturan Jadwal Pakan', function () {
  render(
    React.createElement(PengaturanPakan, {
      onUpdate: (data) => onUpdateCalls.push(data),
      onBack: () => {},
    })
  );
  assert.ok(screen.getByText('Pengaturan Jadwal Pakan'), 'Halaman pengaturan tidak tampil');
});

When(/^Pengguna mengatur jadwal pagi pada jam (\d+):(\d+)$/, function (jam, menit) {
  // Urutan input angka: tglMulai, tglSelesai, jamPagi, menitPagi, ...
  const inputs = screen.getAllByRole('spinbutton');
  isiAngka(inputs[2], jam);
  isiAngka(inputs[3], menit);
});

When(/^Pengguna menambah jadwal tambahan pada jam (\d+):(\d+)$/, function (jam, menit) {
  fireEvent.click(screen.getByText('+ Tambah Jadwal Pakan'));
  isiAngka(screen.getByPlaceholderText('Jam'), jam);
  isiAngka(screen.getByPlaceholderText('Menit'), menit);
});

When('Pengguna menekan tombol perbarui', function () {
  fireEvent.click(screen.getByText('PERBARUI DATA & AKTIFKAN'));
});

When('Pengguna menghapus jadwal tambahan tersebut', function () {
  fireEvent.click(screen.getByText('⋮'));
  fireEvent.click(screen.getByText('Hapus'));
});

Then(/^Sistem mengirim jadwal pagi (\d+):(\d+) untuk disimpan$/, function (jam, menit) {
  assert.strictEqual(onUpdateCalls.length, 1, 'onUpdate harus dipanggil satu kali');
  assert.strictEqual(Number(onUpdateCalls[0].jamPagi), Number(jam));
  assert.strictEqual(Number(onUpdateCalls[0].menitPagi), Number(menit));
});

Then(/^Sistem mengirim 1 jadwal tambahan pukul (\d+):(\d+)$/, function (jam, menit) {
  assert.strictEqual(onUpdateCalls.length, 1, 'onUpdate harus dipanggil satu kali');
  const extra = onUpdateCalls[0].extraJadwal;
  assert.strictEqual(extra.length, 1);
  assert.strictEqual(Number(extra[0].jam), Number(jam));
  assert.strictEqual(Number(extra[0].menit), Number(menit));
});

Then('Jadwal tambahan tidak lagi tampil', function () {
  assert.strictEqual(screen.queryByText('JADWAL TAMBAHAN 1'), null);
});