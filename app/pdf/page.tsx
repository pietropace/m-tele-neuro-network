import Container from "@/components/ui/Container";
import PdfContactFooter from "@/components/sections/PdfContactFooter";
import type { Metadata } from "next";

const PDF_FILE_PATH = "/pdf/Tele-Neurophysiology-Poster.pdf";

export const metadata: Metadata = {
  title: "Tele-neurophysiology reporting network",
};

export default function PdfPage() {
  return (
    <main>
      <section className="bg-gradient-to-b from-[#EFF4F6] to-[#F5F7F8] pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#5A727A]">SINC 2026</p>
          <h1 className="mt-4 max-w-[24ch] font-serif text-[2.2rem] leading-[1.03] text-[#1F2F35] min-[380px]:text-[2.8rem] md:text-[4.2rem]">
            Tele-neurophysiology reporting network
          </h1>

          <div className="mt-8 overflow-hidden border border-[#D9E5E8] bg-white shadow-[0_24px_50px_rgba(31,47,53,0.08)]">
            <iframe
              src={PDF_FILE_PATH}
              title="Documento PDF"
              className="h-[68vh] min-h-[420px] w-full md:h-[76vh]"
            />
          </div>
        </Container>
      </section>

      <PdfContactFooter />
    </main>
  );
}