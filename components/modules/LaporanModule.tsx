'use client'
import { useState } from 'react'

// ─── Light Theme Tokens ─────────────────────────────────
const L = {
  bg: '#F5F7FA', surface: '#FFFFFF', surface2: '#F0F2F5',
  border: '#E2E8F0', border2: '#CBD5E1',
  brand: '#16A34A', brandDim: '#DCFCE7',
  blue: '#2563EB', blueDim: '#DBEAFE',
  amber: '#D97706', amberDim: '#FEF3C7',
  red: '#DC2626', redDim: '#FEE2E2',
  purple: '#7C3AED', purpleDim: '#EDE9FE',
  teal: '#0D9488', tealDim: '#CCFBF1',
  text: '#0F172A', muted: '#64748B', subtle: '#94A3B8',
  shadow: '0 1px 3px rgba(0,0,0,.08)', shadowMd: '0 4px 16px rgba(0,0,0,.08)',
}

const SUB_MENUS = [
  { id: 'pelanggan_baru',       icon: '👥', label: 'Laporan Pelanggan Baru',         color: L.brand,  bgColor: L.brandDim  },
  { id: 'pembayaran',           icon: '💳', label: 'Laporan Pembayaran',             color: L.brand,  bgColor: L.brandDim  },
  { id: 'ringkasan_pembayaran', icon: '📊', label: 'Laporan Ringkasan Pembayaran',   color: L.teal,   bgColor: L.tealDim   },
  { id: 'laba_rugi',            icon: '📈', label: 'Laporan Laba Rugi',              color: L.blue,   bgColor: L.blueDim   },
  { id: 'ticket',               icon: '🎫', label: 'Laporan Ticket',                 color: L.amber,  bgColor: L.amberDim  },
  { id: 'pembayaran_lokasi',    icon: '📍', label: 'Lap Pembayaran Lokasi',          color: L.blue,   bgColor: L.blueDim   },
  { id: 'pengeluaran_tahunan',  icon: '📉', label: 'Lap Pengeluaran Tahunan',        color: L.red,    bgColor: L.redDim    },
  { id: 'pengeluaran_bulanan',  icon: '📉', label: 'Lap Pengeluaran Bulanan',        color: L.amber,  bgColor: L.amberDim  },
]

// ─── Shared helpers ─────────────────────────────────────
const inputStyle: React.CSSProperties = {
  padding: '8px 12px', background: '#fff', border: `1px solid ${L.border2}`,
  borderRadius: 7, color: L.text, fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontSize: '.82rem', outline: 'none',
}

const btnPrimary: React.CSSProperties = {
  padding: '8px 16px', background: L.brand, border: 'none', borderRadius: 7,
  color: '#fff', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700,
  fontSize: '.82rem', cursor: 'pointer',
}

const btnSecondary: React.CSSProperties = {
  padding: '8px 16px', background: '#fff', border: `1px solid ${L.border2}`,
  borderRadius: 7, color: L.text, fontFamily: 'Plus Jakarta Sans, sans-serif',
  fontWeight: 600, fontSize: '.82rem', cursor: 'pointer',
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, { bg: string; text: string }> = {
    green:  { bg: '#DCFCE7', text: '#15803D' },
    red:    { bg: '#FEE2E2', text: '#DC2626' },
    amber:  { bg: '#FEF3C7', text: '#D97706' },
    blue:   { bg: '#DBEAFE', text: '#2563EB' },
    purple: { bg: '#EDE9FE', text: '#7C3AED' },
    teal:   { bg: '#CCFBF1', text: '#0D9488' },
    gray:   { bg: '#F1F5F9', text: '#64748B' },
  }
  const c = map[color] ?? map.gray
  return <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 9px', borderRadius: 100, fontSize: '.68rem', fontWeight: 700, background: c.bg, color: c.text }}>{children}</span>
}

function LightTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, overflow: 'hidden', boxShadow: L.shadow }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: L.surface2 }}>
            {headers.map(h => <th key={h} style={{ textAlign: 'left', padding: '9px 14px', fontSize: '.7rem', fontWeight: 700, color: L.muted, textTransform: 'uppercase', letterSpacing: '.05em', borderBottom: `1px solid ${L.border}` }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${L.border}` : 'none' }}>
              {row.map((cell, j) => <td key={j} style={{ padding: '10px 14px', fontSize: '.82rem', color: L.text }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Filter Bar ─────────────────────────────────────────
function FilterBar({ onExport }: { onExport?: () => void }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <select style={{ ...inputStyle }}>
        <option>Mei 2025</option><option>Apr 2025</option><option>Mar 2025</option>
      </select>
      <select style={{ ...inputStyle }}>
        <option>Semua Periode</option><option>Bulan Ini</option><option>3 Bulan</option><option>Tahun Ini</option>
      </select>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button style={btnSecondary}>🖨️ Cetak</button>
        <button style={{ ...btnPrimary, background: L.blue }}>⬇ Export Excel</button>
      </div>
    </div>
  )
}

// ─── Sub-report components ──────────────────────────────

function LapPelangganBaru() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { label: 'Pelanggan Baru', value: '12', color: L.brand },
          { label: 'Total Bulan Ini', value: '1.284', color: L.blue },
          { label: 'Pertumbuhan', value: '+0.94%', color: L.teal },
        ].map(s => (
          <div key={s.label} style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1rem', boxShadow: L.shadow }}>
            <div style={{ fontSize: '.72rem', color: L.muted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <LightTable
        headers={['No.','Nama Pelanggan','Paket','Lokasi','Tgl Registrasi','Sales']}
        rows={[
          ['1','Ahmad Fauzi',    'Home 20Mbps', 'Jl. Merdeka 5',    '01 Mei 2025','Budi S.'],
          ['2','Ibu Kartini',    'Home 10Mbps', 'Jl. Sudirman 11',  '03 Mei 2025','-'],
          ['3','CV Sumber Jaya', 'Bisnis 50Mbps','Jl. Ahmad Yani 8','05 Mei 2025','Budi S.'],
          ['4','Pak Hasan',      'Home 20Mbps', 'Jl. Diponegoro 3', '07 Mei 2025','-'],
        ]}
      />
    </div>
  )
}

function LapPembayaran() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Cash Agen', value: 'Rp 8.640.000', pct: '34%', color: L.brand },
          { label: 'Transfer BCA', value: 'Rp 7.200.000', pct: '28%', color: L.blue },
          { label: 'Transfer BRI', value: 'Rp 5.800.000', pct: '23%', color: '#1E40AF' },
          { label: 'TriPay',      value: 'Rp 3.860.000', pct: '15%', color: L.purple },
        ].map(s => (
          <div key={s.label} style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1rem', boxShadow: L.shadow }}>
            <div style={{ fontSize: '.7rem', color: L.muted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '.72rem', color: L.muted, marginTop: 4 }}>{s.pct} dari total</div>
          </div>
        ))}
      </div>
      <LightTable
        headers={['Tanggal','Pelanggan','Invoice','Metode','Jumlah']}
        rows={[
          ['03 Mei 2025','Budi Santoso','INV-2405-001','Cash Agen',   <span key="j" style={{fontFamily:'monospace',fontWeight:700,color:L.brand}}>Rp 180.000</span>],
          ['02 Mei 2025','Ahmad Rizky', 'INV-2405-004','Transfer BCA',<span key="j" style={{fontFamily:'monospace',fontWeight:700,color:L.brand}}>Rp 120.000</span>],
          ['01 Mei 2025','CV Berkah',   'INV-2405-005','TriPay VA',   <span key="j" style={{fontFamily:'monospace',fontWeight:700,color:L.brand}}>Rp 500.000</span>],
          ['30 Apr 2025','PT Maju Jaya','INV-2404-003','Transfer BRI',<span key="j" style={{fontFamily:'monospace',fontWeight:700,color:L.brand}}>Rp 750.000</span>],
        ]}
      />
    </div>
  )
}

function LapRingkasanPembayaran() {
  const months = ['Jan','Feb','Mar','Apr','Mei']
  const vals =   [38200000, 40100000, 40900000, 42500000, 25400000]
  const max = Math.max(...vals)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <div style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1.5rem', boxShadow: L.shadow }}>
        <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: '1.25rem', color: L.text }}>📊 Total Pembayaran per Bulan (2025)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 140 }}>
          {months.map((m, i) => (
            <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: '.68rem', color: L.muted, fontFamily: 'monospace' }}>
                {(vals[i]/1000000).toFixed(1)}M
              </div>
              <div style={{ width: '100%', background: i === 3 ? L.brand : (i === 4 ? '#BBF7D0' : L.teal), borderRadius: '4px 4px 0 0', height: `${(vals[i]/max)*100}%`, transition: 'height .3s' }} />
              <div style={{ fontSize: '.72rem', fontWeight: 600, color: L.muted }}>{m}</div>
            </div>
          ))}
        </div>
      </div>
      <LightTable
        headers={['Bulan','Lunas','Belum Bayar','Total Tagihan','Persentase Lunas']}
        rows={[
          ['Mei 2025 (berjalan)','Rp 25.400.000','Rp 17.100.000','Rp 42.500.000', <Badge key="p" color="amber">59.8%</Badge>],
          ['Apr 2025','Rp 42.500.000','Rp 0',        'Rp 42.500.000', <Badge key="p" color="green">100%</Badge>],
          ['Mar 2025','Rp 40.900.000','Rp 0',        'Rp 40.900.000', <Badge key="p" color="green">100%</Badge>],
        ]}
      />
    </div>
  )
}

function LapLabaRugi() {
  const pemasukan = [
    { ket: 'Pembayaran Langganan', jumlah: 42500000 },
    { ket: 'Pembayaran Umum (Pasang Baru, dll)', jumlah: 3200000 },
    { ket: 'Pemasukan Lain-lain', jumlah: 750000 },
  ]
  const pengeluaran = [
    { ket: 'Biaya Bandwidth', jumlah: 8500000 },
    { ket: 'Gaji Karyawan & Teknisi', jumlah: 7500000 },
    { ket: 'Operasional & Transportasi', jumlah: 1200000 },
    { ket: 'Inventori & Perangkat', jumlah: 2750000 },
    { ket: 'BHP USO Fee', jumlah: 744000 },
  ]
  const totalIn  = pemasukan.reduce((s, d) => s + d.jumlah, 0)
  const totalOut = pengeluaran.reduce((s, d) => s + d.jumlah, 0)
  const laba = totalIn - totalOut

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Pemasukan */}
        <div style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, overflow: 'hidden', boxShadow: L.shadow }}>
          <div style={{ background: '#F0FDF4', borderBottom: `1px solid #BBF7D0`, padding: '10px 14px', fontWeight: 700, fontSize: '.82rem', color: L.brand }}>💚 Pemasukan</div>
          {pemasukan.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', borderBottom: i < pemasukan.length - 1 ? `1px solid ${L.border}` : 'none', fontSize: '.8rem' }}>
              <span style={{ color: L.text }}>{p.ket}</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: L.brand }}>Rp {p.jumlah.toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div style={{ background: '#F0FDF4', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '.85rem', borderTop: `1px solid #BBF7D0` }}>
            <span>Total Pemasukan</span>
            <span style={{ fontFamily: 'monospace', color: L.brand }}>Rp {totalIn.toLocaleString('id-ID')}</span>
          </div>
        </div>
        {/* Pengeluaran */}
        <div style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, overflow: 'hidden', boxShadow: L.shadow }}>
          <div style={{ background: '#FEF2F2', borderBottom: `1px solid #FECACA`, padding: '10px 14px', fontWeight: 700, fontSize: '.82rem', color: L.red }}>❤️ Pengeluaran</div>
          {pengeluaran.map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', borderBottom: i < pengeluaran.length - 1 ? `1px solid ${L.border}` : 'none', fontSize: '.8rem' }}>
              <span style={{ color: L.text }}>{p.ket}</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 600, color: L.red }}>Rp {p.jumlah.toLocaleString('id-ID')}</span>
            </div>
          ))}
          <div style={{ background: '#FEF2F2', padding: '9px 14px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '.85rem', borderTop: `1px solid #FECACA` }}>
            <span>Total Pengeluaran</span>
            <span style={{ fontFamily: 'monospace', color: L.red }}>Rp {totalOut.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>
      {/* Laba bersih */}
      <div style={{ background: laba > 0 ? '#F0FDF4' : '#FEF2F2', border: `2px solid ${laba > 0 ? '#86EFAC' : '#FECACA'}`, borderRadius: 10, padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: '.95rem', color: laba > 0 ? L.brand : L.red }}>
          {laba > 0 ? '📈 Laba Bersih' : '📉 Rugi Bersih'}
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 900, color: laba > 0 ? L.brand : L.red }}>
          Rp {Math.abs(laba).toLocaleString('id-ID')}
        </div>
      </div>
    </div>
  )
}

function LapTicket() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Total Tiket', value: '47', color: L.text },
          { label: 'Selesai', value: '39', color: L.brand },
          { label: 'Proses', value: '5', color: L.amber },
          { label: 'Rata-rata Selesai', value: '4.2 jam', color: L.blue },
        ].map(s => (
          <div key={s.label} style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1rem', boxShadow: L.shadow }}>
            <div style={{ fontSize: '.7rem', color: L.muted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <LightTable
        headers={['No. Tiket','Pelanggan','Masalah','Teknisi','Dibuka','Selesai','Durasi','Status']}
        rows={[
          ['TKT-046','Hendra K.',  'Offline >5 mnt','Budi T.','09:15','13:30','4j 15m',<Badge key="s" color="amber">Proses</Badge>],
          ['TKT-045','Sari Dewi',  'dBm -28',       'Ahmad T.','08:42','11:00','2j 18m',<Badge key="s" color="green">Selesai</Badge>],
          ['TKT-044','Rina Putri', 'Ganti ONU',     'Budi T.','Kemarin','Kemarin','3j 05m',<Badge key="s" color="green">Selesai</Badge>],
        ]}
      />
    </div>
  )
}

function LapPembayaranLokasi() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <LightTable
        headers={['Lokasi / Area','Jumlah Pelanggan','Total Pembayaran','Rata-rata/Pelanggan','% dari Total']}
        rows={[
          ['Area Pusat Kota',  '342', <span key="t" style={{fontFamily:'monospace',fontWeight:700}}>Rp 14.200.000</span>, <span key="r" style={{fontFamily:'monospace'}}>Rp 41.520</span>, '33.4%'],
          ['Area Utara',       '218', <span key="t" style={{fontFamily:'monospace',fontWeight:700}}>Rp 8.900.000</span>,  <span key="r" style={{fontFamily:'monospace'}}>Rp 40.826</span>, '20.9%'],
          ['Area Selatan',     '289', <span key="t" style={{fontFamily:'monospace',fontWeight:700}}>Rp 11.200.000</span>, <span key="r" style={{fontFamily:'monospace'}}>Rp 38.754</span>, '26.4%'],
          ['Area Timur',       '193', <span key="t" style={{fontFamily:'monospace',fontWeight:700}}>Rp 7.100.000</span>,  <span key="r" style={{fontFamily:'monospace'}}>Rp 36.787</span>, '16.7%'],
          ['Area Barat',       '110', <span key="t" style={{fontFamily:'monospace',fontWeight:700}}>Rp 4.100.000</span>,  <span key="r" style={{fontFamily:'monospace'}}>Rp 37.273</span>, '9.6%'],
        ]}
      />
    </div>
  )
}

function LapPengeluaranTahunan() {
  const bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des']
  const vals =  [18200000,17500000,19100000,20694000,12450000,0,0,0,0,0,0,0]
  const max = Math.max(...vals.filter(v => v > 0))
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <div style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1.5rem', boxShadow: L.shadow }}>
        <div style={{ fontWeight: 700, fontSize: '.85rem', marginBottom: '1.25rem', color: L.text }}>📉 Pengeluaran per Bulan — 2025</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
          {bulan.map((m, i) => (
            <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              {vals[i] > 0 && <div style={{ fontSize: '.6rem', color: L.muted, fontFamily: 'monospace' }}>{(vals[i]/1000000).toFixed(1)}M</div>}
              <div style={{ width: '100%', background: vals[i] > 0 ? (i === 4 ? '#FCA5A5' : L.red) : L.border, borderRadius: '4px 4px 0 0', height: vals[i] > 0 ? `${(vals[i]/max)*100}%` : '4px' }} />
              <div style={{ fontSize: '.6rem', fontWeight: 600, color: L.muted }}>{m}</div>
            </div>
          ))}
        </div>
      </div>
      <LightTable
        headers={['Bulan','Operasional','Bandwidth','Gaji','Inventori','Total']}
        rows={[
          ['Mei 2025','Rp 200.000','Rp 850.000','Rp 7.500.000','Rp 3.900.000',<span key="t" style={{fontFamily:'monospace',fontWeight:700,color:L.red}}>Rp 12.450.000</span>],
          ['Apr 2025','Rp 450.000','Rp 850.000','Rp 7.500.000','Rp 11.894.000',<span key="t" style={{fontFamily:'monospace',fontWeight:700,color:L.red}}>Rp 20.694.000</span>],
          ['Mar 2025','Rp 380.000','Rp 850.000','Rp 7.500.000','Rp 10.370.000',<span key="t" style={{fontFamily:'monospace',fontWeight:700,color:L.red}}>Rp 19.100.000</span>],
        ]}
      />
    </div>
  )
}

function LapPengeluaranBulanan() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FilterBar />
      <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '.72rem', color: L.muted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Total Pengeluaran Mei 2025</div>
          <div style={{ fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 800, color: L.red }}>Rp 12.450.000</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '.72rem', color: L.muted }}>vs Bulan Lalu</div>
          <div style={{ fontWeight: 700, color: L.brand, fontSize: '.9rem' }}>↓ 39.8%</div>
        </div>
      </div>
      <LightTable
        headers={['Tanggal','Kategori','Keterangan','Jumlah','Metode']}
        rows={[
          ['02 Mei','Bandwidth','Biaya bandwidth bulanan',<span key="j" style={{fontFamily:'monospace',color:L.red,fontWeight:700}}>Rp 850.000</span>,'Transfer BCA'],
          ['01 Mei','Operasional','BBM teknisi',          <span key="j" style={{fontFamily:'monospace',color:L.red,fontWeight:700}}>Rp 200.000</span>,'Cash'],
          ['30 Apr','Gaji','Gaji teknisi April',          <span key="j" style={{fontFamily:'monospace',color:L.red,fontWeight:700}}>Rp 7.500.000</span>,'Transfer BRI'],
          ['28 Apr','Inventori','ONU HUAWEI 5 pcs',       <span key="j" style={{fontFamily:'monospace',color:L.red,fontWeight:700}}>Rp 3.900.000</span>,'Transfer BCA'],
        ]}
      />
    </div>
  )
}

// ─── Sub-page map ───────────────────────────────────────
const SUB_PAGES: Record<string, { component: React.FC; desc: string }> = {
  pelanggan_baru:       { component: LapPelangganBaru,         desc: 'Daftar pelanggan yang mendaftar periode ini' },
  pembayaran:           { component: LapPembayaran,            desc: 'Rincian pembayaran per metode & pelanggan' },
  ringkasan_pembayaran: { component: LapRingkasanPembayaran,   desc: 'Grafik & ringkasan pembayaran bulanan' },
  laba_rugi:            { component: LapLabaRugi,              desc: 'Pemasukan vs pengeluaran dan laba bersih' },
  ticket:               { component: LapTicket,                desc: 'Statistik & riwayat tiket gangguan' },
  pembayaran_lokasi:    { component: LapPembayaranLokasi,      desc: 'Distribusi pembayaran per area/lokasi' },
  pengeluaran_tahunan:  { component: LapPengeluaranTahunan,    desc: 'Tren pengeluaran sepanjang tahun' },
  pengeluaran_bulanan:  { component: LapPengeluaranBulanan,    desc: 'Rincian pengeluaran bulan berjalan' },
}

// ─── MAIN COMPONENT ─────────────────────────────────────
export default function LaporanModule() {
  const [active, setActive] = useState<string | null>(null)
  const activeItem = SUB_MENUS.find(m => m.id === active)
  const ActiveComponent = active ? SUB_PAGES[active]?.component : null

  return (
    <div style={{ background: L.bg, minHeight: '100%' }}>
      {!active && (
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '1rem', fontWeight: 700, color: L.text }}>📊 Menu Laporan</h1>
            <p style={{ fontSize: '.8rem', color: L.muted, marginTop: 4 }}>Pilih jenis laporan yang ingin dilihat atau diekspor</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {SUB_MENUS.map(m => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                style={{
                  background: L.surface, border: `1px solid ${L.border}`,
                  borderRadius: 10, padding: '1.1rem 1.25rem',
                  cursor: 'pointer', textAlign: 'left',
                  boxShadow: L.shadow, transition: 'all .15s',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.boxShadow = L.shadowMd }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = L.border; e.currentTarget.style.boxShadow = L.shadow }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, background: m.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: 10 }}>
                  {m.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: '.85rem', color: L.text, lineHeight: 1.3 }}>{m.label}</div>
                <div style={{ fontSize: '.72rem', color: m.color, marginTop: 4, fontWeight: 600 }}>Lihat →</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {active && ActiveComponent && (
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <button onClick={() => setActive(null)} style={{
              background: L.surface2, border: `1px solid ${L.border}`, borderRadius: 7,
              padding: '5px 12px', cursor: 'pointer', fontSize: '.78rem', color: L.muted,
              fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 5
            }}>
              ← Laporan
            </button>
            <span style={{ color: L.subtle, fontSize: '.8rem' }}>/</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '.85rem' }}>{activeItem?.icon}</span>
              <span style={{ fontWeight: 700, fontSize: '.85rem', color: L.text }}>{activeItem?.label}</span>
            </div>
          </div>
          <ActiveComponent />
        </div>
      )}
    </div>
  )
}
