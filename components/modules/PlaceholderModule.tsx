'use client'

interface PlaceholderModuleProps {
  title: string
  icon: string
  description: string
}

export default function PlaceholderModule({ title, icon, description }: PlaceholderModuleProps) {
  return (
    <div style={{
      padding: '2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: 'calc(100vh - 56px)',
      background: 'var(--bg)',
    }}>
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 22,
          background: 'linear-gradient(135deg, #FFEDD5, #FED7AA)',
          border: '2px solid #FED7AA',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', margin: '0 auto 1.5rem',
          boxShadow: '0 4px 16px rgba(249,115,22,.15)',
        }}>
          {icon}
        </div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text)', marginBottom: '.625rem' }}>{title}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '.85rem', lineHeight: 1.7 }}>{description}</p>
        <div style={{
          marginTop: '1.5rem',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 16px',
          background: '#fff', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '.75rem', color: 'var(--brand)',
          fontFamily: 'var(--mono)', fontWeight: 600,
          boxShadow: 'var(--shadow-sm)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', display: 'inline-block' }} />
          Modul dalam pengembangan
        </div>
      </div>
    </div>
  )
}
