import { useMemo, useState } from "react";
import { Image, Music2, Video } from "lucide-react";
import { MediaPlayer } from "@/components/MediaPlayer";

const gallery = [
  "/covers/cover-frontend.svg",
  "/covers/cover-backend.svg",
  "/covers/cover-analytics.svg",
  "/covers/cover-ia.svg",
];

export function CampusMediaShowcase() {
  const [index, setIndex] = useState(0);
  const active = useMemo(() => gallery[index % gallery.length], [index]);

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border border-ut-border/40 bg-black/30 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-300"><Image size={14} /> Galería visual de programas</div>
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <img src={active} alt="Vista de programa UTAMV" className="h-56 w-full object-cover" />
        </div>
        <div className="mt-3 flex gap-2">
          {gallery.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`h-2 w-10 rounded-full ${i===index ? "bg-ut-accent" : "bg-slate-600"}`} aria-label={`Ver imagen ${i+1}`} />
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-ut-border/40 bg-black/30 p-4">
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-300"><Video size={14} /> Demo audiovisual campus</div>
        <MediaPlayer
          title="Campus UTAMV Demo"
          videoUrl="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          audioUrl="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
          transcript="Demo multimedia para validar reproducción de video, audio y subtítulos en el entorno Campus."
        />
        <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400"><Music2 size={12} /> Integración audiovisual activa en dashboard.</div>
      </article>
    </section>
  );
}
