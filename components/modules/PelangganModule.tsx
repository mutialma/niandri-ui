'use client'
import { useState } from 'react'

const C = {
  orange:'#F97316',orangeDark:'#EA580C',orangeLight:'#FFEDD5',orangeDim:'#FFF7ED',
  green:'#16A34A',greenLight:'#DCFCE7',blue:'#2563EB',blueLight:'#DBEAFE',
  red:'#DC2626',redLight:'#FEE2E2',amber:'#D97706',amberLight:'#FEF3C7',
  teal:'#0D9488',tealLight:'#CCFBF1',
  text:'#1C1107',muted:'#78716C',subtle:'#A8A29E',border:'#EDE9E3',bg:'#F8F7F4',
}

const PELANGGAN = [
  { id:'PLG-001',nama:'Budi Santoso',    alamat:'Jl. Merdeka 12',         tlp:'081234567890',idKtp:'3201010101800001',langganan:'Home 20Mbps',   harga:180000,kode:'BS001',status:'aktif',  area:'Pusat' },
  { id:'PLG-002',nama:'Sari Dewi',       alamat:'Jl. Sudirman 45',        tlp:'082345678901',idKtp:'3201010201850002',langganan:'Home 50Mbps',   harga:250000,kode:'SD002',status:'aktif',  area:'Utara' },
  { id:'PLG-003',nama:'PT Maju Jaya',    alamat:'Jl. Gatot Subroto 7',    tlp:'083456789012',idKtp:'3201010301900003',langganan:'Bisnis 100M',   harga:750000,kode:'MJ003',status:'aktif',  area:'Selatan' },
  { id:'PLG-004',nama:'Rina Putri',      alamat:'Jl. Imam Bonjol 8',      tlp:'084567890123',idKtp:'3201010401920004',langganan:'Home 10Mbps',   harga:120000,kode:'RP004',status:'isolir', area:'Timur' },
  { id:'PLG-005',nama:'CV Berkah',       alamat:'Jl. Ahmad Yani 3',       tlp:'085678901234',idKtp:'3201010501950005',langganan:'Bisnis 50Mbps', harga:500000,kode:'CB005',status:'aktif',  area:'Barat' },
  { id:'PLG-006',nama:'Ahmad Rizky',     alamat:'Jl. Diponegoro 22',      tlp:'086789012345',idKtp:'3201010601880006',langganan:'Home 10Mbps',   harga:120000,kode:'AR006',status:'aktif',  area:'Utara' },
  { id:'PLG-007',nama:'Hendra Kusuma',   alamat:'Jl. Hayam Wuruk 5',      tlp:'087890123456',idKtp:'3201010701820007',langganan:'Home 20Mbps',   harga:180000,kode:'HK007',status:'offline',area:'Pusat' },
  { id:'PLG-008',nama:'Dewi Rahayu',     alamat:'Jl. Cikini Raya 11',     tlp:'088901234567',idKtp:'3201010801870008',langganan:'Home 20Mbps',   harga:180000,kode:'DR008',status:'aktif',  area:'Selatan' },
  { id:'PLG-009',nama:'Pak Hasan',       alamat:'Jl. Kramat Raya 44',     tlp:'089012345678',idKtp:'3201010901910009',langganan:'Home 10Mbps',   harga:120000,kode:'PH009',status:'aktif',  area:'Timur' },
  { id:'PLG-010',nama:'Ibu Kartini',     alamat:'Jl. Wahid Hasyim 6',     tlp:'081123456789',idKtp:'3201011001930010',langganan:'Home 20Mbps',   harga:180000,kode:'IK010',status:'aktif',  area:'Barat' },
]

const ACTION_BUTTONS = [
  { label: 'Tambah Data',                        icon: '➕', color: C.blue,   bg: C.blueLight,  primary: true },
  { label: 'Data Pelanggan Tidak Aktif',         icon: '👥', color: C.amber,  bg: C.amberLight  },
  { label: 'Implementasi Sistem',                icon: '⚙️', color: C.teal,   bg: C.tealLight   },
  { label: 'Export Data ke Excel',               icon: '📊', color: C.green,  bg: C.greenLight  },
  { label: 'Migrasi Sales',                      icon: '🔄', color: C.blue,   bg: C.blueLight   },
  { label: 'Migrasi Jatuh Tempo',                icon: '📅', color: C.red,    bg: C.redLight    },
]

const FILTER_OPTIONS = ['Semua Status','Aktif','Isolir','Offline','Non Aktif','Belum Bayar','Sudah Bayar']

function TambahModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ width: 560 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">➕ Tambah Pelanggan Baru</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'ID Pelanggan', ph: 'PLG-011 (auto)', type: 'text', disabled: true },
              { label: 'Kode Unik',    ph: 'XX000 (auto)',   type: 'text', disabled: true },
              { label: 'Nama Lengkap / Perusahaan', ph: 'Ahmad Fauzi', type: 'text' },
              { label: 'No. Telepon / WA',          ph: '081234567890', type: 'tel'  },
              { label: 'No. ID Identitas (KTP)',     ph: '3201xxxxxxxx',  type: 'text' },
              { label: 'Area',                       ph: 'Pilih area', type: 'select' },
            ].map(f => (
              <div key={f.label}>
                <label className="form-label">{f.label}</label>
                {f.type === 'select'
                  ? <select className="form-input"><option>Pusat</option><option>Utara</option><option>Selatan</option><option>Timur</option><option>Barat</option></select>
                  : <input className="form-input" type={f.type} placeholder={f.ph} disabled={f.disabled} style={f.disabled ? { opacity: .6 } : {}} />
                }
              </div>
            ))}
          </div>
          <div>
            <label className="form-label">Alamat Lengkap</label>
            <textarea className="form-input" rows={2} placeholder="Jl. Nama Jalan No. RT/RW Desa/Kelurahan..." style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="form-label">Nama Langganan / Paket</label>
              <select className="form-input">
                <option>Home 10Mbps — Rp 120.000</option>
                <option>Home 20Mbps — Rp 180.000</option>
                <option>Home 50Mbps — Rp 250.000</option>
                <option>Bisnis 50Mbps — Rp 500.000</option>
                <option>Bisnis 100Mbps — Rp 750.000</option>
              </select>
            </div>
            <div>
              <label className="form-label">IP Address</label>
              <input className="form-input" placeholder="10.8.1.xx" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="form-label">Serial ONU</label>
              <input className="form-input" placeholder="HWTC..." />
            </div>
            <div>
              <label className="form-label">Model ONU</label>
              <input className="form-input" placeholder="HG8245H5" />
            </div>
          </div>
          <div>
            <label className="form-label">Keterangan</label>
            <input className="form-input" placeholder="Keterangan tambahan..." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Batal</button>
          <button className="btn-primary" onClick={onClose}>💾 Simpan Pelanggan</button>
        </div>
      </div>
    </div>
  )
}

export default function PelangganModule() {
  const [search, setSearch]       = useState('')
  const [filter, setFilter]       = useState('Semua Status')
  const [perPage, setPerPage]     = useState(10)
  const [showAdd, setShowAdd]     = useState(false)
  const [showDetail, setShowDetail] = useState<typeof PELANGGAN[0] | null>(null)

  const filtered = PELANGGAN.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.nama.toLowerCase().includes(q) || p.tlp.includes(q) || p.id.toLowerCase().includes(q) || p.kode.toLowerCase().includes(q)
    const matchFilter = filter === 'Semua Status' || p.status === filter.toLowerCase()
    return matchSearch && matchFilter
  })

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: C.bg }}>
      {/* ── Header Card ── */}
      <div style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
        <div style={{ background: 'linear-gradient(90deg, #0D9488, #0F766E)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.1rem' }}>▦</span>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Data Seluruh Pelanggan</span>
          <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: '.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
            {filtered.length} pelanggan
          </span>
        </div>

        {/* Action buttons */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: `1.5px solid ${C.border}`, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ACTION_BUTTONS.map(btn => (
            <button
              key={btn.label}
              onClick={btn.label === 'Tambah Data' ? () => setShowAdd(true) : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px',
                background: btn.primary ? btn.color : btn.bg,
                border: `1.5px solid ${btn.color}44`,
                borderRadius: 8, cursor: 'pointer',
                color: btn.primary ? '#fff' : btn.color,
                fontSize: '.78rem', fontWeight: 700,
                fontFamily: 'var(--font)',
                transition: 'all .15s',
                boxShadow: btn.primary ? `0 2px 8px ${btn.color}40` : 'none',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}
            >
              <span>{btn.icon}</span> {btn.label}
            </button>
          ))}
        </div>

        {/* Filter row */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FILTER_OPTIONS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '5px 12px',
                background: filter === f ? C.orange : '#fff',
                border: `1.5px solid ${filter === f ? C.orange : C.border}`,
                borderRadius: 100, cursor: 'pointer',
                color: filter === f ? '#fff' : C.muted,
                fontSize: '.75rem', fontWeight: 600,
                fontFamily: 'var(--font)', transition: 'all .15s',
              }}>{f}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '.78rem', color: C.muted }}>Tampilkan</span>
            <select value={perPage} onChange={e => setPerPage(Number(e.target.value))} className="form-input" style={{ width: 70, padding: '5px 8px' }}>
              {[10,25,50,100].map(n => <option key={n}>{n}</option>)}
            </select>
            <span style={{ fontSize: '.78rem', color: C.muted }}>data</span>
            <input
              className="form-input"
              style={{ width: 240 }}
              placeholder="🔍 Cari nama, ID, telepon..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Aksi</th>
                <th>ID Pelanggan ↕</th>
                <th>Nama Pelanggan ↕</th>
                <th>Alamat ↕</th>
                <th>Tlp ↕</th>
                <th>No ID Identitas ↕</th>
                <th>Nama Langganan ↕</th>
                <th>Harga ↕</th>
                <th>Kode Unik ↕</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, perPage).map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: C.subtle, fontFamily: 'var(--mono)', fontSize: '.75rem' }}>{i + 1}</td>
                  <td>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                      {[
                        { icon: '✏️', bg: '#16A34A', title: 'Edit Data' },
                        { icon: '⏻',  bg: '#DC2626', title: 'Nonaktifkan', svg: true },
                        { icon: '↺',  bg: '#0D9488', title: 'Histori Pembayaran', svg: true },
                        { icon: '💵', bg: '#16A34A', title: 'Input Bayar' },
                      ].map(a => (
                        <button
                          key={a.title}
                          title={a.title}
                          onClick={a.title === 'Edit Data' ? () => setShowDetail(p) : undefined}
                          style={{
                            width: 28, height: 28, borderRadius: 7,
                            background: a.bg,
                            border: 'none',
                            cursor: 'pointer', fontSize: a.svg ? '1rem' : '.8rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#fff', fontWeight: 700,
                            transition: 'all .15s',
                            boxShadow: `0 2px 6px ${a.bg}55`,
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.filter = '' }}
                        >
                          {a.title === 'Nonaktifkan' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                              <line x1="12" y1="2" x2="12" y2="12"/>
                            </svg>
                          ) : a.title === 'Histori Pembayaran' ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="1 4 1 10 7 10"/>
                              <path d="M3.51 15a9 9 0 1 0 .49-3.45"/>
                            </svg>
                          ) : a.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td><span style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: C.orange, fontWeight: 700 }}>{p.id}</span></td>
                  <td style={{ fontWeight: 700 }}>{p.nama}</td>
                  <td style={{ color: C.muted, fontSize: '.78rem', maxWidth: 180 }}>{p.alamat}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: '.78rem' }}>{p.tlp}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: C.subtle }}>{p.idKtp}</td>
                  <td>
                    <span style={{ fontSize: '.75rem', background: C.blueLight, color: C.blue, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>
                      {p.langganan}
                    </span>
                  </td>
                  <td><span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: C.green, fontSize: '.8rem' }}>Rp {p.harga.toLocaleString('id-ID')}</span></td>
                  <td><span style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', fontWeight: 700, color: '#7C3AED' }}>{p.kode}</span></td>
                  <td>
                    <span style={{
                      fontSize: '.7rem', fontWeight: 700, padding: '3px 9px', borderRadius: 100,
                      background: p.status === 'aktif' ? C.greenLight : p.status === 'isolir' ? C.amberLight : C.redLight,
                      color:      p.status === 'aktif' ? C.green       : p.status === 'isolir' ? C.amber       : C.red,
                    }}>
                      {p.status === 'aktif' ? '● Aktif' : p.status === 'isolir' ? '⏸ Isolir' : '○ Offline'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div style={{ padding: '1rem 1.5rem', background: '#FDFAF7', borderTop: `1.5px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '.78rem', color: C.muted }}>
            Menampilkan 1–{Math.min(perPage, filtered.length)} dari {filtered.length} data
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3].map(n => (
              <button key={n} style={{
                width: 32, height: 32, borderRadius: 7,
                background: n === 1 ? C.orange : '#fff',
                border: `1.5px solid ${n === 1 ? C.orange : C.border}`,
                color: n === 1 ? '#fff' : C.muted, cursor: 'pointer',
                fontSize: '.78rem', fontWeight: 700, fontFamily: 'var(--font)',
              }}>{n}</button>
            ))}
            <button style={{ padding: '0 12px', height: 32, borderRadius: 7, background: '#fff', border: `1.5px solid ${C.border}`, color: C.muted, cursor: 'pointer', fontSize: '.78rem', fontFamily: 'var(--font)' }}>Next →</button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAdd && <TambahModal onClose={() => setShowAdd(false)} />}

      {showDetail && (
        <div className="modal-overlay" onClick={() => setShowDetail(null)}>
          <div className="modal-box" style={{ width: 540 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">👁 Detail Pelanggan</div>
                <div style={{ fontSize: '.75rem', color: C.muted, marginTop: 2 }}>{showDetail.id} · {showDetail.kode}</div>
              </div>
              <button className="close-btn" onClick={() => setShowDetail(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  ['Nama', showDetail.nama], ['Telepon', showDetail.tlp],
                  ['Alamat', showDetail.alamat], ['Area', showDetail.area],
                  ['Paket', showDetail.langganan], ['Harga', `Rp ${showDetail.harga.toLocaleString('id-ID')}`],
                  ['No. KTP', showDetail.idKtp], ['Status', showDetail.status],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="form-label">{k}</div>
                    <div style={{ fontWeight: 600, fontSize: '.85rem' }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDetail(null)}>Tutup</button>
              <button className="btn-primary">✏️ Edit Pelanggan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
