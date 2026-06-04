"use client";
import { useState, useRef } from "react";
import { Modal } from "@/components/ui/Modal";
import Link from "next/link";

type ApplicationType = "specific" | "open" | null;
type FormState = "form" | "confirm";

const tiles = [
  { id: "specific" as const, label: "I have a specific role in mind", tagLabel: "Specific role",    tagClass: "bg-[#e0f5e5] text-[#125e2e]" },
  { id: "open"     as const, label: "I'm open to opportunities",       tagLabel: "Open application", tagClass: "bg-[#e0ebff] text-[#0a2e7a]" },
];

function TileRadio({ active }: { active: boolean }) {
  return (
    <span
      style={{
        width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
        background: active ? "#ffa300" : "#fff",
        border: active ? "none" : "1.5px solid #e0e2e5",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s ease",
      }}
      aria-hidden="true"
    >
      {active && <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", display: "block" }} />}
    </span>
  );
}

interface Props { open: boolean; onClose: () => void; }

export function CandidateModal({ open, onClose }: Props) {
  const [state, setState]       = useState<FormState>("form");
  const [appType, setAppType]   = useState<ApplicationType>("specific");
  const [tileShake, setTileShake] = useState(false);
  const [errors, setErrors]     = useState<Record<string, boolean>>({});
  const [fileName, setFileName] = useState<string>("No file chosen");
  const [successName, setSuccessName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  const requiredIds = ["name", "email", "phone"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : "No file chosen");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};

    requiredIds.forEach((id) => {
      const el = form.elements.namedItem(id) as HTMLInputElement | null;
      if (!el?.value.trim()) newErrors[id] = true;
    });

    if (!appType) {
      setTileShake(true);
      setTimeout(() => setTileShake(false), 320);
      newErrors.__tile = true;
    }

    const consent = form.elements.namedItem("consent") as HTMLInputElement | null;
    if (!consent?.checked) newErrors.consent = true;

    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    setSuccessName(name.split(/\s+/)[0]);
    setState("confirm");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setState("form"); setErrors({}); setAppType("specific"); setFileName("No file chosen"); }, 300);
  };

  const inputStyle = (id: string): React.CSSProperties => ({
    height: 44, width: "100%", padding: "11px 13px",
    border: `1px solid ${errors[id] ? "#b42318" : "#e0e2e5"}`,
    borderRadius: 0, outline: "none", fontSize: 14,
    color: "#333c3c", background: "#fff", fontFamily: "inherit",
    boxSizing: "border-box" as const,
    transition: "border-color 0.15s ease",
  });

  return (
    <Modal open={open} onClose={handleClose} title="Apply to xentys" className="p-0 overflow-hidden" hideCloseButton>
      <div className="flex flex-col overflow-hidden" style={{ maxHeight: "92vh" }}>

        {/* ── Top bar ───────────────────────────────────── */}
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{ padding: "13px 22px", background: "#fefdfa", borderBottom: "1px solid #f0f1f3" }}
        >
          <div className="flex items-center" style={{ gap: 16, fontSize: 14 }}>
            <span
              style={{ width: 12, height: 12, borderRadius: "50%", background: "#11723a", boxShadow: "0 0 0 3px rgba(17,114,58,0.16)", display: "block", flexShrink: 0 }}
              aria-hidden="true"
            />
            <span style={{ fontWeight: 600, color: "#33363c" }}>We respond within 1 working day,</span>
            <span style={{ color: "#4d5056" }}>we represent you, not just your CV.</span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            style={{ width: 32, height: 32, border: 0, background: "transparent", borderRadius: 0, color: "#6b6f75", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.15s ease, color 0.15s ease" }}
            onMouseEnter={(e) => { const t = e.currentTarget as HTMLElement; t.style.background = "#f0f1f3"; t.style.color = "#0d2b55"; }}
            onMouseLeave={(e) => { const t = e.currentTarget as HTMLElement; t.style.background = "transparent"; t.style.color = "#6b6f75"; }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ───────────────────────────── */}
        <div className="overflow-y-auto flex-1" style={{ padding: "24px 32px 8px" }}>

          {state === "form" ? (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "#0d2b55", marginBottom: 8 }}>
                Apply to xentys
              </h2>
              <p style={{ fontSize: 14, color: "#4d5056", marginBottom: 20 }}>
                Tell us a little, a sector recruiter calls within 1 working day. CV optional but recommended.
              </p>

              {/* Placement tiles */}
              <div
                ref={tilesRef}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  marginBottom: 22,
                  animation: tileShake ? "tile-shake 0.22s ease" : "none",
                }}
              >
                {tiles.map((t) => {
                  const active = appType === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => { setAppType(t.id); setErrors((e) => { const n = { ...e }; delete n.__tile; return n; }); }}
                      style={{
                        flex: 1, height: 80, padding: "10px 10px 14px",
                        border: active ? "2px solid #ffa300" : "1px solid #e0e2e5",
                        borderRadius: 0,
                        boxShadow: active ? "0 0 0 3px rgba(255,163,0,0.14)" : "none",
                        background: "#fff", cursor: "pointer", position: "relative",
                        textAlign: "left", display: "flex", flexDirection: "column", gap: 10,
                        transition: "all 0.15s ease",
                      }}
                      aria-pressed={active}
                    >
                      <span className="flex items-center justify-between w-full">
                        <span className={`text-[11px] font-medium px-2 py-0.5 ${t.tagClass}`} style={{ borderRadius: 0 }}>
                          {t.tagLabel}
                        </span>
                        <TileRadio active={active} />
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#0d2b55" }}>
                        {t.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.__tile && <p style={{ fontSize: 12, color: "#b42318", marginTop: -14, marginBottom: 14 }}>Please select an application type.</p>}

              <form id="candidate-form" onSubmit={handleSubmit} noValidate>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                  {/* Row 1: name + email */}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    {[
                      { id: "name",  label: "Full name",  ph: "Your full name",   req: true,  type: "text" },
                      { id: "email", label: "Email",      ph: "your@email.com",   req: true,  type: "email" },
                    ].map(({ id, label, ph, req, type }) => (
                      <div key={id} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: "#4d5056" }}>
                          {label}{req && <span style={{ color: "#663d00" }}> *</span>}
                        </label>
                        <input id={id} name={id} type={type} placeholder={ph}
                          style={inputStyle(id)}
                          onChange={() => setErrors((er) => { const n = { ...er }; delete n[id]; return n; })}
                        />
                        {errors[id] && <span style={{ fontSize: 12, color: "#b42318", fontWeight: 500 }}>Required</span>}
                      </div>
                    ))}
                  </div>

                  {/* Row 2: phone + job title */}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    {[
                      { id: "phone",    label: "Phone",           ph: "+31 ...", req: true,  type: "tel"  },
                      { id: "jobtitle", label: "Current job title", ph: "e.g. Senior Buyer", req: false, type: "text" },
                    ].map(({ id, label, ph, req, type }) => (
                      <div key={id} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: "#4d5056" }}>
                          {label}{req && <span style={{ color: "#663d00" }}> *</span>}
                        </label>
                        <input id={id} name={id} type={type} placeholder={ph}
                          style={inputStyle(id)}
                          onChange={() => setErrors((er) => { const n = { ...er }; delete n[id]; return n; })}
                        />
                        {errors[id] && <span style={{ fontSize: 12, color: "#b42318", fontWeight: 500 }}>Required</span>}
                      </div>
                    ))}
                  </div>

                  {/* Row 3: seniority + sector */}
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: "#4d5056" }}>Seniority level</label>
                      <select name="seniority" style={{ ...inputStyle("seniority"), fontSize: 12, cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6f75' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                        <option value="">Tactical / Strategic / Management / Senior</option>
                        <option>Tactical</option>
                        <option>Strategic</option>
                        <option>Management</option>
                        <option>Senior</option>
                      </select>
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                      <label style={{ fontSize: 11, fontWeight: 600, color: "#4d5056" }}>Preferred sector</label>
                      <select name="sector" style={{ ...inputStyle("sector"), cursor: "pointer", appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6f75' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
                        <option value="">No preference</option>
                        <option>Industry</option>
                        <option>Construction</option>
                        <option>Offshore</option>
                        <option>Energy</option>
                        <option>Maritime</option>
                      </select>
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#4d5056" }}>Upload your CV</span>
                      <span style={{ fontSize: 11, color: "#6b6f75" }}>(optional but recommended)</span>
                    </div>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      style={{ height: 44, border: "1px dashed #e0e2e5", borderRadius: 0, display: "flex", alignItems: "center", padding: "0 13px", cursor: "pointer", background: "#fff" }}
                    >
                      <input ref={fileInputRef} type="file" name="cv" accept=".pdf,.doc,.docx" className="sr-only" onChange={handleFileChange} />
                      <span style={{ fontSize: 13, color: "#c7cace" }}>
                        📎  Choose file  ·  {fileName}  ·  PDF / DOCX, max 10 MB
                      </span>
                    </div>
                  </div>

                  {/* Textarea */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#4d5056" }}>Anything else?</span>
                      <span style={{ fontSize: 11, color: "#6b6f75" }}>(optional)</span>
                    </div>
                    <textarea
                      name="note"
                      style={{ height: 52, padding: "11px 13px", border: "1px solid #e0e2e5", borderRadius: 0, resize: "none", fontSize: 14, color: "#333c3c", fontFamily: "inherit", background: "#fff", outline: "none", width: "100%", boxSizing: "border-box" }}
                      placeholder="One-line context — what you're looking for, timing, dealbreakers..."
                    />
                  </div>

                  {/* Consent */}
                  <div style={{ background: "#f0f1f3", borderRadius: 0, padding: "8px 14px" }}>
                    <label style={{ display: "flex", gap: 20, alignItems: "flex-start", cursor: "pointer" }}>
                      <input type="checkbox" name="consent"
                        style={{ marginTop: 2, width: 18, height: 18, accentColor: "#ffa300", flexShrink: 0 }}
                        onChange={() => setErrors((e) => { const n = { ...e }; delete n.consent; return n; })}
                      />
                      <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ color: "#4d5056" }}>My CV and details will be reviewed in confidence by a xentys recruiter and </span>
                        <strong style={{ color: "#33363c", fontWeight: 600 }}>not shared with any employer without my explicit consent.</strong>
                        <a href="#" style={{ color: "#0d2b55", fontWeight: 600 }}>Privacy statement →</a>
                      </div>
                    </label>
                    {errors.consent && <p style={{ fontSize: 12, color: "#b42318", marginTop: 8, fontWeight: 500 }}>Please accept before submitting.</p>}
                  </div>

                  {/* Full form link */}
                  <p style={{ fontSize: 13, color: "#4d5056", display: "flex", alignItems: "center", gap: 12 }}>
                    Want to provide more detail?
                    <Link href="/open-application" onClick={handleClose} style={{ color: "#0d2b55", fontWeight: 600 }}>
                      Open the full application form →
                    </Link>
                  </p>
                </div>
              </form>
            </>
          ) : (
            /* ── Success ─────────────────────────────────── */
            <div style={{ textAlign: "center", padding: "14px 12px 16px" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#e0f5e7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: "#11723a" }}>
                <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
                  <path d="M13 24l7 7 15-15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0d2b55", letterSpacing: "-0.015em", marginBottom: 10 }}>
                {successName ? `Thanks, ${successName} — we've got your profile.` : "Thanks — we've got your profile."}
              </h2>
              <p style={{ fontSize: 14.5, color: "#4d5057", lineHeight: 1.55, maxWidth: 440, margin: "0 auto 22px" }}>
                Your application has reached <strong style={{ color: "#0d2b55" }}>Adriaan Brok</strong>. He'll review your profile and call within 1 working day.
              </p>

              {/* Recruiter card */}
              <div style={{ textAlign: "left", border: "1px solid #e0e2e5", borderTop: "3px solid #ffa300", borderRadius: 0, padding: "18px 20px", maxWidth: 460, margin: "0 auto 18px", background: "#fff" }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <img src="/images/AdriaanVierkant.avif" alt="Adriaan Brok" style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, objectFit: "cover", objectPosition: "top center" }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0d2b55" }}>Adriaan Brok</div>
                    <div style={{ fontSize: 12.5, color: "#6b6f75", marginBottom: 6 }}>Senior Procurement Recruiter · Industry &amp; Construction</div>
                    <p style={{ fontSize: 13.5, color: "#4d5057", lineHeight: 1.5 }}>"I'll review your profile personally and call you within 1 working day."</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, padding: "8px 12px", background: "#e0f5e7", borderRadius: 0, fontSize: 12.5, color: "#11723a", fontWeight: 600 }}>
                  <span>⏱ Within 1 working day</span>
                  <span style={{ width: 1, height: 14, background: "rgba(17,114,58,0.25)" }} />
                  <span>4.9 <span style={{ color: "#ffa300", letterSpacing: 1 }}>★★★★★</span></span>
                  <span style={{ color: "#4d5057", fontWeight: 500 }}>47 reviews</span>
                </div>
                <div style={{ marginTop: 10, padding: "8px 12px", background: "#f8f8f7", borderRadius: 0, fontSize: 12.5, color: "#4d5057" }}>
                  🔒 Your CV stays with Adriaan — shared with no employer without your consent.
                </div>
              </div>

              {/* What's next */}
              <div style={{ display: "flex", maxWidth: 460, margin: "0 auto 22px", border: "1px solid #e0e2e5", overflow: "hidden" }}>
                {[
                  { day: "Step 1",  text: "We review your profile." },
                  { day: "Step 2", text: "Adriaan calls you." },
                  { day: "Step 3", text: "Active representation starts." },
                ].map((s, i) => (
                  <div key={s.day} style={{ flex: 1, padding: "12px 14px", borderLeft: i > 0 ? "1px solid #e0e2e5" : "none" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#663d00" }}>{s.day}</div>
                    <div style={{ fontSize: 12, color: "#4d5057", lineHeight: 1.4, marginTop: 4 }}>{s.text}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <button type="button" onClick={handleClose} style={{ height: 44, padding: "0 22px", background: "#0d2b55", color: "#fff", fontWeight: 600, fontSize: 14, border: "none", borderRadius: 2, cursor: "pointer" }}>
                  Close
                </button>
                <Link href="/vacancies" onClick={handleClose} style={{ height: 44, padding: "0 22px", background: "#fff", color: "#0d2b55", fontWeight: 600, fontSize: 14, border: "1.5px solid #c7cace", borderRadius: 2, display: "inline-flex", alignItems: "center" }}>
                  See open vacancies →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer (form only) ───────────────────────── */}
        {state === "form" && (
          <footer
            className="flex-shrink-0"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 64, borderTop: "1px solid #f0f1f3", background: "#fff" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontSize: 13, color: "#4d5057" }}>
                Prefer to call?{" "}
                <a href="tel:+31702400414" style={{ color: "#0d2b55", fontWeight: 600, borderBottom: "1px dotted #0d2b55" }}>
                  <strong>Dial 070 240 04 14</strong>
                </a>
              </span>
              <span style={{ fontSize: 12, color: "#6b6f75" }}>
                Something else?{" "}
                <Link href="/contact" onClick={handleClose} style={{ color: "#0d2b55", fontWeight: 600 }}>
                  Contact us →
                </Link>
              </span>
            </div>
            <button
              type="submit"
              form="candidate-form"
              style={{ height: 40, width: 180, background: "#ffa300", color: "#071935", fontWeight: 600, fontSize: 12, border: "none", borderRadius: 2, cursor: "pointer", transition: "background 0.15s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#e89400"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#ffa300"; }}
            >
              Submit application →
            </button>
          </footer>
        )}
      </div>

    </Modal>
  );
}
