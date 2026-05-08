import Image from "next/image"

export default function HomePage() {

  const nodes = [
    { name: "Milano", x: "38%", y: "20%" },
    { name: "Pavia", x: "42%", y: "33%" },
    { name: "Montescano", x: "48%", y: "45%" },
    { name: "Veruno", x: "50%", y: "12%" },
    { name: "Telese", x: "55%", y: "72%" },
    { name: "Bari", x: "72%", y: "82%" },
  ]

  return (
    <main className="min-h-screen bg-[#F5F7F8] text-[#1F2F35] overflow-x-hidden snap-y snap-mandatory scroll-smooth">

      {/* HERO */}
      <section className="relative min-h-screen snap-start flex items-center justify-center px-6 overflow-hidden bg-gradient-to-br from-[#2C5D6B] via-[#377082] to-[#4A8FA3]">

        {/* soft glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(111,169,184,0.22),transparent_35%)]" />

        {/* particles */}
        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 70 }).map((_, i) => (

            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-white/40 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
                animationDelay: `${Math.random() * 8}s`,
              }}
            />

          ))}

        </div>

        <div className="relative z-10 max-w-6xl text-center text-white">

          {/* logo */}
          <div className="flex justify-center mb-12">

            <Image
              src="/maugeri-logo.png"
              alt="Maugeri"
              width={320}
              height={90}
              className="opacity-95"
            />

          </div>

          <div className="uppercase tracking-[0.35em] text-[#EAF3F5] text-sm">
            Tele-Neurophysiology Network
          </div>

          <h1 className="mt-6 text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">

            A Digital Multicenter
            <span className="block text-[#EAF3F5]">
              Rehabilitation Infrastructure
            </span>

          </h1>

          <p className="mt-10 text-xl md:text-2xl text-[#EAF3F5] max-w-4xl mx-auto leading-relaxed">

            Interactive congress experience for the multicenter
            tele-neurophysiology workflow developed within
            ICS Maugeri IRCCS.

          </p>

          {/* stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">

            {[
              ["1048", "Remote Examinations"],
              ["6", "Connected Centers"],
              ["2018–2025", "Network Activity"],
              ["EEG · EMG · SEP · MEP", "Integrated Modalities"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 hover:bg-white/15 transition-all duration-500"
              >

                <div className="text-3xl md:text-4xl font-bold text-white">
                  {value}
                </div>

                <div className="mt-3 text-sm text-[#EAF3F5] uppercase tracking-wide leading-relaxed">
                  {label}
                </div>

              </div>

            ))}

          </div>

          <div className="mt-20 animate-bounce text-[#EAF3F5] uppercase tracking-[0.35em] text-xs">
            Scroll to explore
          </div>

        </div>

      </section>

      {/* NETWORK */}
      <section className="relative min-h-screen snap-start flex items-center px-6 py-24 overflow-hidden bg-[#F5F7F8]">

        {/* background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,169,184,0.12),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="uppercase tracking-[0.3em] text-[#377082] text-sm mb-5">
              Distributed Infrastructure
            </div>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight text-[#1F2F35]">

              A multicenter
              <span className="block text-[#377082]">
                tele-neurophysiology network.
              </span>

            </h2>

            <p className="mt-8 text-xl text-[#7A8E95] leading-relaxed max-w-2xl">

              Remote review, centralized reporting and digital archiving
              across multiple rehabilitation centers in Italy.

            </p>

            {/* timeline */}
            <div className="mt-16">

              <div className="flex justify-between text-sm uppercase tracking-wide text-[#377082] mb-4">
                <span>2018</span>
                <span>2025</span>
              </div>

              <div className="relative h-3 rounded-full bg-[#D9E5E8] overflow-hidden">

                <div className="absolute inset-y-0 left-0 w-[92%] bg-gradient-to-r from-[#4A8FA3] to-[#377082] rounded-full" />

                <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#377082] shadow-[0_0_20px_rgba(55,112,130,0.5)] animate-pulse" />

              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">

                {[
                  ["2018", "Network activation"],
                  ["2021", "Workflow scale-up"],
                  ["2025", "1048 exams"],
                ].map(([year, label]) => (

                  <div
                    key={year}
                    className="rounded-2xl border border-[#D9E5E8] bg-white p-4 shadow-sm"
                  >

                    <div className="text-[#377082] font-bold text-lg">
                      {year}
                    </div>

                    <div className="mt-2 text-sm text-[#7A8E95]">
                      {label}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-[#D9E5E8] bg-white shadow-2xl">

            {/* background map mood */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">

              <div className="text-[22rem] leading-none">
                🇮🇹
              </div>

            </div>

            {/* subtle grid */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(44,93,107,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(44,93,107,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* nodes */}
            {nodes.map((node) => (

              <div
                key={node.name}
                className="absolute"
                style={{
                  left: node.x,
                  top: node.y,
                }}
              >

                <div className="relative">

                  <div className="absolute inset-0 rounded-full bg-[#4A8FA3] animate-ping" />

                  <div className="relative z-10 w-5 h-5 rounded-full bg-[#377082] shadow-[0_0_20px_rgba(55,112,130,0.45)]" />

                </div>

                <div className="mt-3 text-sm text-[#2C5D6B] whitespace-nowrap tracking-wide font-medium">
                  {node.name}
                </div>

              </div>

            ))}

            {/* central glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#6FA9B8]/20 blur-3xl" />

          </div>

        </div>

      </section>

    </main>
  )
}
