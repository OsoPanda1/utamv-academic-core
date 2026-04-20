import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import UTAMVHeader from '@/components/UTAMVHeader';
import UTAMVFooter from '@/components/UTAMVFooter';
import EliteBackground from '@/components/EliteBackground';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Cpu, Radio, Zap } from 'lucide-react';

interface FederationNode {
  id: string;
  node_name: string;
  status: string;
  ecg_rhythm: number | null;
  updated_at: string;
}

interface KernelEvent {
  id: string;
  type: string;
  payload: any;
  created_at: string;
}

interface TamvcrumLog {
  id: string;
  ecg_rhythm: number | null;
  impact_score: number | null;
  federation_id: string | null;
  emotional_state: any;
  created_at: string;
}

const ECGGraph = ({ data, label, color = 'platinum' }: { data: number[]; label: string; color?: string }) => {
  const max = Math.max(...data, 80);
  const min = Math.min(...data, 30);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / Math.max(data.length - 1, 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(' ');
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-ui text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="text-xs font-mono text-[hsl(var(--platinum))]">{data[data.length - 1] ?? 0} bpm</span>
      </div>
      <div className="relative h-24 bg-[hsl(var(--navy)/0.4)] rounded border border-[hsl(var(--platinum)/0.15)] overflow-hidden">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id={`ecg-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--platinum))" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(var(--platinum))" stopOpacity="1" />
            </linearGradient>
          </defs>
          <polyline points={points} fill="none" stroke={`url(#ecg-${label})`} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>
    </div>
  );
};

const TelemetriaIsabella = () => {
  const [nodes, setNodes] = useState<FederationNode[]>([]);
  const [events, setEvents] = useState<KernelEvent[]>([]);
  const [logs, setLogs] = useState<TamvcrumLog[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [ecgHistory, setEcgHistory] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) { setIsAdmin(false); return; }
      const { data } = await supabase.rpc('has_role', { _user_id: u.user.id, _role: 'admin' });
      setIsAdmin(!!data);
    })();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchAll = async () => {
      const [nRes, eRes, lRes] = await Promise.all([
        supabase.from('tamv_federation_ring').select('*').order('node_name'),
        supabase.from('tamv_kernel_events').select('*').order('created_at', { ascending: false }).limit(20),
        supabase.from('tamvcrums_logs').select('*').order('created_at', { ascending: false }).limit(50),
      ]);
      if (nRes.data) setNodes(nRes.data as FederationNode[]);
      if (eRes.data) setEvents(eRes.data as KernelEvent[]);
      if (lRes.data) {
        setLogs(lRes.data as TamvcrumLog[]);
        const rhythms = (lRes.data as TamvcrumLog[]).slice(0, 30).reverse().map(l => l.ecg_rhythm ?? 60);
        setEcgHistory(rhythms);
      }
    };
    fetchAll();

    const ch = supabase
      .channel('isabella-telemetry')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tamv_federation_ring' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tamv_kernel_events' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tamvcrums_logs' }, fetchAll)
      .subscribe();

    const interval = setInterval(fetchAll, 8000);
    return () => { supabase.removeChannel(ch); clearInterval(interval); };
  }, [isAdmin]);

  if (isAdmin === null) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Verificando acceso...</div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-xl font-display mb-2">Acceso restringido</h2>
          <p className="text-muted-foreground text-sm">Esta sección requiere rol administrador del kernel Isabella.</p>
        </Card>
      </div>
    );
  }

  const okNodes = nodes.filter(n => n.status === 'OK').length;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <EliteBackground variant="petrol" />
      <UTAMVHeader />
      <main className="relative z-10 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          <header className="space-y-3">
            <Badge className="bg-[hsl(var(--platinum)/0.15)] text-[hsl(var(--platinum))] border-[hsl(var(--platinum)/0.3)]">
              <Activity className="w-3 h-3 mr-1" /> Kernel Isabella · Realtime
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl">Telemetría Isabella</h1>
            <p className="text-muted-foreground max-w-2xl">
              Monitoreo en vivo del anillo de federación TAMV, eventos del kernel y rítmica TAMVCRUMS.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6 bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--platinum)/0.2)]">
              <div className="flex items-center justify-between mb-2">
                <Radio className="w-5 h-5 text-[hsl(var(--platinum))]" />
                <Badge variant="outline">{okNodes}/{nodes.length}</Badge>
              </div>
              <div className="text-3xl font-display">{nodes.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Nodos federados</div>
            </Card>
            <Card className="p-6 bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--platinum)/0.2)]">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-[hsl(var(--platinum))]" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-3xl font-display">{events.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Eventos kernel (recientes)</div>
            </Card>
            <Card className="p-6 bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--platinum)/0.2)]">
              <div className="flex items-center justify-between mb-2">
                <Cpu className="w-5 h-5 text-[hsl(var(--platinum))]" />
                <span className="text-xs font-mono">{logs[0]?.ecg_rhythm ?? '—'} bpm</span>
              </div>
              <div className="text-3xl font-display">{logs.length}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">TAMVCRUMS logs</div>
            </Card>
          </div>

          <Card className="p-6 bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--platinum)/0.2)]">
            <h2 className="font-display text-xl mb-4">ECG Federación · {ecgHistory.length} muestras</h2>
            <ECGGraph data={ecgHistory.length ? ecgHistory : [60, 62, 65, 63, 68, 70, 67]} label="Ritmo TAMVCRUMS" />
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--platinum)/0.2)]">
              <h2 className="font-display text-xl mb-4">Anillo de federación</h2>
              <div className="space-y-3">
                {nodes.map(n => (
                  <div key={n.id} className="flex items-center justify-between p-3 rounded bg-[hsl(var(--navy)/0.4)] border border-[hsl(var(--platinum)/0.1)]">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${n.status === 'OK' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                      <div>
                        <div className="font-mono text-sm">{n.node_name}</div>
                        <div className="text-xs text-muted-foreground">{new Date(n.updated_at).toLocaleString('es-MX')}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={n.status === 'OK' ? 'default' : 'destructive'}>{n.status}</Badge>
                      <div className="text-xs font-mono text-[hsl(var(--platinum))] mt-1">{n.ecg_rhythm ?? '—'} bpm</div>
                    </div>
                  </div>
                ))}
                {!nodes.length && <p className="text-sm text-muted-foreground">Sin nodos registrados.</p>}
              </div>
            </Card>

            <Card className="p-6 bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--platinum)/0.2)]">
              <h2 className="font-display text-xl mb-4">Eventos del kernel</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {events.map(e => (
                  <div key={e.id} className="p-2 rounded bg-[hsl(var(--navy)/0.4)] border border-[hsl(var(--platinum)/0.1)] text-xs">
                    <div className="flex justify-between">
                      <span className="font-mono text-[hsl(var(--platinum))]">{e.type}</span>
                      <span className="text-muted-foreground">{new Date(e.created_at).toLocaleTimeString('es-MX')}</span>
                    </div>
                  </div>
                ))}
                {!events.length && <p className="text-sm text-muted-foreground">Sin eventos recientes.</p>}
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-[hsl(var(--navy)/0.5)] border-[hsl(var(--platinum)/0.2)]">
            <h2 className="font-display text-xl mb-4">TAMVCRUMS · Stream emocional</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto">
              {logs.slice(0, 25).map(l => (
                <div key={l.id} className="p-2 rounded bg-[hsl(var(--navy)/0.4)] border border-[hsl(var(--platinum)/0.1)] text-xs">
                  <div className="font-mono text-[hsl(var(--platinum))]">{l.federation_id ?? 'isabella-core'}</div>
                  <div className="flex justify-between mt-1">
                    <span>{l.ecg_rhythm ?? '—'} bpm</span>
                    <span>impact: {l.impact_score ?? 0}</span>
                  </div>
                </div>
              ))}
              {!logs.length && <p className="text-sm text-muted-foreground col-span-full">Sin logs registrados.</p>}
            </div>
          </Card>
        </div>
      </main>
      <UTAMVFooter />
    </div>
  );
};

export default TelemetriaIsabella;
