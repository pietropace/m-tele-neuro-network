import Link from "next/link";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

const modules = [
  {
    number: "01",
    title: "Basics",
    href: "/training/basics",
    text: "From cortical activity to the clinical waveform.",
  },
  {
    number: "02",
    title: "Montages & Tech",
    href: "/training/montages-tech",
    text: "Electrode comparisons, filters, sensitivity and references.",
  },
  {
    number: "03",
    title: "Terminology",
    href: "/training/terminology",
    text: "Frequency, amplitude, morphology, sleep and artifacts.",
  },
  {
    number: "04",
    title: "Lead Placement",
    href: "/training/lead-placement",
    text: "Interactive 10-20 placement simulator with validation.",
  },
];

export default function TrainingPortalSection() {
  return (
    <section className="bg-[#F7FAFA] py-16 text-[#18282D] md:py-24">
      <Container>
        <FadeIn>
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#5E858C]">
                EEG training
              </p>
              <h2 className="mt-5 max-w-4xl font-serif text-[3.2rem] leading-[0.92] tracking-normal md:text-[5.6rem]">
                A guided path into EEG fundamentals.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-[1rem] font-light leading-[1.8] text-[#52686E] md:text-[1.25rem]">
                Four original training modules combine concise theory, visual explanations and hands-on lead placement practice.
              </p>
              <Link
                href="/training"
                className="mt-8 inline-flex min-h-12 items-center justify-center bg-[#17272C] px-6 py-4 text-[10px] uppercase tracking-[0.26em] text-white transition hover:bg-[#2F6672]"
              >
                Open training portal
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="group border border-[#D7E4E6] bg-white p-5 transition hover:-translate-y-1 hover:border-[#2F6672]"
              >
                <p className="font-serif text-5xl text-[#2F6672]">{module.number}</p>
                <h3 className="mt-8 text-xl font-medium text-[#17272C]">{module.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#52686E]">{module.text}</p>
                <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[#2F6672] opacity-70 transition group-hover:opacity-100">
                  Enter module
                </p>
              </Link>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
