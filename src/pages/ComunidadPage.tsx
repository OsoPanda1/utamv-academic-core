import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UTAMV_REAL_IMAGE_GALLERY } from "@/lib/realImageGallery";

type FeedItem = { title: string; link: string; pubDate: string; description: string; author: string };

const groupsLinks = [
  { label: "Suscribirse al grupo", url: "mailto:TAMVONLINE-ECOSISTEM-LATAM+subscribe@groups.io" },
  { label: "Página del grupo", url: "https://groups.io/g/TAMVONLINE-ECOSISTEM-LATAM" },
  { label: "Ayuda", url: "mailto:TAMVONLINE-ECOSISTEM-LATAM+help@groups.io" },
  { label: "Darse de baja", url: "mailto:TAMVONLINE-ECOSISTEM-LATAM+unsubscribe@groups.io" },
];

export default function ComunidadPage() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.functions.invoke("tamv-rss-feed");
      setItems(((data as any)?.items ?? []) as FeedItem[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-gradient-to-br from-[#000033] via-[#05054d] to-[#00001a] text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-cover bg-center" style={{ backgroundImage: `url(${UTAMV_REAL_IMAGE_GALLERY.teamwork})` }} />
        <div className="relative z-10 max-w-5xl mx-auto">
          <Badge className="bg-[#D4AF37] text-black mb-4">Comunidad TAMV</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Ecosistema TAMV Online · LATAM
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Nodo de coordinación técnica y académica del kernel Isabella IA, MD-X4/X5 y la wiki abierta TAMV.
            Únete al grupo oficial y consulta el canon vivo del ecosistema.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {groupsLinks.map((l) => (
              <Button key={l.url} variant="outline" asChild
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black">
                <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="font-display text-2xl font-bold mb-6">Wiki & comunicados oficiales</h2>
        {loading && <p className="text-muted-foreground">Cargando feed…</p>}
        <div className="space-y-4">
          {items.map((it) => (
            <Card key={it.link}>
              <CardHeader>
                <CardTitle className="text-base">
                  <a href={it.link} target="_blank" rel="noreferrer" className="hover:underline">{it.title}</a>
                </CardTitle>
                <p className="text-xs text-muted-foreground">{it.pubDate} · {it.author}</p>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none line-clamp-6"
                  dangerouslySetInnerHTML={{ __html: it.description }} />
              </CardContent>
            </Card>
          ))}
          {!loading && items.length === 0 && (
            <p className="text-muted-foreground">No fue posible cargar el feed en este momento.</p>
          )}
        </div>
      </section>
    </div>
  );
}
