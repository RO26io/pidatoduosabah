"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "./icons";

type GalleryItem = {
  id: string;
  district: string;
  school_name: string;
  participant1_name: string;
  participant2_name: string;
  video_url: string;
  status: string;
  created_at: string;
};

type GalleryResponse = {
  ok: boolean;
  items?: GalleryItem[];
  error?: string;
};

const appsScriptUrl =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ??
  "https://script.google.com/macros/s/AKfycbx6R0BbWkE4--1kxi-y4K9uz1KDpzP3Aeoj-UMDc-SClKGHgI1GfnZCu1-rfOWprYYxlw/exec";

function driveFileId(url: string) {
  return (
    url.match(/\/d\/([^/]+)/)?.[1] ??
    url.match(/[?&]id=([^&]+)/)?.[1] ??
    ""
  );
}

function drivePreviewUrl(url: string) {
  const fileId = driveFileId(url);
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : "";
}

export function VideoGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState("Semua Daerah");
  const [sort, setSort] = useState("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!appsScriptUrl) {
        setError("Sambungan galeri belum dikonfigurasi.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(appsScriptUrl, { cache: "no-store" });
        const payload = (await response.json()) as GalleryResponse;
        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || "Galeri tidak dapat dimuatkan.");
        }
        setItems(payload.items ?? []);
      } catch (reason) {
        setError(
          reason instanceof Error
            ? reason.message
            : "Galeri tidak dapat dimuatkan.",
        );
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const districts = [
    "Semua Daerah",
    ...Array.from(new Set(items.map((item) => item.district).filter(Boolean))),
  ];

  const shown = useMemo(
    () =>
      items
        .filter(
          (item) =>
            (district === "Semua Daerah" || item.district === district) &&
            [
              item.school_name,
              item.participant1_name,
              item.participant2_name,
              item.district,
            ]
              .join(" ")
              .toLowerCase()
              .includes(q.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "old"
            ? +new Date(a.created_at) - +new Date(b.created_at)
            : sort === "az"
              ? a.school_name.localeCompare(b.school_name)
              : +new Date(b.created_at) - +new Date(a.created_at),
        ),
    [items, q, district, sort],
  );

  return (
    <section className="shell py-12">
      <div className="card mb-8 grid gap-3 p-4 md:grid-cols-[1fr_220px_200px]">
        <label className="relative">
          <Icon
            name="search"
            className="absolute left-4 top-3.5 h-5 w-5 text-slate-400"
          />
          <input
            className="field pl-12"
            placeholder="Cari sekolah, peserta atau daerah…"
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />
        </label>
        <select
          className="field"
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
        >
          {districts.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <select
          className="field"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="new">Terbaharu</option>
          <option value="old">Terlama</option>
          <option value="az">Nama sekolah A–Z</option>
        </select>
      </div>

      {loading ? (
        <p className="py-20 text-center font-bold text-slate-400">
          Memuatkan persembahan…
        </p>
      ) : error ? (
        <div className="card py-20 text-center">
          <h2 className="text-2xl font-black">Galeri belum dapat dimuatkan</h2>
          <p className="mt-2 text-slate-500">{error}</p>
        </div>
      ) : shown.length === 0 ? (
        <div className="card py-20 text-center">
          <h2 className="text-2xl font-black">Tiada video diluluskan</h2>
          <p className="mt-2 text-slate-500">
            Video akan dipaparkan selepas Status ditetapkan kepada Diluluskan.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => {
            const previewUrl = drivePreviewUrl(item.video_url);
            return (
              <article className="card overflow-hidden" key={item.id}>
                <div className="relative aspect-video bg-gradient-to-br from-cyan-900 to-slate-900">
                  {previewUrl ? (
                    <iframe
                      className="h-full w-full border-0"
                      src={previewUrl}
                      title={`Video ${item.school_name}`}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                    />
                  ) : item.video_url ? (
                    <video
                      className="h-full-w-full object-cover"
                      controls
                      preload="metadata"
                      src={item.video_url}
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-white/80">
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15">
                        <Icon name="play" className="h-7 w-7" />
                      </span>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                    {item.district}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-black leading-tight">
                    {item.school_name}
                  </h2>
                  <div className="mt-4 space-y-2 text-sm text-slate-500">
                    <p>
                      <b className="text-slate-700">Pemidato:</b>{" "}
                      {item.participant1_name} &amp; {item.participant2_name}
                    </p>
                    <p>
                      {new Intl.DateTimeFormat("ms-MY", {
                        dateStyle: "long",
                      }).format(new Date(item.created_at))}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
