Feature: Pengaturan Jadwal Pakan Ikan
  Sebagai pengguna, saya ingin mengatur jadwal pemberian pakan ikan
  agar ikan diberi makan secara otomatis tepat waktu.

  Scenario: Pengguna mengubah jadwal pagi
    Given Pengguna membuka halaman Pengaturan Jadwal Pakan
    When Pengguna mengatur jadwal pagi pada jam 08:00
    And Pengguna menekan tombol perbarui
    Then Sistem mengirim jadwal pagi 08:00 untuk disimpan

  Scenario: Pengguna menambah jadwal pakan tambahan
    Given Pengguna membuka halaman Pengaturan Jadwal Pakan
    When Pengguna menambah jadwal tambahan pada jam 15:30
    And Pengguna menekan tombol perbarui
    Then Sistem mengirim 1 jadwal tambahan pukul 15:30

  Scenario: Pengguna menghapus jadwal tambahan
    Given Pengguna membuka halaman Pengaturan Jadwal Pakan
    When Pengguna menambah jadwal tambahan pada jam 15:30
    And Pengguna menghapus jadwal tambahan tersebut
    Then Jadwal tambahan tidak lagi tampil