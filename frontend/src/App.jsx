import { Routes, Route, Navigate } from "react-router-dom";
import Beranda from "./pages/Beranda";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import PipelinePage from "./pages/PipelinePage";
import CalendarPage from "./pages/CalendarPage";
import LeadDetailPage from "./pages/LeadDetailPage";
import SettingsPage from "./pages/SettingsPage";
import AgentsPage from "./pages/AgentsPage";
import BroadcastPage from "./pages/BroadcastPage";
import BroadcastHistoryPage from "./pages/BroadcastHistoryPage";
import ArchivedLeadsPage from "./pages/ArchivedLeadsPage";
import DaftarAkunPage from "./pages/DaftarAkunPage";
import TutupBukuPage from "./pages/TutupBukuPage";
import JurnalUmumPage from "./pages/JurnalUmumPage";
import AsetPage from "./pages/AsetPage";
import SimpanAsetPage from "./pages/SimpanAsetPage";
import Laporan from "./pages/Laporan";
import Neraca from "./pages/Neraca";
import Anggaran from "./pages/Anggaran";
import LabaRugi from "./pages/LabaRugi";
import ArusKas from "./pages/ArusKas";
import PerubahanModal from "./pages/PerubahanModal";
import BukuBesar from "./pages/BukuBesar";
import Jurnal from "./pages/Jurnal";
import NeracaSaldo from "./pages/NeracaSaldo";
import RincianAnggaran from "./pages/RincianAnggaran";
import RingkasanBisnis from "./pages/RingkasanBisnis";
import DaftarPenjualan from "./pages/DaftarPenjualan";
import PiutangPelanggan from "./pages/PiutangPelanggan";
import PengirimanPenjualan from "./pages/PengirimanPenjualan";
import PenjualanPerPelanggan from "./pages/PenjualanPerPelanggan";
import PenjualanPerProduk from "./pages/PenjualanPerProduk";
import PenyelesaianPesananPenjualan from "./pages/PenyelesaianPesananPenjualan";
import ProfitabilitasProduk from "./pages/ProfitabilitasProduk";
import UsiaPiutang from "./pages/UsiaPiutang";
import DaftarFakturProforma from "./pages/DaftarFakturProforma";
import DaftarTukarFaktur from "./pages/DaftarTukarFaktur";
import DaftarPembelian from "./pages/DaftarPembelian";
import PembelianPerSupplier from "./pages/PembelianPerSupplier";
import UtangSupplier from "./pages/UtangSupplier";
import DaftarPengeluaran from "./pages/DaftarPengeluaran";
import DetailPengeluaran from "./pages/DetailPengeluaran";
import UsiaUtang from "./pages/UsiaUtang";
import PengirimanPembelian from "./pages/PengirimanPembelian";
import PembelianPerProduk from "./pages/PembelianPerProduk";
import PenyelesaianPesananPembelian from "./pages/PenyelesaianPesananPembelian";
import TingkatPemenuhanPesanan from "./pages/TingkatPemenuhanPesanan";
import PerputaranPersediaanBarang from "./pages/PerputaranPersediaanBarang";
import RingkasanPersediaanBarang from "./pages/RingkasanPersediaanBarang";
import KuantitasStokGudang from "./pages/KuantitasStokGudang";
import NilaiPersediaanBarang from "./pages/NilaiPersediaanBarang";
import NilaiStokGudang from "./pages/NilaiStokGudang";
import DetailPersediaanBarang from "./pages/DetailPersediaanBarang";
import PergerakanBarangGudang from "./pages/PergerakanBarangGudang";
import KuantitasProdukNomorSeri from "./pages/KuantitasProdukNomorSeri";
import GudangProdukBernomorSeri from "./pages/GudangProdukBernomorSeri";
import RingkasanAsetTetap from "./pages/RingkasanAsetTetap";
import DetailAsetTetap from "./pages/DetailAsetTetap";
import LaporanPenjualanPelepasanAset from "./pages/LaporanPenjualanPelepasanAset";
import RingkasanRekonsiliasi from "./pages/RingkasanRekonsiliasi";
import MutasiRekeningKoran from "./pages/MutasiRekeningKoran";
import LaporanPajakPemotongan from "./pages/LaporanPajakPemotongan";
import LaporanPajakPenjualan from "./pages/LaporanPajakPenjualan";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import AuthGuard from "./components/layout/AuthGuard";
import PusatBantuan from "./pages/PusatBantuan";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/pusat-bantuan" element={<PusatBantuan />} />
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/beranda" element={<Beranda  />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/leads/archived" element={<ArchivedLeadsPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/leads/:id" element={<LeadDetailPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/broadcasts" element={<BroadcastPage />} />
          <Route path="/broadcasts/history" element={<BroadcastHistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/daftar-akun" element={<DaftarAkunPage />} />
          <Route path="/tutup-buku" element={<TutupBukuPage />} />
          <Route path="/jurnal-umum" element={<JurnalUmumPage />} />
          <Route path="/aset" element={<AsetPage />} />
          <Route path="/aset/simpan" element={<SimpanAsetPage />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/anggaran" element={<Anggaran />} />
          <Route path="/anggaran/rincian-anggaran" element={<RincianAnggaran />} />
          <Route path="/laporan/neraca" element={<Neraca />} />
          <Route path="/laporan/laba-rugi" element={<LabaRugi />} />
          <Route path="/laporan/arus-kas" element={<ArusKas />} />
          <Route path="/laporan/perubahan-modal" element={<PerubahanModal />} />
          <Route path="/laporan/buku-besar" element={<BukuBesar />} />
          <Route path="/laporan/jurnal" element={<Jurnal />} />
          <Route path="/laporan/neraca-saldo" element={<NeracaSaldo />} />
          <Route path="/laporan/ringkasan-bisnis" element={<RingkasanBisnis />} />
          <Route path="/laporan/manajemen-anggaran" element={<Anggaran />} />
          <Route path="/laporan/daftar-penjualan" element={<DaftarPenjualan />} />
          <Route path="/laporan/piutang-pelanggan" element={<PiutangPelanggan />} />
          <Route path="/laporan/pengiriman-penjualan" element={<PengirimanPenjualan />} />
          <Route path="/laporan/penjualan-per-pelanggan" element={<PenjualanPerPelanggan />} />
          <Route path="/laporan/penjualan-per-produk" element={<PenjualanPerProduk />} />
          <Route path="/laporan/penyelesaian-pesanan-penjualan" element={<PenyelesaianPesananPenjualan />} />
          <Route path="/laporan/profitabilitas-produk" element={<ProfitabilitasProduk />} />
          <Route path="/laporan/usia-piutang" element={<UsiaPiutang />} />
          <Route path="/laporan/daftar-faktur-proforma" element={<DaftarFakturProforma />} />
          <Route path="/laporan/daftar-tukar-faktur" element={<DaftarTukarFaktur />} />
          <Route path="/laporan/daftar-pembelian" element={<DaftarPembelian />} />
          <Route path="/laporan/pembelian-per-supplier" element={<PembelianPerSupplier />} />
          <Route path="/laporan/utang-supplier" element={<UtangSupplier />} />
          <Route path="/laporan/daftar-pengeluaran" element={<DaftarPengeluaran />} />
          <Route path="/laporan/detail-pengeluaran" element={<DetailPengeluaran />} />
          <Route path="/laporan/usia-utang" element={<UsiaUtang />} />
          <Route path="/laporan/pengiriman-pembelian" element={<PengirimanPembelian />} />
          <Route path="/laporan/pembelian-per-produk" element={<PembelianPerProduk />} />
          <Route path="/laporan/penyelesaian-pesanan-pembelian" element={<PenyelesaianPesananPembelian />} />
          <Route path="/laporan/tingkat-pemenuhan-pesanan" element={<TingkatPemenuhanPesanan />} />
          <Route path="/laporan/perputaran-persediaan-barang" element={<PerputaranPersediaanBarang />} />
          <Route path="/laporan/ringkasan-persediaan-barang" element={<RingkasanPersediaanBarang />} />
          <Route path="/laporan/kuantitas-stok-gudang" element={<KuantitasStokGudang />} />
          <Route path="/laporan/nilai-persediaan-barang" element={<NilaiPersediaanBarang />} />
          <Route path="/laporan/nilai-stok-gudang" element={<NilaiStokGudang />} />
          <Route path="/laporan/detail-persediaan-barang" element={<DetailPersediaanBarang />} />
          <Route path="/laporan/pergerakan-barang-gudang" element={<PergerakanBarangGudang />} />
          <Route path="/laporan/kuantitas-produk-no-seri" element={<KuantitasProdukNomorSeri />} />
          <Route path="/laporan/gudang-produk-bernomor-seri" element={<GudangProdukBernomorSeri />} />
          <Route path="/laporan/ringkasan-aset-tetap" element={<RingkasanAsetTetap />} />
          <Route path="/laporan/detail-aset-tetap" element={<DetailAsetTetap />} />
          <Route path="/laporan/penjualan-pelepasan-aset" element={<LaporanPenjualanPelepasanAset />} />
          <Route path="/laporan/ringkasan-rekonsiliasi-bank" element={<RingkasanRekonsiliasi />} />
          <Route path="/laporan/mutasi-rekening-koran" element={<MutasiRekeningKoran />} />
          <Route path="/laporan/pajak-pemotongan" element={<LaporanPajakPemotongan />} />
          <Route path="/laporan/pajak-penjualan" element={<LaporanPajakPenjualan />} />
          <Route path="/laporan/:reportId" element={<PembelianPerProduk />} />       
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
