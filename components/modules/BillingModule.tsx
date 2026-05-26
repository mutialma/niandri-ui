'use client'
import { useState } from 'react'

// Payment options: cash agen, 2 rekening admin, 1 merchant TriPay
const PAYMENT_METHODS = [
  {
    id: 'cash_agen',
    label: 'Cash via Agen',
    icon: '💵',
    desc: 'Bayar tunai ke agen terdekat',
    color: '#22c55e',
    logo: null,
  },
  {
    id: 'bca',
    label: 'Transfer BCA',
    icon: '🏦',
    desc: 'No. Rek: 1234567890 a/n PT Niandri',
    color: '#0055a4',
    logo: 'BCA',
  },
  {
    id: 'bri',
    label: 'Transfer BRI',
    icon: '🏦',
    desc: 'No. Rek: 0987654321 a/n PT Niandri',
    color: '#003da5',
    logo: 'BRI',
  },
  {
    id: 'tripay',
    label: 'TriPay (Virtual Account / QRIS)',
    icon: '📱',
    desc: 'Bayar via Virtual Account, QRIS, atau dompet digital',
    color: '#7c3aed',
    logo: 'TP',
  },
]

interface Invoice {
  id: string
  pelanggan: string
  paket: string
  periode: string
  jumlah: number
  status: 'lunas' | 'belum' | 'jatuh_tempo'
  metode: string | null
  tglBayar: string | null
}

const INVOICES: Invoice[] = [
  { id: 'INV-2405-001', pelanggan: 'Budi Santoso',    paket: 'Home 20Mbps',  periode: 'Mei 2025', jumlah: 180000, status: 'lunas',       metode: 'Cash via Agen', tglBayar: '02 Mei 2025' },
  { id: 'INV-2405-002', pelanggan: 'Sari Dewi',       paket: 'Home 50Mbps',  periode: 'Mei 2025', jumlah: 250000, status: 'belum',       metode: null, tglBayar: null },
  { id: 'INV-2405-003', pelanggan: 'PT Maju Jaya',    paket: 'Bisnis 100M',  periode: 'Mei 2025', jumlah: 750000, status: 'jatuh_tempo', metode: null, tglBayar: null },
  { id: 'INV-2405-004', pelanggan: 'Ahmad Rizky',     paket: 'Home 10Mbps',  periode: 'Mei 2025', jumlah: 120000, status: 'lunas',       metode: 'Transfer BCA', tglBayar: '01 Mei 2025' },
  { id: 'INV-2405-005', pelanggan: 'CV Berkah',       paket: 'Bisnis 50Mbps',periode: 'Mei 2025', jumlah: 500000, status: 'belum',       metode: null, tglBayar: null },
]

function fmt(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

export default function BillingModule() {
  const [selected, setSelected] = useState<Invoice | null>(null)
  const [payMethod, setPayMethod] = useState<string>('')
  const [showPayModal, setShowPayModal] = useState(false)

  function openPay(inv: Invoice) {
    setSelected(inv)
    setPayMethod('')
    setShowPayModal(true)
  }

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Info: metode bebas tiap bulan */}
      <div style={{
        background: 'rgba(46,160,67,.08)', border: '1px solid rgba(46,160,67,.25)',
        borderRadius: 'var(--radius-lg)', padding: '1rem 1.25rem',
        display: 'flex', alignItems: 'flex-start', gap: 12
      }}>
        <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--brand)', marginBottom: 4 }}>
            Metode Pembayaran Bebas Dipilih Tiap Bulan
          </div>
          <div style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
            Setiap invoice menampilkan semua opsi pembayaran. Pelanggan bebas memilih metode berbeda tiap bulan saat akan membayar.
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 700 }}>📋 Invoice Bulan Ini</h2>
        <button className="btn-primary" style={{ fontSize: '.8rem', padding: '7px 14px' }}>
          + Generate Invoice Massal
        </button>
      </div>

      {/* Invoice table */}
      <div style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>No. Invoice</th>
              <th>Pelanggan</th>
              <th>Paket</th>
              <th>Periode</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Metode Bayar</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map(inv => (
              <tr key={inv.id}>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '.75rem', color: 'var(--muted)' }}>{inv.id}</td>
                <td style={{ fontWeight: 600 }}>{inv.pelanggan}</td>
                <td style={{ color: 'var(--muted)', fontSize: '.78rem' }}>{inv.paket}</td>
                <td style={{ color: 'var(--muted)', fontSize: '.78rem' }}>{inv.periode}</td>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, color: 'var(--text)' }}>{fmt(inv.jumlah)}</td>
                <td>
                  <span className={`badge ${
                    inv.status === 'lunas' ? 'badge-green'
                    : inv.status === 'jatuh_tempo' ? 'badge-red'
                    : 'badge-amber'
                  }`}>
                    {inv.status === 'lunas' ? '✓ Lunas' : inv.status === 'jatuh_tempo' ? '🔴 Jatuh Tempo' : 'Belum Bayar'}
                  </span>
                </td>
                <td style={{ fontSize: '.78rem', color: 'var(--muted)' }}>
                  {inv.metode ?? <span style={{ color: 'var(--subtle)' }}>—</span>}
                </td>
                <td>
                  {inv.status !== 'lunas' ? (
                    <button
                      className="btn-primary"
                      style={{ fontSize: '.72rem', padding: '4px 10px' }}
                      onClick={() => openPay(inv)}
                    >
                      Bayar
                    </button>
                  ) : (
                    <button
                      className="btn-secondary"
                      style={{ fontSize: '.72rem', padding: '4px 10px' }}
                    >
                      Cetak
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment modal */}
      {showPayModal && selected && (
        <div className="modal-overlay" onClick={() => setShowPayModal(false)}>
          <div className="modal-box" style={{ width: 520 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">💳 Pilih Metode Pembayaran</div>
                <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: 2 }}>
                  {selected.id} — {selected.pelanggan}
                </div>
              </div>
              <button onClick={() => setShowPayModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '1rem' }}>✕</button>
            </div>

            <div className="modal-body">
              {/* Invoice summary */}
              <div style={{
                background: 'var(--surface2)', borderRadius: 'var(--radius-sm)',
                padding: '1rem', marginBottom: '1.25rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>Total Tagihan</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand)', fontFamily: 'JetBrains Mono, monospace' }}>
                    {fmt(selected.jumlah)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{selected.paket}</div>
                  <div style={{ fontSize: '.78rem', color: 'var(--muted)' }}>{selected.periode}</div>
                </div>
              </div>

              {/* Payment method cards */}
              <div style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.04em' }}>
                Pilih cara bayar (bebas berubah tiap bulan):
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PAYMENT_METHODS.map(m => (
                  <div
                    key={m.id}
                    className={`pay-method-card ${payMethod === m.id ? 'selected' : ''}`}
                    onClick={() => setPayMethod(m.id)}
                  >
                    {/* Logo badge */}
                    <div style={{
                      width: 48, height: 32, borderRadius: 6,
                      background: m.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 800, fontSize: m.logo ? '.75rem' : '1.1rem',
                      flexShrink: 0
                    }}>
                      {m.logo ?? m.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '.85rem' }}>{m.label}</div>
                      <div style={{ fontSize: '.75rem', color: 'var(--muted)', marginTop: 2 }}>{m.desc}</div>
                    </div>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `2px solid ${payMethod === m.id ? 'var(--brand)' : 'var(--border2)'}`,
                      background: payMethod === m.id ? 'var(--brand)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {payMethod === m.id && <span style={{ fontSize: '.6rem', color: '#fff' }}>✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowPayModal(false)}>Batal</button>
              <button
                className="btn-primary"
                disabled={!payMethod}
                style={{ opacity: payMethod ? 1 : 0.5 }}
                onClick={() => setShowPayModal(false)}
              >
                ✅ Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
