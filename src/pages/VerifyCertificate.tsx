import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldAlert, Hash, Calendar, GraduationCap, User, ExternalLink, ArrowLeft, FileText } from "lucide-react";
import UTAMVHeader from "@/components/UTAMVHeader";
import UTAMVFooter from "@/components/UTAMVFooter";

export default function VerifyCertificate() {
  const { certNumber } = useParams<{ certNumber: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!certNumber) return;
    document.title = `Verificación BlockUTAMV · ${certNumber}`;
    (async () => {
      setLoading(true);
      const { data: res, error: err } = await supabase.functions.invoke("verify-certificate", {
        body: { certificateNumber: certNumber },
      });
      if (err || !res?.valid) {
        setError(res?.message || err?.message || "Certificado no encontrado");
      } else {
        setData(res);
      }
      setLoading(false);
    })();
  }, [certNumber]);

  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="max-w-4xl mx-auto px-4 py-28">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>

        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Verificación BlockUTAMV</h1>
          <p className="text-muted-foreground">Validación pública de certificados emitidos por UTAMV Campus Online</p>
        </header>

        {loading && (
          <Card><CardContent className="p-12 text-center">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Consultando cadena BlockUTAMV…</p>
          </CardContent></Card>
        )}

        {!loading && error && (
          <Card className="border-destructive/40">
            <CardContent className="p-10 text-center space-y-3">
              <ShieldAlert className="w-14 h-14 text-destructive mx-auto" />
              <h2 className="font-display text-2xl font-bold">Certificado no válido</h2>
              <p className="text-muted-foreground">{error}</p>
              <p className="text-xs text-muted-foreground">Número consultado: <code className="font-mono">{certNumber}</code></p>
            </CardContent>
          </Card>
        )}

        {!loading && data?.valid && (
          <div className="space-y-6">
            <Card className="border-primary/40 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-12 h-12 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <Badge className="mb-2">CERTIFICADO VÁLIDO</Badge>
                    <h2 className="font-display text-2xl font-bold mb-1">{data.certificate.holderName}</h2>
                    <p className="text-lg text-muted-foreground">{data.certificate.courseName}</p>
                    <p className="text-sm text-muted-foreground mt-1">{data.certificate.institution}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Datos académicos</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <Row icon={<User className="w-4 h-4" />} label="Titular" value={data.certificate.holderName} />
                  <Row icon={<FileText className="w-4 h-4" />} label="Programa" value={data.certificate.courseName} />
                  <Row label="Nivel" value={data.certificate.courseLevel || "—"} />
                  <Row label="Categoría" value={data.certificate.category || "—"} />
                  <Row label="Horas acreditadas" value={`${data.certificate.hours || 0} h`} />
                  <Row label="Calificación final" value={`${data.certificate.finalScore ?? "—"} / 100`} />
                  <Row icon={<Calendar className="w-4 h-4" />} label="Fecha de emisión" value={new Date(data.certificate.issuedAt).toLocaleDateString("es-MX", { dateStyle: "long" })} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Hash className="w-4 h-4" /> BlockUTAMV — Bloque #{data.block?.index ?? "—"}</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <HashRow label="N° certificado" value={data.certificate.number} />
                  <HashRow label="Block hash" value={data.block?.hash || data.certificate.blockchainHash} />
                  <HashRow label="Previous hash" value={data.block?.previousHash} />
                  <HashRow label="Data hash" value={data.block?.dataHash} />
                  <HashRow label="Nonce" value={data.block?.nonce} />
                  <p className="text-[11px] text-muted-foreground pt-2 border-t border-border">
                    Cadena institucional inmutable SHA-256. Cada certificado encadena con el anterior garantizando integridad.
                  </p>
                </CardContent>
              </Card>
            </div>

            {data.certificate.pdfUrl && (
              <div className="text-center">
                <Button asChild size="lg">
                  <a href={data.certificate.pdfUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" /> Descargar certificado PDF oficial
                  </a>
                </Button>
              </div>
            )}

            <Card className="bg-muted/30">
              <CardContent className="p-4 text-xs text-muted-foreground text-center">
                {data.certificate.note}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <UTAMVFooter />
    </div>
  );
}

function Row({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 pb-2 border-b border-border/50 last:border-0">
      <span className="text-muted-foreground flex items-center gap-2">{icon}{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function HashRow({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-muted-foreground mb-1">{label}</div>
      <code className="font-mono text-[10px] break-all bg-muted/50 px-2 py-1 rounded block">{value || "—"}</code>
    </div>
  );
}
