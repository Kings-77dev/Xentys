"use client";
import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { LinkButton, Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { FileUpload } from "@/components/ui/FileUpload";
import { vacancies, getVacancyBySlug } from "@/data/vacancies";

export default function VacancyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const vacancy = getVacancyBySlug(slug);
  if (!vacancy) notFound();

  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const related = vacancies.filter((v) => v.slug !== slug && v.type === vacancy.type).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-36 pb-12" aria-labelledby="role-title">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span aria-hidden="true">›</span>
            <Link href="/vacancies" className="hover:text-white/80 transition-colors">Vacancies</Link>
            <span aria-hidden="true">›</span>
            <span className="text-white/80" aria-current="page">{vacancy.title}</span>
          </nav>
          <div className="mb-4"><Badge type={vacancy.type} /></div>
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-6" id="role-title">{vacancy.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            {[
              { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6", text: vacancy.location },
              { icon: "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", text: vacancy.sector.charAt(0).toUpperCase() + vacancy.sector.slice(1) },
              { icon: "M12 2v10l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0", text: vacancy.salary },
              { icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2", text: `Posted ${vacancy.postedAgo}` },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffa300" strokeWidth="2" aria-hidden="true"><path d={icon}/></svg>
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start">

          {/* Main content */}
          <div>
            <h2 className="font-semibold text-2xl text-text-primary mb-4">About the role</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-6">{vacancy.description}</p>

            {[
              { title: "What you'll be doing", items: vacancy.whatYouDo },
              { title: "What you bring", items: vacancy.whatYouBring },
              { title: "What's on offer", items: vacancy.whatOnOffer },
            ].map(({ title, items }) => (
              <div key={title} className="mb-6">
                <h3 className="font-semibold text-lg text-text-primary mb-3">{title}</h3>
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  {items.map((item) => <li key={item} className="text-base text-text-secondary">{item}</li>)}
                </ul>
              </div>
            ))}

            <div className="mt-8 p-6 bg-off-white rounded-none border-l-4 border-amber">
              <p className="text-xs font-semibold tracking-wider uppercase text-amber-text mb-2">From {vacancy.recruiterName.split(" ")[0]}</p>
              <p className="text-base text-text-secondary">{vacancy.recruiterNote}</p>
            </div>

            <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-4 items-center">
              <Button variant="primary" onClick={() => setModalOpen(true)}>Apply for this role →</Button>
              <LinkButton href="/open-application" variant="ghost">Not quite right? Register your profile</LinkButton>
            </div>

            {/* Post-apply timeline */}
            <div className="mt-12 p-8 bg-off-white rounded-none border border-border">
              <h2 className="font-semibold text-base text-text-primary mb-6">What happens after you apply</h2>
              <div className="flex flex-col gap-4">
                {[
                  { n: "1", t: "We review your profile", d: `${vacancy.recruiterName.split(" ")[0]} reviews your application personally — usually within 1 working day.` },
                  { n: "2", t: "We call you", d: "A 20-minute call to understand your background, availability, and what you're looking for." },
                  { n: "3", t: "You get honest feedback", d: "If this role is a fit, we move forward. If not, we'll tell you clearly — and often have something else relevant." },
                  { n: "4", t: "We represent you", d: `If we proceed, ${vacancy.recruiterName.split(" ")[0]} presents your profile to the client and manages the process throughout.` },
                ].map(({ n, t, d }) => (
                  <div key={n} className="flex gap-4 items-start">
                    <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center text-navy font-semibold text-xs flex-shrink-0 mt-0.5" aria-hidden="true">{n}</div>
                    <div>
                      <strong className="block font-semibold text-sm text-text-primary mb-1">{t}</strong>
                      <span className="text-sm text-text-secondary">{d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 sticky top-20" aria-label="Recruiter and related roles">
            <div className="bg-white border border-border rounded-none p-8 flex flex-col gap-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-text-muted">Your recruiter for this role</p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-off-white border-2 border-border flex items-center justify-center font-bold text-navy text-lg" aria-hidden="true">
                  {vacancy.recruiterInitials}
                </div>
                <div>
                  <p className="font-semibold text-base text-text-primary">{vacancy.recruiterName}</p>
                  <p className="text-sm text-text-muted">{vacancy.recruiterTitle}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm text-text-secondary">
                <a href="tel:+31702400414" className="flex items-center gap-2 hover:text-amber-text transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  070 240 04 14
                </a>
                <a href={`mailto:${vacancy.recruiterEmail}`} className="flex items-center gap-2 hover:text-amber-text transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {vacancy.recruiterEmail}
                </a>
              </div>
              <Button variant="primary" className="w-full justify-center" onClick={() => setModalOpen(true)}>Apply for this role →</Button>
              <Link href="/open-application" className="text-sm text-text-muted text-center underline underline-offset-2 hover:text-text-primary transition-colors">
                Not quite right? Register your profile →
              </Link>
            </div>

            {related.length > 0 && (
              <div className="bg-off-white rounded-none p-6">
                <h2 className="font-semibold text-sm text-text-primary mb-4">Related vacancies</h2>
                {related.map((r) => (
                  <div key={r.slug} className="py-4 border-b border-border last:border-0">
                    <Link href={`/vacancies/${r.slug}`} className="font-semibold text-sm text-text-primary hover:text-amber-text transition-colors block mb-1">{r.title}</Link>
                    <p className="text-xs text-text-muted">{r.type.charAt(0).toUpperCase() + r.type.slice(1)} · {r.location} · {r.salary}</p>
                  </div>
                ))}
                <LinkButton href="/vacancies" variant="ghost" className="w-full justify-center mt-4 text-sm py-2">View all vacancies →</LinkButton>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setSubmitted(false); }} title={`Apply for ${vacancy.title}`}>
        {!submitted ? (
          <>
            <h2 className="font-bold text-2xl tracking-tight text-text-primary mb-2">Apply for {vacancy.title}</h2>
            <p className="text-sm text-text-secondary mb-8">Your details go directly to {vacancy.recruiterName.split(" ")[0]}. Response within 1 working day.</p>
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-text-primary" htmlFor="first">First name <span className="text-red-500">*</span></label>
                  <input id="first" required className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" placeholder="Jan" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-text-primary" htmlFor="last">Last name <span className="text-red-500">*</span></label>
                  <input id="last" required className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" placeholder="de Vries" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-primary" htmlFor="email">Email <span className="text-red-500">*</span></label>
                <input id="email" type="email" required className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" placeholder="jan@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-primary" htmlFor="phone">Phone <span className="text-red-500">*</span></label>
                <input id="phone" type="tel" required className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" placeholder="+31 6 …" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-primary" htmlFor="linkedin">LinkedIn <span className="font-normal text-text-muted">(optional)</span></label>
                <input id="linkedin" type="url" className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" placeholder="https://linkedin.com/in/…" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-primary">CV / Resume <span className="text-red-500">*</span></label>
                <FileUpload id="cv" name="cv" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-text-primary" htmlFor="note">Cover note <span className="font-normal text-text-muted">(optional)</span></label>
                <textarea id="note" rows={3} className="px-4 py-3 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors resize-y" placeholder={`Anything you'd like ${vacancy.recruiterName.split(" ")[0]} to know before the call…`} />
              </div>
              <button type="submit" className="w-full h-12 bg-amber text-navy font-semibold rounded-[2px] hover:bg-[#e8970a] transition-all duration-[200ms]">Submit application →</button>
              <p className="text-xs text-text-muted text-center">Your details are handled in accordance with our <Link href="#" className="underline underline-offset-2 text-amber-text">privacy policy</Link>.</p>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-4 py-8">
            <div className="w-16 h-16 bg-amber/10 rounded-none flex items-center justify-center text-amber-text">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="font-bold text-2xl text-text-primary">We've received your application</h2>
            <p className="text-base text-text-secondary max-w-sm">{vacancy.recruiterName.split(" ")[0]} will review your profile and be in touch within 1 working day. We'll always give you honest feedback — whatever the outcome.</p>
            <LinkButton href="/vacancies" variant="primary" onClick={() => setModalOpen(false)}>Back to vacancies →</LinkButton>
          </div>
        )}
      </Modal>
    </>
  );
}
