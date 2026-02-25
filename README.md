# 📁 Panduan Menambahkan Gambar ke Portfolio

## Struktur Folder

```
portfolio/
├── index.html
├── assets/
│   └── images/        ← SIMPAN SEMUA GAMBAR DI SINI
│       ├── desain-1.jpg   (gambar desain Canva ke-1)
│       ├── desain-2.jpg   (gambar desain Canva ke-2)
│       ├── desain-3.jpg   (gambar desain Canva ke-3)
│       ├── desain-4.jpg   (gambar desain Canva ke-4)
│       ├── desain-5.jpg   (gambar desain Canva ke-5)
│       ├── desain-6.jpg   (gambar desain Canva ke-6)
│       ├── org-1.jpg      (foto kegiatan Radio & Digital Club)
│       ├── org-2.jpg      (foto kegiatan Radio & Digital Club)
│       ├── org-3.jpg      (foto kegiatan BEM Depkominfo)
│       ├── org-4.jpg      (foto kegiatan BEM Depkominfo)
│       ├── sertifikat-1.jpg  (foto sertifikat Dicoding ke-1)
│       └── sertifikat-2.jpg  (foto sertifikat Dicoding ke-2)
├── css/
└── js/
```

---

## ✏️ Cara Mengisi Gambar

### 1. Desain Canva
- Export desainmu dari Canva sebagai JPG atau PNG
- Simpan di folder `assets/images/`
- Nama file: `desain-1.jpg`, `desain-2.jpg`, dst.

### 2. Foto Kegiatan Organisasi
- Simpan foto di folder `assets/images/`
- Nama file: `org-1.jpg`, `org-2.jpg`, dst.

### 3. Sertifikat Dicoding
- Screenshot atau foto sertifikatmu
- Simpan di folder `assets/images/`
- Nama file: `sertifikat-1.jpg`, `sertifikat-2.jpg`
- Ganti link tombol "Lihat Sertifikat" di `index.html` dengan link sertifikat resmi Dicoding kamu

---

## ✏️ Cara Mengubah Informasi Pribadi

Buka `index.html` dan cari komentar `<!-- ✏️ -->` untuk:
- Nama kamu
- Username LinkedIn, GitHub, Instagram
- Alamat email
- Link sertifikat Dicoding

---

## 💡 Tips Format Gambar

| Bagian | Rasio ideal | Format |
|--------|-------------|--------|
| Desain Canva | 16:9 atau 4:3 | JPG/PNG |
| Foto Organisasi | Bebas | JPG |
| Sertifikat | Landscape (16:9) | JPG/PNG |

---

## 🚀 Cara Membuka Website

Cukup buka file `index.html` di browser.  
Untuk hasil terbaik, gunakan Live Server (VS Code extension).
