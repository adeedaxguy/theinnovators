"use client";

import { useEffect } from "react";
import {
  DEFAULT_TYPOGRAPHY_SETTINGS,
  TYPOGRAPHY_STORAGE_KEY,
  applyTypographySettings,
  normalizeTypographySettings,
} from "./typographySettings";

function readSavedSettings() {
  try {
    const raw = window.localStorage.getItem(TYPOGRAPHY_STORAGE_KEY);
    return raw ? normalizeTypographySettings(JSON.parse(raw)) : DEFAULT_TYPOGRAPHY_SETTINGS;
  } catch {
    return DEFAULT_TYPOGRAPHY_SETTINGS;
  }
}

export default function FontSettingsProvider({ children }) {
  useEffect(() => {
    applyTypographySettings(readSavedSettings());

    function handleStorage(event) {
      if (event.key !== TYPOGRAPHY_STORAGE_KEY) return;
      applyTypographySettings(readSavedSettings());
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return children;
}
