"use client";

import { BarChart3, X } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

const metrics = [
  { label: "Share of voice", definition: "Brand mentions / total mentions across this comparison", values: [42, 33, 25], maximum: 100 },
  { label: "Engagement rate", definition: "Engagements / impressions", values: [4.8, 3.2, 5.6], maximum: 10 },
  { label: "Click-through rate", definition: "Clicks / impressions", values: [2.4, 1.8, 3.1], maximum: 5 },
];
const brands = ["Demo Brand A", "Demo Brand B", "Demo Brand C"];

function MarketingComparison() {
  const [metricIndex, setMetricIndex] = useState(0);
  const [period, setPeriod] = useState("Last 30 days");
  const metric = metrics[metricIndex];
  const values = metric.values.map(value => period === "Previous 30 days" ? Number((value * .8).toFixed(2)) : value);
  // The illustrative share-of-voice distribution must total 100 in either period.
  const displayedValues = metricIndex === 0 && period === "Previous 30 days" ? [38, 36, 26] : values;
  return <section className="analysis-comparison" aria-label="Marketing competition comparison">
    <h3>Marketing competition</h3>
    <p>Fictional brands and illustrative values. Not The INNOVATORS performance or competitor findings.</p>
    <div className="analysis-comparison-controls">
      <div className="analysis-metric-selector" role="group" aria-label="Comparison metric">{metrics.map((item, index) => <button aria-pressed={metricIndex === index} key={item.label} onClick={() => setMetricIndex(index)} type="button">{item.label}</button>)}</div>
      <label>Sample period<select value={period} onChange={event => setPeriod(event.target.value)}><option>Last 30 days</option><option>Previous 30 days</option></select></label>
    </div>
    <h4>{metric.label}</h4>
    <p className="analysis-definition">{metric.definition}. Sample scale: 0-{metric.maximum}%.</p>
    <div className="analysis-bars" aria-hidden="true">{brands.map((brand, index) => <div key={brand}><span>{brand}</span><div className="analysis-bar-track"><span className={"analysis-bar analysis-bar-" + index} style={{ width: displayedValues[index] / metric.maximum * 100 + "%" }} /></div><strong>{displayedValues[index]}%</strong></div>)}</div>
    <table><caption>{metric.label} | {period} | Sample data</caption><thead><tr><th scope="col">Fictional brand</th><th scope="col">{metric.label}</th></tr></thead><tbody>{brands.map((brand, index) => <tr key={brand}><th scope="row">{brand}</th><td>{displayedValues[index]}%</td></tr>)}</tbody></table>
    <p className="analysis-provenance"><strong>Source:</strong> demo dataset only. Verified analytics, agreed competitors and reporting dates are required for real analysis. No connected AI service or marketing account.</p>
  </section>;
}

export function AnalysisDialog({ dialogRef, title, children, onClose }: { dialogRef: RefObject<HTMLDialogElement | null>; title: string; children?: ReactNode; onClose?: () => void }) {
  const titleId = useId();
  const hasComparison = /market|competit|benchmark|sales/i.test(title);
  return <dialog className="analysis-dialog" ref={dialogRef} aria-labelledby={titleId} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
    <header><div><span className="analysis-sample-label">Preview | AI not connected</span><h2 id={titleId}>{title || "Analysis"}</h2></div><button autoFocus aria-label="Close analysis" title="Close analysis" onClick={() => dialogRef.current?.close()} type="button"><X /></button></header>
    <div className="analysis-dialog-content">{children}{hasComparison && <MarketingComparison key={title} />}</div>
  </dialog>;
}

export function MarketingAnalysisButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return <><button className="analysis-open-button" aria-haspopup="dialog" onClick={() => dialogRef.current?.showModal()} type="button"><BarChart3 /> Marketing & competition</button><AnalysisDialog dialogRef={dialogRef} title="Marketing & competitive analysis" /></>;
}
