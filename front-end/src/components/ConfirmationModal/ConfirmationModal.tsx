import React from "react";
import Button from "@/components/Button/Button";

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <Button variant="ghost" color="error" size="md" onClick={onConfirm}>
            {confirmText || "Yes, Delete"}
          </Button>
          <Button variant="outline" color="primary" size="md" onClick={onCancel}>
            {cancelText || "Cancel"}
          </Button>
        </div>
      </div>
    </div>
  );
}