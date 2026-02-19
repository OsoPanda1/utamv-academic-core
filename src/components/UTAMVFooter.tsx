import { Link } from 'react-router-dom';
import { Mail, Globe, BookOpen, Shield, FileText, Scale, GraduationCap } from 'lucide-react';
import utamvLogo from '@/assets/utamv-logo.png';

const UTAMVFooter = () => {
  return (
    <footer className="bg-[hsl(220_35%_5%)] border-t border-[hsl(var(--gold)/0.1)]">
      {/* Legal Alert Banner */}
      <div className="bg-[hsl(var(--gold)/0.06)] border-b border-[hsl(var(--gold)/0.12)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <Scale size={16} className="text-gold mt-0.5 flex-shrink-0" />
            <p className="font-ui text-xs text-muted-foreground leading-relaxed">
              <strong className="text-gold">Aviso Legal Pre-RVOE:</strong>{' '}
              Los estudios impartidos por UTAMV tienen carácter institucional privado y{' '}
              <strong className="text-platinum-dim">no cuentan con reconocimiento de validez oficial</strong>{' '}
              ante la SEP u otra autoridad educativa, salvo resolución expresa vigente para un programa específico.
              UTAMV se encuentra en proceso de preparación y solicitud de RVOE.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.2)] flex items-center justify-center">
                <img src={utamvLogo} alt="UTAMV" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-gold leading-none">UTAMV</div>
                <div className="font-ui text-[9px] text-platinum-dim tracking-[0.15em] uppercase">Elite Masterclass</div>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
              Universidad de Tecnología Avanzada, Marketing y Versatilidad. Plataforma académica de formación
              superior en entornos digitales bajo el Modelo NextGen 2026.
            </p>
            <div className="divider-gold mb-5" />
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-gold/60" />
                <span className="font-ui text-xs text-muted-foreground">Campus Online · Modalidad Digital</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold/60" />
                <span className="font-ui text-xs text-muted-foreground">contacto@utamv.edu.mx</span>
              </div>
            </div>
          </div>

          {/* Programas */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-5">Programas</h4>
            <ul className="space-y-3">
              {[
                { label: 'Maestrías', path: '/programas?nivel=maestria' },
                { label: 'Máster Profesional', path: '/programas?nivel=master' },
                { label: 'Diplomados', path: '/programas?nivel=diplomado' },
                { label: 'Certificaciones', path: '/programas?nivel=certificacion' },
                { label: 'Módulos Académicos', path: '/modulos' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="font-body text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-5">Marco Institucional</h4>
            <ul className="space-y-3">
              {[
                { label: 'Estatuto Orgánico', path: '/institucional#estatuto' },
                { label: 'Modelo Educativo NextGen 2026', path: '/modelo-educativo' },
                { label: 'Reglamento Académico', path: '/institucional#reglamento' },
                { label: 'Código de Ética', path: '/institucional#etica' },
                { label: 'Política Antiplagio', path: '/institucional#antiplagio' },
                { label: 'Aviso Legal Pre-RVOE', path: '/institucional#aviso-legal' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="font-body text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Acceso */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-5">Acceso Académico</h4>
            <ul className="space-y-3 mb-6">
              {[
                { label: 'Proceso de Admisión', path: '/admisiones' },
                { label: 'Requisitos de Ingreso', path: '/admisiones#requisitos' },
                { label: 'Evaluación OBE', path: '/modelo-educativo#obe' },
                { label: 'Tutorías Online', path: '/modelo-educativo#tutorias' },
              ].map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="font-body text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/admisiones"
              className="inline-block px-5 py-2.5 rounded-xl font-ui text-sm font-semibold text-[hsl(var(--primary-foreground))] bg-gradient-gold glow-gold transition-all hover:opacity-90"
            >
              Solicitar Admisión →
            </Link>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-ui text-xs text-muted-foreground/60 text-center md:text-left">
            © {new Date().getFullYear()} UTAMV — Universidad de Tecnología Avanzada, Marketing y Versatilidad.
            Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="badge-academic">Modelo NextGen 2026</span>
            <span className="badge-academic">OBE Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UTAMVFooter;
