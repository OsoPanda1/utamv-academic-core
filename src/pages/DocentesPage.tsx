import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import EliteBackground from '@/components/EliteBackground';
import { 
  Search, Filter, Star, Users, Briefcase, GraduationCap, 
  MapPin, Globe, Mail, Phone, Share2, ChevronRight, ExternalLink
} from 'lucide-react';
import { useState } from 'react';

const teachers = [
  {
    id: 1,
    name: 'Edwin Oswaldo Castillo Trejo (Anubis Villaseñor)',
    title: 'CEO Fundador de TAMV ONLINE, TAMV ONLINE METAVERSO, THE SOF, UTAMV',
    bio: 'Expertise Autodidacta de Alto Nivel. Un perfil forjado en la experimentación directa, la creación de ecosistemas digitales complejos y el liderazgo de proyectos tecnológicos a gran escala, superando las mallas curriculares tradicionales mediante la aplicación empírica y el desarrollo de arquitecturas web disruptivas.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    area: 'Inteligencia Artificial',
    rating: 5.0,
    courses: 5,
    students: 2000,
    location: 'Real del Monte, Hidalgo',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
      website: '#'
    },
    orcid: 'Edwin Oswaldo Castillo Trejo',
    slogan: 'NO IMITAMOS EL FUTURO. NOSOTROS SOMOS EL FUTURO. LO SOÑAMOS, LO CREAMOS, LO SENTIMOS Y DEFINITIVAMENTE LO VIVIMOS.',
    inspiration: 'DEJAR MI NOMBRE, ESCRITO EN LA HISTORIA MODERNA DE LA WEB.',
    limitation: 'SOLO MI MENTE, TIENE LA CAPACIDAD PARA DETENERME.'
  },
  {
    id: 2,
    name: 'RENATA JAZMIN',
    title: 'CEO Fundadora de ORBITA DIGITAL',
    bio: 'Expertise como Community Manager en comunidades latinas a gran escala. Desarrolladora de Estrategias y Métodos comprobados para visionarios y emprendedores que no se conforman con una respuesta negativa. Liderazgo en expansión de mercados transatlánticos.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    area: 'Marketing Digital',
    rating: 4.9,
    courses: 4,
    students: 1500,
    location: 'Argentina',
    socialLinks: {
      linkedin: '#',
      twitter: '#',
      website: '#'
    }
  }
];

const areas = ['Todas las áreas', 'Marketing Digital', 'Inteligencia Artificial'];

const DocentesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas las áreas');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         teacher.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArea = selectedArea === 'Todas las áreas' || teacher.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <EliteBackground variant="platinum" />
      <div className="relative z-10">
      <UTAMVHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[hsl(222_35%_5%)] to-[hsl(222_35%_5%/0.9)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-6">Nuestro Equipo Académico</h1>
              <p className="font-body text-lg text-platinum/65 mb-12">
                Profesionales expertos y reconocidos en sus campos, comprometidos con la excelencia educativa
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-[hsl(222_35%_5%)] border-y border-[hsl(var(--platinum)/0.1)]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 w-full max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-platinum-dim" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar docentes por nombre, especialidad..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum placeholder:text-platinum-dim focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] focus:ring-1 focus:ring-[hsl(var(--platinum)/0.3)] transition-all"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {areas.map(area => (
                    <button
                      key={area}
                      onClick={() => setSelectedArea(area)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        selectedArea === area
                          ? 'bg-[hsl(var(--platinum)/0.1)] text-platinum border border-[hsl(var(--platinum)/0.3)]'
                          : 'text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)]'
                      }`}
                    >
                      <Filter size={16} />
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teachers Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredTeachers.map(teacher => (
                  <div 
                    key={teacher.id}
                    className="bg-[hsl(222_35%_5%/0.5)] border border-[hsl(var(--platinum)/0.1)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[hsl(var(--platinum)/0.3)] hover:shadow-lg hover:shadow-platinum/10 group"
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-[hsl(var(--platinum)/0.1)] flex-shrink-0">
                          <img 
                            src={teacher.image} 
                            alt={teacher.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-xl font-semibold text-platinum mb-1 group-hover:text-platinum transition-colors">
                            {teacher.name}
                          </h3>
                          <p className="text-sm text-platinum-dim mb-2">{teacher.title}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 rounded text-xs text-platinum-dim bg-[hsl(var(--platinum)/0.1)]">
                              {teacher.area}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="font-body text-sm text-platinum/65 mb-4 line-clamp-3">
                        {teacher.bio}
                      </p>

                      {teacher.orcid && (
                        <div className="mb-4 p-3 bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] rounded-lg">
                          <p className="text-xs text-platinum-dim mb-1">ORCID: {teacher.orcid}</p>
                        </div>
                      )}

                      {teacher.slogan && (
                        <div className="mb-4 p-3 bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] rounded-lg">
                          <p className="text-sm font-semibold text-platinum italic mb-1">"{teacher.slogan}"</p>
                        </div>
                      )}

                      {teacher.inspiration && (
                        <div className="mb-4 p-3 bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] rounded-lg">
                          <p className="text-xs text-platinum-dim mb-1">Inspiración:</p>
                          <p className="text-sm text-platinum italic">"{teacher.inspiration}"</p>
                        </div>
                      )}

                      {teacher.limitation && (
                        <div className="mb-4 p-3 bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] rounded-lg">
                          <p className="text-xs text-platinum-dim mb-1">Limitación:</p>
                          <p className="text-sm text-platinum italic">"{teacher.limitation}"</p>
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-xl font-semibold text-platinum">{teacher.courses}</div>
                          <div className="text-xs text-platinum-dim">Cursos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-semibold text-platinum">{teacher.students}</div>
                          <div className="text-xs text-platinum-dim">Alumnos</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-xl font-semibold text-platinum">
                            {teacher.rating}
                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="text-xs text-platinum-dim">Calificación</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--platinum)/0.1)]">
                        <div className="flex items-center gap-2 text-xs text-platinum-dim">
                          <MapPin size={12} />
                          <span>{teacher.location}</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-platinum-dim hover:text-platinum hover:bg-[hsl(var(--platinum)/0.1)] transition-colors">
                          Ver Perfil <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTeachers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">👨‍🏫</div>
                  <h3 className="font-display text-xl font-semibold text-platinum mb-2">No se encontraron docentes</h3>
                  <p className="text-platinum-dim">Intenta ajustar tu búsqueda o filtros</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[hsl(222_35%_5%/0.5)] border-y border-[hsl(var(--platinum)/0.1)]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-platinum mb-2">{teachers.length}</div>
                  <div className="text-sm text-platinum-dim">Docentes Expertos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-platinum mb-2">50+</div>
                  <div className="text-sm text-platinum-dim">Cursos Dictados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-platinum mb-2">2500+</div>
                  <div className="text-sm text-platinum-dim">Alumnos Impactados</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-platinum mb-2">95%</div>
                  <div className="text-sm text-platinum-dim">Satisfacción Docente</div>
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
                ¿Interesado en ser parte de nuestro equipo?
              </h2>
              <p className="font-body text-lg text-platinum/65 mb-8">
                Buscamos profesionales apasionados por la educación y la innovación. 
                Conoce las oportunidades de colaboración y desarrollo profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm btn-platinum">
                  Ver Oportunidades <ExternalLink size={16} />
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-platinum-dim border border-[hsl(var(--platinum)/0.2)] hover:border-[hsl(var(--platinum)/0.4)] hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-all">
                  Contactar Dirección <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <UTAMVFooter />
    </div>
  );
};

export default DocentesPage;
