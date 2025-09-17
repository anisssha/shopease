// src/hooks/useToast.tsx
"use client";

import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Variant names used by the UI
 */
export type ToastType = "success" | "error" | "info" | "default";

/**
 * The Toast shape exported for UI components to consume.
 * Matches the shape used in components/Toast.tsx
 */
export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: ReactNode;
  variant?: ToastType;
  duration?: number; // ms, 0 = persistent
  // allow arbitrary extra fields
  [key: string]: any;
};

type UseToastReturn = {
  toasts: Toast[];
  /**
   * Add a toast. Returns the generated id.
   * Usage: addToast({ title: 'Saved', description: 'Saved!', variant: 'success', duration: 3000 })
   */
  addToast: (
    payload?: Omit<Partial<Toast>, "id"> & { duration?: number }
  ) => string;
  /**
   * Remove a toast by id.
   */
  removeToast: (id: string) => void;
};

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([]);
  // track timers to auto-clear
  const timers = useRef<Record<string, number>>({});

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      window.clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const addToast = useCallback(
    (payload: Omit<Partial<Toast>, "id"> & { duration?: number } = {}) => {
      const {
        duration = 4000,
        title,
        description,
        action,
        variant,
        ...rest
      } = payload;
      const id =
        String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8);
      const toast: Toast = {
        id,
        title,
        description,
        action,
        variant,
        duration,
        ...rest,
      };
      setToasts((prev) => [...prev, toast]);

      if (duration && duration > 0) {
        const timerId = window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
          delete timers.current[id];
        }, duration);
        timers.current[id] = timerId;
      }

      return id;
    },
    []
  );

  return { toasts, addToast, removeToast };
}
