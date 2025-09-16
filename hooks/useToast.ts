// src/hooks/useToast.tsx
"use client";

import { useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  /**
   * Optional action node rendered next to the toast (e.g. a button)
   */
  action?: ReactNode;
  /**
   * Optional variant props you might want to pass to your Toast component
   * (e.g. intent: 'success' | 'error' etc). Keep it open-ended.
   */
  [key: string]: any;
};

type UseToastReturn = {
  toasts: ToastProps[];
  /**
   * Add a toast. Returns the generated id.
   */
  addToast: (
    payload: Omit<Partial<ToastProps>, "id"> & { duration?: number }
  ) => string;
  /**
   * Remove a toast by id.
   */
  removeToast: (id: string) => void;
};

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastProps[]>([]);
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
    ({
      duration = 4000,
      title,
      description,
      action,
      ...rest
    }: Omit<Partial<ToastProps>, "id"> & { duration?: number } = {}) => {
      const id =
        String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8);
      const toast: ToastProps = {
        id,
        title,
        description,
        action,
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
