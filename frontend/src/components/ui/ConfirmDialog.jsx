<<<<<<< HEAD
import { Button, Dialog, HStack, Icon, Text, VStack, Portal } from "@chakra-ui/react";
import { Warning, Trash, Archive, ArrowClockwise, WarningCircle } from "@phosphor-icons/react";
=======
import { Trash, Archive, ArrowClockwise, WarningCircle } from "@phosphor-icons/react";
>>>>>>> repo-nina/main

const ACTION_CONFIG = {
  delete: {
    icon: Trash,
<<<<<<< HEAD
    color: "red.600",
    bg: "red.50",
    buttonColor: "red.600",
=======
    text: "text-red-600",
    bg: "bg-red-50",
    button: "bg-red-600 hover:bg-red-600/90",
>>>>>>> repo-nina/main
    confirmText: "Delete",
  },
  archive: {
    icon: Archive,
<<<<<<< HEAD
    color: "orange.600",
    bg: "orange.50",
    buttonColor: "orange.600",
=======
    text: "text-orange-600",
    bg: "bg-orange-50",
    button: "bg-orange-600 hover:bg-orange-600/90",
>>>>>>> repo-nina/main
    confirmText: "Archive",
  },
  restore: {
    icon: ArrowClockwise,
<<<<<<< HEAD
    color: "green.600",
    bg: "green.50",
    buttonColor: "green.600",
=======
    text: "text-green-600",
    bg: "bg-green-50",
    button: "bg-green-600 hover:bg-green-600/90",
>>>>>>> repo-nina/main
    confirmText: "Restore",
  },
  warning: {
    icon: WarningCircle,
<<<<<<< HEAD
    color: "yellow.600",
    bg: "yellow.50",
    buttonColor: "yellow.600",
=======
    text: "text-yellow-600",
    bg: "bg-yellow-50",
    button: "bg-yellow-600 hover:bg-yellow-600/90",
>>>>>>> repo-nina/main
    confirmText: "Confirm",
  },
};

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, action = "warning", loading = false }) {
<<<<<<< HEAD
=======
  if (!open) return null;

>>>>>>> repo-nina/main
  const config = ACTION_CONFIG[action] || ACTION_CONFIG.warning;
  const IconComp = config.icon;

  return (
<<<<<<< HEAD
    <Dialog.Root open={open} onOpenChange={(e) => !loading && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="400px">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <HStack gap={4}>
                <Icon size={32} color={config.color}>
                  <IconComp />
                </Icon>
                <Text color="foreground" opacity={0.7} fontSize="sm" lineHeight="tall">
                  {message}
                </Text>
              </HStack>
            </Dialog.Body>
            <Dialog.Footer>
              <HStack gap={3}>
                <Dialog.CloseTrigger asChild>
                  <Button variant="outline" disabled={loading}>Cancel</Button>
                </Dialog.CloseTrigger>
                <Button
                  bg={config.buttonColor}
                  color="white"
                  _hover={{ opacity: 0.9 }}
                  loading={loading}
                  onClick={() => { onConfirm(); onClose(); }}
                >
                  {config.confirmText}
                </Button>
              </HStack>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
=======
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/45 p-5">
      <div className="max-h-[90vh] w-full max-w-[400px] overflow-auto rounded-[14px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
        <div className="border-b border-slate-200 p-5">
          <h3 className="m-0 text-xl font-bold text-slate-900">{title}</h3>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-4">
            <span className={`inline-flex ${config.text}`}>
              <IconComp />
            </span>
            <p className="m-0 text-sm leading-relaxed text-slate-900/70">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-slate-200 p-5">
          <button
            type="button"
            className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`rounded-md px-3.5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${config.button}`}
            disabled={loading}
            onClick={() => { onConfirm(); onClose(); }}
          >
            {loading ? "Loading..." : config.confirmText}
          </button>
        </div>
      </div>
    </div>
>>>>>>> repo-nina/main
  );
}
