import { useState } from "react";
import {
    MagnifyingGlass,
    Funnel,
    X,
    ArrowCounterClockwise,
    CaretDown,
    Warning,
    CalendarBlank,
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
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                {label}
            </label>

            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Tanggal mulai"
                        className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 pr-8 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm placeholder:text-slate-400"
                    />

                    <CalendarBlank
                        size={15}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                </div>

                <span className="text-xs text-slate-400 font-medium">-</span>

                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Tanggal selesai"
                        className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 pr-8 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm placeholder:text-slate-400"
                    />

                    <CalendarBlank
                        size={15}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                </div>
            </div>
        </div>
    );
}

function AmountFilter({ label }) {
    const [type, setType] = useState("Lebih dari");

    return (
        <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                {label}
            </label>

            <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="radio"
                        name={`${label}-type`}
                        checked={type === "Lebih dari"}
                        onChange={() => setType("Lebih dari")}
                        className="h-3.5 w-3.5 accent-blue-600 cursor-pointer"
                    />
                    Lebih dari
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="radio"
                        name={`${label}-type`}
                        checked={type === "Di antara"}
                        onChange={() => setType("Di antara")}
                        className="h-3.5 w-3.5 accent-blue-600 cursor-pointer"
                    />
                    Di antara
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="radio"
                        name={`${label}-type`}
                        checked={type === "Kurang dari"}
                        onChange={() => setType("Kurang dari")}
                        className="h-3.5 w-3.5 accent-blue-600 cursor-pointer"
                    />
                    Kurang dari
                </label>
            </div>

            <input
                type="text"
                placeholder="0"
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm placeholder:text-slate-400"
            />
        </div>
    );
}

function TagFilter() {
    return (
        <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Tag tambahan
            </label>

            <select className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm">
                <option value="">Pilih tag</option>
            </select>

            <div className="mt-2.5 flex items-center gap-4 text-xs text-slate-600">
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="tag-filter" defaultChecked className="h-3.5 w-3.5 accent-blue-600 cursor-pointer" />
                    Semua tag
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="tag-filter" className="h-3.5 w-3.5 accent-blue-600 cursor-pointer" />
                    Salah satu
                </label>

                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-300 cursor-help" title="Informasi tag">
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
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Kata kunci
                    </label>

                    <div className="relative">
                        <MagnifyingGlass
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Cari transaksi..."
                            className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Opsi kolom
                    </label>

                    <select
                        value={column}
                        onChange={(e) => setColumn(e.target.value)}
                        className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
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
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-9 w-full rounded-md border border-slate-300 bg-white px-3 text-xs text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
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
    }; return (
        <div className="-m-4 md:-m-6 min-h-[calc(100vh-64px)] bg-[#f8fafc] p-4 md:p-6 text-slate-700">
            <div className="mx-auto max-w-[1500px]">
                {/* Header */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                        Pembelian
                    </h1>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => setImportOpen(true)}
                            className="flex h-9 items-center rounded-md border border-slate-300 bg-white px-4 text-xs font-semibold text-blue-600 hover:bg-slate-50 shadow-sm transition-colors"
                        >
                            Impor
                        </button>

                        <button
                            type="button"
                            disabled
                            className="flex h-9 cursor-not-allowed items-center rounded-md bg-slate-100 px-4 text-xs font-medium text-slate-400 shadow-inner"
                        >
                            Buat pembelian baru
                            <CaretDown size={14} className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Summary Stat Cards */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1: Faktur belum dibayar (kuning) */}
<div className="overflow-hidden rounded-lg border border-amber-300 bg-white shadow-sm transition-all hover:shadow-md">
    {/* Header kuning */}
    <div className="flex items-center justify-between bg-amber-50 border-b border-amber-100 px-3.5 py-2">
        <span className="text-xs font-semibold text-slate-700">
            Faktur belum dibayar
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-sm">
            0
        </span>
    </div>

    {/* Body putih */}
    <div className="p-3.5">
        <div className="text-[11px] text-slate-400">Total</div>
        <div className="text-base font-bold text-slate-800">Rp 0,00</div>
    </div>
</div>

{/* Card 2: Faktur telat dibayar (merah) */}
<div className="overflow-hidden rounded-lg border border-red-300 bg-white shadow-sm transition-all hover:shadow-md">
    {/* Header merah */}
    <div className="flex items-center justify-between bg-red-50 border-b border-red-100 px-3.5 py-2">
        <span className="text-xs font-semibold text-slate-700">
            Faktur telat dibayar
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
            0
        </span>
    </div>

    {/* Body putih */}
    <div className="p-3.5">
        <div className="text-[11px] text-slate-400">Total</div>
        <div className="text-base font-bold text-slate-800">Rp 0,00</div>
    </div>
</div>

{/* Card 3: Pelunasan 30 hari terakhir (hijau) */}
<div className="overflow-hidden rounded-lg border border-emerald-300 bg-white shadow-sm transition-all hover:shadow-md">
    {/* Header hijau */}
    <div className="flex items-center justify-between bg-emerald-50 border-b border-emerald-100 px-3.5 py-2">
        <span className="text-xs font-semibold text-slate-700">
            Pelunasan 30 hari terakhir
        </span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white shadow-sm">
            0
        </span>
    </div>

    {/* Body putih */}
    <div className="p-3.5">
        <div className="text-[11px] text-slate-400">Total</div>
        <div className="text-base font-bold text-slate-800">Rp 0,00</div>
    </div>
</div>

                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                        <div className="flex items-center gap-2.5">
                            <img
                                src={mekariPayLogo}
                                alt="Mekari Pay"
                                className="h-9 w-14 object-contain flex-shrink-0"
                            />

                            <div>
                                <div className="text-[11px] font-semibold text-slate-700 leading-snug">
                                    Gratis 100x kirim pembayaran per bulan
                                </div>

                                <span className="text-[10px] font-medium text-blue-600 hover:underline cursor-pointer">
                                    Cek Mekari Pay
                                </span>
                            </div>
                        </div>

                        <div className="mt-1 text-[9px] text-slate-400">
                            Saldo adalah untuk semua jangka waktu, kecuali ada pernyataan lain
                        </div>
                    </div>
                </div>

                {/* Tabs Bar */}
                <div className="mt-6 border-b border-slate-200">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => handleTabChange(tab)}
                                className={`relative whitespace-nowrap pb-3 text-xs font-medium transition-colors ${activeTab === tab
                                        ? "text-blue-600 font-semibold"
                                        : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                {tab}

                                {tab === "Membutuhkan persetujuan" && (
                                    <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-500 px-1 text-[9px] font-bold text-white">
                                        0
                                    </span>
                                )}

                                {activeTab === tab && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-t-sm" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="h-9 rounded-md border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                        >
                            {statusOptions[activeTab].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-60 items-center rounded-md border border-slate-300 bg-white px-3 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                            <MagnifyingGlass size={16} className="text-slate-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari transaksi..."
                                className="h-full w-full border-none bg-transparent px-2 text-xs outline-none focus:border-none focus:outline-none focus:ring-0 placeholder:text-slate-400"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => setFilterOpen(true)}
                            className="flex h-9 items-center gap-1.5 rounded-md border border-blue-600 bg-white px-3.5 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
                        >
                            <Funnel size={14} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Main Empty Content Card */}
                <div className="mt-4 min-h-[380px] rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center p-8 text-center">
                    <img
                        src={purchaseFolder}
                        alt="Folder kosong"
                        className="mb-4 h-40 w-52 object-contain"
                    />

                    <h3 className="text-sm font-bold text-slate-800">
                        {currentContent.title}
                    </h3>

                    <p className="mt-1.5 max-w-sm text-xs text-slate-500 leading-relaxed">
                        {currentContent.description}
                    </p>

                    <button
                        type="button"
                        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 transition-colors"
                    >
                        {currentContent.button}
                    </button>
                </div>
            </div>

            {filterOpen && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
                        onClick={() => setFilterOpen(false)}
                    />

                    <div className="absolute right-0 top-0 flex h-full w-[360px] max-w-full flex-col bg-white shadow-2xl transition-transform">
                        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-5">
                            <h2 className="text-sm font-bold text-slate-800">
                                Filter transaksi pembelian
                            </h2>

                            <button
                                type="button"
                                onClick={() => setFilterOpen(false)}
                                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
                            {renderFilterFields()}
                        </div>

                        <div className="flex h-16 items-center justify-between border-t border-slate-200 bg-slate-50/80 px-5">
                            <button
                                type="button"
                                className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                <ArrowCounterClockwise size={15} />
                                Atur ulang
                            </button>

                            <div className="flex items-center gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setFilterOpen(false)}
                                    className="rounded-md px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors"
                                >
                                    Batalkan
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFilterOpen(false)}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
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
