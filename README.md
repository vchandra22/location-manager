# Location Manager Frontend

`location-manager` adalah aplikasi frontend yang dikembangkan menggunakan React.js dengan Vite sebagai build tool. Aplikasi ini menampilkan data lokasi pada Google Maps dan memungkinkan pengguna untuk memasukkan lokasi berdasarkan koordinat (latitude dan longitude) langsung dari peta.

## Fitur
- Menampilkan data lokasi pada Google Maps.
- Input lokasi menggunakan klik pada peta.
- Menyimpan data lokasi ke backend location-manager-api.

## Prasyarat
Sebelum menjalankan aplikasi, pastikan Anda memiliki:
- **Node.js** versi terbaru (minimal v14).
- **Google Maps API Key** dengan izin Maps JavaScript API dan Geocoding API.

## Instalasi
1. Clone repository ini:
   ```bash
   git clone https://github.com/vchandra22/location-manager.git
   cd location-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Buat file `.env` pada root proyek, lalu tambahkan konfigurasi berikut:
   ```env
   VITE_MAPS_API=YOUR_GOOGLE_MAPS_API_KEY
   ```
   Ganti `YOUR_GOOGLE_MAPS_API_KEY` dengan API Key Anda.

## Menjalankan Aplikasi

### Mode Pengembangan
1. Jalankan aplikasi dengan Vite:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173` secara default.

### Mode Produksi
1. Build aplikasi:
   ```bash
   npm run build
   ```

## Komponen Utama

### Google Maps
Peta ditampilkan menggunakan komponen `GoogleMap` yang diintegrasikan dengan Google Maps JavaScript API. Lokasi ditandai menggunakan marker yang diambil dari data backend.

### Form Input Lokasi
Pengguna dapat:
- Melihat data lokasi pada Google Maps
- Update data lokasi
- Hapus data lokasi
- Klik pada peta untuk memilih koordinat.
- Memasukkan nama lokasi dan detail lain melalui form.
- Mengirim data ke backend API.

## Teknologi yang Digunakan
- **React.js** untuk frontend.
- **Vite** untuk build tool.
- **Google Maps API** untuk peta.

Terima kasih telah menggunakan `location-manager`!