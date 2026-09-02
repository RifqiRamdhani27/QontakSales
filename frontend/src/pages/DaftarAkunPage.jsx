import { useState, useEffect, useCallback } from "react";
import {
  Box, Flex, Text, Button, Input, Select, Badge,
  HStack, VStack, Spinner, IconButton,
  Table, Dialog, Field, createListCollection,
} from "@chakra-ui/react";
import {
  MagnifyingGlass, Plus, PencilSimple, Trash, X, FloppyDisk, BookOpen,
} from "@phosphor-icons/react";
import api from "@/services/api";

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

const EMPTY_FORM = {
  kode_akun: "",
  nama_akun: "",
  kategori_akun: "",
  pengguna: "all",
  pajak: "",
  saldo: "0",
};

export default function DaftarAkunPage() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

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
    setFormError("");
    setModalOpen(true);
  };

  const openEdit = (acct) => {
    setEditTarget(acct);
    setForm({
      kode_akun: acct.kode_akun,
      nama_akun: acct.nama_akun,
      kategori_akun: acct.kategori_akun,
      pengguna: acct.pengguna || "all",
      pajak: acct.pajak || "",
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
          <Box
            bg="primary" borderRadius="xl" p={2.5}
            display="flex" alignItems="center" justifyContent="center"
          >
            <BookOpen size={22} color="white" weight="duotone" />
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
        <Button
          bg="primary" color="white"
          _hover={{ bg: "#1D4ED8" }}
          onClick={openCreate}
          size="sm"
          borderRadius="lg"
          fontWeight="semibold"
          px={5}
        >
          <Plus size={16} weight="bold" style={{ marginRight: 6 }} />
          Tambah Akun
        </Button>
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
              _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" }}
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
              <option value="">Semua Kategori</option>
              {KATEGORI_LIST.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </Box>
        </Flex>
      </Box>

      {/* Table */}
      <Box bg="white" borderRadius="xl" border="1px solid" borderColor="border" overflow="hidden">
        {loading ? (
          <Flex justify="center" align="center" py={16}>
            <Spinner color="primary" size="lg" />
          </Flex>
        ) : accounts.length === 0 ? (
          <Flex justify="center" align="center" py={16} direction="column" gap={2}>
            <BookOpen size={40} color="#CBD5E1" weight="duotone" />
            <Text color="gray.400" fontSize="sm">Tidak ada akun ditemukan</Text>
          </Flex>
        ) : (
          <Box overflowX="auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E4ECFC", background: "#F8FAFC" }}>
                  {["Kode Akun", "Nama Akun", "Kategori Akun", "Pengguna", "Pajak", "Saldo (IDR)", "Aksi"].map((h) => (
                    <th key={h} style={{
                      padding: "12px 16px",
                      textAlign: h === "Saldo (IDR)" ? "right" : "left",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accounts.map((acct, idx) => {
                  const colors = KATEGORI_COLORS[acct.kategori_akun] || { bg: "#F1F5F9", color: "#334155" };
                  return (
                    <tr
                      key={acct.id}
                      style={{
                        borderBottom: "1px solid #F1F5F9",
                        background: idx % 2 === 0 ? "white" : "#FAFBFF",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#EFF6FF"}
                      onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? "white" : "#FAFBFF"}
                    >
                      <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                        <Text fontFamily="mono" fontSize="sm" fontWeight="semibold" color="primary">
                          {acct.kode_akun}
                        </Text>
                      </td>
                      <td style={{ padding: "12px 16px", maxWidth: "280px" }}>
                        <Text fontSize="sm" color="foreground" fontWeight="medium">
                          {acct.nama_akun}
                        </Text>
                      </td>
                      <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                        <span style={{
                          background: colors.bg,
                          color: colors.color,
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                        }}>
                          {acct.kategori_akun}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <Text fontSize="sm" color="gray.500">{acct.pengguna || "all"}</Text>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {acct.pajak ? (
                          <span style={{
                            background: "#FEF3C7", color: "#92400E",
                            padding: "2px 8px", borderRadius: "999px", fontSize: "12px", fontWeight: "600",
                          }}>{acct.pajak}</span>
                        ) : (
                          <Text fontSize="sm" color="gray.300">–</Text>
                        )}
                      </td>
                      <td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <Text
                          fontSize="sm" fontWeight="semibold" fontFamily="mono"
                          color={parseFloat(acct.saldo) < 0 ? "red.500" : "foreground"}
                        >
                          {formatIDR(acct.saldo)}
                        </Text>
                      </td>
                      <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                        <HStack gap={1} justify="flex-end">
                          <IconButton
                            size="xs"
                            variant="ghost"
                            color="primary"
                            _hover={{ bg: "muted" }}
                            onClick={() => openEdit(acct)}
                            aria-label="Edit"
                            borderRadius="md"
                          >
                            <PencilSimple size={15} />
                          </IconButton>
                          <IconButton
                            size="xs"
                            variant="ghost"
                            color="red.500"
                            _hover={{ bg: "red.50" }}
                            onClick={() => confirmDelete(acct)}
                            aria-label="Hapus"
                            borderRadius="md"
                          >
                            <Trash size={15} />
                          </IconButton>
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
            px={4} py={3} borderTop="1px solid" borderColor="border"
            flexWrap="wrap" gap={2}
          >
            <Text fontSize="sm" color="gray.500">
              Menampilkan {Math.min((page - 1) * pageSize + 1, totalCount)}–{Math.min(page * pageSize, totalCount)} dari {totalCount} akun
            </Text>
            <HStack gap={2}>
              <Button
                size="xs" variant="outline" borderColor="border"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                borderRadius="md"
              >
                ← Sebelumnya
              </Button>
              <Text fontSize="sm" color="gray.600" px={2}>{page} / {totalPages}</Text>
              <Button
                size="xs" variant="outline" borderColor="border"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                borderRadius="md"
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
            maxH="90vh" overflowY="auto"
          >
            {/* Modal Header */}
            <Flex align="center" justify="space-between" px={6} pt={6} pb={4} borderBottom="1px solid" borderColor="border">
              <HStack gap={2}>
                <Box bg="primary" p={1.5} borderRadius="lg">
                  <BookOpen size={18} color="white" weight="duotone" />
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

            {/* Modal Body */}
            <VStack gap={4} p={6}>
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

              <Flex gap={3} w="full">
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1.5}>Pengguna</Text>
                  <Input
                    value={form.pengguna}
                    onChange={(e) => setForm({ ...form, pengguna: e.target.value })}
                    placeholder="all"
                    borderRadius="lg"
                    borderColor="border"
                    _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" }}
                  />
                </Box>
                <Box flex={1}>
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
              </Flex>

              <Box w="full">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={1.5}>Saldo (IDR)</Text>
                <Input
                  type="number"
                  value={form.saldo}
                  onChange={(e) => setForm({ ...form, saldo: e.target.value })}
                  placeholder="0"
                  borderRadius="lg"
                  borderColor="border"
                  _focus={{ borderColor: "primary", boxShadow: "0 0 0 2px rgba(37,99,235,0.15)" }}
                />
              </Box>
            </VStack>

            {/* Modal Footer */}
            <Flex gap={3} px={6} pb={6} pt={2}>
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
              <Box bg="red.50" p={3} borderRadius="xl">
                <Trash size={24} color="#DC2626" weight="duotone" />
              </Box>
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
    </Box>
  );
}
