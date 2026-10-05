LUDO EDUKASI — FINAL FIX POIN

Isi:
- index.html
- style.css
- game.js
- bank-soal.js (300 soal terbaru dari soal.json)

ATURAN POIN:
- Jawaban benar: pion bergerak sesuai kecepatan jawaban.
- Setiap 1 langkah aktual: +100 poin.
- Jawaban salah: -10 poin.
- Waktu habis: -10 poin.
- Soal rebutan benar: +100 poin.
- Soal rebutan salah: -10 poin.
- Bonus finish tetap: Juara 1 +4000, Juara 2 +3000, Juara 3 +2000, Juara 4 +900.

FITUR YANG DIPERTAHANKAN:
- Dadu 3D dan animasi.
- Timer 60 detik.
- Gerak pion berdasarkan kecepatan jawaban.
- Tabarakan pion dan petak aman.
- Finish dan bonus juara.
- Soal rebutan.
- Anti-repeat global.
- Ganti soal maksimal 2 kali.
- Dashboard live.
- Rekap guru.
- Review jawaban.
- Audio dan efek visual.
- Streak dan prestasi sementara.
- Peringkat sementara berdasarkan poin.

CATATAN BANK SOAL:
soal.json tidak memiliki field materi. Karena game membutuhkan metadata materi, bank-soal.js final menambahkan materi berdasarkan klasifikasi isi soal. Soal sumber tetap 300; tidak dicampur dengan bank 1.000 lama.

CATATAN FORMAT:
Soal nomor 18 pada soal.json memiliki kerusakan format sumber (pertanyaan dan opsi C/D menyatu). Pada bank final, format nomor 18 diperbaiki menjadi soal suhu 28, 30, 32, 34 dengan pilihan 35/36/37/38, sesuai konteks dan kunci B pada sumber.
