'use client'
import { useState } from 'react'
import { useAuth, ROLE_MENUS } from '@/lib/auth'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import DashboardModule   from '@/components/modules/DashboardModule'
import PelangganModule   from '@/components/modules/PelangganModule'
import GangguanModule    from '@/components/modules/GangguanModule'
import BillingModule     from '@/components/modules/BillingModule'
import PembayaranModule  from '@/components/modules/PembayaranModule'
import TransaksiModule   from '@/components/modules/TransaksiModule'
import LaporanModule     from '@/components/modules/LaporanModule'
import VoucherModule     from '@/components/modules/VoucherModule'
import CorporateModule   from '@/components/modules/CorporateModule'
import MonitoringModule  from '@/components/modules/MonitoringModule2'
import PlaceholderModule from '@/components/modules/PlaceholderModule'

const PAGE_META: Record<string, { title: string; breadcrumb: string }> = {
  dashboard:  { title: 'Dashboard',              breadcrumb: 'Sistem Informasi e-Billing' },
  pelanggan:  { title: 'Data Pelanggan',          breadcrumb: 'Manajemen pelanggan aktif' },
  gangguan:   { title: 'Tiket Gangguan',          breadcrumb: 'Monitoring & Deteksi' },
  billing:    { title: 'Billing & Invoice',       breadcrumb: 'Tagihan bulanan pelanggan' },
  pembayaran: { title: 'Pembayaran',              breadcrumb: 'Riwayat & konfirmasi' },
  transaksi:  { title: 'Transaksi',               breadcrumb: 'Kelola semua transaksi keuangan' },
  laporan:    { title: 'Laporan',                 breadcrumb: 'Laporan keuangan & operasional' },
  voucher:    { title: 'Dashboard Voucher',       breadcrumb: 'Kelola voucher & reseller' },
  corporate:  { title: 'Kelola Data Corporate',   breadcrumb: 'HR & Manajemen Karyawan' },
  teknisi:    { title: 'Manajemen Teknisi',       breadcrumb: 'Tim lapangan' },
  inventori:  { title: 'Inventori Perangkat',     breadcrumb: 'Stok & barcode' },
  monitoring: { title: 'Monitoring & Peta Jaringan', breadcrumb: 'Data ODP, FAT, FDC, FDT, OLT dari KML' },
  wa:         { title: 'WhatsApp Gateway',        breadcrumb: 'Broadcast & CS' },
  mikrotik:   { title: 'Mikrotik Manager',        breadcrumb: 'Router & bandwidth' },
  pengaturan: { title: 'Pengaturan Sistem',       breadcrumb: 'Konfigurasi & preferensi' },
}

const PLACEHOLDERS: Record<string, { icon: string; description: string }> = {
  teknisi:    { icon: '🔧', description: 'Kelola data teknisi lapangan, penugasan tiket, dan riwayat kerja.' },
  inventori:  { icon: '📦', description: 'Stok perangkat (ONU, kabel, splitter), barcode generator, dan tracking.' },
  wa:         { icon: '💬', description: 'WhatsApp gateway untuk broadcast invoice, notifikasi gangguan, dan CS.' },
  mikrotik:   { icon: '⚙️', description: 'Manajemen router Mikrotik, bandwidth limiter, dan koneksi VPN tunnel.' },
  pengaturan: { icon: '🛠️', description: 'Konfigurasi sistem, paket harga, agen, nomor rekening, dan preferensi.' },
}

export default function AppShell() {
  const { user } = useAuth()
  const [page, setPage] = useState('dashboard')
  if (!user) return null
  const allowed = ROLE_MENUS[user.role]
  const meta = PAGE_META[page] ?? { title: page, breadcrumb: '' }

  function navigate(p: string) { if (allowed.includes(p)) setPage(p) }

  function renderPage() {
    switch (page) {
      case 'dashboard':  return <DashboardModule />
      case 'pelanggan':  return <PelangganModule />
      case 'gangguan':   return <GangguanModule />
      case 'billing':    return <BillingModule />
      case 'pembayaran': return <PembayaranModule />
      case 'transaksi':  return <TransaksiModule />
      case 'laporan':    return <LaporanModule />
      case 'voucher':    return <VoucherModule />
      case 'corporate':  return <CorporateModule />
      case 'monitoring': return <MonitoringModule />
      default: {
        const ph = PLACEHOLDERS[page]
        if (ph) return <PlaceholderModule title={meta.title} icon={ph.icon} description={ph.description} />
        return <PlaceholderModule title={meta.title} icon="🔧" description="Halaman ini belum tersedia." />
      }
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <Sidebar activePage={page} onNavigate={navigate} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar title={meta.title} breadcrumb={meta.breadcrumb} />
        <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
