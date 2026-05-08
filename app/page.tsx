export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#041a32] text-white overflow-x-hidden snap-y snap-mandatory">

      {/* HERO */}
      <section className="relative min-h-screen snap-start flex items-center justify-center px-6 py-24 overflow-hidden">

        {/* glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,167,255,0.45),_transparent_40%)]" />

        {/* particles */}
        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 120 }).map((_, i) => (

            <div
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-cyan-300 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
                animationDelay: `${Math.random() * 6}s`,
              }}
            />

          ))}

        </div>

        <div className="relative z-10 max-w-5xl text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur mb-8">

            <div className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />

            <span className="text-sm tracking-wide text-cyan-100">
              ICS Maugeri IRCCS
            </span>

          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">

            Tele-Neurophysiology

            <span className="block text-cyan-300">
              Reporting Network
            </span>

          </h1>

          <p className="mt-8 text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">

            Interactive congress experience for the multicenter
            tele-neurophysiology rehabilitation workflow.

          </p>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">

            {[
              ["1048", "Remote Examinations"],
              ["6", "Connected Centers"],
              ["2018–2025", "Network Activity"],
              ["EEG · EMG · SEP · MEP", "Integrated Modalities"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6"
              >

                <div className="text-3xl md:text-4xl font-bold text-cyan-300">
                  {value}
                </div>

                <div className="mt-2 text-sm text-slate-300 uppercase tracking-wide leading-relaxed">
                  {label}
                </div>

              </div>

            ))}

          </div>

          <div className="mt-16 animate-bounce text-cyan-200 uppercase tracking-[0.3em] text-xs">
            Scroll to explore
          </div>

        </div>

      </section>

      {/* NETWORK EXPERIENCE */}
      <section className="relative min-h-screen snap-start flex items-center px-6 py-24 overflow-hidden">

        {/* glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,180,255,0.12),_transparent_60%)]" />

        {/* particles */}
        <div className="absolute inset-0 overflow-hidden">

          {Array.from({ length: 60 }).map((_, i) => (

            <div
              key={i}
              className="absolute w-[2px] h-[2px] rounded-full bg-cyan-200/70 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random(),
                animationDelay: `${Math.random() * 6}s`,
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

              The platform enables remote review, centralized reporting,
              digital archiving and specialist workflow redistribution across
              multiple rehabilitation centers in Italy.

            </p>

            <div className="mt-12 space-y-4">

              {[
                "EEG workflows",
                "ENG / EMG reporting",
                "SEP integration",
                "MEP integration",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-5 py-4"
                >

                  <div className="w-2 h-2 rounded-full bg-cyan-300" />

                  <span className="text-lg">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 bg-gradient-to-br from-[#0b2848] to-[#05111f]">

            {/* grid */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* nodes */}
            {[
              { name: 'Milano', x: '38%', y: '20%' },
              { name: 'Pavia', x: '42%', y: '33%' },
              { name: 'Montescano', x: '48%', y: '45%' },
              { name: 'Veruno', x: '50%', y: '12%' },
              { name: 'Telese', x: '55%', y: '72%' },
              { name: 'Bari', x: '72%', y: '82%' },
            ].map((node) => (

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
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-400/10 blur-3xl" />

          </div>

        </div>

      </section>

    </main>
  )
}
