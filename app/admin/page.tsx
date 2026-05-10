import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { getSiteAccessMode } from "../api/_lib/siteAccessStore";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [user, mode] = await Promise.all([currentUser(), getSiteAccessMode()]);

  return (
    <main className="min-h-screen bg-[#F5F7F8] px-5 py-8 md:px-12 lg:px-24">
      <header className="flex items-center justify-between gap-6">
        <Link href="/" className="text-[10px] uppercase tracking-[0.32em] text-[#377082]">
          Tele-neurophysiology Network
        </Link>
        <UserButton />
      </header>

      <section className="mt-20 max-w-5xl">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#7A8E95]">
          Admin dashboard
        </p>
        <h1 className="mt-5 font-serif text-[4rem] leading-[0.92] tracking-[-0.035em] text-[#1F2F35] md:text-[6rem]">
          Clinical network controls
        </h1>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2">
        <div className="thin-border bg-white/70 p-7">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A8E95]">
            Session
          </p>
          <p className="mt-5 text-2xl font-light text-[#1F2F35]">
            {user?.firstName ?? user?.primaryEmailAddress?.emailAddress ?? "Authenticated user"}
          </p>
        </div>

        <Link href="/admin/settings" className="thin-border block bg-white/70 p-7 transition hover:bg-white">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#7A8E95]">
            Site access
          </p>
          <p className="mt-5 text-2xl font-light text-[#1F2F35]">
            {mode === "private" ? "Private" : "Public"}
          </p>
          <p className="mt-4 text-sm leading-6 text-[#4F5E64]">
            Manage public/private availability.
          </p>
        </Link>
      </section>
    </main>
  );
}
