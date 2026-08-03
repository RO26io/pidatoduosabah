import { PageHero } from "@/components/page-hero";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdG6edDZSUJj9YnG8E-uoNIUHr5syWsPcTjjY2WpWFdO4WO0g/viewform?embedded=true";

export default function Hantar() {
  return (
    <main>
      <PageHero
        eyebrow="PENYERTAAN 2026"
        title="Hantar penyertaan sekolah"
        description="Maklumat penyertaan direkodkan dalam Google Sheet dan semua dokumen serta video disimpan terus ke Google Drive urus setia."
      />
      <section className="shell py-10">
        <div className="card overflow-hidden p-2 sm:p-4">
          <iframe
            src={GOOGLE_FORM_URL}
            title="Borang Penyertaan Pidato Duo Sabah 2026"
            className="min-h-[1200px] w-full rounded-2xl border-0"
            loading="eager"
          >
            Memuatkan borang penyertaan…
          </iframe>
        </div>
      </section>
    </main>
  );
}
