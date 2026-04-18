import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Users, GraduationCap, BookOpen, ClipboardList, Search, ShieldCheck, Award } from "lucide-react";
import UTAMVHeader from "@/components/UTAMVHeader";

export default function ControlEscolar() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => { document.title = "Control Escolar · UTAMV"; }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      setIsAdmin(!!data);
    })();
  }, [user]);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      const [p, e, c, cert] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("enrollments").select("*").order("enrolled_at", { ascending: false }),
        supabase.from("courses").select("*").order("created_at", { ascending: false }),
        supabase.from("certificates").select("*").order("issued_at", { ascending: false }),
      ]);
      setStudents(p.data || []);
      setEnrollments(e.data || []);
      setCourses(c.data || []);
      setCertificates(cert.data || []);
    })();
  }, [isAdmin]);

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <UTAMVHeader />
        <main className="max-w-2xl mx-auto px-4 py-32 text-center">
          <ShieldCheck className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold mb-2">Acceso restringido</h1>
          <p className="text-muted-foreground">Esta sección está reservada al equipo de Control Escolar UTAMV.</p>
        </main>
      </div>
    );
  }

  const filteredStudents = students.filter(s =>
    !search || (s.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.display_name || "").toLowerCase().includes(search.toLowerCase())
  );

  const promoteToAdmin = async (userId: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
    if (error) toast.error(error.message); else toast.success("Promovido a administrador");
  };

  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="max-w-7xl mx-auto px-4 py-28">
        <header className="mb-8">
          <Badge className="mb-2">PANEL ADMINISTRATIVO</Badge>
          <h1 className="font-display text-4xl font-bold">Control Escolar UTAMV</h1>
          <p className="text-muted-foreground mt-1">Gestión académica institucional · alumnos, inscripciones, programas y certificación.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users />} label="Alumnos" value={students.length} />
          <StatCard icon={<ClipboardList />} label="Inscripciones" value={enrollments.length} />
          <StatCard icon={<BookOpen />} label="Programas" value={courses.length} />
          <StatCard icon={<Award />} label="Certificados emitidos" value={certificates.length} />
        </div>

        <Tabs defaultValue="students">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="students">Alumnos</TabsTrigger>
            <TabsTrigger value="enrollments">Inscripciones</TabsTrigger>
            <TabsTrigger value="courses">Programas</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Padrón de alumnos</CardTitle>
                  <div className="relative max-w-xs w-full">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9" placeholder="Buscar alumno…" value={search} onChange={e => setSearch(e.target.value)} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>País</TableHead>
                      <TableHead>Profesión</TableHead>
                      <TableHead>Alta</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.slice(0, 100).map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.full_name || s.display_name || "—"}</TableCell>
                        <TableCell>{s.country || "—"}</TableCell>
                        <TableCell>{s.profession || "—"}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={() => promoteToAdmin(s.user_id)}>Hacer admin</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredStudents.length === 0 && (
                      <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Sin alumnos registrados.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enrollments" className="mt-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList className="w-5 h-5" /> Inscripciones recientes</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>Alumno (ID)</TableHead><TableHead>Curso (ID)</TableHead>
                    <TableHead>Estado</TableHead><TableHead>Pagado MXN</TableHead><TableHead>Fecha</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {enrollments.slice(0, 100).map(e => (
                      <TableRow key={e.id}>
                        <TableCell className="font-mono text-xs">{e.user_id.slice(0, 8)}…</TableCell>
                        <TableCell className="font-mono text-xs">{e.course_id.slice(0, 8)}…</TableCell>
                        <TableCell><Badge variant={e.status === "active" ? "default" : "secondary"}>{e.status}</Badge></TableCell>
                        <TableCell>${Number(e.amount_paid_mxn || 0).toLocaleString()}</TableCell>
                        <TableCell className="text-xs">{new Date(e.enrolled_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {enrollments.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Sin inscripciones.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Catálogo académico</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>Programa</TableHead><TableHead>Nivel</TableHead>
                    <TableHead>Horas</TableHead><TableHead>Precio MXN</TableHead><TableHead>Estado</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {courses.map(c => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.title}</TableCell>
                        <TableCell><Badge variant="outline">{c.level}</Badge></TableCell>
                        <TableCell>{c.hours} h</TableCell>
                        <TableCell>${Number(c.price_mxn || 0).toLocaleString()}</TableCell>
                        <TableCell><Badge variant={c.is_active ? "default" : "secondary"}>{c.is_active ? "Activo" : "Inactivo"}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="mt-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Award className="w-5 h-5" /> Certificados BlockUTAMV</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>N°</TableHead><TableHead>Calificación</TableHead>
                    <TableHead>Horas</TableHead><TableHead>Hash</TableHead><TableHead>Emitido</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {certificates.slice(0, 100).map(c => (
                      <TableRow key={c.id}>
                        <TableCell className="font-mono text-xs">{c.certificate_number}</TableCell>
                        <TableCell>{c.final_score}/100</TableCell>
                        <TableCell>{c.hours_completed} h</TableCell>
                        <TableCell><code className="text-[10px] font-mono">{(c.blockchain_hash || "").slice(0, 14)}…</code></TableCell>
                        <TableCell className="text-xs">{new Date(c.issued_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {certificates.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Aún no se emiten certificados.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
          <div>
            <div className="text-2xl font-bold font-display">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
