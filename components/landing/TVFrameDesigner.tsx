"use client";

import { Check, Copy, Download, RotateCcw, Upload, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TVFrame } from "./TVFrame";
import { DEFAULT_TV_FRAME, frameCSSTokens, readTVFrame, TV_FRAME_STORAGE_KEY, type TVFrameSettings } from "./tv-frame-settings";

export function useTVFrameSettings(storageKey = TV_FRAME_STORAGE_KEY, defaultBrand = DEFAULT_TV_FRAME.brand) {
  const raw = useSyncExternalStore((notify) => {
    window.addEventListener("storage", notify); window.addEventListener("innovators-frame", notify);
    return () => { window.removeEventListener("storage", notify); window.removeEventListener("innovators-frame", notify); };
  }, () => { try { return localStorage.getItem(storageKey); } catch { return null; } }, () => null);
  return { ...readTVFrame(raw), ...(!raw ? { brand: defaultBrand } : {}) };
}

export function TVFrameDesigner({ embedded = false, storageKey = TV_FRAME_STORAGE_KEY, defaultBrand = DEFAULT_TV_FRAME.brand }: { embedded?: boolean; storageKey?: string; defaultBrand?: string }) {
  const saved = useTVFrameSettings(storageKey, defaultBrand);
  const [draft, setDraft] = useState<TVFrameSettings | null>(null);
  const settings = draft ?? saved;
  const [logo, setLogo] = useState("");
  const [video, setVideo] = useState("");
  const [status, setStatus] = useState("");
  const [tokensOpen, setTokensOpen] = useState(false);
  const logoInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  useEffect(() => () => { if (logo) URL.revokeObjectURL(logo); }, [logo]);
  useEffect(() => () => { if (video) URL.revokeObjectURL(video); }, [video]);
  function update<K extends keyof TVFrameSettings>(key: K, value: TVFrameSettings[K]) { setDraft({ ...settings, ...(key === "style" ? { bezel: value === "modern" ? 8 : value === "retro" || value === "radiant" ? 24 : 16 } : {}), [key]: value }); setStatus(""); }
  function upload(file: File | undefined, kind: "logo" | "video") {
    if (!file) return;
    const valid = kind === "logo" ? ["image/png", "image/jpeg", "image/webp"].includes(file.type) : ["video/mp4", "video/webm", "video/quicktime"].includes(file.type);
    if (!valid || file.size > (kind === "logo" ? 5 : 500) * 1024 * 1024) { setStatus(kind === "logo" ? "Choose a PNG, JPG or WebP logo under 5 MB." : "Choose an MP4, WebM or MOV video under 500 MB."); return; }
    const url = URL.createObjectURL(file);
    if (kind === "logo") setLogo(url); else setVideo(url);
    setStatus("Local " + kind + " preview loaded. Files are not uploaded or saved.");
  }
  function apply() {
    try { localStorage.setItem(storageKey, JSON.stringify(settings)); window.dispatchEvent(new Event("innovators-frame")); setDraft(null); setStatus("Frame settings applied to this showroom in this browser. Local uploads remain in this preview only."); }
    catch { setStatus("Your browser could not save settings. The current preview still works."); }
  }
  async function copy() { try { await navigator.clipboard.writeText(frameCSSTokens(settings)); setStatus("CSS tokens copied."); } catch { setTokensOpen(true); setStatus("Clipboard unavailable. CSS tokens are shown below."); } }
  function download() {
    const url = URL.createObjectURL(new Blob([frameCSSTokens(settings)], { type: "text/css" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "innovators-tv-frame.css"; anchor.click(); URL.revokeObjectURL(url);
  }
  return <section className={"frame-designer" + (embedded ? " frame-designer-embedded" : "")} aria-label="TV Frame Designer">
    {!embedded && <header className="designer-heading"><h1>TV Frame Designer</h1><Link href="/company">The INNOVATORS</Link></header>}
    <div className="designer-layout">
      <div className="designer-preview">
        <TVFrame settings={settings} logo={logo}>{video ? <video aria-label="Local video preview" src={video} controls playsInline onError={() => setStatus("This browser cannot play that video. Try an MP4 with H.264 video.")} /> : <div className="tv-test-pattern" aria-label="Test pattern preview"><div /><span>{settings.brand || "TV preview"}</span></div>}</TVFrame>
        <p className="designer-preview-status">Design preview{settings.showLive ? " | LIVE is an overlay preview, not a broadcast" : ""}</p>
        <div className="designer-commands"><button onClick={apply} type="button"><Check /> Apply to showroom</button><button onClick={() => { setDraft({ ...DEFAULT_TV_FRAME, brand: defaultBrand }); setLogo(""); setVideo(""); setStatus("Preview reset. Apply to save these settings."); }} type="button"><RotateCcw /> Reset</button></div>
        {status && <p role="status">{status}</p>}
        <details open={tokensOpen} onToggle={event => setTokensOpen(event.currentTarget.open)}><summary>CSS tokens</summary><pre>{frameCSSTokens(settings)}</pre><div className="designer-commands"><button onClick={copy} type="button"><Copy /> Copy</button><button onClick={download} type="button"><Download /> Download CSS</button></div></details>
      </div>
      <div className="designer-controls">
        <fieldset><legend>Frame style</legend><div className="designer-styles">{([["radiant", "Blue radiant"], ["retro", "Retro CRT"], ["modern", "Modern flat"], ["broadcast", "Broadcast"]] as const).map(([value, label]) => <label key={value}><input checked={settings.style === value} name={embedded ? "embedded-frame-style" : "frame-style"} onChange={() => update("style", value)} type="radio" />{label}</label>)}</div></fieldset>
        <fieldset><legend>Branding</legend><label>Brand name<input maxLength={80} value={settings.brand} onChange={e => update("brand", e.target.value)} /></label><div className="designer-color-row"><label>Frame color<input aria-label="Frame color" type="color" value={settings.frameColor} onInput={e => update("frameColor", e.currentTarget.value)} onChange={e => update("frameColor", e.target.value)} /></label><label>Accent color<input aria-label="Accent color" type="color" value={settings.accentColor} onInput={e => update("accentColor", e.currentTarget.value)} onChange={e => update("accentColor", e.target.value)} /></label></div><input ref={logoInput} hidden accept="image/png,image/jpeg,image/webp" type="file" onChange={e => { upload(e.target.files?.[0], "logo"); e.target.value = ""; }} /><button onClick={() => logoInput.current?.click()} type="button"><Upload /> Logo</button>{logo && <button aria-label="Remove uploaded logo" title="Remove logo" onClick={() => setLogo("")} type="button"><X /></button>}</fieldset>
        <fieldset><legend>Dimensions</legend><label>Bezel <output>{settings.bezel}px</output><input aria-label="Bezel thickness" type="range" min={8} max={32} value={settings.bezel} onChange={e => update("bezel", Number(e.target.value))} /></label><label>Corner radius <output>{settings.radius}px</output><input aria-label="Corner radius" type="range" min={0} max={32} value={settings.radius} onChange={e => update("radius", Number(e.target.value))} /></label><label><input checked={settings.repeatBrand} disabled={settings.style !== "radiant"} onChange={e => update("repeatBrand", e.target.checked)} type="checkbox" />Repeated frame branding</label></fieldset>
        <fieldset><legend>Overlays</legend>{([["showLive", "LIVE tag"], ["showLowerThird", "Lower third"], ["scanlines", "CRT scanlines"]] as const).map(([key, title]) => <label className="designer-toggle" key={key}><input checked={settings[key]} disabled={key === "scanlines" && settings.style !== "retro"} onChange={e => update(key, e.target.checked)} type="checkbox" />{title}</label>)}{settings.showLowerThird && <><label>Title<input maxLength={80} value={settings.title} onChange={e => update("title", e.target.value)} /></label><label>Subtitle<input maxLength={80} value={settings.subtitle} onChange={e => update("subtitle", e.target.value)} /></label></>}</fieldset>
        <fieldset><legend>Preview video</legend><input ref={videoInput} hidden accept="video/mp4,video/webm,video/quicktime" type="file" onChange={e => { upload(e.target.files?.[0], "video"); e.target.value = ""; }} /><button onClick={() => videoInput.current?.click()} type="button"><Upload /> Local video</button>{video && <button aria-label="Remove preview video" title="Remove video" onClick={() => setVideo("")} type="button"><X /></button>}</fieldset>
      </div>
    </div>
  </section>;
}
