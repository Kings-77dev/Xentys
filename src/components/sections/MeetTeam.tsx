import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RecruiterCard } from "@/components/cards/RecruiterCard";
import { LinkButton } from "@/components/ui/Button";

const team = [
  { initials: "MS", name: "Maarten Smits van Oyen", title: "Consultant — Permanent & Interim", bio: "Direct line into industrial and offshore procurement networks built over 10 years.", email: "maarten.smitsvanoyen@xentys.nl" },
  { initials: "AB", name: "Adriaan Brok", title: "Consultant — Interim Specialist", bio: "Specialist in fast-turnaround interim placements for construction and infrastructure.", email: "adriaan.brok@xentys.nl" },
  { initials: "AU", name: "Aurelia Bredet", title: "Consultant — Permanent Recruitment", bio: "Focused on strategic and category management roles across the Netherlands.", email: "aurelia.bredet@xentys.nl" },
  { initials: "MH", name: "Martin Havelka", title: "Chief of Technology", bio: "Keeps the tools, platform, and data infrastructure that power our matching process.", email: "martin.havelka@xentys.nl" },
];

export function MeetTeam() {
  return (
    <section className="bg-off-white py-[120px]" aria-labelledby="team-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="text-center max-w-xl mx-auto mb-16">
          <Eyebrow label="The people behind the placements" center />
          <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary" id="team-heading">
            You'll always know who you're talking to
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {team.map((m) => <RecruiterCard key={m.name} {...m} />)}
        </div>
        <div className="text-center">
          <LinkButton href="/about" variant="ghost">Learn about Xentys →</LinkButton>
        </div>
      </div>
    </section>
  );
}
