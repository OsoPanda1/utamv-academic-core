import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import EliteBackground from '@/components/EliteBackground';
import { 
  Search, Filter, MessageSquare, Users, Calendar, Star, 
  ChevronRight, ChevronDown, Plus, Share2, ThumbsUp, 
  Reply, MoreHorizontal, User as UserIcon
} from 'lucide-react';
import { useState } from 'react';

const forumCategories = [
  { id: 1, name: 'Todas las categorías', icon: '📚', count: 456 },
  { id: 2, name: 'Marketing Digital', icon: '📈', count: 123 },
  { id: 3, name: 'Inteligencia Artificial', icon: '🤖', count: 89 },
  { id: 4, name: 'Analítica y Data', icon: '📊', count: 76 },
  { id: 5, name: 'Comunicación Digital', icon: '💬', count: 67 },
  { id: 6, name: 'Tecnologías Web', icon: '🌐', count: 54 },
  { id: 7, name: 'Dudas Generales', icon: '❓', count: 47 }
];

const forumPosts = [
  {
    id: 1,
    title: '¿Cuál es la estrategia más efectiva para SEO local en 2026?',
    author: 'María López',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    category: 'Marketing Digital',
    categoryIcon: '📈',
    replies: 12,
    likes: 28,
    views: 156,
    date: '2 horas',
    tags: ['SEO', 'Local', '2026'],
    content: 'Estoy trabajando en una tienda local de café y quiero mejorar mi ranking en búsquedas locales. ¿Qué estrategias están funcionando mejor este año? Estoy especialmente interesado en optimización de Google My Business y contenido local.',
    isPinned: true
  },
  {
    id: 2,
    title: 'Herramientas de analítica para startups con presupuesto limitado',
    author: 'Carlos Ruiz',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    category: 'Analítica y Data',
    categoryIcon: '📊',
    replies: 8,
    likes: 15,
    views: 97,
    date: '5 horas',
    tags: ['Analytics', 'Startups', 'Herramientas'],
    content: 'Nuestra startup está buscando herramientas de analítica que sean efectivas pero no costosas. Ya usamos Google Analytics 4, pero queremos complementarlo con herramientas de heatmaps y sesiones de usuario. ¿Qué recomiendan?',
    isPinned: false
  },
  {
    id: 3,
    title: 'Consejos para crear contenido viral en redes sociales 2026',
    author: 'Ana García',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    category: 'Comunicación Digital',
    categoryIcon: '💬',
    replies: 23,
    likes: 45,
    views: 234,
    date: '1 día',
    tags: ['Social Media', 'Contenido', 'Viral'],
    content: 'He estado experimentando con diferentes formatos de contenido para TikTok y Instagram Reels. ¿Qué tipos de contenido están generando más engagement este año? ¿Cómo podemos optimizar para algoritmos en constante cambio?',
    isPinned: false
  },
  {
    id: 4,
    title: 'Mejores prácticas para automatizar procesos con IA',
    author: 'David Martínez',
    avatar: 'https://images.unsplash.com/photo-1500648767929-ab382013e6f1?w=100&h=100&fit=crop',
    category: 'Inteligencia Artificial',
    categoryIcon: '🤖',
    replies: 15,
    likes: 32,
    views: 189,
    date: '1 día',
    tags: ['IA', 'Automatización', 'Productividad'],
    content: 'Quiero implementar automatización con IA en mi equipo de marketing. ¿Qué herramientas y estrategias recomiendan para automatizar tareas repetitivas? Estamos especialmente interesados en chatbots y generación de contenido.',
    isPinned: true
  },
  {
    id: 5,
    title: 'Optimización de landing pages para conversiones 2026',
    author: 'Sofía Hernández',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    category: 'Tecnologías Web',
    categoryIcon: '🌐',
    replies: 6,
    likes: 18,
    views: 78,
    date: '2 días',
    tags: ['Landing Pages', 'CRO', 'Conversiones'],
    content: 'Nuestras landing pages tienen un bajo ratio de conversión. ¿Qué cambios o mejoras deberíamos implementar? Estamos usando Elementor y OptimizePress. ¿Qué herramientas de testing A/B recomiendan?',
    isPinned: false
  }
];

const ForoPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [sortBy, setSortBy] = useState('Relevancia');

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'Todas las categorías' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <EliteBackground variant="navy" />
      <div className="relative z-10">
      <UTAMVHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[hsl(222_35%_5%)] to-[hsl(222_35%_5%/0.9)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-6">Foro UTAMV</h1>
              <p className="font-body text-lg text-platinum/65 mb-12">
                La comunidad de estudiantes y profesionales de UTAMV. Comparte conocimientos, resuelve dudas y conecta con expertos.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-[hsl(222_35%_5%)] border-y border-[hsl(var(--platinum)/0.1)]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 w-full max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-platinum-dim" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar temas, preguntas, respuestas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum placeholder:text-platinum-dim focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] focus:ring-1 focus:ring-[hsl(var(--platinum)/0.3)] transition-all"
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] focus:ring-1 focus:ring-[hsl(var(--platinum)/0.3)] transition-all"
                    >
                      <option value="Relevancia">Relevancia</option>
                      <option value="Nuevos">Nuevos</option>
                      <option value="Popularidad">Popularidad</option>
                      <option value="Activos">Más activos</option>
                    </select>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium btn-platinum">
                    <Plus size={16} />
                    Nuevo Tema
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Categories Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-[hsl(222_35%_5%/0.5)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-4 sticky top-24">
                    <h3 className="font-semibold text-platinum mb-4">Categorías</h3>
                    <div className="space-y-2">
                      {forumCategories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.name)}
                          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all ${
                            selectedCategory === category.name
                              ? 'bg-[hsl(var(--platinum)/0.1)] text-platinum border border-[hsl(var(--platinum)/0.3)]'
                              : 'text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{category.icon}</span>
                            <span>{category.name}</span>
                          </div>
                          <span className="text-xs text-platinum-dim">{category.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Statistics Widget */}
                  <div className="mt-8 bg-[hsl(222_35%_5%/0.5)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-4">
                    <h3 className="font-semibold text-platinum mb-4">Estadísticas</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-platinum-dim">Total de temas:</span>
                        <span className="text-platinum font-semibold">456</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-platinum-dim">Mensajes:</span>
                        <span className="text-platinum font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-platinum-dim">Miembros:</span>
                        <span className="text-platinum font-semibold">890</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-platinum-dim">Activos hoy:</span>
                        <span className="text-platinum font-semibold">45</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forum Posts */}
                <div className="lg:col-span-3">
                  <div className="space-y-6">
                    {filteredPosts.map(post => (
                      <div 
                        key={post.id}
                        className="bg-[hsl(222_35%_5%/0.5)] border border-[hsl(var(--platinum)/0.1)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[hsl(var(--platinum)/0.3)] hover:shadow-lg hover:shadow-platinum/10"
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[hsl(var(--platinum)/0.1)] flex-shrink-0">
                              <img 
                                src={post.avatar} 
                                alt={post.author} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                {post.isPinned && (
                                  <span className="px-2 py-1 rounded text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20">
                                    Fijado
                                  </span>
                                )}
                                <span className="px-2 py-1 rounded text-xs text-platinum-dim bg-[hsl(var(--platinum)/0.1)]">
                                  {post.categoryIcon} {post.category}
                                </span>
                              </div>

                              <h3 className="font-display text-xl font-semibold text-platinum mb-2 hover:text-platinum transition-colors cursor-pointer">
                                {post.title}
                              </h3>

                              <p className="font-body text-sm text-platinum/65 mb-3 line-clamp-2">
                                {post.content}
                              </p>

                              <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag, index) => (
                                  <span 
                                    key={index}
                                    className="px-2 py-1 rounded text-xs text-platinum-dim bg-[hsl(var(--platinum)/0.06)] hover:bg-[hsl(var(--platinum)/0.1)] transition-colors cursor-pointer"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>

                              <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--platinum)/0.1)]">
                                <div className="flex items-center gap-6 text-xs text-platinum-dim">
                                  <div className="flex items-center gap-1">
                                    <Users size={12} />
                                    <span>{post.author}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    <span>{post.date} atrás</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MessageSquare size={12} />
                                    <span>{post.replies} respuestas</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ThumbsUp size={12} />
                                    <span>{post.likes} likes</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Star size={12} />
                                    <span>{post.views} vistas</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="text-platinum-dim hover:text-platinum transition-colors">
                                    <Share2 size={16} />
                                  </button>
                                  <button className="text-platinum-dim hover:text-platinum transition-colors">
                                    <MoreHorizontal size={16} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">💬</div>
                      <h3 className="font-display text-xl font-semibold text-platinum mb-2">No se encontraron temas</h3>
                      <p className="text-platinum-dim">Intenta ajustar tu búsqueda o categoría</p>
                    </div>
                  )}

                  {/* Pagination */}
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button className="px-4 py-2 rounded-lg text-sm text-platinum-dim border border-[hsl(var(--platinum)/0.1)] hover:border-[hsl(var(--platinum)/0.3)] hover:text-platinum transition-colors">
                      Anterior
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm bg-[hsl(var(--platinum)/0.1)] text-platinum border border-[hsl(var(--platinum)/0.3)]">
                      1
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm text-platinum-dim border border-[hsl(var(--platinum)/0.1)] hover:border-[hsl(var(--platinum)/0.3)] hover:text-platinum transition-colors">
                      2
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm text-platinum-dim border border-[hsl(var(--platinum)/0.1)] hover:border-[hsl(var(--platinum)/0.3)] hover:text-platinum transition-colors">
                      3
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm text-platinum-dim border border-[hsl(var(--platinum)/0.1)] hover:border-[hsl(var(--platinum)/0.3)] hover:text-platinum transition-colors">
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="py-16 bg-[hsl(222_35%_5%/0.5)] border-y border-[hsl(var(--platinum)/0.1)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-platinum mb-6">Normas del Foro</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6">
                  <h3 className="font-semibold text-platinum mb-3">1. Respeto Mutuo</h3>
                  <p className="font-body text-sm text-platinum/65">
                    Trata a otros miembros con respeto y cortesía. No toleramos lenguaje ofensivo, discriminatorio o acoso de ningún tipo.
                  </p>
                </div>
                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6">
                  <h3 className="font-semibold text-platinum mb-3">2. Contenido Relevante</h3>
                  <p className="font-body text-sm text-platinum/65">
                    Publica temas y respuestas relevantes para la comunidad. Evita spam, publicidad no autorizada o contenido off-topic.
                  </p>
                </div>
                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6">
                  <h3 className="font-semibold text-platinum mb-3">3. Integridad Académica</h3>
                  <p className="font-body text-sm text-platinum/65">
                    No comparta trabajo académico de otros estudiantes. Únicamente busca ayuda para entender conceptos y mejorar tu aprendizaje.
                  </p>
                </div>
                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6">
                  <h3 className="font-semibold text-platinum mb-3">4. Moderación</h3>
                  <p className="font-body text-sm text-platinum/65">
                    Los moderadores pueden editar o eliminar contenido que viole estas reglas. Sé consciente de las consecuencias de tu comportamiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[hsl(222_35%_5%)] to-[hsl(222_35%_5%/0.8)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-bold text-platinum mb-6">
                ¿Tienes una pregunta o quieres compartir conocimientos?
              </h2>
              <p className="font-body text-lg text-platinum/65 mb-8">
                Únete a nuestra comunidad de aprendices y expertos. Haz clic en "Nuevo Tema" para empezar la conversación.
              </p>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm btn-platinum">
                <Plus size={16} />
                Crear Nuevo Tema
              </button>
            </div>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default ForoPage;
