# Survey 100 — Algoritma Edition

Versi ini disusun berdasarkan dokumen `Aturan permainan survey 100.docx` sebagai sumber utama.

Isi utama: 5 kelompok, 5 babak, 15 soal sesuai DOCX, Firebase Realtime Database, panel Guru dan panel Siswa.

File `firebase-config.js` tetap eksternal seperti pada sistem sebelumnya.

Catatan implementasi: bagian timer DOCX menyebut babak 4 30–45 detik dan juga “sekitar 1 menit”; implementasi memakai 60 detik karena catatan timer eksplisit menyebut sekitar 1 menit. Babak 5 tidak diberi durasi eksplisit di DOCX sehingga UI tidak mengubah aturan soal; guru tetap menjadi pengendali.
