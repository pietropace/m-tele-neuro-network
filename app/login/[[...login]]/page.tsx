import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F5F7F8]">
      <section className="grid min-h-screen items-center gap-10 px-5 py-10 md:grid-cols-[1fr_420px] md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <Image
            src="/maugeri_official.png"
            alt="ICS Maugeri"
            width={170}
            height={77}
            priority
            className="h-16 w-auto object-contain"
          />
          <p className="mt-10 text-[10px] uppercase tracking-[0.32em] text-[#377082]">
            Admin access
          </p>
          <h1 className="mt-5 font-serif text-[4rem] leading-[0.92] tracking-[-0.035em] text-[#1F2F35] md:text-[6rem]">
            Tele-neurophysiology network
          </h1>
          <p className="mt-8 max-w-xl text-[1.1rem] font-light leading-[1.8] text-[#4F5E64]">
            Secure access for clinical network administration.
          </p>
        </div>

        <div className="flex justify-start md:justify-end">
          <SignIn
            routing="path"
            path="/login"
            fallbackRedirectUrl="/admin"
            oauthFlow="redirect"
            appearance={{
              elements: {
                rootBox: "w-full max-w-[420px]",
                cardBox: "shadow-none thin-border",
                card: "rounded-none",
              },
            }}
          />
        </div>
      </section>
    </main>
  );
}
