'use client'
import { useState } from 'react'

const C = {
  orange:'#F97316',orangeDark:'#EA580C',orangeLight:'#FFEDD5',orangeDim:'#FFF7ED',
  green:'#16A34A',greenLight:'#DCFCE7',
  blue:'#2563EB',blueLight:'#DBEAFE',
  red:'#DC2626',redLight:'#FEE2E2',
  amber:'#D97706',amberLight:'#FEF3C7',
  teal:'#0D9488',tealLight:'#CCFBF1',
  purple:'#7C3AED',purpleLight:'#EDE9FE',
  text:'#1C1107',muted:'#78716C',subtle:'#A8A29E',
  border:'#EDE9E3',bg:'#F8F7F4',
}

// ── DATA ────────────────────────────────────────────────────────────────────
const TEKNISI_DATA = [
  { id:'TKN-001', nama:'Rizal Firmansyah', hp:'081234000001', area:'Pusat',   status:'aktif',   skill:'Fiber Optik, Mikrotik', tiketAktif:2, tiketSelesai:34, rating:4.9 },
  { id:'TKN-002', nama:'Doni Prasetyo',    hp:'081234000002', area:'Utara',   status:'aktif',   skill:'Fiber Optik, VLAN',     tiketAktif:1, tiketSelesai:27, rating:4.7 },
  { id:'TKN-003', nama:'Wahyu Kurniawan',  hp:'081234000003', area:'Selatan', status:'aktif',   skill:'Mikrotik, Routing',     tiketAktif:0, tiketSelesai:41, rating:4.8 },
  { id:'TKN-004', nama:'Arif Budiman',     hp:'081234000004', area:'Timur',   status:'cuti',    skill:'Fiber Optik',           tiketAktif:0, tiketSelesai:19, rating:4.5 },
  { id:'TKN-005', nama:'Febri Saputra',    hp:'081234000005', area:'Barat',   status:'aktif',   skill:'Instalasi, Splicing',   tiketAktif:1, tiketSelesai:22, rating:4.6 },
]

const TICKET_DATA = [
  { id:'TKT-046', pelanggan:'Hendra K.',   area:'Pusat',   masalah:'PPPoE Offline >5 mnt', prio:'tinggi', status:'proses',  teknisi:'Rizal Firmansyah', tgl:'28 Mei 2026 08:12', dbm:-27, offline:8  },
  { id:'TKT-045', pelanggan:'Sari Dewi',   area:'Utara',   masalah:'Signal dBm −28',       prio:'sedang', status:'proses',  teknisi:'Doni Prasetyo',    tgl:'28 Mei 2026 09:30', dbm:-28, offline:null},
  { id:'TKT-044', pelanggan:'Rina Putri',  area:'Selatan', masalah:'Ganti ONU',            prio:'rendah', status:'closed',  teknisi:'Wahyu Kurniawan',  tgl:'27 Mei 2026 14:00', dbm:null,offline:null},
  { id:'TKT-043', pelanggan:'CV Berkah',   area:'Barat',   masalah:'Koneksi Lambat',       prio:'sedang', status:'pending', teknisi:'Febri Saputra',    tgl:'27 Mei 2026 16:45', dbm:-19, offline:null},
  { id:'TKT-042', pelanggan:'Ahmad Rizky', area:'Pusat',   masalah:'Pemasangan Baru',      prio:'rendah', status:'closed',  teknisi:'Rizal Firmansyah', tgl:'26 Mei 2026 10:00', dbm:null,offline:null},
  { id:'TKT-041', pelanggan:'Pak Hasan',   area:'Timur',   masalah:'Kabel putus',          prio:'tinggi', status:'open',    teknisi:'—',                tgl:'28 Mei 2026 11:00', dbm:null,offline:60 },
]

const MONITORING_DATA = [
  { id:'PLG-001', nama:'Budi Santoso',  area:'Pusat',   paket:'Home 20Mbps',   ip:'10.8.1.11', dbm:-18, status:'online',  uptime:'14d 3h',  rx:18.2, tx:2.1  },
  { id:'PLG-002', nama:'Sari Dewi',     area:'Utara',   paket:'Home 50Mbps',   ip:'10.8.1.12', dbm:-28, status:'warning', uptime:'2h 14m',  rx:42.1, tx:5.3  },
  { id:'PLG-003', nama:'PT Maju Jaya',  area:'Selatan', paket:'Bisnis 100M',   ip:'10.8.2.01', dbm:-17, status:'online',  uptime:'30d 1h',  rx:91.4, tx:18.7 },
  { id:'PLG-004', nama:'Rina Putri',    area:'Timur',   paket:'Home 10Mbps',   ip:'10.8.1.41', dbm:null,status:'offline', uptime:'—',       rx:0,    tx:0    },
  { id:'PLG-005', nama:'CV Berkah',     area:'Barat',   paket:'Bisnis 50Mbps', ip:'10.8.2.05', dbm:-20, status:'online',  uptime:'7d 22h',  rx:46.8, tx:9.2  },
  { id:'PLG-006', nama:'Ahmad Rizky',   area:'Utara',   paket:'Home 10Mbps',   ip:'10.8.1.61', dbm:-19, status:'online',  uptime:'5d 10h',  rx:9.3,  tx:0.9  },
  { id:'PLG-007', nama:'Hendra K.',     area:'Pusat',   paket:'Home 20Mbps',   ip:'10.8.1.71', dbm:-27, status:'warning', uptime:'0h 8m',   rx:4.1,  tx:0.3  },
  { id:'PLG-008', nama:'Dewi Rahayu',   area:'Selatan', paket:'Home 20Mbps',   ip:'10.8.1.81', dbm:-16, status:'online',  uptime:'21d 6h',  rx:17.9, tx:1.8  },
  { id:'PLG-009', nama:'Pak Hasan',     area:'Timur',   paket:'Home 10Mbps',   ip:'10.8.1.91', dbm:null,status:'offline', uptime:'—',       rx:0,    tx:0    },
  { id:'PLG-010', nama:'Ibu Kartini',   area:'Barat',   paket:'Home 20Mbps',   ip:'10.8.1.10', dbm:-21, status:'online',  uptime:'9d 4h',   rx:16.5, tx:1.6  },
]

// ── HELPERS ─────────────────────────────────────────────────────────────────
function Badge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: bg, color }}>{label}</span>
}

function prioBadge(p: string) {
  if (p === 'tinggi') return <Badge label="Tinggi" color={C.red}   bg={C.redLight}   />
  if (p === 'sedang') return <Badge label="Sedang" color={C.amber} bg={C.amberLight} />
  return                      <Badge label="Rendah" color={C.green} bg={C.greenLight} />
}

function statusTicketBadge(s: string) {
  if (s === 'proses')  return <Badge label="Proses"  color={C.blue}  bg={C.blueLight}  />
  if (s === 'pending') return <Badge label="Pending" color={C.amber} bg={C.amberLight} />
  if (s === 'open')    return <Badge label="Open"    color={C.red}   bg={C.redLight}   />
  return                      <Badge label="Selesai" color={C.green} bg={C.greenLight} />
}

// ── MODAL TAMBAH TEKNISI ─────────────────────────────────────────────────────
function TambahTeknisiModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ width: 520 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">➕ Tambah Teknisi</div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'ID Teknisi',    ph: 'TKN-006 (auto)', disabled: true },
              { label: 'Nama Lengkap', ph: 'Nama teknisi'                    },
              { label: 'No. HP / WA',  ph: '081234xxxxxx', type: 'tel'       },
              { label: 'Area Tugas',   ph: '', type: 'select'                },
            ].map(f => (
              <div key={f.label}>
                <label className="form-label">{f.label}</label>
                {f.type === 'select'
                  ? <select className="form-input"><option>Pusat</option><option>Utara</option><option>Selatan</option><option>Timur</option><option>Barat</option></select>
                  : <input className="form-input" placeholder={f.ph} disabled={f.disabled} style={f.disabled ? { opacity: .6 } : {}} />
                }
              </div>
            ))}
          </div>
          <div>
            <label className="form-label">Keahlian / Skill</label>
            <input className="form-input" placeholder="Contoh: Fiber Optik, Mikrotik, Splicing" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label className="form-label">Status</label>
              <select className="form-input"><option>aktif</option><option>cuti</option><option>nonaktif</option></select>
            </div>
            <div>
              <label className="form-label">Tanggal Bergabung</label>
              <input className="form-input" type="date" />
            </div>
          </div>
          <div>
            <label className="form-label">Keterangan</label>
            <input className="form-input" placeholder="Keterangan tambahan..." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Batal</button>
          <button className="btn-primary" onClick={onClose}>💾 Simpan Teknisi</button>
        </div>
      </div>
    </div>
  )
}

// ── MODAL ASSIGN TIKET ───────────────────────────────────────────────────────
function AssignModal({ ticket, onClose }: { ticket: typeof TICKET_DATA[0]; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ width: 460 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">🔧 Assign Teknisi</div>
            <div style={{ fontSize: '.75rem', color: C.muted, marginTop: 2 }}>{ticket.id} — {ticket.masalah}</div>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: C.orangeDim, border: `1.5px solid ${C.orangeLight}`, borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', fontSize: '.82rem' }}>
            <span style={{ color: C.muted }}>Pelanggan</span>
            <span style={{ fontWeight: 700 }}>{ticket.pelanggan} — {ticket.area}</span>
          </div>
          <div>
            <label className="form-label">Pilih Teknisi</label>
            <select className="form-input">
              {TEKNISI_DATA.filter(t => t.status === 'aktif').map(t => (
                <option key={t.id}>{t.nama} — Area {t.area}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Prioritas</label>
            <select className="form-input"><option>tinggi</option><option>sedang</option><option>rendah</option></select>
          </div>
          <div>
            <label className="form-label">Catatan untuk Teknisi</label>
            <textarea className="form-input" rows={3} placeholder="Instruksi / info tambahan..." style={{ resize: 'vertical' }} />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Batal</button>
          <button className="btn-primary" onClick={onClose}>✅ Assign Sekarang</button>
        </div>
      </div>
    </div>
  )
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function TeknisiModule() {
  const [tab, setTab]               = useState<'teknisi' | 'tiket' | 'monitoring'>('teknisi')
  const [showAdd, setShowAdd]       = useState(false)
  const [assignTicket, setAssignTicket] = useState<typeof TICKET_DATA[0] | null>(null)
  const [ticketFilter, setTicketFilter] = useState('Semua')
  const [monitorFilter, setMonitorFilter] = useState('Semua')
  const [monitorSearch, setMonitorSearch] = useState('')

  const ticketFiltered = TICKET_DATA.filter(t =>
    ticketFilter === 'Semua' ? true : t.status === ticketFilter.toLowerCase()
  )

  const monitorFiltered = MONITORING_DATA.filter(p => {
    const q = monitorSearch.toLowerCase()
    const matchSearch = !q || p.nama.toLowerCase().includes(q) || p.ip.includes(q) || p.id.toLowerCase().includes(q)
    const matchFilter = monitorFilter === 'Semua' ? true : p.status === monitorFilter.toLowerCase()
    return matchSearch && matchFilter
  })

  const onlineCount  = MONITORING_DATA.filter(p => p.status === 'online').length
  const warningCount = MONITORING_DATA.filter(p => p.status === 'warning').length
  const offlineCount = MONITORING_DATA.filter(p => p.status === 'offline').length

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: C.bg }}>

      {/* ── Header ── */}
      <div style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
        <div style={{ background: 'linear-gradient(90deg,#0D9488,#0F766E)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.1rem' }}>🔧</span>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#fff' }}>Manajemen Teknisi</span>
          <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: '.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
            {TEKNISI_DATA.filter(t => t.status === 'aktif').length} teknisi aktif
          </span>
        </div>

        {/* Tabs */}
        <div style={{ padding: '1rem 1.5rem', background: '#FDFAF7', borderBottom: `1.5px solid ${C.border}`, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {([
            { key: 'teknisi',    label: '👷 Data Teknisi'       },
            { key: 'tiket',      label: '🎫 Ticket Gangguan'    },
            { key: 'monitoring', label: '📡 Monitoring Live'    },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '6px 16px',
                background: tab === t.key ? C.teal : 'transparent',
                border: `1.5px solid ${tab === t.key ? C.teal : C.border}`,
                borderRadius: 100, cursor: 'pointer',
                color: tab === t.key ? '#fff' : C.muted,
                fontSize: '.78rem', fontWeight: 700, fontFamily: 'var(--font)', transition: 'all .15s',
              }}
            >{t.label}</button>
          ))}
          <div style={{ marginLeft: 'auto' }}>
            {tab === 'teknisi' && (
              <button
                onClick={() => setShowAdd(true)}
                style={{ padding: '6px 16px', background: C.teal, border: 'none', borderRadius: 100, cursor: 'pointer', color: '#fff', fontSize: '.78rem', fontWeight: 700, fontFamily: 'var(--font)' }}
              >➕ Tambah Teknisi</button>
            )}
          </div>
        </div>

        {/* ── TAB: DATA TEKNISI ── */}
        {tab === 'teknisi' && (
          <div>
            {/* Summary cards */}
            <div style={{ padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', background: '#FDFAF7', borderBottom: `1.5px solid ${C.border}` }}>
              {[
                { label: 'Total Teknisi',  val: TEKNISI_DATA.length,                                    color: C.blue,  bg: C.blueLight  },
                { label: 'Aktif',          val: TEKNISI_DATA.filter(t => t.status === 'aktif').length,  color: C.green, bg: C.greenLight },
                { label: 'Cuti / Off',     val: TEKNISI_DATA.filter(t => t.status !== 'aktif').length,  color: C.amber, bg: C.amberLight },
                { label: 'Tiket Aktif',    val: TEKNISI_DATA.reduce((a, t) => a + t.tiketAktif, 0),     color: C.orange,bg: C.orangeLight},
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color, fontFamily: 'var(--mono)', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '.75rem', color: C.muted, marginTop: 3 }}>{s.label}</div>
                  </div>
                  <div style={{ width: 10, height: 40, borderRadius: 5, background: s.bg }} />
                </div>
              ))}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Aksi</th>
                    <th>ID</th>
                    <th>Nama Teknisi</th>
                    <th>No. HP</th>
                    <th>Area</th>
                    <th>Keahlian</th>
                    <th>Tiket Aktif</th>
                    <th>Selesai</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {TEKNISI_DATA.map((t, i) => (
                    <tr key={t.id}>
                      <td style={{ color: C.subtle, fontFamily: 'var(--mono)', fontSize: '.75rem' }}>{i + 1}</td>
                      <td>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                          {[
                            { icon: '✏️', bg: '#16A34A', title: 'Edit' },
                            { icon: '', title: 'Nonaktifkan', bg: '#DC2626', svg: 'power' },
                            { icon: '', title: 'Histori Tiket', bg: '#0D9488', svg: 'history' },
                            { icon: '💬', bg: '#16A34A', title: 'WA' },
                          ].map(a => (
                            <button key={a.title} title={a.title} style={{ width: 28, height: 28, borderRadius: 7, background: a.bg, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', boxShadow: `0 2px 6px ${a.bg}55`, transition: 'all .15s' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = '' }}
                            >
                              {a.svg === 'power' ? (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
                              ) : a.svg === 'history' ? (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.45"/></svg>
                              ) : a.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: C.teal, fontWeight: 700 }}>{t.id}</td>
                      <td style={{ fontWeight: 700 }}>{t.nama}</td>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: '.78rem' }}>{t.hp}</td>
                      <td><span style={{ fontSize: '.75rem', background: C.blueLight, color: C.blue, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>{t.area}</span></td>
                      <td style={{ fontSize: '.75rem', color: C.muted, maxWidth: 160 }}>{t.skill}</td>
                      <td style={{ textAlign: 'center' }}>
                        {t.tiketAktif > 0
                          ? <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: C.orange, fontSize: '.9rem' }}>{t.tiketAktif}</span>
                          : <span style={{ color: C.subtle, fontSize: '.8rem' }}>—</span>
                        }
                      </td>
                      <td><span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: C.green, fontSize: '.85rem' }}>{t.tiketSelesai}</span></td>
                      <td><span style={{ fontSize: '.8rem', fontWeight: 700, color: C.amber }}>{'⭐'.repeat(Math.round(t.rating))} {t.rating}</span></td>
                      <td>
                        <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '3px 9px', borderRadius: 100, background: t.status === 'aktif' ? C.greenLight : C.amberLight, color: t.status === 'aktif' ? C.green : C.amber }}>
                          {t.status === 'aktif' ? '● Aktif' : '⏸ Cuti'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: TICKET GANGGUAN ── */}
        {tab === 'tiket' && (
          <div>
            {/* Summary */}
            <div style={{ padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', background: '#FDFAF7', borderBottom: `1.5px solid ${C.border}` }}>
              {[
                { label: 'Open',    val: TICKET_DATA.filter(t => t.status === 'open').length,    color: C.red,   bg: C.redLight   },
                { label: 'Pending', val: TICKET_DATA.filter(t => t.status === 'pending').length, color: C.amber, bg: C.amberLight },
                { label: 'Proses',  val: TICKET_DATA.filter(t => t.status === 'proses').length,  color: C.blue,  bg: C.blueLight  },
                { label: 'Closed',  val: TICKET_DATA.filter(t => t.status === 'closed').length,  color: C.green, bg: C.greenLight },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color, fontFamily: 'var(--mono)', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '.75rem', color: C.muted, marginTop: 3 }}>Ticket {s.label}</div>
                  </div>
                  <div style={{ width: 10, height: 40, borderRadius: 5, background: s.bg }} />
                </div>
              ))}
            </div>

            {/* Filter */}
            <div style={{ padding: '0.875rem 1.5rem', borderBottom: `1.5px solid ${C.border}`, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Semua', 'Open', 'Pending', 'Proses', 'Closed'].map(f => (
                <button key={f} onClick={() => setTicketFilter(f)} style={{ padding: '5px 14px', background: ticketFilter === f ? C.orange : 'transparent', border: `1.5px solid ${ticketFilter === f ? C.orange : C.border}`, borderRadius: 100, cursor: 'pointer', color: ticketFilter === f ? '#fff' : C.muted, fontSize: '.75rem', fontWeight: 700, fontFamily: 'var(--font)', transition: 'all .15s' }}>{f}</button>
              ))}
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Aksi</th>
                    <th>No. Tiket</th>
                    <th>Pelanggan</th>
                    <th>Area</th>
                    <th>Masalah</th>
                    <th>Offline</th>
                    <th>dBm</th>
                    <th>Teknisi</th>
                    <th>Tanggal</th>
                    <th>Prioritas</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketFiltered.map((t, i) => (
                    <tr key={t.id}>
                      <td style={{ color: C.subtle, fontFamily: 'var(--mono)', fontSize: '.75rem' }}>{i + 1}</td>
                      <td>
                        <button
                          onClick={() => setAssignTicket(t)}
                          title="Assign Teknisi"
                          style={{ padding: '4px 10px', background: C.tealLight, border: `1px solid ${C.teal}33`, borderRadius: 6, cursor: 'pointer', fontSize: '.72rem', color: C.teal, fontWeight: 700, fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}
                        >🔧 Assign</button>
                      </td>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: C.orange, fontWeight: 700 }}>{t.id}</td>
                      <td style={{ fontWeight: 600 }}>{t.pelanggan}</td>
                      <td><span style={{ fontSize: '.75rem', background: C.blueLight, color: C.blue, fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>{t.area}</span></td>
                      <td style={{ fontSize: '.8rem' }}>{t.masalah}</td>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: '.75rem' }}>
                        {t.offline
                          ? <span style={{ color: t.offline > 10 ? C.red : C.amber, fontWeight: 700 }}>{t.offline} mnt</span>
                          : <span style={{ color: C.subtle }}>—</span>
                        }
                      </td>
                      <td>
                        {t.dbm
                          ? <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '2px 7px', borderRadius: 100, background: t.dbm < -26 ? C.redLight : C.amberLight, color: t.dbm < -26 ? C.red : C.amber }}>{t.dbm} dBm</span>
                          : <span style={{ color: C.subtle, fontSize: '.75rem' }}>—</span>
                        }
                      </td>
                      <td style={{ fontSize: '.78rem', fontWeight: t.teknisi !== '—' ? 600 : 400, color: t.teknisi !== '—' ? C.text : C.subtle }}>{t.teknisi}</td>
                      <td style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: C.subtle }}>{t.tgl}</td>
                      <td>{prioBadge(t.prio)}</td>
                      <td>{statusTicketBadge(t.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: MONITORING LIVE ── */}
        {tab === 'monitoring' && (
          <div>
            {/* Summary */}
            <div style={{ padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', background: '#FDFAF7', borderBottom: `1.5px solid ${C.border}` }}>
              {[
                { label: 'Online',  val: onlineCount,  color: C.green, bg: C.greenLight, dot: '#86EFAC' },
                { label: 'Warning', val: warningCount, color: C.amber, bg: C.amberLight, dot: '#FCD34D' },
                { label: 'Offline', val: offlineCount, color: C.red,   bg: C.redLight,   dot: C.red     },
              ].map(s => (
                <div key={s.label} style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: s.dot, boxShadow: `0 0 8px ${s.dot}`, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color, fontFamily: 'var(--mono)', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '.75rem', color: C.muted, marginTop: 3 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter + Search */}
            <div style={{ padding: '0.875rem 1.5rem', borderBottom: `1.5px solid ${C.border}`, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {['Semua', 'online', 'warning', 'offline'].map(f => (
                <button key={f} onClick={() => setMonitorFilter(f)} style={{ padding: '5px 14px', background: monitorFilter === f ? C.teal : 'transparent', border: `1.5px solid ${monitorFilter === f ? C.teal : C.border}`, borderRadius: 100, cursor: 'pointer', color: monitorFilter === f ? '#fff' : C.muted, fontSize: '.75rem', fontWeight: 700, fontFamily: 'var(--font)', transition: 'all .15s', textTransform: 'capitalize' }}>{f}</button>
              ))}
              <div style={{ marginLeft: 'auto', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '.8rem', color: C.subtle }}>🔍</span>
                <input
                  className="form-input"
                  placeholder="Cari nama, ID, IP..."
                  value={monitorSearch}
                  onChange={e => setMonitorSearch(e.target.value)}
                  style={{ paddingLeft: 30, width: 220, height: 34, fontSize: '.8rem' }}
                />
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Status</th>
                    <th>ID</th>
                    <th>Nama Pelanggan</th>
                    <th>Area</th>
                    <th>Paket</th>
                    <th>IP Address</th>
                    <th>dBm</th>
                    <th>Uptime</th>
                    <th>Rx (Mbps)</th>
                    <th>Tx (Mbps)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {monitorFiltered.map((p, i) => {
                    const isOff = p.status === 'offline'
                    const isWarn = p.status === 'warning'
                    return (
                      <tr key={p.id} style={{ background: isOff ? '#FFF5F5' : isWarn ? '#FFFBEB' : 'transparent' }}>
                        <td style={{ color: C.subtle, fontFamily: 'var(--mono)', fontSize: '.75rem' }}>{i + 1}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 9, height: 9, borderRadius: '50%', background: isOff ? C.red : isWarn ? C.amber : C.green, boxShadow: isOff ? 'none' : `0 0 6px ${isWarn ? C.amber : C.green}` }} />
                            <span style={{ fontSize: '.72rem', fontWeight: 700, color: isOff ? C.red : isWarn ? C.amber : C.green, textTransform: 'capitalize' }}>{p.status}</span>
                          </div>
                        </td>
                        <td style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: C.orange, fontWeight: 700 }}>{p.id}</td>
                        <td style={{ fontWeight: 600 }}>{p.nama}</td>
                        <td><span style={{ fontSize: '.72rem', background: C.blueLight, color: C.blue, fontWeight: 700, padding: '2px 7px', borderRadius: 100 }}>{p.area}</span></td>
                        <td style={{ fontSize: '.75rem', color: C.muted }}>{p.paket}</td>
                        <td style={{ fontFamily: 'var(--mono)', fontSize: '.75rem' }}>{p.ip}</td>
                        <td>
                          {p.dbm
                            ? <span style={{ fontSize: '.72rem', fontWeight: 700, padding: '2px 7px', borderRadius: 100, background: p.dbm < -26 ? C.redLight : p.dbm < -24 ? C.amberLight : C.greenLight, color: p.dbm < -26 ? C.red : p.dbm < -24 ? C.amber : C.green }}>{p.dbm} dBm</span>
                            : <span style={{ color: C.subtle, fontSize: '.75rem' }}>—</span>
                          }
                        </td>
                        <td style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', color: C.muted }}>{p.uptime}</td>
                        <td><span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: C.teal, fontSize: '.8rem' }}>{p.rx > 0 ? p.rx : '—'}</span></td>
                        <td><span style={{ fontFamily: 'var(--mono)', fontWeight: 700, color: C.purple, fontSize: '.8rem' }}>{p.tx > 0 ? p.tx : '—'}</span></td>
                        <td>
                          {isOff || isWarn ? (
                            <button
                              onClick={() => setAssignTicket({ id: 'TKT-NEW', pelanggan: p.nama, area: p.area, masalah: isOff ? 'Pelanggan Offline' : 'Sinyal Lemah / Warning', prio: isOff ? 'tinggi' : 'sedang', status: 'open', teknisi: '—', tgl: new Date().toLocaleDateString('id-ID'), dbm: p.dbm, offline: isOff ? 99 : null })}
                              style={{ padding: '4px 10px', background: isOff ? C.red : C.amber, border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '.72rem', color: '#fff', fontWeight: 700, fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}
                            >{isOff ? '🚨 Buat Tiket' : '⚠️ Cek'}</button>
                          ) : (
                            <span style={{ fontSize: '.72rem', color: C.subtle }}>Normal</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAdd     && <TambahTeknisiModal onClose={() => setShowAdd(false)} />}
      {assignTicket && <AssignModal ticket={assignTicket} onClose={() => setAssignTicket(null)} />}
    </div>
  )
}
