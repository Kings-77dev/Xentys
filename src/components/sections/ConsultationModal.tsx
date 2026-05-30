"use client";
import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import Link from "next/link";

type PlacementType = "permanent" | "interim" | "secondment" | null;
type CallTime = "morning" | "afternoon" | "either";
type ContactPref = "phone" | "email";
type FormState = "form" | "confirm";

const tiles = [
  { id: "permanent"  as const, label: "Permanent hire",  tagLabel: "Permanent",  tagClass: "bg-[#f0fdf4] text-[#166534]" },
  { id: "interim"    as const, label: "Interim cover",   tagLabel: "Interim",    tagClass: "bg-[#fffbeb] text-[#92400e]" },
  { id: "secondment" as const, label: "Secondment",      tagLabel: "Secondment", tagClass: "bg-[#eff6ff] text-[#1e40af]" },
];

const typeLabels: Record<string, string> = {
  permanent:  "a permanent hire",
  interim:    "interim cover",
  secondment: "a secondment",
};

function TileRadio({ active }: { active: boolean }) {
  return (
    <span
      className="flex-shrink-0 flex items-center justify-center"
      style={{
        width: 20, height: 20, borderRadius: "50%",
        background: active ? "#ffa300" : "#fff",
        border: active ? "none" : "2px solid #c7cace",
        transition: "all 0.15s ease",
      }}
      aria-hidden="true"
    >
      {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "block" }} />}
    </span>
  );
}

function SegBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <label
      className="inline-flex items-center gap-2 cursor-pointer select-none"
      style={{
        padding: "9px 14px",
        border: active ? "1.5px solid #ffa300" : "1.5px solid #d5d8dd",
        borderRadius: 2,
        fontSize: 13.5,
        color: active ? "#0f172a" : "#4d5057",
        boxShadow: active ? "0 0 0 2px rgba(255,163,0,0.14)" : "none",
        background: "#fff",
        transition: "all 0.15s ease",
      }}
    >
      <input
        type="radio"
        className="sr-only"
        checked={active}
        onChange={onClick}
        onClick={onClick}
      />
      <TileRadio active={active} />
      {label}
    </label>
  );
}

interface Props { open: boolean; onClose: () => void; }

export function ConsultationModal({ open, onClose }: Props) {
  const [state, setState]         = useState<FormState>("form");
  const [placement, setPlacement] = useState<PlacementType>(null);
  const [tileShake, setTileShake] = useState(false);
  const [callTime, setCallTime]   = useState<CallTime>("either");
  const [contact, setContact]     = useState<ContactPref>("email");
  const [errors, setErrors]       = useState<Record<string, boolean>>({});
  const [successData, setSuccessData] = useState({ firstName: "", roleText: "", typeLabel: "" });
  const tilesRef = useRef<HTMLDivElement>(null);

  const requiredIds = ["name", "company", "email", "phone"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};

    // Validate fields
    requiredIds.forEach((id) => {
      const el = form.elements.namedItem(id) as HTMLInputElement | null;
      if (!el?.value.trim()) newErrors[id] = true;
    });

    // Validate tile selection
    if (!placement) {
      setTileShake(true);
      setTimeout(() => setTileShake(false), 320);
      if (!Object.keys(newErrors).length) {
        tilesRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      newErrors.__tile = true;
    }

    // Validate consent
    const consent = form.elements.namedItem("consent") as HTMLInputElement | null;
    if (!consent?.checked) newErrors.consent = true;

    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    // Personalise success
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const role = (form.elements.namedItem("role") as HTMLInputElement)?.value.trim() ?? "";
    setSuccessData({
      firstName: name.split(/\s+/)[0],
      roleText: role,
      typeLabel: placement ? typeLabels[placement] : "your hire",
    });
    setState("confirm");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setState("form"); setErrors({}); setPlacement(null); }, 300);
  };

  const inputCls = (id: string) =>
    `w-full text-[14px] text-text-primary placeholder:text-[#9a9da3] transition-all duration-150 ${
      errors[id]
        ? "border-[#b42318] focus:border-[#b42318] focus:shadow-[0_0_0_3px_rgba(180,35,24,0.10)]"
        : "border-[#d5d8dd] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)]"
    }`;

  const { firstName, roleText, typeLabel } = successData;

  return (
    <Modal open={open} onClose={handleClose} title="Request a Consultation" className="p-0 max-w-[700px]">
      <div className="flex flex-col max-h-[92vh] overflow-hidden">

        {/* ── Top bar ───────────────────────────────────── */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{ padding: "13px 22px", background: "#f8f8f7", borderBottom: "1px solid #e0e2e5" }}
        >
          <span className="flex items-center gap-2 text-[13px] font-semibold text-navy">
            <span
              className="flex-shrink-0"
              style={{ width: 9, height: 9, borderRadius: "50%", background: "#11723a", boxShadow: "0 0 0 3px rgba(17,114,58,0.16)", display: "block" }}
              aria-hidden="true"
            />
            Response within 1 working day
          </span>
        </div>

        {/* ── Scrollable body ───────────────────────────── */}
        <div className="overflow-y-auto flex-1" style={{ padding: "24px 28px 8px" }}>

          {state === "form" ? (
            <>
              {/* Header */}
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0d2b55", letterSpacing: "-0.015em", marginBottom: 6 }}>
                Request a Consultation
              </h2>
              <p style={{ fontSize: 14, color: "#4d5057", marginBottom: 20 }}>
                Tell us a little — a sector recruiter calls within 1 working day. Takes ~60 seconds.
              </p>

              {/* Placement tiles */}
              <div
                ref={tilesRef}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: 12,
                  marginBottom: 22,
                  animation: tileShake ? "tile-shake 0.22s ease" : "none",
                }}
              >
                {tiles.map((t) => {
                  const active = placement === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { setPlacement(t.id); setErrors((e) => { const n = { ...e }; delete n.__tile; return n; }); }}
                      className="text-left cursor-pointer bg-white flex flex-col"
                      style={{
                        padding: "12px 12px 14px",
                        border: active ? "1.5px solid #ffa300" : "1.5px solid #e0e2e5",
                        borderRadius: 0,
                        boxShadow: active ? "0 0 0 3px rgba(255,163,0,0.14)" : "none",
                        gap: 10,
                        transition: "all 0.15s ease",
                      }}
                      aria-pressed={active}
                    >
                      <span className="flex items-center justify-between w-full">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 ${t.tagClass}`} style={{ borderRadius: 999 }}>
                          {t.tagLabel}
                        </span>
                        <TileRadio active={active} />
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#0d2b55", letterSpacing: "-0.01em" }}>
                        {t.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.__tile && <p style={{ fontSize: 12, color: "#b42318", marginTop: -14, marginBottom: 14 }}>Please select a placement type.</p>}

              {/* Form */}
              <form id="consult-form" onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                  {[
                    { id: "name",     label: "Full name",             ph: "Your full name",   req: true,  type: "text"  },
                    { id: "company",  label: "Company",               ph: "Your organisation",req: true,  type: "text"  },
                    { id: "email",    label: "Work email",            ph: "your@company.com", req: true,  type: "email" },
                    { id: "phone",    label: "Phone",                 ph: "+31 …",            req: true,  type: "tel"   },
                    { id: "role",     label: "Role you're hiring for", ph: "e.g. Strategic Buyer", req: false, type: "text" },
                    { id: "jobtitle", label: "Your job title",        ph: "e.g. CPO, HR Manager", req: false, type: "text" },
                  ].map(({ id, label, ph, req, type }) => (
                    <div key={id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label htmlFor={id} style={{ fontSize: 12.5, fontWeight: 600, color: "#0d2b55" }}>
                        {label}{req && <span style={{ color: "#663d00" }}> *</span>}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        placeholder={ph}
                        className={inputCls(id)}
                        style={{ padding: "11px 13px", border: `1.5px solid ${errors[id] ? "#b42318" : "#d5d8dd"}`, borderRadius: 2, outline: "none", background: "#fff" }}
                        onChange={() => setErrors((er) => { const n = { ...er }; delete n[id]; return n; })}
                      />
                      {errors[id] && <span style={{ fontSize: 12, color: "#b42318", fontWeight: 500 }}>Required</span>}
                    </div>
                  ))}

                  {/* Best time */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0d2b55" }}>Best time to call</span>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(["morning", "afternoon", "either"] as CallTime[]).map((v) => (
                        <SegBtn key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} active={callTime === v} onClick={() => setCallTime(v)} />
                      ))}
                    </div>
                  </div>

                  {/* Preferred contact */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#0d2b55" }}>Preferred contact</span>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {(["phone", "email"] as ContactPref[]).map((v) => (
                        <SegBtn key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} active={contact === v} onClick={() => setContact(v)} />
                      ))}
                    </div>
                  </div>

                  {/* Textarea — full width */}
                  <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor="note" style={{ fontSize: 12.5, fontWeight: 600, color: "#0d2b55" }}>
                      Anything else? <span style={{ fontWeight: 400, color: "#6b6f75" }}>(optional)</span>
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      rows={3}
                      placeholder="One-line context — urgency, must-have, blocker…"
                      style={{ padding: "11px 13px", border: "1.5px solid #d5d8dd", borderRadius: 2, outline: "none", resize: "none", fontSize: 14, color: "#333c3c", fontFamily: "inherit", background: "#fff" }}
                    />
                  </div>
                </div>

                {/* Consent */}
                <div
                  style={{
                    marginTop: 20,
                    background: errors.consent ? "#fdf3f2" : "#f8f8f7",
                    border: `1px solid ${errors.consent ? "#b42318" : "#e0e2e5"}`,
                    borderRadius: 0,
                    padding: "16px 18px",
                  }}
                >
                  <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      name="consent"
                      style={{ marginTop: 2, width: 16, height: 16, accentColor: "#ffa300", flexShrink: 0 }}
                      onChange={() => setErrors((e) => { const n = { ...e }; delete n.consent; return n; })}
                    />
                    <span style={{ fontSize: 13, color: "#4d5057", lineHeight: 1.5 }}>
                      My details will be shared{" "}
                      <strong style={{ color: "#0d2b55", fontWeight: 600 }}>only with the relevant Xentys recruiter</strong>
                      {" "}and treated with discretion.{" "}
                      <a href="#" style={{ color: "#0d2b55", fontWeight: 600, borderBottom: "1px dotted #0d2b55" }}>Privacy statement →</a>
                    </span>
                  </label>
                  {errors.consent && <p style={{ fontSize: 12, color: "#b42318", marginTop: 8, fontWeight: 500 }}>Please accept before submitting.</p>}
                </div>

                {/* "Full brief" link */}
                <p style={{ textAlign: "center", fontSize: 13, color: "#4d5057", padding: "20px 0 4px", marginTop: 18, borderTop: "1px solid #e0e2e5" }}>
                  Want to provide more detail?{" "}
                  <Link href="/consultation" onClick={handleClose} style={{ color: "#0d2b55", fontWeight: 600, borderBottom: "1px dotted #0d2b55" }}>
                    Open the full brief form →
                  </Link>
                </p>
              </form>
            </>
          ) : (
            /* ── Success ─────────────────────────────────── */
            <div style={{ textAlign: "center", padding: "14px 12px 16px" }}>
              {/* Green check */}
              <div
                style={{ width: 64, height: 64, borderRadius: "50%", background: "#e0f5e7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: "#11723a" }}
              >
                <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
                  <path d="M13 24l7 7 15-15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0d2b55", letterSpacing: "-0.015em", marginBottom: 10 }}>
                {firstName ? `Thanks, ${firstName} — we've got your brief.` : "Thanks — we've got your brief."}
              </h2>
              <p style={{ fontSize: 14.5, color: "#4d5057", lineHeight: 1.55, maxWidth: 440, margin: "0 auto 22px" }}>
                Your consultation request{roleText ? <> for <strong style={{ color: "#0d2b55" }}>{roleText}</strong></> : ` for ${typeLabel}`} has reached <strong style={{ color: "#0d2b55" }}>Adriaan Brok</strong>. He'll call you within 1 working day.
              </p>

              {/* Recruiter card */}
              <div style={{ textAlign: "left", border: "1px solid #e0e2e5", borderTop: "3px solid #ffa300", borderRadius: 0, padding: "18px 20px", maxWidth: 460, margin: "0 auto 18px", background: "#fff" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: "#f0f1f3", color: "#0d2b55", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, letterSpacing: "0.02em" }}>
                    AB
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0d2b55" }}>Adriaan Brok</div>
                    <div style={{ fontSize: 12.5, color: "#6b6f75", marginBottom: 6 }}>Senior Procurement Recruiter · Industry &amp; Construction</div>
                    <p style={{ fontSize: 13.5, color: "#4d5057", lineHeight: 1.5 }}>"I'll review your brief personally and call you within 1 working day."</p>
                  </div>
                </div>
                {/* Rating */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 14, padding: "8px 12px", background: "#e0f5e7", borderRadius: 0, fontSize: 12.5, color: "#11723a", fontWeight: 600 }}>
                  <span>⏱ Within 1 working day</span>
                  <span style={{ width: 1, height: 14, background: "rgba(17,114,58,0.25)" }} />
                  <span>4.9 <span style={{ color: "#ffa300", letterSpacing: 1 }}>★★★★★</span></span>
                  <span style={{ color: "#4d5057", fontWeight: 500 }}>47 reviews</span>
                </div>
                {/* Privacy */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, padding: "8px 12px", background: "#f8f8f7", borderRadius: 0, fontSize: 12.5, color: "#4d5057" }}>
                  🔒 Your details stay with Adriaan — shared with no one else.
                </div>
              </div>

              {/* What's next */}
              <div style={{ display: "flex", maxWidth: 460, margin: "0 auto 22px", border: "1px solid #e0e2e5", overflow: "hidden" }}>
                {[
                  { day: "Day 1",   text: "Adriaan calls at your preferred time." },
                  { day: "~Day 2",  text: "30-min call to confirm the brief." },
                  { day: "~Day 10", text: "Shortlist of 3–5 screened candidates." },
                ].map((s, i) => (
                  <div key={s.day} style={{ flex: 1, padding: "12px 14px", borderLeft: i > 0 ? "1px solid #e0e2e5" : "none" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#663d00" }}>{s.day}</div>
                    <div style={{ fontSize: 12, color: "#4d5057", lineHeight: 1.4, marginTop: 4 }}>{s.text}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{ height: 44, padding: "0 22px", background: "#0d2b55", color: "#fff", fontWeight: 600, fontSize: 14, border: "none", borderRadius: 2, cursor: "pointer" }}
                >
                  Close
                </button>
                <Link
                  href="/consultation"
                  onClick={handleClose}
                  style={{ height: 44, padding: "0 22px", background: "#fff", color: "#0d2b55", fontWeight: 600, fontSize: 14, border: "1.5px solid #c7cace", borderRadius: 2, display: "inline-flex", alignItems: "center" }}
                >
                  Read how we work →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer (form only) ─────────────────────────── */}
        {state === "form" && (
          <footer
            className="flex-shrink-0"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "16px 28px", borderTop: "1px solid #e0e2e5", background: "#fff" }}
          >
            <div style={{ fontSize: 13, color: "#4d5057" }}>
              Prefer to call?{" "}
              <a href="tel:+31702400414" style={{ color: "#0d2b55", fontWeight: 600, borderBottom: "1px dotted #0d2b55" }}>
                Dial <strong>070 240 04 14</strong>
              </a>
            </div>
            <button
              type="submit"
              form="consult-form"
              style={{ background: "#ffa300", color: "#0d2b55", fontWeight: 600, fontSize: 14, padding: "12px 22px", border: "none", borderRadius: 2, cursor: "pointer", transition: "background 0.15s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e89400"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#ffa300"; }}
            >
              Submit →
            </button>
          </footer>
        )}
      </div>

      {/* Shake keyframe */}
      <style>{`
        @keyframes tile-shake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-4px); }
          40%  { transform: translateX(4px); }
          60%  { transform: translateX(-3px); }
          80%  { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </Modal>
  );
}
