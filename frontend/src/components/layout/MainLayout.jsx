import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  return (
    <Flex h="100vh" bg="background" overflow="hidden">
      {!isFullscreen && (
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      )}
      <Flex flex={1} flexDirection="column" minW={0}>
        {!isFullscreen && (
          <TopBar onMenuClick={() => setSidebarOpen(true)} />
        )}
        <Box flex={1} p={isFullscreen ? 0 : { base: 4, md: 6 }} overflow="auto">
          <Outlet context={{ isFullscreen, setIsFullscreen, toggleFullscreen }} />
        </Box>
      </Flex>
    </Flex>
  );
}
