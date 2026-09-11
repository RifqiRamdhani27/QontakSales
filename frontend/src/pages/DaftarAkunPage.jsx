import { useState, useEffect, useCallback } from "react";
import XLSXStyle from "xlsx-js-style";
import {
  Box, Flex, Text, Button, Input, Select, Badge,
  HStack, VStack, Spinner, IconButton,
  Table, Dialog, Field, createListCollection,
} from "@chakra-ui/react";
import {
  MagnifyingGlass, Plus, PencilSimple, Trash, X, FloppyDisk, BookOpen, LockKey,
  List, FileXls, UploadSimple, User,
} from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import brandLogo from "@/assets/brand.png";

const KATEGORI_LIST = [
  "Cash & Bank",
  "Accounts Receivable (A/R)",
  "Inventory",
  "Other Current Assets",
  "Fixed Assets",
  "Depreciation & Amortization",
  "Other Assets",
  "Accounts Payable (A/P)",
  "Other Current Liabilities",
  "Long Term Liabilities",
  "Equity",
  "Income",
  "Cost of Sales",
  "Expenses",
  "Other Income",
  "Other Expense",
];

const KATEGORI_COLORS = {
  "Cash & Bank": { bg: "#DBEAFE", color: "#1D4ED8" },
  "Accounts Receivable (A/R)": { bg: "#D1FAE5", color: "#065F46" },
  "Inventory": { bg: "#FEF3C7", color: "#92400E" },
  "Other Current Assets": { bg: "#EDE9FE", color: "#5B21B6" },
  "Fixed Assets": { bg: "#FCE7F3", color: "#9D174D" },
  "Depreciation & Amortization": { bg: "#FEE2E2", color: "#991B1B" },
  "Other Assets": { bg: "#E0F2FE", color: "#0369A1" },
  "Accounts Payable (A/P)": { bg: "#FEF9C3", color: "#713F12" },
  "Other Current Liabilities": { bg: "#FFE4E6", color: "#9F1239" },
  "Long Term Liabilities": { bg: "#F1F5F9", color: "#334155" },
  "Equity": { bg: "#DCFCE7", color: "#166534" },
  "Income": { bg: "#CFFAFE", color: "#155E75" },
  "Cost of Sales": { bg: "#FFF7ED", color: "#9A3412" },
  "Expenses": { bg: "#F3E8FF", color: "#6B21A8" },
  "Other Income": { bg: "#D1FAE5", color: "#047857" },
  "Other Expense": { bg: "#FEE2E2", color: "#B91C1C" },
};

const formatIDR = (value) => {
  const num = parseFloat(value) || 0;
  const absNum = Math.abs(num);
  const formatted = absNum.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return num < 0 ? `(${formatted})` : formatted;
};

function RoundCheckbox({ checked, onChange, title }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        if (onChange) onChange(e);
      }}
      title={title}
      style={{
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        border: checked ? "1.5px solid #0077CC" : "1.5px solid #94A3B8",
        backgroundColor: checked ? "#0077CC" : "#FFFFFF",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.15s ease-in-out",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg
          width="9"
          height="9"
          viewBox="0 0 12 12"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="2.5 6 5 8.5 9.5 3.5" />
        </svg>
      )}
    </div>
  );
}

const EMPTY_FORM = {
  kode_akun: "",
  nama_akun: "",
  kategori_akun: "",
  pengguna: "all",
  pajak: "",
  deskripsi_pajak: "",
  saldo: "0",
};

export default function DaftarAkunPage() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  const [selectedIds, setSelectedIds] = useState([]);
  const [tindakanOpen, setTindakanOpen] = useState(false);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [penggunaOption, setPenggunaOption] = useState("all");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const isAllSelected = accounts.length > 0 && accounts.every((a) => selectedIds.includes(a.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(accounts.map((a) => a.id));
    }
  };

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedIds) {
        await api.delete(`/coa/${id}/`);
      }
      setSelectedIds([]);
      setBulkDeleteOpen(false);
      fetchAccounts();
    } catch {
      setBulkDeleteOpen(false);
    }
  };

  const exportCOAToXLSX = async () => {
    try {
      const res = await api.get("/coa/", { params: { page_size: 1000 } });
      const allData = res.data.results ?? res.data;

      const wb = XLSXStyle.utils.book_new();
      const wsData = [];

      // Row 1 (empty for spacing)
      wsData.push([{ v: "", s: {} }]);

      // Row 2: Main Title
      const titleStyle = {
        font: { bold: true, sz: 16, color: { rgb: "FFFFFF" }, name: "Calibri" },
        fill: { fgColor: { rgb: "1A3A5C" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "FFFFFF" } },
          bottom: { style: "thin", color: { rgb: "FFFFFF" } },
        },
      };
      wsData.push([
        { v: "DAFTAR AKUN (CHART OF ACCOUNTS)", s: titleStyle },
        { v: "", s: titleStyle },
        { v: "", s: titleStyle },
        { v: "", s: titleStyle },
        { v: "", s: titleStyle },
        { v: "", s: titleStyle },
      ]);

      // Row 3: Sub-title (company name)
      const subTitleStyle = {
        font: { italic: true, sz: 11, color: { rgb: "FFFFFF" }, name: "Calibri" },
        fill: { fgColor: { rgb: "1A3A5C" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
      wsData.push([
        { v: "QontakSales", s: subTitleStyle },
        { v: "", s: subTitleStyle },
        { v: "", s: subTitleStyle },
        { v: "", s: subTitleStyle },
        { v: "", s: subTitleStyle },
        { v: "", s: subTitleStyle },
      ]);

      // Row 4: Empty spacer
      wsData.push([{ v: "", s: {} }, { v: "", s: {} }, { v: "", s: {} }, { v: "", s: {} }, { v: "", s: {} }, { v: "", s: {} }]);

      // Row 5: Column headers
      const headerStyle = {
        font: { bold: true, sz: 11, color: { rgb: "FFFFFF" }, name: "Calibri" },
        fill: { fgColor: { rgb: "2563EB" } },
        alignment: { horizontal: "center", vertical: "center", wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "FFFFFF" } },
          bottom: { style: "medium", color: { rgb: "1A3A5C" } },
          left: { style: "thin", color: { rgb: "FFFFFF" } },
          right: { style: "thin", color: { rgb: "FFFFFF" } },
        },
      };
      wsData.push([
        { v: "Kode Akun", s: headerStyle },
        { v: "Nama Akun", s: headerStyle },
        { v: "Kategori Akun", s: headerStyle },
        { v: "Pengguna", s: headerStyle },
        { v: "Pajak", s: headerStyle },
        { v: "Saldo (IDR)", s: headerStyle },
      ]);

      // Data rows
      allData.forEach((a, idx) => {
        const isEven = idx % 2 === 0;
        const rowBg = isEven ? "FFFFFF" : "DBEAFE";
        const cellStyle = {
          font: { sz: 10, color: { rgb: "1E3A5F" }, name: "Calibri" },
          fill: { fgColor: { rgb: rowBg } },
          alignment: { vertical: "center", wrapText: false },
          border: {
            top: { style: "hair", color: { rgb: "BFD7F5" } },
            bottom: { style: "hair", color: { rgb: "BFD7F5" } },
            left: { style: "thin", color: { rgb: "BFD7F5" } },
            right: { style: "thin", color: { rgb: "BFD7F5" } },
          },
        };
        const centerStyle = { ...cellStyle, alignment: { ...cellStyle.alignment, horizontal: "center" } };
        const rightStyle = { ...cellStyle, alignment: { ...cellStyle.alignment, horizontal: "right" } };
        wsData.push([
          { v: a.kode_akun, s: centerStyle },
          { v: a.nama_akun, s: cellStyle },
          { v: a.kategori_akun, s: centerStyle },
          { v: a.pengguna || "all", s: centerStyle },
          { v: a.pajak || "-", s: centerStyle },
          { v: parseFloat(a.saldo).toLocaleString("id-ID"), s: rightStyle },
        ]);
      });

      const ws = XLSXStyle.utils.aoa_to_sheet(wsData);

      // Merge cells for title rows (A1:F1 spacer, A2:F2 title, A3:F3 subtitle)
      ws["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // row 1 spacer
        { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } }, // row 2 title
        { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } }, // row 3 subtitle
        { s: { r: 3, c: 0 }, e: { r: 3, c: 5 } }, // row 4 spacer
      ];

      // Column widths
      ws["!cols"] = [
        { wch: 14 }, // Kode Akun
        { wch: 40 }, // Nama Akun
        { wch: 28 }, // Kategori Akun
        { wch: 18 }, // Pengguna
        { wch: 12 }, // Pajak
        { wch: 18 }, // Saldo
      ];

      // Row heights
      ws["!rows"] = [
        { hpt: 8 },   // row 1 spacer
        { hpt: 30 },  // row 2 title
        { hpt: 20 },  // row 3 subtitle
        { hpt: 8 },   // row 4 spacer
        { hpt: 22 },  // row 5 headers
        ...allData.map(() => ({ hpt: 18 })),
      ];

      XLSXStyle.utils.book_append_sheet(wb, ws, "Daftar Akun");
      XLSXStyle.writeFile(wb, `Daftar_Akun_COA_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (err) {
      console.error("Failed to export COA:", err);
    }
  };

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, page_size: pageSize };
      if (search) params.search = search;
      if (filterKategori) params.kategori = filterKategori;
      const res = await api.get("/coa/", { params });
      setAccounts(res.data.results ?? res.data);
      setTotalCount(res.data.count ?? (res.data.results ?? res.data).length);
    } catch {
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  }, [page, search, filterKategori]);

  useEffect(() => {
    setPage(1);
  }, [search, filterKategori]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setPenggunaOption("all");
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (acct) => {
    setEditTarget(acct);
    const pVal = acct.pengguna || "all";
    let option = "all";
    if (pVal === "Rifqi Ramdhani") option = "sebagian";
    else if (pVal === "Sales Manager" || pVal === "Sales Agent") option = "peran";
    setPenggunaOption(option);
    setForm({
      kode_akun: acct.kode_akun,
      nama_akun: acct.nama_akun,
      kategori_akun: acct.kategori_akun,
      pengguna: pVal,
      pajak: acct.pajak || "",
      deskripsi_pajak: acct.deskripsi_pajak || "",
      saldo: String(acct.saldo),
    });
    setFormError("");
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.kode_akun.trim() || !form.nama_akun.trim() || !form.kategori_akun) {
      setFormError("Kode Akun, Nama Akun, dan Kategori wajib diisi.");
      return;
    }
    setSaving(true);
    setFormError("");
    try {
      const payload = { ...form, saldo: parseFloat(form.saldo) || 0 };
      if (editTarget) {
        await api.put(`/coa/${editTarget.id}/`, payload);
      } else {
        await api.post("/coa/", payload);
      }
      setModalOpen(false);
      fetchAccounts();
    } catch (err) {
      const data = err.response?.data;
      if (data?.kode_akun) setFormError(`Kode Akun: ${data.kode_akun[0]}`);
      else setFormError("Gagal menyimpan. Periksa kembali data Anda.");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (acct) => {
    setDeleteTarget(acct);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/coa/${deleteTarget.id}/`);
      setDeleteOpen(false);
      fetchAccounts();
    } catch {
      setDeleteOpen(false);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <Box p={{ base: 4, md: 6 }} bg="background" minH="100vh">
      {/* Header */}
      <Flex align="center" justify="space-between" mb={6} flexWrap="wrap" gap={3}>
        <HStack gap={3}>
          <Box w="36px" h="36px" overflow="hidden" display="flex" alignItems="center" justifyContent="flex-start">
            <Box
              as="img"
              src={brandLogo}
              h="36px"
              style={{ objectFit: "cover", objectPosition: "left center", maxWidth: "none" }}
              alt="Daftar Akun"
            />
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="xl" color="foreground" lineHeight="1.2">
              Daftar Akun
            </Text>
            <Text fontSize="sm" color="gray.500">
              Chart of Accounts (COA)
            </Text>
          </Box>
        </HStack>
        {/* Action Buttons Group */}
        <HStack gap={3}>
          {/* Buat Jurnal Umum Button */}
          <Button
            bg="#1d62a4ff"
            color="white"
            _hover={{ bg: "#163859" }}
            _active={{ bg: "#091D30" }}
            size="sm"
            borderRadius="md"
            fontWeight="600"
            fontSize="14px"
            px={4}
            h="38px"
            boxShadow="0 4px 14px rgba(0, 0, 0, 0.3)"
            display="flex"
            alignItems="center"
            gap={2}
            onClick={() => navigate("/jurnal-umum")}
          >
            <Plus size={16} weight="bold" />
            Buat Jurnal Umum
          </Button>

          {/* Single Navy Blue Tindakan Button */}
          <Box position="relative">
          <Button
            onClick={() => setTindakanOpen(!tindakanOpen)}
            bg="#1d62a4ff"
            color="white"
            _hover={{ bg: "#163859" }}
            _active={{ bg: "#091D30" }}
            size="sm"
            borderRadius="md"
            fontWeight="600"
            fontSize="14px"
            px={0}
            h="38px"
            boxShadow="0 4px 14px rgba(0, 0, 0, 0.3)"
            display="flex"
            alignItems="center"
            overflow="hidden"
          >
            <Box px={4} py={2}>Tindakan</Box>
            <Box px={3} py={2} borderLeft="1px solid rgba(255,255,255,0.2)" display="flex" alignItems="center">
              <List size={18} weight="bold" />
            </Box>
          </Button>

          {/* Dropdown Menu */}
          {tindakanOpen && (
            <>
              <Box position="fixed" inset={0} zIndex={90} onClick={() => setTindakanOpen(false)} />
              
              <Box
                position="absolute"
                right={0}
                top="44px"
                w="250px"
                bg="white"
                borderRadius="xl"
                shadow="2xl"
                border="1px solid #E2E8F0"
                py={2}
                zIndex={100}
                fontFamily="Segoe UI, -apple-system, sans-serif"
              >
                {/* Item 1: Buat Akun Baru */}
                <Flex
                  align="center" gap={3} px={4} py={2.5} cursor="pointer"
                  fontSize="13px" color="#1E293B" fontWeight="500"
                  _hover={{ bg: "#F1F5F9" }}
                  onClick={() => { setTindakanOpen(false); openCreate(); }}
                >
                  <Plus size={16} color="#0F172A" />
                  <Text>Buat Akun Baru</Text>
                </Flex>

                {/* Item 2: Hapus Semua / Hapus Terpilih (ONLY shows when items are selected) */}
                {selectedIds.length > 0 && (
                  <Flex
                    align="center" gap={3} px={4} py={2.5} cursor="pointer"
                    fontSize="13px" color="#DC2626" fontWeight="600"
                    _hover={{ bg: "#FEF2F2" }}
                    onClick={() => { setTindakanOpen(false); setBulkDeleteOpen(true); }}
                  >
                    <Trash size={16} color="#DC2626" />
                    <Text>{isAllSelected ? "Hapus Semua Akun" : `Hapus ${selectedIds.length} Akun Terpilih`}</Text>
                  </Flex>
                )}

                {/* Item 3: Tutup buku & kunci periode */}
                <Flex
                  align="center" gap={3} px={4} py={2.5} cursor="pointer"
                  fontSize="13px" color="#1E293B" fontWeight="500"
                  _hover={{ bg: "#F1F5F9" }}
                  onClick={() => { setTindakanOpen(false); navigate("/tutup-buku"); }}
                >
                  <BookOpen size={16} color="#0F172A" />
                  <Text>Tutup buku & kunci periode</Text>
                </Flex>

                <Box borderBottom="1px solid #E2E8F0" my={1.5} />


                {/* Item 5: Ekspor Akun */}
                <Flex
                  align="center" gap={3} px={4} py={2.5} cursor="pointer"
                  fontSize="13px" color="#1E293B" fontWeight="500"
                  _hover={{ bg: "#F1F5F9" }}
                  onClick={() => { setTindakanOpen(false); exportCOAToXLSX(); }}
                >
                  <FileXls size={16} color="#0F172A" />
                  <Text>Ekspor Akun (.xlsx)</Text>
                </Flex>
              </Box>
            </>
          )}
        </Box>
        </HStack>
      </Flex>

      {/* Filters */}
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="border" p={4} mb={4}>
        <Flex gap={3} flexWrap="wrap">
          <Box position="relative" flex={1} minW="220px">
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)" color="gray.400" zIndex={1}>
              <MagnifyingGlass size={16} />
            </Box>
            <Input
              pl={9}
              placeholder="Cari kode atau nama akun..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="lg"
              borderColor="border"
              _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.08)" }}
              fontSize="sm"
            />
          </Box>
          <Box minW="200px">
            <select
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #E4ECFC",
                fontSize: "14px",
                color: filterKategori ? "#0F172A" : "#94A3B8",
                background: "white",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="">Pilih Kategori</option>
              {KATEGORI_LIST.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </Box>
        </Flex>
      </Box>

      {/* Notice & Table */}
      <Box bg="white" borderRadius="lg" border="1px solid" borderColor="#E2E8F0" overflow="hidden">
        {/* Top Info Banner */}
        <Flex justify="flex-end" px={4} py={2} bg="#F8FAFC" borderBottom="1px solid #E2E8F0">
        </Flex>

        {loading ? (
          <Flex justify="center" align="center" py={16}>
            <Spinner color="primary" size="lg" />
          </Flex>
        ) : accounts.length === 0 ? (
          <Flex justify="center" align="center" py={16} direction="column" gap={2}>
            <Box w="40px" h="40px" overflow="hidden" display="flex" alignItems="center" justifyContent="flex-start" opacity={0.5}>
              <Box
                as="img"
                src={brandLogo}
                h="40px"
                style={{ objectFit: "cover", objectPosition: "left center", maxWidth: "none" }}
                alt="Icon"
              />
            </Box>
            <Text color="gray.400" fontSize="sm">Tidak ada akun ditemukan</Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Segoe UI, -apple-system, sans-serif" }}>
              <thead>
                <tr style={{ background: "#E0F2FE", borderBottom: "1px solid #BAE6FD" }}>
                  <th style={{ padding: "8px 12px", width: "36px", textAlign: "center" }}>
                    <Flex justify="center" align="center">
                      <RoundCheckbox
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        title="Pilih Semua"
                      />
                    </Flex>
                  </th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Kunci</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Kode Akun</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Nama Akun</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Kategori Akun</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Pengguna</th>
                  <th style={{ padding: "8px 12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Pajak</th>
                  <th style={{ padding: "8px 12px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Saldo (dalam IDR)</th>
                  <th style={{ padding: "8px 12px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#0F172A", whiteSpace: "nowrap" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acct, idx) => {
                  const isLocked = acct.is_system || acct.is_locked ||
                    acct.kode_akun.startsWith("1-10001") ||
                    acct.kode_akun.startsWith("1-10002") ||
                    acct.kode_akun.startsWith("1-10003") ||
                    acct.kode_akun.startsWith("1-10100") ||
                    acct.kode_akun.startsWith("1-10101") ||
                    acct.kode_akun.startsWith("1-10102") ||
                    acct.kode_akun.startsWith("1-10200") ||
                    acct.kode_akun.startsWith("1-10402") ||
                    acct.kode_akun.startsWith("1-10500") ||
                    acct.kode_akun.startsWith("2-20100") ||
                    acct.kode_akun.startsWith("2-20200") ||
                    acct.kode_akun.startsWith("3-30000");
                  const hasPlus = acct.kode_akun.startsWith("1-10100") || acct.kode_akun.startsWith("1-10101") || acct.kode_akun.startsWith("1-10200") || acct.kode_akun.startsWith("1-10402") || acct.kode_akun.startsWith("1-10500");
                  const isSelected = selectedIds.includes(acct.id);

                  return (
                    <tr
                      key={acct.id}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        background: isSelected ? "#F0F9FF" : "white",
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#334155",
                        height: "36px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = isSelected ? "#E0F2FE" : "#F8FAFC"}
                      onMouseLeave={(e) => e.currentTarget.style.background = isSelected ? "#F0F9FF" : "white"}
                    >
                      <td style={{ padding: "6px 12px", textAlign: "center" }}>
                        <Flex justify="center" align="center">
                          <RoundCheckbox
                            checked={isSelected}
                            onChange={() => toggleSelectRow(acct.id)}
                          />
                        </Flex>
                      </td>
                      <td style={{ padding: "6px 12px", color: "#475569", whiteSpace: "nowrap" }}>
                        {isLocked ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", color: "#000000", fontSize: "12px", fontWeight: "600" }}>
                            <LockKey size={13} color="#000000" weight="bold" />
                            {hasPlus ? " +" : ""}
                          </span>
                        ) : (
                          <span style={{ fontSize: "12px", color: "#94A3B8" }}>–</span>
                        )}
                      </td>
                      <td style={{ padding: "6px 12px", whiteSpace: "nowrap", color: "#334155" }}>
                        {acct.kode_akun}
                      </td>
                      <td style={{ padding: "6px 12px" }}>
                        <span
                          style={{ color: "#0077CC", cursor: "pointer", textDecoration: "none" }}
                          onClick={() => openEdit(acct)}
                          onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                          onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                        >
                          {acct.nama_akun}
                        </span>
                      </td>
                      <td style={{ padding: "6px 12px", whiteSpace: "nowrap" }}>
                        <span
                          style={{ color: "#0077CC", cursor: "pointer" }}
                          onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                          onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                        >
                          {acct.kategori_akun}
                        </span>
                      </td>
                      <td style={{ padding: "6px 12px", color: "#475569" }}>
                        {acct.pengguna || "all"}
                      </td>
                      <td style={{ padding: "6px 12px", color: "#475569" }}>
                        {acct.pajak || ""}
                      </td>
                      <td style={{ padding: "6px 12px", textAlign: "right", whiteSpace: "nowrap", color: "#1E293B", fontFamily: "Segoe UI, sans-serif" }}>
                        {formatIDR(acct.saldo)}
                      </td>
                      <td style={{ padding: "6px 12px", textAlign: "right", whiteSpace: "nowrap" }}>
                        <HStack gap={1} justify="flex-end">
                          <IconButton
                            size="xs"
                            variant="ghost"
                            color="#0077CC"
                            _hover={{ bg: "#F0F9FF" }}
                            onClick={() => openEdit(acct)}
                            aria-label="Edit"
                            borderRadius="md"
                            title="Edit Akun"
                          >
                            <PencilSimple size={14} />
                          </IconButton>
                          {isLocked ? (
                            <Box
                              as="span"
                              display="inline-flex"
                              title="Tidak dapat menghapus akun sistem / akun bawaan default"
                              style={{ cursor: "not-allowed" }}
                            >
                              <IconButton
                                size="xs"
                                variant="ghost"
                                color="gray.800"
                                disabled
                                aria-label="Tidak dapat dihapus"
                                borderRadius="md"
                                opacity={0.4}
                                _hover={{ bg: "transparent" }}
                                style={{ cursor: "not-allowed", pointerEvents: "none" }}
                              >
                                <Trash size={14} />
                              </IconButton>
                            </Box>
                          ) : (
                            <IconButton
                              size="xs"
                              variant="ghost"
                              color="red.500"
                              _hover={{ bg: "red.50" }}
                              onClick={() => confirmDelete(acct)}
                              aria-label="Hapus"
                              borderRadius="md"
                              title="Hapus Akun"
                            >
                              <Trash size={14} />
                            </IconButton>
                          )}
                        </HStack>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        )}

        {/* Pagination */}
        {!loading && totalCount > 0 && (
          <Flex
            justify="space-between" align="center"
            px={4} py={2.5} borderTop="1px solid" borderColor="#E2E8F0"
            flexWrap="wrap" gap={2} bg="#F8FAFC"
          >
            <Text fontSize="12px" color="#64748B">
              Menampilkan {Math.min((page - 1) * pageSize + 1, totalCount)}–{Math.min(page * pageSize, totalCount)} dari {totalCount} akun
            </Text>
            <HStack gap={2}>
              <Button
                size="xs" variant="outline" borderColor="#CBD5E1"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                borderRadius="md"
                fontSize="12px"
              >
                ← Sebelumnya
              </Button>
              <Text fontSize="12px" color="#475569" px={1}>{page} / {totalPages}</Text>
              <Button
                size="xs" variant="outline" borderColor="#CBD5E1"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                borderRadius="md"
                fontSize="12px"
              >
                Berikutnya →
              </Button>
            </HStack>
          </Flex>
        )}
      </Box>

      {/* Modal Tambah/Edit */}
      {modalOpen && (
        <Box
          position="fixed" inset={0} bg="blackAlpha.600" zIndex={100}
          display="flex" alignItems="center" justifyContent="center" p={4}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <Box
            bg="white" borderRadius="2xl" shadow="2xl"
            w="full" maxW="500px"
            maxH="90vh" display="flex" flexDirection="column" overflow="hidden"
          >
            {/* Modal Header */}
            <Flex align="center" justify="space-between" px={6} py={4} borderBottom="1px solid" borderColor="border" flexShrink={0}>
              <HStack gap={2}>
                <Box w="24px" h="24px" overflow="hidden" display="flex" alignItems="center" justifyContent="flex-start">
                  <Box
                    as="img"
                    src={brandLogo}
                    h="24px"
                    style={{ objectFit: "cover", objectPosition: "left center", maxWidth: "none" }}
                    alt="Icon"
                  />
                </Box>
                <Text fontWeight="bold" fontSize="lg" color="foreground">
                  {editTarget ? "Edit Akun" : "Tambah Akun Baru"}
                </Text>
              </HStack>
              <IconButton
                size="sm" variant="ghost" onClick={() => setModalOpen(false)}
                borderRadius="lg" color="gray.500"
              >
                <X size={18} />
              </IconButton>
            </Flex>

            {/* Modal Body (Scrollable) */}
            <VStack
              gap={4} p={6} flex={1} overflowY="auto"
              css={{
                "&::-webkit-scrollbar": { width: "6px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": { background: "#CBD5E1", borderRadius: "10px" },
                "&::-webkit-scrollbar-thumb:hover": { background: "#94A3B8" },
              }}
            >
              {formError && (
                <Box w="full" bg="red.50" border="1px solid" borderColor="red.200" borderRadius="lg" px={4} py={3}>
                  <Text fontSize="sm" color="red.600">{formError}</Text>
                </Box>
              )}

              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1.5}>
                  Kode Akun <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  value={form.kode_akun}
                  onChange={(e) => setForm({ ...form, kode_akun: e.target.value })}
                  placeholder="Contoh: 1-10001"
                  fontFamily="mono"
                  borderRadius="lg"
                  borderColor="border"
                  _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" }}
                />
              </Box>

              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1.5}>
                  Nama Akun <span style={{ color: "red" }}>*</span>
                </Text>
                <Input
                  value={form.nama_akun}
                  onChange={(e) => setForm({ ...form, nama_akun: e.target.value })}
                  placeholder="Contoh: Kas"
                  borderRadius="lg"
                  borderColor="border"
                  _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" }}
                />
              </Box>

              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1.5}>
                  Kategori Akun <span style={{ color: "red" }}>*</span>
                </Text>
                <select
                  value={form.kategori_akun}
                  onChange={(e) => setForm({ ...form, kategori_akun: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "10px",
                    border: "1px solid #E4ECFC",
                    fontSize: "14px",
                    background: "white",
                    outline: "none",
                    color: form.kategori_akun ? "#0F172A" : "#94A3B8",
                  }}
                >
                  <option value="">Pilih kategori...</option>
                  {KATEGORI_LIST.map((k) => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </Box>

              {/* Pajak */}
              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1.5}>Pajak</Text>
                <Input
                  value={form.pajak}
                  onChange={(e) => setForm({ ...form, pajak: e.target.value })}
                  placeholder="Contoh: PPN"
                  borderRadius="lg"
                  borderColor="border"
                  _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" }}
                />
              </Box>

              {/* Deskripsi pajak */}
              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1.5}>Deskripsi pajak</Text>
                <Input
                  value={form.deskripsi_pajak}
                  onChange={(e) => setForm({ ...form, deskripsi_pajak: e.target.value })}
                  placeholder="Deskripsi pajak..."
                  borderRadius="lg"
                  borderColor="border"
                  _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" }}
                />
              </Box>

              {/* Akses akun */}
              <Box w="full" pt={2}>
                <Flex align="center" gap={2.5} mb={3}>
                  <User size={26} color="#3B82F6" weight="regular" />
                  <Text fontSize="20px" fontWeight="700" color="#0F2B48" letterSpacing="-0.01em">
                    Akses akun
                  </Text>
                </Flex>

                <Text fontSize="14px" fontWeight="600" color="#1E293B" mb={3}>
                  Pengguna yang dapat mengakses
                </Text>

                <Flex align="center" gap={6} flexWrap="wrap">
                  {/* Option 1: Semua pengguna */}
                  <Flex
                    align="center"
                    gap={2.5}
                    cursor="pointer"
                    onClick={() => {
                      setPenggunaOption("all");
                      setForm({ ...form, pengguna: "all" });
                    }}
                    userSelect="none"
                  >
                    <Box
                      w="18px"
                      h="18px"
                      borderRadius="50%"
                      border={penggunaOption === "all" ? "2px solid #3B82F6" : "1.5px solid #CBD5E1"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="white"
                      flexShrink={0}
                    >
                      {penggunaOption === "all" && <Box w="10px" h="10px" borderRadius="50%" bg="#3B82F6" />}
                    </Box>
                    <Text fontSize="14px" fontWeight="400" color="#1E293B">
                      Semua pengguna
                    </Text>
                  </Flex>

                  {/* Option 2: Sebagian pengguna */}
                  <Flex
                    align="center"
                    gap={2.5}
                    cursor="pointer"
                    onClick={() => {
                      setPenggunaOption("sebagian");
                      setForm({ ...form, pengguna: "Rifqi Ramdhani" });
                    }}
                    userSelect="none"
                  >
                    <Box
                      w="18px"
                      h="18px"
                      borderRadius="50%"
                      border={penggunaOption === "sebagian" ? "2px solid #3B82F6" : "1.5px solid #CBD5E1"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="white"
                      flexShrink={0}
                    >
                      {penggunaOption === "sebagian" && <Box w="10px" h="10px" borderRadius="50%" bg="#3B82F6" />}
                    </Box>
                    <Text fontSize="14px" fontWeight="400" color="#1E293B">
                      Sebagian pengguna
                    </Text>
                  </Flex>

                  {/* Option 3: Peran tertentu */}
                  <Flex
                    align="center"
                    gap={2.5}
                    cursor="pointer"
                    onClick={() => {
                      setPenggunaOption("peran");
                      setForm({ ...form, pengguna: "Sales Manager" });
                    }}
                    userSelect="none"
                  >
                    <Box
                      w="18px"
                      h="18px"
                      borderRadius="50%"
                      border={penggunaOption === "peran" ? "2px solid #3B82F6" : "1.5px solid #CBD5E1"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="white"
                      flexShrink={0}
                    >
                      {penggunaOption === "peran" && <Box w="10px" h="10px" borderRadius="50%" bg="#3B82F6" />}
                    </Box>
                    <Text fontSize="14px" fontWeight="400" color="#1E293B">
                      Peran tertentu
                    </Text>
                  </Flex>
                </Flex>

                {/* Sub-box for Sebagian Pengguna */}
                {penggunaOption === "sebagian" && (
                  <Box mt={3} p={3} bg="#F8FAFC" border="1px solid #E2E8F0" borderRadius="lg">
                    <Text fontSize="12px" fontWeight="600" color="#94A3B8" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                      Pilih Pengguna
                    </Text>
                    <VStack align="stretch" gap={1.5}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#334155" }}>
                        <RoundCheckbox
                          checked={form.pengguna === "Rifqi Ramdhani"}
                          onChange={() => setForm({ ...form, pengguna: form.pengguna === "Rifqi Ramdhani" ? "all" : "Rifqi Ramdhani" })}
                        />
                        Nama Akun: Rifqi Ramdhani
                      </label>
                    </VStack>
                  </Box>
                )}

                {/* Sub-box for Peran Tertentu */}
                {penggunaOption === "peran" && (
                  <Box mt={3} p={3} bg="#F8FAFC" border="1px solid #E2E8F0" borderRadius="lg">
                    <Text fontSize="12px" fontWeight="600" color="#94A3B8" mb={2} textTransform="uppercase" letterSpacing="0.05em">
                      Pilih Peran
                    </Text>
                    <VStack align="stretch" gap={1.5}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#334155" }}>
                        <input
                          type="radio"
                          name="peranChoice"
                          checked={form.pengguna === "Sales Manager"}
                          onChange={() => setForm({ ...form, pengguna: "Sales Manager" })}
                          style={{ accentColor: "#3B82F6" }}
                        />
                        Sales Manager
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "13px", color: "#334155" }}>
                        <input
                          type="radio"
                          name="peranChoice"
                          checked={form.pengguna === "Sales Agent"}
                          onChange={() => setForm({ ...form, pengguna: "Sales Agent" })}
                          style={{ accentColor: "#3B82F6" }}
                        />
                        Sales Agent
                      </label>
                    </VStack>
                  </Box>
                )}
              </Box>

            </VStack>

            {/* Modal Footer */}
            <Flex gap={3} px={6} py={4} borderTop="1px solid" borderColor="#F1F5F9" flexShrink={0} bg="white">
              <Button
                flex={1}
                variant="outline"
                borderColor="border"
                onClick={() => setModalOpen(false)}
                borderRadius="lg"
                fontWeight="semibold"
              >
                Batal
              </Button>
              <Button
                flex={1}
                bg="primary" color="white"
                _hover={{ bg: "#1D4ED8" }}
                onClick={handleSave}
                loading={saving}
                borderRadius="lg"
                fontWeight="semibold"
              >
                <FloppyDisk size={16} style={{ marginRight: 6 }} />
                {editTarget ? "Simpan Perubahan" : "Tambah Akun"}
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteOpen && (
        <Box
          position="fixed" inset={0} bg="blackAlpha.600" zIndex={100}
          display="flex" alignItems="center" justifyContent="center" p={4}
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteOpen(false); }}
        >
          <Box bg="white" borderRadius="2xl" shadow="2xl" w="full" maxW="380px" p={6}>
            <VStack gap={4} align="start">
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="foreground">Hapus Akun?</Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Akun <strong>{deleteTarget?.kode_akun} — {deleteTarget?.nama_akun}</strong> akan dihapus permanen dan tidak bisa dikembalikan.
                </Text>
              </Box>
              <Flex gap={3} w="full">
                <Button
                  flex={1} variant="outline" borderColor="border"
                  onClick={() => setDeleteOpen(false)}
                  borderRadius="lg"
                >
                  Batal
                </Button>
                <Button
                  flex={1} bg="red.500" color="white"
                  _hover={{ bg: "red.600" }}
                  onClick={handleDelete}
                  borderRadius="lg"
                  fontWeight="semibold"
                >
                  Hapus
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      )}

      {/* Modal Konfirmasi Hapus Masal */}
      {bulkDeleteOpen && (
        <Box
          position="fixed" inset={0} bg="blackAlpha.600" zIndex={100}
          display="flex" alignItems="center" justifyContent="center" p={4}
          onClick={(e) => { if (e.target === e.currentTarget) setBulkDeleteOpen(false); }}
        >
          <Box bg="white" borderRadius="2xl" shadow="2xl" w="full" maxW="400px" p={6}>
            <VStack gap={4} align="start">
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="foreground">
                  Hapus {selectedIds.length} Akun Terpilih?
                </Text>
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Semua akun yang Anda pilih ({selectedIds.length} akun) akan dihapus permanen dari database.
                </Text>
              </Box>
              <Flex gap={3} w="full">
                <Button
                  flex={1} variant="outline" borderColor="border"
                  onClick={() => setBulkDeleteOpen(false)}
                  borderRadius="lg"
                >
                  Batal
                </Button>
                <Button
                  flex={1} bg="red.500" color="white"
                  _hover={{ bg: "red.600" }}
                  onClick={handleBulkDelete}
                  borderRadius="lg"
                  fontWeight="semibold"
                >
                  Hapus Semua Terpilih
                </Button>
              </Flex>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
}
