import { useState } from "react";
import {
  MagnifyingGlass,
  Funnel,
  X,
  ArrowCounterClockwise,
  CaretDown,
  Warning,
} from "@phosphor-icons/react";
import mekariPayLogo from "../assets/mekari-pay.png";
import purchaseFolder from "../assets/purchase-folder.png";

const tabs = [
  "Faktur",
  "Tukar faktur",
  "Pengiriman",
  "Pesanan",
  "Penawaran",
  "Permintaan",
  "Membutuhkan persetujuan",
];

const statusOptions = {
  Faktur: [
    "Semua status",
    "Menunggu pembayaran",
    "Telat bayar",
    "Dibayar",
    "Dibayar sebagian",
    "Belum dibayar",
  ],
  "Tukar faktur": [
    "Semua status",
    "Menunggu pembayaran",
    "Telat bayar",
    "Dibayar",
    "Dibayar sebagian",
    "Belum dibayar",
  ],
  Pengiriman: ["Semua status", "Belum ditagih", "Selesai"],
  Pesanan: ["Semua status", "Belum ditagih", "Dikirim sebagian", "Selesai"],
  Penawaran: [
    "Semua status",
    "Draft",
    "Menunggu persetujuan",
    "Disetujui",
    "Ditolak",
    "Kedaluwarsa",
  ],
  Permintaan: [
    "Semua status",
    "Draft",
    "Menunggu persetujuan",
    "Disetujui",
    "Ditolak",
    "Selesai",
  ],
  "Membutuhkan persetujuan": [
    "Semua status",
    "Menunggu persetujuan",
    "Disetujui",
    "Ditolak",
  ],
};

const columnOptions = {
  Faktur: [
    "Semua kolom",
    "Nomor transaksi",
    "Supplier",
    "Nomor referensi supplier",
    "Nama produk",
    "Memo",
    "Pesan",
  ],
  "Tukar faktur": [
    "Semua kolom",
    "Nomor transaksi",
    "Supplier",
    "Nomor referensi supplier",
    "Memo",
    "Pesan",
  ],
  Pengiriman: [
    "Semua kolom",
    "Nomor transaksi",
    "Supplier",
    "Gudang",
    "Nomor referensi supplier",
    "Nama produk",
    "Memo",
    "Pesan",
  ],
  Pesanan: [
    "Semua kolom",
    "Nomor transaksi",
    "Supplier",
    "Gudang",
    "Nomor referensi supplier",
    "Nama produk",
    "Memo",
    "Pesan",
  ],
  Penawaran: [
    "Semua kolom",
    "Nomor transaksi",
    "Supplier",
    "Nama produk",
    "Memo",
    "Pesan",
  ],
  Permintaan: [
    "Semua kolom",
    "Nomor transaksi",
    "Supplier",
    "Nama produk",
    "Memo",
    "Pesan",
  ],
  "Membutuhkan persetujuan": [
    "Semua kolom",
    "Nomor transaksi",
    "Supplier",
    "Nama produk",
    "Memo",
    "Pesan",
  ],
};

const filterType = {
  Faktur: "full",
  "Tukar faktur": "tukar",
  Pengiriman: "delivery",
  Pesanan: "full",
  Penawaran: "full",
  Permintaan: "request",
  "Membutuhkan persetujuan": "full",
};

const emptyContent = {
  Faktur: {
    title: "Belum ada faktur pembelian",
    description: "Daftar faktur pembelian akan muncul di sini.",
    button: "Buat faktur pembelian",
  },
  "Tukar faktur": {
    title: "Belum ada tukar faktur",
    description: "Daftar tukar faktur akan muncul di sini.",
    button: "Buat tukar faktur",
  },
  Pengiriman: {
    title: "Belum ada pengiriman pembelian",
    description: "Daftar pengiriman pembelian akan muncul di sini.",
    button: "Buat pengiriman pembelian",
  },
  Pesanan: {
    title: "Belum ada pesanan pembelian",
    description: "Daftar pesanan pembelian akan muncul di sini.",
    button: "Buat pesanan pembelian",
  },
  Penawaran: {
    title: "Belum ada penawaran pembelian",
    description: "Daftar penawaran pembelian akan muncul di sini.",
    button: "Buat penawaran pembelian",
  },
  Permintaan: {
    title: "Belum ada permintaan pembelian",
    description: "Daftar permintaan pembelian akan muncul di sini.",
    button: "Buat permintaan pembelian",
  },
  "Membutuhkan persetujuan": {
    title: "Belum ada transaksi yang membutuhkan persetujuan",
    description: "Transaksi yang membutuhkan persetujuan akan muncul di sini.",
    button: "Buat pembelian baru",
  },
};

function DateRange({ label }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-slate-700">
        {label}
      </label>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tanggal mulai"
            className="h-7 w-full rounded border border-slate-300 bg-white px-2 pr-7 text-[10px] text-slate-600 outline-none focus:border-blue-500"
          />

          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
            ▣
          </span>
        </div>

        <span className="text-[10px] text-slate-500">-</span>

        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tanggal selesai"
            className="h-7 w-full rounded border border-slate-300 bg-white px-2 pr-7 text-[10px] text-slate-600 outline-none focus:border-blue-500"
          />

          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
            ▣
          </span>
        </div>
      </div>
    </div>
  );
}

function AmountFilter({ label }) {
  const [type, setType] = useState("Lebih dari");

  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-slate-700">
        {label}
      </label>

      <div className="mb-2 flex items-center gap-3 text-[10px] text-slate-600">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name={`${label}-type`}
            checked={type === "Lebih dari"}
            onChange={() => setType("Lebih dari")}
          />
          Lebih dari
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            name={`${label}-type`}
            checked={type === "Di antara"}
            onChange={() => setType("Di antara")}
          />
          Di antara
        </label>

        <label className="flex items-center gap-1">
          <input
            type="radio"
            name={`${label}-type`}
            checked={type === "Kurang dari"}
            onChange={() => setType("Kurang dari")}
          />
          Kurang dari
        </label>
      </div>

      <input
        type="text"
        placeholder="0"
        className="h-7 w-full rounded border border-slate-300 px-2 text-[10px] outline-none focus:border-blue-500"
      />
    </div>
  );
}

function TagFilter() {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-slate-700">
        Tag tambahan
      </label>

      <select className="h-7 w-full rounded border border-slate-300 bg-white px-2 text-[10px] text-slate-600 outline-none">
        <option value="">Pilih tag</option>
      </select>

      <div className="mt-2 flex items-center gap-4 text-[10px] text-slate-600">
        <label className="flex items-center gap-1">
          <input type="radio" name="tag-filter" defaultChecked />
          Semua tag
        </label>

        <label className="flex items-center gap-1">
          <input type="radio" name="tag-filter" />
          Salah satu
        </label>

        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-slate-400 text-[8px]">
          i
        </span>
      </div>
    </div>
  );
}

function ImportModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-[500px] rounded-lg bg-white shadow-2xl">
        <div className="flex h-12 items-center justify-between border-b border-slate-200 px-4">
          <h2 className="text-[12px] font-semibold text-slate-800">
            Impor transaksi pembelian
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-4">
          <p className="mb-5 text-[10px] text-slate-500">
            Gunakan template untuk menyiapkan data transaksi pembelian sebelum
            diimpor.
          </p>

          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
                1
              </div>

              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-slate-800">
                  Download template
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Download template yang akan digunakan untuk mengisi data
                  transaksi pembelian.
                </p>

                <button
                  type="button"
                  className="mt-2 flex h-8 items-center gap-2 rounded border border-slate-300 px-3 text-[10px] text-blue-600"
                >
                  Download template
                  <CaretDown size={11} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 border-t border-slate-200 pt-5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
                2
              </div>

              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-slate-800">
                  Isi data template
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Masukkan data pembelian sesuai kolom yang tersedia pada
                  template.
                </p>

                <button
                  type="button"
                  className="mt-2 h-8 rounded border border-slate-300 px-3 text-[10px] text-blue-600"
                >
                  Lihat ketentuan pengisian
                </button>
              </div>
            </div>

            <div className="flex gap-3 border-t border-slate-200 pt-5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
                3
              </div>

              <div className="flex-1">
                <h3 className="text-[13px] font-semibold text-slate-800">
                  Upload file
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Upload file template yang sudah diisi. Fitur upload akan
                  tersedia setelah proses impor diaktifkan.
                </p>

                <div className="mt-3 flex h-8 w-[280px] overflow-hidden rounded border border-slate-300 bg-white">
                  <button
                    type="button"
                    disabled
                    className="flex h-7 cursor-not-allowed items-center gap-1 border-r border-slate-300 bg-white px-3 text-[10px] text-blue-600"
                  >
                    Pilih file
                    <CaretDown size={10} className="text-blue-600" />
                  </button>

                  <div className="flex flex-1 items-center px-3 text-[10px] text-slate-400">
                    Belum ada file yang dipilih
                  </div>
                </div>

                <div className="mt-4 flex gap-2 rounded-md bg-amber-50 px-3 py-3">
                  <Warning
                    size={17}
                    weight="fill"
                    className="shrink-0 text-amber-500"
                  />

                  <div>
                    <div className="text-[10px] font-semibold text-slate-700">
                      Ketentuan impor transaksi
                    </div>

                    <div className="mt-1 text-[9px] leading-4 text-slate-500">
                      Pastikan produk dan supplier yang digunakan sudah tersedia
                      di sistem.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-[10px] font-medium text-slate-500"
            >
              Batal
            </button>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded bg-slate-100 px-4 py-2 text-[10px] font-medium text-slate-400"
            >
              Impor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PembelianPage() {
  const [activeTab, setActiveTab] = useState("Faktur");
  const [status, setStatus] = useState("Semua status");
  const [column, setColumn] = useState("Semua kolom");
  const [filterOpen, setFilterOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setStatus(statusOptions[tab][0]);
    setColumn(columnOptions[tab][0]);
  };

  const currentFilterType = filterType[activeTab];
  const currentContent = emptyContent[activeTab];

  const renderFilterFields = () => {
    return (
      <>
        <div>
          <label className="mb-1 block text-[11px] font-medium text-slate-700">
            Kata kunci
          </label>

          <div className="relative">
            <MagnifyingGlass
              size={15}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Cari transaksi"
              className="h-8 w-full rounded border border-slate-300 pl-7 pr-2 text-[10px] outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-medium text-slate-700">
            Opsi kolom
          </label>

          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="h-8 w-full rounded border border-slate-300 bg-white px-2 text-[10px] outline-none focus:border-blue-500"
          >
            {columnOptions[activeTab].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {(currentFilterType === "full" ||
          currentFilterType === "tukar" ||
          currentFilterType === "request") && (
          <DateRange label="Tgl. transaksi" />
        )}

        {(currentFilterType === "full" || currentFilterType === "tukar") && (
          <DateRange label="Tgl. jatuh tempo" />
        )}

        <div>
          <label className="mb-1 block text-[11px] font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-8 w-full rounded border border-slate-300 bg-white px-2 text-[10px] outline-none focus:border-blue-500"
          >
            {statusOptions[activeTab].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {(currentFilterType === "full" || currentFilterType === "tukar") && (
          <>
            <AmountFilter label="Sisa tagihan" />
            <AmountFilter label="Total" />
          </>
        )}

        {currentFilterType !== "tukar" && <TagFilter />}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-700">
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-[19px] font-semibold text-slate-800">
            Pembelian
          </h1>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setImportOpen(true)}
              className="flex h-8 items-center rounded border border-slate-300 bg-white px-4 text-[10px] font-medium text-blue-600 hover:bg-slate-50"
            >
              Impor
            </button>

            <button
              type="button"
              disabled
              className="flex h-8 cursor-not-allowed items-center rounded bg-slate-100 px-4 text-[10px] font-medium text-slate-400"
            >
              Buat pembelian baru
              <CaretDown size={11} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="h-[72px] rounded border border-amber-400 bg-white px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium">
                Faktur belum dibayar
              </span>

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] text-white">
                0
              </span>
            </div>

            <div className="mt-1 text-[9px] text-slate-500">Total</div>

            <div className="text-[16px]">Rp 0,00</div>
          </div>

          <div className="h-[72px] rounded border border-red-400 bg-white px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium">
                Faktur telat dibayar
              </span>

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                0
              </span>
            </div>

            <div className="mt-1 text-[9px] text-slate-500">Total</div>

            <div className="text-[16px]">Rp 0,00</div>
          </div>

          <div className="h-[72px] rounded border border-emerald-400 bg-white px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium">
                Pelunasan 30 hari terakhir
              </span>

              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white">
                0
              </span>
            </div>

            <div className="mt-1 text-[9px] text-slate-500">Total</div>

            <div className="text-[16px]">Rp 0,00</div>
          </div>

          <div className="h-[72px] rounded bg-white px-3 py-2">
            <div className="flex items-center gap-3">
              <img
                src={mekariPayLogo}
                alt="Mekari Pay"
                className="h-[48px] w-[70px] object-contain"
              />

              <div>
                <div className="text-[10px] font-medium leading-4">
                  Gratis 100x kirim pembayaran per bulan
                </div>

                <div className="text-[9px] text-blue-600">Cek Mekari Pay</div>
              </div>
            </div>

            <div className="mt-1 text-[8px] text-slate-500">
              Saldo adalah untuk semua jangka waktu, kecuali ada pernyataan lain
            </div>
          </div>
        </div>

        <div className="mt-5 border-b border-slate-300">
          <div className="flex items-end gap-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`relative whitespace-nowrap pb-3 text-[10px] ${
                  activeTab === tab
                    ? "font-medium text-blue-600"
                    : "text-slate-600"
                }`}
              >
                {tab}

                {tab === "Membutuhkan persetujuan" && (
                  <span className="ml-1 inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-slate-500 px-1 text-[8px] text-white">
                    0
                  </span>
                )}

                {activeTab === tab && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-8 w-[136px] rounded border border-slate-300 bg-white px-2 text-[10px] outline-none"
          >
            {statusOptions[activeTab].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-[195px] items-center rounded border border-slate-300 bg-white">
              <MagnifyingGlass size={14} className="ml-2 text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari transaksi"
                className="w-full px-2 text-[10px] outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex h-8 items-center gap-1 rounded border border-blue-300 bg-white px-3 text-[10px] font-medium text-blue-600 hover:bg-blue-50"
            >
              <Funnel size={14} />
              Filter
            </button>
          </div>
        </div>

        <div className="mt-2 min-h-[310px] bg-white">
          <div className="flex min-h-[310px] flex-col items-center justify-center">
            <img
              src={purchaseFolder}
              alt="Folder kosong"
              className="mb-3 h-[150px] w-[210px] object-contain"
            />

            <h3 className="text-[11px] font-semibold text-slate-800">
              {currentContent.title}
            </h3>

            <p className="mt-1 text-[9px] text-slate-500">
              {currentContent.description}
            </p>

            <button
              type="button"
              className="mt-3 rounded bg-blue-600 px-3 py-2 text-[9px] font-medium text-white"
            >
              {currentContent.button}
            </button>
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFilterOpen(false)}
          />

          <div className="absolute right-0 top-0 flex h-full w-[315px] flex-col bg-white shadow-xl">
            <div className="flex h-12 items-center justify-between border-b border-slate-200 px-3">
              <h2 className="text-[11px] font-semibold">
                Filter transaksi pembelian
              </h2>

              <button type="button" onClick={() => setFilterOpen(false)}>
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
              {renderFilterFields()}
            </div>

            <div className="flex h-12 items-center justify-between border-t border-slate-200 px-3">
              <button
                type="button"
                className="flex items-center gap-1 text-[10px] text-blue-600"
              >
                <ArrowCounterClockwise size={14} />
                Atur ulang
              </button>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="text-[10px] font-medium text-slate-500"
                >
                  Batalkan
                </button>

                <button
                  type="button"
                  onClick={() => setFilterOpen(false)}
                  className="rounded bg-blue-600 px-3 py-2 text-[10px] font-medium text-white"
                >
                  Terapkan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {importOpen && <ImportModal onClose={() => setImportOpen(false)} />}
    </div>
  );
}
