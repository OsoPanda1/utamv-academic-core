import { useEffect } from "react";
import UTAMVHeader from "@/components/UTAMVHeader";
import UTAMVFooter from "@/components/UTAMVFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Award, FileCheck2, Globe2, Download, Scale } from "lucide-react";

const ORGS = [
  { code: "RVOE", name: "Reconocimiento de Validez Oficial de Estudios (SEP México)", status: "En proceso", scope: "Nacional" },
  { code: "ANUIES", name: "Asociación Nacional de Universidades e IES", status: "Pre-candidatura", scope: "México" },
  { code: "OEI", name: "Organización de Estados Iberoamericanos", status: "Diálogo inicial", scope: "Iberoamérica" },
  { code: "CMF", name: "Common Microcredentials Framework (EMC)", status: "Alineación curricular", scope: "Europa/Global" },
  { code: "QS Stars", name: "QS Quacquarelli Symonds", status: "Auto-evaluación", scope: "Global" },
  { code: "Open Badges 3.0 / W3C VC", name: "IMS Global / W3C", status: "Implementado parcialmente", scope: "Global" },
];

export default function AcreditacionesPage() {
  useEffect(() => {
    document.title = "Acreditaciones y Estatus Académico | UTAMV";
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">Transparencia institucional · Pre-RVOE</Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent">
            Acreditaciones y Estatus Académico
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            UTAMV opera como universidad <strong>en estatus Pre-RVOE</strong>. Este dossier documenta el alcance real de nuestros estudios,
            los procesos de validación en curso y los marcos internacionales con los que estamos alineados.
          </p>
        </header>

        {/* AVISO LEGAL DESTACADO */}
        <Card className="mb-10 border-amber-500/50 bg-amber-500/5">
          <CardHeader className="flex flex-row items-start gap-4">
            <ShieldAlert className="h-8 w-8 text-amber-500 shrink-0 mt-1" />
            <div>
              <CardTitle className="text-amber-700 dark:text-amber-400">Advertencia legal obligatoria</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Los programas formativos de UTAMV <strong>NO cuentan actualmente con Reconocimiento de Validez Oficial de Estudios (RVOE)</strong> de la
                Secretaría de Educación Pública de México ni con incorporación a la UNAM, IPN u otra institución pública. Los certificados emitidos
                tienen carácter de <strong>educación continua privada y no oficial</strong>. La obtención de RVOE es un proceso administrativo independiente
                y su finalización no está garantizada. Esta información debe presentarse al estudiante antes de cualquier inscripción de pago.
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* ALCANCE */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Award, title: "Lo que SÍ ofrecemos", items: ["Constancias de educación continua", "Open Badges 3.0 verificables", "Certificados con QR + BlockUTAMV", "Microcredenciales alineadas a CMF"] },
            { icon: Scale, title: "Lo que NO ofrecemos", items: ["Título profesional con cédula DGP", "Validez oficial RVOE/SEP", "Equivalencia automática en otras IES", "Reconocimiento como posgrado oficial"] },
            { icon: Globe2, title: "Reconocimiento internacional", items: ["Microcredenciales portables (LER-RS)", "Verificable en cadena pública", "Compatibilidad Europass parcial", "ORCID + DOI vía Zenodo"] },
          ].map(({ icon: Icon, title, items }) => (
            <Card key={title} className="bg-gradient-to-br from-card to-muted/20">
              <CardHeader>
                <Icon className="h-6 w-6 text-primary mb-2" />
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {items.map((i) => <li key={i} className="flex gap-2"><span className="text-primary">•</span>{i}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* TABLA ORGANISMOS */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <FileCheck2 className="h-6 w-6 text-primary" />
            Organismos validadores y estatus de proceso
          </h2>
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-4">Organismo</th>
                  <th className="p-4">Descripción</th>
                  <th className="p-4">Estatus</th>
                  <th className="p-4">Alcance</th>
                </tr>
              </thead>
              <tbody>
                {ORGS.map((o, idx) => (
                  <tr key={o.code} className={idx % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="p-4 font-mono font-semibold">{o.code}</td>
                    <td className="p-4">{o.name}</td>
                    <td className="p-4"><Badge variant="secondary">{o.status}</Badge></td>
                    <td className="p-4 text-muted-foreground">{o.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* REQUISITOS */}
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Requisitos cumplidos por UTAMV</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>✅ Plan de estudios documentado por competencias (OBE NextGen 2026)</p>
              <p>✅ Cuerpo docente con perfil verificable y publicaciones (ORCID)</p>
              <p>✅ Plataforma tecnológica con trazabilidad académica (BlockUTAMV)</p>
              <p>✅ Política de privacidad y consentimiento informado (GDPR/LFPDPPP)</p>
              <p>✅ Sistema de certificación verificable públicamente</p>
              <p>✅ Rúbricas, evidencias y evaluaciones por curso</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Pendientes para RVOE pleno</CardTitle></CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>⏳ Solicitud formal SEP / Autoridad educativa estatal</p>
              <p>⏳ Comprobación de infraestructura física obligatoria</p>
              <p>⏳ Visita de inspección académica</p>
              <p>⏳ Convenios de doble titulación con IES con RVOE</p>
              <p>⏳ Acreditación COPAES / CIEES por programa</p>
            </CardContent>
          </Card>
        </section>

        {/* DESCARGA DOSSIER */}
        <section className="text-center bg-gradient-to-br from-primary/10 via-background to-primary/5 rounded-2xl p-10 border">
          <Download className="h-10 w-10 mx-auto text-primary mb-4" />
          <h2 className="font-display text-2xl font-semibold mb-2">Dossier de Auditoría Académica</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Documento PDF completo con plan de estudios, modelo educativo, rúbricas, gobernanza institucional,
            política de datos y trazabilidad tecnológica para auditores y autoridades.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button asChild size="lg">
              <a href="/docs/UTAMV_Dossier_Acreditacion_2026.pdf" download>
                <Download className="mr-2 h-4 w-4" /> Descargar dossier (PDF)
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="mailto:rectoria@utamv.mx?subject=Auditoría%20académica%20UTAMV">
                Solicitar visita de auditor
              </a>
            </Button>
          </div>
        </section>
      </main>
      <UTAMVFooter />
    </div>
  );
}
