import Image from "next/image"

export default function HomePage() {
  return (
    <main className="bg-[#F5F7F8] text-[#1F2F35] overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden px-10 py-10">

        {/* soft atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,143,163,0.10),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(55,112,130,0.06),transparent_40%)]" />

        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(31,47,53,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(31,47,53,0.5)_1px,transparent_1px)] bg-[size:70px_70px]" />

        <div className="relative z-10 max-w-[1500px] mx-auto">

          {/* top bar */}
          <div className="flex items-center justify-between">

            <Image
              src="/maugeri-logo.png"
              alt="Maugeri"
              width={210}
              height={70}
              priority
              className="opacity-95"
            />

            <div className="uppercase tracking-[0.35em] text-xs text-[#377082]">
              Tele-Neurophysiology Network
            </div>

          </div>

          {/* hero layout */}
          <div className="mt-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">

            {/* LEFT */}
            <div>

              <h1 className="text-[4.8rem] md:text-[7.4rem] leading-[0.88] tracking-[-0.07em] font-serif text-[#1F2F35]">

                A digital
                multicenter
                rehabilitation
                infrastructure.

              </h1>

              <p className="mt-10 text-[1.35rem] leading-relaxed text-[#7A8E95] max-w-2xl">

                Interactive congress experience for the multicenter
                tele-neurophysiology workflow developed within
                ICS Maugeri IRCCS.

              </p>

              {/* metrics */}
              <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-[#D9E5E8] pt-10">

                {[
                  ["1048", "REMOTE EXAMINATIONS"],
                  ["6", "CONNECTED CENTERS"],
                  ["2018–2025", "NETWORK ACTIVITY"],
                ].map(([value, label]) => (

                  <div key={label}>

                    <div className="text-[3.3rem] leading-none tracking-[-0.05em] font-serif text-[#377082]">
                      {value}
                    </div>

                    <div className="mt-3 text-[11px] uppercase tracking-[0.24em] leading-relaxed text-[#7A8E95]">
                      {label}
                    </div>

                  </div>

                ))}

                {/* modalities */}
                <div>

                  <div className="text-[11px] uppercase tracking-[0.24em] text-[#7A8E95] mb-5">
                    Integrated Modalities
                  </div>

                  <div className="flex gap-6">

                    {[
                      ["EEG", "◌"],
                      ["EMG", "∿"],
                      ["SEP", "⌇"],
                      ["MEP", "◎"],
                    ].map(([label, icon]) => (

                      <div
                        key={label}
                        className="flex flex-col items-center"
                      >

                        <div className="text-[2rem] text-[#377082]">
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

            {/* RIGHT VISUAL */}
            <div className="relative h-[760px]">

              {/* neural atmosphere */}
              <svg
                viewBox="0 0 900 900"
                className="absolute inset-0 w-full h-full opacity-[0.55]"
              >

                <g
                  stroke="#6FA9B8"
                  strokeWidth="1.2"
                  fill="none"
                >

                  <path d="M430 170 C560 220 650 320 720 450" />
                  <path d="M430 170 C370 250 330 350 340 470" />
                  <path d="M340 470 C420 520 510 590 560 700" />
                  <path d="M720 450 C640 530 610 620 560 700" />
                  <path d="M340 470 C260 510 180 570 120 680" />

                  {[
                    [430,170],
                    [720,450],
                    [340,470],
                    [560,700],
                    [120,680],
                    [520,320],
                    [610,550],
                    [260,590],
                  ].map(([x,y], i) => (

                    <g key={i}>
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill="#377082"
                      />

                      <circle
                        cx={x}
                        cy={y}
                        r="26"
                        stroke="#6FA9B8"
                        opacity="0.18"
                      />
                    </g>

                  ))}

                </g>

              </svg>

            </div>

          </div>

        </div>

      </section>

      {/* NETWORK SECTION */}
      <section className="relative min-h-screen bg-white px-10 py-28 overflow-hidden">

        <div className="relative z-10 max-w-[1500px] mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="uppercase tracking-[0.35em] text-[11px] text-[#377082] mb-8">
              Distributed Infrastructure
            </div>

            <h2 className="text-[4rem] md:text-[5.4rem] leading-[0.92] tracking-[-0.06em] font-serif text-[#1F2F35]">

              A multicenter
              tele-neurophysiology
              network.

            </h2>

            <p className="mt-10 text-[1.3rem] leading-relaxed text-[#7A8E95] max-w-xl">

              Remote review, centralized reporting and digital archiving
              across multiple rehabilitation centers in Italy.

            </p>

            {/* editorial timeline */}
            <div className="mt-24 space-y-14">

              {[
                [
                  "2018",
                  "NETWORK ACTIVATION",
                  "Start of the tele-neurophysiology multicenter program.",
                ],
                [
                  "2021",
                  "WORKFLOW SCALE-UP",
                  "Expansion of remote review activities and integration of new modalities.",
                ],
                [
                  "2025",
                  "1048 EXAMINATIONS",
                  "Consolidated network with continuous quality improvement.",
                ],
              ].map(([year, title, desc]) => (

                <div
                  key={year}
                  className="grid grid-cols-[90px_1fr] gap-8"
                >

                  <div className="text-[3rem] leading-none tracking-[-0.05em] font-serif text-[#377082]">
                    {year}
                  </div>

                  <div className="border-l border-[#D9E5E8] pl-8">

                    <div className="text-sm tracking-[0.18em] uppercase text-[#377082]">
                      {title}
                    </div>

                    <p className="mt-4 text-[#7A8E95] leading-relaxed">
                      {desc}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT MAP */}
          <div className="relative h-[900px]">

            {/* Italy SVG */}
            <svg
              viewBox="0 0 700 1100"
              className="absolute inset-0 w-full h-full"
            >

              {/* Italy silhouette */}
              <path
                d="M381 58
                C442 94 503 121 528 176
                C545 214 531 254 544 303
                C563 374 628 412 628 470
                C628 531 596 585 559 622
                C526 654 514 692 518 746
                C522 802 504 856 464 902
                C432 938 403 975 361 1015
                C327 1045 291 1057 258 1045
                C216 1029 197 997 205 947
                C216 882 212 841 176 787
                C140 734 97 688 86 626
                C73 553 107 505 152 470
                C197 435 227 400 229 354
                C232 297 189 248 199 188
                C208 133 257 108 309 81
                C336 67 356 60 381 58Z"
                fill="#F5F7F8"
                stroke="#D9E5E8"
                strokeWidth="2"
              />

              {/* Sardinia */}
              <path
                d="M130 810
                C150 820 161 844 156 874
                C151 904 132 926 112 922
                C90 917 83 892 89 862
                C95 831 111 806 130 810Z"
                fill="#F5F7F8"
                stroke="#D9E5E8"
                strokeWidth="2"
              />

              {/* Sicily */}
              <path
                d="M395 1010
                C444 1005 480 1015 500 1038
                C472 1054 425 1062 381 1052
                C354 1046 343 1028 395 1010Z"
                fill="#F5F7F8"
                stroke="#D9E5E8"
                strokeWidth="2"
              />

              {/* network lines */}
              <g
                stroke="#377082"
                strokeWidth="2.5"
                fill="none"
              >

                <path d="M360 170 C380 240 390 310 395 400" />
                <path d="M395 400 C410 500 430 620 465 770" />

              </g>

              {/* nodes */}
              {[
                ["Veruno", 360, 170],
                ["Milano", 325, 290],
                ["Pavia", 395, 400],
                ["Montescano", 430, 560],
                ["Telese", 465, 770],
                ["Bari", 570, 840],
              ].map(([label, x, y]) => (

                <g key={label}>

                  <circle
                    cx={x}
                    cy={y}
                    r="9"
                    fill="#377082"
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r="28"
                    fill="none"
                    stroke="#6FA9B8"
                    opacity="0.25"
                  />

                  <text
                    x={Number(x) + 22}
                    y={Number(y) + 8}
                    fontSize="22"
                    fill="#2C5D6B"
                    fontFamily="sans-serif"
                  >
                    {label}
                  </text>

                </g>

              ))}

            </svg>

          </div>

        </div>

      </section>

    </main>
  )
}
