import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import Toast from "../components/Common/Toast";

interface IToastState {
  open: boolean;
  message: string;
}

interface IToastContextValue {
  showToast: (message: string) => void;
  hideToast: () => void;
}

const AUTO_DISMISS_MS = 2000;

const ToastContext = createContext<IToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<IToastState>({
    open: false,
    message: "",
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hideToast = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast((prev) => ({ ...prev, open: false, message: "" }));
  }, []);

  const showToast = useCallback(
    (message: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setToast({ open: true, message });
      timerRef.current = setTimeout(() => {
        hideToast();
      }, AUTO_DISMISS_MS);
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast toast={toast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
};
