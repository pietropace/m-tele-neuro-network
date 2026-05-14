export const metadata = {
  title: "Lucca 2026 | ICS Maugeri Tele-Neurophysiology Network",
  description: "Documento Lucca 2026 incorporato nel sito.",
};

const pdfPath = "/lucca2026.pdf";

export default function Lucca2026Page() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[rgba(31,47,53,0.08)] bg-white">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-dark)]">
              ICS Maugeri
            </p>
            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
              Lucca 2026
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded border border-[var(--line)] px-4 text-sm font-semibold text-[var(--accent-dark)] transition hover:border-[var(--accent-dark)] hover:bg-[rgba(44,93,107,0.06)]"
              href={pdfPath}
              target="_blank"
              rel="noreferrer"
            >
              Apri PDF
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded bg-[var(--accent-dark)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--accent)]"
              href={pdfPath}
              download
            >
              Scarica
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-[1600px] px-5 py-5 sm:px-8 lg:px-24">
        <div className="h-[calc(100vh-9rem)] min-h-[640px] overflow-hidden rounded border border-[rgba(31,47,53,0.08)] bg-white shadow-sm">
          <object
            className="h-full w-full"
            data={pdfPath}
            type="application/pdf"
          >
            <iframe
              className="h-full w-full"
              src={pdfPath}
              title="Lucca 2026 PDF"
            />
          </object>
        </div>
      </section>
    </main>
  );
}
