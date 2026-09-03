# Ludo Edukasi

Ludo Edukasi adalah permainan kuis kelompok bertema berpikir komputasional. Setiap kelompok melempar dadu, menjawab soal, lalu menggerakkan pion jika jawabannya benar. Jawaban benar dan salah memiliki efek suara tersendiri agar permainan terasa lebih hidup di kelas.

## Teknologi

- HTML5 untuk struktur permainan dan bank soal
- CSS3 untuk tata letak responsif, animasi, dan gaya papan permainan
- JavaScript tanpa framework untuk logika dadu, skor, timer, audio, dan pergerakan pion
- Netlify untuk hosting statis dan pengaturan cache aset audio

## Menjalankan secara lokal

Dari direktori proyek, jalankan:

```bash
netlify dev --port 8889
```

Kemudian buka `http://localhost:8889` di browser.

## Struktur utama

- `index.html` — antarmuka, bank soal, dan logika permainan
- `assets/css/game.css` — tema visual dan animasi
- `assets/audio/benar.mp3` — efek suara jawaban benar
- `assets/audio/salah.mp3` — efek suara jawaban salah
- `netlify.toml` — konfigurasi publikasi dan cache audio
