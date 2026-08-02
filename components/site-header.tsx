"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";

const links = [
  ["/", "Utama"],
  ["/hantar", "Hantar Penyertaan"],
  ["/tayangan", "Tayangan Video"],
];

export function SiteHeader() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="shell flex h-18 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <img
            src="/logo-pidato-duo.jpg"
            alt="Logo Pidato Duo Negeri Sabah"
            className="h-11 w-11 rounded-full border-2 border-amber-300 object-cover shadow-sm"
          />
          <span>
            <b className="block text-[15px] leading-none text-slate-900">PIDATO DUO</b>
            <small className="font-semibold text-slate-500">Sabah · 2026</small>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-xl px-4 py-2 text-sm font-bold no-underline ${
                path === href ? "bg-cyan-50 text-cyan-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/admin" className="btn btn-dark px-4 py-2.5 text-sm">
          <Icon name="shield" /> Admin
        </Link>
      </div>
    </header>
  );
}
