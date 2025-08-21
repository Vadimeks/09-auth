// app/notes/@modal/(..)notes/[id]/modal.tsx
"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

interface ModalContainerProps {
  children: React.ReactNode;
}

export default function ModalContainer({ children }: ModalContainerProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal isOpen={true} onClose={handleClose}>
      {children}
    </Modal>
  );
}
