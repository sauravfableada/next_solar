"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toast: (options: { message: string; title?: string; type?: ToastType; duration?: number }) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({
      message,
      title,
      type = "success",
      duration = 4000,
    }: {
      message: string;
      title?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newToast: Toast = { id, message, title, type, duration };

      setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  const success = useCallback(
    (message: string, title: string = "Success") => {
      addToast({ message, title, type: "success" });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, title: string = "Error") => {
      addToast({ message, title, type: "error" });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, title: string = "Notice") => {
      addToast({ message, title, type: "info" });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, title: string = "Warning") => {
      addToast({ message, title, type: "warning" });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider value={{ toast: addToast, success, error, info, warning }}>
      {children}

      {/* Floating Modern Toast Stack Container (Top-Right) */}
      <div
        style={{
          position: "fixed",
          top: "24px",
          right: "24px",
          zIndex: 9999999,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "380px",
          width: "calc(100% - 48px)",
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => {
          const isSuccess = t.type === "success";
          const isError = t.type === "error";
          const isWarning = t.type === "warning";

          const bgColor = isSuccess
            ? "#064e3b" // dark emerald
            : isError
              ? "#881337" // dark rose
              : isWarning
                ? "#78350f" // dark amber
                : "#1e293b"; // slate 800

          const borderColor = isSuccess
            ? "#10b981"
            : isError
              ? "#f43f5e"
              : isWarning
                ? "#f59e0b"
                : "#3b82f6";

          const badgeBg = isSuccess
            ? "#047857"
            : isError
              ? "#be123c"
              : isWarning
                ? "#b45309"
                : "#2563eb";

          return (
            <div
              key={t.id}
              style={{
                pointerEvents: "auto",
                backgroundColor: bgColor,
                border: `1.5px solid ${borderColor}`,
                borderRadius: "16px",
                padding: "14px 16px",
                boxShadow: "0 20px 35px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(0, 0, 0, 0.2)",
                color: "#ffffff",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                animation: "toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
            >
              {/* Type Icon Badge */}
              <div
                style={{
                  backgroundColor: badgeBg,
                  borderRadius: "10px",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5]" />}
                {isError && <AlertCircle className="w-5 h-5 text-white stroke-[2.5]" />}
                {isWarning && <AlertTriangle className="w-5 h-5 text-white stroke-[2.5]" />}
                {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-white stroke-[2.5]" />}
              </div>

              {/* Toast Message & Title */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {t.title && (
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      color: isSuccess ? "#6ee7b7" : isError ? "#fca5a5" : isWarning ? "#fde68a" : "#93c5fd",
                      marginBottom: "2px",
                    }}
                  >
                    {t.title}
                  </div>
                )}
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#ffffff",
                    lineHeight: "1.4",
                    wordBreak: "break-word",
                  }}
                >
                  {t.message}
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.7)",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  marginLeft: "4px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
