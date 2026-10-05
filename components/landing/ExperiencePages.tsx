"use client";

import { ArrowLeft, BarChart3, Bookmark, Bot, Building2, ChevronRight, FileText, Grid3X3, Heart, Keyboard, LockKeyhole, Map, MessageCircle, Play, Radio, Search, Share2, ShoppingCart, SlidersHorizontal, Store, ThumbsUp, UserRound, Users, WandSparkles, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { FormEvent, ReactNode } from "react";
import { AudienceSidebar, CategoryBar, FeatureBoard, MarketStrip, PortalHeader, SiteFooter } from "./chrome";
import { GeographicMap, worldCountryNames } from "./GeographicMap";
import { ScrollRail } from "./ScrollRail";
import { ExperiencePlayer, useExperiencePlayer } from "./ExperiencePlayer";
import { academiaLeaders, aiCompanies, aiTopics, companies, companyVideo, featuredCompanies, industryLeaders, peoplePerspectives, policyLeaders, trendingCompanies } from "./experience-data";
import type { DirectoryCompany } from "./experience-data";
import { companyDemoGroups, demoAiScores, demoCompanyScores, demoDirectoryScores, demoToolContent, isSampleMedia } from "./experience-demo";
import { companySlug, filterCompanies, parseVideoUrl, readSavedIds } from "./experience-utils";
import type { VideoItem } from "./types";
import { innovatorsProfile, innovatorsVideos, innovatorsVideoGroups } from "./innovators-profile";
import { TVFrameDesigner, useTVFrameSettings } from "./TVFrameDesigner";
import { TV_FRAME_STORAGE_KEY } from "./tv-frame-settings";

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

function NewsColumn({ title, items, selected, onSelect, companyHeading = false }: { title: string; items: VideoItem[]; selected: string; onSelect: SelectVideo; companyHeading?: boolean }) {
  return (
    <aside className="hub-news" aria-label={title}>
      {companyHeading ? <header className="hub-section-heading"><h1>{title}</h1></header> : <SectionHeading title={title} />}
      {items.map((video) => (
        <button aria-pressed={selected === video.title} className="hub-news-item" key={video.title} onClick={() => onSelect(video)} type="button">
          <span><strong>{video.title}</strong><small>{video.category}{isSampleMedia(video) && " | Sample media"}</small></span>
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
            <span className="hub-tile-image"><img alt={kind === "landscape" ? "" : video.title} loading="lazy" src={video.image} />{isSampleMedia(video) && <span className="hub-sample-badge">Sample</span>}<span className="hub-tile-play"><Play fill="currentColor" /></span></span>
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
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState("");
  const matches = useMemo(() => submitted === null ? [] : Array.from(new globalThis.Map(library.map((video) => [video.title, video])).values()).filter((video) => (video.title + " " + video.category).toLowerCase().includes(submitted.toLowerCase())), [library, submitted]);
  function search(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(query.trim()); }
  return (
    <section className="hub-research" aria-label="Inno Magic AI tools">
      <SectionHeading title="Inno Magic AI" />
      <p className="hub-connection-status"><Bot /> Demo mode | AI not connected</p>
      <form className="hub-search" onSubmit={search}>
        <label className="sr-only" htmlFor={searchId}>Search this page&apos;s library</label>
        <input id={searchId} onChange={(event) => setQuery(event.target.value)} placeholder="Search library" type="search" value={query} />
        <button aria-label="Search library" title="Search library" type="submit"><Search /></button>
      </form>
      {submitted !== null && <div className="hub-search-results" aria-live="polite"><p>{matches.length} library results</p>{matches.map((video) => <button key={video.title} onClick={() => onSelect(video)} type="button">{video.title}<ChevronRight /></button>)}{!matches.length && <p>No matching videos. Try a name or topic.</p>}</div>}
      <div className="hub-tool-grid">
        {(company ? tools : tools.slice(0, 6)).map((tool) => <button aria-pressed={activeTool === tool} key={tool} onClick={() => setActiveTool(activeTool === tool ? "" : tool)} type="button"><Bot />{tool}</button>)}
      </div>
      {activeTool && <div className="hub-tool-status" role="status"><strong>{activeTool} | Sample brief</strong><ul>{demoToolContent[activeTool].map((item) => <li key={item}>{item}</li>)}</ul><p>Illustrative content. No live AI analysis or company assessment.</p></div>}
    </section>
  );
}

function SampleRanking({ title, scores }: { title: string; scores: readonly (readonly [string, number])[] }) {
  return <section className="hub-ranking">
    <SectionHeading title={title} detail="Sample data" />
    <p className="hub-empty">Illustrative scores, not company assessments.</p>
    {scores.map(([label, score]) => <div key={label}><span>{label}</span><meter aria-label={label + " sample score"} max={100} value={score} /><strong>{score}</strong></div>)}
  </section>;
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
            <SampleRanking title="AI index" scores={demoAiScores} />
          </aside>
        </div>
      </div>
    </ExperienceChrome>
  );
}

function CompanyRail({ title, items, onSelect, selected }: { title: string; items: DirectoryCompany[]; onSelect: SelectVideo; selected: string }) {
  return <section className="hub-video-row hub-company-row" aria-label={title}>
    <SectionHeading title={title} />
    <ScrollRail label={title}>{items.map((company) => <button className="hub-company-tile" aria-pressed={selected === company.name} key={company.name} onClick={() => onSelect(companyVideo(company))} type="button"><img alt={company.name + " logo"} loading="lazy" src={company.logo} /><strong>{company.name}</strong><small>{company.industry}{!company.youtubeId && " | Sample media"}</small><span><Play /></span></button>)}</ScrollRail>
  </section>;
}

export function CompanyShowroomPage({ company }: { company?: DirectoryCompany }) {
  const headingRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!company) return;
    let cancelled = false;
    let frame = 0;
    // Wait for font layout and the browser's initial scroll restoration.
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" }));
    });
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [company]);
  const groups = company ? companyDemoGroups(company.name, companyVideo(company)) : innovatorsVideoGroups;
  const showroomLibrary = groups.flatMap((group) => group.videos);
  const companyName = company?.name ?? innovatorsProfile.name;
  const profilePath = company ? "/company/" + companySlug(company) : "/company";
  const facts = company ? [["Company", company.name], ["Industry", company.industry], ["Country", company.country]] : innovatorsProfile.facts;
  const frameStorageKey = company ? TV_FRAME_STORAGE_KEY + ":" + companySlug(company) : TV_FRAME_STORAGE_KEY;
  const frameSettings = useTVFrameSettings(frameStorageKey, companyName);
  const player = useExperiencePlayer(groups[0].videos[0]);
  const watchlist = useWatchlist("innovators-company-watchlist" + (company ? "-" + companySlug(company) : ""));
  const [activeView, setActiveView] = useState("Videos");
  const [designerOpen, setDesignerOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const liked = likedVideos.includes(player.selection.video.title);
  const [sourceUrl, setSourceUrl] = useState("");
  const [status, setStatus] = useState("");
  const [customVideo, setCustomVideo] = useState<VideoItem | null>(null);
  const showroomPreview: VideoItem = { title: companyName + " | Showroom preview", category: "Recorded demo, not a live stream", image: "/assets/billboards/broadcast-stage.jpg" };
  const library = [...(customVideo ? [customVideo] : []), showroomPreview, ...showroomLibrary];
  const newsLibrary = Array.from(new globalThis.Map(showroomLibrary.map((video) => [video.title, video])).values()).slice(0, 12);
  function scrollToFrame() {
    requestAnimationFrame(() => player.playerRef.current?.scrollIntoView({ block: "start", behavior: "instant" }));
  }
  function selectCompanyVideo(video: VideoItem) {
    setActiveView("Videos");
    setStatus("");
    player.selectVideo(video);
    scrollToFrame();
  }
  function previewSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const media = parseVideoUrl(sourceUrl);
    if (!media) { setStatus("Enter a valid HTTPS YouTube link or MP4 URL."); return; }
    const video = { ...player.selection.video, youtubeId: undefined, videoUrl: undefined, ...media, sourceUrl, title: "Company video preview" };
    setCustomVideo(video);
    selectCompanyVideo(video);
    setStatus("Local preview loaded. This does not publish a company video.");
  }
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href); setStatus("Page link copied."); }
    catch { setStatus("Copy this page link: " + window.location.href); }
  }
  const showroomActions = [["Community", Users], ["Leadership", UserRound], ["Company profile", FileText], ["Products", Store], ["Growth & data", BarChart3], ["Tools", Grid3X3], ["Comments", MessageCircle], ["Videos", Play], ["Search videos", Keyboard], ["Live now", Radio], ["Offerings", ShoppingCart], ["Save video", Heart], ["Private access", LockKeyhole], ["Like video", ThumbsUp]] as const;
  function openFeature(label: string) {
    setStatus("");
    if (label === "Save video") { watchlist.toggle(player.selection.video.title); return; }
    if (label === "Like video") { setLikedVideos(liked ? likedVideos.filter(title => title !== player.selection.video.title) : [...likedVideos, player.selection.video.title]); setStatus(!liked ? "Liked in this browser session." : "Like removed."); return; }
    setActiveView(label);
    if (label === "Live now") { player.selectVideo(showroomPreview); setStatus("Recorded showroom sample. No live stream is connected."); }
    scrollToFrame();
  }
  const stageContent = activeView === "Videos" || activeView === "Live now" ? undefined : (
    <section className="hub-stage-content" aria-label={activeView + " in central frame"}>
      <h2>{activeView === "Share" ? "Share or white label" : activeView}</h2>
      {activeView === "Company profile" && <><p>{company ? company.industry + " | " + company.country : innovatorsProfile.description}</p><dl className="hub-company-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><button className="hub-stage-command" onClick={() => window.print()} type="button"><FileText /> Print company profile</button></>}
      {activeView === "Leadership" && <><p>{company ? "Company-specific leadership details have not been supplied." : "Founders and directors have not been publicly verified. The people below are interviews in our public library, not our employees."}</p><div className="hub-stage-library">{(company ? groups[0].videos : innovatorsVideos).map(video => <button key={video.title} onClick={() => selectCompanyVideo(video)} type="button"><img alt="" src={video.image} /><strong>{video.title}</strong><Play /></button>)}</div></>}
      {activeView === "Products" && <>{company ? <p>Company-specific products have not been supplied.</p> : <ul>{innovatorsProfile.offerings.map(name => <li key={name}><a href={innovatorsProfile.website} target="_blank" rel="noreferrer">{name}</a></li>)}</ul>}</>}
      {activeView === "Growth & data" && <div className="hub-company-data">{innovatorsProfile.blocks.filter(block => ["Growth", "Funding"].includes(block.title)).map(block => <section key={block.title}><h3>{block.title}</h3><ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div>}
      {activeView === "Community" && <><p>{company ? "Company community links are not connected." : "Join the innovation community through The INNOVATORS public website."}</p><a className="hub-stage-command" href={company ? "mailto:?subject=" + encodeURIComponent(companyName + " community") : innovatorsProfile.website} target="_blank" rel="noreferrer"><Users /> Visit community</a></>}
      {activeView === "Tools" && <ResearchTools company library={library} onSelect={selectCompanyVideo} />}
      {activeView === "Comments" && <><p>Comments preview | Not published or shared</p><form className="hub-comment-form" onSubmit={event => { event.preventDefault(); if (comment.trim()) { setComments([...comments, comment.trim()]); setComment(""); } }}><label htmlFor="frame-comment">Your comment</label><textarea id="frame-comment" maxLength={1000} value={comment} onChange={e => setComment(e.target.value)} required /><button className="hub-stage-command" type="submit"><MessageCircle /> Add local comment</button></form>{comments.map((text, i) => <p key={i}>{text}</p>)}</>}
      {activeView === "Search videos" && <><form className="hub-source-form" onSubmit={event => event.preventDefault()}><label htmlFor="company-frame-search">Search videos</label><input id="company-frame-search" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)} type="search" /></form><div className="hub-stage-library">{Array.from(new globalThis.Map(showroomLibrary.map(video => [video.title, video])).values()).filter(video => (video.title + " " + video.category).toLowerCase().includes(sourceUrl.toLowerCase())).map(video => <button key={video.title} onClick={() => selectCompanyVideo(video)} type="button"><img alt="" src={video.image} /><strong>{video.title}</strong><Play /></button>)}</div></>}
      {activeView === "Offerings" && <><p>{company ? "Pricing and checkout are not connected for this company." : "Explore the platform's offerings on our public website. Purchases are not processed in this preview."}</p><a className="hub-stage-command" href={company ? "mailto:?subject=" + encodeURIComponent(companyName + " offerings") : innovatorsProfile.website} target="_blank" rel="noreferrer"><ShoppingCart /> View offerings</a></>}
      {activeView === "Private access" && <><p>Private data rooms and account access are not connected in this preview. Do not upload confidential information.</p><a className="hub-stage-command" href={"mailto:" + innovatorsProfile.contact}><LockKeyhole /> Request access</a></>}
      {activeView === "Invite" && <><p>Invite peers or an audience to {companyName}&apos;s showroom.</p><a className="hub-stage-command" href={"mailto:?subject=" + encodeURIComponent(companyName + " showroom") + "&body=" + encodeURIComponent("https://theinnovators-two.vercel.app" + profilePath)}><Users /> Prepare email invitation</a><p>No invitation is sent automatically.</p></>}
      {activeView === "Build showroom" && <><p>Preview a YouTube or HTTPS MP4 video.</p><form className="hub-source-form" onSubmit={previewSource}><label htmlFor="company-video-source">Video URL</label><div><input id="company-video-source" onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://www.youtube.com/watch?v=..." type="url" value={sourceUrl} required /><button aria-label="Load video preview" title="Load video preview" type="submit"><Play /></button></div></form><p>Local preview only. Publishing and white-label hosting are not connected.</p></>}
      {activeView === "Share" && <><p>Share this company showroom.</p><input aria-label="Public showroom URL" readOnly value={"https://theinnovators-two.vercel.app" + profilePath} /><button className="hub-stage-command" onClick={share} type="button"><Share2 /> Copy showroom link</button><p>White-label hosting is not connected.</p></>}
    </section>
  );
  return (
    <ExperienceChrome audience="Corporations" category={company?.industry ?? "DeepTech"} module="Demo" onSelectVideo={selectCompanyVideo}>
      <div className={"experience-main feedback-hub company-experience" + (!company ? " company-template" : "")}>
        {!company && <header className="company-mobile-identity"><h1>{companyName}</h1></header>}
        {company && <header className="hub-page-heading" ref={headingRef}><div className="hub-company-identity"><img alt={company.name + " logo"} src={company.logo} /><div><h1>{companyName}</h1><p>{company.industry + " | " + company.country}</p></div></div><nav aria-label="Company navigation"><Link aria-label="Back to innovators directory" href="/innovators" title="Back to innovators directory"><ArrowLeft /></Link><SaveButton video={player.selection.video} watchlist={watchlist} /></nav></header>}
        <div className="hub-layout">
          <section className="hub-core" aria-label="Company video hub">
            <ExperiencePlayer {...player} frame={frameSettings} showCaption={false} onPlay={selectCompanyVideo} content={stageContent} controls={<nav className="hub-company-actions hub-frame-controls tv-icon-controls" aria-label="Showroom actions">{showroomActions.map(([label, Icon]) => <button aria-label={label === "Live now" ? "Preview live showroom with recorded sample" : label} aria-pressed={label === "Save video" ? watchlist.saved.includes(player.selection.video.title) : label === "Like video" ? liked : activeView === label} key={label} onClick={() => openFeature(label)} title={label} type="button"><Icon /><span className="tv-control-tooltip">{label}</span></button>)}</nav>} />
            {frameSettings.showLive && <p className="hub-status">LIVE is a frame-overlay preview. This video is not a live stream.</p>}
            {status && <p className="hub-status" role="status">{status}</p>}
            {designerOpen && <TVFrameDesigner embedded storageKey={frameStorageKey} defaultBrand={companyName} />}
            <section className="company-featured-strip" aria-label="Featured company videos">
              <ScrollRail label="Featured company videos">{groups[0].videos.map(video => <button aria-label={"Play " + video.title} aria-pressed={player.selection.video.title === video.title} key={video.title} onClick={() => selectCompanyVideo(video)} type="button"><img alt="" src={video.image} /><span>{video.title}</span></button>)}</ScrollRail>
            </section>
          </section>
          <div className="hub-feeds">
            <section className="hub-company-overview">
              <SectionHeading title="Company overview" />
              {!company && <><p className="company-description">{innovatorsProfile.description}</p><nav className="company-public-links" aria-label="Public company links"><a href={innovatorsProfile.website} target="_blank" rel="noreferrer">Website</a><a href={innovatorsProfile.about} target="_blank" rel="noreferrer">About us</a><a href={"mailto:" + innovatorsProfile.contact}>Contact</a></nav></>}
              <dl className="hub-company-facts">{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
              {company ? <section className="hub-profile-samples" aria-label="Sample company sections">
                <SectionHeading title="Company spotlights" detail="Demo content" />
                <p className="hub-empty">Sample sections; company-specific content has not been supplied.</p>
                <div>{[groups[0].videos[1], groups[0].videos[2], groups[2].videos[0]].map((video) => <button key={video.title} onClick={() => selectCompanyVideo(video)} type="button"><img alt="" loading="lazy" src={video.image} /><span><strong>{video.title.split(" | ")[1]}</strong><small>Sample content</small><Play /></span></button>)}</div>
              </section> : <div className="hub-company-data">{innovatorsProfile.blocks.map((block) => <section key={block.title}><h3>{block.title}</h3><ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>}
            </section>
            {groups.length > 1 && <section className="hub-video-archive" aria-label="Additional company videos">
              {groups.slice(1).map((group) => <details key={group.label}><summary>{group.label}<span>{group.videos.length} videos</span></summary>{group.videos.length ? <VideoRail title={group.label} items={group.videos} onSelect={selectCompanyVideo} selected={player.selection.video.title} /> : <p className="hub-empty">Company tutorial videos have not been supplied.</p>}</details>)}
            </section>}
            <VideoRail title="You may also like" items={company ? featuredCompanies : innovatorsVideos.slice(2)} onSelect={selectCompanyVideo} selected={player.selection.video.title} />
            <section className="company-comments"><SectionHeading title="Comments" /><p className="hub-empty">Local preview only. Comments are not published.</p><form className="hub-comment-form" onSubmit={event => { event.preventDefault(); if (comment.trim()) { setComments([...comments, comment.trim()]); setComment(""); } }}><label htmlFor="company-comment">Your comment</label><textarea id="company-comment" maxLength={1000} value={comment} onChange={e => setComment(e.target.value)} required /><button type="submit"><MessageCircle /> Add local comment</button></form>{comments.map((text, index) => <p key={index}>{text}</p>)}</section>
          </div>
          <aside className="hub-right" aria-label="Company intelligence tools">
            {company ? <SampleRanking title="Company ranking" scores={demoCompanyScores} /> : <section className="hub-ranking"><SectionHeading title="Ranking" />{["Trust", "Brand", "Quality", "Innovation", "Responsibility"].map(label => <div key={label}><span>{label}</span><span>Not rated</span></div>)}</section>}
            <nav className="company-aux-actions" aria-label="Showroom sharing and design"><button onClick={() => openFeature("Invite")} type="button"><Users /> Invite peers or audience</button><button onClick={() => { setDesignerOpen(!designerOpen); if (!designerOpen) scrollToFrame(); }} aria-expanded={designerOpen} type="button"><WandSparkles /> Build your showroom</button><button onClick={() => openFeature("Share")} type="button"><Share2 /> Share or white label</button></nav>
            <ResearchTools company library={library} onSelect={selectCompanyVideo} />
            <Watchlist error={watchlist.error} library={[...library, player.selection.video]} onRemove={watchlist.toggle} onSelect={selectCompanyVideo} saved={watchlist.saved} />
          </aside>
          <div className="company-left-column"><NewsColumn title={company ? "Company videos" : companyName} companyHeading={!company} items={company ? groups[0].videos.slice(0, 4) : newsLibrary} onSelect={selectCompanyVideo} selected={player.selection.video.title} /><VideoRail title="Community" items={company ? groups[0].videos.slice(1, 3) : innovatorsVideos.slice(0, 2)} onSelect={selectCompanyVideo} selected={player.selection.video.title} /><section className="company-events"><SectionHeading title="Events" /><p className="hub-empty">Company event videos have not been supplied.</p></section></div>
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
            <SampleRanking title="Innovators ranking" scores={demoDirectoryScores} />
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
