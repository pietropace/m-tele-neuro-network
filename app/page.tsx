import Image from "next/image"

export default function HomePage() {

  const metrics = [
    ["1048", "remote examinations"],
    ["6", "connected centers"],
    ["2018–2025", "network activity"],
    ["EEG · EMG · SEP · MEP", "integrated modalities"],
  ]

  const nodes = [
    { name: "Veruno", top: "18%", left: "56%" },
    { name: "Milano", top: "30%", left: "46%" },
    { name: "Pavia", top: "42%", left: "50%" },
    { name: "Montescano", top: "54%", left: "52%" },
    { name: "Telese", top: "74%", left: "58%" },
    { name: "Bari", top: "84%", left: "74%" },
  ]

  return (
    <main className="bg-[#F5F7F8] text-[#1F2F35] overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-8 py-20 overflow-hidden bg-[#F5F7F8]">

        {/* soft atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(111,169,184,0.10),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(55,112,130,0.06),transparent_40%)]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(31,47,53,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(31,47,53,0.4)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">

          {/* top bar */}
          <div className="flex items-center justify-between mb-24">

            <div className="flex items-center gap-5">

              <Image
                src="/maugeri-logo.png"
                alt="Maugeri"
                width={180}
                height={60}
                priority
              />

            </div>

            <div className="uppercase tracking-[0.3em] text-xs text-[#7A8E95]">
              Tele-Neurophysiology Network
            </div>

          </div>

          {/* title */}
          <div className="max-w-5xl">

            <h1 className="text-[4rem] md:text-[7rem] leading-[0.92] font-semibold tracking-[-0.04em] text-[#1F2F35]">

              A digital multicenter
              rehabilitation infrastructure.

            </h1>

            <p className="mt-10 text-xl md:text-2xl leading-relaxed text-[#7A8E95] max-w-3xl">

              Interactive congress experience for the multicenter
              tele-neurophysiology workflow developed within
              ICS Maugeri IRCCS.

            </p>

          </div>

          {/* metrics */}
          <div className="mt-24 grid md:grid-cols-4 gap-10 border-t border-[#D9E5E8] pt-10">

            {metrics.map(([value, label]) => (

              <div key={label}>

                <div className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-[#377082]">
                  {value}
                </div>

                <div className="mt-3 uppercase tracking-[0.2em] text-xs text-[#7A8E95] leading-relaxed">
                  {label}
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* NETWORK SECTION */}
      <section className="relative min-h-screen flex items-center px-8 py-24 bg-[#FFFFFF] overflow-hidden">

        {/* subtle background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(111,169,184,0.08),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT */}
          <div>

            <div className="uppercase tracking-[0.3em] text-xs text-[#377082] mb-8">
              Distributed Infrastructure
            </div>

            <h2 className="text-[3.5rem] md:text-[5rem] leading-[0.95] font-semibold tracking-[-0.05em] text-[#1F2F35]">

              A multicenter
              tele-neurophysiology
              network.

            </h2>

            <p className="mt-10 text-xl leading-relaxed text-[#7A8E95] max-w-xl">

              Remote review, centralized reporting and digital archiving
              across multiple rehabilitation centers in Italy.

            </p>

            {/* timeline */}
            <div className="mt-20">

              <div className="flex justify-between text-sm text-[#7A8E95] mb-5">
                <span>2018</span>
                <span>2025</span>
              </div>

              <div className="relative h-[2px] bg-[#D9E5E8] overflow-visible">

                <div className="absolute inset-y-0 left-0 w-[92%] bg-[#377082]" />

                <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#377082]" />

              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">

                {[
                  ["2018", "Network activation"],
                  ["2021", "Workflow scale-up"],
                  ["2025", "1048 examinations"],
                ].map(([year, label]) => (

                  <div
                    key={year}
                    className="border-t border-[#D9E5E8] pt-4"
                  >

                    <div className="text-2xl font-semibold text-[#377082]">
                      {year}
                    </div>

                    <div className="mt-2 text-sm leading-relaxed text-[#7A8E95]">
                      {label}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative aspect-square rounded-[3rem] border border-[#D9E5E8] bg-[#F5F7F8] overflow-hidden">

            {/* Italy silhouette */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">

              <div className="text-[24rem] leading-none">
                🇮🇹
              </div>

            </div>

            {/* grid */}
            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(31,47,53,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(31,47,53,0.4)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* nodes */}
            {nodes.map((node) => (

              <div
                key={node.name}
                className="absolute"
                style={{
                  top: node.top,
                  left: node.left,
                }}
              >

                <div className="w-4 h-4 rounded-full bg-[#377082]" />

                <div className="mt-3 text-sm text-[#2C5D6B] whitespace-nowrap">
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
