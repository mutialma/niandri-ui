'use client'
import { useState } from 'react'

const PAY_HISTORY = [
  { id: 'PAY-001', pelanggan: 'Budi Santoso',  invoice: 'INV-2405-001', jumlah: 180000, metode: 'Cash Agen',   waktu: '2 Mei 2025 09:14', konfirmasi: 'Admin Utama' },
  { id: 'PAY-002', pelanggan: 'Ahmad Rizky',   invoice: 'INV-2405-004', jumlah: 120000, metode: 'Transfer BCA',waktu: '1 Mei 2025 14:22', konfirmasi: 'Auto' },
  { id: 'PAY-003', pelanggan: 'CV Berkah',     invoice: 'INV-2404-005', jumlah: 500000, metode: 'TriPay VA',   waktu: '30 Apr 2025 11:05', konfirmasi: 'TriPay' },
  { id: 'PAY-004', pelanggan: 'PT Maju Jaya',  invoice: 'INV-2404-003', jumlah: 750000, metode: 'Transfer BRI',waktu: '28 Apr 2025 08:30', konfirmasi: 'Admin Utama' },
]

function fmt(n: number) { return 'Rp ' + n.toLocaleString('id-ID') }

export default function PembayaranModule() {
  const [tab, setTab] = useState<'riwayat' | 'konfirmasi'>('riwayat')

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Payment channels info */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { icon: '💵', label: 'Cash via Agen', desc: 'Terima pembayaran tunai di agen', color: '#22c55e', count: 48 },
          { icon: '🏦', label: 'Bank BCA', desc: '1234567890 a/n PT Niandri NS', color: '#0055a4', count: 31 },
          { icon: '🏦', label: 'Bank BRI', desc: '0987654321 a/n PT Niandri NS', color: '#003da5', count: 25 },
          { icon: '📱', label: 'TriPay', desc: 'VA / QRIS / Dompet Digital', color: '#7c3aed', count: 19 },
        ].map(ch => (
          <div key={ch.label} className="stat-card" style={{ borderLeft: `3px solid ${ch.color}` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem' }}>{ch.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '.85rem' }}>{ch.label}</div>
                <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: 2 }}>{ch.desc}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: '1.2rem', fontWeight: 700, color: ch.color }}>
              {ch.count} transaksi
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6 }}>
        {(['riwayat', 'konfirmasi'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '7px 16px',
            background: tab === t ? 'var(--brand-dim)' : 'var(--surface2)',
            border: `1px solid ${tab === t ? 'var(--brand)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-sm)', cursor: 'pointer',
            color: tab === t ? 'var(--brand)' : 'var(--muted)',
            fontSize: '.8rem', fontWeight: 600,
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            textTransform: 'capitalize'
          }}>
            {t === 'riwayat' ? '📜 Riwayat Pembayaran' : '⏳ Menunggu Konfirmasi'}
          </button>
        ))}
      </div>

      {tab === 'riwayat' && (
        <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pelanggan</th>
                <th>Invoice</th>
                <th>Jumlah</th>
                <th>Metode</th>
                <th>Waktu</th>
                <th>Konfirmasi</th>
              </tr>
            </thead>
            <tbody>
              {PAY_HISTORY.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.72rem', color: 'var(--muted)' }}>{p.id}</td>
                  <td style={{ fontWeight: 600 }}>{p.pelanggan}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: 'var(--blue)' }}>{p.invoice}</td>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--brand)' }}>{fmt(p.jumlah)}</td>
                  <td><span className="badge badge-blue">{p.metode}</span></td>
                  <td style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{p.waktu}</td>
                  <td style={{ fontSize: '.75rem', color: 'var(--muted)' }}>{p.konfirmasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'konfirmasi' && (
        <div style={{
          background: '#fff', border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '2rem',
          textAlign: 'center', color: 'var(--muted)', fontSize: '.85rem'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</div>
          Tidak ada pembayaran yang menunggu konfirmasi manual saat ini.
        </div>
      )}
    </div>
  )
}
