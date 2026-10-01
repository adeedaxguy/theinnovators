"use client";

import { ArrowLeft, Bookmark, Bot, Building2, ChevronRight, Map, Play, Radio, Search, Share2, SlidersHorizontal, Users, WandSparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent, ReactNode } from "react";
import { AudienceSidebar, CategoryBar, FeatureBoard, MarketStrip, PortalHeader, SiteFooter } from "./chrome";
import { GeographicMap, worldCountryNames } from "./GeographicMap";
import { ScrollRail } from "./ScrollRail";
import { ExperiencePlayer, useExperiencePlayer } from "./ExperiencePlayer";
import { academiaLeaders, aiCompanies, aiTopics, companies, companyBlocks, companyFacts, companyVideo, companyVideoGroups, featuredCompanies, industryLeaders, peoplePerspectives, policyLeaders, trendingCompanies } from "./experience-data";
import type { DirectoryCompany } from "./experience-data";
import { companySlug, filterCompanies, parseVideoUrl, readSavedIds } from "./experience-utils";
import type { VideoItem } from "./types";

type SelectVideo = (video: VideoItem) => void;

function ExperienceChrome({ children, audience, category, module, onSelectVideo }: {
  children: ReactNode; audience: string; category: string; module: string; onSelectVideo: SelectVideo;
}) {
  const [activeModule, setActiveModule] = useState(module);
  const [activeCategory, setActiveCategory] = useState(category);
  const [activeAudience, setActiveAudience] = useState(audience);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [, setNewsIndex] = useState(0);
  return (
    <main className={"portal-shell intelligence-shell experience-shell " + (sidebarOpen ? "is-sidebar-open" : "is-sidebar-collapsed")} id="top">
      <PortalHeader activeModule={activeModule} setActiveModule={setActiveModule} />
      <MarketStrip />
      <AudienceSidebar activeAudience={activeAudience} setActiveAudience={setActiveAudience} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      <FeatureBoard activeModule={activeModule} setActiveModule={setActiveModule} />
      <CategoryBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} setActiveModule={setActiveModule} setActiveVideo={onSelectVideo} setNewsIndex={setNewsIndex} />
      {children}
      <SiteFooter />
    </main>
  );
}

function SectionHeading({ title, detail }: { title: string; detail?: string }) {
  return <header className="hub-section-heading"><h2>{title}</h2>{detail && <span>{detail}</span>}</header>;
}

function NewsColumn({ title, items, selected, onSelect }: { title: string; items: VideoItem[]; selected: string; onSelect: SelectVideo }) {
  return (
    <aside className="hub-news" aria-label={title}>
      <SectionHeading title={title} />
      {items.map((video) => (
        <button aria-pressed={selected === video.title} className="hub-news-item" key={video.title} onClick={() => onSelect(video)} type="button">
          <span><strong>{video.title}</strong><small>{video.category}</small></span>
          <img alt="" src={video.image} />
        </button>
      ))}
    </aside>
  );
}

function VideoRail({ title, items, onSelect, selected, kind = "landscape" }: {
  title: string; items: VideoItem[]; onSelect: SelectVideo; selected: string; kind?: "landscape" | "portrait" | "shorts";
}) {
  return (
    <section className={"hub-video-row hub-video-row-" + kind} aria-label={title}>
      <SectionHeading title={title} />
      <ScrollRail label={title}>
        {items.map((video) => (
          <button aria-pressed={selected === video.title} className="hub-video-tile" key={video.title} onClick={() => onSelect(video)} type="button">
            <span className="hub-tile-image"><img alt={kind === "landscape" ? "" : video.title} loading="lazy" src={video.image} /><span className="hub-tile-play"><Play fill="currentColor" /></span></span>
            <span className="hub-tile-copy"><strong>{video.title}</strong><small>{video.category}</small></span>
          </button>
        ))}
      </ScrollRail>
    </section>
  );
}

function useWatchlist(key: string) {
  const snapshot = useSyncExternalStore(
    (notify) => {
      window.addEventListener("storage", notify);
      window.addEventListener("innovators-watchlist", notify);
      return () => { window.removeEventListener("storage", notify); window.removeEventListener("innovators-watchlist", notify); };
    },
    () => { try { return localStorage.getItem(key) ?? "[]"; } catch { return "[]"; } },
    () => "[]",
  );
  const saved = useMemo(() => readSavedIds(snapshot), [snapshot]);
  const [error, setError] = useState("");
  function toggle(title: string) {
    try {
      const current = readSavedIds(localStorage.getItem(key) ?? "[]");
      localStorage.setItem(key, JSON.stringify(current.includes(title) ? current.filter((item) => item !== title) : [...current, title]));
      window.dispatchEvent(new Event("innovators-watchlist"));
      setError("");
    } catch { setError("Your browser could not save this watchlist."); }
  }
  return { saved, toggle, error };
}

function Watchlist({ library, saved, onSelect, onRemove, error }: {
  library: VideoItem[]; saved: string[]; onSelect: SelectVideo; onRemove: (title: string) => void; error: string;
}) {
  const unique = Array.from(new globalThis.Map(library.map((video) => [video.title, video])).values());
  const items = unique.filter((video) => saved.includes(video.title));
  return (
    <section className="hub-watchlist" aria-label="Watchlist">
      <SectionHeading title="Watchlist" detail={items.length + " saved"} />
      {!items.length && <p className="hub-empty">No saved videos yet.</p>}
      {items.map((video) => <div className="hub-saved-row" key={video.title}>
        <button onClick={() => onSelect(video)} type="button"><img alt="" src={video.image} /><strong>{video.title}</strong></button>
        <button aria-label={"Remove " + video.title + " from watchlist"} onClick={() => onRemove(video.title)} title="Remove from watchlist" type="button"><X /></button>
      </div>)}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}

const tools = ["AI Research", "Market Research", "Competitive Analysis", "Product Launch", "PMF Testing", "Sales Insights", "Data Room", "Investor Match", "Valuation", "Due Diligence", "Recruitment", "Events"];

function ResearchTools({ library, onSelect, company = false }: { library: VideoItem[]; onSelect: SelectVideo; company?: boolean }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState("");
  const matches = useMemo(() => submitted === null ? [] : Array.from(new globalThis.Map(library.map((video) => [video.title, video])).values()).filter((video) => (video.title + " " + video.category).toLowerCase().includes(submitted.toLowerCase())), [library, submitted]);
  function search(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(query.trim()); }
  return (
    <section className="hub-research" aria-label="AI agent and tools">
      <SectionHeading title={company ? "AI agent & tools" : "AI discovery agent"} />
      <p className="hub-connection-status"><Bot /> AI connection pending</p>
      <form className="hub-search" onSubmit={search}>
        <label className="sr-only" htmlFor="hub-library-search">Search this page&apos;s library</label>
        <input id="hub-library-search" onChange={(event) => setQuery(event.target.value)} placeholder="Search library" type="search" value={query} />
        <button aria-label="Search library" title="Search library" type="submit"><Search /></button>
      </form>
      {submitted !== null && <div className="hub-search-results" aria-live="polite"><p>{matches.length} library results</p>{matches.map((video) => <button key={video.title} onClick={() => onSelect(video)} type="button">{video.title}<ChevronRight /></button>)}{!matches.length && <p>No matching videos. Try a name or topic.</p>}</div>}
      <div className="hub-tool-grid">
        {(company ? tools : tools.slice(0, 6)).map((tool) => <button aria-pressed={activeTool === tool} key={tool} onClick={() => setActiveTool(activeTool === tool ? "" : tool)} type="button"><Bot />{tool}</button>)}
      </div>
      {activeTool && <div className="hub-tool-status" role="status"><strong>{activeTool}</strong><p>This service is not connected yet. No report has been generated.</p></div>}
    </section>
  );
}

function SaveButton({ video, watchlist }: { video: VideoItem; watchlist: ReturnType<typeof useWatchlist> }) {
  const saved = watchlist.saved.includes(video.title);
  return <button aria-label={saved ? "Unsave current video" : "Save current video"} aria-pressed={saved} onClick={() => watchlist.toggle(video.title)} title={saved ? "Unsave video" : "Save video"} type="button"><Bookmark fill={saved ? "currentColor" : "none"} /></button>;
}

const aiLibrary = [...aiTopics, ...academiaLeaders, ...industryLeaders, ...policyLeaders, ...peoplePerspectives, ...aiCompanies.map(companyVideo)];

export function AiDiscoveryPage() {
  const player = useExperiencePlayer(aiTopics[0]);
  const watchlist = useWatchlist("innovators-ai-watchlist");
  return (
    <ExperienceChrome audience="Universities" category="AI" module="Discover" onSelectVideo={player.selectVideo}>
      <div className="experience-main feedback-hub ai-experience">
        <header className="hub-page-heading"><h1>Artificial Intelligence</h1><SaveButton video={player.selection.video} watchlist={watchlist} /></header>
        <div className="hub-layout">
          <section className="hub-core" aria-label="Central video"><ExperiencePlayer {...player} onPlay={player.selectVideo} /></section>
          <NewsColumn title="Trending topics" items={aiTopics} onSelect={player.selectVideo} selected={player.selection.video.title} />
          <div className="hub-feeds">
            <VideoRail title="AI Academia Researchers" items={academiaLeaders} kind="portrait" onSelect={player.selectVideo} selected={player.selection.video.title} />
            <VideoRail title="AI Industry Insights" items={industryLeaders} kind="portrait" onSelect={player.selectVideo} selected={player.selection.video.title} />
            <VideoRail title="Policy Makers Insights" items={policyLeaders} kind="portrait" onSelect={player.selectVideo} selected={player.selection.video.title} />
            <VideoRail title="People's Perspectives" items={peoplePerspectives} kind="shorts" onSelect={player.selectVideo} selected={player.selection.video.title} />
            <CompanyRail title="Industry Trending" items={[companies[11], companies[13], companies[0], companies[2]]} onSelect={player.selectVideo} selected={player.selection.video.title} />
            <CompanyRail title="AI Innovators" items={aiCompanies} onSelect={player.selectVideo} selected={player.selection.video.title} />
          </div>
          <aside className="hub-right" aria-label="AI intelligence tools">
            <ResearchTools library={aiLibrary} onSelect={player.selectVideo} />
            <Watchlist error={watchlist.error} library={[...aiLibrary, player.selection.video]} onRemove={watchlist.toggle} onSelect={player.selectVideo} saved={watchlist.saved} />
            <section><SectionHeading title="AI index" /><p className="hub-empty">Index and ranking feed not connected.</p></section>
          </aside>
        </div>
      </div>
    </ExperienceChrome>
  );
}

function CompanyRail({ title, items, onSelect, selected }: { title: string; items: DirectoryCompany[]; onSelect: SelectVideo; selected: string }) {
  return <section className="hub-video-row hub-company-row" aria-label={title}>
    <SectionHeading title={title} />
    <ScrollRail label={title}>{items.map((company) => <button className="hub-company-tile" aria-pressed={selected === company.name} key={company.name} onClick={() => onSelect(companyVideo(company))} type="button"><img alt={company.name + " logo"} loading="lazy" src={company.logo} /><strong>{company.name}</strong><small>{company.industry}</small><span>{company.youtubeId ? <Play /> : <Building2 />}</span></button>)}</ScrollRail>
  </section>;
}

export function CompanyShowroomPage({ company }: { company?: DirectoryCompany }) {
  const headingRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (company) headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }, [company]);
  const groups = company ? [{ label: "Company videos", videos: [companyVideo(company)] }] : companyVideoGroups;
  const showroomLibrary = groups.flatMap((group) => group.videos);
  const companyName = company?.name ?? "Nexa Robotics";
  const profilePath = company ? "/company/" + companySlug(company) : "/companyA";
  const facts = company ? [["Company", company.name], ["Industry", company.industry], ["Country", company.country]] : companyFacts;
  const player = useExperiencePlayer(groups[0].videos[0]);
  const watchlist = useWatchlist("innovators-company-watchlist" + (company ? "-" + companySlug(company) : ""));
  const [activeGroup, setActiveGroup] = useState(0);
  const [showSetup, setShowSetup] = useState(false);
  const [sourceUrl, setSourceUrl] = useState("");
  const [status, setStatus] = useState("");
  const [customVideo, setCustomVideo] = useState<VideoItem | null>(null);
  const library = customVideo ? [customVideo, ...showroomLibrary] : showroomLibrary;
  function previewSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const media = parseVideoUrl(sourceUrl);
    if (!media) { setStatus("Enter a valid HTTPS YouTube link or MP4 URL."); return; }
    const video = { ...player.selection.video, youtubeId: undefined, videoUrl: undefined, ...media, sourceUrl, title: "Company video preview" };
    setCustomVideo(video);
    player.selectVideo(video);
    setStatus("Local preview loaded. This does not publish a company video.");
  }
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href); setStatus("Page link copied."); }
    catch { setStatus("Copy this page link: " + window.location.href); }
  }
  return (
    <ExperienceChrome audience="Corporations" category={company?.industry ?? "Advanced Manufacturing"} module="Demo" onSelectVideo={player.selectVideo}>
      <div className="experience-main feedback-hub company-experience">
        <header className="hub-page-heading" ref={headingRef}><div className="hub-company-identity">{company && <img alt={company.name + " logo"} src={company.logo} />}<div><h1>{companyName}</h1><p>{company ? company.industry + " | " + company.country : "Demo company profile"}</p></div></div><nav aria-label="Company navigation">{company && <Link aria-label="Back to innovators directory" href="/innovators" title="Back to innovators directory"><ArrowLeft /></Link>}<SaveButton video={player.selection.video} watchlist={watchlist} /></nav></header>
        <div className="hub-layout">
          <section className="hub-core" aria-label="Company video hub">
            <ExperiencePlayer {...player} onPlay={player.selectVideo} />
            <nav className="hub-company-actions" aria-label="Showroom actions">
              <button aria-label="Live showroom: stream not connected" disabled title="Live stream not connected" type="button"><Radio /></button>
              <a aria-label="Invite audience by email" href={"mailto:?subject=" + encodeURIComponent(companyName + " showroom") + "&body=" + encodeURIComponent("https://theinnovators-two.vercel.app" + profilePath)} title="Invite audience"><Users /></a>
              <button aria-expanded={showSetup} aria-label="Configure showroom preview" onClick={() => setShowSetup(!showSetup)} title="Configure showroom preview" type="button"><WandSparkles /></button>
              <button aria-label="Share showroom" onClick={share} title="Share showroom" type="button"><Share2 /></button>
            </nav>
            {showSetup && <form className="hub-source-form" onSubmit={previewSource}><label htmlFor="company-video-source">Preview video URL</label><div><input id="company-video-source" onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://www.youtube.com/watch?v=..." type="url" value={sourceUrl} required /><button aria-label="Load video preview" title="Load video preview" type="submit"><Play /></button></div></form>}
            {status && <p className="hub-status" role="status">{status}</p>}
            <section className="hub-company-playlist" aria-label="Company video playlists">
              <label htmlFor="company-playlist">Playlist</label>
              <select id="company-playlist" onChange={(event) => setActiveGroup(Number(event.target.value))} value={activeGroup}>{groups.map((group, index) => <option key={group.label} value={index}>{group.label} ({group.videos.length})</option>)}</select>
              <div><VideoRail title={groups[activeGroup].label} items={groups[activeGroup].videos} onSelect={player.selectVideo} selected={player.selection.video.title} /></div>
            </section>
          </section>
          <div className="hub-feeds">
            <section className="hub-company-overview">
              <SectionHeading title="Company overview" detail={company ? undefined : "Illustrative data"} />
              <dl className="hub-company-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              {company ? <p className="hub-empty hub-profile-pending">Additional company information has not been supplied.</p> : <div className="hub-company-data">{companyBlocks.map((block) => <section key={block.title}><h3>{block.title}</h3><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>}
            </section>
            {groups.length > 1 && <section className="hub-video-archive" aria-label="Additional company videos">
              {groups.slice(1).map((group) => <details key={group.label}><summary>{group.label}<span>{group.videos.length} videos</span></summary><VideoRail title={group.label} items={group.videos} onSelect={player.selectVideo} selected={player.selection.video.title} /></details>)}
            </section>}
          </div>
          <aside className="hub-right" aria-label="Company intelligence tools">
            <section className="hub-ranking"><SectionHeading title="Company ranking" detail={company ? undefined : "Demo"} />{company ? <p className="hub-empty">Ranking data not connected.</p> : [["Trust", 92], ["Brand", 84], ["Quality", 95], ["Innovation", 89], ["Responsibility", 86]].map(([label, score]) => <div key={label}><label htmlFor={"score-" + label}>{label}</label><meter id={"score-" + label} max="100" value={Number(score)} /><strong>{score}</strong></div>)}</section>
            <ResearchTools company library={library} onSelect={player.selectVideo} />
            <Watchlist error={watchlist.error} library={[...library, player.selection.video]} onRemove={watchlist.toggle} onSelect={player.selectVideo} saved={watchlist.saved} />
          </aside>
          <NewsColumn title={company ? "Company videos" : "Company updates"} items={groups[0].videos.slice(0, 4)} onSelect={player.selectVideo} selected={player.selection.video.title} />
        </div>
      </div>
    </ExperienceChrome>
  );
}

const countries = Array.from(new Set(companies.map((company) => company.country))).sort();
const allCountries = Array.from(new Set([...worldCountryNames, ...countries])).sort();
const companyLibrary = companies.map(companyVideo);

export function InnovatorsDirectoryPage() {
  const player = useExperiencePlayer(featuredCompanies[0]);
  const watchlist = useWatchlist("innovators-directory-watchlist");
  const mapDialog = useRef<HTMLDialogElement>(null);
  const directoryRef = useRef<HTMLElement>(null);
  const [mapCountry, setMapCountry] = useState("United States");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("original");
  const [savedOnly, setSavedOnly] = useState(false);
  const filtered = useMemo(() => filterCompanies(companies, { country, industry, query, sort }).filter((company) => !savedOnly || watchlist.saved.includes(company.name)), [country, industry, query, sort, savedOnly, watchlist.saved]);
  const mapCompanies = companies.filter((company) => company.country === mapCountry);
  function openCompany(company: DirectoryCompany) { mapDialog.current?.close(); player.selectVideo(companyVideo(company)); }
  function resetFilters() { setCountry(""); setIndustry(""); setQuery(""); setSort("original"); setSavedOnly(false); }
  return (
    <ExperienceChrome audience="Startups" category="DeepTech" module="Discover" onSelectVideo={player.selectVideo}>
      <div className="experience-main feedback-hub innovators-experience">
        <header className="hub-page-heading"><h1>The Innovators</h1><nav aria-label="Innovators tools"><button onClick={() => mapDialog.current?.showModal()} type="button"><Map /> Browse by map</button><button onClick={() => directoryRef.current?.scrollIntoView({ behavior: "instant", block: "start" })} type="button"><Building2 /> Browse companies</button><SaveButton video={player.selection.video} watchlist={watchlist} /></nav></header>
        <div className="hub-layout">
          <section className="hub-core" aria-label="Central video"><ExperiencePlayer {...player} onPlay={player.selectVideo} /></section>
          <NewsColumn title="News & trending" items={trendingCompanies.slice(0, 4)} onSelect={player.selectVideo} selected={player.selection.video.title} />
          <div className="hub-feeds">
            <VideoRail title="Featured" items={featuredCompanies} onSelect={player.selectVideo} selected={player.selection.video.title} />
            <VideoRail title="Trending" items={trendingCompanies} onSelect={player.selectVideo} selected={player.selection.video.title} />
            <section className="hub-directory-section" ref={directoryRef}>
              <SectionHeading title="All innovators" detail={filtered.length + " results"} />
              <div className="hub-directory-filters">
                <label>Sort<select aria-label="Sort companies" onChange={(event) => setSort(event.target.value)} value={sort}><option value="original">Featured order</option><option value="asc">Name A-Z</option><option value="desc">Name Z-A</option></select></label>
                <label>Country<select aria-label="Filter companies by country" onChange={(event) => setCountry(event.target.value)} value={country}><option value="">All countries</option>{countries.map((value) => <option key={value}>{value}</option>)}</select></label>
                <label>Industry<select aria-label="Filter companies by industry" onChange={(event) => setIndustry(event.target.value)} value={industry}><option value="">All industries</option>{Array.from(new Set(companies.map((company) => company.industry))).sort().map((value) => <option key={value}>{value}</option>)}</select></label>
                <label>Search<input onChange={(event) => setQuery(event.target.value)} placeholder="Search innovators" type="search" value={query} /></label>
              </div>
              <div className="hub-filter-options"><label><input checked={savedOnly} onChange={(event) => setSavedOnly(event.target.checked)} type="checkbox" /> Saved only</label><button onClick={resetFilters} type="button">Clear filters</button></div>
              <div className="innovators-directory hub-directory">
                {filtered.map((company) => <div className="hub-directory-entry" key={company.name}><button aria-label={"Select " + company.name + " video"} onClick={() => openCompany(company)} type="button"><img alt={company.name + " logo"} loading="lazy" src={company.logo} /><span><strong>{company.name}</strong><small>{company.industry}</small><em>{company.country}</em></span></button><Link aria-label={"Open " + company.name + " company page"} href={"/company/" + companySlug(company)} title={"Open " + company.name + " company page"}><ChevronRight /></Link></div>)}
              </div>
              {!filtered.length && <p className="hub-empty" role="status">No companies match these filters.</p>}
            </section>
          </div>
          <aside className="hub-right" aria-label="Innovators intelligence tools">
            <ResearchTools library={companyLibrary} onSelect={player.selectVideo} />
            <section><SectionHeading title="Innovators ranking" /><p className="hub-empty">Ranking feed not connected.</p></section>
            <Watchlist error={watchlist.error} library={[...companyLibrary, player.selection.video]} onRemove={watchlist.toggle} onSelect={player.selectVideo} saved={watchlist.saved} />
            <section className="hub-index"><SectionHeading title="Directory data" /><dl><div><dt>Companies in this preview</dt><dd>{companies.length}</dd></div><div><dt>Countries represented</dt><dd>{countries.length}</dd></div></dl></section>
          </aside>
        </div>
        <dialog className="hub-map-dialog" ref={mapDialog} aria-labelledby="company-map-title" onClick={(event) => { if (event.target === event.currentTarget) mapDialog.current?.close(); }}>
          <header><h2 id="company-map-title">Find companies by country</h2><button aria-label="Close company map" onClick={() => mapDialog.current?.close()} title="Close company map" type="button"><X /></button></header>
          <div className="hub-map-content">
            <GeographicMap mode="world" points={[]} selectedCountry={mapCountry} onSelectCountry={setMapCountry} />
            <section className="hub-map-results"><label htmlFor="map-country">Country</label><select id="map-country" onChange={(event) => setMapCountry(event.target.value)} value={mapCountry}>{allCountries.map((value) => <option key={value}>{value}</option>)}</select><h3>{mapCountry}</h3><p>{mapCompanies.length} {mapCompanies.length === 1 ? "company" : "companies"} in this preview</p>{mapCompanies.map((company) => <button key={company.name} onClick={() => openCompany(company)} type="button"><img alt="" src={company.logo} /><span><strong>{company.name}</strong><small>{company.industry}</small></span><ChevronRight /></button>)}{!mapCompanies.length && <p>No company records are available for this country yet.</p>}{mapCompanies.length > 0 && <button className="hub-map-apply" onClick={() => { resetFilters(); setCountry(mapCountry); mapDialog.current?.close(); directoryRef.current?.scrollIntoView({ behavior: "instant", block: "start" }); }} type="button"><SlidersHorizontal /> View these companies</button>}</section>
          </div>
        </dialog>
      </div>
    </ExperienceChrome>
  );
}
