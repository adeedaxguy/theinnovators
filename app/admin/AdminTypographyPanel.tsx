"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_TYPOGRAPHY_SETTINGS,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  TYPOGRAPHY_AREAS,
  TYPOGRAPHY_PRESETS,
  TYPOGRAPHY_STORAGE_KEY,
  applyTypographySettings,
  normalizeTypographySettings,
  type TypographyArea,
  type TypographySetting,
  type TypographySettings,
} from "../typographySettings";

function loadInitialSettings(): TypographySettings {
  if (typeof window === "undefined") return DEFAULT_TYPOGRAPHY_SETTINGS;
  try {
    const raw = window.localStorage.getItem(TYPOGRAPHY_STORAGE_KEY);
    return raw ? normalizeTypographySettings(JSON.parse(raw)) : DEFAULT_TYPOGRAPHY_SETTINGS;
  } catch {
    return DEFAULT_TYPOGRAPHY_SETTINGS;
  }
}

export default function AdminTypographyPanel() {
  const [settings, setSettings] = useState<TypographySettings>(() => loadInitialSettings());
  const [search, setSearch] = useState("");

  useEffect(() => {
    const normalized = normalizeTypographySettings(settings);
    applyTypographySettings(normalized);
    window.localStorage.setItem(TYPOGRAPHY_STORAGE_KEY, JSON.stringify(normalized));
  }, [settings]);

  const filteredAreas = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return TYPOGRAPHY_AREAS;
    return TYPOGRAPHY_AREAS.filter((area) =>
      `${area.name} ${area.description}`.toLowerCase().includes(term)
    );
  }, [search]);

  function updateArea(areaId: string, field: keyof TypographySetting, value: string) {
    setSettings((current) =>
      normalizeTypographySettings({
        ...current,
        [areaId]: {
          ...current[areaId],
          [field]: field === "size" || field === "weight" ? Number(value) : value,
        },
      })
    );
  }

  function applyPreset(presetKey: string) {
    setSettings(normalizeTypographySettings(TYPOGRAPHY_PRESETS[presetKey].values));
  }

  function resetArea(area: TypographyArea) {
    setSettings((current) =>
      normalizeTypographySettings({
        ...current,
        [area.id]: DEFAULT_TYPOGRAPHY_SETTINGS[area.id],
      })
    );
  }

  function resetAll() {
    setSettings(DEFAULT_TYPOGRAPHY_SETTINGS);
  }

  function nudgeAll(direction: number) {
    setSettings((current) =>
      normalizeTypographySettings(
        TYPOGRAPHY_AREAS.reduce<TypographySettings>((next, area) => {
          next[area.id] = {
            ...current[area.id],
            size: Number(current[area.id].size) + direction,
          };
          return next;
        }, {})
      )
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p>Admin Panel</p>
          <h1>Typography Settings</h1>
          <span>
            Control global font size, weight, style, and font family by page area. Changes save
            automatically in this browser and apply to the main site.
          </span>
        </div>
        <nav aria-label="Admin actions">
          <Button asChild size="sm" variant="secondary">
            <Link href="/">View Site</Link>
          </Button>
          <Button onClick={resetAll} size="sm" type="button" variant="outline">
            Reset All
          </Button>
        </nav>
      </header>

      <section className="admin-toolbar" aria-label="Typography shortcuts">
        <div>
          <label htmlFor="admin-area-search">Find area</label>
          <input
            id="admin-area-search"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search menu, tiles, video cards..."
            value={search}
          />
        </div>
        <div className="admin-quick-actions">
          <Button onClick={() => nudgeAll(1)} size="sm" type="button" variant="secondary">
            Increase All +1
          </Button>
          <Button onClick={() => nudgeAll(-1)} size="sm" type="button" variant="secondary">
            Decrease All -1
          </Button>
        </div>
      </section>

      <section className="admin-presets" aria-label="Typography presets">
        {Object.entries(TYPOGRAPHY_PRESETS).map(([key, preset]) => (
          <Button key={key} onClick={() => applyPreset(key)} type="button" variant="ghost">
            <strong>{preset.label}</strong>
            <span>{preset.description}</span>
          </Button>
        ))}
      </section>

      <section className="admin-type-grid" aria-label="Editable typography areas">
        {filteredAreas.map((area) => {
          const value = settings[area.id] || DEFAULT_TYPOGRAPHY_SETTINGS[area.id];
          return (
            <article className="admin-type-card" key={area.id}>
              <div className="admin-card-heading">
                <div>
                  <h2>{area.name}</h2>
                  <p>{area.description}</p>
                </div>
                <Button onClick={() => resetArea(area)} size="sm" type="button" variant="outline">
                  Reset
                </Button>
              </div>

              <div className="admin-control-row">
                <label>
                  Size
                  <span>{value.size}px</span>
                  <input
                    max={area.max}
                    min={area.min}
                    onChange={(event) => updateArea(area.id, "size", event.target.value)}
                    type="range"
                    value={value.size}
                  />
                </label>
                <label>
                  Exact size
                  <input
                    max={area.max}
                    min={area.min}
                    onChange={(event) => updateArea(area.id, "size", event.target.value)}
                    type="number"
                    value={value.size}
                  />
                </label>
              </div>

              <div className="admin-control-row">
                <label>
                  Weight
                  <select
                    onChange={(event) => updateArea(area.id, "weight", event.target.value)}
                    value={value.weight}
                  >
                    {FONT_WEIGHTS.map((weight) => (
                      <option key={weight} value={weight}>
                        {weight}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Style
                  <select
                    onChange={(event) => updateArea(area.id, "style", event.target.value)}
                    value={value.style}
                  >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </label>
              </div>

              <label className="admin-font-select">
                Font family
                <select
                  onChange={(event) => updateArea(area.id, "family", event.target.value)}
                  value={value.family}
                >
                  {FONT_FAMILIES.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </label>

              <div
                className="admin-preview"
                style={{
                  fontFamily: value.family,
                  fontSize: `${value.size}px`,
                  fontStyle: value.style,
                  fontWeight: value.weight,
                }}
              >
                {area.preview}
              </div>
            </article>
          );
        })}
      </section>

      <footer className="admin-footer">
        <strong>Saved automatically</strong>
        <span>
          Open the main site after editing. The same browser will use these typography settings.
        </span>
      </footer>
    </main>
  );
}
