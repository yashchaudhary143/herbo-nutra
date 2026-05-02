"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type AdminModalProps = {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function AdminModal({ title, eyebrow, children, onClose }: AdminModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="admin-modal-backdrop" role="presentation">
      <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
        <div className="admin-modal-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id="admin-modal-title" className="admin-title mt-1">
              {title}
            </h2>
          </div>
          <button type="button" className="admin-icon-button" aria-label="Close modal" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
