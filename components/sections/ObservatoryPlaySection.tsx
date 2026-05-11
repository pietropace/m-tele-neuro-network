import Link from "next/link";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

export default function ObservatoryPlaySection() {
  return (
    <section className="bg-[#061215] py-16 text-white md:py-24">
      <Container>
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#88B7A5]">
                Interactive lab
              </p>
              <h2 className="mt-5 max-w-4xl font-serif text-[3.2rem] leading-[0.92] tracking-normal md:text-[5.6rem]">
                Play the EEG Signal Stabilizer.
              </h2>
              <p className="mt-6 max-w-2xl text-[1rem] font-light leading-[1.8] text-[#C9D9DD] md:text-[1.25rem]">
                A minimal signal-control experience inspired by remote neurophysiology reporting.
              </p>
            </div>

            <Link
              href="/observatory/play"
              className="inline-flex min-h-12 items-center justify-center border border-white/20 bg-white px-6 py-4 text-[10px] uppercase tracking-[0.26em] text-[#061215] transition hover:bg-[#88B7A5]"
            >
              Play
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
