"use client";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { VacancyCard } from "@/components/cards/VacancyCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JobAlertStrip } from "@/components/sections/JobAlertStrip";
import { vacancies, type PlacementType } from "@/data/vacancies";

const PAGE_SIZE = 6;

type SortKey = "recent" | "salary-high" | "salary-low";

const placementTypes: { value: PlacementType; label: string }[] = [
  { value: "permanent",  label: "Permanent" },
  { value: "interim",    label: "Interim" },
  { value: "secondment", label: "Secondment" },
];
const sectors = [
  { value: "industrie",  label: "Industry" },
  { value: "bouw",       label: "Construction" },
  { value: "offshore",   label: "Offshore" },
  { value: "energie",    label: "Energy" },
  { value: "scheepsbouw",label: "Shipbuilding" },
];
const locations = [
  { value: "rotterdam",      label: "Rotterdam" },
  { value: "amsterdam",      label: "Amsterdam" },
  { value: "den haag",       label: "Den Haag" },
  { value: "amersfoort",     label: "Amersfoort" },
  { value: "ijmuiden",       label: "IJmuiden" },
];

// Pre-compute counts from full dataset
const typeCount = (type: PlacementType) => vacancies.filter(v => v.type === type).length;
const sectorCount = (s: string) => vacancies.filter(v => v.sector === s).length;
const locationCount = (l: string) => vacancies.filter(v => v.locationKey === l).length;

// Salary parsing — extracts first numeric value from salary string
function parseSalary(s: string): number {
  const m = s.replace(/[€,\s]/g, "").match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function Checkbox({
  id, label, count, checked, onChange,
}: { id: string; label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label htmlFor={id} className="flex items-center justify-between cursor-pointer group py-1">
      <div className="flex items-center gap-2">
        <div className={`w-[16px] h-[16px] border-[1.5px] flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "bg-amber border-amber" : "border-border group-hover:border-[#c9cdd3]"}`}>
          {checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="#0d2b55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        </div>
        <span className={`text-[13px] transition-colors ${checked ? "text-text-primary font-medium" : "text-text-secondary group-hover:text-text-primary"}`}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className={`text-[11px] px-1.5 py-0.5 ${checked ? "bg-amber/15 text-amber-text font-semibold" : "bg-off-white text-text-muted"}`}>
          {count}
        </span>
      )}
    </label>
  );
}

export default function VacanciesPage() {
  const [search,  setSearch]  = useState("");
  const [types,   setTypes]   = useState<PlacementType[]>([]);
  const [sects,   setSects]   = useState<string[]>([]);
  const [locs,    setLocs]    = useState<string[]>([]);
  const [sort,    setSort]    = useState<SortKey>("recent");
  const [shown,   setShown]   = useState(PAGE_SIZE);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [locSearch, setLocSearch] = useState("");
  const [locOpen,   setLocOpen]   = useState(false);

  const toggleType = useCallback((type: PlacementType) => {
    setTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    setShown(PAGE_SIZE);
  }, []);

  const toggle = useCallback(<T extends string>(arr: T[], val: T, set: (v: T[]) => void) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
    setShown(PAGE_SIZE);
  }, []);

  // Detect when hero has scrolled away → compact search bar
  useEffect(() => {
    const sentinel = heroSentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsSearchSticky(!entry.isIntersecting),
      { rootMargin: "0px", threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  const clearAll = () => {
    setTypes([]); setSects([]); setLocs([]); setSearch("");
    setSalaryMin(""); setSalaryMax(""); setLocSearch("");
    setShown(PAGE_SIZE);
  };
  const hasFilters = types.length || sects.length || locs.length || search || salaryMin || salaryMax;

  // ── Filter + sort
  const filtered = useMemo(() => {
    const q    = search.toLowerCase().trim();
    const minN = salaryMin ? parseInt(salaryMin) : 0;
    const maxN = salaryMax ? parseInt(salaryMax) : Infinity;
    let result = vacancies.filter(v => {
      const n = parseSalary(v.salary);
      return (
        (!q      || v.title.toLowerCase().includes(q) || v.sector.toLowerCase().includes(q) || v.location.toLowerCase().includes(q)) &&
        (!types.length  || types.includes(v.type)) &&
        (!sects.length  || sects.includes(v.sector)) &&
        (!locs.length   || locs.includes(v.locationKey)) &&
        n >= minN && n <= maxN
      );
    });
    if (sort === "salary-high") result = [...result].reverse();
    return result;
  }, [search, types, sects, locs, sort, salaryMin, salaryMax]);

  const visible = filtered.slice(0, shown);
  const hasMore = shown < filtered.length;
  const filteredLocations = locations.filter(l =>
    l.label.toLowerCase().includes(locSearch.toLowerCase())
  );

  const sortLabels: Record<SortKey, string> = {
    recent:      "Most recent",
    "salary-high": "Salary: High to Low",
    "salary-low":  "Salary: Low to High",
  };

  return (
    <>
      {/* ── Hero with search ────────────────────────────── */}
      <section className="bg-navy pt-36 pb-10 px-6 md:px-10 lg:px-20" aria-labelledby="vac-heading">
        <div className="max-w-[1280px] mx-auto">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80" aria-current="page">Procurement vacancies</span>
          </nav>
          <Eyebrow label="Open Roles" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-3" id="vac-heading">
            Procurement vacancies
          </h1>
          <p className="text-lg text-white/70">
            Permanent, interim, and secondment roles across industrial, construction, and offshore sectors.
          </p>
          {/* Sentinel — triggers compact mode when scrolled out of view */}
          <div ref={heroSentinelRef} aria-hidden="true" />
        </div>
      </section>

      {/* ── Sticky header: search + filter pills (single container = no gap) ── */}
      <div className="sticky top-[60px] z-30">

        {/* Search bar */}
        <div className={`bg-navy px-6 md:px-10 lg:px-20 border-b border-white/10 transition-all duration-300 ease-out ${isSearchSticky ? "py-1.5" : "py-3"}`}>
          <div className="max-w-[1280px] mx-auto">
            <div className={`flex gap-2 transition-all duration-300 ease-out ${isSearchSticky ? "max-w-[480px]" : ""}`}>
              <input
                type="search"
                value={search}
                onChange={e => { setSearch(e.target.value); setShown(PAGE_SIZE); }}
                placeholder="Search roles, skills, sectors..."
                className={`flex-1 rounded-[2px] border-2 border-transparent bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-all duration-300 ease-out ${
                  isSearchSticky ? "h-[36px] px-4 text-[14px]" : "h-[48px] px-5 text-[15px]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShown(PAGE_SIZE)}
                aria-label="Search"
                className={`bg-amber text-navy font-semibold rounded-[2px] hover:bg-[#e89400] transition-all duration-300 ease-out flex-shrink-0 flex items-center justify-center ${
                  isSearchSticky ? "h-[36px] px-3" : "h-[48px] px-6"
                }`}
              >
                {isSearchSticky ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                ) : (
                  <span className="text-[15px]">Search</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter pills bar — stacks flush below search, no individual sticky needed */}
        <div className="bg-white border-b border-border px-6 md:px-10 lg:px-20">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4 min-h-[48px] py-2">

          {/* Left: All roles + active filter pills */}
          <div className="flex items-center gap-2 flex-wrap overflow-x-auto">
            <span className="text-[13px] font-semibold text-text-secondary whitespace-nowrap flex-shrink-0">
              All roles
              <span className="ml-1.5 text-[11px] px-1.5 py-0.5 bg-off-white text-text-muted">{filtered.length}</span>
            </span>

            {types.map(t => (
              <span key={t} className="inline-flex items-center gap-1 text-[12px] bg-navy text-white px-2.5 py-1 whitespace-nowrap flex-shrink-0">
                {placementTypes.find(p => p.value === t)?.label}
                <button type="button" onClick={() => toggleType(t)} className="hover:text-amber transition-colors leading-none">×</button>
              </span>
            ))}
            {sects.map(s => (
              <span key={s} className="inline-flex items-center gap-1 text-[12px] bg-navy/10 text-navy px-2.5 py-1 whitespace-nowrap flex-shrink-0">
                {sectors.find(x => x.value === s)?.label}
                <button type="button" onClick={() => toggle(sects, s, setSects)} className="hover:text-amber transition-colors leading-none">×</button>
              </span>
            ))}
            {locs.map(l => (
              <span key={l} className="inline-flex items-center gap-1 text-[12px] bg-navy/10 text-navy px-2.5 py-1 whitespace-nowrap flex-shrink-0">
                {locations.find(x => x.value === l)?.label}
                <button type="button" onClick={() => toggle(locs, l, setLocs)} className="hover:text-amber transition-colors leading-none">×</button>
              </span>
            ))}
            {(salaryMin || salaryMax) && (
              <span className="inline-flex items-center gap-1 text-[12px] bg-navy/10 text-navy px-2.5 py-1 whitespace-nowrap flex-shrink-0">
                {salaryMin && salaryMax ? `€${salaryMin}–€${salaryMax}` : salaryMin ? `Min €${salaryMin}` : `Max €${salaryMax}`}
                <button type="button" onClick={() => { setSalaryMin(""); setSalaryMax(""); }} className="hover:text-amber transition-colors leading-none">×</button>
              </span>
            )}
            {hasFilters && (
              <button type="button" onClick={clearAll} className="text-[12px] text-amber-text hover:underline transition-colors whitespace-nowrap flex-shrink-0">
                Clear all
              </button>
            )}
          </div>

          {/* Right: count + sort */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="text-[12px] text-text-muted hidden sm:block">
              <strong className="text-text-primary">{filtered.length}</strong> {filtered.length === 1 ? "vacancy" : "vacancies"}
            </span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 text-[13px] text-text-secondary hover:text-text-primary hover:bg-off-white border border-border px-3 h-[34px] transition-colors"
              >
                Sort: {sortLabels[sort]}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-border z-10 shadow-md w-[180px]">
                  {(Object.entries(sortLabels) as [SortKey, string][]).map(([key, label]) => (
                    <button key={key} type="button" onClick={() => { setSort(key); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-off-white transition-colors ${sort === key ? "text-navy font-semibold" : "text-text-secondary"}`}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
        {/* End pills bar */}

      </div>
      {/* End sticky header wrapper */}

      {/* ── Main body ───────────────────────────────────── */}
      <div className="bg-off-white py-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">

            {/* ── Sidebar — desktop only ───────────────── */}
            <aside aria-label="Deep filter vacancies" className="hidden lg:block self-start sticky top-[180px]">
              <div className="bg-white border border-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-[14px] text-text-primary">Filters</h2>
                  {hasFilters && (
                    <button type="button" onClick={clearAll} className="text-[12px] text-amber-text hover:text-navy transition-colors">
                      Clear all
                    </button>
                  )}
                </div>

                {/* Placement type */}
                <div className="pb-5 mb-5 border-b border-border">
                  <h3 className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted mb-3">Placement type</h3>
                  <div className="flex flex-col gap-1">
                    {placementTypes.map(({ value, label }) => (
                      <Checkbox key={value} id={`type-${value}`} count={typeCount(value)} label={label}
                        checked={types.includes(value)} onChange={() => toggleType(value)} />
                    ))}
                  </div>
                </div>

                {/* Salary min/max */}
                <div className="pb-5 mb-5 border-b border-border">
                  <h3 className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted mb-3">Salary / Day rate</h3>
                  <div className="flex gap-2 items-center">
                    <input type="number" placeholder="Min" value={salaryMin}
                      onChange={e => { setSalaryMin(e.target.value); setShown(PAGE_SIZE); }}
                      className="w-full h-9 px-3 border border-border text-[13px] rounded-[2px] focus:border-navy focus:outline-none" />
                    <span className="text-text-muted text-[12px] flex-shrink-0">–</span>
                    <input type="number" placeholder="Max" value={salaryMax}
                      onChange={e => { setSalaryMax(e.target.value); setShown(PAGE_SIZE); }}
                      className="w-full h-9 px-3 border border-border text-[13px] rounded-[2px] focus:border-navy focus:outline-none" />
                  </div>
                  <p className="text-[11px] text-text-muted mt-1.5">Annual salary or day rate</p>
                </div>

                {/* Sector dropdown */}
                <div className="pb-5 mb-5 border-b border-border">
                  <h3 className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted mb-3">Sector</h3>
                  <select
                    value={sects[0] ?? ""}
                    onChange={e => { setSects(e.target.value ? [e.target.value] : []); setShown(PAGE_SIZE); }}
                    className="w-full h-9 px-3 border border-border text-[13px] rounded-[2px] focus:border-navy focus:outline-none bg-white appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}
                  >
                    <option value="">All sectors</option>
                    {sectors.map(({ value, label }) => (
                      <option key={value} value={value}>{label} ({sectorCount(value)})</option>
                    ))}
                  </select>
                </div>

                {/* Location — searchable combobox */}
                <div>
                  <h3 className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted mb-3">Location</h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search location..."
                      value={locSearch}
                      onFocus={() => setLocOpen(true)}
                      onBlur={() => setTimeout(() => setLocOpen(false), 150)}
                      onChange={e => { setLocSearch(e.target.value); setLocOpen(true); }}
                      className="w-full h-9 px-3 border border-border text-[13px] rounded-[2px] focus:border-navy focus:outline-none"
                    />
                    {locOpen && filteredLocations.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-border shadow-md z-10 max-h-[160px] overflow-y-auto">
                        {filteredLocations.map(({ value, label }) => (
                          <button key={value} type="button"
                            onMouseDown={() => { toggle(locs, value, setLocs); setLocSearch(""); }}
                            className={`w-full text-left px-3 py-2 text-[13px] flex items-center justify-between hover:bg-off-white ${locs.includes(value) ? "text-navy font-medium" : "text-text-secondary"}`}
                          >
                            {label} <span className="text-[11px] text-text-muted">{locationCount(value)}</span>
                            {locs.includes(value) && <span className="text-amber text-[11px] ml-auto">✓</span>}
                          </button>
                        ))}
                      </div>
                    )}
                    {locs.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {locs.map(v => {
                          const l = locations.find(x => x.value === v);
                          return (
                            <span key={v} className="text-[11px] bg-navy/8 text-navy px-2 py-0.5 flex items-center gap-1">
                              {l?.label}
                              <button type="button" onClick={() => toggle(locs, v, setLocs)} className="hover:text-amber-text leading-none">×</button>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Cards + load more ────────────────────── */}
            <div>

              {/* Mobile filter button */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <span className="text-[13px] text-text-muted">{filtered.length} role{filtered.length !== 1 ? "s" : ""}</span>
                <button
                  onClick={() => setFilterDrawerOpen(true)}
                  className="flex items-center gap-2 h-9 px-4 bg-white border border-border text-[13px] font-semibold text-navy hover:border-amber transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                  </svg>
                  Filters
                  {(types.length + sects.length + locs.length) > 0 && (
                    <span className="w-5 h-5 rounded-full bg-amber text-navy text-[11px] font-bold flex items-center justify-center">
                      {types.length + sects.length + locs.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile filter drawer */}
              {filterDrawerOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40 bg-[rgba(7,25,53,0.5)]"
                    onClick={() => setFilterDrawerOpen(false)}
                    aria-hidden="true"
                  />
                  {/* Drawer */}
                  <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[12px] max-h-[80vh] flex flex-col shadow-xl">
                    {/* Drag handle */}
                    <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
                      <div className="w-10 h-1 bg-[#d1d5db] rounded-full" />
                    </div>
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
                      <span className="font-semibold text-[15px] text-navy">Filters</span>
                      {hasFilters && (
                        <button onClick={clearAll} className="text-[12px] text-amber-text hover:text-navy transition-colors">Clear all</button>
                      )}
                    </div>
                    {/* Scrollable content */}
                    <div className="overflow-y-auto px-6 py-5 flex flex-col gap-6">
                      <div>
                        <h3 className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted mb-3">Placement type</h3>
                        <div className="flex flex-col gap-2">
                          {placementTypes.map(({ value, label }) => (
                            <Checkbox key={value} id={`m-type-${value}`} label={label} checked={types.includes(value)} onChange={() => toggleType(value)} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted mb-3">Sector</h3>
                        <div className="flex flex-col gap-2">
                          {sectors.map(({ value, label }) => (
                            <Checkbox key={value} id={`m-sec-${value}`} label={label} checked={sects.includes(value)} onChange={() => toggle(sects, value, setSects)} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted mb-3">Location</h3>
                        <div className="flex flex-col gap-2">
                          {locations.map(({ value, label }) => (
                            <Checkbox key={value} id={`m-loc-${value}`} label={label} checked={locs.includes(value)} onChange={() => toggle(locs, value, setLocs)} />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Apply button */}
                    <div className="px-6 py-4 border-t border-border flex-shrink-0">
                      <button
                        onClick={() => setFilterDrawerOpen(false)}
                        className="w-full h-11 bg-amber text-navy font-semibold text-[14px] rounded-[2px] hover:bg-[#e89400] transition-colors"
                      >
                        Show {filtered.length} role{filtered.length !== 1 ? "s" : ""}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {visible.length > 0 ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {visible.map(v => <VacancyCard key={v.slug} vacancy={v} />)}
                  </div>

                  {/* Load more */}
                  {hasMore && (
                    <div className="flex flex-col items-center gap-2 mt-10">
                      <button
                        type="button"
                        onClick={() => setShown(s => s + PAGE_SIZE)}
                        className="h-12 px-8 border-2 border-navy text-navy font-semibold text-[14px] rounded-[2px] hover:bg-navy hover:text-white transition-all duration-[200ms]"
                      >
                        Load more vacancies
                      </button>
                      <span className="text-[12px] text-text-muted">
                        Showing {visible.length} of {filtered.length}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                /* Empty state */
                <div className="text-center py-16 px-6 bg-white border border-border">
                  <h2 className="font-semibold text-xl text-text-primary mb-3">No matches right now</h2>
                  <p className="text-base text-text-secondary max-w-md mx-auto mb-6">
                    We add new roles daily. Register your profile and we'll reach out when something fits.
                  </p>
                  <Link
                    href="/open-application"
                    className="inline-flex h-11 px-6 bg-amber text-navy font-semibold text-[14px] rounded-[2px] items-center hover:bg-[#e89400] transition-colors"
                  >
                    Register your profile →
                  </Link>
                </div>
              )}

              {/* ── Open Application CTA ─────────────────── */}
              <div className="mt-12 bg-navy p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber mb-2">Not seeing the right role?</p>
                  <h2 className="font-bold text-[22px] text-white mb-1">Open Application</h2>
                  <p className="text-[14px] text-white/65 max-w-[440px]">
                    Register your profile and we'll represent you proactively — to clients before a vacancy even goes live.
                  </p>
                </div>
                <Link
                  href="/open-application"
                  className="flex-shrink-0 inline-flex h-12 px-7 bg-amber text-navy font-semibold text-[14px] rounded-[2px] items-center hover:bg-[#e89400] transition-colors whitespace-nowrap"
                >
                  Register your profile →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter ──────────────────────────────────── */}
      <JobAlertStrip />
    </>
  );
}
