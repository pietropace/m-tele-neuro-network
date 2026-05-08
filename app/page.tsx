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
    <main className="min-h-screen bg-[#041a32] text-white overflow-x-hidden snap-y snap-mandatory scroll-smooth">

      {/* HERO */}
      <section className="relative min-h-screen snap-start flex items-center justify-center px-6 overflow-hidden">

        {/* cinematic gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,167,255,0.45),transparent_40%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,255,255,0.08),transparent_35%)]" />

        {/* particles */}
        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 120 }).map((_, i) => (

            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-cyan-300 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
                animationDelay: `${Math.random() * 6}s`,
              }}
            />

          ))}

        </div>

        <div className="relative z-10 max-w-6xl text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur mb-8">

            <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />

            <span className="text-sm tracking-[0.25em] text-cyan-100 uppercase">
              ICS Maugeri IRCCS
            </span>

          </div>

          <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] tracking-tight">

            Tele-Neurophysiology

            <span className="block text-cyan-300">
              Reporting Network
            </span>

          </h1>

          <p className="mt-10 text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">

            Interactive congress experience for the multicenter
            tele-neurophysiology rehabilitation workflow developed within
            ICS Maugeri.

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
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 hover:bg-white/10 transition-all duration-500"
              >

                <div className="text-3xl md:text-4xl font-bold text-cyan-300">
                  {value}
                </div>

                <div className="mt-3 text-sm text-slate-300 uppercase tracking-wide leading-relaxed">
                  {label}
                </div>

              </div>

            ))}

          </div>

          <div className="mt-20 animate-bounce text-cyan-200 uppercase tracking-[0.35em] text-xs">
            Scroll to explore
          </div>

        </div>

      </section>

      {/* NETWORK EXPERIENCE */}
      <section className="relative min-h-screen snap-start flex items-center px-6 py-24 overflow-hidden">

        {/* glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.12),transparent_60%)]" />

        <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] rounded-full bg-cyan-400/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />

        {/* floating particles */}
        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 80 }).map((_, i) => (

            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-cyan-200/70 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
                animationDelay: `${Math.random() * 8}s`,
              }}
            />

          ))}

        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="uppercase tracking-[0.3em] text-cyan-300 text-sm mb-5">
              Distributed Infrastructure
            </div>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight">

              A multicenter

              <span className="block text-cyan-300">
                tele-neurophysiology network.
              </span>

            </h2>

            <p className="mt-8 text-xl text-slate-300 leading-relaxed max-w-2xl">

              Remote review, centralized reporting and digital archiving
              across multiple rehabilitation centers in Italy.

            </p>

            {/* timeline */}
            <div className="mt-16">

              <div className="flex justify-between text-sm uppercase tracking-wide text-cyan-200 mb-4">
                <span>2018</span>
                <span>2025</span>
              </div>

              <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">

                <div className="absolute inset-y-0 left-0 w-[92%] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />

                <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cyan-300 shadow-[0_0_25px_rgba(0,255,255,0.9)] animate-pulse" />

              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">

                {[
                  ["2018", "Network activation"],
                  ["2021", "Workflow scale-up"],
                  ["2025", "1048 exams"],
                ].map(([year, label]) => (

                  <div
                    key={year}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >

                    <div className="text-cyan-300 font-bold text-lg">
                      {year}
                    </div>

                    <div className="mt-2 text-sm text-slate-300">
                      {label}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-[#0b2848] to-[#05111f]">

            {/* Italy silhouette */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10">

              <div className="text-[22rem] leading-none">
                🇮🇹
              </div>

            </div>

            {/* grid */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

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

                  <div className="absolute inset-0 rounded-full bg-cyan-300 animate-ping" />

                  <div className="relative z-10 w-5 h-5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.8)]" />

                </div>

                <div className="mt-3 text-sm text-cyan-100 whitespace-nowrap tracking-wide">
                  {node.name}
                </div>

              </div>

            ))}

            {/* center glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />

          </div>

        </div>

      </section>

    </main>
  )
}
