import { Eyebrow } from "@/components/ui/Eyebrow";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

const testimonials = [
  { quote: "Maarten keeps his commitments and has an engaging vision on procurement's role. A recruiter who genuinely understands the discipline.", name: "Marc de Kolf", role: "Interim Procurement Professional, Feadship" },
  { quote: "They provide well-matched candidates and invest real effort in pre-selection. That makes them stand out among every recruitment firm I've worked with.", name: "Esther van der Sluijs", role: "Supply Chain Manager, Feadship" },
  { quote: "I was positively surprised by the active approach and honest feedback. My compliments — you are the first agency I received a proper acknowledgement from.", name: "Procurement Manager", role: "Industrial sector, Netherlands" },
];

export function Testimonials() {
  return (
    <section className="bg-navy py-[120px]" aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="text-center max-w-xl mx-auto mb-16">
          <Eyebrow label="What people say" inv center />
          <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-white" id="testimonials-heading">
            Honest feedback. From people who mean it.
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
        </div>
      </div>
    </section>
  );
}
