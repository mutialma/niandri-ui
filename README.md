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
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Entry point (login router)
│   └── globals.css         # Design tokens & global styles
│
├── lib/
│   └── auth.tsx            # Auth context, roles, RBAC
│
├── components/
│   ├── LoginPage.tsx       # Login form (tanpa pilih role — auto dari akun)
│   ├── AppShell.tsx        # Main layout router per halaman
│   ├── layout/
│   │   ├── Sidebar.tsx     # Sidebar navigasi (menu sesuai role)
│   │   └── Topbar.tsx      # Header atas
│   └── modules/
│       ├── DashboardModule.tsx    # Dashboard ringkasan
│       ├── GangguanModule.tsx     # Tiket gangguan + deteksi offline/dBm
│       ├── BillingModule.tsx      # Invoice + pilih metode bayar bebas
│       ├── PelangganModule.tsx    # Manajemen pelanggan
│       ├── PembayaranModule.tsx   # Riwayat & channel pembayaran
│       └── PlaceholderModule.tsx  # Template untuk modul lain
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
