import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Users, GraduationCap, BookOpen, ClipboardList, Search, ShieldCheck,
  Award, RefreshCw, UserCheck, Activity, BadgeCheck,
} from "lucide-react";
import UTAMVHeader from "@/components/UTAMVHeader";

type EnrollStatus = "active" | "dropped" | "graduated" | "pending";

interface Profile {
  id: string; user_id: string; full_name: string | null; display_name: string | null;
  country: string | null; profession: string | null; created_at: string;
}
interface Enrollment {
  id: string; user_id: string; course_id: string; status: string | null;
  amount_paid_mxn: number | null; enrolled_at: string; completed_at: string | null;
}
interface Course {
  id: string; title: string; level: string | null; hours: number | null;
  price_mxn: number | null; is_active: boolean | null; slug: string;
}
interface Certificate {
  id: string; certificate_number: string; user_id: string; course_id: string;
  final_score: number | null; hours_completed: number | null;
  blockchain_hash: string | null; issued_at: string;
}

export default function ControlEscolar() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [students, setStudents] = useState<Profile[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { document.title = "Control Escolar · UTAMV"; }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      setIsAdmin(!!data);
    })();
  }, [user]);

  const loadData = async () => {
    setRefreshing(true);
    try {
      const [p, e, c, cert] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("enrollments").select("*").order("enrolled_at", { ascending: false }),
        supabase.from("courses").select("*").order("created_at", { ascending: false }),
        supabase.from("certificates").select("*").order("issued_at", { ascending: false }),
      ]);
      setStudents((p.data as Profile[]) || []);
      setEnrollments((e.data as Enrollment[]) || []);
      setCourses((c.data as Course[]) || []);
      setCertificates((cert.data as Certificate[]) || []);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  // ────────────── Lookups derivados ──────────────
  const studentByUserId = useMemo(() => {
    const m = new Map<string, Profile>();
    students.forEach((s) => m.set(s.user_id, s));
    return m;
  }, [students]);

  const courseById = useMemo(() => {
    const m = new Map<string, Course>();
    courses.forEach((c) => m.set(c.id, c));
    return m;
  }, [courses]);

  const stats = useMemo(() => {
    const active = enrollments.filter((e) => e.status === "active").length;
    const grad = enrollments.filter((e) => e.status === "graduated").length;
    const revenue = enrollments.reduce((sum, e) => sum + Number(e.amount_paid_mxn || 0), 0);
    return { active, grad, revenue };
  }, [enrollments]);

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
          <p className="text-muted-foreground">
            Esta sección está reservada al equipo de Control Escolar UTAMV.
          </p>
        </main>
      </div>
    );
  }

  // ────────────── Acciones ──────────────
  const filteredStudents = students.filter((s) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (s.full_name || "").toLowerCase().includes(q) ||
      (s.display_name || "").toLowerCase().includes(q) ||
      (s.country || "").toLowerCase().includes(q)
    );
  });

  const promoteToAdmin = async (userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });
    if (error) toast.error(error.message);
    else toast.success("✓ Promovido a administrador");
  };

  const updateEnrollmentStatus = async (id: string, status: EnrollStatus) => {
    const patch: Record<string, any> = { status };
    if (status === "graduated") patch.completed_at = new Date().toISOString();

    const { error } = await supabase
      .from("enrollments").update(patch).eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setEnrollments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    );
    toast.success(`Inscripción ${status}`);
  };

  const reissueCertificate = async (e: Enrollment) => {
    try {
      const { data, error } = await supabase.functions.invoke("generate-certificate", {
        body: { courseId: e.course_id, userId: e.user_id, finalScore: 100, reissue: true },
      });
      if (error) throw error;
      if (data?.certificate) {
        toast.success("🎓 Certificado emitido en BlockUTAMV");
        loadData();
      } else if (data?.error) {
        toast.error(data.error);
      }
    } catch (err: any) {
      toast.error(err?.message || "No se pudo emitir certificado");
    }
  };

  // ────────────── Render ──────────────
  return (
    <div className="min-h-screen bg-background">
      <UTAMVHeader />
      <main className="max-w-7xl mx-auto px-4 py-28">
        <header className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <Badge className="mb-2">PANEL ADMINISTRATIVO</Badge>
            <h1 className="font-display text-4xl font-bold">Control Escolar UTAMV</h1>
            <p className="text-muted-foreground mt-1">
              Gestión académica institucional · alumnos, inscripciones, programas y certificación BlockUTAMV.
            </p>
          </div>
          <Button variant="outline" onClick={loadData} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refrescar
          </Button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <StatCard icon={<Users />} label="Alumnos" value={students.length} />
          <StatCard icon={<ClipboardList />} label="Inscripciones" value={enrollments.length} />
          <StatCard icon={<Activity />} label="Activas" value={stats.active} accent="emerald" />
          <StatCard icon={<GraduationCap />} label="Egresados" value={stats.grad} accent="amber" />
          <StatCard icon={<BookOpen />} label="Programas" value={courses.length} />
          <StatCard icon={<Award />} label="Certificados" value={certificates.length} />
        </div>

        <Tabs defaultValue="students">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="students">Alumnos</TabsTrigger>
            <TabsTrigger value="enrollments">Inscripciones</TabsTrigger>
            <TabsTrigger value="courses">Programas</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
          </TabsList>

          {/* ── Alumnos ── */}
          <TabsContent value="students" className="mt-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" /> Padrón de alumnos
                  </CardTitle>
                  <div className="relative max-w-xs w-full">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-9"
                      placeholder="Buscar por nombre o país…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
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
                      <TableHead>Inscripciones</TableHead>
                      <TableHead>Alta</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.slice(0, 100).map((s) => {
                      const enrollCount = enrollments.filter((e) => e.user_id === s.user_id).length;
                      return (
                        <TableRow key={s.id}>
                          <TableCell className="font-medium">
                            {s.full_name || s.display_name || "—"}
                          </TableCell>
                          <TableCell>{s.country || "—"}</TableCell>
                          <TableCell>{s.profession || "—"}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{enrollCount}</Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(s.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={() => promoteToAdmin(s.user_id)}>
                              <UserCheck className="w-3 h-3 mr-1" /> Hacer admin
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredStudents.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          Sin alumnos registrados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Inscripciones ── */}
          <TabsContent value="enrollments" className="mt-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5" /> Inscripciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alumno</TableHead>
                      <TableHead>Programa</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Pagado</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrollments.slice(0, 100).map((e) => {
                      const profile = studentByUserId.get(e.user_id);
                      const course = courseById.get(e.course_id);
                      const status = (e.status || "active") as EnrollStatus;
                      return (
                        <TableRow key={e.id}>
                          <TableCell className="font-medium">
                            {profile?.full_name || profile?.display_name || (
                              <span className="font-mono text-xs text-muted-foreground">
                                {e.user_id.slice(0, 8)}…
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{course?.title || "—"}</TableCell>
                          <TableCell>
                            <Select
                              value={status}
                              onValueChange={(v) => updateEnrollmentStatus(e.id, v as EnrollStatus)}
                            >
                              <SelectTrigger className="h-8 w-[130px] text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Activa</SelectItem>
                                <SelectItem value="pending">Pendiente</SelectItem>
                                <SelectItem value="graduated">Egresada</SelectItem>
                                <SelectItem value="dropped">Baja</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            ${Number(e.amount_paid_mxn || 0).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-xs">
                            {new Date(e.enrolled_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => reissueCertificate(e)}
                            >
                              <BadgeCheck className="w-3 h-3 mr-1" /> Emitir cert.
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {enrollments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          Sin inscripciones.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Programas ── */}
          <TabsContent value="courses" className="mt-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Catálogo académico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Programa</TableHead>
                      <TableHead>Nivel</TableHead>
                      <TableHead>Horas</TableHead>
                      <TableHead>Precio MXN</TableHead>
                      <TableHead>Inscritos</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((c) => {
                      const inscritos = enrollments.filter((e) => e.course_id === c.id).length;
                      return (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{c.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{c.level}</Badge>
                          </TableCell>
                          <TableCell>{c.hours} h</TableCell>
                          <TableCell>${Number(c.price_mxn || 0).toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{inscritos}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={c.is_active ? "default" : "secondary"}>
                              {c.is_active ? "Activo" : "Inactivo"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Certificados ── */}
          <TabsContent value="certificates" className="mt-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" /> Certificados BlockUTAMV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>N°</TableHead>
                      <TableHead>Alumno</TableHead>
                      <TableHead>Programa</TableHead>
                      <TableHead>Calif.</TableHead>
                      <TableHead>Horas</TableHead>
                      <TableHead>Hash</TableHead>
                      <TableHead>Emitido</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.slice(0, 100).map((c) => {
                      const profile = studentByUserId.get(c.user_id);
                      const course = courseById.get(c.course_id);
                      return (
                        <TableRow key={c.id}>
                          <TableCell className="font-mono text-xs">{c.certificate_number}</TableCell>
                          <TableCell>{profile?.full_name || "—"}</TableCell>
                          <TableCell className="text-xs">{course?.title || "—"}</TableCell>
                          <TableCell>{c.final_score ?? "—"}/100</TableCell>
                          <TableCell>{c.hours_completed ?? "—"} h</TableCell>
                          <TableCell>
                            <code className="text-[10px] font-mono">
                              {(c.blockchain_hash || "").slice(0, 14)}…
                            </code>
                          </TableCell>
                          <TableCell className="text-xs">
                            {new Date(c.issued_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {certificates.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                          Aún no se emiten certificados.
                        </TableCell>
                      </TableRow>
                    )}
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

function StatCard({
  icon, label, value, accent,
}: {
  icon: React.ReactNode; label: string; value: number;
  accent?: "emerald" | "amber";
}) {
  const accentClass =
    accent === "emerald" ? "bg-emerald-500/10 text-emerald-400" :
    accent === "amber"   ? "bg-amber-500/10 text-amber-400" :
                           "bg-primary/10 text-primary";
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accentClass}`}>
            {icon}
          </div>
          <div>
            <div className="text-2xl font-bold font-display">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
