/**
 * EliteBackground — fondo NextGen 2026 reutilizable
 * Orbes blur desincronizados + curvas SVG platinum + partículas pulsantes.
 * Aplica identidad visual unificada en /programas, /admisiones, /certificados.
 */
const EliteBackground = ({ variant = 'navy' }: { variant?: 'navy' | 'platinum' | 'petrol' }) => {
  const orbA =
    variant === 'platinum'
      ? 'bg-[hsl(var(--platinum)/0.10)]'
      : variant === 'petrol'
      ? 'bg-[hsl(195_70%_30%/0.18)]'
      : 'bg-[hsl(var(--navy)/0.45)]';
  const orbB =
    variant === 'platinum'
      ? 'bg-[hsl(var(--platinum)/0.06)]'
      : variant === 'petrol'
      ? 'bg-[hsl(180_60%_40%/0.14)]'
      : 'bg-[hsl(var(--platinum)/0.08)]';

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Orbes blur desincronizados */}
      <div
        className={`absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full ${orbA} blur-[120px] animate-pulse`}
        style={{ animationDuration: '7s' }}
      />
      <div
        className={`absolute top-1/3 -right-32 w-[460px] h-[460px] rounded-full ${orbB} blur-[140px] animate-pulse`}
        style={{ animationDuration: '11s', animationDelay: '1.5s' }}
      />
      <div
        className={`absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full ${orbA} blur-[100px] animate-pulse`}
        style={{ animationDuration: '9s', animationDelay: '3s' }}
      />

      {/* Curva SVG platinum */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="elite-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--platinum))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--platinum))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--platinum))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="elite-line-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--platinum))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--platinum))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--platinum))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 400 Q 300 200 600 400 T 1200 400"
          stroke="url(#elite-line)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M 0 600 Q 400 350 800 550 T 1200 500"
          stroke="url(#elite-line-2)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* Partículas pulsantes */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[hsl(var(--platinum)/0.45)] animate-pulse"
            style={{
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
              animationDuration: `${3 + (i % 4)}s`,
              animationDelay: `${(i * 0.4) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Vignette superior */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
};

export default EliteBackground;
