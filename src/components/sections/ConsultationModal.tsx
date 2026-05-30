"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import Link from "next/link";

type PlacementType = "permanent" | "interim" | "secondment";
type CallTime = "morning" | "afternoon" | "either";
type ContactPref = "phone" | "email";
type FormState = "form" | "confirm";

const tiles: { id: PlacementType; label: string; sub: string; tagLabel: string; tagClass: string }[] = [
  { id: "permanent",  label: "Permanent hire",   sub: "Permanent",  tagLabel: "Permanent",  tagClass: "bg-[#f0fdf4] text-[#166534]" },
  { id: "interim",    label: "Interim cover",     sub: "Interim",    tagLabel: "Interim",    tagClass: "bg-[#fffbeb] text-[#92400e]" },
  { id: "secondment", label: "Secondment",        sub: "Secondment", tagLabel: "Secondment", tagClass: "bg-[#eff6ff] text-[#1e40af]" },
];

function Radio({ active }: { active: boolean }) {
  return (
    <span
      className="flex-shrink-0 flex items-center justify-center"
      style={{
        width: 20, height: 20,
        borderRadius: "50%",
        background: active ? "#ffa300" : "#fff",
        border: active ? "none" : "1.5px solid #c9cdd3",
      }}
      aria-hidden="true"
    >
      {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "block" }} />}
    </span>
  );
}

function SegmentBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-3 text-[14px] transition-all duration-[180ms] cursor-pointer"
      style={{
        height: 44,
        border: active ? "2px solid #ffa300" : "1px solid #e1e4e8",
        borderRadius: 2,
        color: active ? "#0f172a" : "#6b7280",
        fontWeight: active ? 500 : 400,
        background: "#fff",
      }}
    >
      <Radio active={active} />
      {label}
    </button>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ConsultationModal({ open, onClose }: Props) {
  const [state, setState] = useState<FormState>("form");
  const [placement, setPlacement] = useState<PlacementType>("interim");
  const [callTime, setCallTime] = useState<CallTime>("either");
  const [contact, setContact] = useState<ContactPref>("email");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const required = ["name", "email", "company", "phone"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newErrors: Record<string, boolean> = {};
    required.forEach((id) => {
      const el = form.elements.namedItem(id) as HTMLInputElement | null;
      if (!el?.value.trim()) newErrors[id] = true;
    });
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setState("confirm");
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation
    setTimeout(() => { setState("form"); setErrors({}); }, 300);
  };

  const inputClass = (id: string) =>
    `h-11 w-full px-4 border rounded-[2px] text-[14px] text-text-primary placeholder:text-text-muted focus:border-amber focus:outline-none transition-colors ${errors[id] ? "border-red-400" : "border-border"}`;

  return (
    <Modal open={open} onClose={handleClose} title="Request a Consultation" className="p-0 max-w-[680px]">

      {state === "form" ? (
        <form onSubmit={handleSubmit} noValidate>

          {/* Status banner */}
          <div className="flex items-center gap-3 px-5 h-11 bg-off-white border-b border-border relative">
            <span className="w-2.5 h-2.5 rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
            <span className="text-[13px] font-semibold text-text-primary">Response within 1 working day</span>
          </div>

          {/* Header */}
          <div className="px-8 pt-6 pb-3">
            <h2 className="font-semibold text-[22px] text-navy leading-8">Request a Consultation</h2>
            <p className="text-[14px] text-text-secondary mt-1">
              Tell us a little, a sector recruiter calls within 1 working day. Takes 60 seconds.
            </p>
          </div>

          {/* Placement tiles */}
          <div className="px-8 pb-5 flex gap-4">
            {tiles.map((t) => {
              const isActive = placement === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPlacement(t.id)}
                  className="flex-1 h-20 relative text-left transition-all duration-[180ms] cursor-pointer bg-white"
                  style={{
                    border: isActive ? "2px solid #ffa300" : "1px solid #e1e4e8",
                    borderRadius: 0,
                  }}
                  aria-pressed={isActive}
                >
                  {/* Tag */}
                  <span className={`absolute top-2.5 left-2.5 text-[11px] font-medium px-2 py-0.5 ${t.tagClass}`}>
                    {t.tagLabel}
                  </span>
                  {/* Label */}
                  <span className="absolute bottom-2.5 left-2.5 font-semibold text-[13px] text-navy">
                    {t.label}
                  </span>
                  {/* Radio */}
                  <span className="absolute top-2.5 right-2.5">
                    <Radio active={isActive} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Form fields — 2 columns */}
          <div className="px-8 grid grid-cols-2 gap-x-5 gap-y-4 pb-4">
            {[
              { id: "name",     label: "Full name",            ph: "Your full name",    required: true },
              { id: "company",  label: "Company",              ph: "Your organisation", required: true },
              { id: "email",    label: "Work email",           ph: "your@company.com",  required: true },
              { id: "phone",    label: "Phone",                ph: "+31 ...",            required: true },
              { id: "role",     label: "Role you're hiring for", ph: "e.g. Strategic Buyer", required: false },
              { id: "jobtitle", label: "Your job title",       ph: "e.g. CPO, HR Manager", required: false },
            ].map(({ id, label, ph, required: req }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-[11px] font-semibold text-text-secondary mb-1.5">
                  {label}{req && <span className="text-red-500 ml-0.5">*</span>}
                </label>
                <input
                  id={id}
                  name={id}
                  type={id === "email" ? "email" : "text"}
                  placeholder={ph}
                  className={inputClass(id)}
                  onChange={() => setErrors((e) => { const n = { ...e }; delete n[id]; return n; })}
                />
              </div>
            ))}
          </div>

          {/* Segment controls */}
          <div className="px-8 pb-4 flex gap-10 items-start">
            <div>
              <p className="text-[11px] font-semibold text-text-secondary mb-2">Best time to call</p>
              <div className="flex gap-2">
                {(["morning", "afternoon", "either"] as CallTime[]).map((v) => (
                  <SegmentBtn key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} active={callTime === v} onClick={() => setCallTime(v)} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-text-secondary mb-2">Preferred contact</p>
              <div className="flex gap-2">
                {(["phone", "email"] as ContactPref[]).map((v) => (
                  <SegmentBtn key={v} label={v.charAt(0).toUpperCase() + v.slice(1)} active={contact === v} onClick={() => setContact(v)} />
                ))}
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="px-8 pb-4">
            <label htmlFor="extra" className="block text-[11px] font-semibold text-text-secondary mb-1.5">
              Anything else? <span className="font-normal text-text-muted">(optional)</span>
            </label>
            <textarea
              id="extra"
              name="extra"
              rows={3}
              placeholder="One-line context — urgency, must-have, blocker..."
              className="h-[82px] w-full px-4 py-3 border border-border rounded-[2px] text-[14px] text-text-primary placeholder:text-text-muted focus:border-amber focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Consent */}
          <div className="mx-8 mb-4 bg-off-white border border-border p-4 flex gap-3 items-start">
            <input type="checkbox" id="consent" required className="mt-0.5 w-[18px] h-[18px] border border-border rounded-none accent-amber flex-shrink-0" />
            <label htmlFor="consent" className="text-[13px] text-text-secondary leading-relaxed cursor-pointer">
              My details will be shared and treated with discretion{" "}
              <strong className="text-text-primary font-semibold">only with the relevant Xentys recruiter.</strong>{" "}
              <Link href="#" className="font-semibold text-navy underline underline-offset-2">Privacy statement →</Link>
            </label>
          </div>

          {/* Footer upper — link to full form */}
          <div className="border-t border-border py-4 text-center">
            <span className="text-[13px] text-text-secondary">
              Want to provide more detail?{" "}
              <Link
                href="/consultation"
                onClick={handleClose}
                className="font-semibold text-navy hover:text-amber-text transition-colors"
              >
                Open the full brief form →
              </Link>
            </span>
          </div>

          {/* Footer lower — phone + submit */}
          <div className="border-t border-border h-16 px-8 flex items-center justify-between">
            <span className="text-[13px] text-text-secondary">
              Prefer to call?{" "}
              <a href="tel:+31702400414" className="font-semibold text-navy hover:text-amber-text transition-colors">
                Dial 070 240 04 14
              </a>
            </span>
            <button
              type="submit"
              className="h-9 px-5 bg-amber text-navy font-semibold rounded-[2px] text-[13px] hover:bg-[#e8970a] transition-colors"
            >
              Submit
            </button>
          </div>

        </form>
      ) : (

        /* ── Confirmation state ─────────────────────────────── */
        <div className="px-8 py-10 flex flex-col items-center gap-6 text-center">

          {/* Amber check circle */}
          <div className="w-16 h-16 rounded-full bg-amber/10 flex items-center justify-center flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffa300" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div>
            <h2 className="font-bold text-[28px] text-navy mb-2">Request received.</h2>
            <p className="text-[15px] text-text-secondary max-w-[440px]">
              Your consultation request has been received. A recruiter will call you within 1 working day.
            </p>
          </div>

          {/* Recruiter card */}
          <div className="w-full border border-border" style={{ borderTop: "2px solid #ffa300" }}>
            {/* Recruiter info */}
            <div className="flex items-start gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-off-white flex items-center justify-center text-navy font-semibold text-[13px] flex-shrink-0">
                AB
              </div>
              <div className="text-left">
                <p className="font-bold text-navy text-[15px]">Adriaan Brok</p>
                <p className="text-[14px] text-text-secondary mt-0.5">
                  I'll review your request and call you within 1 working day.
                </p>
              </div>
            </div>

            {/* Trust badge */}
            <div className="border-t border-border bg-off-white px-4 py-2.5 flex items-center gap-3">
              <span className="text-[13px]" aria-hidden="true">⏱</span>
              <span className="text-[13px] font-semibold text-navy">Within 1 working day</span>
              <span className="text-amber text-[12px] tracking-wide">★★★★★</span>
              <span className="text-[12px] text-text-muted">4.9 · 47 reviews</span>
            </div>

            {/* Privacy note */}
            <div className="border-t border-border bg-off-white px-4 py-2.5 flex items-center gap-2">
              <span className="text-[13px]" aria-hidden="true">🔒</span>
              <span className="text-[13px] text-text-muted">Your current employer will not be notified.</span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="w-full h-12 bg-navy text-white font-semibold rounded-[2px] text-[14px] hover:bg-[#0a2347] transition-colors"
          >
            Close
          </button>

        </div>
      )}
    </Modal>
  );
}
