'use client'
import { useState } from 'react'

// ─── Light Theme Tokens ─────────────────────────────────
const L = {
  bg:       '#F5F7FA',
  surface:  '#FFFFFF',
  surface2: '#F0F2F5',
  border:   '#E2E8F0',
  border2:  '#CBD5E1',
  brand:    '#16A34A',
  brandDim: '#DCFCE7',
  blue:     '#2563EB',
  blueDim:  '#DBEAFE',
  amber:    '#D97706',
  amberDim: '#FEF3C7',
  red:      '#DC2626',
  redDim:   '#FEE2E2',
  purple:   '#7C3AED',
  purpleDim:'#EDE9FE',
  text:     '#0F172A',
  muted:    '#64748B',
  subtle:   '#94A3B8',
  shadow:   '0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.05)',
  shadowMd: '0 4px 16px rgba(0,0,0,.08)',
}

const SUB_MENUS = [
  { id: 'pembayaran_langganan', icon: '💳', label: 'Pembayaran Langganan',   color: L.brand,  bgColor: L.brandDim },
  { id: 'data_mutasi',          icon: '🔄', label: 'Data Mutasi',            color: L.blue,   bgColor: L.blueDim  },
  { id: 'pembayaran_umum',      icon: '🧾', label: 'Pembayaran Umum',        color: L.purple, bgColor: L.purpleDim},
  { id: 'setor_tunai',          icon: '💵', label: 'Setor Tunai',            color: L.brand,  bgColor: L.brandDim },
  { id: 'tagihan_manual',       icon: '📝', label: 'Tagihan Manual',         color: L.amber,  bgColor: L.amberDim },
  { id: 'pemasukan_lain',       icon: '📥', label: 'Pemasukan Lain Lain',    color: L.blue,   bgColor: L.blueDim  },
  { id: 'pengeluaran',          icon: '📤', label: 'Pengeluaran',            color: L.red,    bgColor: L.redDim   },
  { id: 'po_penawaran',         icon: '📋', label: 'PO | Penawaran Harga',   color: L.purple, bgColor: L.purpleDim},
  { id: 'data_akun',            icon: '🏦', label: 'Data Akun',              color: L.brand,  bgColor: L.brandDim },
  { id: 'pengumuman',           icon: '📢', label: 'Pengumuman',             color: L.amber,  bgColor: L.amberDim },
  { id: 'status_langganan',     icon: '📶', label: 'Status Langganan',       color: L.blue,   bgColor: L.blueDim  },
  { id: 'data_wa',              icon: '💬', label: 'Data WA',                color: L.brand,  bgColor: L.brandDim },
]

// ─── Sub-page renderers ─────────────────────────────────

function PembayaranLangganan() {
  const [search, setSearch] = useState('')
  const data = [
    { id: 'TRX-001', pelanggan: 'Budi Santoso',  paket: 'Home 20Mbps',  jumlah: 180000, metode: 'Cash Agen',    tgl: '02 Mei 2025', status: 'lunas' },
    { id: 'TRX-002', pelanggan: 'Sari Dewi',     paket: 'Home 50Mbps',  jumlah: 250000, metode: 'Transfer BCA', tgl: '01 Mei 2025', status: 'lunas' },
    { id: 'TRX-003', pelanggan: 'PT Maju Jaya',  paket: 'Bisnis 100M',  jumlah: 750000, metode: 'TriPay VA',    tgl: '30 Apr 2025', status: 'lunas' },
    { id: 'TRX-004', pelanggan: 'Ahmad Rizky',   paket: 'Home 10Mbps',  jumlah: 120000, metode: 'Transfer BRI', tgl: '28 Apr 2025', status: 'lunas' },
    { id: 'TRX-005', pelanggan: 'Hendra K.',     paket: 'Home 20Mbps',  jumlah: 180000, metode: '-',            tgl: '-',           status: 'belum' },
    { id: 'TRX-006', pelanggan: 'CV Berkah',     paket: 'Bisnis 50Mbps',jumlah: 500000, metode: 'TriPay QRIS',  tgl: '27 Apr 2025', status: 'lunas' },
  ]
  const filtered = data.filter(d => d.pelanggan.toLowerCase().includes(search.toLowerCase()))
  const total = filtered.filter(d => d.status === 'lunas').reduce((s, d) => s + d.jumlah, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { label: 'Total Terkumpul', value: 'Rp ' + total.toLocaleString('id-ID'), color: L.brand },
          { label: 'Sudah Bayar',     value: filtered.filter(d => d.status === 'lunas').length + ' pelanggan', color: L.blue },
          { label: 'Belum Bayar',     value: filtered.filter(d => d.status === 'belum').length + ' pelanggan', color: L.red },
        ].map(s => (
          <div key={s.label} style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1rem', boxShadow: L.shadow }}>
            <div style={{ fontSize: '.72rem', color: L.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input style={{ ...inputStyle, maxWidth: 280 }} placeholder="🔍 Cari pelanggan..." value={search} onChange={e => setSearch(e.target.value)} />
        <button style={btnPrimary}>+ Catat Pembayaran</button>
      </div>
      <LightTable
        headers={['ID','Pelanggan','Paket','Jumlah','Metode','Tanggal','Status']}
        rows={filtered.map(d => [
          <span key="id" style={{ fontFamily: 'monospace', fontSize: '.72rem', color: L.muted }}>{d.id}</span>,
          <span key="p" style={{ fontWeight: 600 }}>{d.pelanggan}</span>,
          d.paket,
          <span key="j" style={{ fontFamily: 'monospace', fontWeight: 700, color: L.brand }}>Rp {d.jumlah.toLocaleString('id-ID')}</span>,
          d.metode,
          d.tgl,
          <Badge key="s" color={d.status === 'lunas' ? 'green' : 'red'}>{d.status === 'lunas' ? '✓ Lunas' : 'Belum'}</Badge>
        ])}
      />
    </div>
  )
}

function DataMutasi() {
  const data = [
    { tgl: '03 Mei 2025', keterangan: 'Pembayaran Langganan — Budi Santoso',   debit: 180000,  kredit: 0,      saldo: 5180000 },
    { tgl: '02 Mei 2025', keterangan: 'Pengeluaran Operasional — Bandwidth',  debit: 0,       kredit: 850000, saldo: 5000000 },
    { tgl: '01 Mei 2025', keterangan: 'Pembayaran Langganan — Sari Dewi',      debit: 250000,  kredit: 0,      saldo: 5850000 },
    { tgl: '30 Apr 2025', keterangan: 'Setor Tunai dari Agen — Ahmad',         debit: 600000,  kredit: 0,      saldo: 5600000 },
    { tgl: '29 Apr 2025', keterangan: 'Pengeluaran Gaji Teknisi',              debit: 0,       kredit: 1500000,saldo: 5000000 },
  ]
  return (
    <LightTable
      headers={['Tanggal','Keterangan','Debit (Masuk)','Kredit (Keluar)','Saldo']}
      rows={data.map(d => [
        d.tgl,
        d.keterangan,
        d.debit > 0 ? <span key="db" style={{ color: L.brand, fontWeight: 700, fontFamily: 'monospace' }}>+ Rp {d.debit.toLocaleString('id-ID')}</span> : '—',
        d.kredit > 0 ? <span key="kr" style={{ color: L.red, fontWeight: 700, fontFamily: 'monospace' }}>- Rp {d.kredit.toLocaleString('id-ID')}</span> : '—',
        <span key="s" style={{ fontFamily: 'monospace', fontWeight: 600 }}>Rp {d.saldo.toLocaleString('id-ID')}</span>
      ])}
    />
  )
}

function PembayaranUmum() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={btnPrimary}>+ Tambah Pembayaran Umum</button>
      </div>
      <LightTable
        headers={['Tanggal','Pelanggan','Jenis','Jumlah','Metode','Status']}
        rows={[
          ['02 Mei 2025','Ahmad Rizky','Pasang Baru', <span key="j" style={{fontFamily:'monospace',color:L.brand,fontWeight:700}}>Rp 350.000</span>, 'Cash', <Badge key="s" color="green">Lunas</Badge>],
          ['01 Mei 2025','Rina Putri','Relokasi ONU', <span key="j" style={{fontFamily:'monospace',color:L.brand,fontWeight:700}}>Rp 100.000</span>, 'Transfer BCA', <Badge key="s" color="green">Lunas</Badge>],
          ['28 Apr 2025','Hendra K.','Ganti ONU',    <span key="j" style={{fontFamily:'monospace',color:L.amber,fontWeight:700}}>Rp 200.000</span>, '-', <Badge key="s" color="amber">Pending</Badge>],
        ]}
      />
    </div>
  )
}

function SetorTunai() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={btnPrimary}>+ Catat Setor Tunai</button>
      </div>
      <LightTable
        headers={['Tanggal','Dari Agen','Jumlah','Diterima Oleh','Bukti','Status']}
        rows={[
          ['03 Mei 2025','Agen Maju Jaya', <span key="j" style={{fontFamily:'monospace',color:L.brand,fontWeight:700}}>Rp 1.200.000</span>,'Admin Utama','Foto #1', <Badge key="s" color="green">Dikonfirmasi</Badge>],
          ['01 Mei 2025','Agen Berkah',    <span key="j" style={{fontFamily:'monospace',color:L.brand,fontWeight:700}}>Rp 850.000</span>, 'Admin Utama','Foto #2', <Badge key="s" color="green">Dikonfirmasi</Badge>],
          ['29 Apr 2025','Agen Maju Jaya', <span key="j" style={{fontFamily:'monospace',color:L.amber,fontWeight:700}}>Rp 600.000</span>, '-','Belum', <Badge key="s" color="amber">Menunggu</Badge>],
        ]}
      />
    </div>
  )
}

function TagihanManual() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={btnPrimary} onClick={() => setShowModal(true)}>+ Buat Tagihan Manual</button>
      </div>
      <LightTable
        headers={['No.','Pelanggan','Deskripsi','Jumlah','Jatuh Tempo','Status']}
        rows={[
          ['TGH-001','PT Maju Jaya','Biaya Instalasi Tambahan',<span key="j" style={{fontFamily:'monospace',color:L.brand,fontWeight:700}}>Rp 500.000</span>,'10 Mei 2025',<Badge key="s" color="amber">Belum</Badge>],
          ['TGH-002','Sari Dewi',   'Penggantian Kabel Drop',  <span key="j" style={{fontFamily:'monospace',color:L.green,fontWeight:700}}>Rp 75.000</span>,'01 Mei 2025', <Badge key="s" color="green">Lunas</Badge>],
        ]}
      />
      {showModal && (
        <LightModal title="Buat Tagihan Manual" onClose={() => setShowModal(false)}>
          <LightFormGroup label="Pelanggan"><select style={inputStyle}><option>Budi Santoso</option><option>Sari Dewi</option><option>PT Maju Jaya</option></select></LightFormGroup>
          <LightFormGroup label="Deskripsi"><input style={inputStyle} placeholder="Keterangan tagihan..." /></LightFormGroup>
          <LightFormGroup label="Jumlah (Rp)"><input style={inputStyle} type="number" placeholder="150000" /></LightFormGroup>
          <LightFormGroup label="Jatuh Tempo"><input style={inputStyle} type="date" /></LightFormGroup>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button style={btnSecondary} onClick={() => setShowModal(false)}>Batal</button>
            <button style={btnPrimary} onClick={() => setShowModal(false)}>💾 Simpan Tagihan</button>
          </div>
        </LightModal>
      )}
    </div>
  )
}

function PemasukanLain() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={btnPrimary} onClick={() => setShowModal(true)}>+ Tambah Pemasukan</button>
      </div>
      <LightTable
        headers={['Tanggal','Kategori','Keterangan','Jumlah','Dicatat Oleh']}
        rows={[
          ['02 Mei 2025','Sponsorship','Kontribusi tower dari vendor','Rp 2.000.000','Admin Utama'],
          ['25 Apr 2025','Sewa Tiang', 'Sewa tiang ke provider lain','Rp 500.000',  'Admin Utama'],
          ['10 Apr 2025','Lain-lain',  'Komisi referral pelanggan',  'Rp 150.000',  'Super Admin'],
        ]}
      />
      {showModal && (
        <LightModal title="Tambah Pemasukan Lain" onClose={() => setShowModal(false)}>
          <LightFormGroup label="Kategori"><select style={inputStyle}><option>Sponsorship</option><option>Sewa Aset</option><option>Komisi</option><option>Lain-lain</option></select></LightFormGroup>
          <LightFormGroup label="Keterangan"><input style={inputStyle} placeholder="Keterangan pemasukan..." /></LightFormGroup>
          <LightFormGroup label="Jumlah (Rp)"><input style={inputStyle} type="number" /></LightFormGroup>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button style={btnSecondary} onClick={() => setShowModal(false)}>Batal</button>
            <button style={btnPrimary} onClick={() => setShowModal(false)}>💾 Simpan</button>
          </div>
        </LightModal>
      )}
    </div>
  )
}

function Pengeluaran() {
  const [showModal, setShowModal] = useState(false)
  const data = [
    { tgl: '02 Mei 2025', kategori: 'Bandwidth', ket: 'Biaya bandwidth bulanan', jumlah: 850000, metode: 'Transfer BCA' },
    { tgl: '01 Mei 2025', kategori: 'Operasional', ket: 'BBM & transportasi teknisi', jumlah: 200000, metode: 'Cash' },
    { tgl: '30 Apr 2025', kategori: 'Gaji', ket: 'Gaji teknisi April', jumlah: 1500000, metode: 'Transfer BRI' },
    { tgl: '28 Apr 2025', kategori: 'Inventori', ket: 'Pembelian ONU 5 pcs', jumlah: 2750000, metode: 'Transfer BCA' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ background: L.redDim, border: `1px solid #FECACA`, borderRadius: 8, padding: '8px 16px', fontSize: '.82rem' }}>
          <span style={{ color: L.red, fontWeight: 700 }}>Total Pengeluaran Bulan Ini: </span>
          <span style={{ fontFamily: 'monospace', fontWeight: 800, color: L.red }}>Rp {data.reduce((s, d) => s + d.jumlah, 0).toLocaleString('id-ID')}</span>
        </div>
        <button style={btnPrimary} onClick={() => setShowModal(true)}>+ Tambah Pengeluaran</button>
      </div>
      <LightTable
        headers={['Tanggal','Kategori','Keterangan','Jumlah','Metode']}
        rows={data.map(d => [
          d.tgl,
          <Badge key="k" color="red">{d.kategori}</Badge>,
          d.ket,
          <span key="j" style={{ fontFamily: 'monospace', fontWeight: 700, color: L.red }}>Rp {d.jumlah.toLocaleString('id-ID')}</span>,
          d.metode
        ])}
      />
      {showModal && (
        <LightModal title="Tambah Pengeluaran" onClose={() => setShowModal(false)}>
          <LightFormGroup label="Tanggal"><input style={inputStyle} type="date" defaultValue={new Date().toISOString().split('T')[0]} /></LightFormGroup>
          <LightFormGroup label="Kategori"><select style={inputStyle}><option>Operasional</option><option>Inventori</option><option>Bandwidth</option><option>Gaji</option><option>Lain-lain</option></select></LightFormGroup>
          <LightFormGroup label="Keterangan"><input style={inputStyle} placeholder="Keterangan pengeluaran..." /></LightFormGroup>
          <LightFormGroup label="Jumlah (Rp)"><input style={inputStyle} type="number" /></LightFormGroup>
          <LightFormGroup label="Metode Pembayaran"><select style={inputStyle}><option>Cash</option><option>Transfer BCA</option><option>Transfer BRI</option></select></LightFormGroup>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button style={btnSecondary} onClick={() => setShowModal(false)}>Batal</button>
            <button style={btnPrimary} onClick={() => setShowModal(false)}>💾 Simpan</button>
          </div>
        </LightModal>
      )}
    </div>
  )
}

function POPenawaran() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={btnPrimary} onClick={() => setShowModal(true)}>+ Buat PO / Penawaran</button>
      </div>
      <LightTable
        headers={['No. PO','Vendor / Calon','Deskripsi','Nilai','Status','Tgl Dibuat']}
        rows={[
          ['PO-001','CV Tekno Maju','Pembelian ONU 20 pcs', <span key="v" style={{fontFamily:'monospace',color:L.purple,fontWeight:700}}>Rp 11.000.000</span>,<Badge key="s" color="amber">Draft</Badge>,'30 Apr 2025'],
          ['PO-002','Bapak Hermawan','Penawaran Paket Bisnis',<span key="v" style={{fontFamily:'monospace',color:L.purple,fontWeight:700}}>Rp 1.500.000</span>,<Badge key="s" color="green">Disetujui</Badge>,'25 Apr 2025'],
        ]}
      />
      {showModal && (
        <LightModal title="Buat PO / Penawaran Harga" onClose={() => setShowModal(false)}>
          <LightFormGroup label="Tipe"><select style={inputStyle}><option>Purchase Order (PO)</option><option>Penawaran Harga ke Calon Pelanggan</option></select></LightFormGroup>
          <LightFormGroup label="Ditujukan Kepada"><input style={inputStyle} placeholder="Nama vendor / calon pelanggan" /></LightFormGroup>
          <LightFormGroup label="Deskripsi"><textarea style={{...inputStyle, resize:'vertical'}} rows={3} placeholder="Rincian PO / penawaran..." /></LightFormGroup>
          <LightFormGroup label="Nilai (Rp)"><input style={inputStyle} type="number" /></LightFormGroup>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button style={btnSecondary} onClick={() => setShowModal(false)}>Batal</button>
            <button style={btnPrimary} onClick={() => setShowModal(false)}>📋 Buat & Simpan</button>
          </div>
        </LightModal>
      )}
    </div>
  )
}

function DataAkun() {
  const akun = [
    { nama: 'Kas Utama',      tipe: 'Kas',      saldo: 12500000, bank: '-' },
    { nama: 'Rekening BCA',   tipe: 'Bank',     saldo: 8750000,  bank: '1234567890' },
    { nama: 'Rekening BRI',   tipe: 'Bank',     saldo: 5200000,  bank: '0987654321' },
    { nama: 'TriPay Merchant',tipe: 'Payment',  saldo: 3100000,  bank: 'ID-TP-NIANDRI' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
        {akun.map(a => (
          <div key={a.nama} style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1rem 1.25rem', boxShadow: L.shadow }}>
            <div style={{ fontSize: '.72rem', color: L.muted, fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>{a.tipe}</div>
            <div style={{ fontWeight: 700, fontSize: '.9rem', marginBottom: 4 }}>{a.nama}</div>
            {a.bank !== '-' && <div style={{ fontSize: '.72rem', color: L.muted, marginBottom: 8, fontFamily: 'monospace' }}>{a.bank}</div>}
            <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 800, color: L.brand }}>Rp {a.saldo.toLocaleString('id-ID')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Pengumuman() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={btnPrimary} onClick={() => setShowModal(true)}>+ Buat Pengumuman</button>
      </div>
      {[
        { judul: 'Pemeliharaan Jaringan 5 Mei 2025',     isi: 'Akan ada pemeliharaan rutin jaringan dari pukul 02:00 - 04:00 WIB. Mohon maaf atas ketidaknyamanan.', tgl: '03 Mei 2025', target: 'Semua Pelanggan', penting: true },
        { judul: 'Update Harga Paket Bisnis',            isi: 'Mulai 1 Juni 2025, paket bisnis mengalami penyesuaian harga. Hubungi admin untuk detail.', tgl: '01 Mei 2025', target: 'Pelanggan Bisnis', penting: false },
      ].map((p, i) => (
        <div key={i} style={{ background: L.surface, border: `1px solid ${p.penting ? '#FCA5A5' : L.border}`, borderRadius: 10, padding: '1.25rem', boxShadow: L.shadow, borderLeft: `4px solid ${p.penting ? L.red : L.blue}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{p.judul}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {p.penting && <Badge color="red">Penting</Badge>}
              <Badge color="blue">{p.target}</Badge>
            </div>
          </div>
          <div style={{ fontSize: '.82rem', color: L.muted, lineHeight: 1.6 }}>{p.isi}</div>
          <div style={{ fontSize: '.72rem', color: L.subtle, marginTop: 8 }}>{p.tgl}</div>
        </div>
      ))}
      {showModal && (
        <LightModal title="Buat Pengumuman" onClose={() => setShowModal(false)}>
          <LightFormGroup label="Judul"><input style={inputStyle} placeholder="Judul pengumuman..." /></LightFormGroup>
          <LightFormGroup label="Isi Pesan"><textarea style={{...inputStyle,resize:'vertical'}} rows={4} placeholder="Isi pengumuman..." /></LightFormGroup>
          <LightFormGroup label="Target"><select style={inputStyle}><option>Semua Pelanggan</option><option>Pelanggan Bisnis</option><option>Pelanggan Rumahan</option><option>Teknisi</option></select></LightFormGroup>
          <LightFormGroup label="Prioritas"><select style={inputStyle}><option>Normal</option><option>Penting</option></select></LightFormGroup>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button style={btnSecondary} onClick={() => setShowModal(false)}>Batal</button>
            <button style={btnPrimary} onClick={() => setShowModal(false)}>📢 Kirim Pengumuman</button>
          </div>
        </LightModal>
      )}
    </div>
  )
}

function StatusLangganan() {
  return (
    <LightTable
      headers={['Pelanggan','Paket','Mulai Berlaku','Jatuh Tempo','Hari Tersisa','Status']}
      rows={[
        ['Budi Santoso','Home 20Mbps','01 Mei 2025','31 Mei 2025', <span key="h" style={{color:L.brand,fontWeight:700}}>28 hari</span>, <Badge key="s" color="green">Aktif</Badge>],
        ['Sari Dewi',   'Home 50Mbps','01 Mei 2025','31 Mei 2025', <span key="h" style={{color:L.brand,fontWeight:700}}>28 hari</span>, <Badge key="s" color="green">Aktif</Badge>],
        ['Rina Putri',  'Home 10Mbps','01 Apr 2025','30 Apr 2025', <span key="h" style={{color:L.red,fontWeight:700}}>Expired</span>,  <Badge key="s" color="red">Isolir</Badge>],
        ['Hendra K.',   'Home 20Mbps','01 Mei 2025','31 Mei 2025', <span key="h" style={{color:L.amber,fontWeight:700}}>28 hari</span>, <Badge key="s" color="amber">Belum Bayar</Badge>],
      ]}
    />
  )
}

function DataWA() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button style={btnPrimary} onClick={() => setShowModal(true)}>+ Tambah Nomor WA</button>
      </div>
      {[
        { nama: 'WA CS Utama',  nomor: '+62 812-3456-7890', tipe: 'WhatsApp Web', status: 'Terhubung',   pesan: 142 },
        { nama: 'WA CS 2',      nomor: '+62 821-9876-5432', tipe: 'Fonnte API',   status: 'Terhubung',   pesan: 87  },
        { nama: 'WA Broadcast', nomor: '+62 811-2222-3333', tipe: 'WA Business',  status: 'Terputus',    pesan: 0   },
      ].map((w, i) => (
        <div key={i} style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, padding: '1rem 1.25rem', boxShadow: L.shadow, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>💬</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{w.nama}</div>
              <div style={{ fontSize: '.78rem', color: L.muted, fontFamily: 'monospace' }}>{w.nomor}</div>
              <div style={{ fontSize: '.72rem', color: L.subtle }}>{w.tipe}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '.78rem', color: L.muted }}>{w.pesan} pesan terkirim</div>
            </div>
            <Badge color={w.status === 'Terhubung' ? 'green' : 'red'}>{w.status}</Badge>
          </div>
        </div>
      ))}
      {showModal && (
        <LightModal title="Tambah Nomor WA Gateway" onClose={() => setShowModal(false)}>
          <LightFormGroup label="Nama / Label"><input style={inputStyle} placeholder="WA CS 3" /></LightFormGroup>
          <LightFormGroup label="Nomor WhatsApp"><input style={inputStyle} placeholder="+62 821 xxxx xxxx" /></LightFormGroup>
          <LightFormGroup label="Tipe Koneksi"><select style={inputStyle}><option>WhatsApp Web (Scan QR)</option><option>WA Business API</option><option>Fonnte</option></select></LightFormGroup>
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: 12, fontSize: '.78rem', color: L.muted, marginTop: 4 }}>
            Setelah ditambah, scan QR code untuk menghubungkan nomor ke sistem.
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button style={btnSecondary} onClick={() => setShowModal(false)}>Batal</button>
            <button style={btnPrimary} onClick={() => setShowModal(false)}>+ Tambah & Scan QR</button>
          </div>
        </LightModal>
      )}
    </div>
  )
}

// ─── Sub-page map ───────────────────────────────────────
const SUB_PAGES: Record<string, { component: React.FC; desc: string }> = {
  pembayaran_langganan: { component: PembayaranLangganan, desc: 'Catat & kelola pembayaran berlangganan bulanan' },
  data_mutasi:         { component: DataMutasi,          desc: 'Riwayat pergerakan keuangan masuk & keluar' },
  pembayaran_umum:     { component: PembayaranUmum,      desc: 'Pembayaran di luar langganan rutin' },
  setor_tunai:         { component: SetorTunai,          desc: 'Pencatatan setor uang tunai dari agen' },
  tagihan_manual:      { component: TagihanManual,       desc: 'Buat tagihan non-standar untuk pelanggan' },
  pemasukan_lain:      { component: PemasukanLain,       desc: 'Catat pemasukan di luar pembayaran langganan' },
  pengeluaran:         { component: Pengeluaran,         desc: 'Catat pengeluaran operasional & aset' },
  po_penawaran:        { component: POPenawaran,         desc: 'Kelola Purchase Order & penawaran harga' },
  data_akun:           { component: DataAkun,            desc: 'Saldo & info rekening bank & kas' },
  pengumuman:          { component: Pengumuman,          desc: 'Kirim pengumuman ke pelanggan via WA/App' },
  status_langganan:    { component: StatusLangganan,     desc: 'Cek masa aktif & status langganan pelanggan' },
  data_wa:             { component: DataWA,              desc: 'Kelola nomor WhatsApp gateway aktif' },
}

// ─── Shared UI helpers ──────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px',
  background: '#fff', border: `1px solid ${L.border2}`,
  borderRadius: 7, color: L.text,
  fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '.875rem',
  outline: 'none',
}

const btnPrimary: React.CSSProperties = {
  padding: '8px 16px', background: L.brand, border: 'none',
  borderRadius: 7, color: '#fff',
  fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700,
  fontSize: '.82rem', cursor: 'pointer',
}

const btnSecondary: React.CSSProperties = {
  padding: '8px 16px', background: '#fff', border: `1px solid ${L.border2}`,
  borderRadius: 7, color: L.text,
  fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600,
  fontSize: '.82rem', cursor: 'pointer',
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  const map: Record<string, { bg: string; text: string }> = {
    green:  { bg: '#DCFCE7', text: '#15803D' },
    red:    { bg: '#FEE2E2', text: '#DC2626' },
    amber:  { bg: '#FEF3C7', text: '#D97706' },
    blue:   { bg: '#DBEAFE', text: '#2563EB' },
    purple: { bg: '#EDE9FE', text: '#7C3AED' },
    gray:   { bg: '#F1F5F9', text: '#64748B' },
  }
  const c = map[color] ?? map.gray
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 9px', borderRadius: 100, fontSize: '.68rem', fontWeight: 700, background: c.bg, color: c.text }}>
      {children}
    </span>
  )
}

function LightTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div style={{ background: L.surface, border: `1px solid ${L.border}`, borderRadius: 10, overflow: 'hidden', boxShadow: L.shadow }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: L.surface2 }}>
            {headers.map(h => (
              <th key={h} style={{ textAlign: 'left', padding: '9px 14px', fontSize: '.7rem', fontWeight: 700, color: L.muted, textTransform: 'uppercase', letterSpacing: '.05em', borderBottom: `1px solid ${L.border}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: i < rows.length - 1 ? `1px solid ${L.border}` : 'none' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '10px 14px', fontSize: '.82rem', color: L.text }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LightModal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,.4)', backdropFilter: 'blur(4px)', zIndex: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <div style={{ background: '#fff', border: `1px solid ${L.border}`, borderRadius: 14, width: 480, maxWidth: '95vw', maxHeight: '85vh', overflowY: 'auto', boxShadow: L.shadowMd }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: `1px solid ${L.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '.95rem', color: L.text }}>{title}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: L.muted, fontSize: '1rem' }}>✕</button>
        </div>
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

function LightFormGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '.72rem', fontWeight: 600, color: L.muted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</label>
      {children}
    </div>
  )
}

// ─── MAIN COMPONENT ─────────────────────────────────────
export default function TransaksiModule() {
  const [active, setActive] = useState<string | null>(null)

  const activeItem = SUB_MENUS.find(m => m.id === active)
  const ActiveComponent = active ? SUB_PAGES[active]?.component : null

  return (
    <div style={{ background: L.bg, minHeight: '100%' }}>
      {/* Sub-menu grid */}
      {!active && (
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h1 style={{ fontSize: '1rem', fontWeight: 700, color: L.text }}>⚙️ Menu Transaksi</h1>
            <p style={{ fontSize: '.8rem', color: L.muted, marginTop: 4 }}>Pilih jenis transaksi yang ingin dikelola</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {SUB_MENUS.map(m => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                style={{
                  background: L.surface, border: `1px solid ${L.border}`,
                  borderRadius: 10, padding: '1.1rem 1.25rem',
                  cursor: 'pointer', textAlign: 'left',
                  boxShadow: L.shadow, transition: 'all .15s',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = m.color; e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,.08)` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = L.border; e.currentTarget.style.boxShadow = L.shadow }}
              >
                <div style={{ width: 38, height: 38, borderRadius: 9, background: m.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', marginBottom: 10 }}>
                  {m.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: '.85rem', color: L.text, lineHeight: 1.3 }}>{m.label}</div>
                <div style={{ fontSize: '.72rem', color: m.color, marginTop: 4, fontWeight: 600 }}>Kelola →</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sub-page content */}
      {active && ActiveComponent && (
        <div style={{ padding: '1.5rem' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
            <button onClick={() => setActive(null)} style={{
              background: L.surface2, border: `1px solid ${L.border}`, borderRadius: 7,
              padding: '5px 12px', cursor: 'pointer', fontSize: '.78rem', color: L.muted,
              fontFamily: 'Plus Jakarta Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 5
            }}>
              ← Transaksi
            </button>
            <span style={{ color: L.subtle, fontSize: '.8rem' }}>/</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '.85rem' }}>{activeItem?.icon}</span>
              <span style={{ fontWeight: 700, fontSize: '.85rem', color: L.text }}>{activeItem?.label}</span>
            </div>
          </div>

          <ActiveComponent />
        </div>
      )}
    </div>
  )
}
