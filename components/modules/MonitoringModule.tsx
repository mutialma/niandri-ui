'use client'
import { useState, useEffect, useRef } from 'react'

const C = {
  orange:'#F97316', orangeDark:'#EA580C', orangeLight:'#FFEDD5', orangeDim:'#FFF7ED',
  green:'#16A34A',  greenLight:'#DCFCE7',
  blue:'#2563EB',   blueLight:'#DBEAFE',
  red:'#DC2626',    redLight:'#FEE2E2',
  amber:'#D97706',  amberLight:'#FEF3C7',
  teal:'#0D9488',   tealLight:'#CCFBF1',
  purple:'#7C3AED', purpleLight:'#EDE9FE',
  text:'#1C1107',   muted:'#78716C', subtle:'#A8A29E',
  border:'#EDE9E3', bg:'#F8F7F4',
}

const PELANGGAN_DATA = [
  { id:'PLG-001', nama:'Budi Santoso',     area:'Pusat',   paket:'Home 20Mbps',   ip:'10.8.1.11', dbm:-18, status:'online',  uptime:'14d 3h',  rx:18.2, tx:2.1,  mac:'AA:BB:CC:11:22:33', onu:'HWTC-A1B2' },
  { id:'PLG-002', nama:'Sari Dewi',        area:'Utara',   paket:'Home 50Mbps',   ip:'10.8.1.12', dbm:-28, status:'warning', uptime:'2h 14m',  rx:42.1, tx:5.3,  mac:'AA:BB:CC:11:22:34', onu:'HWTC-B3C4' },
  { id:'PLG-003', nama:'PT Maju Jaya',     area:'Selatan', paket:'Bisnis 100M',   ip:'10.8.2.01', dbm:-17, status:'online',  uptime:'30d 1h',  rx:91.4, tx:18.7, mac:'AA:BB:CC:11:22:35', onu:'HWTC-D5E6' },
  { id:'PLG-004', nama:'Rina Putri',       area:'Timur',   paket:'Home 10Mbps',   ip:'10.8.1.41', dbm:null,status:'offline', uptime:'—',       rx:0,    tx:0,    mac:'AA:BB:CC:11:22:36', onu:'HWTC-F7G8' },
  { id:'PLG-005', nama:'CV Berkah',        area:'Barat',   paket:'Bisnis 50Mbps', ip:'10.8.2.05', dbm:-20, status:'online',  uptime:'7d 22h',  rx:46.8, tx:9.2,  mac:'AA:BB:CC:11:22:37', onu:'HWTC-H9I0' },
  { id:'PLG-006', nama:'Ahmad Rizky',      area:'Utara',   paket:'Home 10Mbps',   ip:'10.8.1.61', dbm:-19, status:'online',  uptime:'5d 10h',  rx:9.3,  tx:0.9,  mac:'AA:BB:CC:11:22:38', onu:'HWTC-J1K2' },
  { id:'PLG-007', nama:'Hendra K.',        area:'Pusat',   paket:'Home 20Mbps',   ip:'10.8.1.71', dbm:-27, status:'warning', uptime:'0h 8m',   rx:4.1,  tx:0.3,  mac:'AA:BB:CC:11:22:39', onu:'HWTC-L3M4' },
  { id:'PLG-008', nama:'Dewi Rahayu',      area:'Selatan', paket:'Home 20Mbps',   ip:'10.8.1.81', dbm:-16, status:'online',  uptime:'21d 6h',  rx:17.9, tx:1.8,  mac:'AA:BB:CC:11:22:40', onu:'HWTC-N5O6' },
  { id:'PLG-009', nama:'Pak Hasan',        area:'Timur',   paket:'Home 10Mbps',   ip:'10.8.1.91', dbm:null,status:'offline', uptime:'—',       rx:0,    tx:0,    mac:'AA:BB:CC:11:22:41', onu:'HWTC-P7Q8' },
  { id:'PLG-010', nama:'Ibu Kartini',      area:'Barat',   paket:'Home 20Mbps',   ip:'10.8.1.10', dbm:-21, status:'online',  uptime:'9d 4h',   rx:16.5, tx:1.6,  mac:'AA:BB:CC:11:22:42', onu:'HWTC-R9S0' },
  { id:'PLG-011', nama:'Joko Widodo',      area:'Pusat',   paket:'Home 20Mbps',   ip:'10.8.1.13', dbm:-22, status:'online',  uptime:'3d 7h',   rx:19.1, tx:2.3,  mac:'AA:BB:CC:11:22:43', onu:'HWTC-T1U2' },
  { id:'PLG-012', nama:'Siti Aisyah',      area:'Selatan', paket:'Home 10Mbps',   ip:'10.8.1.14', dbm:-29, status:'warning', uptime:'1h 3m',   rx:2.1,  tx:0.1,  mac:'AA:BB:CC:11:22:44', onu:'HWTC-V3W4' },
  { id:'PLG-013', nama:'Ridwan Kamil',     area:'Utara',   paket:'Bisnis 50Mbps', ip:'10.8.2.13', dbm:-15, status:'online',  uptime:'12d 10h', rx:48.2, tx:11.1, mac:'AA:BB:CC:11:22:45', onu:'HWTC-X5Y6' },
  { id:'PLG-014', nama:'Novita Sari',      area:'Barat',   paket:'Home 10Mbps',   ip:'10.8.1.15', dbm:null,status:'offline', uptime:'—',       rx:0,    tx:0,    mac:'AA:BB:CC:11:22:46', onu:'HWTC-Z7A8' },
  { id:'PLG-015', nama:'PT Sentosa Abadi', area:'Pusat',   paket:'Bisnis 100M',   ip:'10.8.2.15', dbm:-14, status:'online',  uptime:'25d 2h',  rx:95.7, tx:22.3, mac:'AA:BB:CC:11:22:47', onu:'HWTC-B9C0' },
]

const OLT_DATA = [
  { id:'OLT-01', nama:'OLT Main Pusat',   host:'192.168.1.1', status:'online',  uptime:'128d 4h', port:16, aktif:14, vendor:'ZTE C320'        },
  { id:'OLT-02', nama:'OLT Cabang Utara', host:'192.168.1.2', status:'online',  uptime:'45d 11h', port:8,  aktif:6,  vendor:'Huawei MA5608T'  },
  { id:'OLT-03', nama:'OLT Selatan',      host:'192.168.1.3', status:'warning', uptime:'2h 30m',  port:8,  aktif:3,  vendor:'ZTE C320'        },
  { id:'OLT-04', nama:'OLT Timur',        host:'192.168.1.4', status:'offline', uptime:'—',       port:4,  aktif:0,  vendor:'Huawei MA5608T'  },
]

const EVENT_LOG = [
  { time:'11:42', type:'offline', msg:'PLG-004 (Rina Putri) — PPPoE terputus',          area:'Timur'   },
  { time:'11:38', type:'warning', msg:'PLG-007 (Hendra K.) — dBm turun ke −27',         area:'Pusat'   },
  { time:'11:31', type:'offline', msg:'PLG-009 (Pak Hasan) — koneksi hilang',            area:'Timur'   },
  { time:'11:15', type:'warning', msg:'PLG-012 (Siti Aisyah) — sinyal lemah −29 dBm',   area:'Selatan' },
  { time:'11:00', type:'warning', msg:'OLT-03 (OLT Selatan) — uptime reset, cek fisik', area:'Selatan' },
  { time:'10:45', type:'online',  msg:'PLG-005 (CV Berkah) — koneksi pulih',             area:'Barat'   },
  { time:'10:30', type:'online',  msg:'PLG-011 (Joko Widodo) — terhubung',               area:'Pusat'   },
  { time:'09:58', type:'offline', msg:'PLG-014 (Novita Sari) — tidak merespons',          area:'Barat'   },
]

const KML_DATA = [{"id":"FDT 01","t":"FDT","lat":-7.5636792,"lng":112.6454883,"tot":2,"used":0},{"id":"FAT 12/03/04 DARWANTI","t":"ODP","lat":-7.5576238,"lng":112.6441583,"tot":8,"used":4},{"id":"FAT 12/03/02 SHOLEH","t":"ODP","lat":-7.557708,"lng":112.6468433,"tot":8,"used":5},{"id":"FAT-MULYADI 01/02/05","t":"ODP","lat":-7.5636512,"lng":112.6406431,"tot":8,"used":0},{"id":"FAT 12/03/03 ANTON","t":"ODP","lat":-7.5563861,"lng":112.6454459,"tot":4,"used":3},{"id":"FDC 01/02 GANTENG","t":"ODC","lat":-7.5630555,"lng":112.6425923,"tot":8,"used":0},{"id":"FAT 01/02/03 GARENG","t":"ODP","lat":-7.5607198,"lng":112.6440148,"tot":8,"used":1},{"id":"FAT YUDHA BENGKEL 11/07/01","t":"ODP","lat":-7.5601586,"lng":112.6494949,"tot":8,"used":4},{"id":"FAT RORO 11/02/01","t":"ODP","lat":-7.5623876,"lng":112.6490771,"tot":4,"used":4},{"id":"FAT LEK TUTIK 11/04/01","t":"ODP","lat":-7.5642339,"lng":112.6570585,"tot":8,"used":5},{"id":"FAT SAWOK 11/03/01","t":"ODP","lat":-7.5654677,"lng":112.6563627,"tot":8,"used":6},{"id":"FAT ROHMAN DATENG 09/02/03","t":"ODP","lat":-7.5647938,"lng":112.6514061,"tot":8,"used":3},{"id":"FDC 09/02 GAPURA","t":"ODC","lat":-7.5646413,"lng":112.649352,"tot":4,"used":2},{"id":"FAT BONAWI 04/01/01","t":"ODP","lat":-7.5664589,"lng":112.6487006,"tot":4,"used":3},{"id":"FAT MINHAJUL 09/04","t":"ODP","lat":-7.5668123,"lng":112.6480923,"tot":4,"used":3},{"id":"FAT KEVIN 04/01/03","t":"ODP","lat":-7.5687429,"lng":112.6478843,"tot":4,"used":2},{"id":"FAT ANIK 04/01/04","t":"ODP","lat":-7.5692771,"lng":112.647426,"tot":8,"used":1},{"id":"FAT IDA 04/01/05","t":"ODP","lat":-7.5691438,"lng":112.6466478,"tot":8,"used":6},{"id":"FAT ROBI 10/02/01","t":"ODP","lat":-7.5673854,"lng":112.6467605,"tot":8,"used":8},{"id":"FAT SUMARIYADI 10/03/01","t":"ODP","lat":-7.5674594,"lng":112.6471248,"tot":8,"used":5},{"id":"FAT OM DIKIN 10/01/01","t":"ODP","lat":-7.5670772,"lng":112.6459894,"tot":4,"used":3},{"id":"FAT LILIK 10/04/01","t":"ODP","lat":-7.5662469,"lng":112.6457245,"tot":8,"used":5},{"id":"FAT MASJID 09/01/01","t":"ODP","lat":-7.5654522,"lng":112.645977,"tot":8,"used":2},{"id":"FAT INDAH BIDAN 11/01/01","t":"ODP","lat":-7.5650946,"lng":112.6491496,"tot":8,"used":7},{"id":"FAT MAMIK 11/01/03","t":"ODP","lat":-7.5644842,"lng":112.6488973,"tot":8,"used":5},{"id":"FAT BABUR 01/02/04","t":"ODP","lat":-7.563389,"lng":112.6431863,"tot":8,"used":2},{"id":"FAT ARI JUNAEDI 11/07/02","t":"ODP","lat":-7.56081,"lng":112.6500284,"tot":4,"used":2},{"id":"FAT 02/01/01 JAYUS","t":"ODP","lat":-7.5603339,"lng":112.6345559,"tot":8,"used":1},{"id":"FDC 03/01","t":"ODC","lat":-7.5482309,"lng":112.6348068,"tot":8,"used":0},{"id":"FAT PAIKAN 11/01/02","t":"ODP","lat":-7.5650447,"lng":112.6476148,"tot":4,"used":4},{"id":"FDT 06","t":"FDT","lat":-7.5424243,"lng":112.6345343,"tot":4,"used":0},{"id":"FAT 06/01/04 ILHAM","t":"ODP","lat":-7.541264,"lng":112.6335279,"tot":8,"used":0},{"id":"FAT 06/01/01 TAMTO","t":"ODP","lat":-7.5424169,"lng":112.6345536,"tot":8,"used":0},{"id":"FAT 06/03/01 FARIS","t":"ODP","lat":-7.5433246,"lng":112.6385686,"tot":8,"used":0},{"id":"FAT 03/03/01 HENI","t":"ODP","lat":-7.5399533,"lng":112.6312528,"tot":8,"used":2},{"id":"FAT 05/01/04 HERU","t":"ODP","lat":-7.5530444,"lng":112.6109393,"tot":8,"used":7},{"id":"FAT BAGUS ANANTA 05/04/02","t":"ODP","lat":-7.5506154,"lng":112.6165799,"tot":8,"used":5},{"id":"FAT 08/05/01 BAMBANG","t":"ODP","lat":-7.5411404,"lng":112.6054675,"tot":8,"used":7},{"id":"FAT 08/03/04 SUBUR","t":"ODP","lat":-7.540581,"lng":112.6037145,"tot":8,"used":5},{"id":"FAT 08/07/01 NINIK","t":"ODP","lat":-7.5417947,"lng":112.6079408,"tot":8,"used":6},{"id":"FAT P PAWIT 10/01","t":"ODP","lat":-7.5663777,"lng":112.6463976,"tot":8,"used":8},{"id":"FAT 06/01/02 JUN","t":"ODP","lat":-7.5424422,"lng":112.6347962,"tot":8,"used":8},{"id":"FAT 08/07/02 MUHIDIN","t":"ODP","lat":-7.5421623,"lng":112.6092664,"tot":8,"used":9},{"id":"FAT CHALIM 09/01/02","t":"ODP","lat":-7.5656663,"lng":112.6467733,"tot":16,"used":9},{"id":"FDT 09 HSGQ","t":"FDT","lat":-7.5663832,"lng":112.6463648,"tot":8,"used":5},{"id":"FDC 09/01","t":"ODC","lat":-7.5654417,"lng":112.6459571,"tot":8,"used":2},{"id":"FDT 10 HIOSO","t":"FDT","lat":-7.5664069,"lng":112.6463581,"tot":4,"used":4},{"id":"FDC 10/01 OM DIKIN","t":"ODC","lat":-7.5670761,"lng":112.6460128,"tot":8,"used":0},{"id":"FDT 01 PORONG","t":"FDT","lat":-7.5500414,"lng":112.6593252,"tot":4,"used":3},{"id":"FAT 01/04/02 MISTRI","t":"ODP","lat":-7.5978296,"lng":112.5928908,"tot":8,"used":7},{"id":"ODP MASJID","t":"ODP","lat":-7.6028047,"lng":112.5864443,"tot":8,"used":0},{"id":"FAT 01/04/01 JUNAEDI","t":"ODP","lat":-7.5979719,"lng":112.5921614,"tot":8,"used":6},{"id":"FDT 11 BIDAN","t":"FDT","lat":-7.5651116,"lng":112.6491335,"tot":8,"used":0},{"id":"FDT 08 NGIJINGAN","t":"FDT","lat":-7.5350888,"lng":112.596735,"tot":8,"used":0}]

function dbmColor(dbm: number | null) {
  if (!dbm) return C.red
  if (dbm < -27) return C.red
  if (dbm < -24) return C.amber
  return C.green
}
function dbmBg(dbm: number | null) {
  if (!dbm) return C.redLight
  if (dbm < -27) return C.redLight
  if (dbm < -24) return C.amberLight
  return C.greenLight
}

function DetailModal({ p, onClose }: { p: typeof PELANGGAN_DATA[0]; onClose: () => void }) {
  const isOff = p.status === 'offline', isWarn = p.status === 'warning'
  const stColor = isOff ? C.red : isWarn ? C.amber : C.green
  const stBg    = isOff ? C.redLight : isWarn ? C.amberLight : C.greenLight
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ width:520 }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">📡 Detail Monitoring — {p.id}</div>
            <div style={{ fontSize:'.75rem', color: C.muted, marginTop:2 }}>{p.nama}</div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color: C.muted, fontSize:'1rem' }}>✕</button>
        </div>
        <div className="modal-body" style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ background: stBg, border:`1.5px solid ${stColor}33`, borderRadius:10, padding:'0.875rem 1rem', display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:12, height:12, borderRadius:'50%', background: stColor, boxShadow: isOff ? 'none' : `0 0 8px ${stColor}` }} />
            <div>
              <div style={{ fontWeight:800, color: stColor, textTransform:'capitalize' }}>{p.status}</div>
              <div style={{ fontSize:'.75rem', color: stColor, opacity:.8 }}>Uptime: {p.uptime}</div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { label:'ID Pelanggan', val: p.id    },
              { label:'Paket',        val: p.paket },
              { label:'IP Address',   val: p.ip    },
              { label:'Area',         val: p.area  },
              { label:'MAC Address',  val: p.mac   },
              { label:'ONU Model',    val: p.onu   },
            ].map(s => (
              <div key={s.label} style={{ background: C.bg, borderRadius:8, padding:'8px 12px' }}>
                <div style={{ fontSize:'.68rem', color: C.muted, fontWeight:700, textTransform:'uppercase', letterSpacing:'.05em', marginBottom:3 }}>{s.label}</div>
                <div style={{ fontFamily:'var(--mono)', fontSize:'.8rem', fontWeight:700, color: C.text }}>{s.val}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10 }}>
            <div style={{ background: dbmBg(p.dbm), border:`1.5px solid ${dbmColor(p.dbm)}33`, borderRadius:10, padding:'0.75rem', textAlign:'center' }}>
              <div style={{ fontSize:'.68rem', color: C.muted, fontWeight:700, textTransform:'uppercase', marginBottom:5 }}>Sinyal dBm</div>
              <div style={{ fontSize:'1.4rem', fontWeight:900, color: dbmColor(p.dbm), fontFamily:'var(--mono)' }}>{p.dbm ?? '—'}</div>
              <div style={{ fontSize:'.68rem', color: dbmColor(p.dbm), marginTop:3 }}>{p.dbm ? (p.dbm >= -24 ? 'Baik' : p.dbm >= -27 ? 'Lemah' : 'Kritis') : 'N/A'}</div>
            </div>
            <div style={{ background: C.tealLight, border:`1.5px solid ${C.teal}33`, borderRadius:10, padding:'0.75rem', textAlign:'center' }}>
              <div style={{ fontSize:'.68rem', color: C.muted, fontWeight:700, textTransform:'uppercase', marginBottom:5 }}>Rx (Mbps)</div>
              <div style={{ fontSize:'1.4rem', fontWeight:900, color: C.teal, fontFamily:'var(--mono)' }}>{p.rx || '—'}</div>
            </div>
            <div style={{ background: C.purpleLight, border:`1.5px solid ${C.purple}33`, borderRadius:10, padding:'0.75rem', textAlign:'center' }}>
              <div style={{ fontSize:'.68rem', color: C.muted, fontWeight:700, textTransform:'uppercase', marginBottom:5 }}>Tx (Mbps)</div>
              <div style={{ fontSize:'1.4rem', fontWeight:900, color: C.purple, fontFamily:'var(--mono)' }}>{p.tx || '—'}</div>
            </div>
          </div>
          {p.dbm && (
            <div>
              <div style={{ fontSize:'.72rem', color: C.muted, marginBottom:5 }}>Level Sinyal (baik: &gt; −24 | lemah: −24~−27 | kritis: &lt; −27)</div>
              <div style={{ height:10, background: C.border, borderRadius:5, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${Math.max(0,Math.min(100,((p.dbm+35)/25)*100))}%`, background: dbmColor(p.dbm), borderRadius:5 }} />
              </div>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Tutup</button>
          {(isOff || isWarn) && <button className="btn-primary">🎫 Buat Tiket Gangguan</button>}
        </div>
      </div>
    </div>
  )
}

function MapMonitoring() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  useEffect(() => {
    if (mapInstance.current || !mapRef.current) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
    script.onload = () => {
      const L = (window as any).L
      const map = L.map(mapRef.current, { center:[-7.557,112.624], zoom:12 })
      mapInstance.current = map
      L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        subdomains:['mt0','mt1','mt2','mt3'], attribution:'© Google Satellite', maxZoom:20
      }).addTo(map)
      KML_DATA.forEach(d => {
        const pct = d.tot > 0 ? d.used/d.tot : 0
        const color = d.t==='ODC' ? '#7C3AED' : d.t==='FDT' ? '#1D4ED8' :
                      pct>=1 ? '#DC2626' : pct>=0.75 ? '#D97706' : '#16A34A'
        const size = d.t==='FDT' ? 14 : d.t==='ODC' ? 12 : 9
        const icon = L.divIcon({ className:'', html:`<div style="width:${size}px;height:${size}px;border-radius:${d.t==='FDT'?'3px':'50%'};background:${color};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);"></div>`, iconSize:[size,size], iconAnchor:[size/2,size/2] })
        L.marker([d.lat,d.lng],{icon}).bindTooltip(`<b>${d.id}</b><br>${d.t} | ${d.used}/${d.tot} slot`,{direction:'top',offset:[0,-size/2]}).addTo(map)
      })
    }
    document.head.appendChild(script)
  }, [])
  return <div ref={mapRef} style={{ height:420, width:'100%' }} />
}

export default function MonitoringModule() {
  const [tab, setTab]           = useState<'pelanggan'|'olt'|'peta'|'log'>('pelanggan')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState<typeof PELANGGAN_DATA[0]|null>(null)
  const [, setTick]             = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTick(n => n+1), 30000)
    return () => clearInterval(t)
  }, [])

  const online  = PELANGGAN_DATA.filter(p => p.status==='online').length
  const warning = PELANGGAN_DATA.filter(p => p.status==='warning').length
  const offline = PELANGGAN_DATA.filter(p => p.status==='offline').length

  const filtered = PELANGGAN_DATA.filter(p => {
    const q = search.toLowerCase()
    const matchStatus = statusFilter==='Semua' || p.status===statusFilter.toLowerCase()
    const matchSearch = !q || p.nama.toLowerCase().includes(q) || p.ip.includes(q) || p.id.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const now = new Date().toLocaleTimeString('id-ID',{hour:'2-digit',minute:'2-digit',second:'2-digit'})

  return (
    <div style={{ padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1.25rem', background: C.bg }}>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        {[
          { label:'Total Pelanggan', val: PELANGGAN_DATA.length, color: C.blue,  bg: C.blueLight,  dot: null      },
          { label:'Online',          val: online,                color: C.green, bg: C.greenLight, dot: '#86EFAC' },
          { label:'Warning / Lemah', val: warning,               color: C.amber, bg: C.amberLight, dot: '#FCD34D' },
          { label:'Offline',         val: offline,               color: C.red,   bg: C.redLight,   dot: C.red     },
        ].map(s => (
          <div key={s.label} style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, padding:'1rem 1.25rem', boxShadow:'0 1px 4px rgba(0,0,0,.05)', display:'flex', alignItems:'center', gap:12 }}>
            {s.dot && <div style={{ width:12, height:12, borderRadius:'50%', background: s.dot, boxShadow:`0 0 8px ${s.dot}`, flexShrink:0 }} />}
            <div>
              <div style={{ fontSize:'1.75rem', fontWeight:900, color: s.color, fontFamily:'var(--mono)', lineHeight:1 }}>{s.val}</div>
              <div style={{ fontSize:'.78rem', color: C.muted, marginTop:4 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Live bar */}
      <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:12, padding:'0.75rem 1.25rem', display:'flex', alignItems:'center', gap:10, boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
        <div style={{ width:8, height:8, borderRadius:'50%', background: C.green, boxShadow:`0 0 6px ${C.green}` }} />
        <span style={{ fontSize:'.78rem', fontWeight:700, color: C.green }}>LIVE</span>
        <span style={{ fontSize:'.75rem', color: C.muted }}>Auto-refresh 30 detik · Terakhir: {now}</span>
        {offline > 0 && (
          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:6, background: C.redLight, border:`1px solid ${C.red}33`, borderRadius:100, padding:'4px 12px' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background: C.red }} />
            <span style={{ fontSize:'.72rem', fontWeight:700, color: C.red }}>{offline} pelanggan offline — butuh tindakan</span>
          </div>
        )}
      </div>

      {/* Main card */}
      <div style={{ background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:14, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,.05)' }}>
        {/* Tab header */}
        <div style={{ background:'linear-gradient(90deg,#0D9488,#0F766E)', padding:'1rem 1.5rem', display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
          <span style={{ fontSize:'1rem' }}>📡</span>
          <span style={{ fontWeight:800, color:'#fff', fontSize:'.95rem', marginRight:8 }}>Monitoring Live</span>
          {([
            { key:'pelanggan', label:'👥 Status Pelanggan' },
            { key:'olt',       label:'🖥️ Status OLT'       },
            { key:'peta',      label:'🗺️ Peta Jaringan'    },
            { key:'log',       label:'📋 Event Log'        },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ padding:'5px 14px', background: tab===t.key ? 'rgba(255,255,255,.25)' : 'transparent', border:`1.5px solid ${tab===t.key ? 'rgba(255,255,255,.6)' : 'rgba(255,255,255,.25)'}`, borderRadius:100, cursor:'pointer', color:'#fff', fontSize:'.75rem', fontWeight:700, fontFamily:'var(--font)', transition:'all .15s' }}>{t.label}</button>
          ))}
        </div>

        {/* Tab: Pelanggan */}
        {tab === 'pelanggan' && (
          <div>
            <div style={{ padding:'0.875rem 1.5rem', borderBottom:`1.5px solid ${C.border}`, display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
              {['Semua','Online','Warning','Offline'].map(f => (
                <button key={f} onClick={() => setStatusFilter(f)} style={{ padding:'5px 14px', background: statusFilter===f ? C.teal : 'transparent', border:`1.5px solid ${statusFilter===f ? C.teal : C.border}`, borderRadius:100, cursor:'pointer', color: statusFilter===f ? '#fff' : C.muted, fontSize:'.75rem', fontWeight:700, fontFamily:'var(--font)', transition:'all .15s' }}>
                  {f==='Online' ? `🟢 ${f}` : f==='Warning' ? `🟡 ${f}` : f==='Offline' ? `🔴 ${f}` : f}
                </button>
              ))}
              <div style={{ marginLeft:'auto', position:'relative' }}>
                <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', fontSize:'.8rem', color: C.subtle }}>🔍</span>
                <input className="form-input" placeholder="Cari nama, ID, IP..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ paddingLeft:30, width:220, height:34, fontSize:'.8rem' }} />
              </div>
            </div>
            <div style={{ overflowX:'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>No</th><th>Status</th><th>ID</th><th>Nama Pelanggan</th><th>Area</th>
                    <th>Paket</th><th>IP Address</th><th>dBm</th><th>Uptime</th>
                    <th>Rx (Mbps)</th><th>Tx (Mbps)</th><th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => {
                    const isOff = p.status==='offline', isWarn = p.status==='warning'
                    return (
                      <tr key={p.id} style={{ background: isOff ? '#FFF5F5' : isWarn ? '#FFFBEB' : 'transparent' }}>
                        <td style={{ color: C.subtle, fontFamily:'var(--mono)', fontSize:'.75rem' }}>{i+1}</td>
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                            <div style={{ width:9, height:9, borderRadius:'50%', background: isOff ? C.red : isWarn ? C.amber : C.green, boxShadow: isOff ? 'none' : `0 0 6px ${isWarn ? C.amber : C.green}` }} />
                            <span style={{ fontSize:'.72rem', fontWeight:700, color: isOff ? C.red : isWarn ? C.amber : C.green, textTransform:'capitalize' }}>{p.status}</span>
                          </div>
                        </td>
                        <td style={{ fontFamily:'var(--mono)', fontSize:'.75rem', color: C.orange, fontWeight:700 }}>{p.id}</td>
                        <td style={{ fontWeight:600 }}>{p.nama}</td>
                        <td><span style={{ fontSize:'.72rem', background: C.blueLight, color: C.blue, fontWeight:700, padding:'2px 7px', borderRadius:100 }}>{p.area}</span></td>
                        <td style={{ fontSize:'.75rem', color: C.muted }}>{p.paket}</td>
                        <td style={{ fontFamily:'var(--mono)', fontSize:'.75rem' }}>{p.ip}</td>
                        <td>
                          {p.dbm
                            ? <span style={{ fontSize:'.72rem', fontWeight:700, padding:'2px 7px', borderRadius:100, background: dbmBg(p.dbm), color: dbmColor(p.dbm) }}>{p.dbm} dBm</span>
                            : <span style={{ color: C.subtle, fontSize:'.75rem' }}>—</span>
                          }
                        </td>
                        <td style={{ fontFamily:'var(--mono)', fontSize:'.78rem', color: C.muted }}>{p.uptime}</td>
                        <td><span style={{ fontFamily:'var(--mono)', fontWeight:700, color: C.teal, fontSize:'.8rem' }}>{p.rx > 0 ? p.rx : '—'}</span></td>
                        <td><span style={{ fontFamily:'var(--mono)', fontWeight:700, color: C.purple, fontSize:'.8rem' }}>{p.tx > 0 ? p.tx : '—'}</span></td>
                        <td>
                          <div style={{ display:'flex', gap:4 }}>
                            <button onClick={() => setSelected(p)} title="Detail" style={{ width:28, height:28, borderRadius:7, background: C.blueLight, border:`1px solid ${C.blue}33`, cursor:'pointer', fontSize:'.75rem', display:'flex', alignItems:'center', justifyContent:'center' }}>👁</button>
                            {(isOff || isWarn) && (
                              <button title="Buat Tiket" style={{ width:28, height:28, borderRadius:7, background: isOff ? C.redLight : C.amberLight, border:`1px solid ${isOff ? C.red : C.amber}33`, cursor:'pointer', fontSize:'.75rem', display:'flex', alignItems:'center', justifyContent:'center' }}>🎫</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: OLT */}
        {tab === 'olt' && (
          <div>
            <div style={{ padding:'1rem 1.5rem', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', borderBottom:`1.5px solid ${C.border}` }}>
              {OLT_DATA.map(olt => {
                const isOff = olt.status==='offline', isWarn = olt.status==='warning'
                const stColor = isOff ? C.red : isWarn ? C.amber : C.green
                const stBg    = isOff ? C.redLight : isWarn ? C.amberLight : C.greenLight
                return (
                  <div key={olt.id} style={{ background:'#fff', border:`1.5px solid ${isOff ? C.red : isWarn ? C.amber : C.border}`, borderRadius:12, overflow:'hidden', boxShadow: isOff ? `0 4px 16px ${C.red}20` : '0 1px 4px rgba(0,0,0,.05)' }}>
                    <div style={{ background: stBg, padding:'0.75rem 1rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontWeight:800, fontSize:'.82rem', color: stColor }}>{olt.nama}</span>
                      <div style={{ width:9, height:9, borderRadius:'50%', background: stColor, boxShadow: isOff ? 'none' : `0 0 6px ${stColor}` }} />
                    </div>
                    <div style={{ padding:'0.875rem 1rem', display:'flex', flexDirection:'column', gap:6 }}>
                      {[
                        { label:'Host',   val: olt.host   },
                        { label:'Vendor', val: olt.vendor },
                        { label:'Uptime', val: olt.uptime },
                        { label:'Port',   val: `${olt.aktif}/${olt.port} aktif` },
                      ].map(s => (
                        <div key={s.label} style={{ display:'flex', justifyContent:'space-between', fontSize:'.78rem' }}>
                          <span style={{ color: C.muted }}>{s.label}</span>
                          <span style={{ fontWeight:700, fontFamily:'var(--mono)', fontSize:'.75rem' }}>{s.val}</span>
                        </div>
                      ))}
                      <div style={{ marginTop:4, height:6, background: C.border, borderRadius:3, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${(olt.aktif/olt.port)*100}%`, background: stColor, borderRadius:3 }} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ overflowX:'auto' }}>
              <table className="data-table">
                <thead><tr><th>OLT</th><th>Host</th><th>Vendor</th><th>Status</th><th>Uptime</th><th>Port Aktif</th><th>Utilisasi</th></tr></thead>
                <tbody>
                  {OLT_DATA.map(olt => {
                    const isOff = olt.status==='offline', isWarn = olt.status==='warning'
                    const stColor = isOff ? C.red : isWarn ? C.amber : C.green
                    const pct = Math.round((olt.aktif/olt.port)*100)
                    return (
                      <tr key={olt.id} style={{ background: isOff ? '#FFF5F5' : isWarn ? '#FFFBEB' : 'transparent' }}>
                        <td style={{ fontWeight:700 }}>{olt.nama}</td>
                        <td style={{ fontFamily:'var(--mono)', fontSize:'.78rem' }}>{olt.host}</td>
                        <td style={{ fontSize:'.78rem', color: C.muted }}>{olt.vendor}</td>
                        <td><span style={{ fontSize:'.7rem', fontWeight:700, padding:'2px 9px', borderRadius:100, background: isOff ? C.redLight : isWarn ? C.amberLight : C.greenLight, color: stColor, textTransform:'capitalize' }}>{olt.status}</span></td>
                        <td style={{ fontFamily:'var(--mono)', fontSize:'.78rem', color: C.muted }}>{olt.uptime}</td>
                        <td style={{ fontFamily:'var(--mono)', fontWeight:700, color: stColor }}>{olt.aktif} / {olt.port}</td>
                        <td style={{ minWidth:100 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <div style={{ flex:1, height:6, background: C.border, borderRadius:3, overflow:'hidden' }}>
                              <div style={{ height:'100%', width:`${pct}%`, background: stColor, borderRadius:3 }} />
                            </div>
                            <span style={{ fontSize:'.72rem', fontFamily:'var(--mono)', color: stColor, fontWeight:700 }}>{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: Peta */}
        {tab === 'peta' && (
          <div>
            <div style={{ padding:'0.875rem 1.25rem', borderBottom:`1px solid ${C.border}`, display:'flex', gap:16, alignItems:'center', fontSize:'.75rem', color: C.muted, flexWrap:'wrap' }}>
              {[
                { color:'#16A34A', label:'ODP Tersedia', sq:false },
                { color:'#D97706', label:'ODP ≥75%',     sq:false },
                { color:'#DC2626', label:'ODP Penuh',    sq:false },
                { color:'#7C3AED', label:'ODC/FDC',      sq:false },
                { color:'#1D4ED8', label:'FDT',          sq:true  },
              ].map(l => (
                <div key={l.label} style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <div style={{ width:10, height:10, borderRadius: l.sq ? 2 : '50%', background: l.color, border:'1.5px solid #fff', boxShadow:'0 1px 3px rgba(0,0,0,.3)' }} />
                  <span>{l.label}</span>
                </div>
              ))}
              <span style={{ marginLeft:'auto', fontSize:'.72rem', color: C.subtle }}>Data: KML MASTER DISTRIBUSI KABEL</span>
            </div>
            <MapMonitoring />
          </div>
        )}

        {/* Tab: Event Log */}
        {tab === 'log' && (
          <div>
            <div style={{ padding:'0.875rem 1.5rem', borderBottom:`1.5px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:'.82rem', fontWeight:700, color: C.text }}>Event hari ini — {new Date().toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long'})}</span>
              <span style={{ fontSize:'.72rem', color: C.subtle }}>{EVENT_LOG.length} event tercatat</span>
            </div>
            <div style={{ padding:'1rem 1.5rem', display:'flex', flexDirection:'column', gap:0 }}>
              {EVENT_LOG.map((e, i) => {
                const color = e.type==='offline' ? C.red : e.type==='warning' ? C.amber : C.green
                const bg    = e.type==='offline' ? C.redLight : e.type==='warning' ? C.amberLight : C.greenLight
                const icon  = e.type==='offline' ? '🔴' : e.type==='warning' ? '🟡' : '🟢'
                return (
                  <div key={i} style={{ display:'flex', gap:14, alignItems:'flex-start', padding:'10px 0', borderBottom: i < EVENT_LOG.length-1 ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ fontFamily:'var(--mono)', fontSize:'.75rem', color: C.subtle, minWidth:42, paddingTop:2 }}>{e.time}</div>
                    <div style={{ width:28, height:28, borderRadius:'50%', background: bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.8rem', flexShrink:0 }}>{icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'.82rem', color: C.text }}>{e.msg}</div>
                      <div style={{ fontSize:'.72rem', color: C.muted, marginTop:2 }}>Area: {e.area}</div>
                    </div>
                    <span style={{ fontSize:'.68rem', fontWeight:700, padding:'2px 8px', borderRadius:100, background: bg, color, textTransform:'capitalize', flexShrink:0 }}>{e.type}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {selected && <DetailModal p={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
