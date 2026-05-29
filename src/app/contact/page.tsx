import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

export default function ContactPage() {
  const details = [
    { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6", label: "Office", value: "Geestbrugkade 35, 2281 CX Rijswijk", href: null },
    { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", label: "Phone", value: "070 240 04 14", href: "tel:+31702400414" },
    { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6", label: "Email", value: "info@xentys.nl", href: "mailto:info@xentys.nl" },
    { icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z", label: "LinkedIn", value: "linkedin.com/company/xentys", href: "https://linkedin.com" },
  ];

  return (
    <>
      <section className="bg-navy pt-36 pb-16" aria-labelledby="contact-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <Eyebrow label="Contact" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-3" id="contact-heading">We pick up the phone.</h1>
          <p className="text-lg text-white/70">Reach us directly. We respond to all enquiries within 1 working day.</p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <section aria-label="Contact information">
            <h2 className="font-semibold text-2xl text-text-primary mb-8">Get in touch</h2>
            <div className="flex flex-col gap-6">
              {details.map(({ icon, label, value, href }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center text-amber-text flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={icon}/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-1">{label}</p>
                    {href
                      ? <a href={href} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-base text-amber-text underline underline-offset-2 hover:text-navy transition-colors">{value}</a>
                      : <p className="text-base text-text-primary">{value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-off-white rounded-2xl border-l-4 border-amber text-base text-text-secondary">
              <strong className="text-text-primary">We respond to all enquiries within 1 working day.</strong> If you send a brief, a consultant will call you back — not an automated response system.
            </div>
          </section>

          <section aria-label="How can we help?">
            <h2 className="font-semibold text-2xl text-text-primary mb-6">How can we help?</h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
                  title: "I want to submit a vacancy",
                  desc: "Tell us what you need. A consultant will call within 1 working day. Fixed fee, no obligation to proceed.",
                  links: [{ href: "/consultation", label: "Request a Consultation →" }],
                },
                {
                  icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
                  title: "I'm a procurement professional",
                  desc: "Browse our current vacancies or register your profile for proactive representation.",
                  links: [{ href: "/vacancies", label: "Browse vacancies →" }, { href: "/open-application", label: "Register your profile →" }],
                },
              ].map(({ icon, title, desc, links }) => (
                <div key={title} className="bg-white border border-border rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center text-amber-text mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={icon}/></svg>
                  </div>
                  <h3 className="font-semibold text-lg text-text-primary mb-2">{title}</h3>
                  <p className="text-base text-text-secondary mb-4">{desc}</p>
                  <div className="flex flex-col gap-2">
                    {links.map((l) => <LinkButton key={l.label} href={l.href} variant="link">{l.label}</LinkButton>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
