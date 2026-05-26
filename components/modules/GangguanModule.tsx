'use client'
import { useState } from 'react'

const C = {
  orange:'#F97316',orangeDark:'#EA580C',orangeLight:'#FFEDD5',orangeDim:'#FFF7ED',
  green:'#16A34A',greenLight:'#DCFCE7',blue:'#2563EB',blueLight:'#DBEAFE',
  red:'#DC2626',redLight:'#FEE2E2',amber:'#D97706',amberLight:'#FEF3C7',
  teal:'#0D9488',tealLight:'#CCFBF1',purple:'#7C3AED',purpleLight:'#EDE9FE',
  text:'#1C1107',muted:'#78716C',subtle:'#A8A29E',border:'#EDE9E3',bg:'#F8F7F4',
}

type TicketStatus = 'open' | 'pending' | 'proses' | 'closed'
type TicketType   = 'pelanggan' | 'general' | 'aktivasi'

interface Ticket {
  id: string; pelanggan: string; area: string; masalah: string
  deskripsi: string; teknisi: string; status: TicketStatus; tipe: TicketType
  prioritas: 'tinggi'|'sedang'|'rendah'; dibuat: string; selesai: string|null
  offline: number|null; dbm: number|null
}

const TICKETS: Ticket[] = [
  { id:'TKT-047',pelanggan:'Sari Dewi',     area:'Utara',   masalah:'PPPoE Offline',    deskripsi:'Pelanggan offline lebih dari 12 menit.',             teknisi:'Ahmad T.',  status:'open',   tipe:'pelanggan',prioritas:'tinggi',dibuat:'26 Mei 10:15',selesai:null,     offline:12,  dbm:-18   },
  { id:'TKT-046',pelanggan:'Hendra K.',     area:'Pusat',   masalah:'Signal Lemah',     deskripsi:'Nilai dBm −27, kombinasi offline 8 menit.',          teknisi:'Budi T.',   status:'proses', tipe:'pelanggan',prioritas:'tinggi',dibuat:'26 Mei 09:30',selesai:null,     offline:8,   dbm:-27   },
  { id:'TKT-045',pelanggan:'PT Maju Jaya',  area:'Selatan', masalah:'dBm Buruk',        deskripsi:'Nilai sinyal −28 dBm, perlu cek ONU.',               teknisi:'—',         status:'open',   tipe:'pelanggan',prioritas:'sedang',dibuat:'26 Mei 09:00',selesai:null,     offline:null,dbm:-28   },
  { id:'TKT-044',pelanggan:'CV Berkah',     area:'Barat',   masalah:'Koneksi Lambat',   deskripsi:'Keluhan kecepatan tidak sesuai paket.',              teknisi:'Ahmad T.',  status:'pending',tipe:'pelanggan',prioritas:'sedang',dibuat:'25 Mei 14:00',selesai:null,     offline:null,dbm:-20   },
  { id:'TKT-043',pelanggan:'Umum',          area:'—',       masalah:'Kabel Putus',      deskripsi:'Kabel backbone di area utara putus akibat pohon.',   teknisi:'Tim Teknis',status:'proses', tipe:'general',  prioritas:'tinggi',dibuat:'25 Mei 11:00',selesai:null,     offline:null,dbm:null   },
  { id:'TKT-042',pelanggan:'Rina Putri',    area:'Timur',   masalah:'Permintaan Aktifkan',deskripsi:'Pelanggan minta reaktivasi setelah isolir.',      teknisi:'Budi T.',   status:'pending',tipe:'aktivasi', prioritas:'rendah',dibuat:'24 Mei 09:00',selesai:null,     offline:null,dbm:null   },
  { id:'TKT-041',pelanggan:'Ahmad Rizky',   area:'Utara',   masalah:'Ganti ONU',        deskripsi:'ONU pelanggan rusak, perlu penggantian.',            teknisi:'Ahmad T.',  status:'closed', tipe:'pelanggan',prioritas:'sedang',dibuat:'23 Mei 13:00',selesai:'23 Mei 16:00',offline:null,dbm:null },
  { id:'TKT-040',pelanggan:'Budi Santoso',  area:'Pusat',   masalah:'Relokasi',         deskripsi:'Pelanggan pindah, perlu relokasi ONU.',              teknisi:'Tim Teknis',status:'closed', tipe:'pelanggan',prioritas:'rendah',dibuat:'22 Mei 10:00',selesai:'22 Mei 15:00',offline:null,dbm:null },
]

const STATUS_CONFIG: Record<TicketStatus, { label:string; color:string; bg:string; dot:string }> = {
  open:    { label:'Open',    color:C.amber,  bg:C.amberLight,  dot:'#F59E0B' },
  pending: { label:'Pending', color:C.orange, bg:C.orangeLight, dot:C.orange  },
  proses:  { label:'Proses',  color:C.blue,   bg:C.blueLight,   dot:C.blue    },
  closed:  { label:'Closed',  color:C.green,  bg:C.greenLight,  dot:C.green   },
}

const PRIO_CONFIG = {
  tinggi: { color:C.red,   bg:C.redLight },
  sedang: { color:C.amber, bg:C.amberLight },
  rendah: { color:C.green, bg:C.greenLight },
}

function dbmBadge(dbm: number|null) {
  if (!dbm) return null
  const good = dbm >= -24
  const warn = dbm >= -26
  return { label: `${dbm} dBm`, color: good ? C.green : warn ? C.amber : C.red, bg: good ? C.greenLight : warn ? C.amberLight : C.redLight }
}

export default function GangguanModule() {
  const [activeTab, setActiveTab] = useState<TicketType|'semua'>('semua')
  const [activeStatus, setActiveStatus] = useState<TicketStatus|'semua'>('semua')
  const [showModal, setShowModal]   = useState(false)
  const [detail, setDetail]         = useState<Ticket|null>(null)
  const [search, setSearch]         = useState('')

  const filtered = TICKETS.filter(t => {
    const matchTab    = activeTab === 'semua'    || t.tipe === activeTab
    const matchStatus = activeStatus === 'semua' || t.status === activeStatus
    const matchSearch = !search || t.pelanggan.toLowerCase().includes(search.toLowerCase()) || t.masalah.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchStatus && matchSearch
  })

  const counts = {
    open:    TICKETS.filter(t => t.status === 'open').length,
    pending: TICKETS.filter(t => t.status === 'pending').length,
    proses:  TICKETS.filter(t => t.status === 'proses').length,
    closed:  TICKETS.filter(t => t.status === 'closed').length,
  }

  return (
    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: C.bg }}>

      {/* ── Stat cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {(Object.entries(counts) as [TicketStatus, number][]).map(([s, v]) => {
          const cfg = STATUS_CONFIG[s]
          return (
            <div
              key={s}
              onClick={() => setActiveStatus(activeStatus === s ? 'semua' : s)}
              style={{
                background: activeStatus === s ? cfg.color : '#fff',
                border: `1.5px solid ${activeStatus === s ? cfg.color : C.border}`,
                borderRadius: 14, padding: '1.125rem',
                cursor: 'pointer', transition: 'all .18s',
                boxShadow: activeStatus === s ? `0 4px 16px ${cfg.color}40` : '0 1px 4px rgba(0,0,0,.05)',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 900, color: activeStatus === s ? '#fff' : cfg.color, fontFamily: 'var(--mono)', lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: '.82rem', fontWeight: 700, color: activeStatus === s ? 'rgba(255,255,255,.9)' : C.text, marginTop: 6 }}>Ticket {cfg.label}</div>
              <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '.7rem', fontWeight: 700, color: activeStatus === s ? 'rgba(255,255,255,.8)' : cfg.color }}>
                Selengkapnya →
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Detection info ── */}
      <div style={{ background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>📡</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: '.85rem', color: C.blue, marginBottom: 3 }}>Deteksi Gangguan Otomatis</div>
          <div style={{ fontSize: '.8rem', color: C.muted, lineHeight: 1.6 }}>
            Tiket dibuat otomatis jika: <strong style={{ color: C.text }}>PPPoE Offline &gt; 5 menit</strong> ATAU <strong style={{ color: C.text }}>Nilai dBm &lt; −26 dBm</strong>. Kombinasi keduanya = prioritas <strong style={{ color: C.red }}>Tinggi</strong>.
          </div>
        </div>
      </div>

      {/* ── Table card ── */}
      <div style={{ background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.05)' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(90deg,#DC2626,#B91C1C)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1rem' }}>🎫</span>
          <span style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Manajemen Tiket Gangguan</span>
        </div>

        {/* Filters */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', background: '#FDFAF7' }}>
          {/* Tipe tabs */}
          <div style={{ display: 'flex', gap: 5 }}>
            {([['semua','Semua'],['pelanggan','Pelanggan'],['general','General'],['aktivasi','Aktivasi']] as const).map(([val,lbl]) => (
              <button key={val} onClick={() => setActiveTab(val)} style={{
                padding: '5px 12px',
                background: activeTab === val ? C.orange : '#fff',
                border: `1.5px solid ${activeTab === val ? C.orange : C.border}`,
                borderRadius: 100, cursor: 'pointer',
                color: activeTab === val ? '#fff' : C.muted,
                fontSize: '.75rem', fontWeight: 700, fontFamily: 'var(--font)',
              }}>{lbl}</button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input className="form-input" style={{ width: 240 }} placeholder="🔍 Cari tiket, pelanggan..." value={search} onChange={e => setSearch(e.target.value)} />
            <button className="btn-primary" style={{ padding: '8px 14px', fontSize: '.78rem', whiteSpace: 'nowrap' }} onClick={() => setShowModal(true)}>
              + Buat Tiket
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>No. Tiket</th><th>Pelanggan</th><th>Area</th><th>Masalah</th>
              <th>Offline</th><th>dBm</th><th>Prioritas</th><th>Teknisi</th>
              <th>Dibuat</th><th>Status</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => {
              const sc  = STATUS_CONFIG[t.status]
              const pc  = PRIO_CONFIG[t.prioritas]
              const dbm = dbmBadge(t.dbm)
              return (
                <tr key={t.id}>
                  <td>
                    <div style={{ fontFamily:'var(--mono)',fontSize:'.75rem',fontWeight:700,color:C.orange }}>{t.id}</div>
                    <div style={{ fontSize:'.65rem',color:C.subtle,marginTop:1 }}>
                      {t.tipe === 'pelanggan' ? '👤' : t.tipe === 'general' ? '🌐' : '🔓'} {t.tipe}
                    </div>
                  </td>
                  <td style={{ fontWeight:600 }}>{t.pelanggan}</td>
                  <td style={{ fontSize:'.78rem',color:C.muted }}>{t.area}</td>
                  <td style={{ fontSize:'.8rem' }}>{t.masalah}</td>
                  <td>
                    {t.offline != null
                      ? <span style={{ fontFamily:'var(--mono)',fontSize:'.75rem',fontWeight:700,color:t.offline > 5 ? C.red : C.muted }}>{t.offline} mnt</span>
                      : <span style={{ color:C.subtle,fontSize:'.75rem' }}>—</span>
                    }
                  </td>
                  <td>
                    {dbm
                      ? <span style={{ fontSize:'.7rem',fontWeight:700,padding:'2px 7px',borderRadius:100,background:dbm.bg,color:dbm.color }}>{dbm.label}</span>
                      : <span style={{ color:C.subtle,fontSize:'.75rem' }}>—</span>
                    }
                  </td>
                  <td><span style={{ fontSize:'.7rem',fontWeight:700,padding:'2px 8px',borderRadius:100,background:pc.bg,color:pc.color }}>{t.prioritas}</span></td>
                  <td style={{ fontSize:'.78rem',color:C.muted }}>{t.teknisi}</td>
                  <td style={{ fontSize:'.72rem',color:C.subtle,whiteSpace:'nowrap' }}>{t.dibuat}</td>
                  <td>
                    <span style={{ fontSize:'.7rem',fontWeight:700,padding:'2px 9px',borderRadius:100,display:'inline-flex',alignItems:'center',gap:4,background:sc.bg,color:sc.color }}>
                      <span style={{ width:5,height:5,borderRadius:'50%',background:sc.dot,flexShrink:0,display:'inline-block' }} />
                      {sc.label}
                    </span>
                  </td>
                  <td>
                    <div style={{ display:'flex',gap:4 }}>
                      <button onClick={() => setDetail(t)} title="Detail" style={{ width:26,height:26,borderRadius:6,background:C.blueLight,border:`1px solid ${C.blue}33`,cursor:'pointer',fontSize:'.75rem',display:'flex',alignItems:'center',justifyContent:'center' }}>👁</button>
                      {t.status !== 'closed' && (
                        <button title="Selesaikan" style={{ width:26,height:26,borderRadius:6,background:C.greenLight,border:`1px solid ${C.green}33`,cursor:'pointer',fontSize:'.75rem',display:'flex',alignItems:'center',justifyContent:'center' }}>✅</button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div style={{ padding:'1rem 1.5rem',background:'#FDFAF7',borderTop:`1.5px solid ${C.border}`,fontSize:'.78rem',color:C.muted }}>
          Menampilkan {filtered.length} dari {TICKETS.length} tiket
        </div>
      </div>

      {/* ── Create Ticket Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" style={{ width: 520 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">🎫 Buat Tiket Baru</div>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ display:'flex',flexDirection:'column',gap:12 }}>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
                <div>
                  <label className="form-label">Tipe Tiket</label>
                  <select className="form-input"><option>Pelanggan</option><option>General</option><option>Permintaan Aktivasi</option></select>
                </div>
                <div>
                  <label className="form-label">Prioritas</label>
                  <select className="form-input"><option>Sedang</option><option>Tinggi</option><option>Rendah</option></select>
                </div>
              </div>
              <div>
                <label className="form-label">Pelanggan</label>
                <select className="form-input"><option>— Pilih Pelanggan —</option><option>Budi Santoso (PLG-001)</option><option>Sari Dewi (PLG-002)</option><option>PT Maju Jaya (PLG-003)</option></select>
              </div>
              <div>
                <label className="form-label">Jenis Masalah</label>
                <select className="form-input">
                  <option>PPPoE Offline</option><option>Signal dBm Lemah</option>
                  <option>Koneksi Lambat</option><option>Ganti ONU</option>
                  <option>Relokasi</option><option>Kabel Putus</option><option>Lainnya</option>
                </select>
              </div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
                <div>
                  <label className="form-label">Offline (menit)</label>
                  <input className="form-input" type="number" placeholder="0" />
                </div>
                <div>
                  <label className="form-label">Nilai dBm</label>
                  <input className="form-input" type="number" placeholder="-20" />
                </div>
              </div>
              <div>
                <label className="form-label">Deskripsi Masalah</label>
                <textarea className="form-input" rows={3} placeholder="Jelaskan masalah secara detail..." style={{ resize:'vertical' }} />
              </div>
              <div>
                <label className="form-label">Assign Teknisi</label>
                <select className="form-input"><option>— Belum Ditugaskan —</option><option>Ahmad Teknisi</option><option>Budi Teknisi</option><option>Tim Teknis Pusat</option></select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>🎫 Buat Tiket</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Ticket Modal ── */}
      {detail && (
        <div className="modal-overlay" onClick={() => setDetail(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title">🎫 {detail.id} — {detail.masalah}</div>
                <div style={{ fontSize:'.75rem',color:C.muted,marginTop:2 }}>Dibuat {detail.dibuat}</div>
              </div>
              <button className="close-btn" onClick={() => setDetail(null)}>✕</button>
            </div>
            <div className="modal-body" style={{ display:'flex',flexDirection:'column',gap:12 }}>
              {(detail.offline != null && detail.offline > 5) || (detail.dbm != null && detail.dbm < -26) ? (
                <div style={{ background:'#FEF2F2',border:'1.5px solid #FECACA',borderRadius:10,padding:'10px 14px',fontSize:'.82rem',color:C.red,fontWeight:600 }}>
                  ⚠️ Gangguan terdeteksi otomatis —
                  {detail.offline && detail.offline > 5 ? ` Offline ${detail.offline} mnt` : ''}
                  {detail.dbm && detail.dbm < -26 ? ` dBm ${detail.dbm}` : ''}
                </div>
              ) : null}
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:10 }}>
                {[
                  ['Pelanggan', detail.pelanggan], ['Area', detail.area],
                  ['Masalah', detail.masalah], ['Teknisi', detail.teknisi],
                  ['Offline', detail.offline ? `${detail.offline} menit` : '—'],
                  ['dBm', detail.dbm ? `${detail.dbm} dBm` : '—'],
                ].map(([k,v]) => (
                  <div key={k}>
                    <div className="form-label">{k}</div>
                    <div style={{ fontWeight:600,fontSize:'.85rem' }}>{v}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="form-label">Deskripsi</div>
                <div style={{ background:'#FDFAF7',border:`1.5px solid ${C.border}`,borderRadius:8,padding:'10px 12px',fontSize:'.82rem',lineHeight:1.6,color:C.text }}>{detail.deskripsi}</div>
              </div>
              <div>
                <label className="form-label">Update Status</label>
                <select className="form-input" defaultValue={detail.status}>
                  <option value="open">Open</option><option value="pending">Pending</option>
                  <option value="proses">Proses</option><option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="form-label">Catatan Teknisi</label>
                <textarea className="form-input" rows={2} placeholder="Tambahkan catatan penanganan..." style={{ resize:'vertical' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setDetail(null)}>Tutup</button>
              <button className="btn-primary" onClick={() => setDetail(null)}>💾 Simpan Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
