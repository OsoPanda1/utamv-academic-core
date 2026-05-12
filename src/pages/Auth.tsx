import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, ArrowLeft, BellRing } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { validatePasswordStrength, sanitizeTextInput } from '@/lib/security';
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
  const [secureAccepted, setSecureAccepted] = useState(false);
  const from = (location.state as any)?.from?.pathname || '/campus';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isLogin && form.password !== form.confirmPassword) return setError('Las contraseñas no coinciden.');
    if (!isLogin) {
      const passwordIssues = validatePasswordStrength(form.password);
      if (passwordIssues.length > 0) return setError(passwordIssues.join(' '));
      if (!secureAccepted) return setError('Debes aceptar la verificación de seguridad avanzada.');
    }
    setLoading(true);
    try {
      const email = sanitizeTextInput(form.email, 120);
      const result = isLogin
        ? await signIn(email, form.password)
        : await signUp(email, form.password, sanitizeTextInput(form.fullName, 120));
      if (result.error) setError(result.error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : result.error.message);
      else navigate(from, { replace: true });
    } finally { setLoading(false); }
  };

  return <div className="min-h-screen bg-background flex"><div className="hidden lg:flex lg:w-1/2 relative bg-[hsl(222_38%_4%)] items-center justify-center overflow-hidden"><div className="absolute inset-0 bg-grid-pattern opacity-40" /><div className="relative z-10 max-w-md text-center px-8"><img src={utamvLogo} alt="UTAMV" className="w-24 h-24 mx-auto mb-8 object-contain" /><h1 className="font-display text-4xl font-black text-platinum mb-3">UTAMV</h1></div></div><div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12"><div className="w-full max-w-md"><Link to="/" className="inline-flex items-center gap-2 text-platinum-dim hover:text-platinum transition-colors mb-8 font-ui text-sm"><ArrowLeft size={16} />Volver al inicio</Link><h2 className="font-display text-3xl font-bold text-platinum mb-2">{isLogin ? 'Acceder al Campus' : 'Crear tu Cuenta'}</h2><form onSubmit={handleSubmit} className="space-y-5">{!isLogin && <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3" placeholder="Tu nombre completo" required />}<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3" placeholder="tu@correo.com" required /><div className="relative"><input type={showPass ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3 pr-12" placeholder="Mínimo 12 caracteres" required /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>{!isLogin && <input type={showPass ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3" placeholder="Repite tu contraseña" required />} {!isLogin && <label className="flex items-start gap-2 text-xs"><input type="checkbox" checked={secureAccepted} onChange={(e) => setSecureAccepted(e.target.checked)} required /><span>Confirmo verificación de seguridad avanzada para login/signup.</span></label>} {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20"><p className="font-ui text-xs text-red-400">{error}</p></div>}<button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl font-ui text-sm font-semibold btn-platinum">{loading ? 'Procesando...' : isLogin ? 'Acceder al Campus' : 'Crear mi Cuenta'}</button></form><div className="mt-4 p-3 rounded-xl bg-[hsl(var(--platinum)/0.04)] border border-[hsl(var(--platinum)/0.1)] flex items-start gap-2"><BellRing size={14} className="text-platinum-dim mt-0.5" /><p className="font-ui text-[11px] text-muted-foreground">Activa notificaciones del navegador en Campus para recibir avisos de clases, pagos y avances.</p></div><div className="mt-4 text-xs text-muted-foreground flex items-center gap-2"><ShieldCheck size={14} />Validación antifraude y política de contraseña robusta.</div></div></div></div>;
};

export default Auth;
