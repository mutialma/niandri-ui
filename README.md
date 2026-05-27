# FiberOS — PT Niandri Network Solution
Platform E-Billing ISP berbasis Next.js 14

## Setup

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Struktur Proyek

```
fiberos/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── lib/
│   └── auth.tsx
│
├── components/
│   ├── LoginPage.tsx
│   ├── AppShell.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   └── modules/
│       ├── DashboardModule.tsx
│       ├── GangguanModule.tsx
│       ├── BillingModule.tsx
│       ├── PelangganModule.tsx
│       ├── PembayaranModule.tsx
│       ├── TransaksiModule.tsx
│       ├── LaporanModule.tsx
│       ├── VoucherModule.tsx
│       ├── CorporateModule.tsx
│       ├── TeknisiModule.tsx       ← baru
│       └── PlaceholderModule.tsx
```

---

## Role & Akses

| Role        | Username    | Password   | Akses Menu |
|-------------|-------------|------------|------------|
| Superadmin  | superadmin  | admin123   | Semua      |
| Admin       | admin       | admin123   | Hampir semua |
| Teknisi     | teknisi     | teknisi1   | Dashboard, Gangguan, Monitoring |
| Agen        | agen        | agen1234   | Dashboard, Pelanggan, Pembayaran |
| Pelanggan   | pelanggan   | user1234   | Dashboard, Billing, Pembayaran |

---

## Perubahan dari Versi Sebelumnya

1. **Login** — Tidak ada pilih role. Akses otomatis berdasarkan level akun login.
2. **Gangguan** — Deteksi otomatis: PPPoE Offline > 5 menit **ATAU** dBm < −26 dBm.
3. **Prorate** — Dihapus. Semua pelanggan prabayar.
4. **Pembayaran** — Hanya 4 opsi: Cash Agen, Transfer BCA, Transfer BRI, TriPay.
5. **Billing** — Metode bayar bebas dipilih tiap invoice, tidak terikat satu metode.
6. **Struktur** — Dipisah per file/modul, bukan satu file HTML monolitik.
7. **Framework** — Next.js 14 (App Router) + TypeScript + Tailwind CSS.
