"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
export function SiteHeader(){const path=usePathname(); const links=[["/","Utama"],["/hantar","Hantar Penyertaan"],["/tayangan","Tayangan Video"]]; return <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"><div className="shell flex h-18 items-center justify-between gap-5"><Link href="/" className="flex items-center gap-3 no-underline"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-700 text-white"><Icon name="school"/></span><span><b className="block text-[15px] leading-none text-slate-900">PIDATO DUO</b><small className="font-semibold text-slate-500">Sabah · 2026</small></span></Link><nav className="hidden items-center gap-1 md:flex">{links.map(([href,label])=><Link key={href} href={href} className={`rounded-xl px-4 py-2 text-sm font-bold no-underline ${path===href?'bg-cyan-50 text-cyan-700':'text-slate-600 hover:bg-slate-50'}`}>{label}</Link>)}</nav><Link href="/admin" className="btn btn-dark px-4 py-2.5 text-sm"><Icon name="shield"/> Admin</Link></div></header>}

