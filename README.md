# Friendzy

Friendzy adalah aplikasi sosial berbasis React Native menggunakan Expo, yang memungkinkan pengguna untuk menemukan teman baru, berbagi cerita, dan berinteraksi melalui fitur peta, postingan, dan pesan.

## Fitur Utama

- **Peta Sekitar (AroundMeMap):** Temukan pengguna lain di sekitar Anda.
- **Stories:** Bagikan cerita singkat yang menghilang setelah waktu tertentu.
- **PostCard:** Lihat dan buat postingan.
- **Interests:** Pilih dan tampilkan minat Anda.
- **Pesan & Matches:** Kirim pesan dan temukan kecocokan dengan pengguna lain.

## Struktur Proyek

```text
Friendzy/
├── app/                # Halaman utama dan navigasi
│   ├── (tabs)/         # Tab navigasi (add, discover, matches, messages)
│   └── (matches)/      # Halaman detail match
├── assets/             # Gambar dan aset statis
├── components/         # Komponen UI (AroundMeMap, Button, Stories, dsb)
├── config/             # Konfigurasi API
├── services/           # Layanan API
├── global.css          # Gaya global
├── tailwind.config.js  # Konfigurasi Tailwind CSS
├── package.json        # Dependensi dan skrip
└── README.md           # Dokumentasi proyek
```

## Instalasi

1. **Clone repository:**

    ```sh
    git clone https://github.com/Aldilaaaanr/Friendzy.git
    cd Friendzy
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Jalankan aplikasi:**

    ```sh
    npx expo start
    ```

## Teknologi yang Digunakan

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Tailwind CSS (NativeWind)](https://www.nativewind.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Konfigurasi Tambahan

- **API Endpoint:** Atur endpoint di `config/api.ts` dan `services/api.ts` sesuai kebutuhan backend Anda.
- **Assets:** Tambahkan gambar di folder `assets/images/`.

## Kontribusi

1. Fork repository ini
2. Buat branch fitur: `git checkout -b fitur-baru`
3. Commit perubahan: `git commit -m 'Tambah fitur baru'`
4. Push ke branch: `git push origin fitur-baru`
5. Buat Pull Request

## Lisensi

Proyek ini dibuat untuk tugas UTS Pemgrograman Mobile.

Aldila Nur Azizah
