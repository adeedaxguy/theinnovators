"use client";

import type { CSSProperties, ReactNode } from "react";
import { accentInk, type TVFrameSettings } from "./tv-frame-settings";

export function TVFrame({ settings, logo, children, controls, overlays = true }: { settings: TVFrameSettings; logo?: string; children: ReactNode; controls?: ReactNode; overlays?: boolean }) {
  const tokens = { "--tv-frame-color": settings.frameColor, "--tv-accent": settings.accentColor, "--tv-accent-ink": accentInk(settings.accentColor), "--tv-bezel": settings.bezel / 16 + "rem", "--tv-radius": settings.radius / 16 + "rem" } as CSSProperties;
  return <div className={`tv-frame tv-frame-${settings.style}`} style={tokens} data-frame-style={settings.style}>
    {settings.style === "retro" && <div className="tv-antenna" aria-hidden="true"><i /><i /></div>}
    <div className="tv-cabinet">
      {settings.style === "radiant" && settings.repeatBrand && <div className="tv-brand-pattern" aria-hidden="true">{["top", "bottom", "left", "right"].map(side => <div className={"tv-brand-pattern-" + side} key={side}>{Array.from({ length: side === "top" || side === "bottom" ? 3 : 2 }, (_, index) => <span key={index}>{settings.brand}</span>)}</div>)}</div>}
      <div className="tv-screen">
        {children}
        {overlays && <div className="tv-overlays" aria-hidden="true">
          <div className="tv-brand-bug">{logo && <img alt="" src={logo} />}<span>{settings.brand}</span></div>
          {settings.showLive && <span className="tv-live">LIVE</span>}
          {settings.showLowerThird && <div className="tv-lower-third"><strong>{settings.title}</strong><span>{settings.subtitle}</span></div>}
          {settings.style === "retro" && settings.scanlines && <div className="tv-scanlines" />}
        </div>}
      </div>
      {settings.style === "retro" && <div className="tv-retro-panel" aria-hidden="true"><i className="tv-knob" /><i className="tv-knob" /><i className="tv-speaker" /></div>}
      {controls && <div className="tv-cabinet-controls">{controls}</div>}
    </div>
    <div className="tv-brand-plate"><span className="tv-led" aria-hidden="true" /><span>{settings.brand}</span></div>
  </div>;
}
