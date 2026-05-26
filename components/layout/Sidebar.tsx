'use client'
import { useState } from 'react'
import { useAuth, ROLE_LABELS, ROLE_MENUS } from '@/lib/auth'

interface SidebarProps { activePage: string; onNavigate: (page: string) => void }

const ALL_MENUS = [
  { category: 'Utama', items: [
    { id: 'dashboard',  label: 'Dashboard',          icon: '🏠' },
  ]},
  { category: 'Pelanggan & Jaringan', items: [
    { id: 'pelanggan',  label: 'Data Pelanggan',      icon: '👥' },
    { id: 'gangguan',   label: 'Ticket Gangguan',     icon: '🎫', badge: '2', badgeRed: true },
    { id: 'monitoring', label: 'Monitoring',          icon: '📡' },
    { id: 'teknisi',    label: 'Teknisi',             icon: '🔧' },
  ]},
  { category: 'Keuangan', items: [
    { id: 'billing',    label: 'Billing & Invoice',   icon: '🧾' },
    { id: 'pembayaran', label: 'Pembayaran',          icon: '💳' },
    { id: 'transaksi',  label: 'Transaksi',           icon: '💱' },
    { id: 'laporan',    label: 'Laporan',             icon: '📊' },
  ]},
  { category: 'Layanan', items: [
    { id: 'voucher',    label: 'Dashboard Voucher',   icon: '🎫' },
    { id: 'corporate',  label: 'Data Corporate',      icon: '🏢' },
    { id: 'wa',         label: 'WhatsApp',            icon: '💬' },
  ]},
  { category: 'Operasional', items: [
    { id: 'inventori',  label: 'Inventori',           icon: '📦' },
    { id: 'mikrotik',   label: 'Mikrotik',            icon: '⚙️' },
    { id: 'pengaturan', label: 'Pengaturan',          icon: '🛠️' },
  ]},
]

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const { user, logout } = useAuth()
  const [hovered, setHovered] = useState<string | null>(null)
  if (!user) return null
  const allowed = ROLE_MENUS[user.role]

  return (
    <aside style={{
      width: 'var(--sidebar)', background: '#fff',
      borderRight: '1.5px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, overflowY: 'auto', height: '100%',
      boxShadow: '2px 0 16px rgba(249,115,22,.05)',
    }}>
      {/* Logo */}
      <div style={{ padding: '1.25rem', borderBottom: '1.5px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: 11, overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 10px rgba(249,115,22,.25)' }}>
            <img src="/logo.png" alt="Niandri" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </div>
          <div>
            <div style={{ fontSize: '.88rem', fontWeight: 900, color: 'var(--text)', lineHeight: 1.2 }}>Niandri</div>
            <div style={{ fontSize: '.63rem', color: 'var(--muted)', fontWeight: 500 }}>Network Solution</div>
          </div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', border: '1.5px solid #FED7AA', borderRadius: 10, padding: '9px 11px', display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: 'linear-gradient(135deg,#F97316,#EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.65rem', fontWeight: 900, color: '#fff', boxShadow: '0 2px 6px rgba(249,115,22,.45)' }}>
            {user.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize: '.62rem', color: '#C2410C', fontWeight: 600 }}>{ROLE_LABELS[user.role]}</div>
          </div>
          <button onClick={logout} title="Keluar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C2410C', fontSize: '.8rem', padding: '2px', borderRadius: 5, opacity: .7 }}
            onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '1' }}
            onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '.7' }}>↩</button>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, paddingBottom: '1rem', overflowY: 'auto' }}>
        {ALL_MENUS.map(section => {
          const visible = section.items.filter(i => allowed.includes(i.id))
          if (!visible.length) return null
          return (
            <div key={section.category} style={{ paddingTop: '.75rem' }}>
              <div style={{ padding: '0 1.25rem 5px', fontSize: '.6rem', fontWeight: 800, color: 'var(--subtle)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                {section.category}
              </div>
              {visible.map(item => {
                const active = activePage === item.id
                const isHov  = hovered === item.id
                return (
                  <button key={item.id} onClick={() => onNavigate(item.id)}
                    onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 9,
                      padding: '7px 1.25rem', width: '100%',
                      background: active ? 'linear-gradient(90deg,#FFEDD5 0%,#FFF7ED 100%)' : (isHov ? '#FFF7ED' : 'transparent'),
                      border: 'none', borderLeft: `3px solid ${active ? '#F97316' : 'transparent'}`,
                      color: active ? '#C2410C' : (isHov ? 'var(--text)' : 'var(--muted)'),
                      fontSize: '.82rem', fontWeight: active ? 700 : 500,
                      cursor: 'pointer', transition: 'all .15s',
                      textAlign: 'left', fontFamily: 'var(--font)',
                    }}>
                    <span style={{ fontSize: '.88rem', width: 18, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {'badge' in item && (item as any).badge && (
                      <span style={{ background: (item as any).badgeRed ? '#DC2626' : '#F97316', color: '#fff', fontSize: '.58rem', fontWeight: 800, padding: '2px 6px', borderRadius: 100 }}>{(item as any).badge}</span>
                    )}
                  </button>
                )
              })}
            </div>
          )
        })}
      </nav>

      <div style={{ padding: '.75rem 1.25rem', borderTop: '1.5px solid var(--border)', background: 'var(--surface2)', textAlign: 'center' }}>
        <span style={{ fontSize: '.6rem', color: 'var(--subtle)', fontFamily: 'var(--mono)' }}>v2.0 · PT Niandri Network Solution</span>
      </div>
    </aside>
  )
}
