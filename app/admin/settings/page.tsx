import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { getSiteAccessMode } from "../../api/_lib/siteAccessStore";
import { updateSiteAccessMode } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const mode = await getSiteAccessMode();

  return (
    <main className="min-h-screen bg-[#F5F7F8] px-5 py-8 md:px-12 lg:px-24">
      <header className="flex items-center justify-between gap-6">
        <Link href="/admin" className="text-[10px] uppercase tracking-[0.32em] text-[#377082]">
          Admin
        </Link>
        <UserButton />
      </header>

      <section className="mt-20 max-w-4xl">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#7A8E95]">
          Settings
        </p>
        <h1 className="mt-5 font-serif text-[3.8rem] leading-[0.92] tracking-[-0.035em] text-[#1F2F35] md:text-[5.6rem]">
          Site availability
        </h1>
      </section>

      <form action={updateSiteAccessMode} className="mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
        {(["public", "private"] as const).map((value) => (
          <label
            key={value}
            className="thin-border block cursor-pointer bg-white/70 p-7 transition hover:bg-white"
          >
            <input
              type="radio"
              name="mode"
              value={value}
              defaultChecked={mode === value}
              className="sr-only peer"
            />
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A8E95]">
              {value === "public" ? "Public site" : "Private site"}
            </span>
            <span className="mt-5 block text-2xl font-light capitalize text-[#1F2F35]">
              {value}
            </span>
            <span className="mt-4 block text-sm leading-6 text-[#4F5E64]">
              {value === "public"
                ? "Accessible to everyone."
                : "Requires Clerk login across the site."}
            </span>
            <span className="mt-6 hidden h-px w-full bg-[#2C5D6B] peer-checked:block" />
          </label>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="thin-border bg-[#1F2F35] px-7 py-4 text-[10px] uppercase tracking-[0.28em] text-white transition hover:bg-[#2C5D6B]"
          >
            Save mode
          </button>
        </div>
      </form>
    </main>
  );
}
