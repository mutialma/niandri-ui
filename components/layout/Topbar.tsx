'use client'

interface TopbarProps {
  title: string
  breadcrumb?: string
}

export default function Topbar({ title, breadcrumb }: TopbarProps) {
  return (
    <header style={{
      height: 56,
      background: '#FFFFFF',
      borderBottom: '1.5px solid var(--border)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 1.75rem',
      flexShrink: 0,
      boxShadow: '0 1px 8px rgba(249,115,22,.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Orange accent dot */}
        <div style={{
          width: 6, height: 24, borderRadius: 3,
          background: 'linear-gradient(180deg, #F97316, #EA580C)',
          flexShrink: 0,
        }} />
        <div>
          <div style={{ fontSize: '.95rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>{title}</div>
          {breadcrumb && (
            <div style={{ fontSize: '.7rem', color: 'var(--muted)', lineHeight: 1.2 }}>{breadcrumb}</div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--surface2)', border: '1.5px solid var(--border)',
          borderRadius: 8, padding: '6px 12px',
          fontSize: '.78rem', color: 'var(--subtle)',
        }}>
          <span>🔍</span>
          <span>Cari...</span>
        </div>

        {/* Notif bell */}
        <button style={{
          width: 36, height: 36,
          background: 'var(--surface2)', border: '1.5px solid var(--border)',
          borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--muted)', fontSize: '.9rem',
          position: 'relative', transition: 'all .15s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand)'; (e.currentTarget as HTMLElement).style.color = 'var(--brand)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--muted)' }}
        >
          🔔
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 7, height: 7, background: '#DC2626',
            borderRadius: '50%', border: '1.5px solid #fff',
          }} />
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

        {/* Date chip */}
        <div style={{
          padding: '5px 12px',
          background: 'var(--brand-dim)',
          border: '1.5px solid var(--brand-light)',
          borderRadius: 8,
          fontSize: '.72rem', fontWeight: 600, color: '#C2410C',
        }}>
          {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>
    </header>
  )
}
