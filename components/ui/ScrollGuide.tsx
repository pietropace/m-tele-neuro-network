"use client";

import { Menu, X, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#top", label: "Top" },
  { href: "#network", label: "Network" },
  { href: "#team", label: "Team" },
  { href: "#updates", label: "Updates" },
  { href: "#workflows", label: "Workflows" },
  { href: "#activity", label: "Activity" },
  { href: "#contact", label: "Contact" },
];

export default function ScrollGuide() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 520);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
        className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center border border-[#1F2F35]/10 bg-white/90 text-[#1F2F35] shadow-sm backdrop-blur md:hidden"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <nav className="fixed inset-x-4 top-20 z-50 border border-[#1F2F35]/10 bg-white/95 p-4 shadow-lg backdrop-blur md:hidden">
          <div className="grid gap-px bg-[#1F2F35]/10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="bg-white px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[#377082]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      <a
        href="#top"
        aria-label="Back to top"
        className={`fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center border border-[#1F2F35]/10 bg-[#1F2F35] text-white shadow-sm transition md:bottom-6 md:right-6 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp size={18} />
      </a>
    </>
  );
}
