import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import { 
  Download, QrCode, Share2, ShieldCheck, FileText, 
  Clock, CheckCircle2, ExternalLink, Eye, AlertCircle,
  Search, Filter
} from 'lucide-react';
import { useState } from 'react';

const certificates = [
  {
    id: 'UTAMV-2026-001',
    course: 'Marketing Digital 360°',
    issueDate: '15/12/2025',
    expirationDate: '15/12/2027',
    studentName: 'María López',
    studentId: '2025001',
    instructor: 'Dra. Mariana Rodríguez',
    grade: '92',
    status: 'Active',
    verified: true,
    blockchainHash: '0x7a2b...c3f4',
    downloads: 3,
    certificateImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
  },
  {
    id: 'UTAMV-2026-002',
    course: 'Inteligencia Artificial Aplicada',
    issueDate: '10/11/2025',
    expirationDate: '10/11/2027',
    studentName: 'Carlos Ruiz',
    studentId: '2025002',
    instructor: 'Ing. Carlos Mendoza',
    grade: '87',
    status: 'Active',
    verified: true,
    blockchainHash: '0x9d4e...f1a2',
    downloads: 2,
    certificateImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&h=600&fit=crop'
  },
  {
    id: 'UTAMV-2026-003',
    course: 'Analítica y Toma de Decisiones',
    issueDate: '05/10/2025',
    expirationDate: '05/10/2027',
    studentName: 'Ana García',
    studentId: '2025003',
    instructor: 'Dr. José Pérez',
    grade: '89',
    status: 'Active',
    verified: true,
    blockchainHash: '0x3e8b...a9c6',
    downloads: 4,
    certificateImage: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=600&fit=crop'
  },
  {
    id: 'UTAMV-2026-004',
    course: 'Comunicación y Marca Digital',
    issueDate: '20/09/2025',
    expirationDate: '20/09/2027',
    studentName: 'David Martínez',
    studentId: '2025004',
    instructor: 'Lic. Andrea García',
    grade: '95',
    status: 'Active',
    verified: true,
    blockchainHash: '0x6f1a...b7d3',
    downloads: 1,
    certificateImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&h=600&fit=crop'
  },
  {
    id: 'UTAMV-2026-005',
    course: 'Marketing Digital Avanzado',
    issueDate: '15/08/2025',
    expirationDate: '15/08/2027',
    studentName: 'Sofía Hernández',
    studentId: '2025005',
    instructor: 'Lic. Sofia Martínez',
    grade: '91',
    status: 'Active',
    verified: true,
    blockchainHash: '0x2c9d...e4f1',
    downloads: 5,
    certificateImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop'
  }
];

const CertificadosPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todas');
  const [selectedCourse, setSelectedCourse] = useState('Todos los cursos');

  const courses = ['Todos los cursos', 'Marketing Digital 360°', 'Inteligencia Artificial Aplicada', 'Analítica y Toma de Decisiones', 'Comunicación y Marca Digital', 'Marketing Digital Avanzado'];
  const statuses = ['Todas', 'Active', 'Expiradas'];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.course.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'Todas' || cert.status === selectedStatus;
    const matchesCourse = selectedCourse === 'Todos los cursos' || cert.course === selectedCourse;
    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleDownload = (certificateId: string) => {
    console.log('Downloading certificate:', certificateId);
  };

  const handleShare = (certificateId: string) => {
    console.log('Sharing certificate:', certificateId);
  };

  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-[hsl(222_35%_5%)] to-[hsl(222_35%_5%/0.9)]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-platinum mb-6">Mis Certificados</h1>
              <p className="font-body text-lg text-platinum/65 mb-12">
                Gestiona y descarga tus certificados digitales UTAMV con seguridad en Blockchain
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
                    placeholder="Buscar por curso, estudiante o ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum placeholder:text-platinum-dim focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] focus:ring-1 focus:ring-[hsl(var(--platinum)/0.3)] transition-all"
                  />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                  <select 
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] focus:ring-1 focus:ring-[hsl(var(--platinum)/0.3)] transition-all"
                  >
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  <select 
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--platinum)/0.06)] border border-[hsl(var(--platinum)/0.1)] text-platinum focus:outline-none focus:border-[hsl(var(--platinum)/0.3)] focus:ring-1 focus:ring-[hsl(var(--platinum)/0.3)] transition-all"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCertificates.map(cert => (
                  <div 
                    key={cert.id}
                    className="bg-[hsl(222_35%_5%/0.5)] border border-[hsl(var(--platinum)/0.1)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[hsl(var(--platinum)/0.3)] hover:shadow-lg hover:shadow-platinum/10 group"
                  >
                    {/* Certificate Preview */}
                    <div className="relative h-48 bg-gradient-to-r from-[hsl(222_35%_5%)] to-[hsl(222_35%_5%/0.8)] overflow-hidden">
                      <img 
                        src={cert.certificateImage} 
                        alt={cert.course}
                        className="w-full h-full object-cover opacity-50 hover:opacity-70 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-display text-lg font-semibold text-platinum mb-1 truncate">{cert.course}</h3>
                        <p className="text-sm text-platinum/65 truncate">{cert.studentName}</p>
                      </div>
                      {cert.verified && (
                        <div className="absolute top-4 right-4 bg-green-500/20 border border-green-500/30 px-2 py-1 rounded text-xs text-green-400 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          <span>Verificado</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Certificate Details */}
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-platinum-dim">ID Certificado</span>
                          <span className="text-sm font-mono text-platinum">{cert.id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-platinum-dim">Fecha Emisión</span>
                          <span className="text-sm text-platinum">{cert.issueDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-platinum-dim">Fecha Expiración</span>
                          <span className="text-sm text-platinum">{cert.expirationDate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-platinum-dim">Nota</span>
                          <span className="text-sm text-platinum">{cert.grade}%</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mb-4">
                        <button 
                          onClick={() => handleDownload(cert.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-platinum-dim border border-[hsl(var(--platinum)/0.1)] hover:border-[hsl(var(--platinum)/0.3)] hover:text-platinum hover:bg-[hsl(var(--platinum)/0.06)] transition-all"
                        >
                          <Download size={16} />
                          Descargar
                        </button>
                        <button 
                          onClick={() => handleShare(cert.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-platinum-dim border border-[hsl(var(--platinum)/0.1)] hover:border-[hsl(var(--platinum)/0.3)] hover:text-platinum hover:bg-[hsl(var(--platinum)/0.06)] transition-all"
                        >
                          <Share2 size={16} />
                          Compartir
                        </button>
                      </div>

                      {/* Blockchain Verification */}
                      <div className="pt-4 border-t border-[hsl(var(--platinum)/0.1)]">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-platinum-dim" />
                            <span className="text-xs text-platinum-dim">Blockchain UTAMV</span>
                          </div>
                          <span className="text-xs font-mono text-platinum-dim">{cert.blockchainHash}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-platinum-dim">
                            <QrCode size={12} />
                            <span>{cert.downloads} descargas</span>
                          </div>
                          <button className="text-platinum-dim hover:text-platinum transition-colors">
                            <ExternalLink size={12} />
                            Verificar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCertificates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="font-display text-xl font-semibold text-platinum mb-2">No se encontraron certificados</h3>
                  <p className="text-platinum-dim">Intenta ajustar tu búsqueda o filtros</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Certificate Features */}
        <section className="py-16 bg-[hsl(222_35%_5%/0.5)] border-y border-[hsl(var(--platinum)/0.1)]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-platinum mb-4">Características de los Certificados</h2>
                <p className="font-body text-lg text-platinum/65">
                  Certificados digitales seguros y verificables con tecnología Blockchain
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[hsl(var(--platinum)/0.1)] flex items-center justify-center">
                    <ShieldCheck size={24} className="text-platinum" />
                  </div>
                  <h3 className="font-semibold text-platinum mb-2">Seguridad Blockchain</h3>
                  <p className="text-sm text-platinum/65">
                    Cada certificado se registra en la blockchain para garantizar su autenticidad
                  </p>
                </div>

                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[hsl(var(--platinum)/0.1)] flex items-center justify-center">
                    <QrCode size={24} className="text-platinum" />
                  </div>
                  <h3 className="font-semibold text-platinum mb-2">Código QR Único</h3>
                  <p className="text-sm text-platinum/65">
                    Verificación instantánea mediante código QR integrado
                  </p>
                </div>

                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[hsl(var(--platinum)/0.1)] flex items-center justify-center">
                    <FileText size={24} className="text-platinum" />
                  </div>
                  <h3 className="font-semibold text-platinum mb-2">PDF Profesional</h3>
                  <p className="text-sm text-platinum/65">
                    Formato PDF de alta calidad para impresión y compartir digitalmente
                  </p>
                </div>

                <div className="bg-[hsl(222_35%_5%)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-[hsl(var(--platinum)/0.1)] flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-platinum" />
                  </div>
                  <h3 className="font-semibold text-platinum mb-2">Firma Encriptada</h3>
                  <p className="text-sm text-platinum/65">
                    Firmas digitales encriptadas por cada docente y la institución
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Instructions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[hsl(222_35%_5%/0.5)] border border-[hsl(var(--platinum)/0.1)] rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-platinum mb-4">¿Cómo verificar un certificado?</h2>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--platinum)/0.1)] flex items-center justify-center text-sm font-semibold text-platinum flex-shrink-0">1</div>
                        <div>
                          <h3 className="font-semibold text-platinum mb-1">Escanea el Código QR</h3>
                          <p className="text-sm text-platinum/65">Usa tu teléfono para escanear el código QR del certificado</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--platinum)/0.1)] flex items-center justify-center text-sm font-semibold text-platinum flex-shrink-0">2</div>
                        <div>
                          <h3 className="font-semibold text-platinum mb-1">Consulta la Blockchain</h3>
                          <p className="text-sm text-platinum/65">El QR redirigirá a la página de verificación en BlockUTAMV</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-[hsl(var(--platinum)/0.1)] flex items-center justify-center text-sm font-semibold text-platinum flex-shrink-0">3</div>
                        <div>
                          <h3 className="font-semibold text-platinum mb-1">Verifica la Autenticidad</h3>
                          <p className="text-sm text-platinum/65">Compara los datos con la blockchain y valida la firma digital</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[hsl(222_35%_5%)] rounded-lg p-6 text-center">
                    <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-r from-platinum/20 to-platinum/10 rounded-lg flex items-center justify-center">
                      <QrCode size={120} className="text-platinum/50" />
                    </div>
                    <p className="text-sm text-platinum/65 mb-3">Ejemplo de código QR de certificado</p>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-platinum-dim border border-[hsl(var(--platinum)/0.1)] hover:border-[hsl(var(--platinum)/0.3)] hover:text-platinum hover:bg-[hsl(var(--platinum)/0.06)] transition-all mx-auto">
                      <Eye size={16} /> Verificar Certificado
                    </button>
                  </div>
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
                ¿Necesitas ayuda con tus certificados?
              </h2>
              <p className="font-body text-lg text-platinum/65 mb-8">
                Si tienes problemas para descargar, compartir o verificar tus certificados, ¡contáctanos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm btn-platinum">
                  <FileText size={16} /> Guía Completa
                </button>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-platinum-dim border border-[hsl(var(--platinum)/0.2)] hover:border-[hsl(var(--platinum)/0.4)] hover:text-platinum hover:bg-[hsl(var(--platinum)/0.04)] transition-all">
                  <AlertCircle size={16} /> Reportar Problema
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

export default CertificadosPage;
