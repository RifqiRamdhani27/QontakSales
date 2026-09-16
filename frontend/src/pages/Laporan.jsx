import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TABS = [
  { id: "sekilas-bisnis", label: "Sekilas bisnis" },
  { id: "penjualan", label: "Penjualan" },
  { id: "pembelian", label: "Pembelian" },
  { id: "produk", label: "Produk" },
  { id: "aset", label: "Aset" },
  { id: "bank", label: "Bank" },
  { id: "pajak", label: "Pajak" },
  { id: "produksi", label: "Produksi" },
];

const REPORTS_SEKILAS_BISNIS = [
  {
    id: "neraca",
    title: "Neraca",
    description:
      "Menampilkan apa yang dimiliki (aset), apa saja utangnya (liabilitas), dan apa yang sudah diinvestasikan ke perusahaan ini (ekuitas) pada tanggal tertentu.",
  },
  {
    id: "buku-besar",
    title: "Buku besar",
    description:
      "Menampilkan semua transaksi berdasarkan akun dalam periode tertentu, termasuk kronologi pergerakan transaksinya selama periode berlangsung.",
  },
  {
    id: "laba-rugi",
    title: "Laba rugi",
    description:
      "Menampilkan semua pendapatan yang diperoleh dan biaya yang dikeluarkan dalam periode tertentu. Template laporan versi terkini bisa Anda custom sesuai kebutuhan.",
  },
  {
    id: "jurnal",
    title: "Jurnal",
    description:
      "Menampilkan semua journal entry per transaksi dalam periode tertentu. Anda dapat melacak transaksi yang masuk ke masing-masing akun.",
  },
  {
    id: "arus-kas",
    title: "Arus kas",
    description:
      "Menampilkan pergerakan uang masuk dan keluar dari transaksi dalam periode tertentu. Template laporan ini bisa Anda custom sesuai kebutuhan.",
  },
  {
    id: "neraca-saldo",
    title: "Neraca saldo",
    description:
      "Menampilkan saldo dari setiap akun, termasuk saldo awal, pergerakan, dan saldo akhir dalam periode tertentu.",
  },
  {
    id: "perubahan-modal",
    title: "Perubahan modal",
    description:
      "Menampilkan perubahan atau pergerakan ekuitas pemilik dalam periode tertentu.",
  },
  {
    id: "ringkasan-bisnis",
    title: "Ringkasan bisnis",
    description:
      "Menampilkan ringkasan laporan keuangan utama dan wawasannya dalam periode tertentu.",
  },
  {
    id: "anggaran-laba-rugi",
    title: "Anggaran laba rugi",
    description:
      "Menampilkan perbandingan antara jumlah transaksi sebenarnya dan anggaran yang telah disusun per akun.",
  },
  {
    id: "manajemen-anggaran",
    title: "Manajemen anggaran",
    description:
      "Memungkinkan Anda mengatur dan mengelola anggaran untuk pengeluaran dan pendapatan perusahaan ini.",
  },
];

const REPORTS_PENJUALAN_LEFT = [
  {
    id: "daftar-penjualan",
    title: "Daftar penjualan",
    description:
      "Menampilkan transaksi penjualan secara kronologis berdasarkan tipenya dalam periode tertentu. Template laporan ini bisa Anda custom sesuai kebutuhan.",
  },
  {
    id: "piutang-pelanggan",
    title: "Piutang pelanggan",
    description:
      "Menampilkan semua faktur yang belum dibayar dan saldo memo kredit pelanggan pada tanggal tertentu.",
  },
  {
    id: "pengiriman-penjualan",
    title: "Pengiriman penjualan",
    description:
      "Menampilkan semua produk yang dikirim untuk transaksi penjualan dalam periode tertentu.",
  },
  {
    id: "penyelesaian-pesanan-penjualan",
    title: "Penyelesaian pesanan penjualan",
    description:
      "Menampilkan ringkasan proses bisnis perusahaan ini. Anda dapat mengidentifikasi setiap penyelesaian penawaran dan pesanan penjualan hingga penagihan dan pembayarannya dilakukan.",
  },
  {
    id: "daftar-faktur-proforma",
    title: "Daftar faktur proforma",
    description:
      "Menampilkan semua faktur proforma yang dibuat dalam periode tertentu.",
  },
];

const REPORTS_PENJUALAN_RIGHT = [
  {
    id: "penjualan-per-pelanggan",
    title: "Penjualan per pelanggan",
    description:
      "Menampilkan semua transaksi penjualan dari setiap pelanggan dalam periode tertentu.",
  },
  {
    id: "usia-piutang",
    title: "Usia piutang",
    description:
      "Menampilkan total piutang dari setiap pelanggan berdasarkan usianya (30, 60, 90, dan setelah 90 hari).",
  },
  {
    id: "penjualan-per-produk",
    title: "Penjualan per produk",
    description:
      "Menampilkan semua kuantitas produk yang terjual, kuantitas retur, penjualan bersih, dan harga penjualan rata-rata dalam periode tertentu.",
  },
  {
    id: "profitabilitas-produk",
    title: "Profitabilitas produk",
    description:
      "Menampilkan total keuntungan yang diperoleh dari produk yang terjual dalam periode tertentu.",
    hasProBadge: true,
  },
  {
    id: "daftar-tukar-faktur",
    title: "Daftar tukar faktur",
    description:
      "Menampilkan semua tukar faktur dalam periode tertentu.",
  },
];

const REPORTS_PEMBELIAN_LEFT = [
  {
    id: "daftar-pembelian",
    title: "Daftar pembelian",
    description:
      "Menampilkan transaksi pembelian secara kronologis berdasarkan tipenya dalam periode tertentu. Template laporan ini bisa Anda custom sesuai kebutuhan.",
  },
  {
    id: "utang-supplier",
    title: "Utang supplier",
    description:
      "Menampilkan semua faktur yang belum dibayar dan saldo memo debit supplier pada tanggal tertentu.",
  },
  {
    id: "detail-pengeluaran",
    title: "Detail pengeluaran",
    description:
      "Menampilkan semua transaksi pengeluaran berdasarkan akun dalam periode tertentu.",
  },
  {
    id: "pengiriman-pembelian",
    title: "Pengiriman pembelian",
    description:
      "Menampilkan semua produk yang dikirim untuk transaksi pembelian dalam periode tertentu.",
  },
  {
    id: "penyelesaian-pesanan-pembelian",
    title: "Penyelesaian pesanan pembelian",
    description:
      "Menampilkan ringkasan proses bisnis perusahaan ini. Anda dapat mengidentifikasi setiap penyelesaian penawaran dan pesanan pembelian hingga penagihan dan pembayarannya dilakukan.",
  },
];

const REPORTS_PEMBELIAN_RIGHT = [
  {
    id: "pembelian-per-supplier",
    title: "Pembelian per supplier",
    description:
      "Menampilkan semua transaksi pembelian dari setiap supplier dalam periode tertentu.",
  },
  {
    id: "daftar-pengeluaran",
    title: "Daftar pengeluaran",
    description:
      "Menampilkan semua transaksi pengeluaran dalam periode tertentu.",
  },
  {
    id: "usia-utang",
    title: "Usia utang",
    description:
      "Menampilkan total utang kepada setiap supplier berdasarkan usianya (30, 60, 90, dan setelah 90 hari).",
  },
  {
    id: "pembelian-per-produk",
    title: "Pembelian per produk",
    description:
      "Menampilkan semua kuantitas produk yang dibeli, kuantitas retur, pembelian bersih, dan harga pembelian rata-rata dalam periode tertentu.",
  },
];

const REPORTS_PRODUK_LEFT = [
  {
    id: "tingkat-pemenuhan-pesanan",
    title: "Tingkat pemenuhan pesanan",
    description:
      "Menampilkan persentase pesanan yang dapat dipenuhi dengan stok saat ini untuk beberapa waktu ke depan.",
    isNew: true,
  },
  {
    id: "konversi-produk",
    title: "Konversi produk",
    description:
      "Memberikan laporan yang berisi daftar transaksi konversi produk, bahan baku yang digunakan, dan harga pokok penjualan (HPP) dalam format XSLX atau CSV.",
    btnText: "Ekspor laporan",
  },
  {
    id: "kuantitas-stok-gudang",
    title: "Kuantitas stok gudang",
    description:
      "Menampilkan setiap kuantitas produk berdasarkan gudang yang dipilih pada tanggal tertentu.",
  },
  {
    id: "nilai-stok-gudang",
    title: "Nilai stok gudang",
    description:
      "Menampilkan nilai persediaan barang per gudang dalam periode tertentu.",
  },
  {
    id: "pergerakan-barang-gudang",
    title: "Pergerakan barang gudang",
    description:
      "Menampilkan pergerakan stok per gudang dalam periode tertentu.",
  },
  {
    id: "gudang-berisi-produk-bernomor-seri",
    title: "Gudang berisi produk bernomor seri",
    description:
      "Menampilkan gudang yang menyimpan produk dengan nomor seri, kuantitas tersedia, dan stok di gudang berdasarkan tanggal atau periode tertentu.",
    isNew: true,
  },
];

const REPORTS_PRODUK_RIGHT = [
  {
    id: "perputaran-persediaan-barang",
    title: "Perputaran persediaan barang",
    description:
      "Menampilkan rasio tentang seberapa sering produk terjual dan ditambahkan stoknya kembali di sebuah gudang.",
    isNew: true,
  },
  {
    id: "ringkasan-persediaan-barang",
    title: "Ringkasan persediaan barang",
    description:
      "Menampilkan kuantitas stok yang tersedia dengan harga rata-rata per unit dan total nilainya pada tanggal tertentu.",
  },
  {
    id: "nilai-persediaan-barang",
    title: "Nilai persediaan barang",
    description:
      "Menampilkan pergerakan stok per produk berdasarkan stok yang tersedia dan nilai stoknya dalam periode tertentu.",
  },
  {
    id: "detail-persediaan-barang",
    title: "Detail persediaan barang",
    description:
      "Menampilkan daftar produk dengan mutasi dan kuantitas akhirnya.",
  },
  {
    id: "kuantitas-produk-dengan-nomor-seri",
    title: "Kuantitas produk dengan nomor seri",
    description:
      "Menampilkan kuantitas tersedia dan stok di gudang dari produk dengan nomor seri berdasarkan tanggal atau periode tertentu.",
    isNew: true,
  },
];

const REPORTS_ASET_LEFT = [
  {
    id: "ringkasan-aset-tetap",
    title: "Ringkasan aset tetap",
    description:
      "Menampilkan daftar aset tetap dengan tanggal akuisisi, biaya awal, akun penyusutan, dan nilai buku.",
  },
  {
    id: "penjualan-atau-pelepasan-aset",
    title: "Penjualan atau pelepasan aset",
    description:
      "Menampilkan aset yang dijual atau dilepas dalam periode tertentu.",
  },
];

const REPORTS_ASET_RIGHT = [
  {
    id: "detail-aset-tetap",
    title: "Detail aset tetap",
    description:
      "Menampilkan daftar aset tetap beserta nilai bukunya dalam periode tertentu.",
  },
];

const REPORTS_BANK_LEFT = [
  {
    id: "ringkasan-rekonsiliasi-bank",
    title: "Ringkasan rekonsiliasi bank",
    description:
      "Menampilkan ringkasan saldo rekening koran terekonsiliasi, serta daftar rekening laporan dan transaksi yang belum direkonsiliasi.",
  },
];

const REPORTS_BANK_RIGHT = [
  {
    id: "mutasi-rekening-koran",
    title: "Mutasi rekening koran",
    description:
      "Menampilkan daftar rekening koran, status rekonsiliasi, dan sumbernya dalam periode tertentu.",
  },
];

const REPORTS_PAJAK_LEFT = [
  {
    id: "pajak-pemotongan",
    title: "Pajak pemotongan",
    description:
      "Menampilkan dasar pengenaan pajak (DPP), tarif pajak, dan jumlah pajak dengan tipe pemotongan yang digunakan di transaksi dalam periode tertentu.",
  },
];

const REPORTS_PAJAK_RIGHT = [
  {
    id: "pajak-penjualan",
    title: "Pajak penjualan",
    description:
      "Menampilkan dasar pengenaan pajak (DPP), tarif pajak, dan jumlah pajak dengan pajak pertambahan nilai (PPN) yang digunakan di transaksi dalam periode tertentu.",
  },
];

const REPORTS_PRODUKSI_LEFT = [
  {
    id: "penyusunan-produksi",
    title: "Penyusunan produksi",
    description:
      "Memberikan laporan yang berisi daftar penyusunan produksi, bahan baku yang digunakan, dan harga pokok penjualan (HPP) dalam format CSV.",
    btnText: "Ekspor laporan",
  },
  {
    id: "harga-pokok-produksi-cogm",
    title: "Harga pokok produksi (COGM)",
    description:
      "Memberikan laporan berformat CSV yang berisi total biaya (komponen, tenaga kerja, overhead, dsb.) yang dikeluarkan untuk menghasilkan barang jadi.",
    btnText: "Ekspor laporan",
    isNew: true,
  },
];

const REPORTS_PRODUKSI_RIGHT = [
  {
    id: "pemisahan-produksi",
    title: "Pemisahan produksi",
    description:
      "Memberikan laporan yang berisi daftar pemisahan produksi, bahan baku yang digunakan, dan harga pokok penjualan (HPP) dalam format CSV.",
    btnText: "Ekspor laporan",
  },
];

export default function Laporan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sekilas-bisnis");

  return (
    <div
      style={{
        margin: "-24px",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        fontFamily: "'Inter', sans-serif, system-ui",
        color: "#1e293b",
      }}
    >
      <main
        style={{
          width: "100%",
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "28px 48px 80px 48px",
        }}
      >
        {/* Page Header */}
        <header style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "#0f172a",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Laporan
          </h1>
        </header>

        {/* Navigation Tabs */}
        <nav
          aria-label="Kategori Laporan"
          style={{
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "28px",
              marginBottom: "-1px",
              overflowX: "auto",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "inline-block",
                    padding: "10px 2px",
                    fontSize: "13.5px",
                    fontWeight: 500,
                    color: isActive ? "#2563eb" : "#475569",
                    borderBottom: isActive
                      ? "2px solid #2563eb"
                      : "2px solid transparent",
                    whiteSpace: "nowrap",
                    background: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "none",
                    cursor: "pointer",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#0f172a";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "#475569";
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Report Cards Content: Sekilas Bisnis */}
        {activeTab === "sekilas-bisnis" && (
          <section
            aria-label="Daftar Laporan Sekilas Bisnis"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "40px",
            }}
          >
            {REPORTS_SEKILAS_BISNIS.map((report) => (
              <article
                key={report.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <h2
                  style={{
                    fontSize: "15.5px",
                    fontWeight: 700,
                    color: "#0f172a",
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  {report.title}
                </h2>
                <p
                  style={{
                    marginTop: "6px",
                    fontSize: "13.5px",
                    lineHeight: 1.625,
                    color: "#475569",
                    maxWidth: "580px",
                    margin: "6px 0 0 0",
                  }}
                >
                  {report.description}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (report.id === "neraca") {
                      navigate("/laporan/neraca");
                    }
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    lineHeight: "20px",
                    fontWeight: 500,
                    color: "#2563eb",
                    backgroundColor: "#ffffff",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    marginTop: "14px",
                    cursor: "pointer",
                    transition: "all 0.15s ease-in-out",
                    userSelect: "none",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f8fafc";
                    e.currentTarget.style.borderColor = "#2563eb";
                    e.currentTarget.style.color = "#1d4ed8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.borderColor = "#d1d5db";
                    e.currentTarget.style.color = "#2563eb";
                  }}
                >
                  Lihat laporan
                </button>
              </article>
            ))}
          </section>
        )}

        {/* Report Cards Content: Penjualan */}
        {activeTab === "penjualan" && (
          <section
            aria-label="Daftar Laporan Penjualan"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "36px",
            }}
          >
            {/* Left Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {REPORTS_PENJUALAN_LEFT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1f2937",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "#4b5563",
                      maxWidth: "560px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#2563eb",
                      backgroundColor: "#ffffff",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      padding: "6px 14px",
                      marginTop: "12px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>

            {/* Right Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {REPORTS_PENJUALAN_RIGHT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#1f2937",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "13px",
                      lineHeight: 1.5,
                      color: "#4b5563",
                      maxWidth: "560px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "12px",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        lineHeight: "20px",
                        fontWeight: 500,
                        color: "#2563eb",
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        padding: "6px 14px",
                        cursor: "pointer",
                        transition: "all 0.15s ease-in-out",
                        userSelect: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                      }}
                    >
                      Lihat laporan
                    </button>

                    {report.hasProBadge && (
                      <span
                        title="Fitur Premium"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: "#8b5cf6",
                          color: "#ffffff",
                          cursor: "pointer",
                        }}
                      >
                        <svg
                          style={{ width: "14px", height: "14px" }}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Report Cards Content: Pembelian */}
        {activeTab === "pembelian" && (
          <section
            aria-label="Daftar Laporan Pembelian"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "36px",
            }}
          >
            {/* Left Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {REPORTS_PEMBELIAN_LEFT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "13.5px",
                      lineHeight: 1.625,
                      color: "#64748b",
                      maxWidth: "560px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#2563eb",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 14px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                      e.currentTarget.style.borderColor = "#94a3b8";
                      e.currentTarget.style.color = "#1d4ed8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.color = "#2563eb";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>

            {/* Right Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
              {REPORTS_PEMBELIAN_RIGHT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "4px",
                      fontSize: "13.5px",
                      lineHeight: 1.625,
                      color: "#64748b",
                      maxWidth: "560px",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#2563eb",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 14px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                      e.currentTarget.style.borderColor = "#94a3b8";
                      e.currentTarget.style.color = "#1d4ed8";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                      e.currentTarget.style.borderColor = "#cbd5e1";
                      e.currentTarget.style.color = "#2563eb";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Report Cards Content: Produk */}
        {activeTab === "produk" && (
          <section
            aria-label="Daftar Laporan Produk"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "44px",
            }}
          >
            {/* Left Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_PRODUK_LEFT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#0f172a",
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      {report.title}
                    </h2>
                    {report.isNew && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "2px 8px",
                          borderRadius: "9999px",
                          fontSize: "10px",
                          fontWeight: 700,
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          lineHeight: 1.2,
                        }}
                      >
                        BARU
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    {report.btnText || "Lihat laporan"}
                  </button>
                </article>
              ))}
            </div>

            {/* Right Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_PRODUK_RIGHT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#0f172a",
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      {report.title}
                    </h2>
                    {report.isNew && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "2px 8px",
                          borderRadius: "9999px",
                          fontSize: "10px",
                          fontWeight: 700,
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          lineHeight: 1.2,
                        }}
                      >
                        BARU
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    {report.btnText || "Lihat laporan"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Report Cards Content: Aset */}
        {activeTab === "aset" && (
          <section
            aria-label="Daftar Laporan Aset"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "44px",
            }}
          >
            {/* Left Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_ASET_LEFT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>

            {/* Right Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_ASET_RIGHT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Report Cards Content: Bank */}
        {activeTab === "bank" && (
          <section
            aria-label="Daftar Laporan Bank"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "44px",
            }}
          >
            {/* Left Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_BANK_LEFT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>

            {/* Right Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_BANK_RIGHT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Report Cards Content: Pajak */}
        {activeTab === "pajak" && (
          <section
            aria-label="Daftar Laporan Pajak"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "44px",
            }}
          >
            {/* Left Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_PAJAK_LEFT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>

            {/* Right Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_PAJAK_RIGHT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Lihat laporan
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Report Cards Content: Produksi */}
        {activeTab === "produksi" && (
          <section
            aria-label="Daftar Laporan Produksi"
            style={{
              marginTop: "36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              columnGap: "80px",
              rowGap: "44px",
            }}
          >
            {/* Left Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_PRODUKSI_LEFT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#0f172a",
                        lineHeight: 1.3,
                        margin: 0,
                      }}
                    >
                      {report.title}
                    </h2>
                    {report.isNew && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "2px 8px",
                          borderRadius: "9999px",
                          fontSize: "10px",
                          fontWeight: 700,
                          backgroundColor: "#ef4444",
                          color: "#ffffff",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          lineHeight: 1.2,
                        }}
                      >
                        BARU
                      </span>
                    )}
                  </div>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    {report.btnText || "Lihat laporan"}
                  </button>
                </article>
              ))}
            </div>

            {/* Right Column Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
              {REPORTS_PRODUKSI_RIGHT.map((report) => (
                <article
                  key={report.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {report.title}
                  </h2>
                  <p
                    style={{
                      marginTop: "6px",
                      fontSize: "14px",
                      lineHeight: 1.625,
                      color: "#475569",
                      maxWidth: "560px",
                      margin: "6px 0 0 0",
                    }}
                  >
                    {report.description}
                  </p>
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: 500,
                      color: "#1652f0",
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      borderRadius: "4px",
                      padding: "6px 16px",
                      marginTop: "14px",
                      cursor: "pointer",
                      transition: "all 0.15s ease-in-out",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }}
                  >
                    {report.btnText || "Lihat laporan"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
