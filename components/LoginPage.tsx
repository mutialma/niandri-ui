'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'

export default function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 550))
    const ok = login(username.trim(), password)
    setLoading(false)
    if (ok) onSuccess()
    else setError('Username atau password salah. Coba lagi.')
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#FFFBF7',
      display: 'flex', alignItems: 'stretch',
      fontFamily: 'var(--font)',
    }}>
      {/* ── Left panel — brand ── */}
      <div style={{
        width: 420, flexShrink: 0,
        background: 'linear-gradient(160deg, #F97316 0%, #EA580C 50%, #C2410C 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2.5rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'absolute', top: '40%', left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            width: 90, height: 90, borderRadius: 24, overflow: 'hidden',
            margin: '0 auto 1.75rem',
            background: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,.2)',
          }}>
            <img src="/logo.png" alt="Niandri" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }} />
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>
            Niandri Network<br />Solution
          </h1>
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.8)', lineHeight: 1.7, maxWidth: 280, margin: '0 auto' }}>
            Platform manajemen e-billing ISP terintegrasi untuk kebutuhan operasional jaringan Anda.
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '⚡', text: 'Monitoring real-time' },
              { icon: '💳', text: 'Multi-metode pembayaran' },
              { icon: '📊', text: 'Laporan lengkap & akurat' },
            ].map(f => (
              <div key={f.text} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(255,255,255,.12)', borderRadius: 10,
                padding: '10px 14px',
                backdropFilter: 'blur(8px)',
              }}>
                <span style={{ fontSize: '1rem' }}>{f.icon}</span>
                <span style={{ fontSize: '.8rem', color: '#fff', fontWeight: 500 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div style={{
        flex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
        background: '#FFFBF7',
      }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: '2.25rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)', marginBottom: 6 }}>
              Selamat Datang 👋
            </h2>
            <p style={{ fontSize: '.85rem', color: 'var(--muted)' }}>
              Masuk dengan akun yang telah diberikan administrator.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            {/* Username */}
            <div>
              <label style={{
                display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'var(--muted)',
                textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 7,
              }}>Username</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '.9rem', pointerEvents: 'none' }}>👤</span>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={{ paddingLeft: 36 }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{
                display: 'block', fontSize: '.72rem', fontWeight: 700, color: 'var(--muted)',
                textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 7,
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '.9rem', pointerEvents: 'none' }}>🔑</span>
                <input
                  className="form-input"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ paddingLeft: 36, paddingRight: 40 }}
                  required
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '.75rem', color: 'var(--muted)',
                }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: '#FEF2F2', border: '1.5px solid #FECACA',
                borderRadius: 9, padding: '10px 14px',
                fontSize: '.8rem', color: '#DC2626', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: 13, marginTop: 4, fontSize: '.9rem', letterSpacing: '.02em' }}
              disabled={loading}
            >
              {loading ? '⏳ Memverifikasi...' : '🔐 Masuk ke Sistem'}
            </button>
          </form>

          {/* Demo accounts */}
          <div style={{
            marginTop: '1.75rem',
            background: '#fff',
            border: '1.5px solid var(--border)',
            borderRadius: 12, padding: '1rem 1.25rem',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{ fontSize: '.72rem', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>
              Demo Akun
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
              {[
                ['superadmin', 'admin123'],
                ['admin', 'admin123'],
                ['teknisi', 'teknisi1'],
                ['agen', 'agen1234'],
                ['pelanggan', 'user1234'],
              ].map(([u, p]) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => { setUsername(u); setPassword(p) }}
                  style={{
                    textAlign: 'left', background: 'var(--surface2)',
                    border: '1px solid var(--border)', borderRadius: 7,
                    padding: '5px 8px', cursor: 'pointer',
                    fontSize: '.7rem', color: 'var(--text2)', fontFamily: 'var(--mono)',
                    transition: 'all .15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand)'; (e.currentTarget as HTMLElement).style.color = 'var(--brand-dark)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text2)' }}
                >
                  {u}
                </button>
              ))}
            </div>
            <div style={{ fontSize: '.67rem', color: 'var(--subtle)', marginTop: 8 }}>
              Klik akun untuk mengisi otomatis
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
