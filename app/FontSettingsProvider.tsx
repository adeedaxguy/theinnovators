"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  useEffect(() => {
    const publicSettings = Object.fromEntries(Object.entries(DEFAULT_TYPOGRAPHY_SETTINGS).map(([key, setting]) => [key, { ...setting, family: key === "top-menu" ? '"Spartan", Arial, sans-serif' : 'Arial, "Helvetica Neue", Helvetica, sans-serif', size: key === "body" || key === "forms-buttons" ? 16 : key === "video-titles" ? 16 : key === "leader-card-text" ? 14 : key.includes("titles") || key === "ai-headings" ? setting.size : Math.max(14, setting.size) }]));
    const apply = () => applyTypographySettings(pathname.startsWith("/admin") ? readSavedSettings() : publicSettings);
    apply();

    function handleStorage(event: StorageEvent) {
      if (event.key !== TYPOGRAPHY_STORAGE_KEY) return;
      apply();
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [pathname]);

  return children;
}
