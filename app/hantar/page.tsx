import { PageHero } from "@/components/page-hero";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdG6edDZSUJj9YnG8E-uoNIUHr5syWsPcTjjY2WpWFdO4WO0g/viewform";

export default function Hantar() {
  return (
    <main>
      <PageHero
        eyebrow="PENYERTAAN 2026"
        title="Hantar penyertaan sekolah"
        description="Maklumat penyertaan direkodkan dalam Google Sheet dan semua dokumen serta video disimpan terus ke Google Drive urus setia."
      />
      <section className="shell py-10">
        <div className="card mx-auto max-w-3xl p-8 text-center sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-100 text-3xl">
            📁
          </span>
          <p className="eyebrow mt-7">GOOGLE DRIVE URUS SETIA</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Buka borang penghantaran rasmi</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Borang akan dibuka dalam tab baharu supaya proses log masuk akaun KPM dan muat naik fail ke Google Drive berjalan dengan sempurna.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-8 min-w-64"
          >
            Buka Google Form ↗
          </a>
          <p className="mt-5 text-sm font-semibold text-slate-500">
            Sila gunakan akaun Google KPM untuk menghantar dokumen dan video.
          </p>
        </div>
      </section>
    </main>
  );
}
