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
  { id:'profile',        icon:'👤', label:'Profile',                     color:C.green,  bg:C.greenLight, value:'1',           subtext:'Administrator' },
  { id:'harga_voucher',  icon:'🏷️', label:'Data Harga Voucher',           color:C.teal,   bg:C.tealLight,  value:null,          subtext:'Kelola harga paket' },
  { id:'data_reseller',  icon:'👥', label:'Data Reseller',                color:C.green,  bg:C.greenLight, value:'1',           subtext:'Total reseller aktif' },
  { id:'dashboard_reseller',icon:'📊',label:'Dashboard Reseller',         color:C.teal,   bg:C.tealLight,  value:'1',           subtext:'Monitoring reseller' },
  { id:'generate',       icon:'🎰', label:'Generate Voucher',             color:C.blue,   bg:C.blueLight,  value:null,          subtext:'Buat kode voucher baru' },
  { id:'jual_voucher',   icon:'💰', label:'Jual Voucher',                 color:C.green,  bg:C.greenLight, value:null,          subtext:'Rekam penjualan' },
  { id:'deposit',        icon:'🏦', label:'Deposit',                      color:C.orange, bg:C.orangeLight,value:null,          subtext:'Kelola saldo deposit' },
  { id:'penjualan_hari', icon:'💳', label:'Penjualan Hari Ini',           color:C.blue,   bg:C.blueLight,  value:'Rp 11.000',   subtext:'3 transaksi' },
  { id:'disetorkan',     icon:'📤', label:'Penjualan Sudah Disetorkan',   color:C.teal,   bg:C.tealLight,  value:'Rp 2.000.000',subtext:'20 transaksi' },
  { id:'mandiri',        icon:'⚙️', label:'Pengaturan Penjualan Mandiri', color:C.orange, bg:C.orangeLight,value:'1',           subtext:'Konfigurasi' },
  { id:'perlokasi',      icon:'📍', label:'Pendapatan Per Lokasi',        color:C.purple, bg:C.purpleLight,value:null,          subtext:'Rekap per area' },
  { id:'cek_voucher',    icon:'🔍', label:'Cek Voucher',                  color:C.green,  bg:C.greenLight, value:null,          subtext:'Verifikasi kode' },
  { id:'penjualan_bulan',icon:'📅', label:'Penjualan Bulan Ini',          color:C.blue,   bg:C.blueLight,  value:'Rp 29.014.500',subtext:'147 transaksi' },
  { id:'total_belum',    icon:'⏳', label:'Penjualan Belum Disetorkan',   color:C.amber,  bg:C.amberLight, value:'Rp 148.539.000',subtext:'Menunggu setor' },
]

const HARGA_VOUCHER = [
  { paket:'1 Jam',   harga:2000,  stok:150, terjual:48,  kode:'1H'   },
  { paket:'3 Jam',   harga:5000,  stok:80,  terjual:31,  kode:'3H'   },
  { paket:'1 Hari',  harga:10000, stok:60,  terjual:25,  kode:'1D'   },
  { paket:'3 Hari',  harga:25000, stok:40,  terjual:12,  kode:'3D'   },
  { paket:'1 Minggu',harga:50000, stok:30,  terjual:9,   kode:'1W'   },
  { paket:'1 Bulan', harga:100000,stok:20,  terjual:5,   kode:'1M'   },
]

const RESELLER = [
  { nama:'Ahmad Sales',    area:'Utara',   deposit:500000,  total:'Rp 4.320.000', status:'aktif' },
  { nama:'Sari Penjual',   area:'Selatan', deposit:250000,  total:'Rp 1.980.000', status:'aktif' },
  { nama:'CV Mitra Jaya',  area:'Barat',   deposit:1000000, total:'Rp 8.100.000', status:'aktif' },
  { nama:'Budi Distributor',area:'Timur',  deposit:0,       total:'Rp 450.000',   status:'suspend' },
]

function fmt(n: number) { return 'Rp ' + n.toLocaleString('id-ID') }

export default function VoucherModule() {
  const [active, setActive]       = useState<string|null>(null)
  const [showGenerate, setShowGenerate] = useState(false)
  const [showJual, setShowJual]   = useState(false)
  const [cekKode, setCekKode]     = useState('')
  const [cekResult, setCekResult] = useState<null|{valid:boolean;paket:string;sisa:string}>(null)

  const activeItem = SUB_MENUS.find(m => m.id === active)

  function renderContent() {
    if (!active) return null

    if (active === 'harga_voucher') return (
      <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ display:'flex',justifyContent:'flex-end' }}>
          <button className="btn-primary" style={{ fontSize:'.8rem',padding:'8px 16px' }}>+ Tambah Paket Harga</button>
        </div>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <table className="data-table">
            <thead><tr><th>Paket</th><th>Kode</th><th>Harga</th><th>Stok Tersedia</th><th>Terjual</th><th>Aksi</th></tr></thead>
            <tbody>
              {HARGA_VOUCHER.map((v,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700 }}>{v.paket}</td>
                  <td><span style={{ fontFamily:'var(--mono)',fontSize:'.75rem',fontWeight:700,color:C.purple,background:'#EDE9FE',padding:'2px 8px',borderRadius:100 }}>{v.kode}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:C.green }}>{fmt(v.harga)}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:v.stok < 30 ? C.red : C.text }}>{v.stok}</span></td>
                  <td style={{ fontFamily:'var(--mono)',color:C.muted }}>{v.terjual}</td>
                  <td>
                    <div style={{ display:'flex',gap:4 }}>
                      <button style={{ padding:'4px 10px',background:C.blueLight,border:`1px solid ${C.blue}33`,borderRadius:6,cursor:'pointer',fontSize:'.72rem',color:C.blue,fontWeight:700,fontFamily:'var(--font)' }}>Edit</button>
                      <button style={{ padding:'4px 10px',background:C.orangeLight,border:`1px solid ${C.orange}33`,borderRadius:6,cursor:'pointer',fontSize:'.72rem',color:C.orange,fontWeight:700,fontFamily:'var(--font)' }}>Generate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (active === 'data_reseller' || active === 'dashboard_reseller') return (
      <div style={{ display:'flex',flexDirection:'column',gap:16 }}>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12 }}>
          {[
            { label:'Total Reseller',     value:'4',            color:C.teal  },
            { label:'Reseller Aktif',     value:'3',            color:C.green },
            { label:'Total Komisi Bulan', value:'Rp 126.000',   color:C.orange},
          ].map(s => (
            <div key={s.label} style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:12,padding:'1rem',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
              <div style={{ fontSize:'.7rem',color:C.muted,fontWeight:700,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:6 }}>{s.label}</div>
              <div style={{ fontSize:'1.3rem',fontWeight:900,color:s.color,fontFamily:'var(--mono)' }}>{s.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <table className="data-table">
            <thead><tr><th>Nama Reseller</th><th>Area</th><th>Saldo Deposit</th><th>Total Penjualan</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {RESELLER.map((r,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:700 }}>{r.nama}</td>
                  <td style={{ color:C.muted,fontSize:'.78rem' }}>{r.area}</td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:r.deposit === 0 ? C.red : C.green }}>{fmt(r.deposit)}</span></td>
                  <td><span style={{ fontFamily:'var(--mono)',fontWeight:700,color:C.blue }}>{r.total}</span></td>
                  <td><span style={{ fontSize:'.7rem',fontWeight:700,padding:'2px 9px',borderRadius:100,background:r.status==='aktif'?C.greenLight:C.redLight,color:r.status==='aktif'?C.green:C.red }}>{r.status}</span></td>
                  <td>
                    <div style={{ display:'flex',gap:4 }}>
                      <button style={{ padding:'4px 10px',background:C.blueLight,border:`1px solid ${C.blue}33`,borderRadius:6,cursor:'pointer',fontSize:'.72rem',color:C.blue,fontWeight:700,fontFamily:'var(--font)' }}>Detail</button>
                      <button style={{ padding:'4px 10px',background:C.orangeLight,border:`1px solid ${C.orange}33`,borderRadius:6,cursor:'pointer',fontSize:'.72rem',color:C.orange,fontWeight:700,fontFamily:'var(--font)' }}>Deposit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )

    if (active === 'generate') return (
      <div style={{ maxWidth:500 }}>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,padding:'1.5rem',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ fontWeight:800,fontSize:'.95rem',marginBottom:'1.25rem',color:C.text }}>🎰 Generate Voucher</div>
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            <div><label className="form-label">Paket Voucher</label>
              <select className="form-input">
                {HARGA_VOUCHER.map(v => <option key={v.kode}>{v.paket} — {fmt(v.harga)}</option>)}
              </select>
            </div>
            <div><label className="form-label">Jumlah Generate</label>
              <input className="form-input" type="number" defaultValue={10} min={1} max={500} />
            </div>
            <div><label className="form-label">Prefix Kode (Opsional)</label>
              <input className="form-input" placeholder="NNS" maxLength={5} />
            </div>
            <div style={{ background:C.orangeDim,border:`1.5px solid ${C.orangeLight}`,borderRadius:8,padding:'10px 12px',fontSize:'.78rem',color:C.orangeDark }}>
              💡 Kode akan digenerate otomatis: NNS-1H-XXXXXX
            </div>
            <button className="btn-primary" style={{ width:'100%',padding:12 }}>🎰 Generate Voucher</button>
          </div>
        </div>
      </div>
    )

    if (active === 'cek_voucher') return (
      <div style={{ maxWidth:480 }}>
        <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,padding:'1.5rem',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ fontWeight:800,fontSize:'.95rem',marginBottom:'1.25rem',color:C.text }}>🔍 Cek Voucher</div>
          <div style={{ display:'flex',gap:8 }}>
            <input className="form-input" placeholder="Masukkan kode voucher..." value={cekKode} onChange={e => setCekKode(e.target.value.toUpperCase())} style={{ fontFamily:'var(--mono)',letterSpacing:'.08em' }} />
            <button className="btn-primary" style={{ whiteSpace:'nowrap',padding:'10px 18px' }} onClick={() => setCekResult(cekKode ? { valid:true,paket:'1 Hari',sisa:'18j 30m' } : null)}>
              Cek
            </button>
          </div>
          {cekResult && (
            <div style={{ marginTop:12,background:cekResult.valid ? C.greenLight : C.redLight,border:`1.5px solid ${cekResult.valid ? C.green : C.red}33`,borderRadius:10,padding:'1rem' }}>
              <div style={{ fontWeight:800,color:cekResult.valid ? C.green : C.red,marginBottom:6 }}>
                {cekResult.valid ? '✅ Voucher Valid' : '❌ Voucher Tidak Valid'}
              </div>
              {cekResult.valid && (
                <div style={{ fontSize:'.82rem',display:'flex',flexDirection:'column',gap:4 }}>
                  <div><span style={{ color:C.muted }}>Paket: </span><strong>{cekResult.paket}</strong></div>
                  <div><span style={{ color:C.muted }}>Sisa: </span><strong style={{ fontFamily:'var(--mono)' }}>{cekResult.sisa}</strong></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )

    // Default: show summary
    return (
      <div style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:14,padding:'2rem',textAlign:'center',boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
        <div style={{ fontSize:'2.5rem',marginBottom:'1rem' }}>{activeItem?.icon}</div>
        <div style={{ fontWeight:800,fontSize:'1rem',color:C.text,marginBottom:6 }}>{activeItem?.label}</div>
        <div style={{ fontSize:'.82rem',color:C.muted }}>{activeItem?.subtext}</div>
        {activeItem?.value && (
          <div style={{ marginTop:12,fontSize:'1.5rem',fontWeight:900,color:C.orange,fontFamily:'var(--mono)' }}>{activeItem.value}</div>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding:'1.5rem',display:'flex',flexDirection:'column',gap:'1.25rem',background:C.bg }}>
      {/* Header */}
      <div style={{ background:'linear-gradient(90deg,#0D9488,#0F766E)',borderRadius:14,padding:'1.25rem 1.75rem',display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:`0 4px 16px ${C.teal}35` }}>
        <div style={{ display:'flex',alignItems:'center',gap:10 }}>
          <span style={{ fontSize:'1.3rem' }}>🎫</span>
          <div>
            <div style={{ fontSize:'1rem',fontWeight:900,color:'#fff' }}>Dashboard Voucher</div>
            <div style={{ fontSize:'.75rem',color:'rgba(255,255,255,.8)' }}>Kelola voucher, reseller, dan penjualan</div>
          </div>
        </div>
        <div style={{ display:'flex',gap:16 }}>
          {[
            { label:'Penjualan Hari Ini', value:'Rp 11.000' },
            { label:'Penjualan Bulan Ini',value:'Rp 29.014.500' },
          ].map(s => (
            <div key={s.label} style={{ textAlign:'right' }}>
              <div style={{ fontSize:'.68rem',color:'rgba(255,255,255,.75)' }}>{s.label}</div>
              <div style={{ fontSize:'1rem',fontWeight:900,color:'#fff',fontFamily:'var(--mono)' }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid menu or detail */}
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
                transition:'all .18s',
                fontFamily:'var(--font)',
                position:'relative',overflow:'hidden',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=m.color; el.style.transform='translateY(-2px)'; el.style.boxShadow=`0 6px 20px ${m.color}20` }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor=C.border; el.style.transform=''; el.style.boxShadow='0 1px 4px rgba(0,0,0,.05)' }}
            >
              <div style={{ position:'absolute',right:-8,bottom:-8,fontSize:'3rem',opacity:.06 }}>{m.icon}</div>
              <div style={{ width:40,height:40,borderRadius:11,background:m.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',marginBottom:10 }}>{m.icon}</div>
              {m.value && (
                <div style={{ fontSize:'1.15rem',fontWeight:900,color:m.color,fontFamily:'var(--mono)',lineHeight:1,marginBottom:4 }}>{m.value}</div>
              )}
              <div style={{ fontWeight:700,fontSize:'.82rem',color:C.text,lineHeight:1.3,marginBottom:4 }}>{m.label}</div>
              <div style={{ fontSize:'.7rem',color:m.color,fontWeight:600 }}>Selengkapnya →</div>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ display:'flex',flexDirection:'column',gap:'1rem' }}>
          {/* Breadcrumb back */}
          <div style={{ display:'flex',alignItems:'center',gap:8 }}>
            <button onClick={() => setActive(null)} style={{ background:'#fff',border:`1.5px solid ${C.border}`,borderRadius:8,padding:'6px 14px',cursor:'pointer',fontSize:'.78rem',color:C.muted,fontFamily:'var(--font)',display:'flex',alignItems:'center',gap:5 }}>
              ← Voucher
            </button>
            <span style={{ color:C.subtle,fontSize:'.8rem' }}>/</span>
            <span style={{ fontSize:'.85rem',fontWeight:700,color:C.text }}>{activeItem?.icon} {activeItem?.label}</span>
          </div>
          {renderContent()}
        </div>
      )}
    </div>
  )
}
