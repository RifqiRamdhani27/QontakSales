import { useState } from "react";
import { Box, VStack, Text, Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  House, AddressBookIcon, PackageIcon, NoteIcon,
  Gear, MagnifyingGlass, BookOpen, Buildings, FileText, Wallet,
  Desktop, Tag, ShoppingCart, Bank, SidebarSimple, X,
} from "@phosphor-icons/react";
import brandLogo from "@/assets/brand.png";

const allNavItems = [
  { label: "Beranda", icon: House, path: "/beranda" },
  { label: "Dashboard", icon: Desktop, path: "/dashboard" },
  { label: "Produk", icon: PackageIcon, path: "/main-product/products" },
  { label: "Kontak", icon: AddressBookIcon, path: "/contact" },
  { label: "Daftar Akun", icon: BookOpen, path: "/daftar-akun" },
  { label: "Aset", icon: Buildings, path: "/aset" },
  { label: "Laporan", icon: FileText, path: "/laporan" },
  { label: "Anggaran", icon: Wallet, path: "/anggaran" },
  { label: "Penjualan", icon: Tag, path: "/penjualan" },
  { label: "Pembelian", icon: ShoppingCart, path: "/pembelian" },
  { label: "Biaya", icon: MagnifyingGlass, path: "/biaya" },
  { label: "Kas & Bank", icon: Bank, path: "/kas-bank" },
  { label: "Daftar Lainnya", icon: NoteIcon, path: "/daftar-lainnya" },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const userRole = localStorage.getItem("user_role");
  const isManager = userRole === "MANAGER";
  const navItems = allNavItems.filter((item) => !item.managerOnly || isManager);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? "76px" : "260px";

  return (
    <>
      {open && (
        <Box
          display={{ base: "block", md: "none" }}
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex={40}
          onClick={onClose}
        />
      )}

      <Box
        position="relative"
        w={sidebarWidth}
        h="100vh"
        zIndex={50}
        transform={{ base: open ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" }}
        transition="width 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms ease"
      >
        {/* TOMBOL TOGGLE DI LUAR TIRAI (BIAR GAK KEPOTONG & BISA DI LUAR GARIS) */}
        <Box
          as="button"
          onClick={() => setIsCollapsed((v) => !v)}
          display={{ base: "none", md: "flex" }}
          position="absolute"
          top="20px"
          right="-14px"
          w="28px"
          h="28px"
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          bg="white"
          border="1px solid"
          borderColor="border"
          color="gray.500"
          boxShadow="0 1px 4px rgba(0,0,0,0.08)"
          _hover={{ bg: "gray.50", color: "gray.800", boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}
          transition="all 150ms ease"
          zIndex={60}
        >
          <SidebarSimple
            size={16}
            weight="bold"
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </Box>

        {/* TIRAI UNTUK ANIMASI NUTUP KE KIRI */}
        <Box
          w="100%"
          h="100%"
          bg="white"
          borderRight="1px solid"
          borderColor="border"
          boxShadow="0 2px 6px rgba(0,0,0,0.06)"
          display="flex"
          flexDirection="column"
          overflow="hidden" 
        >
          {/* KONTEN ASLI DIKUNCI 260px BIAR GAK GESER */}
          <Box
            w="260px"
            h="100%"
            display="flex"
            flexDirection="column"
          >
            <HStack
              justify="space-between"
              px={6}
              minH="64px"
              flexShrink={0}
            >
              {/* LOGO: Kalau collapsed cuma nampilin icon Qontak aja (crop), kalau normal nampilin full */}
              {isCollapsed ? (
                <Box
                  w="32px"
                  h="32px"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  flexShrink={0}
                >
                  <Box
                    as="img"
                    src={brandLogo}
                    alt="QontakSales"
                    style={{
                      height: "28px",
                      width: "auto",
                      maxWidth: "none",
                      objectFit: "cover",
                      objectPosition: "left center",
                    }}
                  />
                </Box>
              ) : (
                <Box as="img" src={brandLogo} h="28px" alt="QontakSales" flexShrink={0} />
              )}

              <Box
                display={{ base: "block", md: "none" }}
                cursor="pointer"
                onClick={onClose}
              >
                <X size={20} />
              </Box>
            </HStack>

            <VStack flex={1} align="stretch" px={3} gap={1} overflowY="auto">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/aset" && location.pathname.startsWith("/aset"));
                const Icon = item.icon;
                return (
                  <ChakraLink
                    key={item.path}
                    as={RouterLink}
                    to={item.path}
                    display="flex"
                    alignItems="center"
                    gap={3}
                    px={4}
                    py={3}
                    borderRadius="md"
                    fontWeight={isActive ? "semibold" : "normal"}
                    bg={isActive ? "#0adae1ff" : "transparent"}
                    color={isActive ? "#ffffffff" : "foreground"}
                    _hover={{
                      bg: isActive ? "#0bdfe6ff" : "#efefefff",
                      color: isActive ? "#ffffffff" : "#111827",
                      textDecoration: "none",
                    }}
                    transition="all 150ms ease"
                    onClick={onClose}
                    minH="44px"
                  >
                    <Icon size={22} style={{ flexShrink: 0 }} />
                    {/* TEKS: Hilang total saat collapsed */}
                    <Text
                      fontSize="sm"
                      whiteSpace="nowrap"
                      display={isCollapsed ? "none" : "block"}
                    >
                      {item.label}
                    </Text>
                  </ChakraLink>
                );
              })}
            </VStack>

            <Box p={3} flexShrink={0}>
              <ChakraLink
                as={RouterLink}
                to="/settings"
                display="flex"
                alignItems="center"
                gap={3}
                px={4}
                py={3}
                borderRadius="md"
                color="foreground"
                bg={location.pathname.startsWith("/settings") ? "muted" : "transparent"}
                _hover={{ bg: "muted", textDecoration: "none" }}
                transition="all 150ms ease"
                onClick={onClose}
                minH="44px"
              >
                <Gear size={22} style={{ flexShrink: 0 }} />
                {/* TEKS SETTINGS: Hilang total saat collapsed */}
                <Text
                  fontSize="sm"
                  whiteSpace="nowrap"
                  display={isCollapsed ? "none" : "block"}
                >
                  Settings
                </Text>
              </ChakraLink>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}