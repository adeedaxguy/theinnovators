"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  DEFAULT_TYPOGRAPHY_SETTINGS,
  TYPOGRAPHY_STORAGE_KEY,
  applyTypographySettings,
  normalizeTypographySettings,
  type TypographySettings,
} from "./typographySettings";

function readSavedSettings(): TypographySettings {
  try {
    const raw = window.localStorage.getItem(TYPOGRAPHY_STORAGE_KEY);
    return raw ? normalizeTypographySettings(JSON.parse(raw)) : DEFAULT_TYPOGRAPHY_SETTINGS;
  } catch {
    return DEFAULT_TYPOGRAPHY_SETTINGS;
  }
}

export default function FontSettingsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyTypographySettings(readSavedSettings());

    function handleStorage(event: StorageEvent) {
      if (event.key !== TYPOGRAPHY_STORAGE_KEY) return;
      applyTypographySettings(readSavedSettings());
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return children;
}
