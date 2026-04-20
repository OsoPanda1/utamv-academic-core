import UTAMVHeader from '@/components/UTAMVHeader';
import EliteBackground from '@/components/EliteBackground';
import UTAMVFooter from '@/components/UTAMVFooter';
import {
  Download, QrCode, Share2, ShieldCheck, FileText,
  CheckCircle2, ExternalLink, AlertCircle, Search, Loader2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CertificateRow {
  id: string;
  certificate_number: string;
  course_id: string;
  user_id: string;
  hours_completed: number | null;
  final_score: number | null;
  blockchain_hash: string | null;
  pdf_url: string | null;
  verification_url: string | null;
  qr_code_url: string | null;
  issued_at: string;
  course?: { title: string; slug: string; level: string | null; instructor_name: string | null } | null;
}

const CertificadosPage = () => {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (!user) {
          setCertificates([]);
          return;
        }
        const { data, error } = await supabase
          .from('certificates')
          .select('*, course:courses(title, slug, level, instructor_name)')
          .eq('user_id', user.id)
          .order('issued_at', { ascending: false });
        if (error) throw error;
        setCertificates((data || []) as any);
      } catch (e: any) {
        toast.error(e?.message || 'No se pudieron cargar los certificados');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const filtered = certificates.filter((c) => {
    const q = searchQuery.toLowerCase();
    return (
      c.certificate_number.toLowerCase().includes(q) ||
      (c.course?.title || '').toLowerCase().includes(q)
    );
  });

  const handleShare = async (cert: CertificateRow) => {
    const url = `${window.location.origin}/verificar/${cert.certificate_number}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Enlace de verificación copiado al portapapeles');
    } catch {
      window.prompt('Copia el enlace de verificación:', url);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-b from-[hsl(222_35%_5%)] to-[hsl(222_35%_5%/0.9)] overflow-hidden">
          <EliteBackground variant="navy" />
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="flex items-center gap-2 text-platinum-dim mb-4">
              <ShieldCheck size={14} />
              <span className="font-ui text-[10px] uppercase tracking-[0.18em]">BlockUTAMV · Verificación inmutable</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-3">
              Mis Certificados Digitales
            </h1>
            <p className="font-body text-base text-muted-foreground max-w-2xl">
              Cada certificado UTAMV se firma criptográficamente y se registra en la cadena BlockUTAMV.
              Puedes compartir el enlace de verificación pública con cualquier institución o reclutador.
            </p>
          </div>
        </section>

        {/* Búsqueda */}
        <section className="py-6 border-y border-[hsl(var(--platinum)/0.06)] bg-[hsl(222_38%_4%)]">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-3 max-w-md">
              <Search size={16} className="text-platinum-dim" />
              <input
                type="text"
                placeholder="Buscar por curso o número de certificado…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-b border-[hsl(var(--platinum)/0.12)] focus:border-[hsl(var(--platinum)/0.35)] outline-none py-2 font-body text-sm text-platinum placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </section>

        {/* Listado */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {!user ? (
              <div className="p-8 rounded-2xl border border-[hsl(var(--platinum)/0.1)] text-center">
                <AlertCircle className="mx-auto mb-3 text-platinum-dim" />
                <h3 className="font-display text-xl text-platinum mb-2">Inicia sesión para ver tus certificados</h3>
                <p className="font-body text-sm text-muted-foreground mb-4">
                  Necesitas una cuenta UTAMV activa para visualizar tus emisiones BlockUTAMV.
                </p>
                <Link to="/auth/login" className="inline-block px-5 py-2.5 rounded-xl font-ui text-xs font-semibold btn-platinum">
                  Acceder al Campus
                </Link>
              </div>
            ) : loading ? (
              <div className="flex items-center justify-center py-20 text-platinum-dim">
                <Loader2 className="animate-spin mr-2" /> Cargando certificados…
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-10 rounded-2xl border border-dashed border-[hsl(var(--platinum)/0.12)] text-center">
                <FileText className="mx-auto mb-3 text-platinum-dim" size={32} />
                <h3 className="font-display text-xl text-platinum mb-2">Aún no tienes certificados emitidos</h3>
                <p className="font-body text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                  Completa cualquiera de los programas del Campus UTAMV para emitir tu primer certificado
                  con respaldo BlockUTAMV.
                </p>
                <Link to="/campus" className="inline-block px-5 py-2.5 rounded-xl font-ui text-xs font-semibold btn-platinum">
                  Ir al Campus
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((cert) => (
                  <article
                    key={cert.id}
                    className="rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.08)] hover:border-[hsl(var(--platinum)/0.25)] transition-all p-5 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="badge-academic text-[8px]">{cert.course?.level || 'Programa'}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-ui text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
                        <CheckCircle2 size={10} /> Verificado
                      </span>
                    </div>

                    <h3 className="font-display text-base text-platinum mb-1 leading-snug line-clamp-2">
                      {cert.course?.title || 'Programa UTAMV'}
                    </h3>
                    <p className="font-ui text-[10px] text-muted-foreground mb-4">
                      Emitido el {new Date(cert.issued_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>

                    <dl className="space-y-1.5 text-[11px] font-ui mb-4">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">N.° certificado</dt>
                        <dd className="text-platinum font-semibold tracking-wider">{cert.certificate_number}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Horas</dt>
                        <dd className="text-platinum">{cert.hours_completed ?? '—'} h</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Calificación</dt>
                        <dd className="text-platinum">{cert.final_score ?? '—'}</dd>
                      </div>
                      {cert.blockchain_hash && (
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Hash</dt>
                          <dd className="text-platinum-dim font-mono text-[9px] truncate max-w-[140px]" title={cert.blockchain_hash}>
                            {cert.blockchain_hash.slice(0, 10)}…{cert.blockchain_hash.slice(-6)}
                          </dd>
                        </div>
                      )}
                    </dl>

                    <div className="mt-auto pt-4 border-t border-[hsl(var(--platinum)/0.06)] flex items-center justify-between gap-2">
                      {cert.pdf_url ? (
                        <a
                          href={cert.pdf_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-ui text-[11px] font-semibold btn-platinum"
                        >
                          <Download size={12} /> PDF
                        </a>
                      ) : (
                        <span className="flex-1 text-center text-[10px] text-muted-foreground italic">PDF en proceso</span>
                      )}
                      <Link
                        to={`/verificar/${cert.certificate_number}`}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-[hsl(var(--platinum)/0.15)] hover:border-[hsl(var(--platinum)/0.35)] font-ui text-[11px] text-platinum"
                      >
                        <QrCode size={12} /> Verificar
                      </Link>
                      <button
                        onClick={() => handleShare(cert)}
                        className="inline-flex items-center justify-center px-2 py-2 rounded-lg border border-[hsl(var(--platinum)/0.15)] hover:border-[hsl(var(--platinum)/0.35)] text-platinum"
                        title="Compartir enlace de verificación"
                      >
                        <Share2 size={12} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Cómo verificar */}
        <section className="py-14 bg-[hsl(222_38%_4%)] border-t border-[hsl(var(--platinum)/0.06)]">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-2xl md:text-3xl text-platinum text-center mb-3">
              ¿Cómo se verifica un certificado UTAMV?
            </h2>
            <p className="font-body text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Cualquier persona puede verificar la autenticidad de un certificado UTAMV escaneando su código QR
              o ingresando su número en la página pública de verificación.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: QrCode, title: 'Escanear QR', desc: 'El QR del PDF abre la página pública de verificación.' },
                { icon: ShieldCheck, title: 'Validar BlockUTAMV', desc: 'Se compara el hash del bloque con la cadena interna inmutable.' },
                { icon: ExternalLink, title: 'Compartir enlace', desc: 'Copia y comparte el enlace con cualquier reclutador o institución.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="p-5 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)]">
                  <Icon size={20} className="text-platinum-dim mb-3" />
                  <h3 className="font-display text-base text-platinum mb-1">{title}</h3>
                  <p className="font-body text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default CertificadosPage;
