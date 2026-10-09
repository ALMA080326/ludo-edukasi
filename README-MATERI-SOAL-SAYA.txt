LUDO EDUKASI — FITUR MATERI & SOAL SAYA

Yang ditambahkan:
- Menu "Materi & Soal Saya" di Menu Guru.
- Form tambah soal dengan materi, judul/topik, pertanyaan, 4 pilihan, kunci jawaban, kesulitan, dan pembahasan opsional.
- Daftar soal buatan guru, edit, dan hapus.
- Validasi kolom wajib dan pencegahan duplikasi pertanyaan persis.
- Soal buatan guru langsung masuk ke kumpulan soal permainan saat disimpan/diedit/dihapus (tanpa reload).
- Bank soal bawaan tetap disimpan di bank-soal.js dan tidak ditimpa.

Cara menggunakan:
1. Ekstrak seluruh file ZIP ke satu folder.
2. Buka index.html melalui web server atau hosting seperti sebelumnya.
3. Tekan Menu > Menu Guru > Materi & Soal Saya.
4. Isi semua kolom wajib, lalu tekan Simpan Soal.
5. Soal langsung aktif di permainan, tidak perlu memuat ulang halaman.
6. Soal yang tersimpan akan muncul di daftar dan dapat diedit atau dihapus dari menu yang sama.

Penyimpanan dan batasan:
- Versi ini menyimpan soal di localStorage browser/perangkat yang sedang digunakan.
- Soal tidak otomatis tersinkron ke HP lain.
- Firebase Realtime Database belum dikonfigurasi karena proyek ini tidak menyertakan konfigurasi Firebase dan aturan aksesnya.
- Untuk sinkronisasi dua HP, perlu konfigurasi Firebase milik proyek, autentikasi guru, dan Security Rules yang aman.
- Edit/hapus soal langsung memengaruhi pemilihan soal berikutnya; soal yang sedang tampil di layar tidak berubah.

Catatan:
- File ini adalah penambahan fitur bank soal mandiri. Tidak dilakukan perubahan pada bank soal bawaan, animasi papan, sistem skor, atau logika pergerakan pion selain mengizinkan soal custom masuk ke pool saat halaman dimuat.
- Uji sintaks JavaScript dilakukan dengan node --check. Pengujian interaktif penuh di browser dan sinkronisasi Firebase belum dilakukan.

PERBAIKAN (v15):
1. Soal langsung masuk permainan tanpa reload (game tidak ter-reset).
2. Kolom Pembahasan kini tampil setelah siswa menjawab soal buatan guru.
3. Nama materi tidak peka huruf besar/kecil ("algoritma" = "Algoritma"); data lama dinormalisasi saat dimuat.
4. Pilihan jawaban kembar (A-D) ditolak saat tambah dan edit.
Pengujian: browser headless (Chromium) untuk tambah/edit/hapus, bank soal, pembahasan, dan 1 siklus penuh soal tanpa duplikat.
