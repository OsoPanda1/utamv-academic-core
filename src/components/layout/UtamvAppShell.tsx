import type { ReactNode } from "react";
import { useAuthSession } from "@/modules/identity/useAuthSession";

interface UtamvAppShellProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

const navItems = [
  { key: "campus", label: "Campus", href: "/campus" },
  { key: "routes", label: "Rutas formativas", href: "/campus/cursos" },
  { key: "analytics", label: "Analítica académica", href: "/analytics" },
  { key: "settings", label: "Configuración", href: "/settings" },
];

export function UtamvAppShell({ title, subtitle, children }: UtamvAppShellProps) {
  const { user } = useAuthSession();
  return (
    <div className="flex min-h-screen bg-ut-bg text-slate-100">
      <aside className="hidden w-64 flex-col border-r border-ut-border/40 bg-black/40 px-4 py-5 backdrop-blur-xl md:flex">
        <div className="flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-ut-border bg-ut-accentSoft">
            <span className="text-sm font-semibold text-ut-accent">UT</span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ut-accent">UTAMV</p>
            <p className="text-[11px] text-slate-400">Nodo académico TAMV</p>
          </div>
        </div>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <a key={item.key} href={item.href} className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white">
              <span>{item.label}</span><span className="h-1 w-1 rounded-full bg-slate-500" />
            </a>
          ))}
        </nav>
        <div className="mt-auto space-y-3 border-t border-white/5 pt-4 text-xs text-slate-400">
          <div className="flex items-center justify-between"><span>Estado</span><span className="flex items-center gap-1 text-ut-success"><span className="h-1.5 w-1.5 rounded-full bg-ut-success" />Online</span></div>
          <div className="flex items-center justify-between"><span>Versión</span><span className="font-mono text-[11px] text-slate-300">v0.1.0-beta</span></div>
          <div className="flex items-center justify-between"><span>Kernel</span><span className="text-[11px] text-slate-300">Nodo Cero · MD-X4</span></div>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="border-b border-ut-border/40 bg-black/30 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
            <div className="min-w-0">{title && <h1 className="truncate text-sm font-semibold text-slate-50 md:text-base">{title}</h1>}{subtitle && <p className="truncate text-[11px] text-slate-400 md:text-xs">{subtitle}</p>}</div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[11px] text-slate-300 md:flex"><span>Perfil</span><span className="h-1 w-1 rounded-full bg-slate-500" /><span>{user?.role ?? "Invitado"}</span></div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium">{user?.displayName?.[0]?.toUpperCase() ?? "U"}</div>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-gradient-to-b from-ut-bg via-ut-card to-black"><div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">{children}</div></main>
      </div>
    </div>
  );
}
