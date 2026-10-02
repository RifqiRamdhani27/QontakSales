import { useState } from "react";
import { Box, VStack, Text, Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { House, CaretDown, Star, Users, Kanban, Gear, MagnifyingGlass, UserPlus, ChatsCircle, Archive, X, BookOpen, CalendarBlank, Buildings, FileText, Wallet, Desktop, Tag, ShoppingCart, Pencil, Bank } from "@phosphor-icons/react";
import brandLogo from "@/assets/brand.png";

const allNavItems = [
  { label: "Beranda", icon: House, path: "/beranda" },
  { label: "Dashboard", icon: Desktop, path: "/dashboard" },
  /* { label: "Leads", icon: Users, path: "/leads" },
  { label: "Pipeline", icon: Kanban, path: "/pipeline" },
  { label: "Calendar", icon: CalendarBlank, path: "/calendar" },
  { label: "Agents", icon: UserPlus, path: "/agents", managerOnly: true },
  { label: "Broadcast", icon: ChatsCircle, path: "/broadcasts" },
  { label: "Broadcast History", icon: ChatsCircle, path: "/broadcasts/history" },
  { label: "Archived Leads", icon: Archive, path: "/leads/archived" }, 
  { label: "Produk", icon: Pencil, path: "/products" },*/
  { label: "Daftar Akun", icon: BookOpen, path: "/daftar-akun" },
  { label: "Aset", icon: Buildings, path: "/aset" },
  { label: "Laporan", icon: FileText, path: "/laporan" },
  { label: "Anggaran", icon: Wallet, path: "/anggaran" },
  { label: "Penjualan", icon: Tag, path: "/penjualan" },
  { label: "Pembelian", icon: ShoppingCart, path: "/pembelian" },
  { label: "Biaya", icon: MagnifyingGlass, path: "/biaya" },
  { label: "Kas & Bank", icon: Bank, CaretDown, Star, path: "/kas-bank" },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const userRole = localStorage.getItem("user_role");
  const isManager = userRole === "MANAGER";
  const navItems = allNavItems.filter((item) => !item.managerOnly || isManager);

  const isSettingsRoute = location.pathname.startsWith("/settings");
  const [isHovered, setIsHovered] = useState(false);
  const isCollapsed = isSettingsRoute && !isHovered;
  const sidebarWidth = isCollapsed ? "80px" : "260px";

  return (
    <>
      {open && (
        <Box
          display={{ base: "block", md: "none" }}
          position="fixed" inset={0} bg="blackAlpha.600" zIndex={40}
          onClick={onClose}
        />
      )}

      <Box
        w={sidebarWidth}
        h="100vh" bg="white" borderRight="1px solid" borderColor="border"
        display="flex" flexDirection="column"
        position={{ base: "fixed", md: isSettingsRoute ? "relative" : "relative" }}
        zIndex={isSettingsRoute ? 60 : 50}
        transform={{ base: open ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" }}
        transition="width 180ms ease, transform 200ms ease"
        overflow="hidden"
        onMouseEnter={() => isSettingsRoute && setIsHovered(true)}
        onMouseLeave={() => isSettingsRoute && setIsHovered(false)}
      >
        <HStack
          justify={isCollapsed ? "center" : "space-between"}
          p={6}
          minW={isCollapsed ? "72px" : "260px"}
        >
          {isCollapsed ? (
            <Box
              w="28px"
              h="28px"
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
          {!isCollapsed && (
            <Box display={{ base: "block", md: "none" }} cursor="pointer" onClick={onClose}><X size={20} /></Box>
          )}
        </HStack>

        <VStack flex={1} align="stretch" px={3} gap={1} minW="260px">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === "/aset" && location.pathname.startsWith("/aset"));
            const Icon = item.icon;
            return (
              <ChakraLink
                key={item.path}
                as={RouterLink}
                to={item.path}
                display="flex" alignItems="center" gap={3} px={4} py={3} borderRadius="md"
                fontWeight={isActive ? "semibold" : "normal"}
                bg={isActive ? "primary" : "transparent"}
                color={isActive ? "white" : "foreground"}
                _hover={{ bg: isActive ? "primary" : "muted", textDecoration: "none" }}
                transition="all 150ms ease"
                onClick={onClose}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {!isCollapsed && <Text fontSize="sm" whiteSpace="nowrap">{item.label}</Text>}
              </ChakraLink>
            );
          })}
        </VStack>

        <Box p={3} minW="260px">
          <ChakraLink
            as={RouterLink}
            to="/settings"
            display="flex" alignItems="center" gap={3} px={4} py={3} borderRadius="md"
            color="foreground"
            bg={location.pathname.startsWith("/settings") ? "muted" : "transparent"}
            _hover={{ bg: "muted", textDecoration: "none" }}
            transition="all 150ms ease"
            onClick={onClose}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Gear size={20} style={{ flexShrink: 0 }} />
            {!isCollapsed && <Text fontSize="sm" whiteSpace="nowrap">Settings</Text>}
          </ChakraLink>
        </Box>
      </Box>
    </>
  );
}