'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'

// ── Shared helpers ──────────────────────────────────────────────────────────
const C = {
  orange:    '#F97316', orangeDark: '#EA580C', orangeLight: '#FFEDD5', orangeDim: '#FFF7ED',
  green:     '#16A34A', greenLight: '#DCFCE7',
  blue:      '#2563EB', blueLight:  '#DBEAFE',
  red:       '#DC2626', redLight:   '#FEE2E2',
  amber:     '#D97706', amberLight: '#FEF3C7',
  teal:      '#0D9488', tealLight:  '#CCFBF1',
  purple:    '#7C3AED', purpleLight:'#EDE9FE',
  text:      '#1C1107', muted: '#78716C', subtle: '#A8A29E',
  border:    '#EDE9E3', bg:    '#F8F7F4', surface: '#FFFFFF',
}

function fmt(n: number) { return 'Rp ' + n.toLocaleString('id-ID') }

function StatCard({ value, label, sub, icon, color, bg, onClick }: {
  value: string | number; label: string; sub?: string; icon: string;
  color: string; bg: string; onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#fff',
        border: `1.5px solid ${hov ? color : C.border}`,
        borderRadius: 14, padding: '1.125rem 1.25rem',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all .18s',
        boxShadow: hov ? `0 6px 20px ${color}25` : '0 1px 4px rgba(0,0,0,.05)',
        transform: hov ? 'translateY(-2px)' : 'none',
        display: 'flex', flexDirection: 'column', gap: 10,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background icon watermark */}
      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '3.5rem', opacity: .06, pointerEvents: 'none' }}>
        {icon}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', flexShrink: 0 }}>
          {icon}
        </div>
        {onClick && (
          <span style={{ fontSize: '.68rem', color: color, fontWeight: 700, background: bg, padding: '2px 8px', borderRadius: 100 }}>
            Selengkapnya →
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: 900, color, lineHeight: 1, fontFamily: 'var(--mono)', letterSpacing: '-.02em' }}>
          {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
        </div>
        <div style={{ fontSize: '.8rem', fontWeight: 700, color: C.text, marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: '.72rem', color: C.muted, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}

const PAYMENTS = [
  { name: 'Budi Santoso',  pkg: 'Home 20Mbps',   amount: 180000, method: 'Cash Agen',    status: 'lunas', time: '10 mnt' },
  { name: 'Sari Dewi',     pkg: 'Home 50Mbps',   amount: 250000, method: 'Transfer BCA', status: 'lunas', time: '1 jam'  },
  { name: 'CV Berkah',     pkg: 'Bisnis 100M',   amount: 750000, method: 'TriPay',        status: 'lunas', time: '2 jam'  },
  { name: 'Ahmad Rizky',   pkg: 'Home 10Mbps',   amount: 120000, method: 'Transfer BRI', status: 'lunas', time: '3 jam'  },
  { name: 'Hendra K.',     pkg: 'Home 20Mbps',   amount: 180000, method: '—',             status: 'belum', time: '—'      },
]

const TICKET_STATS = [
  { label: 'Ticket Open',             value: 0,  color: C.amber,  bg: C.amberLight,  icon: '📂' },
  { label: 'Ticket Pending',          value: 1,  color: C.red,    bg: C.redLight,    icon: '⏳' },
  { label: 'Ticket Dalam Penanganan', value: 0,  color: C.blue,   bg: C.blueLight,   icon: '🔧' },
  { label: 'Ticket Closed',           value: 61, color: C.green,  bg: C.greenLight,  icon: '✅' },
]

const CHART_DATA = [
  { bulan: 'Jan', val: 38 }, { bulan: 'Feb', val: 40 }, { bulan: 'Mar', val: 41 },
  { bulan: 'Apr', val: 43 }, { bulan: 'Mei', val: 25 },
]
const MAX_CHART = Math.max(...CHART_DATA.map(d => d.val))

export default function DashboardModule() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'pembayaran' | 'ticket'>('pembayaran')

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: C.bg }}>

      {/* ── Welcome Banner ── */}
      <div style={{
        background: 'linear-gradient(130deg, #F97316 0%, #EA580C 55%, #C2410C 100%)',
        borderRadius: 18, padding: '1.5rem 2rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 6px 28px rgba(249,115,22,.4)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,.07)' }} />
        <div style={{ position: 'absolute', right: 80, bottom: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff', marginBottom: 4 }}>
            Selamat Datang, {user?.name} 👋
          </div>
          <div style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.85)' }}>
            Sistem Informasi e-Billing PT. Niandri Network Solution
          </div>
          <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.7)', marginTop: 4 }}>
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.75)', marginBottom: 3 }}>Pemasukan Bulan Ini</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--mono)' }}>Rp 42.500.000</div>
            <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.7)', marginTop: 2 }}>↑ 6.2% dari bulan lalu</div>
          </div>
          <div style={{ width: 1, height: 50, background: 'rgba(255,255,255,.25)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.75)', marginBottom: 3 }}>Pemasukan Hari Ini</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--mono)' }}>Rp 1.300.000</div>
            <div style={{ fontSize: '.7rem', color: 'rgba(255,255,255,.7)', marginTop: 2 }}>7 transaksi</div>
          </div>
        </div>
      </div>

      {/* ── Main Stats Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        <StatCard value={395} label="Data Pelanggan"         sub="Total terdaftar"            icon="👥" color={C.green}  bg={C.greenLight}  onClick={() => {}} />
        <StatCard value="342" label="Pelanggan Sudah Lunas"  sub="Bulan ini"                  icon="💳" color={C.blue}   bg={C.blueLight}   onClick={() => {}} />
        <StatCard value={46}  label="Pelanggan Belum Lunas"  sub="Perlu tindak lanjut"        icon="⚠️" color={C.red}    bg={C.redLight}    onClick={() => {}} />
        <StatCard value={395} label="Buat Ticket Pelanggan"  sub="Klik untuk buat tiket baru" icon="🎫" color={C.orange} bg={C.orangeLight} onClick={() => {}} />
      </div>

      {/* ── Ticket Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {TICKET_STATS.map(t => (
          <StatCard key={t.label} value={t.value} label={t.label} icon={t.icon} color={t.color} bg={t.bg} onClick={() => {}} />
        ))}
      </div>

      {/* ── Status Langganan + Pemasukan mini ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        {/* Status Langganan */}
        <div style={{ background: C.blue, borderRadius: 14, padding: '1.25rem', boxShadow: `0 4px 16px ${C.blue}35` }}>
          <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.8)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Status Langganan</div>
          {[
            { label: 'Total', val: 395 },
            { label: 'Status On', val: 386 },
            { label: 'Status Off', val: 9 },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,.15)', fontSize: '.82rem', color: '#fff' }}>
              <span style={{ opacity: .85 }}>{s.label}</span>
              <span style={{ fontWeight: 800, fontFamily: 'var(--mono)' }}>{s.val}</span>
            </div>
          ))}
        </div>

        {/* Ticket Permintaan Aktivasi */}
        <div style={{ background: C.amber, borderRadius: 14, padding: '1.25rem', boxShadow: `0 4px 16px ${C.amber}35` }}>
          <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.85)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Ticket Permintaan Aktivasi</div>
          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--mono)', lineHeight: 1 }}>0</div>
          <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.85)', marginTop: 8 }}>Tidak ada permintaan aktif</div>
          <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,.2)', padding: '5px 12px', borderRadius: 100, cursor: 'pointer', fontSize: '.72rem', color: '#fff', fontWeight: 700 }}>
            Selengkapnya →
          </div>
        </div>

        {/* Dashboard Ticket General */}
        <div style={{ background: C.green, borderRadius: 14, padding: '1.25rem', boxShadow: `0 4px 16px ${C.green}35` }}>
          <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.85)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Dashboard Ticket General</div>
          {[
            { label: 'Open', val: 0, dot: C.amber },
            { label: 'Pending', val: 1, dot: C.red },
            { label: 'Proses', val: 0, dot: C.blue },
            { label: 'Closed', val: 61, dot: '#fff' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', fontSize: '.8rem', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, display: 'inline-block' }} />
                <span style={{ opacity: .9 }}>{s.label}</span>
              </div>
              <span style={{ fontWeight: 800, fontFamily: 'var(--mono)' }}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom: Chart + Table ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '1rem' }}>
        {/* Chart pendapatan */}
        <div style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 14, padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ fontWeight: 800, fontSize: '.9rem', color: C.text, marginBottom: '1.125rem' }}>📈 Grafik Pendapatan (2025)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120 }}>
            {CHART_DATA.map((d, i) => (
              <div key={d.bulan} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                <div style={{ fontSize: '.65rem', color: C.muted, fontFamily: 'var(--mono)' }}>{d.val}M</div>
                <div style={{
                  width: '100%',
                  background: i === CHART_DATA.length - 1
                    ? `linear-gradient(180deg, ${C.orange}, ${C.orangeDark})`
                    : `linear-gradient(180deg, ${C.teal}, #0F766E)`,
                  borderRadius: '5px 5px 0 0',
                  height: `${(d.val / MAX_CHART) * 100}%`,
                  transition: 'height .3s',
                }} />
                <div style={{ fontSize: '.68rem', fontWeight: 600, color: C.muted }}>{d.bulan}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '8px 12px', background: C.orangeDim, borderRadius: 8, display: 'flex', justifyContent: 'space-between', fontSize: '.75rem' }}>
            <span style={{ color: C.muted }}>Total 2025 (s/d Mei)</span>
            <span style={{ fontWeight: 800, color: C.orangeDark, fontFamily: 'var(--mono)' }}>Rp 187.100.000</span>
          </div>
        </div>

        {/* Recent transactions table */}
        <div style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
          {/* Tabs */}
          <div style={{ padding: '1rem 1.25rem', background: '#FDFAF7', borderBottom: `1.5px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['pembayaran', 'ticket'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  padding: '5px 14px',
                  background: activeTab === tab ? C.orange : 'transparent',
                  border: `1.5px solid ${activeTab === tab ? C.orange : C.border}`,
                  borderRadius: 100, cursor: 'pointer',
                  color: activeTab === tab ? '#fff' : C.muted,
                  fontSize: '.75rem', fontWeight: 700,
                  fontFamily: 'var(--font)', transition: 'all .15s',
                }}>
                  {tab === 'pembayaran' ? '💳 Pembayaran Terbaru' : '🎫 Tiket Terbaru'}
                </button>
              ))}
            </div>
            <span style={{ fontSize: '.7rem', color: C.subtle }}>Hari ini</span>
          </div>

          {activeTab === 'pembayaran' && (
            <table className="data-table">
              <thead><tr><th>Pelanggan</th><th>Paket</th><th>Jumlah</th><th>Metode</th><th>Status</th></tr></thead>
              <tbody>
                {PAYMENTS.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td style={{ color: C.muted, fontSize: '.78rem' }}>{p.pkg}</td>
                    <td><span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: C.green, fontSize: '.82rem' }}>{fmt(p.amount)}</span></td>
                    <td><span style={{ fontSize: '.72rem', background: '#DBEAFE', color: C.blue, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>{p.method}</span></td>
                    <td>
                      <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100, background: p.status === 'lunas' ? '#DCFCE7' : '#FEF3C7', color: p.status === 'lunas' ? C.green : C.amber }}>
                        {p.status === 'lunas' ? '✓ Lunas' : 'Belum'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'ticket' && (
            <table className="data-table">
              <thead><tr><th>No. Tiket</th><th>Pelanggan</th><th>Masalah</th><th>Prioritas</th><th>Status</th></tr></thead>
              <tbody>
                {[
                  { id: 'TKT-046', pel: 'Hendra K.',    masalah: 'PPPoE Offline >5 mnt', prio: 'Tinggi', status: 'Proses' },
                  { id: 'TKT-045', pel: 'Sari Dewi',    masalah: 'Signal dBm −28',       prio: 'Sedang', status: 'Proses' },
                  { id: 'TKT-044', pel: 'Rina Putri',   masalah: 'Ganti ONU',            prio: 'Rendah', status: 'Closed' },
                  { id: 'TKT-043', pel: 'PT Maju Jaya', masalah: 'Koneksi lambat',        prio: 'Sedang', status: 'Pending'},
                ].map((t, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: C.orange, fontWeight: 700 }}>{t.id}</td>
                    <td style={{ fontWeight: 600 }}>{t.pel}</td>
                    <td style={{ color: C.muted, fontSize: '.78rem' }}>{t.masalah}</td>
                    <td>
                      <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                        background: t.prio === 'Tinggi' ? '#FEE2E2' : t.prio === 'Sedang' ? '#FEF3C7' : '#F0FDF4',
                        color: t.prio === 'Tinggi' ? C.red : t.prio === 'Sedang' ? C.amber : C.green
                      }}>{t.prio}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                        background: t.status === 'Closed' ? '#DCFCE7' : t.status === 'Proses' ? '#DBEAFE' : '#FEF3C7',
                        color: t.status === 'Closed' ? C.green : t.status === 'Proses' ? C.blue : C.amber
                      }}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
