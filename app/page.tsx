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
    <main className="min-h-screen bg-[#041a32] text-white overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,167,255,0.35),transparent_40%)]" />

        <div className="relative z-10 max-w-5xl text-center">

          <div className="text-cyan-300 uppercase tracking-[0.3em] text-sm">
            ICS Maugeri IRCCS
          </div>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
            Tele-Neurophysiology
            <span className="block text-cyan-300">
              Reporting Network
            </span>
          </h1>

          <p className="mt-8 text-xl text-slate-300 max-w-3xl mx-auto">
            Interactive congress experience for the multicenter
            tele-neurophysiology rehabilitation workflow.
          </p>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">

            {[
              ["1048", "Remote Examinations"],
              ["6", "Connected Centers"],
              ["2018–2025", "Network Activity"],
              ["EEG · EMG · SEP · MEP", "Integrated Modalities"],
            ].map(([value, label]) => (

              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="text-3xl font-bold text-cyan-300">
                  {value}
                </div>

                <div className="mt-2 text-sm text-slate-300 uppercase">
                  {label}
                </div>
              </div>

            ))}

          </div>

        </div>
      </section>

      {/* NETWORK */}
      <section className="relative min-h-screen flex items-center px-6 py-24">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

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

            <p className="mt-8 text-xl text-slate-300 leading-relaxed">
              Remote review, centralized reporting and digital archiving
              across multiple rehabilitation centers in Italy.
            </p>

          </div>

          <div className="relative aspect-square rounded-[3rem] border border-white/10 bg-gradient-to-br from-[#0b2848] to-[#05111f] overflow-hidden">

            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {nodes.map((node) => (

              <div
                key={node.name}
                className="absolute"
                style={{
                  left: node.x,
                  top: node.y,
                }}
              >

                <div className="w-5 h-5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.8)] animate-pulse" />

                <div className="mt-3 text-sm text-cyan-100">
                  {node.name}
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  )
}
