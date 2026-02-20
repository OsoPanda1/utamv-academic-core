import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Globe, Scale } from 'lucide-react';
import utamvLogoOfficial from '@/assets/utamv-logo-official.png';

const UTAMVFooter: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[hsl(222_38%_4%)] border-t border-[hsl(var(--platinum)/0.12)]">
      {/* Franja Legal Superior — Pre-RVOE */}
      <div className="bg-[hsl(var(--platinum)/0.05)] border-b border-[hsl(var(--platinum)/0.16)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3">
            <Scale size={16} className="text-platinum-dim mt-0.5 flex-shrink-0" />
            <p className="font-ui text-[11px] text-muted-foreground leading-relaxed">
              <span className="font-semibold text-platinum-dim">
                Aviso Legal Pre‑RVOE · Estatuto UTAMV, Artículos 21–23:
              </span>{' '}
              Los estudios impartidos por la Universidad de Tecnología Avanzada, Marketing y Versatilidad (UTAMV)
              tienen carácter institucional privado y{' '}
              <span className="text-platinum/80 font-semibold">
                no cuentan con reconocimiento de validez oficial
              </span>{' '}
              ante la SEP u otra autoridad educativa, salvo resolución expresa y vigente para programas específicos.
              UTAMV se encuentra en fase de preparación y solicitud de RVOE. «Estudios sin reconocimiento de
              validez oficial. La formación educativa ofrecida no cuenta con reconocimiento por parte de la
              autoridad educativa competente».
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* ── Columna 1: Identidad Institucional ── */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl overflow-hidden bg-[hsl(var(--platinum)/0.05)] border border-[hsl(var(--platinum)/0.15)] flex items-center justify-center">
                <img
                  src={utamvLogoOfficial}
                  alt="UTAMV"
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div>
                <div className="font-display text-lg font-bold text-platinum leading-none">
                  UTAMV
                </div>
                <div className="font-ui text-[9px] text-platinum-dim tracking-[0.18em] uppercase">
                  Universidad Tecnológica Avanzada
                </div>
              </div>
            </div>

            <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">
              Universidad de Tecnología Avanzada, Marketing y Versatilidad. Institución particular de educación
              superior de carácter privado, con campus online especializado en formación avanzada para el ecosistema
              digital latinoamericano.
            </p>
            <p className="font-ui text-[10px] text-muted-foreground/60 leading-relaxed mb-5 italic">
              Mineral del Monte, Hidalgo, México · Año Institucional 2026
            </p>

            <div className="divider-platinum mb-5" />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Globe size={13} className="text-platinum-dim/70" />
                <span className="font-ui text-xs text-muted-foreground">
                  Campus Online · Modalidad Digital 24/7
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-platinum-dim/70" />
                <span className="font-ui text-xs text-muted-foreground">
                  contacto@utamv.edu.mx
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-platinum-dim/70" />
                <span className="font-ui text-xs text-muted-foreground">
                  admisiones@utamv.edu.mx
                </span>
              </div>
            </div>
          </div>

          {/* ── Columna 2: Programas Académicos ── */}
          <div>
            <h4 className="font-ui text-[10px] font-semibold tracking-[0.2em] uppercase text-platinum-dim mb-5">
              Programas Académicos
            </h4>
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
                    <span className="w-1 h-1 rounded-full bg-platinum-deep/40 group-hover:bg-platinum-dim transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 3: Marco Institucional ── */}
          <div>
            <h4 className="font-ui text-[10px] font-semibold tracking-[0.2em] uppercase text-platinum-dim mb-5">
              Marco Institucional
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Estatuto Orgánico UTAMV', path: '/institucional#estatuto' },
                { label: 'Modelo Educativo NextGen 2026', path: '/modelo-educativo' },
                { label: 'Reglamento Académico General', path: '/institucional#reglamento' },
                { label: 'Código de Ética e Integridad', path: '/institucional#etica' },
                { label: 'Política Antiplagio y Originalidad', path: '/institucional#antiplagio' },
                { label: 'Aviso Legal Pre‑RVOE', path: '/institucional#aviso-legal' },
                { label: 'Gobernanza y Uso Responsable de IA', path: '/institucional#ia-governance' },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="font-body text-xs text-muted-foreground hover:text-platinum-dim transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-platinum-deep/40 group-hover:bg-platinum-dim transition-colors flex-shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Columna 4: Acceso Académico ── */}
          <div>
            <h4 className="font-ui text-[10px] font-semibold tracking-[0.2em] uppercase text-platinum-dim mb-5">
              Acceso Académico
            </h4>
            <ul className="space-y-3 mb-6">
              {[
                { label: 'Proceso de Admisión', path: '/admisiones' },
                { label: 'Requisitos de Ingreso', path: '/admisiones#requisitos' },
                { label: 'Evaluación por OBE y Rúbricas', path: '/modelo-educativo#obe' },
                { label: 'Tutorías y Acompañamiento Online', path: '/modelo-educativo#tutorias' },
                { label: 'Principios de IA UTAMV', path: '/institucional#ia-governance' },
              ].map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="font-body text-xs text-muted-foreground hover:text-platinum-dim transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-platinum-deep/40 group-hover:bg-platinum-dim transition-colors flex-shrink-0" />
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
          <p className="font-ui text-[10px] text-muted-foreground/55 text-center md:text-left">
            © {year} UTAMV — Universidad de Tecnología Avanzada, Marketing y Versatilidad.
            Institución privada de educación superior. Pre‑RVOE en curso. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <span className="badge-academic text-[9px]">Modelo NextGen 2026</span>
            <span className="badge-academic text-[9px]">OBE Certified</span>
            <span className="badge-academic text-[9px]">Campus Online Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UTAMVFooter;
