# Dashboard Pidato Duo Sabah 2026

Aplikasi Next.js App Router, TypeScript, Tailwind CSS dan Supabase untuk penghantaran penyertaan, galeri video diluluskan dan semakan urus setia.

## Persediaan

1. Cipta projek Supabase dan jalankan `supabase/schema.sql` dalam SQL Editor.
2. Salin `.env.example` sebagai `.env.local` dan isi URL serta anon key projek.
3. Cipta pengguna admin dalam Supabase Authentication, kemudian berikan `app_metadata.role = admin` menggunakan arahan contoh di hujung fail SQL.
4. Jalankan `npm install`, kemudian `npm run dev`.

Dokumen peserta disimpan dalam bucket peribadi. Video berada dalam bucket awam untuk galeri; hanya rekod berstatus `Diluluskan` boleh dibaca oleh pengguna awam.

