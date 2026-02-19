import { Link } from 'react-router-dom';
import { Mail, Globe, Scale } from 'lucide-react';
import utamvLogoOfficial from '@/assets/utamv-logo-official.png';

const UTAMVFooter = () => {
  return (
    <footer className="bg-[hsl(222_38%_4%)] border-t border-[hsl(var(--platinum)/0.08)]">
      {/* Legal Alert Banner — Art. 23 Estatuto UTAMV */}
      <div className="bg-[hsl(var(--platinum)/0.04)] border-b border-[hsl(var(--platinum)/0.09)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <Scale size={15} className="text-platinum-dim mt-0.5 flex-shrink-0" />
            <p className="font-ui text-xs text-muted-foreground leading-relaxed">
              <strong className="text-platinum-dim">Aviso Legal Pre-RVOE (Art. 21-23 Estatuto UTAMV):</strong>{' '}
              Los estudios impartidos por UTAMV tienen carácter institucional privado y{' '}
              <strong className="text-platinum/70">no cuentan con reconocimiento de validez oficial</strong>{' '}
              ante la SEP u otra autoridad educativa, salvo resolución expresa vigente para un programa específico.
              UTAMV se encuentra en proceso de preparación y solicitud de RVOE.
              «Estudios sin reconocimiento de validez oficial. La formación educativa ofrecida no cuenta con reconocimiento
              por parte de la autoridad educativa competente.»
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── Brand ── */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-[hsl(var(--platinum)/0.05)] border border-[hsl(var(--platinum)/0.15)] flex items-center justify-center">
                <img src={utamvLogoOfficial} alt="UTAMV" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-platinum leading-none">UTAMV</div>
                <div className="font-ui text-[9px] text-platinum-dim tracking-[0.16em] uppercase">Elite Masterclass</div>
              </div>
            </div>
            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
              Universidad de Tecnología Avanzada, Marketing y Versatilidad.
              Institución particular de educación superior de carácter privado.
              Campus online bajo el Modelo NextGen 2026.
            </p>
            <p className="font-ui text-[10px] text-muted-foreground/60 leading-relaxed mb-5 italic">
              Mineral del Monte, Hidalgo, México · Año Institucional 2026
            </p>
            <div className="divider-platinum mb-5" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-platinum-dim/60" />
                <span className="font-ui text-xs text-muted-foreground">Campus Online · Modalidad Digital 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-platinum-dim/60" />
                <span className="font-ui text-xs text-muted-foreground">contacto@utamv.edu.mx</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-platinum-dim/60" />
                <span className="font-ui text-xs text-muted-foreground">admisiones@utamv.edu.mx</span>
              </div>
            </div>
          </div>

          {/* ── Programas ── */}
          <div>
            <h4 className="font-ui text-[10px] font-semibold tracking-[0.18em] uppercase text-platinum-dim mb-5">Programas</h4>
            <ul className="space-y-3">
              {[
                { label: 'Maestrías y Posgrado', path: '/programas?nivel=maestria' },
                { label: 'Máster Profesional 2026', path: '/programas?nivel=master' },
                { label: 'Diplomados Especializados', path: '/programas?nivel=diplomado' },
                { label: 'Certificaciones OBE', path: '/programas?nivel=certificacion' },
                { label: 'Módulos Académicos', path: '/modulos' },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="font-body text-xs text-muted-foreground hover:text-platinum-dim transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-platinum-deep/50 group-hover:bg-platinum-dim transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Marco Institucional ── */}
          <div>
            <h4 className="font-ui text-[10px] font-semibold tracking-[0.18em] uppercase text-platinum-dim mb-5">Marco Institucional</h4>
            <ul className="space-y-3">
              {[
                { label: 'Estatuto Orgánico', path: '/institucional#estatuto' },
                { label: 'Modelo Educativo NextGen 2026', path: '/modelo-educativo' },
                { label: 'Reglamento Académico General', path: '/institucional#reglamento' },
                { label: 'Código de Ética e Integridad', path: '/institucional#etica' },
                { label: 'Política Antiplagio', path: '/institucional#antiplagio' },
                { label: 'Aviso Legal Pre-RVOE', path: '/institucional#aviso-legal' },
                { label: 'Gobernanza de IA', path: '/institucional#ia-governance' },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="font-body text-xs text-muted-foreground hover:text-platinum-dim transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-platinum-deep/50 group-hover:bg-platinum-dim transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Acceso Académico ── */}
          <div>
            <h4 className="font-ui text-[10px] font-semibold tracking-[0.18em] uppercase text-platinum-dim mb-5">Acceso Académico</h4>
            <ul className="space-y-3 mb-6">
              {[
                { label: 'Proceso de Admisión', path: '/admisiones' },
                { label: 'Requisitos de Ingreso', path: '/admisiones#requisitos' },
                { label: 'Evaluación OBE', path: '/modelo-educativo#obe' },
                { label: 'Tutorías Online', path: '/modelo-educativo#tutorias' },
                { label: 'Principios de IA UTAMV', path: '/institucional#ia-governance' },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="font-body text-xs text-muted-foreground hover:text-platinum-dim transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-platinum-deep/50 group-hover:bg-platinum-dim transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/admisiones"
              className="inline-block px-5 py-2.5 rounded-xl font-ui text-xs font-semibold btn-platinum"
            >
              Solicitar Admisión →
            </Link>
          </div>
        </div>

        <div className="divider-platinum mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-ui text-[10px] text-muted-foreground/50 text-center md:text-left">
            © {new Date().getFullYear()} UTAMV — Universidad de Tecnología Avanzada, Marketing y Versatilidad.
            Institución privada · Pre-RVOE · Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="badge-academic text-[9px]">Modelo NextGen 2026</span>
            <span className="badge-academic text-[9px]">OBE Certified</span>
            <span className="badge-academic text-[9px]">Campus Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UTAMVFooter;
