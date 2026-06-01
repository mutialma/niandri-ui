'use client'
import { useState } from 'react'
import { useAuth } from '@/lib/auth'

const C = {
  orange:'#F97316',orangeDark:'#EA580C',orangeLight:'#FFEDD5',orangeDim:'#FFF7ED',
  green:'#16A34A',greenLight:'#DCFCE7',
  blue:'#2563EB',blueLight:'#DBEAFE',
  red:'#DC2626',redLight:'#FEE2E2',
  amber:'#D97706',amberLight:'#FEF3C7',
  teal:'#0D9488',tealLight:'#CCFBF1',
  purple:'#7C3AED',purpleLight:'#EDE9FE',
  text:'#1C1107',muted:'#78716C',subtle:'#A8A29E',
  border:'#EDE9E3',bg:'#F8F7F4',surface:'#FFFFFF',
}

function fmt(n: number) { return 'Rp ' + n.toLocaleString('id-ID') }

function StatCard({ value, label, sub, icon, color, bg, onClick }: {
  value: string | number; label: string; sub?: string; icon: string;
  color: string; bg: string; onClick?: () => void
}) {
  const [hov, setHov] = useState(false)
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:'#fff', border:`1.5px solid ${hov ? color : C.border}`, borderRadius:14, padding:'1.125rem 1.25rem', cursor: onClick ? 'pointer' : 'default', transition:'all .18s', boxShadow: hov ? `0 6px 20px ${color}25` : '0 1px 4px rgba(0,0,0,.05)', transform: hov ? 'translateY(-2px)' : 'none', display:'flex', flexDirection:'column', gap:10, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', fontSize:'3.5rem', opacity:.06, pointerEvents:'none' }}>{icon}</div>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
        <div style={{ width:40, height:40, borderRadius:11, background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.15rem', flexShrink:0 }}>{icon}</div>
        {onClick && <span style={{ fontSize:'.68rem', color, fontWeight:700, background:bg, padding:'2px 8px', borderRadius:100 }}>Selengkapnya →</span>}
      </div>
      <div>
        <div style={{ fontSize:'1.6rem', fontWeight:900, color, lineHeight:1, fontFamily:'var(--mono)', letterSpacing:'-.02em' }}>
          {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
        </div>
        <div style={{ fontSize:'.8rem', fontWeight:700, color:C.text, marginTop:4 }}>{label}</div>
        {sub && <div style={{ fontSize:'.72rem', color:C.muted, marginTop:2 }}>{sub}</div>}
      </div>
    </div>
  )
}

function WelcomeBanner({ name, subtitle, right }: { name: string; subtitle: string; right?: React.ReactNode }) {
  return (
    <div style={{ background:'linear-gradient(130deg,#F97316 0%,#EA580C 55%,#C2410C 100%)', borderRadius:18, padding:'1.5rem 2rem', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 6px 28px rgba(249,115,22,.4)', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:-60, top:-60, width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,.07)' }} />
      <div style={{ position:'absolute', right:80, bottom:-80, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,.05)' }} />
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ fontSize:'1.15rem', fontWeight:900, color:'#fff', marginBottom:4 }}>Selamat Datang, {name} 👋</div>
        <div style={{ fontSize:'.82rem', color:'rgba(255,255,255,.85)' }}>{subtitle}</div>
        <div style={{ fontSize:'.75rem', color:'rgba(255,255,255,.7)', marginTop:4 }}>
          {new Date().toLocaleDateString('id-ID',{ weekday:'long', day:'numeric', month:'long', year:'numeric' })}
        </div>
      </div>
      {right && <div style={{ position:'relative', zIndex:1 }}>{right}</div>}
    </div>
  )
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
const PAYMENTS = [
  { name:'Budi Santoso', pkg:'Home 20Mbps',  amount:180000, method:'Cash Agen',    status:'lunas' },
  { name:'Sari Dewi',    pkg:'Home 50Mbps',  amount:250000, method:'Transfer BCA', status:'lunas' },
  { name:'CV Berkah',    pkg:'Bisnis 100M',  amount:750000, method:'TriPay',        status:'lunas' },
  { name:'Ahmad Rizky',  pkg:'Home 10Mbps',  amount:120000, method:'Transfer BRI', status:'lunas' },
  { name:'Hendra K.',    pkg:'Home 20Mbps',  amount:180000, method:'—',             status:'belum' },
]
const TICKET_STATS = [
  { label:'Ticket Open',             value:0,  color:C.amber, bg:C.amberLight, icon:'📂' },
  { label:'Ticket Pending',          value:1,  color:C.red,   bg:C.redLight,   icon:'⏳' },
  { label:'Ticket Dalam Penanganan', value:0,  color:C.blue,  bg:C.blueLight,  icon:'🔧' },
  { label:'Ticket Closed',           value:61, color:C.green, bg:C.greenLight, icon:'✅' },
]
const CHART_DATA = [
  { bulan:'Jan', val:38 },{ bulan:'Feb', val:40 },{ bulan:'Mar', val:41 },
  { bulan:'Apr', val:43 },{ bulan:'Mei', val:25 },
]
const MAX_CHART = Math.max(...CHART_DATA.map(d => d.val))

function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState<'pembayaran'|'ticket'>('pembayaran')
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        <StatCard value={395} label="Data Pelanggan"        sub="Total terdaftar"            icon="👥" color={C.green}  bg={C.greenLight}  onClick={() => {}} />
        <StatCard value="342" label="Pelanggan Sudah Lunas" sub="Bulan ini"                  icon="💳" color={C.blue}   bg={C.blueLight}   onClick={() => {}} />
        <StatCard value={46}  label="Pelanggan Belum Lunas" sub="Perlu tindak lanjut"        icon="⚠️" color={C.red}    bg={C.redLight}    onClick={() => {}} />
        <StatCard value={395} label="Buat Ticket Pelanggan" sub="Klik untuk buat tiket baru" icon="🎫" color={C.orange} bg={C.orangeLight} onClick={() => {}} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        {TICKET_STATS.map(t => <StatCard key={t.label} value={t.value} label={t.label} icon={t.icon} color={t.color} bg={t.bg} onClick={() => {}} />)}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' }}>
        <div style={{ background:C.blue, borderRadius:14, padding:'1.25rem', boxShadow:`0 4px 16px ${C.blue}35` }}>
          <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.8)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Status Langganan</div>
          {[{ label:'Total', val:395 },{ label:'Status On', val:386 },{ label:'Status Off', val:9 }].map(s => (
            <div key={s.label} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,.15)', fontSize:'.82rem', color:'#fff' }}>
              <span style={{ opacity:.85 }}>{s.label}</span><span style={{ fontWeight:800, fontFamily:'var(--mono)' }}>{s.val}</span>
            </div>
          ))}
        </div>
        <div style={{ background:C.amber, borderRadius:14, padding:'1.25rem', boxShadow:`0 4px 16px ${C.amber}35` }}>
          <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.85)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Ticket Permintaan Aktivasi</div>
          <div style={{ fontSize:'3rem', fontWeight:900, color:'#fff', fontFamily:'var(--mono)', lineHeight:1 }}>0</div>
          <div style={{ fontSize:'.8rem', color:'rgba(255,255,255,.85)', marginTop:8 }}>Tidak ada permintaan aktif</div>
        </div>
        <div style={{ background:C.green, borderRadius:14, padding:'1.25rem', boxShadow:`0 4px 16px ${C.green}35` }}>
          <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.85)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Dashboard Ticket General</div>
          {[{ label:'Open', val:0, dot:C.amber },{ label:'Pending', val:1, dot:C.red },{ label:'Proses', val:0, dot:C.blue },{ label:'Closed', val:61, dot:'#fff' }].map(s => (
            <div key={s.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', fontSize:'.8rem', color:'#fff' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ width:6, height:6, borderRadius:'50%', background:s.dot, display:'inline-block' }} /><span style={{ opacity:.9 }}>{s.label}</span></div>
              <span style={{ fontWeight:800, fontFamily:'var(--mono)' }}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'360px 1fr', gap:'1rem' }}>
        <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, padding:'1.25rem', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ fontWeight:800, fontSize:'.9rem', color:C.text, marginBottom:'1.125rem' }}>📈 Grafik Pendapatan (2025)</div>
          <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:120 }}>
            {CHART_DATA.map((d,i) => (
              <div key={d.bulan} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
                <div style={{ fontSize:'.65rem', color:C.muted, fontFamily:'var(--mono)' }}>{d.val}M</div>
                <div style={{ width:'100%', background: i===CHART_DATA.length-1 ? `linear-gradient(180deg,${C.orange},${C.orangeDark})` : `linear-gradient(180deg,${C.teal},#0F766E)`, borderRadius:'5px 5px 0 0', height:`${(d.val/MAX_CHART)*100}%`, transition:'height .3s' }} />
                <div style={{ fontSize:'.68rem', fontWeight:600, color:C.muted }}>{d.bulan}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:12, padding:'8px 12px', background:C.orangeDim, borderRadius:8, display:'flex', justifyContent:'space-between', fontSize:'.75rem' }}>
            <span style={{ color:C.muted }}>Total 2025 (s/d Mei)</span>
            <span style={{ fontWeight:800, color:C.orangeDark, fontFamily:'var(--mono)' }}>Rp 187.100.000</span>
          </div>
        </div>
        <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ padding:'1rem 1.25rem', background:'#FDFAF7', borderBottom:`1.5px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ display:'flex', gap:6 }}>
              {(['pembayaran','ticket'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:'5px 14px', background: activeTab===tab ? C.orange : 'transparent', border:`1.5px solid ${activeTab===tab ? C.orange : C.border}`, borderRadius:100, cursor:'pointer', color: activeTab===tab ? '#fff' : C.muted, fontSize:'.75rem', fontWeight:700, fontFamily:'var(--font)', transition:'all .15s' }}>
                  {tab==='pembayaran' ? '💳 Pembayaran Terbaru' : '🎫 Tiket Terbaru'}
                </button>
              ))}
            </div>
            <span style={{ fontSize:'.7rem', color:C.subtle }}>Hari ini</span>
          </div>
          {activeTab==='pembayaran' && (
            <table className="data-table">
              <thead><tr><th>Pelanggan</th><th>Paket</th><th>Jumlah</th><th>Metode</th><th>Status</th></tr></thead>
              <tbody>{PAYMENTS.map((p,i) => (
                <tr key={i}>
                  <td style={{ fontWeight:600 }}>{p.name}</td>
                  <td style={{ color:C.muted, fontSize:'.78rem' }}>{p.pkg}</td>
                  <td><span style={{ fontFamily:'var(--mono)', fontWeight:700, color:C.green, fontSize:'.82rem' }}>{fmt(p.amount)}</span></td>
                  <td><span style={{ fontSize:'.72rem', background:'#DBEAFE', color:C.blue, fontWeight:700, padding:'2px 8px', borderRadius:100 }}>{p.method}</span></td>
                  <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background: p.status==='lunas' ? '#DCFCE7' : '#FEF3C7', color: p.status==='lunas' ? C.green : C.amber }}>{p.status==='lunas' ? '✓ Lunas' : 'Belum'}</span></td>
                </tr>
              ))}</tbody>
            </table>
          )}
          {activeTab==='ticket' && (
            <table className="data-table">
              <thead><tr><th>No. Tiket</th><th>Pelanggan</th><th>Masalah</th><th>Prioritas</th><th>Status</th></tr></thead>
              <tbody>{[
                { id:'TKT-046', pel:'Hendra K.',    masalah:'PPPoE Offline >5 mnt', prio:'Tinggi', status:'Proses'  },
                { id:'TKT-045', pel:'Sari Dewi',    masalah:'Signal dBm −28',       prio:'Sedang', status:'Proses'  },
                { id:'TKT-044', pel:'Rina Putri',   masalah:'Ganti ONU',            prio:'Rendah', status:'Closed'  },
                { id:'TKT-043', pel:'PT Maju Jaya', masalah:'Koneksi lambat',        prio:'Sedang', status:'Pending' },
              ].map((t,i) => (
                <tr key={i}>
                  <td style={{ fontFamily:'var(--mono)', fontSize:'.75rem', color:C.orange, fontWeight:700 }}>{t.id}</td>
                  <td style={{ fontWeight:600 }}>{t.pel}</td>
                  <td style={{ color:C.muted, fontSize:'.78rem' }}>{t.masalah}</td>
                  <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background: t.prio==='Tinggi' ? '#FEE2E2' : t.prio==='Sedang' ? '#FEF3C7' : '#F0FDF4', color: t.prio==='Tinggi' ? C.red : t.prio==='Sedang' ? C.amber : C.green }}>{t.prio}</span></td>
                  <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background: t.status==='Closed' ? '#DCFCE7' : t.status==='Proses' ? '#DBEAFE' : '#FEF3C7', color: t.status==='Closed' ? C.green : t.status==='Proses' ? C.blue : C.amber }}>{t.status}</span></td>
                </tr>
              ))}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── ABSEN CARD ───────────────────────────────────────────────────────────────
const KANTOR_LAT  = -7.5350998
const KANTOR_LNG  = 112.5967262
const RADIUS_M    = 25

function hitungJarak(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

function AbsenCard({ name, jamMasuk, jamPulang, durasi, onMasuk, onPulang }: {
  name: string; jamMasuk: string|null; jamPulang: string|null; durasi: string|null;
  onMasuk: () => void; onPulang: () => void;
}) {
  const [gpsStatus, setGpsStatus] = useState<'idle'|'loading'|'ok'|'jauh'|'error'>('idle')
  const [jarak, setJarak]         = useState<number|null>(null)
  const [action, setAction]       = useState<'masuk'|'pulang'|null>(null)

  function requestAbsen(tipe: 'masuk'|'pulang') {
    if (!navigator.geolocation) { setGpsStatus('error'); return }
    setAction(tipe)
    setGpsStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const d = hitungJarak(pos.coords.latitude, pos.coords.longitude, KANTOR_LAT, KANTOR_LNG)
        setJarak(Math.round(d))
        if (d <= RADIUS_M) {
          setGpsStatus('ok')
          tipe === 'masuk' ? onMasuk() : onPulang()
        } else {
          setGpsStatus('jauh')
        }
      },
      () => setGpsStatus('error'),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const statusLabel = jamPulang ? 'Sudah Pulang' : jamMasuk ? 'Sedang Bertugas' : 'Belum Absen'
  const dotColor    = jamPulang ? C.red : jamMasuk ? C.green : C.subtle

  return (
    <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,.07)' }}>
      <div style={{ background:'linear-gradient(90deg,#0D9488,#0F766E)', padding:'0.875rem 1.5rem', display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ fontSize:'1rem' }}>🕐</span>
        <span style={{ fontWeight:800, color:'#fff', fontSize:'.95rem' }}>Absensi Harian</span>
        <span style={{ marginLeft:'auto', fontSize:'.75rem', color:'rgba(255,255,255,.8)' }}>
          {new Date().toLocaleDateString('id-ID',{ weekday:'long', day:'numeric', month:'long', year:'numeric' })}
        </span>
      </div>

      <div style={{ padding:'1.25rem 1.5rem', display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'1rem', alignItems:'start' }}>

        {/* Status */}
        <div style={{ display:'flex', alignItems:'center', gap:12, paddingTop:4 }}>
          <div style={{ width:14, height:14, borderRadius:'50%', flexShrink:0, background:dotColor, boxShadow: jamMasuk && !jamPulang ? `0 0 10px ${C.green}` : 'none' }} />
          <div>
            <div style={{ fontSize:'.82rem', fontWeight:800, color:C.text }}>{statusLabel}</div>
            <div style={{ fontSize:'.72rem', color:C.muted, marginTop:2 }}>{name}</div>
          </div>
        </div>

        {/* Jam Masuk */}
        <div style={{ background:C.greenLight, border:`1.5px solid ${C.green}33`, borderRadius:12, padding:'0.875rem 1rem' }}>
          <div style={{ fontSize:'.68rem', color:C.muted, fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:6 }}>Jam Masuk</div>
          {jamMasuk
            ? <div style={{ fontSize:'1.4rem', fontWeight:900, color:C.green, fontFamily:'var(--mono)' }}>🟢 {jamMasuk}</div>
            : <button onClick={() => requestAbsen('masuk')} disabled={gpsStatus==='loading'}
                style={{ width:'100%', padding:'8px 0', background: gpsStatus==='loading' && action==='masuk' ? C.muted : C.green, border:'none', borderRadius:8, cursor:'pointer', color:'#fff', fontSize:'.8rem', fontWeight:800, fontFamily:'var(--font)' }}>
                {gpsStatus==='loading' && action==='masuk' ? '📍 Mengecek GPS...' : '✅ Absen Masuk'}
              </button>
          }
        </div>

        {/* Jam Pulang */}
        <div style={{ background: jamMasuk ? C.orangeLight : '#F5F5F4', border:`1.5px solid ${jamMasuk ? C.orange+'44' : C.border}`, borderRadius:12, padding:'0.875rem 1rem', opacity: jamMasuk ? 1 : .55 }}>
          <div style={{ fontSize:'.68rem', color:C.muted, fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:6 }}>Jam Pulang</div>
          {jamPulang
            ? <div style={{ fontSize:'1.4rem', fontWeight:900, color:C.orange, fontFamily:'var(--mono)' }}>🔴 {jamPulang}</div>
            : <button onClick={() => { if (jamMasuk) requestAbsen('pulang') }} disabled={!jamMasuk || gpsStatus==='loading'}
                style={{ width:'100%', padding:'8px 0', background: !jamMasuk ? C.subtle : gpsStatus==='loading' && action==='pulang' ? C.muted : C.orange, border:'none', borderRadius:8, cursor: jamMasuk ? 'pointer' : 'not-allowed', color:'#fff', fontSize:'.8rem', fontWeight:800, fontFamily:'var(--font)' }}>
                {gpsStatus==='loading' && action==='pulang' ? '📍 Mengecek GPS...' : '🏠 Absen Pulang'}
              </button>
          }
        </div>

        {/* Durasi */}
        <div style={{ background:C.purpleLight, border:`1.5px solid ${C.purple}33`, borderRadius:12, padding:'0.875rem 1rem', opacity: jamMasuk ? 1 : .55 }}>
          <div style={{ fontSize:'.68rem', color:C.muted, fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:6 }}>Durasi Kerja</div>
          <div style={{ fontSize:'1.4rem', fontWeight:900, color:C.purple, fontFamily:'var(--mono)' }}>{durasi ?? '—'}</div>
          {jamMasuk && !jamPulang && <div style={{ fontSize:'.68rem', color:C.purple, opacity:.7, marginTop:2 }}>Sedang berjalan...</div>}
        </div>
      </div>

      {/* GPS feedback */}
      {(gpsStatus === 'jauh' || gpsStatus === 'error') && (
        <div style={{ margin:'0 1.5rem 1.25rem', padding:'10px 14px', borderRadius:10, background: gpsStatus==='jauh' ? C.redLight : C.amberLight, border:`1.5px solid ${gpsStatus==='jauh' ? C.red : C.amber}33`, display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:'1.1rem' }}>{gpsStatus==='jauh' ? '📍' : '⚠️'}</span>
          <div>
            <div style={{ fontSize:'.82rem', fontWeight:700, color: gpsStatus==='jauh' ? C.red : C.amber }}>
              {gpsStatus==='jauh' ? `Lokasi terlalu jauh — ${jarak}m dari kantor (max ${RADIUS_M}m)` : 'GPS tidak dapat diakses'}
            </div>
            <div style={{ fontSize:'.72rem', color:C.muted, marginTop:2 }}>
              {gpsStatus==='jauh' ? 'Absen hanya bisa dilakukan dalam radius 25 meter dari lokasi kantor.' : 'Izinkan akses lokasi di browser lalu coba lagi.'}
            </div>
          </div>
          <button onClick={() => setGpsStatus('idle')} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'.9rem' }}>✕</button>
        </div>
      )}
      {gpsStatus === 'ok' && (
        <div style={{ margin:'0 1.5rem 1.25rem', padding:'10px 14px', borderRadius:10, background:C.greenLight, border:`1.5px solid ${C.green}33`, display:'flex', alignItems:'center', gap:10 }}>
          <span>✅</span>
          <div style={{ fontSize:'.82rem', fontWeight:700, color:C.green }}>
            Absen {action === 'masuk' ? 'masuk' : 'pulang'} berhasil — {jarak}m dari kantor
          </div>
          <button onClick={() => setGpsStatus('idle')} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'.9rem' }}>✕</button>
        </div>
      )}
    </div>
  )
}

// ─── TEKNISI DASHBOARD ────────────────────────────────────────────────────────
function DashboardTeknisi({ name }: { name: string }) {
  const [jamMasuk,  setJamMasuk]  = useState<string | null>(null)
  const [jamPulang, setJamPulang] = useState<string | null>(null)

  const nowTime = () => new Date().toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })

  function hitungDurasi() {
    if (!jamMasuk) return null
    const base = new Date()
    const [mh, mm] = jamMasuk.split(':').map(Number)
    const start = new Date(base.getFullYear(), base.getMonth(), base.getDate(), mh, mm)
    const end = jamPulang
      ? (() => { const [ph, pm] = jamPulang.split(':').map(Number); return new Date(base.getFullYear(), base.getMonth(), base.getDate(), ph, pm) })()
      : new Date()
    const diff = Math.floor((end.getTime() - start.getTime()) / 60000)
    return diff >= 0 ? `${Math.floor(diff / 60)}j ${diff % 60}m` : null
  }

  const durasi = hitungDurasi()

  const myTickets = [
    { id:'TKT-046', pelanggan:'Hendra K.',   area:'Pusat', masalah:'Signal Lemah',   dbm:-27, offline:8,    status:'proses',  prio:'tinggi' },
    { id:'TKT-043', pelanggan:'CV Berkah',   area:'Barat', masalah:'Koneksi Lambat', dbm:-20, offline:null, status:'pending', prio:'sedang' },
    { id:'TKT-041', pelanggan:'Ahmad Rizky', area:'Utara', masalah:'Ganti ONU',      dbm:null,offline:null, status:'closed',  prio:'sedang' },
  ]
  const statusCfg: Record<string, { color: string; bg: string; label: string }> = {
    proses:  { color:C.blue,  bg:C.blueLight,  label:'Dalam Proses' },
    pending: { color:C.amber, bg:C.amberLight, label:'Pending'      },
    closed:  { color:C.green, bg:C.greenLight, label:'Selesai'      },
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>

      {/* ── KARTU ABSEN ── */}
      <AbsenCard name={name} jamMasuk={jamMasuk} jamPulang={jamPulang} durasi={durasi}
        onMasuk={() => setJamMasuk(nowTime())} onPulang={() => setJamPulang(nowTime())} />

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        <StatCard value={3}  label="Tiket Ditugaskan"   sub="Total aktif"         icon="🎫" color={C.orange} bg={C.orangeLight} />
        <StatCard value={1}  label="Sedang Dikerjakan"  sub="Status: Proses"      icon="🔧" color={C.blue}   bg={C.blueLight}   />
        <StatCard value={1}  label="Menunggu Konfirmasi"sub="Status: Pending"     icon="⏳" color={C.amber}  bg={C.amberLight}  />
        <StatCard value={61} label="Tiket Diselesaikan" sub="Total bulan ini"     icon="✅" color={C.green}  bg={C.greenLight}  />
      </div>

      {/* Tabel tiket */}
      <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
        <div style={{ background:'linear-gradient(90deg,#2563EB,#1D4ED8)', padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ fontSize:'1rem' }}>🔧</span>
          <span style={{ fontWeight:800, color:'#fff', fontSize:'1rem' }}>Tiket Saya — {name}</span>
          <span style={{ marginLeft:'auto', background:'rgba(255,255,255,.2)', color:'#fff', fontSize:'.72rem', fontWeight:700, padding:'3px 10px', borderRadius:100 }}>{myTickets.length} tiket aktif</span>
        </div>
        <table className="data-table">
          <thead><tr><th>No. Tiket</th><th>Pelanggan</th><th>Area</th><th>Masalah</th><th>Offline</th><th>dBm</th><th>Prioritas</th><th>Status</th><th>Aksi</th></tr></thead>
          <tbody>
            {myTickets.map(t => {
              const sc = statusCfg[t.status]
              return (
                <tr key={t.id}>
                  <td style={{ fontFamily:'var(--mono)', fontSize:'.75rem', fontWeight:700, color:C.orange }}>{t.id}</td>
                  <td style={{ fontWeight:600 }}>{t.pelanggan}</td>
                  <td style={{ fontSize:'.78rem', color:C.muted }}>{t.area}</td>
                  <td style={{ fontSize:'.8rem' }}>{t.masalah}</td>
                  <td style={{ fontFamily:'var(--mono)', fontSize:'.75rem', color: t.offline && t.offline>5 ? C.red : C.muted }}>{t.offline ? `${t.offline} mnt` : '—'}</td>
                  <td>{t.dbm ? <span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 7px', borderRadius:100, background: t.dbm<-26 ? C.redLight : C.amberLight, color: t.dbm<-26 ? C.red : C.amber }}>{t.dbm} dBm</span> : <span style={{ color:C.subtle, fontSize:'.75rem' }}>—</span>}</td>
                  <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background: t.prio==='tinggi' ? C.redLight : t.prio==='sedang' ? C.amberLight : C.greenLight, color: t.prio==='tinggi' ? C.red : t.prio==='sedang' ? C.amber : C.green }}>{t.prio}</span></td>
                  <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 9px', borderRadius:100, background:sc.bg, color:sc.color }}>{sc.label}</span></td>
                  <td>{t.status!=='closed' && <button style={{ padding:'4px 10px', background:C.greenLight, border:`1px solid ${C.green}33`, borderRadius:6, cursor:'pointer', fontSize:'.72rem', color:C.green, fontWeight:700, fontFamily:'var(--font)' }}>✅ Selesai</button>}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
        <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, padding:'1.25rem', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ fontWeight:800, fontSize:'.9rem', color:C.text, marginBottom:'1rem' }}>📡 Jadwal Penugasan Hari Ini</div>
          {[
            { waktu:'09:00', lokasi:'Jl. Hayam Wuruk 5', pekerjaan:'Cek ONU + sinyal', status:'selesai' },
            { waktu:'11:30', lokasi:'Jl. Ahmad Yani 3',  pekerjaan:'Cek koneksi lambat', status:'proses' },
            { waktu:'14:00', lokasi:'Jl. Sudirman 45',   pekerjaan:'Ganti kabel drop',  status:'belum'  },
          ].map((j,i) => (
            <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'10px 0', borderBottom: i<2 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ fontFamily:'var(--mono)', fontSize:'.75rem', color:C.muted, minWidth:44 }}>{j.waktu}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'.82rem', fontWeight:600 }}>{j.pekerjaan}</div>
                <div style={{ fontSize:'.72rem', color:C.muted, marginTop:2 }}>📍 {j.lokasi}</div>
              </div>
              <span style={{ fontSize:'.68rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background: j.status==='selesai' ? C.greenLight : j.status==='proses' ? C.blueLight : C.border, color: j.status==='selesai' ? C.green : j.status==='proses' ? C.blue : C.muted }}>{j.status}</span>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, padding:'1.25rem', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ fontWeight:800, fontSize:'.9rem', color:C.text, marginBottom:'1rem' }}>📊 Performa Bulan Ini</div>
          {[
            { label:'Tiket Diselesaikan',          value:'61',    color:C.green  },
            { label:'Rata-rata Waktu Penanganan',   value:'2.4 jam',color:C.blue  },
            { label:'Rating Kepuasan',              value:'4.8 ⭐', color:C.amber },
            { label:'Instalasi Baru',               value:'8 unit', color:C.teal  },
          ].map(s => (
            <div key={s.label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${C.border}` }}>
              <span style={{ fontSize:'.82rem', color:C.muted }}>{s.label}</span>
              <span style={{ fontFamily:'var(--mono)', fontWeight:800, color:s.color, fontSize:'.88rem' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── AGEN DASHBOARD ───────────────────────────────────────────────────────────
function DashboardAgen({ name }: { name: string }) {
  const pelangganAgen = [
    { nama:'Budi Santoso', paket:'Home 20Mbps', status:'lunas', area:'Pusat'  },
    { nama:'Ahmad Rizky',  paket:'Home 10Mbps', status:'lunas', area:'Utara'  },
    { nama:'Hendra K.',    paket:'Home 20Mbps', status:'belum', area:'Pusat'  },
    { nama:'Ibu Kartini',  paket:'Home 20Mbps', status:'belum', area:'Barat'  },
    { nama:'Pak Hasan',    paket:'Home 10Mbps', status:'lunas', area:'Timur'  },
  ]
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        <StatCard value={5}          label="Pelanggan Saya"   sub="Total di area Anda" icon="👥" color={C.green}  bg={C.greenLight}  />
        <StatCard value={3}          label="Sudah Bayar"       sub="Bulan ini"          icon="💳" color={C.blue}   bg={C.blueLight}   />
        <StatCard value={2}          label="Belum Bayar"       sub="Perlu ditagih"      icon="⚠️" color={C.red}    bg={C.redLight}    />
        <StatCard value="Rp 600.000" label="Komisi Bulan Ini" sub="3 transaksi"        icon="💰" color={C.orange} bg={C.orangeLight} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
        <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ background:'linear-gradient(90deg,#0D9488,#0F766E)', padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:'1rem' }}>👥</span>
            <span style={{ fontWeight:800, color:'#fff', fontSize:'.95rem' }}>Pelanggan Area Saya</span>
          </div>
          <table className="data-table">
            <thead><tr><th>Nama</th><th>Paket</th><th>Area</th><th>Status Bayar</th></tr></thead>
            <tbody>{pelangganAgen.map((p,i) => (
              <tr key={i}>
                <td style={{ fontWeight:600 }}>{p.nama}</td>
                <td style={{ fontSize:'.78rem', color:C.muted }}>{p.paket}</td>
                <td style={{ fontSize:'.75rem', color:C.muted }}>{p.area}</td>
                <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background: p.status==='lunas' ? C.greenLight : C.amberLight, color: p.status==='lunas' ? C.green : C.amber }}>{p.status==='lunas' ? '✓ Lunas' : 'Belum Bayar'}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
          <div style={{ background:C.orange, borderRadius:14, padding:'1.25rem', boxShadow:`0 4px 16px ${C.orange}35` }}>
            <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.85)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Setor Tunai Bulan Ini</div>
            <div style={{ fontSize:'2rem', fontWeight:900, color:'#fff', fontFamily:'var(--mono)' }}>Rp 1.800.000</div>
            <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.8)', marginTop:4 }}>3 pelanggan sudah bayar</div>
            <div style={{ marginTop:12, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(255,255,255,.2)', padding:'5px 12px', borderRadius:100, cursor:'pointer', fontSize:'.72rem', color:'#fff', fontWeight:700 }}>+ Catat Pembayaran</div>
          </div>
          <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, padding:'1.25rem', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
            <div style={{ fontWeight:800, fontSize:'.88rem', color:C.text, marginBottom:'.75rem' }}>💳 Metode Terima Bayar</div>
            {[{ icon:'💵', label:'Cash', desc:'Terima tunai lalu setor' },{ icon:'📱', label:'Transfer Bank', desc:'BCA / BRI ke rekening Niandri' }].map(m => (
              <div key={m.label} style={{ display:'flex', gap:10, alignItems:'center', padding:'8px 0', borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:'1.2rem' }}>{m.icon}</span>
                <div><div style={{ fontSize:'.82rem', fontWeight:700 }}>{m.label}</div><div style={{ fontSize:'.72rem', color:C.muted }}>{m.desc}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── PELANGGAN DASHBOARD ──────────────────────────────────────────────────────
function DashboardPelanggan({ name }: { name: string }) {
  const [showBayar, setShowBayar] = useState(false)
  const invoices = [
    { periode:'Mei 2026', jumlah:180000, status:'belum', jatuhTempo:'31 Mei 2026' },
    { periode:'Apr 2026', jumlah:180000, status:'lunas', tglBayar:'02 Apr 2026', metode:'Transfer BCA' },
    { periode:'Mar 2026', jumlah:180000, status:'lunas', tglBayar:'01 Mar 2026', metode:'Cash Agen'    },
  ]
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
        <div style={{ background:C.green, borderRadius:14, padding:'1.25rem', boxShadow:`0 4px 16px ${C.green}35` }}>
          <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.8)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Status Koneksi</div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:12, height:12, borderRadius:'50%', background:'#86EFAC', boxShadow:'0 0 10px #86EFAC' }} />
            <div style={{ fontSize:'1.4rem', fontWeight:900, color:'#fff' }}>Online</div>
          </div>
          <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.8)', marginTop:6 }}>Paket: Home 20Mbps</div>
          <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.7)', marginTop:2 }}>Sinyal: −18 dBm (Baik)</div>
        </div>
        <div style={{ background: invoices[0].status==='belum' ? C.red : C.blue, borderRadius:14, padding:'1.25rem', boxShadow:`0 4px 16px ${invoices[0].status==='belum' ? C.red : C.blue}35` }}>
          <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.8)', fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>Tagihan Bulan Ini</div>
          <div style={{ fontSize:'1.8rem', fontWeight:900, color:'#fff', fontFamily:'var(--mono)' }}>{fmt(invoices[0].jumlah)}</div>
          <div style={{ fontSize:'.78rem', color:'rgba(255,255,255,.8)', marginTop:4 }}>
            {invoices[0].status==='belum' ? `⚠️ Jatuh tempo: ${(invoices[0] as any).jatuhTempo}` : '✓ Sudah Dibayar'}
          </div>
          {invoices[0].status==='belum' && <button onClick={() => setShowBayar(true)} style={{ marginTop:10, background:'rgba(255,255,255,.25)', border:'1px solid rgba(255,255,255,.4)', borderRadius:8, padding:'6px 14px', color:'#fff', fontSize:'.75rem', fontWeight:700, cursor:'pointer', fontFamily:'var(--font)' }}>💳 Bayar Sekarang</button>}
        </div>
        <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, padding:'1.25rem', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
          <div style={{ fontWeight:800, fontSize:'.88rem', color:C.text, marginBottom:12 }}>📦 Info Paket</div>
          {[{ label:'Paket', value:'Home 20Mbps' },{ label:'Harga', value:'Rp 180.000/bln' },{ label:'Masa Aktif', value:'01–31 Mei 2026' },{ label:'IP Address', value:'10.8.1.45' }].map(s => (
            <div key={s.label} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:`1px solid ${C.border}`, fontSize:'.8rem' }}>
              <span style={{ color:C.muted }}>{s.label}</span><span style={{ fontWeight:700, color:C.text }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
        <div style={{ background:'linear-gradient(90deg,#F97316,#EA580C)', padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ fontSize:'1rem' }}>🧾</span><span style={{ fontWeight:800, color:'#fff', fontSize:'.95rem' }}>Riwayat Tagihan</span>
        </div>
        <table className="data-table">
          <thead><tr><th>Periode</th><th>Jumlah</th><th>Status</th><th>Tgl Bayar</th><th>Metode</th><th>Aksi</th></tr></thead>
          <tbody>{invoices.map((inv,i) => (
            <tr key={i}>
              <td style={{ fontWeight:600 }}>{inv.periode}</td>
              <td><span style={{ fontFamily:'var(--mono)', fontWeight:700, color:C.green }}>{fmt(inv.jumlah)}</span></td>
              <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 9px', borderRadius:100, background: inv.status==='lunas' ? C.greenLight : C.redLight, color: inv.status==='lunas' ? C.green : C.red }}>{inv.status==='lunas' ? '✓ Lunas' : '⚠️ Belum Bayar'}</span></td>
              <td style={{ fontSize:'.78rem', color:C.muted }}>{(inv as any).tglBayar ?? '—'}</td>
              <td style={{ fontSize:'.78rem', color:C.muted }}>{(inv as any).metode ?? '—'}</td>
              <td>{inv.status==='lunas' ? <button style={{ padding:'4px 10px', background:C.blueLight, border:`1px solid ${C.blue}33`, borderRadius:6, cursor:'pointer', fontSize:'.72rem', color:C.blue, fontWeight:700, fontFamily:'var(--font)' }}>🖨 Cetak</button> : <button onClick={() => setShowBayar(true)} style={{ padding:'4px 10px', background:C.orange, border:'none', borderRadius:6, cursor:'pointer', fontSize:'.72rem', color:'#fff', fontWeight:700, fontFamily:'var(--font)' }}>💳 Bayar</button>}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      {showBayar && (
        <div className="modal-overlay" onClick={() => setShowBayar(false)}>
          <div className="modal-box" style={{ width:460 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">💳 Pilih Metode Pembayaran</div>
              <button onClick={() => setShowBayar(false)} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'1rem' }}>✕</button>
            </div>
            <div className="modal-body" style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ background:C.orangeDim, border:`1.5px solid ${C.orangeLight}`, borderRadius:10, padding:'1rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:'.82rem', color:C.muted }}>Total Tagihan — Mei 2026</span>
                <span style={{ fontSize:'1.4rem', fontWeight:900, color:C.orange, fontFamily:'var(--mono)' }}>Rp 180.000</span>
              </div>
              {[
                { id:'cash',   icon:'💵', label:'Cash via Agen',   desc:'Bayar tunai ke agen terdekat',               color:'#16A34A' },
                { id:'bca',    icon:'🏦', label:'Transfer BCA',     desc:'No. Rek: 1234567890 a/n PT Niandri',         color:'#0055a4' },
                { id:'bri',    icon:'🏦', label:'Transfer BRI',     desc:'No. Rek: 0987654321 a/n PT Niandri',         color:'#003da5' },
                { id:'tripay', icon:'📱', label:'TriPay (VA/QRIS)', desc:'Virtual Account, QRIS, atau dompet digital', color:'#7C3AED' },
              ].map(m => (
                <div key={m.id} className="pay-method-card">
                  <div style={{ width:44, height:30, borderRadius:6, background:m.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.85rem', color:'#fff', fontWeight:800, flexShrink:0 }}>{m.icon}</div>
                  <div><div style={{ fontWeight:700, fontSize:'.85rem' }}>{m.label}</div><div style={{ fontSize:'.75rem', color:C.muted, marginTop:2 }}>{m.desc}</div></div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowBayar(false)}>Batal</button>
              <button className="btn-primary" onClick={() => setShowBayar(false)}>✅ Konfirmasi Pembayaran</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function DashboardModule() {
  const { user } = useAuth()

  const bannerRight = (user?.role==='superadmin' || user?.role==='admin') ? (
    <div style={{ display:'flex', gap:'1.5rem', alignItems:'center' }}>
      <div style={{ textAlign:'right' }}>
        <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.75)', marginBottom:3 }}>Pemasukan Bulan Ini</div>
        <div style={{ fontSize:'1.35rem', fontWeight:900, color:'#fff', fontFamily:'var(--mono)' }}>Rp 42.500.000</div>
        <div style={{ fontSize:'.7rem', color:'rgba(255,255,255,.7)', marginTop:2 }}>↑ 6.2% dari bulan lalu</div>
      </div>
      <div style={{ width:1, height:50, background:'rgba(255,255,255,.25)' }} />
      <div style={{ textAlign:'right' }}>
        <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.75)', marginBottom:3 }}>Pemasukan Hari Ini</div>
        <div style={{ fontSize:'1.35rem', fontWeight:900, color:'#fff', fontFamily:'var(--mono)' }}>Rp 1.300.000</div>
        <div style={{ fontSize:'.7rem', color:'rgba(255,255,255,.7)', marginTop:2 }}>7 transaksi</div>
      </div>
    </div>
  ) : undefined

  const subtitleMap: Record<string, string> = {
    superadmin: 'Sistem Informasi e-Billing PT. Niandri Network Solution',
    admin:      'Sistem Informasi e-Billing PT. Niandri Network Solution',
    teknisi:    'Portal Teknisi — Kelola tiket & jadwal penugasan Anda',
    agen:       'Portal Agen — Kelola pelanggan & pembayaran area Anda',
    pelanggan:  'Portal Pelanggan — Cek tagihan & status koneksi Anda',
  }

  return (
    <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1.5rem', background:C.bg }}>
      <WelcomeBanner name={user?.name ?? ''} subtitle={subtitleMap[user?.role ?? ''] ?? ''} right={bannerRight} />
      {(user?.role==='superadmin' || user?.role==='admin') && <DashboardAdmin />}
      {user?.role==='teknisi'   && <DashboardTeknisi  name={user.name} />}
      {user?.role==='agen'      && <DashboardAgen     name={user.name} />}
      {user?.role==='pelanggan' && <DashboardPelanggan name={user.name} />}
    </div>
  )
}
