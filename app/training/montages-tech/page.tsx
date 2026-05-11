import Link from "next/link";

export const metadata = {
  title: "Training - Montages & Tech | ICS Maugeri Tele-Neurophysiology Network",
  description: "EEG training module on the 10-20 system, bipolar montages, referential montages, filters and sensitivity.",
};

const electrodes = [
  ["Fp1", "35%", "17%"],
  ["Fp2", "65%", "17%"],
  ["F7", "18%", "35%"],
  ["F3", "38%", "34%"],
  ["Fz", "50%", "32%"],
  ["F4", "62%", "34%"],
  ["F8", "82%", "35%"],
  ["T3", "16%", "52%"],
  ["C3", "38%", "52%"],
  ["Cz", "50%", "50%"],
  ["C4", "62%", "52%"],
  ["T4", "84%", "52%"],
  ["T5", "22%", "70%"],
  ["P3", "40%", "70%"],
  ["Pz", "50%", "72%"],
  ["P4", "60%", "70%"],
  ["T6", "78%", "70%"],
  ["O1", "40%", "87%"],
  ["O2", "60%", "87%"],
];

const montageRows = [
  ["Fp1-F3", "Frontopolar to frontal", "Left anterior chain"],
  ["F3-C3", "Frontal to central", "Phase reversal visible at F3"],
  ["C3-P3", "Central to parietal", "Middle chain localization"],
  ["P3-O1", "Parietal to occipital", "Posterior spread"],
];

const filterRows = [
  ["LFF", "1 Hz", "Reduces slow sweat and baseline drift; excessive filtering may attenuate delta activity."],
  ["HFF", "70 Hz", "Reduces fast muscle activity; lowering it too much can hide useful fast components."],
  ["Notch", "50/60 Hz", "Targets line noise; useful, but should not replace good acquisition technique."],
  ["Sensitivity", "7 uV/mm", "Acts like zoom: lower value means larger displayed waves."],
];

export default function TrainingMontagesTechPage() {
  return (
    <main className="min-h-screen bg-[#F7FAFA] text-[#18282D]">
      <section className="px-5 py-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <Link href="/training/basics" className="text-[10px] uppercase tracking-[0.28em] text-[#2F6672]">
              Training - Basics
            </Link>
            <p className="mt-20 text-[10px] uppercase tracking-[0.36em] text-[#5E858C]">
              EEG Training
            </p>
            <h1 className="mt-5 max-w-5xl font-serif text-[4rem] leading-[0.88] tracking-normal text-[#17272C] md:text-[7.4rem]">
              Montages & Tech
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-light leading-[1.75] text-[#52686E] md:text-2xl">
              A practical module on electrode placement, differential amplification, bipolar localization and acquisition settings.
            </p>
          </div>

          <div className="relative min-h-[34rem] border border-[#D7E4E6] bg-white/75 shadow-[0_24px_80px_rgba(24,40,45,0.08)] backdrop-blur">
            <p className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.28em] text-[#5E858C]">
              International 10-20 map
            </p>
            <div className="absolute left-1/2 top-1/2 h-[25rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#9ABBC0] bg-[#F3F7F7]" />
            <div className="absolute left-1/2 top-1/2 h-[22rem] w-px -translate-x-1/2 -translate-y-1/2 bg-[#D7E4E6]" />
            <div className="absolute left-1/2 top-1/2 h-px w-[15rem] -translate-x-1/2 -translate-y-1/2 bg-[#D7E4E6]" />
            {electrodes.map(([label, left, top]) => (
              <div
                key={label}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left, top }}
              >
                <div className="mx-auto size-2.5 rounded-full bg-[#2F6672]" />
                <p className="mt-1 text-[10px] text-[#52686E]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            ["Letters", "F, T, C, P and O identify frontal, temporal, central, parietal and occipital regions."],
            ["Numbers", "Odd numbers belong to the left hemisphere. Even numbers belong to the right hemisphere."],
            ["Midline", "The z suffix marks midline electrodes such as Fz, Cz and Pz."],
          ].map(([title, text], index) => (
            <article key={title} className="border-t border-[#BFD3D6] pt-6">
              <p className="font-serif text-5xl text-[#2F6672]">0{index + 1}</p>
              <h2 className="mt-8 text-xl font-medium text-[#17272C]">{title}</h2>
              <p className="mt-4 text-base leading-8 text-[#52686E]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Montage logic</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
              An electrode becomes meaningful only by comparison.
            </h2>
          </div>
          <div className="space-y-8 text-lg font-light leading-9 text-[#52686E]">
            <p>
              EEG channels are built from differences: Input 1 minus Input 2. A montage is the chosen architecture of those comparisons.
            </p>
            <p>
              In a longitudinal bipolar montage, adjacent electrodes are linked in front-to-back chains. This produces a localized view that is especially useful for recognizing phase reversals.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-7xl gap-4 md:grid-cols-4">
          {montageRows.map(([channel, anatomy, note]) => (
            <div key={channel} className="border border-[#D7E4E6] bg-[#F7FAFA] p-5">
              <p className="font-serif text-3xl text-[#2F6672]">{channel}</p>
              <p className="mt-4 text-sm font-medium text-[#17272C]">{anatomy}</p>
              <p className="mt-3 text-sm leading-7 text-[#52686E]">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="border border-[#D7E4E6] bg-white p-6">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#5E858C]">Bipolar math</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="border border-[#D7E4E6] p-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#6E8589]">Channel 1</p>
                <p className="mt-3 font-serif text-4xl">Fp1 - F3</p>
                <p className="mt-4 text-sm leading-7 text-[#52686E]">If F3 is strongly negative and acts as Input 2, the displayed deflection becomes positive and points down.</p>
              </div>
              <div className="border border-[#D7E4E6] p-5">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#6E8589]">Channel 2</p>
                <p className="mt-3 font-serif text-4xl">F3 - C3</p>
                <p className="mt-4 text-sm leading-7 text-[#52686E]">The same F3 now acts as Input 1, so its negativity displays upward. The two waves point toward each other.</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 border border-[#D7E4E6] bg-[#F7FAFA] p-6">
              <span className="h-16 w-1 rounded-full bg-[#88B7A5]" />
              <p className="font-serif text-5xl text-[#2F6672]">Phase reversal</p>
              <span className="h-16 w-1 rounded-full bg-[#88B7A5]" />
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Localization</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
              Bipolar chains find the maximum by reversal.
            </h2>
            <p className="mt-7 text-lg font-light leading-9 text-[#52686E]">
              A negative discharge under a shared electrode creates opposite deflections in adjacent channels. In practice, the phase reversal marks the electrode closest to maximum negativity.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Referential view</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
              Maximum amplitude replaces phase reversal.
            </h2>
          </div>
          <div className="space-y-8 text-lg font-light leading-9 text-[#52686E]">
            <p>
              In a common average reference, each electrode is compared against a computed average of the recording set. This can give a broad, unbiased screening view.
            </p>
            <p>
              The electrode with the largest amplitude is usually closest to the source, but high-voltage artifacts can contaminate the reference and distort multiple channels.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Control panel</p>
          <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
            Filters and sensitivity shape what the reader sees.
          </h2>
          <div className="mt-12 overflow-hidden border border-[#D7E4E6] bg-white">
            <div className="grid bg-[#F3F7F7] text-[10px] uppercase tracking-[0.22em] text-[#5E858C] md:grid-cols-[0.6fr_0.6fr_1.8fr]">
              <div className="border-b border-[#D7E4E6] p-4 md:border-b-0 md:border-r">Control</div>
              <div className="border-b border-[#D7E4E6] p-4 md:border-b-0 md:border-r">Typical value</div>
              <div className="p-4">Clinical effect</div>
            </div>
            {filterRows.map((row) => (
              <div key={row[0]} className="grid border-t border-[#D7E4E6] text-sm text-[#2B3B40] md:grid-cols-[0.6fr_0.6fr_1.8fr]">
                {row.map((cell) => (
                  <div key={cell} className="border-[#D7E4E6] p-4 leading-7 md:border-r md:last:border-r-0">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#061215] px-5 py-20 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#88B7A5]">Setup checklist</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">Before reading the trace.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Use the 10-20 system to keep electrode placement reproducible.",
              "Bipolar montages localize with phase reversals.",
              "Referential montages localize with maximum amplitude.",
              "Common mode rejection suppresses noise shared by both inputs.",
              "Filter changes can remove artifact but may also hide pathology.",
              "Lower sensitivity values make waves appear larger on screen.",
            ].map((item) => (
              <div key={item} className="border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-[#C9D9DD]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-wrap gap-4 text-[10px] uppercase tracking-[0.24em] text-[#88B7A5]">
          <a href="https://en.wikipedia.org/wiki/10%E2%80%9320_system_(EEG)" target="_blank" rel="noreferrer">
            10-20 system
          </a>
          <a href="https://en.wikipedia.org/wiki/Electroencephalography" target="_blank" rel="noreferrer">
            Electroencephalography
          </a>
        </div>
      </section>
    </main>
  );
}
