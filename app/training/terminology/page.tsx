import Link from "next/link";

export const metadata = {
  title: "Training - Terminology | ICS Maugeri Tele-Neurophysiology Network",
  description: "EEG training module on frequency bands, amplitude, morphology, rhythmicity, sleep features and artifacts.",
};

const bands = [
  { name: "Delta", range: "0.5-4 Hz", note: "Deep sleep rhythm; in wakefulness, may suggest structural or encephalopathic slowing.", path: "M0 36 C28 8, 52 64, 80 36 S132 8, 160 36 S212 64, 240 36" },
  { name: "Theta", range: "4-8 Hz", note: "Common in drowsiness and childhood; can be physiologic or context-dependent.", path: "M0 34 C16 15, 32 53, 48 34 S80 15, 96 34 S128 53, 144 34 S176 15, 192 34 S224 53, 240 34" },
  { name: "Alpha", range: "8-13 Hz", note: "Posterior dominant rhythm of relaxed wakefulness, expected to attenuate with eye opening.", path: "M0 34 C10 18, 20 50, 30 34 S50 18, 60 34 S80 50, 90 34 S110 18, 120 34 S140 50, 150 34 S170 18, 180 34 S200 50, 210 34 S230 18, 240 34" },
  { name: "Beta", range: "13-30 Hz", note: "Fast, lower-amplitude activity; may increase with medication effect or muscle artifact.", path: "M0 34 C6 24, 12 44, 18 34 S30 24, 36 34 S48 44, 54 34 S66 24, 72 34 S84 44, 90 34 S102 24, 108 34 S120 44, 126 34 S138 24, 144 34 S156 44, 162 34 S174 24, 180 34 S192 44, 198 34 S210 24, 216 34 S228 44, 240 34" },
];

const sleepRows = [
  ["N1", "Drowsiness", "Alpha drops out; slow rolling eye movements may appear."],
  ["N2", "Light sleep", "Sleep spindles and K-complexes become the key signatures."],
  ["N3", "Deep sleep", "High-amplitude delta activity dominates the record."],
  ["REM", "Paradoxical sleep", "Mixed-frequency EEG with dreaming and skeletal muscle atonia."],
];

const morphologyRows = [
  ["Monophasic", "Remains mostly on one side of baseline.", "Simple spike-like transient"],
  ["Biphasic", "Crosses baseline once.", "Spike-and-slow-wave complex"],
  ["Polyphasic", "Crosses baseline multiple times.", "Complex transient or artifact"],
  ["Monomorphic", "Repeats with similar shape and frequency.", "Rhythmic pattern"],
  ["Polymorphic", "Varies in shape, amplitude and timing.", "Irregular slowing"],
];

const artifacts = [
  ["Eye blink", "Large frontal slow deflection from the eye's corneo-retinal dipole."],
  ["Muscle artifact", "Fast, dense activity often maximal in temporal channels during jaw tension."],
  ["Line noise", "Regular 50/60 Hz interference that can make the trace appear thick or dark."],
];

export default function TrainingTerminologyPage() {
  return (
    <main className="min-h-screen bg-[#F7FAFA] text-[#18282D]">
      <section className="px-5 py-6 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Link href="/training/montages-tech" className="text-[10px] uppercase tracking-[0.28em] text-[#2F6672]">
              Training - Montages & Tech
            </Link>
            <p className="mt-20 text-[10px] uppercase tracking-[0.36em] text-[#5E858C]">
              EEG Training
            </p>
            <h1 className="mt-5 max-w-5xl font-serif text-[4rem] leading-[0.88] tracking-normal text-[#17272C] md:text-[7.5rem]">
              Terminology
            </h1>
            <p className="mt-8 max-w-2xl text-xl font-light leading-[1.75] text-[#52686E] md:text-2xl">
              EEG interpretation starts with a shared language: frequency, amplitude, morphology, rhythmicity, sleep state and artifact.
            </p>
          </div>

          <div className="border border-[#D7E4E6] bg-white/75 p-5 shadow-[0_24px_80px_rgba(24,40,45,0.08)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-[#D7E4E6] pb-4">
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#5E858C]">Waveform dictionary</p>
              <p className="font-serif text-4xl text-[#2F6672]">03</p>
            </div>
            <div className="mt-6 space-y-4">
              {bands.map((band) => (
                <div key={band.name} className="grid grid-cols-[4.75rem_1fr] items-center gap-4">
                  <div>
                    <p className="font-serif text-xl text-[#2F6672]">{band.name}</p>
                    <p className="text-[10px] text-[#6E8589]">{band.range}</p>
                  </div>
                  <svg viewBox="0 0 240 68" className="h-14 w-full overflow-visible">
                    <path d="M0 34 H240" stroke="#D7E4E6" strokeWidth="1" />
                    <path d={band.path} fill="none" stroke="#2F6672" strokeLinecap="round" strokeWidth="2" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
          {bands.map((band, index) => (
            <article key={band.name} className="border-t border-[#BFD3D6] pt-6">
              <p className="font-serif text-5xl text-[#2F6672]">0{index + 1}</p>
              <h2 className="mt-8 text-xl font-medium text-[#17272C]">{band.name}</h2>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#5E858C]">{band.range}</p>
              <p className="mt-4 text-base leading-8 text-[#52686E]">{band.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Core metric</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
              Frequency tells you how fast the brain is speaking.
            </h2>
          </div>
          <div className="space-y-8 text-lg font-light leading-9 text-[#52686E]">
            <p>
              Frequency is the number of wave cycles per second, measured in Hertz. Clinical EEG usually begins by sorting activity into delta, theta, alpha and beta ranges.
            </p>
            <p>
              Physiologic rhythms often show an inverse relationship between frequency and amplitude: slower waves tend to be taller, while faster waves tend to be smaller.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="overflow-hidden border border-[#D7E4E6] bg-white">
            <div className="grid bg-[#F3F7F7] text-[10px] uppercase tracking-[0.22em] text-[#5E858C] md:grid-cols-[0.45fr_0.8fr_1.75fr]">
              <div className="border-b border-[#D7E4E6] p-4 md:border-b-0 md:border-r">Stage</div>
              <div className="border-b border-[#D7E4E6] p-4 md:border-b-0 md:border-r">State</div>
              <div className="p-4">Recognition cue</div>
            </div>
            {sleepRows.map((row) => (
              <div key={row[0]} className="grid border-t border-[#D7E4E6] text-sm text-[#2B3B40] md:grid-cols-[0.45fr_0.8fr_1.75fr]">
                {row.map((cell) => (
                  <div key={cell} className="border-[#D7E4E6] p-4 leading-7 md:border-r md:last:border-r-0">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">State changes</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
              Sleep has its own vocabulary.
            </h2>
            <p className="mt-7 text-lg font-light leading-9 text-[#52686E]">
              Sleep is not simply the absence of wakefulness. Each stage has recognizable EEG signatures, from alpha attenuation in drowsiness to spindles, K-complexes and high-amplitude delta.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Measurements</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
              Amplitude is the voltage of the wave, not the screen zoom.
            </h2>
          </div>
          <div className="space-y-8 text-lg font-light leading-9 text-[#52686E]">
            <p>
              Amplitude describes waveform height and is measured in microvolts. Adult scalp EEG commonly falls within a low-voltage clinical range, often between 10 and 100 uV.
            </p>
            <p>
              Sensitivity is different: it is a display setting, such as 7 uV/mm, that changes how large the same waveform appears on screen.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Classification</p>
          <h2 className="mt-5 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
            Morphology describes shape. Rhythmicity describes repetition.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {morphologyRows.map(([term, definition, example]) => (
              <div key={term} className="border border-[#D7E4E6] bg-white p-5">
                <p className="font-serif text-3xl text-[#2F6672]">{term}</p>
                <p className="mt-4 text-sm leading-7 text-[#52686E]">{definition}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#5E858C]">{example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#5E858C]">Noise</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">
              Not every waveform is cerebral.
            </h2>
            <p className="mt-7 text-lg font-light leading-9 text-[#52686E]">
              Artifact recognition protects the interpretation. Eye movement, muscle activity and electrical interference can all mimic or obscure brain rhythms.
            </p>
          </div>
          <div className="grid gap-4">
            {artifacts.map(([title, text]) => (
              <div key={title} className="border border-[#D7E4E6] bg-[#F7FAFA] p-6">
                <p className="font-serif text-4xl text-[#2F6672]">{title}</p>
                <p className="mt-4 text-sm leading-7 text-[#52686E]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#061215] px-5 py-20 text-white md:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-[#88B7A5]">Waveform checklist</p>
            <h2 className="mt-5 font-serif text-5xl leading-tight md:text-7xl">Before calling the pattern.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "Name the frequency band before interpreting the pattern.",
              "Separate true amplitude from display sensitivity.",
              "Describe morphology by phase and shape.",
              "Distinguish monomorphic rhythm from polymorphic slowing.",
              "Recognize sleep features before overcalling abnormality.",
              "Exclude eye, muscle and line-noise artifacts.",
            ].map((item) => (
              <div key={item} className="border border-white/10 bg-white/[0.035] p-5 text-sm leading-7 text-[#C9D9DD]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-7xl flex-wrap gap-4 text-[10px] uppercase tracking-[0.24em] text-[#88B7A5]">
          <a href="https://en.wikipedia.org/wiki/Electroencephalography" target="_blank" rel="noreferrer">
            Electroencephalography
          </a>
          <a href="https://en.wikipedia.org/wiki/10%E2%80%9320_system_(EEG)" target="_blank" rel="noreferrer">
            10-20 system
          </a>
        </div>
      </section>
    </main>
  );
}
