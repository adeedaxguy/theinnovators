import type { DirectoryCompany } from "./experience-data";

export function companySlug(company: Pick<DirectoryCompany, "name">) {
  return company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function filterCompanies(source: DirectoryCompany[], filters: { country: string; industry: string; query: string; sort: string }) {
  const query = filters.query.trim().toLowerCase();
  const filtered = source.filter((company) =>
    (!filters.country || company.country === filters.country) &&
    (!filters.industry || company.industry === filters.industry) &&
    (!query || `${company.name} ${company.industry} ${company.country}`.toLowerCase().includes(query)),
  );
  if (filters.sort !== "original") filtered.sort((a, b) => a.name.localeCompare(b.name) * (filters.sort === "desc" ? -1 : 1));
  return filtered;
}

export function readSavedIds(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? [...new Set(parsed.filter((item): item is string => typeof item === "string"))] : [];
  } catch { return []; }
}

export function parseVideoUrl(value: string): { youtubeId?: string; videoUrl?: string } | null {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") return null;
    if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"].includes(url.hostname)) {
      const id = url.hostname === "youtu.be" ? url.pathname.slice(1) : url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/") ? url.pathname.split("/")[2] : url.searchParams.get("v");
      return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? { youtubeId: id } : null;
    }
    return url.pathname.toLowerCase().endsWith(".mp4") ? { videoUrl: url.href } : null;
  } catch { return null; }
}
