import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';
import utamvLogoOfficial from '@/assets/utamv-logo-official.png';

const navItems = [
  { label: 'Inicio', path: '/' },
  {
    label: 'Programas',
    path: '/programas',
    children: [
      { label: 'Maestrías y Posgrado', path: '/programas?nivel=maestria' },
      { label: 'Máster Profesional', path: '/programas?nivel=master' },
      { label: 'Diplomados', path: '/programas?nivel=diplomado' },
      { label: 'Certificaciones', path: '/programas?nivel=certificacion' },
    ],
  },
  { label: 'Módulos Académicos', path: '/modulos' },
  { label: 'Modelo Educativo', path: '/modelo-educativo' },
  { label: 'Marco Institucional', path: '/institucional' },
  { label: 'Admisiones', path: '/admisiones' },
];

const UTAMVHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[hsl(222_35%_5%/0.97)] backdrop-blur-xl border-b border-[hsl(var(--platinum)/0.1)] shadow-elevated'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.18)] flex items-center justify-center transition-all group-hover:border-[hsl(var(--platinum)/0.45)] group-hover:shadow-platinum-sm">
              <img
                src={utamvLogoOfficial}
                alt="UTAMV — Universidad de Tecnología Avanzada, Marketing y Versatilidad"
                className="w-9 h-9 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-display text-[1.1rem] font-bold text-platinum leading-none tracking-wider">
                UTAMV
              </div>
              <div className="font-ui text-[9px] text-platinum-dim tracking-[0.18em] uppercase leading-none mt-0.5">
                Elite Masterclass
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                {item.children ? (
                  <button
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={`flex items-center gap-1 px-3 py-2.5 rounded-lg font-ui text-[0.8rem] font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? 'text-platinum'
                        : 'text-platinum-dim hover:text-platinum'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2.5 rounded-lg font-ui text-[0.8rem] font-medium transition-all duration-200 block ${
                      location.pathname === item.path
                        ? 'text-platinum'
                        : 'text-platinum-dim hover:text-platinum'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.children && openDropdown === item.label && (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-60 bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl shadow-elevated overflow-hidden animate-scale-in"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="flex items-center gap-2.5 px-4 py-3.5 font-ui text-[0.78rem] text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.05)] transition-all border-b border-[hsl(var(--platinum)/0.05)] last:border-0"
                      >
                        <span className="w-1 h-1 rounded-full bg-platinum-deep flex-shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admisiones"
              className="px-5 py-2.5 rounded-xl font-ui text-[0.8rem] font-semibold tracking-wide btn-platinum"
            >
              Solicitar Admisión
            </Link>
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.06)] transition-all"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(var(--background))] border-t border-[hsl(var(--platinum)/0.08)] animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl font-ui text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'text-platinum bg-[hsl(var(--platinum)/0.07)]'
                      : 'text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)]'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="pl-5 mt-1 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-2.5 rounded-lg font-ui text-xs text-muted-foreground hover:text-platinum-dim transition-all"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-[hsl(var(--platinum)/0.08)]">
              <Link
                to="/admisiones"
                className="block text-center px-5 py-3 rounded-xl font-ui text-sm font-semibold tracking-wide btn-platinum"
              >
                Solicitar Admisión
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default UTAMVHeader;
