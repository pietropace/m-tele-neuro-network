import Image from "next/image"

export default function HomePage() {

  const metrics = [
    ["1048", "REMOTE EXAMINATIONS"],
    ["6", "CONNECTED CENTERS"],
    ["2018–2025", "NETWORK ACTIVITY"],
  ]

  const modalities = [
    ["🧠", "EEG"],
    ["〰️", "EMG"],
    ["🦴", "SEP"],
    ["🧠", "MEP"],
  ]

  return (
    <main className="min-h-screen bg-[#F5F7F8] overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden px-8 py-12">

        {/* background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(111,169,184,0.12),transparent_40%)]" />

        {/* neural bg */}
        <div className="absolute right-[-10%] top-[10%] w-[900px] h-[900px] opacity-[0.12]">

          <svg
            viewBox="0 0 800 800"
            className="w-full h-full"
          >

            <g stroke="#377082" strokeWidth="1" fill="none">

              <path d="M400 120 C480 180 540 260 560 340" />
              <path d="M400 120 C330 180 280 260 260 340" />
              <path d="M400 120 C420 220 430 320 420 420" />
              <path d="M560 340 C640 360 700 420 740 500" />
              <path d="M260 340 C180 360 120 420 80 500" />

              {[...Array(40)].map((_, i) => (
                <circle
                  key={i}
                  cx={Math.random() * 800}
                  cy={Math.random() * 800}
                  r="2"
                  fill="#377082"
                />
              ))}

            </g>

          </svg>

        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* top */}
          <div className="flex items-center justify-between">

            <Image
              src="/maugeri-logo.png"
              alt="Maugeri"
              width={220}
              height={80}
              priority
            />

            <div className="uppercase tracking-[0.35em] text-xs text-[#377082]">
              TELE-NEUROPHYSIOLOGY NETWORK
            </div>

          </div>

          {/* hero content */}
          <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <h1 className="text-[4rem] md:text-[6.8rem] leading-[0.9] tracking-[-0.06em] font-serif text-[#1F2F35]">

                A digital
                multicenter
                rehabilitation
                infrastructure.

              </h1>

              <p className="mt-10 text-xl leading-relaxed text-[#7A8E95] max-w-xl">

                Interactive congress experience for the multicenter
                tele-neurophysiology workflow developed within
                ICS Maugeri IRCCS.

              </p>

            </div>

            {/* RIGHT */}
            <div className="relative h-[600px]" />

          </div>

          {/* metrics */}
          <div className="mt-24 border-t border-[#D9E5E8] pt-10 grid lg:grid-cols-4 gap-10">

            {metrics.map(([value, label]) => (

              <div key={label}>

                <div className="text-[3.5rem] leading-none tracking-[-0.05em] text-[#377082] font-serif">
                  {value}
                </div>

                <div className="mt-3 text-xs tracking-[0.2em] text-[#7A8E95] uppercase">
                  {label}
                </div>

              </div>

            ))}

            {/* modalities */}
            <div>

              <div className="text-xs tracking-[0.2em] text-[#7A8E95] uppercase mb-5">
                Integrated Modalities
              </div>

              <div className="flex gap-8">

                {modalities.map(([icon, label]) => (

                  <div
                    key={label}
                    className="flex flex-col items-center"
                  >

                    <div className="text-3xl text-[#377082]">
                      {icon}
                    </div>

                    <div className="mt-2 text-sm text-[#377082]">
                      {label}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}
