# Budi Muhamad Abdurahman — Portfolio

Portofolio pribadi (statis, tanpa build step) untuk Budi Muhamad Abdurahman —
Cryptography & Public Key Infrastructure Engineer. Tersedia dalam dua bahasa
(EN | ID) dengan tombol pengalih bahasa di navbar.

## Struktur

```
Portofolio/
├── index.html          # Semua konten & struktur halaman
├── css/style.css        # Styling (tema gelap, aksen hijau/teal)
├── js/script.js         # Typewriter, scroll reveal, counter, toggle bahasa
├── assets/               # CV/PDF yang bisa diunduh dari tombol Resume
└── README.md
```

Tidak ada dependency atau proses build — murni HTML/CSS/JS sehingga bisa langsung
dibuka di browser (buka `index.html`) atau di-deploy ke GitHub Pages.

## Cara deploy ke GitHub Pages

1. Buat repository baru di GitHub, misalnya `portofolio` atau `username.github.io`.
2. Dari folder ini, jalankan:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<username>/<nama-repo>.git
   git push -u origin main
   ```

3. Di GitHub: buka **Settings → Pages**, pada bagian **Build and deployment**
   pilih **Source: Deploy from a branch**, branch **main**, folder **/(root)**,
   lalu **Save**.
4. Tunggu 1–2 menit, situs akan tersedia di:
   - `https://<username>.github.io/<nama-repo>/` (repo biasa), atau
   - `https://<username>.github.io/` (jika nama repo persis `username.github.io`).

## Mengubah konten

- Semua teks disimpan berpasangan dalam `index.html` memakai `<span class="lang-en">…</span>`
  dan `<span class="lang-id">…</span>` — edit keduanya agar tetap konsisten.
- Ganti file CV di `assets/` bila ada versi terbaru (nama file harus tetap sama,
  atau update juga path-nya di `index.html`).
- Warna aksen & tema diatur lewat CSS variables di bagian atas `css/style.css`
  (`--accent`, `--bg`, dst).
