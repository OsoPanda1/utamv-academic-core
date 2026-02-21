import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import utamvLogo from '@/assets/utamv-logo-official.png';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp } = useAuth();
  const isLogin = location.pathname === '/auth/login';

  const [form, setForm] = useState({ email: '', password: '', fullName: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/campus';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setLoading(true);
    try {
      let result;
      if (isLogin) {
        result = await signIn(form.email, form.password);
      } else {
        result = await signUp(form.email, form.password, form.fullName);
      }
      if (result.error) {
        setError(result.error.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos.'
          : result.error.message);
      } else {
        navigate(from, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[hsl(222_38%_4%)] items-center justify-center overflow-hidden">
        {/* Platinum grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[hsl(var(--platinum)/0.04)] blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[hsl(var(--platinum)/0.03)] blur-3xl" />

        <div className="relative z-10 max-w-md text-center px-8">
          <div className="w-24 h-24 mx-auto mb-8 rounded-2xl overflow-hidden bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center animate-float">
            <img src={utamvLogo} alt="UTAMV" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="font-display text-4xl font-black text-platinum mb-3">UTAMV</h1>
          <p className="font-ui text-xs text-platinum-dim tracking-[0.2em] uppercase mb-8">Campus Online</p>
          <div className="space-y-4 text-left">
            {[
              '7 programas desde Certificación hasta Maestría',
              'Metodología OBE NextGen 2026',
              'Certificados con QR y respaldo en la nube',
              'Campus con IA tutora 24/7',
              'Comunidad de más de 1,000 profesionales LATAM',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[hsl(var(--platinum)/0.1)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={11} className="text-platinum-dim" />
                </div>
                <span className="font-body text-sm text-platinum/70">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-4 rounded-xl bg-[hsl(var(--platinum)/0.04)] border border-[hsl(var(--platinum)/0.1)]">
            <p className="font-ui text-[10px] text-muted-foreground/60 leading-relaxed italic">
              Estudios sin reconocimiento de validez oficial ante la SEP. Institución privada Pre-RVOE en proceso de certificación.
            </p>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-platinum-dim hover:text-platinum transition-colors mb-8 font-ui text-sm">
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center">
              <img src={utamvLogo} alt="UTAMV" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-platinum">UTAMV</div>
              <div className="font-ui text-[9px] text-platinum-dim tracking-[0.16em] uppercase">Campus Online</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-display text-3xl font-bold text-platinum mb-2">
              {isLogin ? 'Acceder al Campus' : 'Crear tu Cuenta'}
            </h2>
            <p className="font-body text-sm text-muted-foreground">
              {isLogin
                ? 'Ingresa tus credenciales para acceder a tu campus privado.'
                : 'Únete a UTAMV Elite Masterclass y transforma tu carrera.'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.08)] p-1 mb-8">
            <Link
              to="/auth/login"
              className={`flex-1 text-center py-2.5 rounded-lg font-ui text-sm font-medium transition-all ${isLogin ? 'bg-[hsl(var(--platinum)/0.12)] text-platinum' : 'text-muted-foreground hover:text-platinum-dim'}`}
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/auth/register"
              className={`flex-1 text-center py-2.5 rounded-lg font-ui text-sm font-medium transition-all ${!isLogin ? 'bg-[hsl(var(--platinum)/0.12)] text-platinum' : 'text-muted-foreground hover:text-platinum-dim'}`}
            >
              Registrarse
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block font-ui text-xs font-medium text-platinum-dim mb-2">Nombre completo</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.35)] transition-colors"
                  placeholder="Tu nombre completo"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block font-ui text-xs font-medium text-platinum-dim mb-2">Correo electrónico</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.35)] transition-colors"
                placeholder="tu@correo.com"
                required
              />
            </div>

            <div>
              <label className="block font-ui text-xs font-medium text-platinum-dim mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3 pr-12 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.35)] transition-colors"
                  placeholder="Mínimo 8 caracteres"
                  minLength={8}
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-platinum-dim transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block font-ui text-xs font-medium text-platinum-dim mb-2">Confirmar contraseña</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.35)] transition-colors"
                  placeholder="Repite tu contraseña"
                  required={!isLogin}
                />
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="font-ui text-xs text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-ui text-sm font-semibold btn-platinum disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Procesando...' : isLogin ? 'Acceder al Campus' : 'Crear mi Cuenta'}
            </button>
          </form>

          {!isLogin && (
            <p className="mt-6 font-ui text-[10px] text-muted-foreground/60 text-center leading-relaxed">
              Al registrarte aceptas los Términos del Campus Online y la Política de Privacidad de UTAMV.
              Estudios sin reconocimiento de validez oficial (Pre-RVOE).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
