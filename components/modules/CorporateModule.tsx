'use client'
import { useState } from 'react'

const C = {
  orange:'#F97316',orangeDark:'#EA580C',orangeLight:'#FFEDD5',orangeDim:'#FFF7ED',
  green:'#16A34A',greenLight:'#DCFCE7',blue:'#2563EB',blueLight:'#DBEAFE',
  red:'#DC2626',redLight:'#FEE2E2',amber:'#D97706',amberLight:'#FEF3C7',
  teal:'#0D9488',tealLight:'#CCFBF1',purple:'#7C3AED',purpleLight:'#EDE9FE',
  text:'#1C1107',muted:'#78716C',subtle:'#A8A29E',border:'#EDE9E3',bg:'#F8F7F4',
}

const SUB_MENUS = [
  { id:'piutang',     icon:'💰', label:'Data Piutang Karyawan',      color:C.green,  bg:C.greenLight,  desc:'Kelola piutang & pinjaman' },
  { id:'pemotongan',  icon:'✂️', label:'Data Pemotongan Gaji',       color:C.red,    bg:C.redLight,    desc:'Pemotongan otomatis & manual' },
  { id:'gaji',        icon:'💵', label:'Data Gaji Karyawan',         color:C.green,  bg:C.greenLight,  desc:'Struktur & rekap gaji' },
  { id:'rekap_absensi',icon:'📋',label:'Data Rekap Absensi Karyawan',color:C.green,  bg:C.greenLight,  desc:'Laporan absensi bulanan' },
  { id:'lembur',      icon:'⏰', label:'Data Lembur Karyawan',       color:C.green,  bg:C.greenLight,  desc:'Pencatatan jam lembur' },
  { id:'absen_manual',icon:'📝', label:'Data Absen Karyawan',        color:C.green,  bg:C.greenLight,  desc:'Absensi manual & koreksi' },
  { id:'cuti',        icon:'🏖️', label:'Data Cuti Karyawan',         color:C.green,  bg:C.greenLight,  desc:'Pengajuan & approval cuti' },
  { id:'pekerjaan',   icon:'🔨', label:'Data Pekerjaan Harian',      color:C.green,  bg:C.greenLight,  desc:'Log pekerjaan harian' },
  { id:'absen_masuk', icon:'🕐', label:'Absen Masuk',                color:C.teal,   bg:C.tealLight,   desc:'Rekam waktu masuk' },
  { id:'absen_pulang',icon:'🕔', label:'Absen Pulang',               color:C.teal,   bg:C.tealLight,   desc:'Rekam waktu pulang' },
]

const KARYAWAN = [
  { id:'KRY-001',nama:'Ahmad Teknisi',   jabatan:'Teknisi Lapangan',divisi:'Teknis',  gaji:3500000,  status:'aktif', masuk:'08:02',pulang:null },
  { id:'KRY-002',nama:'Budi Admin',      jabatan:'Admin Keuangan',  divisi:'Keuangan',gaji:3000000,  status:'aktif', masuk:'07:58',pulang:null },
  { id:'KRY-003',nama:'Sari Dewi',       jabatan:'CS Officer',      divisi:'CS',      gaji:2800000,  status:'aktif', masuk:'08:15',pulang:null },
  { id:'KRY-004',nama:'Hendra K.',       jabatan:'Teknisi Senior',  divisi:'Teknis',  gaji:4500000,  status:'aktif', masuk:null,   pulang:null },
  { id:'KRY-005',nama:'Rina Putri',      jabatan:'Staff Keuangan',  divisi:'Keuangan',gaji:2600000,  status:'cuti',  masuk:null,   pulang:null },
  { id:'KRY-006',nama:'Pak Hasan',       jabatan:'Supervisor',      divisi:'Operasional',gaji:5000000,status:'aktif',masuk:'07:45',pulang:null },
]

const LEMBUR_DATA = [
  { nama:'Ahmad Teknisi', tgl:'25 Mei 2025', jam:3, keterangan:'Perbaikan jaringan darurat', status:'approved' },
  { nama:'Hendra K.',     tgl:'24 Mei 2025', jam:2, keterangan:'Instalasi pelanggan baru',   status:'approved' },
  { nama:'Budi Admin',    tgl:'23 Mei 2025', jam:1, keterangan:'Rekap akhir bulan',          status:'pending'  },
]

const CUTI_DATA = [
  { nama:'Rina Putri',  tgl:'26-30 Mei 2025', hari:5, alasan:'Keperluan keluarga', status:'approved' },
  { nama:'Sari Dewi',   tgl:'5 Jun 2025',      hari:1, alasan:'Sakit',              status:'pending'  },
  { nama:'Ahmad Teknisi',tgl:'10 Jun 2025',    hari:1, alasan:'Pernikahan saudara', status:'pending'  },
]

function fmt(n: number) { return 'Rp ' + n.toLocaleString('id-ID') }
function Chip({ label, color, bg }: { label:string; color:string; bg:string }) {
  return <span style={{ fontSize:'.7rem',fontWeight:700,padding:'2px 9px',borderRadius:100,background:bg,color }}>{label}</span>
}

export default function CorporateModule() {
  const [active, setActive] = useState<string|null>(null)
  const [showAbsenModal, setShowAbsenModal] = useState<'masuk'|'pulang'|null>(null)
  const activeItem = SUB_MENUS.find(m => m.id === active)

  function renderContent() {
    if (active === 'gaji') return (
      <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12 }}>
          {[
            { label:'Total Penggajian Bulan Ini', value:fmt(21400000), color:C.green },
            { label:'Karyawan Aktif',              value:'6',           color:C.blue  },
            { label:'Total Lembur',                value:fmt(450000),   color:C.orange},
          ].map(s => (
            <div key={s.label} style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:12,padding:'1rem',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
              <div style={{ fontSize:'.7rem',color:C.muted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:6 }}>{s.label}</div>
              <div style={{ fontSize:'1.25rem',fontWeight:900,color:s.color,fontFamily:'var(--mono)' }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ padding:'1rem 1.5rem',background:'#FDFAF7',borderBottom:`1.5px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center' }}>
            <span style={{ fontWeight:800,fontSize:'.88rem' }}>Daftar Gaji Karyawan — Mei 2025</span>
            <button className="btn-primary" style={{ fontSize:'.78rem',padding:'7px 14px' }}>📄 Generate Slip Gaji</button>
          </div>
          <table className="data-table">
            <thead><tr><th>Karyawan</th><th>Jabatan</th><th>Divisi</th><th>Gaji Pokok</th><th>Lembur</th><th>Potongan</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {KARYAWAN.map((k,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700 }}>{k.nama}</td>
                  <td style={{ fontSize:'.78rem',color:C.muted }}>{k.jabatan}</td>
                  <td><Chip label={k.divisi} color={C.teal} bg={C.tealLight} /></td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:C.text }}>{fmt(k.gaji)}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',color:C.orange }}>+{fmt(50000)}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',color:C.red }}>-{fmt(0)}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:800,color:C.green }}>{fmt(k.gaji + 50000)}</span></td>
                  <td><Chip label={k.status === 'cuti' ? 'Cuti' : 'Aktif'} color={k.status==='cuti'?C.amber:C.green} bg={k.status==='cuti'?C.amberLight:C.greenLight} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (active === 'rekap_absensi' || active === 'absen_manual') return (
      <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <div style={{ display:'flex',gap:8 }}>
            <select className="form-input" style={{ width:160 }}>
              <option>Mei 2025</option><option>Apr 2025</option><option>Mar 2025</option>
            </select>
            <select className="form-input" style={{ width:140 }}>
              <option>Semua Divisi</option><option>Teknis</option><option>Keuangan</option><option>CS</option>
            </select>
          </div>
          <button className="btn-primary" style={{ fontSize:'.78rem',padding:'7px 14px' }}>📊 Export Excel</button>
        </div>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <table className="data-table">
            <thead><tr><th>Karyawan</th><th>Divisi</th><th>Hadir</th><th>Terlambat</th><th>Sakit</th><th>Izin</th><th>Alpha</th><th>Masuk Hari Ini</th><th>Pulang</th></tr></thead>
            <tbody>
              {KARYAWAN.map((k,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700 }}>{k.nama}</td>
                  <td><Chip label={k.divisi} color={C.teal} bg={C.tealLight} /></td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:C.green }}>{k.status==='cuti'?18:22}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',color:C.amber }}>{Math.floor(Math.random()*3)}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',color:C.red }}>{k.status==='cuti'?1:0}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',color:C.orange }}>{k.status==='cuti'?5:0}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',color:C.red }}>0</span></td>
                  <td>
                    {k.masuk
                      ? <span style={{ fontFamily:'var(--mono)',fontSize:'.78rem',color:C.green,fontWeight:700 }}>✓ {k.masuk}</span>
                      : <span style={{ fontSize:'.75rem',color:k.status==='cuti'?C.amber:C.red }}>{k.status==='cuti'?'Cuti':'Belum'}</span>
                    }
                  </td>
                  <td><span style={{ fontSize:'.75rem',color:C.subtle }}>—</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (active === 'lembur') return (
      <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ display:'flex',justifyContent:'flex-end' }}>
          <button className="btn-primary" style={{ fontSize:'.78rem',padding:'7px 14px' }}>+ Ajukan Lembur</button>
        </div>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <table className="data-table">
            <thead><tr><th>Karyawan</th><th>Tanggal</th><th>Jam Lembur</th><th>Upah Lembur</th><th>Keterangan</th><th>Status</th></tr></thead>
            <tbody>
              {LEMBUR_DATA.map((l,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700 }}>{l.nama}</td>
                  <td style={{ fontSize:'.78rem',color:C.muted }}>{l.tgl}</td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:C.orange }}>{l.jam} jam</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:C.green }}>{fmt(l.jam * 25000)}</span></td>
                  <td style={{ fontSize:'.78rem',color:C.muted }}>{l.keterangan}</td>
                  <td><Chip label={l.status==='approved'?'Disetujui':'Pending'} color={l.status==='approved'?C.green:C.amber} bg={l.status==='approved'?C.greenLight:C.amberLight} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (active === 'cuti') return (
      <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ display:'flex',justifyContent:'flex-end' }}>
          <button className="btn-primary" style={{ fontSize:'.78rem',padding:'7px 14px' }}>+ Ajukan Cuti</button>
        </div>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <table className="data-table">
            <thead><tr><th>Karyawan</th><th>Tanggal</th><th>Lama</th><th>Alasan</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {CUTI_DATA.map((c,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700 }}>{c.nama}</td>
                  <td style={{ fontSize:'.78rem',color:C.muted }}>{c.tgl}</td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:C.blue }}>{c.hari} hari</span></td>
                  <td style={{ fontSize:'.78rem',color:C.muted }}>{c.alasan}</td>
                  <td><Chip label={c.status==='approved'?'Disetujui':'Menunggu'} color={c.status==='approved'?C.green:C.amber} bg={c.status==='approved'?C.greenLight:C.amberLight} /></td>
                  <td>
                    {c.status === 'pending' && (
                      <div style={{ display:'flex',gap:4 }}>
                        <button style={{ padding:'3px 10px',background:C.greenLight,border:`1px solid ${C.green}33`,borderRadius:6,cursor:'pointer',fontSize:'.72rem',color:C.green,fontWeight:700,fontFamily:'var(--font)' }}>✓ Setuju</button>
                        <button style={{ padding:'3px 10px',background:C.redLight,border:`1px solid ${C.red}33`,borderRadius:6,cursor:'pointer',fontSize:'.72rem',color:C.red,fontWeight:700,fontFamily:'var(--font)' }}>✕ Tolak</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (active === 'absen_masuk' || active === 'absen_pulang') {
      const isMasuk = active === 'absen_masuk'
      return (
        <div style={{ maxWidth:480 }}>
          <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,padding:'2rem',boxShadow:'0 1px 4px rgba(0,0,0,.05)',textAlign:'center' }}>
            <div style={{ fontSize:'3rem',marginBottom:'1rem' }}>{isMasuk ? '🕐' : '🕔'}</div>
            <div style={{ fontWeight:900,fontSize:'1.1rem',marginBottom:6,color:C.text }}>{isMasuk ? 'Absen Masuk' : 'Absen Pulang'}</div>
            <div style={{ fontSize:'2.5rem',fontWeight:900,fontFamily:'var(--mono)',color:C.orange,marginBottom:'1.5rem' }}>
              {new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })}
            </div>
            <div style={{ marginBottom:'1.25rem' }}>
              <label className="form-label">Pilih Karyawan</label>
              <select className="form-input" style={{ textAlign:'left' }}>
                {KARYAWAN.map(k => <option key={k.id}>{k.nama} — {k.jabatan}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:'1.25rem' }}>
              <label className="form-label">Lokasi Absen</label>
              <input className="form-input" defaultValue="Kantor Pusat" />
            </div>
            {!isMasuk && (
              <div style={{ marginBottom:'1.25rem' }}>
                <label className="form-label">Keterangan (Opsional)</label>
                <input className="form-input" placeholder="Selesai kerja normal..." />
              </div>
            )}
            <button className="btn-primary" style={{ width:'100%',padding:13,fontSize:'.9rem' }}>
              {isMasuk ? '✅ Rekam Absen Masuk' : '✅ Rekam Absen Pulang'}
            </button>
            <div style={{ marginTop:12,fontSize:'.75rem',color:C.muted }}>
              {new Date().toLocaleDateString('id-ID', { weekday:'long',day:'numeric',month:'long',year:'numeric' })}
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div style={{ padding:'1.5rem',display:'flex',flexDirection:'column',gap:'1.25rem',background:C.bg }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(130deg,#16A34A,#15803D)',borderRadius:14,padding:'1.25rem 1.75rem',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:`0 4px 16px ${C.green}35` }}>
        <div style={{ display:'flex',alignItems:'center',gap:10 }}>
          <span style={{ fontSize:'1.3rem' }}>🏢</span>
          <div>
            <div style={{ fontSize:'1rem',fontWeight:900,color:'#fff' }}>Kelola Data Corporate</div>
            <div style={{ fontSize:'.75rem',color:'rgba(255,255,255,.8)' }}>HR & Manajemen Karyawan PT. Niandri Network Solution</div>
          </div>
        </div>
        <div style={{ display:'flex',gap:16 }}>
          {[
            { label:'Total Karyawan', value:'6' },
            { label:'Hadir Hari Ini', value:'4' },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'right' }}>
              <div style={{ fontSize:'.68rem',color:'rgba(255,255,255,.75)' }}>{s.label}</div>
              <div style={{ fontSize:'1.1rem',fontWeight:900,color:'#fff',fontFamily:'var(--mono)' }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {!active ? (
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(210px,1fr))',gap:'1rem' }}>
          {SUB_MENUS.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              style={{
                background:'#fff',border:`1.5px solid ${C.border}`,
                borderRadius:14,padding:'1.25rem',
                cursor:'pointer',textAlign:'left',
                boxShadow:'0 1px 4px rgba(0,0,0,.05)',
                transition:'all .18s',fontFamily:'var(--font)',
                position:'relative',overflow:'hidden',
              }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=m.color; el.style.transform='translateY(-2px)'; el.style.boxShadow=`0 6px 20px ${m.color}20` }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=C.border; el.style.transform=''; el.style.boxShadow='0 1px 4px rgba(0,0,0,.05)' }}
            >
              <div style={{ position:'absolute',right:-8,bottom:-8,fontSize:'3rem',opacity:.06 }}>{m.icon}</div>
              <div style={{ width:40,height:40,borderRadius:11,background:m.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',marginBottom:10 }}>{m.icon}</div>
              <div style={{ fontWeight:700,fontSize:'.85rem',color:C.text,lineHeight:1.3,marginBottom:4 }}>{m.label}</div>
              <div style={{ fontSize:'.72rem',color:m.color,fontWeight:600 }}>Selengkapnya →</div>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <button onClick={() => setActive(null)} style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:8,padding:'6px 14px',cursor:'pointer',fontSize:'.78rem',color:C.muted,fontFamily:'var(--font)' }}>
              ← Corporate
            </button>
            <span style={{ color:C.subtle,fontSize:'.8rem' }}>/</span>
            <span style={{ fontSize:'.85rem',fontWeight:700,color:C.text }}>{activeItem?.icon} {activeItem?.label}</span>
          </div>
          {renderContent() ?? (
            <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,padding:'2rem',textAlign:'center',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
              <div style={{ fontSize:'2.5rem',marginBottom:'1rem' }}>{activeItem?.icon}</div>
              <div style={{ fontWeight:800,fontSize:'1rem',color:C.text }}>{activeItem?.label}</div>
              <div style={{ fontSize:'.82rem',color:C.muted,marginTop:6 }}>{activeItem?.desc}</div>
              <button className="btn-primary" style={{ marginTop:'1rem' }}>+ Tambah Data</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
