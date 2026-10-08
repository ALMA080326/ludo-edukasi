SURVEY 100 — FINAL PANEL SISWA UPGRADE

Upgrade Panel Siswa:
- 5 kelompok realtime via Firebase.
- Status giliran besar: GILIRAN ANDA / MENUNGGU KELOMPOK.
- Timer sinkron dari state Guru: 15 detik untuk Pemanasan/Giliran; 45 detik untuk Double Point sesuai rentang rinci DOCX.
- Countdown visual + sound tick 5..1 + sound waktu habis untuk kelompok yang aktif; getaran HP bila didukung browser.
- Babak Rebutan menampilkan status REBUTAN dan klaim Firebase transaction.
- Skor kelompok sendiri dan posisi sementara realtime.
- Notifikasi suara: giliran, rebutan, babak, benar, salah, juara.
- Tombol SUARA ON/OFF.
- Banner Family 100 digunakan pada layar masuk Panel Siswa.

Catatan:
- firebase-config.js tetap harus menggunakan konfigurasi Firebase milik pengguna.
- Timer mengikuti state yang dikirim Panel Guru; timer tidak melakukan polling Firebase.
- Untuk Round 5 Final 100, DOCX tidak menetapkan durasi eksplisit, sehingga tidak dipaksakan countdown baru.
