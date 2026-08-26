"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { IntelligencePoint } from "./intelligence-data";

type IntelligenceAnalyticsProps = {
  scope: "world" | "usa";
  selectedPoint: IntelligencePoint;
};

type StartupRow = {
  name: string;
  institution: string;
  founded: number;
  stage: string;
  funding: string;
  jobs: string;
  patents: string;
  cohort: "Incubated" | "Faculty founded" | "Student founded" | "Alumni founded";
};

const startupRows: StartupRow[] = [
  { name: "Databricks", institution: "UC Berkeley", founded: 2013, stage: "Public ready", funding: "$4.2B", jobs: "7,000+", patents: "128", cohort: "Faculty founded" },
  { name: "Figma", institution: "Brown University", founded: 2012, stage: "Acquired", funding: "$333M", jobs: "1,400+", patents: "46", cohort: "Student founded" },
  { name: "Commonwealth Fusion", institution: "MIT", founded: 2018, stage: "Series B+", funding: "$2.0B", jobs: "900+", patents: "74", cohort: "Incubated" },
  { name: "Recursion", institution: "University of Utah", founded: 2013, stage: "Public", funding: "$465M", jobs: "500+", patents: "61", cohort: "Alumni founded" },
  { name: "Anduril", institution: "Founder-led", founded: 2017, stage: "Series F", funding: "$3.7B", jobs: "3,500+", patents: "93", cohort: "Alumni founded" },
  { name: "Twelve", institution: "Stanford University", founded: 2015, stage: "Series C", funding: "$890M", jobs: "420+", patents: "55", cohort: "Incubated" },
  { name: "Zipline", institution: "Harvard network", founded: 2014, stage: "Series F", funding: "$820M", jobs: "1,000+", patents: "87", cohort: "Student founded" },
  { name: "Ginkgo Bioworks", institution: "MIT", founded: 2008, stage: "Public", funding: "$1.1B", jobs: "1,200+", patents: "210", cohort: "Faculty founded" },
];

const institutionRows = [
  ["Massachusetts Institute of Technology", "1,580", "86", "104", "31", "1,120", "2,206"],
  ["Stanford University", "1,430", "78", "96", "28", "1,045", "1,948"],
  ["University of California, Berkeley", "1,260", "69", "83", "25", "970", "1,612"],
  ["Carnegie Mellon University", "940", "44", "58", "18", "720", "1,104"],
  ["Georgia Institute of Technology", "880", "39", "52", "16", "680", "936"],
  ["University of Michigan", "760", "35", "47", "14", "610", "842"],
];

const worldInstitutionRows = [
  ["National University of Singapore", "1,140", "62", "78", "24", "840", "1,420"],
  ["ETH Zurich", "1,020", "55", "69", "22", "790", "1,218"],
  ["University of Cambridge", "980", "51", "66", "21", "760", "1,176"],
  ["Technical University of Munich", "860", "43", "57", "17", "690", "944"],
  ["University of Toronto", "820", "40", "54", "16", "650", "892"],
  ["Tsinghua University", "1,280", "71", "88", "29", "940", "1,604"],
];

const trendValues = [22, 31, 39, 54, 66, 74, 83, 62, 43, 28];
const ageValues = [18, 42, 78, 53, 29];
const revenueValues = [12, 20, 31, 47, 65, 89, 100, 28];
const readinessValues = [17, 29, 56, 46, 49, 52, 31, 100];
const fundingValues = [24, 39, 31, 69, 58, 96];

function BarChart({ label, values }: { label: string; values: number[] }) {
  return (
    <div className="analytics-bar-chart" aria-label={label} role="img">
      {values.map((value, index) => (
        <span key={`${label}-${index}`} style={{ height: `${Math.max(8, value)}%` }}>
          <i>{value}</i>
        </span>
      ))}
    </div>
  );
}

function AnalyticsPager({ page, pageCount, setPage }: { page: number; pageCount: number; setPage: (page: number) => void }) {
  return (
    <div className="analytics-pager" aria-label="Table pagination">
      <span>Page {page + 1} of {pageCount}</span>
      <button aria-label="Previous page" disabled={page === 0} onClick={() => setPage(page - 1)} type="button">
        <ChevronLeft aria-hidden="true" />
      </button>
      <button aria-label="Next page" disabled={page >= pageCount - 1} onClick={() => setPage(page + 1)} type="button">
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}

export function IntelligenceAnalytics({ scope, selectedPoint }: IntelligenceAnalyticsProps) {
  const [dataset, setDataset] = useState("All startups");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [selectedStartup, setSelectedStartup] = useState(startupRows[0].name);
  const rowsPerPage = 5;

  const filteredStartups = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return startupRows.filter((row) => {
      const matchesDataset = dataset === "All startups" || row.cohort === dataset;
      const matchesQuery = !normalizedQuery || `${row.name} ${row.institution} ${row.stage}`.toLowerCase().includes(normalizedQuery);
      return matchesDataset && matchesQuery;
    });
  }, [dataset, query]);

  const pageCount = Math.max(1, Math.ceil(filteredStartups.length / rowsPerPage));
  const visibleStartups = filteredStartups.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const currentInstitutionRows = scope === "usa" ? institutionRows : worldInstitutionRows;
  const metricValues = scope === "usa"
    ? [["312", "public programs"], ["140+", "research hubs"], ["50", "state ecosystems"], ["900+", "video briefings"], ["11", "industry lanes"], ["8", "ranking models"], ["5", "capital pathways"], ["24/7", "agent desk"]]
    : [["42", "country profiles"], ["100M+", "signals indexed"], ["12", "ranking views"], ["220+", "policy sources"], ["36", "industry networks"], ["74", "summit feeds"], ["6", "capital regions"], ["24/7", "agent desk"]];

  function updateDataset(value: string) {
    setDataset(value);
    setPage(0);
  }

  return (
    <section className="ecosystem-analytics" id="ecosystem-data">
      <div className="analytics-heading">
        <div>
          <h2>{selectedPoint.label} Intelligence Workspace</h2>
          <p>Explore ecosystem signals, institutions, startups, capital, talent, patents, jobs, and commercialization activity.</p>
        </div>
        <span>Prototype data · backend ready</span>
      </div>

      <div className="analytics-controls">
        <label>
          Dataset
          <select value={dataset} onChange={(event) => updateDataset(event.target.value)}>
            {["All startups", "Incubated", "Faculty founded", "Student founded", "Alumni founded"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="analytics-search">
          Search directory
          <span>
            <Search aria-hidden="true" />
            <input
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(0);
              }}
              placeholder="Startup, institution, or stage"
              value={query}
            />
          </span>
        </label>
      </div>

      <div className="analytics-metrics" aria-label={`${selectedPoint.label} summary metrics`}>
        {metricValues.map(([value, label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>

      <div className="analytics-chart-grid">
        <article>
          <h3>Startup Incorporation Trend</h3>
          <BarChart label="Startup incorporation trend" values={trendValues} />
        </article>
        <article>
          <h3>Top Innovation Sectors</h3>
          <div className="analytics-donut" aria-label="AI 28%, biotech 22%, climate 18%, advanced manufacturing 17%, other 15%" role="img">
            <span>5 sectors</span>
          </div>
        </article>
        <article>
          <h3>Startups by Age</h3>
          <BarChart label="Startups by age" values={ageValues} />
        </article>
        <article>
          <h3>Aggregate Startup Revenue</h3>
          <BarChart label="Aggregate startup revenue" values={revenueValues} />
        </article>
        <article>
          <h3>Technology Readiness Levels</h3>
          <BarChart label="Technology readiness levels" values={readinessValues} />
        </article>
        <article>
          <h3>Funding Mix</h3>
          <BarChart label="Funding mix" values={fundingValues} />
        </article>
      </div>

      <section className="analytics-table-section">
        <div className="analytics-table-heading">
          <div>
            <h3>Comparative View of Higher Education Institutes</h3>
            <p>University startup activity, incubators, jobs, and patent output.</p>
          </div>
          <span>{currentInstitutionRows.length} institutions</span>
        </div>
        <div className="analytics-table-scroll">
          <table>
            <thead>
              <tr><th>Institute</th><th>Innovators</th><th>Startups</th><th>Incubated</th><th>Incubators</th><th>Jobs</th><th>Patents</th></tr>
            </thead>
            <tbody>
              {currentInstitutionRows.map((row) => (
                <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={cell}>{cell}</th> : <td key={`${row[0]}-${index}`}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="analytics-table-section">
        <div className="analytics-table-heading">
          <div>
            <h3>{dataset}</h3>
            <p>Choose a row to focus the directory. Use search and dataset controls to narrow the list.</p>
          </div>
          <AnalyticsPager page={Math.min(page, pageCount - 1)} pageCount={pageCount} setPage={setPage} />
        </div>
        <div className="analytics-table-scroll">
          <table className="startup-directory-table">
            <thead>
              <tr><th>Startup</th><th>Institution</th><th>Founded</th><th>Stage</th><th>Funding</th><th>Jobs</th><th>Patents</th></tr>
            </thead>
            <tbody>
              {visibleStartups.map((row) => (
                <tr className={row.name === selectedStartup ? "is-selected" : undefined} key={row.name}>
                  <th><button onClick={() => setSelectedStartup(row.name)} type="button">{row.name}</button></th>
                  <td>{row.institution}</td><td>{row.founded}</td><td>{row.stage}</td><td>{row.funding}</td><td>{row.jobs}</td><td>{row.patents}</td>
                </tr>
              ))}
              {visibleStartups.length === 0 && <tr><td colSpan={7}>No matching startup records. Clear the search or select another dataset.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
