import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Shield, Award, GraduationCap, BookOpen, Zap, Clock, ChevronRight } from 'lucide-react';
import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { COURSES, getPricingLabel } from '@/data/coursesData';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const levelIcons: Record<string, any> = {
  'Certificación': Zap,
  'Diplomado': BookOpen,
  'Máster': GraduationCap,
  'Licenciatura': Award,
  'Maestría': Shield,
};

const Pricing = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [currency, setCurrency] = useState<'MXN' | 'USD'>('MXN');

  const handleCheckout = async (course: any) => {
    if (!user) {
      window.location.href = '/auth/login';
      return;
    }
    setLoading(course.id);
    try {
      const { data } = await supabase.functions.invoke('create-course-checkout', {
        body: {
          courseSlug: course.slug,
          courseName: course.title,
          priceMXN: course.priceMXN,
          priceUSD: course.priceUSD,
          stripePriceId: course.stripePriceId,
        },
      });
      if (data?.url) window.open(data.url, '_blank');
    } finally {
      setLoading(null);
    }
  };

  const grouped = COURSES.reduce((acc, course) => {
    const key = course.level;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {} as Record<string, typeof COURSES>);

  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="badge-academic mb-4 inline-block">Tabla de Precios 2026</span>
            <h1 className="font-display text-5xl md:text-6xl font-black text-platinum mb-4">
              Programas <span className="text-platinum-gradient italic font-light">UTAMV</span>
            </h1>
            <p className="font-body text-platinum-dim max-w-2xl mx-auto text-sm leading-relaxed mb-8">
              5 niveles académicos — desde Certificación hasta Maestría. Metodología OBE NextGen 2026.
              Todos los programas incluyen certificado digital con QR verificable.
            </p>

            {/* Currency toggle */}
            <div className="inline-flex rounded-xl bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.08)] p-1 mb-12">
              {(['MXN', 'USD'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-6 py-2 rounded-lg font-ui text-sm font-medium transition-all ${currency === c ? 'bg-[hsl(var(--platinum)/0.12)] text-platinum' : 'text-muted-foreground hover:text-platinum-dim'}`}
                >
                  {c === 'MXN' ? '🇲🇽 MXN' : '🇺🇸 USD'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Tiers by Level */}
        {(['Certificación', 'Diplomado', 'Máster', 'Licenciatura', 'Maestría'] as const).map((level) => {
          const courses = grouped[level];
          if (!courses?.length) return null;
          const Icon = levelIcons[level] || BookOpen;

          return (
            <section key={level} className="py-12 border-t border-[hsl(var(--platinum)/0.06)]">
              <div className="container mx-auto px-4">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--platinum)/0.07)] border border-[hsl(var(--platinum)/0.15)] flex items-center justify-center">
                    <Icon size={18} className="text-platinum-dim" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-platinum">{getPricingLabel(level)}</h2>
                    <p className="font-ui text-xs text-muted-foreground">{courses.length} programa{courses.length > 1 ? 's' : ''} disponible{courses.length > 1 ? 's' : ''}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className={`relative p-6 rounded-2xl bg-card-premium border transition-all hover:shadow-platinum flex flex-col ${course.isFeatured ? 'border-[hsl(var(--platinum)/0.3)]' : 'border-[hsl(var(--platinum)/0.07)] hover:border-[hsl(var(--platinum)/0.2)]'}`}
                    >
                      {course.isFeatured && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="font-ui text-[9px] font-bold tracking-[0.15em] uppercase px-4 py-1 rounded-full btn-platinum">
                            Más Popular
                          </span>
                        </div>
                      )}

                      <div className="mb-4">
                        <span className="badge-academic text-[8px] mb-3 inline-block">{course.hours}h · {level}</span>
                        <h3 className="font-display text-lg font-bold text-platinum mb-1">{course.title}</h3>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{course.subtitle}</p>
                      </div>

                      <div className="mb-5">
                        <div className="font-display text-3xl font-black text-platinum-gradient">
                          {currency === 'MXN' ? `$${course.priceMXN.toLocaleString()}` : `$${course.priceUSD}`}
                          <span className="text-sm font-ui text-muted-foreground ml-2">{currency}</span>
                        </div>
                        <p className="font-ui text-[10px] text-muted-foreground mt-1">Pago único · Acceso ilimitado · Certificado incluido</p>
                      </div>

                      {/* Outcomes */}
                      <div className="space-y-2 mb-6 flex-1">
                        {course.learningOutcomes.slice(0, 4).map((outcome, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check size={12} className="text-platinum-dim/70 flex-shrink-0 mt-0.5" />
                            <span className="font-body text-[11px] text-muted-foreground leading-tight">{outcome}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <button
                          onClick={() => handleCheckout(course)}
                          disabled={loading === course.id}
                          className={`w-full py-3 rounded-xl font-ui text-sm font-semibold transition-all disabled:opacity-50 ${course.isFeatured ? 'btn-platinum' : 'border border-[hsl(var(--platinum)/0.2)] text-platinum-dim hover:text-platinum hover:border-[hsl(var(--platinum)/0.4)] hover:bg-[hsl(var(--platinum)/0.04)]'}`}
                        >
                          {loading === course.id ? 'Redirigiendo...' : `Inscribirme — ${currency === 'MXN' ? `$${course.priceMXN.toLocaleString()} MXN` : `$${course.priceUSD} USD`}`}
                        </button>
                        <p className="text-center font-ui text-[9px] text-muted-foreground/60">
                          Pago seguro con Stripe · Factura disponible
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* FAQ / Guarantee */}
        <section className="py-20 border-t border-[hsl(var(--platinum)/0.06)]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-platinum mb-4">Garantías y Preguntas Frecuentes</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: 'Pago 100% Seguro', desc: 'Todos los pagos procesados con Stripe. Encriptación SSL de nivel bancario.' },
                { icon: Clock, title: 'Acceso Ilimitado', desc: 'Una vez inscrito, accedes a tu programa para siempre. Sin fechas de vencimiento.' },
                { icon: Award, title: 'Certificado Garantizado', desc: 'Al completar el programa recibes certificado digital con QR verificable en la nube.' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] text-center">
                  <item.icon size={24} className="text-platinum-dim mx-auto mb-3" />
                  <h4 className="font-ui text-sm font-semibold text-platinum mb-2">{item.title}</h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center font-ui text-[10px] text-muted-foreground/60 mt-10 max-w-xl mx-auto">
              Estudios sin reconocimiento de validez oficial ante la SEP. Institución privada Pre-RVOE en proceso.
              Los certificados tienen validez institucional UTAMV.
            </p>
          </div>
        </section>
      </main>
      <UTAMVFooter />
    </div>
  );
};

export default Pricing;
