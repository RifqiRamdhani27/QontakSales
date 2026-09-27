<<<<<<< HEAD
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

=======
>>>>>>> repo-nina/main
export default function LoadingPopup({ open, message = "Loading..." }) {
  if (!open) return null;

  return (
<<<<<<< HEAD
    <Box
      position="fixed"
      inset={0}
      zIndex={9999}
      bg="blackAlpha.50"
      backdropFilter="blur(4px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
=======
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/[0.04] backdrop-blur-[4px]"
>>>>>>> repo-nina/main
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      style={{ touchAction: "none" }}
    >
<<<<<<< HEAD
      <Box
        bg="white"
        borderRadius="xl"
        px={10}
        py={8}
        shadow="2xl"
        border="1px solid"
        borderColor="border"
        textAlign="center"
        minW="220px"
        onClick={(e) => e.stopPropagation()}
      >
        <VStack gap={4}>
          <Spinner size="xl" color="primary" borderWidth="3px" />
          <Text fontWeight="semibold" color="foreground" fontSize="sm">{message}</Text>
        </VStack>
      </Box>
    </Box>
=======
      <div
        className="min-w-[220px] rounded-xl border border-[#E4ECFC] bg-white px-10 py-8 text-center shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-[3px] border-slate-200 border-t-brand" />
          <div className="text-sm font-semibold text-slate-900">{message}</div>
        </div>
      </div>
    </div>
>>>>>>> repo-nina/main
  );
}
