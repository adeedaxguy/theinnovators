"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Map, Maximize2, Minus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GeographicMap } from "./GeographicMap";
import type { IntelligencePoint } from "./intelligence-data";
import { usaIntelligencePage } from "./intelligence-data";

type MapPanelProps = {
  selectedPoint: IntelligencePoint;
  setSelectedPoint: (point: IntelligencePoint) => void;
};

function UsaMapPanel({ selectedPoint, setSelectedPoint }: MapPanelProps) {
  const points = usaIntelligencePage.map.points;

  return (
    <div className="usa-map-panel">
      <div className="usa-map-canvas">
        <GeographicMap
          mode="usa"
          onSelectPoint={setSelectedPoint}
          points={points}
          selectedPoint={selectedPoint}
        />
      </div>

      <nav className="usa-map-locations" aria-label="Featured state profiles">
        {points.map((point) => (
          <button
            className={point.id === selectedPoint.id ? "is-active" : undefined}
            key={point.id}
            onClick={() => setSelectedPoint(point)}
            type="button"
          >
            {point.label}
          </button>
        ))}
      </nav>

      <aside className="usa-map-detail" aria-live="polite">
        <span>{selectedPoint.label}</span>
        <h2>{selectedPoint.summary}</h2>
        <ul>
          {selectedPoint.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <a href="/usa#usa-states">Open state intelligence</a>
      </aside>
    </div>
  );
}

export function UsaMapOverlay() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<"open" | "minimized" | "closed">("open");
  const [selectedPoint, setSelectedPoint] = useState(usaIntelligencePage.map.points[0]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const frame = requestAnimationFrame(() => {
      if (state === "open" && dialog?.isConnected && !dialog.open) dialog.showModal();
    });

    return () => cancelAnimationFrame(frame);
  }, [state]);

  function dismiss(nextState: "minimized" | "closed") {
    dialogRef.current?.close();
    setState(nextState);
  }

  function reopen() {
    setState("open");
  }

  return (
    <>
      <dialog
        aria-labelledby="usa-map-overlay-title"
        className="usa-map-dialog"
        onCancel={() => setState("closed")}
        ref={dialogRef}
      >
        <header className="usa-map-dialog-header">
          <div>
            <Map aria-hidden="true" />
            <div>
              <h1 id="usa-map-overlay-title">Explore innovation across America</h1>
              <p>Select a highlighted state to preview its ecosystem, industries, policy, and programs.</p>
            </div>
          </div>
          <div className="usa-map-dialog-actions">
            <Link href="/usa/map">
              <ExternalLink aria-hidden="true" />
              Full interactive map
            </Link>
            <button aria-label="Minimize interactive map" onClick={() => dismiss("minimized")} type="button">
              <Minus aria-hidden="true" />
            </button>
            <button aria-label="Close interactive map" onClick={() => dismiss("closed")} type="button">
              <X aria-hidden="true" />
            </button>
          </div>
        </header>
        <UsaMapPanel selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} />
      </dialog>

      {state === "minimized" && (
        <div className="usa-map-minimized" role="status">
          <Map aria-hidden="true" />
          <div>
            <strong>Interactive U.S. map</strong>
            <span>{selectedPoint.label} selected</span>
          </div>
          <button aria-label="Expand interactive map" onClick={reopen} type="button">
            <Maximize2 aria-hidden="true" />
          </button>
          <button aria-label="Close interactive map" onClick={() => setState("closed")} type="button">
            <X aria-hidden="true" />
          </button>
        </div>
      )}

      {state === "closed" && (
        <button className="usa-map-reopen" onClick={reopen} type="button">
          <Map aria-hidden="true" />
          Open interactive map
        </button>
      )}
    </>
  );
}

export function UsaMapOnly() {
  const [selectedPoint, setSelectedPoint] = useState(usaIntelligencePage.map.points[0]);

  return (
    <main className="usa-map-only">
      <header>
        <Link href="/usa">
          <ArrowLeft aria-hidden="true" />
          Back to USA intelligence
        </Link>
        <div>
          <h1>Interactive U.S. innovation map</h1>
          <p>Explore state ecosystems, industries, institutions, policy, leaders, and video briefings.</p>
        </div>
      </header>
      <UsaMapPanel selectedPoint={selectedPoint} setSelectedPoint={setSelectedPoint} />
    </main>
  );
}
