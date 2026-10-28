import { Routes, Route, Navigate } from "react-router-dom";
import Beranda from "./pages/Beranda";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PenjualanPage from "./pages/PenjualanPage";
import BiayaPage from "./pages/BiayaPage";
import PembelianPage from "./pages/PembelianPage";
import ProductsMain from "./pages/Main-Product/ProductsMain";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import PipelinePage from "./pages/PipelinePage";
import CalendarPage from "./pages/CalendarPage";
import LeadDetailPage from "./pages/LeadDetailPage";
import SettingsPage from "./pages/SettingsPage";
import BroadcastPage from "./pages/BroadcastPage";
import BroadcastHistoryPage from "./pages/BroadcastHistoryPage";
import ArchivedLeadsPage from "./pages/ArchivedLeadsPage";
import DaftarAkunPage from "./pages/DaftarAkunPage";
import TutupBukuPage from "./pages/Main-DaftarAkun/TutupBukuPage";
import JurnalUmumPage from "./pages/Main-DaftarAkun/JurnalUmumPage";
import AsetPage from "./pages/AsetPage";
import SimpanAsetPage from "./pages/Main-Aset/SimpanAsetPage";
import Laporan from "./pages/Laporan";
import Neraca from "./pages/Main-Laporan/Neraca";
import KasBankPage from "./pages/KasBankPage";
import Anggaran from "./pages/Anggaran";
import LabaRugi from "./pages/Main-Laporan/LabaRugi";
import ArusKas from "./pages/Main-Laporan/ArusKas";
import PerubahanModal from "./pages/Main-Laporan/PerubahanModal";
import BukuBesar from "./pages/Main-Laporan/BukuBesar";
import Jurnal from "./pages/Main-Laporan/Jurnal";
import NeracaSaldo from "./pages/Main-Laporan/NeracaSaldo";
import RincianAnggaran from "./pages/Main-Anggaran/RincianAnggaran";
import RingkasanBisnis from "./pages/Main-Laporan/RingkasanBisnis";
import DaftarPenjualan from "./pages/Main-Laporan/DaftarPenjualan";
import PiutangPelanggan from "./pages/Main-Laporan/PiutangPelanggan";
import PengirimanPenjualan from "./pages/Main-Laporan/PengirimanPenjualan";
import PenjualanPerPelanggan from "./pages/Main-Laporan/PenjualanPerPelanggan";
import PenjualanPerProduk from "./pages/Main-Laporan/PenjualanPerProduk";
import PenyelesaianPesananPenjualan from "./pages/Main-Laporan/PenyelesaianPesananPenjualan";
import ProfitabilitasProduk from "./pages/Main-Laporan/ProfitabilitasProduk";
import UsiaPiutang from "./pages/Main-Laporan/UsiaPiutang";
import DaftarLainnya from "./pages/DaftarLainnya";
import DaftarFakturProforma from "./pages/DaftarFakturProforma";
import DaftarTukarFaktur from "./pages/DaftarTukarFaktur";
import DaftarPembelian from "./pages/DaftarPembelian";
import PembelianPerSupplier from "./pages/Main-Laporan/PembelianPerSupplier";
import UtangSupplier from "./pages/Main-Laporan/UtangSupplier";
import DaftarPengeluaran from "./pages/Main-Laporan/DaftarPengeluaran";
import DetailPengeluaran from "./pages/Main-Laporan/DetailPengeluaran";
import UsiaUtang from "./pages/Main-Laporan/UsiaUtang";
import PengirimanPembelian from "./pages/Main-Laporan/PengirimanPembelian";
import PembelianPerProduk from "./pages/Main-Laporan/PembelianPerProduk";
import PenyelesaianPesananPembelian from "./pages/Main-Laporan/PenyelesaianPesananPembelian";
import TingkatPemenuhanPesanan from "./pages/Main-Laporan/TingkatPemenuhanPesanan";
import PerputaranPersediaanBarang from "./pages/Main-Laporan/PerputaranPersediaanBarang";
import RingkasanPersediaanBarang from "./pages/Main-Laporan/RingkasanPersediaanBarang";
import KuantitasStokGudang from "./pages/Main-Laporan/KuantitasStokGudang";
import NilaiPersediaanBarang from "./pages/Main-Laporan/NilaiPersediaanBarang";
import NilaiStokGudang from "./pages/Main-Laporan/NilaiStokGudang";
import DetailPersediaanBarang from "./pages/Main-Laporan/DetailPersediaanBarang";
import PergerakanBarangGudang from "./pages/Main-Laporan/PergerakanBarangGudang";
import KuantitasProdukNomorSeri from "./pages/Main-Laporan/KuantitasProdukNomorSeri";
import GudangProdukBernomorSeri from "./pages/Main-Laporan/GudangProdukBernomorSeri";
import RingkasanAsetTetap from "./pages/Main-Laporan/RingkasanAsetTetap";
import DetailAsetTetap from "./pages/Main-Laporan/DetailAsetTetap";
import LaporanPenjualanPelepasanAset from "./pages/Main-Laporan/LaporanPenjualanPelepasanAset";
import RingkasanRekonsiliasi from "./pages/Main-Laporan/RingkasanRekonsiliasi";
import MutasiRekeningKoran from "./pages/Main-Laporan/MutasiRekeningKoran";
import LaporanPajakPemotongan from "./pages/Main-Laporan/LaporanPajakPemotongan";
import LaporanPajakPenjualan from "./pages/Main-Laporan/LaporanPajakPenjualan";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import ContactPage from "./pages/Main-Contact/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import AuthGuard from "./components/layout/AuthGuard";
import PusatBantuan from "./pages/PusatBantuan";
import Pajak from "./pages/Main-DaftarLainnya/Pajak";
import CaraPembayaran from "./pages/Main-DaftarLainnya/CaraPembayaran";
import BuatPajakBaru from "./pages/BuatPajakBaru";
import EditPajak from "./pages/EditPajak";
import SyaratPembayaran from "./pages/Main-DaftarLainnya/SyaratPembayaran";
import DataMigrasi from "./pages/Main-DaftarLainnya/DataMigrasi";
import PengaturanPerusahaan from "./pages/PengaturanPerusahaan";
import MasterData1 from "./pages/MasterData1";
import MasterData2 from "./pages/MasterData2";
import MasterData3 from "./pages/MasterData3";
import Transaksi1 from "./pages/Transaksi1";
import Transaksi2 from "./pages/Transaksi2";
import Transaksi3 from "./pages/Transaksi3";
import AturSaldoCoa from "./pages/AturSaldoCoa";

/* Daftar Akun */
import PpnKeluaran from "./pages/Isi-DaftarAkun/PpnKeluaran";
import PpnMasukan from "./pages/Isi-DaftarAkun/PpnMasukan";
import Kas from "./pages/Isi-DaftarAkun/Kas";

/* Kontak */
import ProfilKontak from "./pages/Main-Contact/ProfilKontak";
import BuatKontak from "./pages/Main-Contact/BuatKontak";
import UbahKontak from "./pages/Main-Contact/UbahKontak";

/* Produk */
import BuatProduk from "./pages/Main-Product/BuatProduk";
import TambahGudang from "./pages/Main-Product/TambahGudang";
import PenyesuaianStok from "./pages/Main-Product/PenyesuaianStok";
import TransferGudang from "./pages/Main-Product/TransferGudang";
import AturanHarga from "./pages/Main-Product/AturanHarga";
import ProfilProduk from "./pages/Main-Product/ProfilProduk";
import UbahProduk from "./pages/Main-Product/UbahProduk";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/pusat-bantuan" element={<PusatBantuan />} />
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          /* Daftar Akun */
          <Route path="/isi-daftar-akun/ppn-keluaran" element={<PpnKeluaran />} />
          <Route path="/isi-daftar-akun/:kode_akun" element={<PpnKeluaran />} />
          <Route path="/isi-daftar-akun/ppn-masukan" element={<PpnMasukan />} />
          <Route path="/isi-daftar-akun/:kode_akun" element={<PpnMasukan />} />
          <Route path="/isi-daftar-akun/kas" element={<Kas />} />
          <Route path="/isi-daftar-akun/:kode_akun" element={<Kas />} />
          /* Kontak */
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/main-contact/profil-kontak/:id" element={<ProfilKontak/>} />
          <Route path="/main-contact/profil-kontak" element={<ProfilKontak />} />
          <Route path="/main-contact/buat-kontak" element={<BuatKontak />} />
          <Route path="/main-contact/ubah-kontak" element={<UbahKontak />} />
          /* Produk */
          <Route path="/main-product/products" element={<ProductsMain />} />
          <Route path="/main-product/buat-produk" element={<BuatProduk />} />
          <Route path="/main-product/tambah-gudang" element={<TambahGudang />} />
          <Route path="/main-product/penyesuaian-stok" element={<PenyesuaianStok />} />
          <Route path="/main-product/transfer-gudang" element={<TransferGudang />} />
          <Route path="/main-product/aturan-harga" element={<AturanHarga />} />
          <Route path="/main-product/profil-produk/:id" element={<ProfilProduk />} />
          <Route path="/main-product/profil-produk" element={<ProfilProduk />} />
          <Route path="/main-product/ubah-produk" element={<UbahProduk />} />
          /* Beranda */
          <Route path="/penjualan" element={<PenjualanPage />} />
          <Route path="/kas-bank" element={<KasBankPage />} />
          <Route path="/pembelian" element={<PembelianPage />} />
          <Route path="/biaya" element={<BiayaPage />} />
          <Route path="/daftar-lainnya" element={<DaftarLainnya />} />
          <Route path="/pajak" element={<Pajak />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cara-pembayaran" element={<CaraPembayaran />} />
          <Route path="/syarat-pembayaran" element={<SyaratPembayaran />} />
          <Route path="/buat-pajak-baru" element={<BuatPajakBaru />} />
          <Route path="/edit-pajak" element={<EditPajak />} />
          <Route path="/data-migrasi" element={<DataMigrasi />} />
          <Route path="/pengaturan-perusahaan" element={<PengaturanPerusahaan />} />
          <Route path="/master-data/akun" element={<MasterData1 />} />
          <Route path="/master-data/produk" element={<MasterData2 />} />
          <Route path="/master-data/kontak" element={<MasterData3 />} />
          <Route path="/transaksi/data-penjualan" element={<Transaksi1 />} />
          <Route path="/transaksi/data-pembelian" element={<Transaksi2 />} />
          <Route path="/transaksi/biaya" element={<Transaksi3 />} />
          <Route path="/atur-saldo-coa" element={<AturSaldoCoa />} />
          <Route path="/beranda" element={<Beranda  />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/leads/archived" element={<ArchivedLeadsPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/leads/:id" element={<LeadDetailPage />} />
          <Route path="/broadcasts" element={<BroadcastPage />} />
          <Route path="/broadcasts/history" element={<BroadcastHistoryPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
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