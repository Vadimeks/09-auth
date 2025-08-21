// components/Modal/Modal.tsx

"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "@/components/Modal/Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    setMounted(true);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      setMounted(false);
    };
  }, [onClose]);

  if (!isOpen || !mounted) {
    return null;
  }

  const portalElement = document.getElementById("modal-root");

  if (!portalElement) {
    return null;
  }

  return createPortal(
    <div
      className={css.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    portalElement as HTMLElement
  );
}
