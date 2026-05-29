"use client";
import { useState, useMemo } from "react";
import { VacancyCard } from "@/components/cards/VacancyCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { vacancies, type PlacementType, type Sector, type Location } from "@/data/vacancies";

const placementTypes: { value: PlacementType; label: string }[] = [
  { value: "permanent", label: "Permanent" },
  { value: "interim", label: "Interim" },
  { value: "secondment", label: "Secondment" },
];
const sectors = [
  { value: "industrie", label: "Industry" },
  { value: "bouw", label: "Construction" },
  { value: "offshore", label: "Offshore" },
  { value: "energie", label: "Energy" },
  { value: "scheepsbouw", label: "Shipbuilding" },
];
const locations = [
  { value: "rotterdam", label: "Rotterdam" },
  { value: "amsterdam", label: "Amsterdam" },
  { value: "den haag", label: "Den Haag" },
  { value: "amersfoort", label: "Amersfoort" },
  { value: "ijmuiden", label: "IJmuiden" },
];

function Checkbox({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer group">
      <div className={`w-4.5 h-4.5 rounded border-[1.5px] flex items-center justify-center flex-shrink-0 transition-colors ${checked ? "bg-amber border-amber" : "border-border"}`}>
        {checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#0d2b55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
      </div>
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
    </label>
  );
}

export default function VacanciesPage() {
  const [types, setTypes] = useState<PlacementType[]>([]);
  const [sects, setSects] = useState<string[]>([]);
  const [locs, setLocs] = useState<string[]>([]);

  const toggle = <T extends string>(arr: T[], val: T, set: (v: T[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const filtered = useMemo(() => vacancies.filter((v) =>
    (!types.length || types.includes(v.type)) &&
    (!sects.length || sects.includes(v.sector)) &&
    (!locs.length  || locs.includes(v.locationKey))
  ), [types, sects, locs]);

  const clearAll = () => { setTypes([]); setSects([]); setLocs([]); };
  const hasFilters = types.length || sects.length || locs.length;

  return (
    <>
      <section className="bg-navy pt-36 pb-16" aria-labelledby="vac-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <Eyebrow label="Open Roles" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-3" id="vac-heading">Procurement vacancies</h1>
          <p className="text-lg text-white/70">Permanent, interim, and secondment roles across industrial, construction, and offshore sectors.</p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-12">
        <div className="grid lg:grid-cols-[280px_1fr] gap-12 items-start">

          {/* Filters */}
          <aside aria-label="Filter vacancies">
            <div className="bg-white border border-border rounded-none p-8 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg text-text-primary">Filters</h2>
                {hasFilters ? (
                  <button onClick={clearAll} className="text-sm text-amber-text underline underline-offset-2">Clear all</button>
                ) : null}
              </div>

              <div className="space-y-6">
                {[
                  { title: "Placement type", items: placementTypes, arr: types, set: (v: PlacementType) => toggle(types, v, setTypes) },
                ].map(({ title, items, arr, set }) => (
                  <div key={title} className="pb-6 border-b border-border">
                    <h3 className="text-sm font-semibold text-text-secondary mb-3">{title}</h3>
                    <div className="flex flex-col gap-2">
                      {items.map((item) => (
                        <Checkbox key={item.value} id={`type-${item.value}`} label={item.label}
                          checked={arr.includes(item.value as PlacementType)}
                          onChange={() => set(item.value as PlacementType)} />
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pb-6 border-b border-border">
                  <h3 className="text-sm font-semibold text-text-secondary mb-3">Sector</h3>
                  <div className="flex flex-col gap-2">
                    {sectors.map((s) => (
                      <Checkbox key={s.value} id={`sec-${s.value}`} label={s.label}
                        checked={sects.includes(s.value)}
                        onChange={() => toggle(sects, s.value, setSects)} />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-text-secondary mb-3">Location</h3>
                  <div className="flex flex-col gap-2">
                    {locations.map((l) => (
                      <Checkbox key={l.value} id={`loc-${l.value}`} label={l.label}
                        checked={locs.includes(l.value)}
                        onChange={() => toggle(locs, l.value, setLocs)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            <p className="text-base text-text-secondary mb-6">
              <strong className="text-text-primary">{filtered.length}</strong> {filtered.length === 1 ? "vacancy" : "vacancies"} found
            </p>

            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {filtered.map((v) => <VacancyCard key={v.slug} vacancy={v} />)}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-off-white rounded-none border border-border">
                <h2 className="font-semibold text-xl text-text-primary mb-3">No matches right now</h2>
                <p className="text-base text-text-secondary max-w-md mx-auto mb-6">We have new roles daily. Register your profile and we'll reach out when something fits.</p>
                <LinkButton href="/open-application" variant="primary">Register your profile →</LinkButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
