"use client";

import { FormEvent, useEffect, useState } from "react";
import { Icon } from "./icons";

const ADMIN_CREDENTIAL_HASH = "e838a10cb1723f2dcf742e9d068ac80e75c58de2b09a6b2e5efa51f201d33ce7";
const ADMIN_SESSION = "pidato_admin_google_sheet";
const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1waADxUkNfe2N-KqwmlOUTf4iGtYcQu-bMl9Y2IOsGTM/edit";

export function AdminDashboard() {
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setSignedIn(sessionStorage.getItem(ADMIN_SESSION) === "active");
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const username = String(form.get("username") ?? "").trim();
    const password = String(form.get("password") ?? "");

    const credentialBytes = new TextEncoder().encode(`${username}:${password}`);
    const digest = await crypto.subtle.digest("SHA-256", credentialBytes);
    const credentialHash = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");

    if (credentialHash === ADMIN_CREDENTIAL_HASH) {
      sessionStorage.setItem(ADMIN_SESSION, "active");
      setSignedIn(true);
    } else {
      setError("Nama pengguna atau kata laluan tidak sah.");
    }
    setBusy(false);
  }

  function logout() {
    sessionStorage.removeItem(ADMIN_SESSION);
    setSignedIn(false);
  }

  if (!signedIn) {
    return (
      <section className="grid min-h-[calc(100vh-80px)] place-items-center bg-[#062b3e] px-4 py-12">
        <form onSubmit={login} className="card w-full max-w-md p-8">
          <span className="grid h-13 w-13 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
            <Icon name="shield" />
          </span>
          <p className="eyebrow mt-7">AKSES URUS SETIA</p>
          <h1 className="mt-2 text-3xl font-black">Log masuk admin</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Log masuk untuk membuka rekod rasmi dalam Google Sheet urus setia.
          </p>
          <div className="mt-7 space-y-4">
            <label>
              <span className="label">Nama pengguna</span>
              <input className="field" name="username" autoComplete="username" required />
            </label>
            <label>
              <span className="label">Kata laluan</span>
              <input className="field" type="password" name="password" autoComplete="current-password" required />
            </label>
          </div>
          {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}
          <button disabled={busy} className="btn btn-primary mt-5 w-full">
            {busy ? "Menyemak…" : "Log masuk"}<Icon name="arrow" />
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="shell py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">PANEL URUS SETIA</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Rekod Google Sheet</h1>
          <p className="mt-2 text-slate-500">Disambungkan kepada makmal.11-7200@moe-dl.edu.my</p>
        </div>
        <button className="btn btn-light" onClick={logout}>Log keluar</button>
      </div>

      <div className="card mt-8 overflow-hidden p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-50 text-cyan-700">
              <Icon name="shield" />
            </span>
            <h2 className="mt-5 text-2xl font-black">Template Pidato Duo Sabah 2026</h2>
            <p className="mt-2 max-w-2xl leading-7 text-slate-600">
              Semak penyertaan, kemas kini status, buka pautan dokumen dan urus catatan terus dalam Google Sheet rasmi.
            </p>
            <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              Pastikan Google dibuka menggunakan akaun makmal.11-7200@moe-dl.edu.my untuk akses penyuntingan.
            </p>
          </div>
          <a className="btn btn-primary min-w-52" href={GOOGLE_SHEET_URL} target="_blank" rel="noreferrer">
            Buka Google Sheet <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
