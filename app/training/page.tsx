import Link from "next/link";

export const metadata = {
  title: "EEG Training Portal | ICS Maugeri Tele-Neurophysiology Network",
  description: "Premium EEG training portal with fundamentals, montages, terminology and lead placement simulator.",
};

const modules = [
  {
    number: "01",
    eyebrow: "Foundations",
    title: "Training - Basics",
    href: "/training/basics",
    description: "Understand how synchronized cortical activity becomes the waveform seen on scalp EEG.",
    detail: "Postsynaptic potentials, dipoles, polarity, source orientation.",
  },
  {
    number: "02",
    eyebrow: "Acquisition",
    title: "Montages & Tech",
    href: "/training/montages-tech",
    description: "Learn how electrode comparisons, references, filters and sensitivity shape the clinical trace.",
    detail: "10-20 map, bipolar chains, phase reversal, CAR, LFF, HFF, notch.",
  },
  {
    number: "03",
    eyebrow: "Language",
    title: "Terminology",
    href: "/training/terminology",
    description: "Build the vocabulary needed to describe EEG rhythms and communicate findings clearly.",
    detail: "Frequency bands, amplitude, sleep features, morphology, artifacts.",
  },
  {
    number: "04",
    eyebrow: "Practice",
    title: "Lead Placement",
    href: "/training/lead-placement",
    description: "Place electrodes directly on a stylized 10-20 head map with immediate validation.",
    detail: "Drag-and-drop simulator, tolerance levels, scoring, tactile feedback.",
  },
];

export default function TrainingPage() {
  return (
    <main className="min-h-screen bg-[#061215] text-white">
      <section className="relative overflow-hidden px-5 py-6 md:px-10">
        <div className="absolute inset-0 opacity-35">
          <div className="absolute left-[8%] top-[12%] h-px w-[78%] rotate-[-9deg] bg-[#88B7A5]/25" />
          <div className="absolute left-[18%] top-[28%] h-px w-[70%] rotate-[7deg] bg-white/10" />
          <div className="absolute left-[4%] top-[74%] h-px w-[88%] rotate-[-4deg] bg-[#88B7A5]/15" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <Link href="/" className="text-[10px] uppercase tracking-[0.28em] text-[#88B7A5]">
            ICS Maugeri Network
          </Link>

          <div className="grid min-h-[72vh] gap-12 pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.38em] text-[#88B7A5]">
                EEG Training Portal
              </p>
              <h1 className="mt-6 max-w-5xl font-serif text-[4.8rem] leading-[0.84] tracking-normal md:text-[9rem]">
                Learn the trace.
              </h1>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-xl font-light leading-[1.8] text-[#C9D9DD] md:text-2xl">
                A cinematic training path for EEG fundamentals, acquisition logic, waveform language and hands-on lead placement.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/training/basics"
                  className="bg-white px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[#061215]"
                >
                  Start training
                </Link>
                <Link
                  href="/training/lead-placement"
                  className="border border-white/15 px-5 py-3 text-[10px] uppercase tracking-[0.24em] text-[#D9E5E8]"
                >
                  Open simulator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7FAFA] px-5 py-20 text-[#18282D] md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="group border-t border-[#BFD3D6] pt-6 transition hover:-translate-y-1"
              >
                <p className="font-serif text-6xl text-[#2F6672]">{module.number}</p>
                <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-[#5E858C]">
                  {module.eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-medium text-[#17272C]">{module.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#52686E]">{module.description}</p>
                <p className="mt-6 text-[10px] uppercase tracking-[0.22em] text-[#2F6672] opacity-75 transition group-hover:opacity-100">
                  Enter module
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 text-[#18282D] md:px-10">
        <div className="mx-auto max-w-7xl">
          {modules.map((module, index) => (
            <Link
              key={module.href}
              href={module.href}
              className={`group grid min-h-[31rem] gap-10 border-t border-[#D7E4E6] py-14 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">
                  {module.eyebrow} / {module.number}
                </p>
                <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight text-[#17272C] md:text-7xl">
                  {module.title}
                </h2>
                <p className="mt-7 max-w-xl text-lg font-light leading-9 text-[#52686E]">
                  {module.description}
                </p>
              </div>

              <div className="relative min-h-[24rem] overflow-hidden border border-[#D7E4E6] bg-[#F7FAFA] p-6 transition duration-500 group-hover:bg-white">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#5E858C]">
                  Module focus
                </p>
                <p className="mt-8 max-w-md font-serif text-4xl leading-tight text-[#2F6672]">
                  {module.detail}
                </p>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="h-px bg-[#BFD3D6]" />
                  <p className="mt-5 text-[10px] uppercase tracking-[0.24em] text-[#2F6672]">
                    Open {module.number}
                  </p>
                </div>
                <svg viewBox="0 0 420 180" className="absolute bottom-16 right-[-4rem] w-[28rem] opacity-25">
                  <path
                    d="M0 92 C35 56, 55 128, 88 92 S142 56, 172 92 S226 128, 254 92 S310 56, 338 92 S392 128, 420 92"
                    fill="none"
                    stroke="#2F6672"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
