import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, Search, User, LogIn } from 'lucide-react';
import utamvLogoOfficial from '@/assets/utamv-logo-official.png';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Inicio', path: '/' },
  {
    label: 'Programas',
    path: '/programas',
    children: [
      { 
        category: 'Nivel Académico',
        items: [
          { label: 'Maestrías y Posgrado', path: '/programas?nivel=maestria', description: 'Programas de posgrado avanzado' },
          { label: 'Máster Profesional', path: '/programas?nivel=master', description: 'Formación estratégica para líderes' },
          { label: 'Diplomados', path: '/programas?nivel=diplomado', description: 'Actualización profesional intensiva' },
          { label: 'Certificaciones', path: '/programas?nivel=certificacion', description: 'Competencias específicas' }
        ]
      },
      {
        category: 'Áreas de Especialización',
        items: [
          { label: 'Marketing Digital', path: '/programas?area=marketing', description: 'SEO, SEM, Social Media' },
          { label: 'Inteligencia Artificial', path: '/programas?area=ia', description: 'IA aplicada y automatización' },
          { label: 'Analítica y Data', path: '/programas?area=data', description: 'Analytics y toma de decisiones' },
          { label: 'Comunicación Digital', path: '/programas?area=comunicacion', description: 'Marca y storytelling' }
        ]
      }
    ],
  },
  { label: 'Módulos Académicos', path: '/modulos' },
  { label: 'Modelo Educativo', path: '/modelo-educativo' },
  { label: 'Docentes', path: '/docentes' },
  { label: 'Foro UTAMV', path: '/foro' },
  { label: 'Marco Institucional', path: '/institucional' },
  { label: 'Admisiones', path: '/admisiones' },
];

const UTAMVHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

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
                Campus Online
              </div>
            </div>
          </Link>

          {/* ── Search Bar ── */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Buscar programas, cursos, docentes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum placeholder:text-platinum-dim text-sm font-ui focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] focus:ring-1 focus:ring-[hsl(var(--platinum)/0.3)] transition-all duration-200"
                />
                <Search 
                  size={16} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-platinum-dim group-focus-within:text-platinum transition-colors"
                />
              </div>
            </form>
          </div>

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

                {item.children && openDropdown === item.label && (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className="absolute top-full left-0 mt-1 w-80 bg-[hsl(222_38%_4%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl shadow-xl overflow-hidden animate-scale-in"
                  >
                    <div className="p-4">
                      {item.children.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-4 last:mb-0">
                          <h4 className="font-ui text-xs font-semibold text-platinum-dim uppercase tracking-wide mb-2">
                            {category.category}
                          </h4>
                          <div className="space-y-1">
                            {category.items.map((child) => (
                              <Link
                                key={child.path}
                                to={child.path}
                                className="flex flex-col gap-1 px-3 py-2 rounded-lg text-[0.8rem] text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-colors"
                              >
                                <span className="font-medium">{child.label}</span>
                                <span className="text-xs text-platinum-dim">{child.description}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── CTA and User Actions ── */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/perfil"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-platinum-dim hover:text-platinum transition-colors"
                >
                  <User size={18} />
                  <span>Mi Perfil</span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-platinum-dim hover:text-platinum transition-colors"
                >
                  <LogIn size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-platinum-dim hover:text-platinum transition-colors"
              >
                <LogIn size={18} />
                <span>Iniciar Sesión</span>
              </Link>
            )}
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg font-ui text-[0.8rem] font-medium text-platinum-dim hover:text-platinum transition-colors"
            >
              Iniciar Sesión
            </Link>
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
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-lg bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum placeholder:text-platinum-dim text-sm"
                />
                <Search 
                  size={16} 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-platinum-dim"
                />
              </form>
            </div>
            
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
                    {item.children.map((category) => (
                      <div key={category.category} className="mb-3">
                        <h4 className="font-ui text-xs font-semibold text-platinum-dim uppercase tracking-wide mb-2">
                          {category.category}
                        </h4>
                        {category.items.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 rounded-lg font-ui text-xs text-muted-foreground hover:text-platinum-dim transition-all"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-3 border-t border-[hsl(var(--platinum)/0.08)]">
              {user ? (
                <div className="space-y-3">
                  <Link
                    to="/perfil"
                    className="flex items-center gap-2 block px-4 py-3 rounded-xl font-ui text-sm text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-all"
                  >
                    <User size={18} />
                    <span>Mi Perfil</span>
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-xl font-ui text-sm text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-all"
                  >
                    <LogIn size={18} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex items-center gap-2 block px-4 py-3 rounded-xl font-ui text-sm text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-all"
                >
                  <LogIn size={18} />
                  <span>Iniciar Sesión</span>
                </Link>
              )}
              <Link
                to="/admisiones"
                className="block text-center px-5 py-3 rounded-xl font-ui text-sm font-semibold tracking-wide btn-platinum mt-3"
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
