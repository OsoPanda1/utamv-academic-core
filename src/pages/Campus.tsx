import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, TrendingUp, Clock, Play, ChevronRight, GraduationCap, MessageSquare, Bot, User, Settings, LogOut, Bell, BarChart3, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { COURSES } from '@/data/coursesData';
import UTAMVHeader from '@/components/UTAMVHeader';
import utamvLogo from '@/assets/utamv-logo-official.png';

const Campus = () => {
  const { user, profile, signOut } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dbCourses, setDbCourses] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      supabase.from('enrollments').select('*, courses(*)').eq('user_id', user.id).then(({ data }) => {
        if (data) setEnrollments(data);
      });
    }
    // Cargar cursos publicados desde BD que no estén en el catálogo local
    supabase.from('courses').select('id,slug,title,subtitle,description,level,category,hours,price_mxn,price_usd,instructor_name,total_lessons,is_featured,thumbnail_url').eq('is_active', true).then(({ data }) => {
      if (!data) return;
      const localSlugs = new Set(COURSES.map((c) => c.slug));
      const onlyDb = data.filter((c) => !localSlugs.has(c.slug)).map((c) => ({
        id: c.id, slug: c.slug, title: c.title, subtitle: c.subtitle || '',
        description: c.description || '', level: c.level || 'Diplomado',
        category: c.category || '', hours: c.hours || 0,
        priceMXN: Number(c.price_mxn) || 0, priceUSD: Number(c.price_usd) || 0,
        instructorName: c.instructor_name || 'UTAMV', instructorTitle: '',
        instructorBio: '', thumbnail: c.thumbnail_url || '/src/assets/module-1.jpg',
        isFeatured: !!c.is_featured, modules: [], quizzes: [],
        learningOutcomes: [], prerequisites: [],
        obeFramework: { competencies: [], evidences: [], rubrics: [] },
        stripePriceId: '',
      }));
      setDbCourses(onlyDb);
    });
  }, [user]);

  const enrolledCourses = enrollments.map((e) => e.courses).filter(Boolean);
  const allCatalog = [...COURSES, ...dbCourses];
  const featuredCourses = allCatalog.filter((c) => c.isFeatured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[hsl(222_38%_4%)] border-r border-[hsl(var(--platinum)/0.06)] fixed left-0 top-0 h-full z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[hsl(var(--platinum)/0.06)]">
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.18)] flex items-center justify-center">
            <img src={utamvLogo} alt="UTAMV" className="w-7 h-7 object-contain" />
          </div>
          <div>
            <div className="font-display text-sm font-bold text-platinum">UTAMV</div>
            <div className="font-ui text-[8px] text-platinum-dim tracking-[0.14em] uppercase">Campus Online</div>
          </div>
        </div>

        {/* User */}
        <div className="px-5 py-4 border-b border-[hsl(var(--platinum)/0.06)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[hsl(var(--platinum)/0.1)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center">
              <span className="font-display text-sm font-bold text-platinum">
                {(profile?.display_name || user?.email || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <div className="font-ui text-xs font-semibold text-platinum truncate">
                {profile?.full_name || profile?.display_name || 'Estudiante'}
              </div>
              <div className="font-ui text-[9px] text-platinum-dim truncate">{user?.email}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'cursos', icon: BookOpen, label: 'Mis Cursos' },
            { id: 'explorar', icon: GraduationCap, label: 'Explorar Cursos' },
            { id: 'certificados', icon: Award, label: 'Mis Certificados' },
            { id: 'chat', icon: MessageSquare, label: 'Chat Global' },
            { id: 'ai-tutor', icon: Bot, label: 'IA Tutora' },
            { id: 'perfil', icon: User, label: 'Mi Perfil' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-ui text-xs font-medium transition-all ${activeSection === item.id ? 'bg-[hsl(var(--platinum)/0.1)] text-platinum border border-[hsl(var(--platinum)/0.15)]' : 'text-muted-foreground hover:text-platinum-dim hover:bg-[hsl(var(--platinum)/0.04)]'}`}
            >
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-[hsl(var(--platinum)/0.06)]">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-ui text-xs text-muted-foreground hover:text-platinum-dim hover:bg-[hsl(var(--platinum)/0.04)] transition-all"
          >
            <LogOut size={15} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 overflow-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[hsl(222_35%_5%/0.95)] backdrop-blur-xl border-b border-[hsl(var(--platinum)/0.06)] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-platinum capitalize">
              {activeSection === 'dashboard' ? `Bienvenido, ${profile?.display_name || 'Estudiante'}` :
               activeSection === 'cursos' ? 'Mis Cursos' :
               activeSection === 'explorar' ? 'Explorar Programas' :
               activeSection === 'certificados' ? 'Mis Certificados' :
               activeSection === 'chat' ? 'Chat Global UTAMV' :
               activeSection === 'ai-tutor' ? 'IA Tutora UTAMV' :
               'Mi Perfil Académico'}
            </h1>
            <p className="font-ui text-xs text-muted-foreground mt-0.5">Campus Online · Modelo NextGen 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-[hsl(var(--platinum)/0.05)] border border-[hsl(var(--platinum)/0.1)] text-platinum-dim hover:text-platinum transition-colors">
              <Bell size={16} />
            </button>
            <Link to="/" className="font-ui text-xs text-platinum-dim hover:text-platinum transition-colors">← Sitio público</Link>
          </div>
        </div>

        <div className="p-6">
          {/* ── DASHBOARD ── */}
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Cursos Inscritos', value: enrolledCourses.length, icon: BookOpen },
                  { label: 'Horas Completadas', value: '0', icon: Clock },
                  { label: 'Certificados', value: '0', icon: Award },
                  { label: 'Progreso Promedio', value: '0%', icon: TrendingUp },
                ].map((stat, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)]">
                    <div className="flex items-center justify-between mb-3">
                      <stat.icon size={18} className="text-platinum-dim" />
                      <span className="badge-academic text-[8px]">OBE</span>
                    </div>
                    <div className="stat-number text-2xl">{stat.value}</div>
                    <p className="font-ui text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Enrolled courses */}
              {enrolledCourses.length > 0 ? (
                <div>
                  <h3 className="font-display text-xl font-bold text-platinum mb-4">Continuar Aprendiendo</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrolledCourses.map((course: any, i: number) => (
                      <Link
                        key={i}
                        to={`/campus/curso/${course.slug}`}
                        className="group p-5 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.2)] transition-all hover:shadow-platinum"
                      >
                        <span className="badge-academic text-[8px] mb-3 inline-block">{course.level}</span>
                        <h4 className="font-ui text-sm font-semibold text-platinum mb-2 leading-snug">{course.title}</h4>
                        <div className="w-full bg-[hsl(var(--platinum)/0.08)] rounded-full h-1.5 mb-3">
                          <div className="bg-gradient-platinum h-1.5 rounded-full" style={{ width: '0%' }} />
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{course.hours}h</span>
                          <span className="flex items-center gap-1 text-platinum-dim group-hover:text-platinum transition-colors">
                            Continuar <ChevronRight size={13} />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)]">
                  <GraduationCap size={48} className="text-platinum-dim/40 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-platinum mb-2">Comienza tu formación</h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">Explora nuestros programas y empieza hoy tu transformación profesional.</p>
                  <button onClick={() => setActiveSection('explorar')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-ui text-sm font-semibold btn-platinum">
                    Explorar Programas <ChevronRight size={15} />
                  </button>
                </div>
              )}

              {/* Featured courses preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-bold text-platinum">Programas Destacados</h3>
                  <button onClick={() => setActiveSection('explorar')} className="font-ui text-xs text-platinum-dim hover:text-platinum transition-colors">Ver todos →</button>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {featuredCourses.map((course) => (
                    <div key={course.id} className="p-5 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.2)] transition-all">
                      <span className="badge-academic text-[8px] mb-3 inline-block">{course.level}</span>
                      <h4 className="font-ui text-sm font-semibold text-platinum mb-1 leading-snug">{course.title}</h4>
                      <p className="font-body text-xs text-muted-foreground mb-4 line-clamp-2">{course.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display text-lg font-bold text-platinum-gradient">${course.priceMXN.toLocaleString()} MXN</div>
                          <div className="font-ui text-[9px] text-muted-foreground">{course.hours} horas</div>
                        </div>
                        <button onClick={() => setActiveSection('explorar')} className="px-4 py-2 rounded-lg font-ui text-xs font-semibold btn-platinum">
                          Ver →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── EXPLORAR CURSOS ── */}
          {activeSection === 'explorar' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {COURSES.map((course) => (
                  <CourseCard key={course.id} course={course} enrolled={enrolledCourses.some((e: any) => e?.slug === course.slug)} />
                ))}
              </div>
            </div>
          )}

          {/* ── MIS CURSOS ── */}
          {activeSection === 'cursos' && (
            <div>
              {enrolledCourses.length === 0 ? (
                <div className="text-center py-20">
                  <BookOpen size={48} className="text-platinum-dim/40 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-platinum mb-2">Sin cursos aún</h3>
                  <p className="font-body text-sm text-muted-foreground mb-6">Inscríbete en un programa para comenzar.</p>
                  <button onClick={() => setActiveSection('explorar')} className="px-6 py-3 rounded-xl font-ui text-sm font-semibold btn-platinum">Explorar Programas</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {enrolledCourses.map((course: any, i: number) => (
                    <CourseCard key={i} course={COURSES.find((c) => c.slug === course?.slug) || course} enrolled={true} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── CERTIFICADOS ── */}
          {activeSection === 'certificados' && (
            <div className="text-center py-20">
              <Award size={48} className="text-platinum-dim/40 mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-platinum mb-2">Tus Certificados OBE</h3>
              <p className="font-body text-sm text-muted-foreground mb-6">Completa un programa para obtener tu certificado con QR verificable y respaldo en la nube.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.15)]">
                <CheckCircle2 size={14} className="text-platinum-dim" />
                <span className="font-ui text-xs text-platinum-dim">Certificados con código QR · Blockchain · UTAMV 2026</span>
              </div>
            </div>
          )}

          {/* ── CHAT GLOBAL ── */}
          {activeSection === 'chat' && <GlobalChatSection />}

          {/* ── AI TUTOR ── */}
          {activeSection === 'ai-tutor' && <AITutorSection />}

          {/* ── PERFIL ── */}
          {activeSection === 'perfil' && <ProfileSection />}
        </div>
      </main>
    </div>
  );
};

// ── CourseCard Component ──────────────────────────────────
const CourseCard = ({ course, enrolled }: { course: any; enrolled: boolean }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleEnroll = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // 1) Resolver el course_id real en DB por slug
      const { data: dbCourse } = await supabase
        .from('courses').select('id, price_mxn, stripe_price_id')
        .eq('slug', course.slug).maybeSingle();

      const isFree = !course.priceMXN || course.priceMXN === 0 || !course.stripePriceId;

      if (isFree && dbCourse) {
        // Inscripción directa sin pago
        const { error } = await supabase.from('enrollments').insert({
          user_id: user.id,
          course_id: dbCourse.id,
          status: 'active',
          amount_paid_mxn: 0,
        });
        if (error && !error.message.includes('duplicate')) {
          throw error;
        }
        // Refrescar la página para mostrar acceso
        window.location.href = `/campus/curso/${course.slug}`;
        return;
      }

      // 2) Pago vía Stripe checkout
      const { data, error } = await supabase.functions.invoke('create-course-checkout', {
        body: { courseSlug: course.slug, courseName: course.title, priceMXN: course.priceMXN, stripePriceId: course.stripePriceId },
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, '_blank');
    } catch (e: any) {
      console.error('enroll error:', e?.message || e);
      alert('No se pudo iniciar la inscripción. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group p-5 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] hover:border-[hsl(var(--platinum)/0.2)] transition-all hover:shadow-platinum flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="badge-academic text-[8px]">{course.level || 'Programa'}</span>
        {course.isFeatured && <span className="font-ui text-[8px] text-platinum-dim border border-[hsl(var(--platinum)/0.2)] rounded-full px-2 py-0.5">Destacado</span>}
      </div>
      <h3 className="font-ui text-sm font-bold text-platinum mb-1 leading-snug">{course.title}</h3>
      <p className="font-body text-xs text-muted-foreground mb-4 flex-1 line-clamp-3">{course.subtitle || course.description}</p>

      {/* Learning outcomes preview */}
      {course.learningOutcomes?.slice(0, 2).map((outcome: string, i: number) => (
        <div key={i} className="flex items-start gap-2 mb-1.5">
          <CheckCircle2 size={11} className="text-platinum-dim/60 flex-shrink-0 mt-0.5" />
          <span className="font-body text-[10px] text-muted-foreground line-clamp-1">{outcome}</span>
        </div>
      ))}

      <div className="mt-4 pt-4 border-t border-[hsl(var(--platinum)/0.06)] flex items-center justify-between">
        <div>
          <div className="font-display text-lg font-bold text-platinum-gradient">${(course.priceMXN || 0).toLocaleString()}<span className="text-xs font-ui text-muted-foreground ml-1">MXN</span></div>
          <div className="font-ui text-[9px] text-muted-foreground">{course.hours || 0} horas · OBE</div>
        </div>
        {enrolled ? (
          <Link to={`/campus/curso/${course.slug}`} className="px-4 py-2 rounded-lg font-ui text-xs font-semibold btn-platinum">
            Continuar →
          </Link>
        ) : (
          <button onClick={handleEnroll} disabled={loading} className="px-4 py-2 rounded-lg font-ui text-xs font-semibold btn-platinum disabled:opacity-50">
            {loading ? '...' : 'Inscribirme'}
          </button>
        )}
      </div>
    </div>
  );
};

// ── Global Chat ───────────────────────────────────────────
const GlobalChatSection = () => {
  const { user, profile } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    supabase.from('chat_messages').select('*, profiles(display_name, full_name)').eq('room', 'global').eq('is_deleted', false).order('created_at', { ascending: true }).limit(50).then(({ data }) => {
      if (data) setMessages(data);
    });

    const channel = supabase.channel('global-chat').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: 'room=eq.global' }, (payload) => {
      setMessages((prev) => [...prev, payload.new]);
    }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const send = async () => {
    if (!input.trim() || !user) return;
    setSending(true);
    await supabase.from('chat_messages').insert({ user_id: user.id, room: 'global', content: input.trim() });
    setInput('');
    setSending(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[hsl(var(--platinum)/0.06)]">
        <h3 className="font-display text-lg font-bold text-platinum">Chat Global UTAMV</h3>
        <p className="font-ui text-xs text-muted-foreground">Comunidad académica · Todos los estudiantes</p>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.user_id === user?.id ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--platinum)/0.1)] border border-[hsl(var(--platinum)/0.15)] flex items-center justify-center flex-shrink-0">
              <span className="font-display text-xs text-platinum">{(msg.profiles?.display_name || 'U')[0].toUpperCase()}</span>
            </div>
            <div className={`max-w-xs lg:max-w-md ${msg.user_id === user?.id ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <span className="font-ui text-[9px] text-muted-foreground">{msg.profiles?.display_name || msg.profiles?.full_name || 'Estudiante'}</span>
              <div className={`px-4 py-2.5 rounded-2xl font-body text-sm ${msg.user_id === user?.id ? 'bg-[hsl(var(--platinum)/0.15)] text-platinum rounded-tr-sm' : 'bg-[hsl(222_30%_10%)] text-platinum/80 rounded-tl-sm'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-8">Sé el primero en escribir en el chat global 👋</div>
        )}
      </div>
      <div className="px-5 py-4 border-t border-[hsl(var(--platinum)/0.06)] flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          className="flex-1 bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-2.5 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] transition-colors"
          placeholder="Escribe un mensaje..."
        />
        <button onClick={send} disabled={sending || !input.trim()} className="px-5 py-2.5 rounded-xl font-ui text-sm font-semibold btn-platinum disabled:opacity-50">
          Enviar
        </button>
      </div>
    </div>
  );
};

// ── AI Tutor ──────────────────────────────────────────────
const AITutorSection = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: '¡Hola! Soy la IA Tutora de UTAMV, especialista en Marketing Digital, IA Aplicada y estrategia digital para LATAM. Estoy aquí para guiarte en tu aprendizaje bajo los Principios Éticos UTAMV 2026. ¿En qué te puedo ayudar hoy?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('utamv-ai-tutor', {
        body: { message: userMsg, history: messages.slice(-6) },
      });
      if (data?.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch (e) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu consulta. Por favor intenta de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)] overflow-hidden">
      <div className="px-5 py-4 border-b border-[hsl(var(--platinum)/0.06)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[hsl(var(--platinum)/0.1)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center">
          <Bot size={18} className="text-platinum-dim" />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-platinum">IA Tutora UTAMV</h3>
          <p className="font-ui text-xs text-muted-foreground">Principios Éticos UTAMV 2026 · Sin sustitución humana</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'assistant' ? 'bg-[hsl(var(--platinum)/0.1)] border border-[hsl(var(--platinum)/0.2)]' : 'bg-[hsl(var(--platinum)/0.15)]'}`}>
              {msg.role === 'assistant' ? <Bot size={14} className="text-platinum-dim" /> : <User size={14} className="text-platinum" />}
            </div>
            <div className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-2xl font-body text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-[hsl(222_30%_10%)] text-platinum/80 rounded-tl-sm' : 'bg-[hsl(var(--platinum)/0.15)] text-platinum rounded-tr-sm'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--platinum)/0.1)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-platinum-dim" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-[hsl(222_30%_10%)] rounded-tl-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-platinum-dim/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-5 py-4 border-t border-[hsl(var(--platinum)/0.06)] flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
          className="flex-1 bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-2.5 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] transition-colors"
          placeholder="Pregunta a la IA Tutora sobre marketing digital, IA, estrategia..."
        />
        <button onClick={send} disabled={loading || !input.trim()} className="px-5 py-2.5 rounded-xl font-ui text-sm font-semibold btn-platinum disabled:opacity-50">
          Enviar
        </button>
      </div>
    </div>
  );
};

// ── Profile Section ───────────────────────────────────────
const ProfileSection = () => {
  const { user, profile, updateProfile } = useAuth();
  const [form, setForm] = useState({ full_name: profile?.full_name || '', display_name: profile?.display_name || '', bio: profile?.bio || '', profession: profile?.profession || '', country: profile?.country || 'México', phone: profile?.phone || '', linkedin_url: profile?.linkedin_url || '' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await updateProfile(form);
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="p-8 rounded-2xl bg-card-premium border border-[hsl(var(--platinum)/0.06)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--platinum)/0.1)] border border-[hsl(var(--platinum)/0.2)] flex items-center justify-center">
            <span className="font-display text-2xl font-black text-platinum">
              {(profile?.display_name || user?.email || 'U')[0].toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-platinum">{profile?.full_name || 'Estudiante UTAMV'}</h3>
            <p className="font-ui text-xs text-muted-foreground">{user?.email}</p>
            <span className="badge-academic text-[8px] mt-1 inline-block">Estudiante Activo</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { key: 'full_name', label: 'Nombre completo', placeholder: 'Tu nombre completo' },
            { key: 'display_name', label: 'Nombre de usuario', placeholder: 'Como apareces en el campus' },
            { key: 'profession', label: 'Profesión / Cargo', placeholder: 'Marketing Manager, Director...' },
            { key: 'country', label: 'País', placeholder: 'México' },
            { key: 'phone', label: 'Teléfono', placeholder: '+52 55 0000 0000' },
            { key: 'linkedin_url', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/tu-perfil' },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block font-ui text-xs font-medium text-platinum-dim mb-2">{label}</label>
              <input
                type="text"
                value={(form as any)[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.35)] transition-colors"
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block font-ui text-xs font-medium text-platinum-dim mb-2">Biografía académica</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3}
            className="w-full bg-[hsl(222_30%_8%)] border border-[hsl(var(--platinum)/0.12)] rounded-xl px-4 py-3 font-body text-sm text-platinum placeholder-muted-foreground focus:outline-none focus:border-[hsl(var(--platinum)/0.35)] transition-colors resize-none"
            placeholder="Cuéntanos sobre tu experiencia profesional y objetivos académicos..."
          />
        </div>
        <button onClick={save} disabled={saving} className="mt-6 px-6 py-3 rounded-xl font-ui text-sm font-semibold btn-platinum disabled:opacity-50">
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
};

export default Campus;
