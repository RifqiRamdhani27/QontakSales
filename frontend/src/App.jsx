import { Routes, Route, Navigate } from "react-router-dom";
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
import LabaRugi from "./pages/LabaRugi";
import ArusKas from "./pages/ArusKas";
import PerubahanModal from "./pages/PerubahanModal";
import BukuBesar from "./pages/BukuBesar";
import Jurnal from "./pages/Jurnal";
import NeracaSaldo from "./pages/NeracaSaldo";
import RingkasanBisnis from "./pages/RingkasanBisnis";
import DaftarPenjualan from "./pages/DaftarPenjualan";
import PiutangPelanggan from "./pages/PiutangPelanggan";
import PengirimanPenjualan from "./pages/PengirimanPenjualan";
import PenjualanPerPelanggan from "./pages/PenjualanPerPelanggan";
import PenjualanPerProduk from "./pages/PenjualanPerProduk";
import PenyelesaianPesananPenjualan from "./pages/PenyelesaianPesananPenjualan";
import ProfitabilitasProduk from "./pages/ProfitabilitasProduk";
import UsiaPiutang from "./pages/UsiaPiutang";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import AuthGuard from "./components/layout/AuthGuard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
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
          <Route path="/laporan/neraca" element={<Neraca />} />
          <Route path="/laporan/laba-rugi" element={<LabaRugi />} />
          <Route path="/laporan/arus-kas" element={<ArusKas />} />
          <Route path="/laporan/perubahan-modal" element={<PerubahanModal />} />
          <Route path="/laporan/buku-besar" element={<BukuBesar />} />
          <Route path="/laporan/jurnal" element={<Jurnal />} />
          <Route path="/laporan/neraca-saldo" element={<NeracaSaldo />} />
          <Route path="/laporan/ringkasan-bisnis" element={<RingkasanBisnis />} />
          <Route path="/laporan/daftar-penjualan" element={<DaftarPenjualan />} />
          <Route path="/laporan/piutang-pelanggan" element={<PiutangPelanggan />} />
          <Route path="/laporan/pengiriman-penjualan" element={<PengirimanPenjualan />} />
          <Route path="/laporan/penjualan-per-pelanggan" element={<PenjualanPerPelanggan />} />
          <Route path="/laporan/penjualan-per-produk" element={<PenjualanPerProduk />} />
          <Route path="/laporan/penyelesaian-pesanan-penjualan" element={<PenyelesaianPesananPenjualan />} />
          <Route path="/laporan/profitabilitas-produk" element={<ProfitabilitasProduk />} />
          <Route path="/laporan/usia-piutang" element={<UsiaPiutang />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
