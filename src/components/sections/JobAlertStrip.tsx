"use client";
import { useState } from "react";

export function JobAlertStrip() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      className="bg-navy relative overflow-hidden"
      style={{ borderTop: "4px solid #ffa300" }}
      aria-labelledby="alert-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-12">
        <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">

          {/* Left — copy */}
          <div className="flex-1">
            <h2
              className="font-semibold text-[22px] leading-8 text-white mb-2"
              id="alert-heading"
            >
              Stay informed. Roles and hiring updates, once a month.
            </h2>
            <p className="text-[16px] leading-6 text-[#d9e5f2]">
              No weekly digests. Select what's relevant to you and we'll do the rest.
            </p>
          </div>

          {/* Right — form */}
          <div className="flex flex-col gap-3 w-full lg:w-[376px]">
            {!submitted ? (
              <>
                <p className="text-[11px] text-[#a6bdd6]">No spam. Unsubscribe any time.</p>
                <form
                  className="flex gap-2"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="flex-1 h-11 px-4 rounded-lg bg-white border border-[#e0e2e5] text-[14px] text-text-primary placeholder:text-[#c7cace] focus:outline-none focus:border-amber transition-colors"
                  />
                  <button
                    type="submit"
                    className="h-11 px-5 bg-amber rounded-lg text-[13px] font-semibold text-[#071935] whitespace-nowrap hover:opacity-90 transition-opacity flex-shrink-0"
                  >
                    Notify me
                  </button>
                </form>
                <div className="flex gap-8 items-center">
                  {[
                    { id: "alert-hire", label: "I am a hiring manager" },
                    { id: "alert-role", label: "I am looking for a role" },
                  ].map(({ id, label }) => (
                    <label key={id} htmlFor={id} className="flex items-center gap-2 cursor-pointer">
                      <div className="w-[14px] h-[14px] rounded-sm border border-[#c7cace] bg-[#f3f7fb] flex-shrink-0">
                        <input type="checkbox" id={id} className="sr-only" />
                      </div>
                      <span className="text-[12px] text-[#d9e5f2]">{label}</span>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 py-3">
                <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffa300" strokeWidth="2.5" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="text-[15px] text-white">You're on the list. We'll be in touch.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
