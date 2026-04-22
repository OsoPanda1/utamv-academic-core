import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EliteBackground } from "@/components/EliteBackground";
import { UTAMVHeader } from "@/components/UTAMVHeader";
import { UTAMVFooter } from "@/components/UTAMVFooter";
import { Trophy, Medal, Award, Coins, BookOpen, Sparkles } from "lucide-react";

interface LeaderRow {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  tokens: number;
  level: number;
  badges_count: number;
  lessons_completed: number;
}

interface BadgeDef {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tier: string;
  tokens_reward: number;
}

const tierGradient: Record<string, string> = {
  bronze: "from-[#CD7F32] to-[#8b5a2b]",
  silver: "from-[#C0C0C0] to-[#7d7d7d]",
  gold: "from-[#C9A84C] to-[#a0822e]",
  platinum: "from-[#E5E4E2] to-[#a8a7a5]",
  quantum: "from-[#9B72CF] via-[#5CBDB9] to-[#C9A84C]",
};

export default function Leaderboard() {
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const [badges, setBadges] = useState<BadgeDef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: lb }, { data: bg }] = await Promise.all([
        supabase.from("leaderboard_view").select("*").limit(50),
        supabase.from("badges").select("*").order("tokens_reward", { ascending: true }),
      ]);
      setRows((lb as LeaderRow[]) || []);
      setBadges((bg as BadgeDef[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(222_38%_4%)]">
      <EliteBackground variant="petrol" />
      <div className="relative z-10">
        <UTAMVHeader />
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center mb-10 space-y-3">
            <Badge variant="outline" className="border-platinum/30 text-platinum gap-1.5">
              <Sparkles size={12} /> NextGen Gamification
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl text-platinum">
              Ranking UTAMV
            </h1>
            <p className="font-ui text-sm text-platinum-dim max-w-2xl mx-auto">
              Tokens UTAMV, insignias institucionales y progreso académico de la comunidad NextGen 2026.
            </p>
          </div>

          {/* Catálogo de insignias */}
          <Card className="mb-8 bg-[hsl(222_38%_5%)]/80 backdrop-blur border-platinum/10">
            <CardHeader>
              <CardTitle className="font-display text-platinum text-lg flex items-center gap-2">
                <Award size={18} /> Catálogo de insignias
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className="group p-3 rounded-xl border border-platinum/10 hover:border-platinum/30 transition-all bg-platinum/[0.02] text-center space-y-2"
                >
                  <div
                    className={`mx-auto w-12 h-12 rounded-full bg-gradient-to-br ${tierGradient[b.tier] || tierGradient.bronze} flex items-center justify-center shadow-lg`}
                  >
                    <Award size={20} className="text-background" />
                  </div>
                  <p className="font-display text-xs text-platinum">{b.name}</p>
                  <p className="font-ui text-[10px] text-platinum-dim leading-tight">
                    {b.description}
                  </p>
                  <Badge variant="outline" className="text-[9px] gap-1">
                    <Coins size={9} /> +{b.tokens_reward}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ranking */}
          <Card className="bg-[hsl(222_38%_5%)]/80 backdrop-blur border-platinum/10">
            <CardHeader>
              <CardTitle className="font-display text-platinum text-lg flex items-center gap-2">
                <Trophy size={18} className="text-[#C9A84C]" /> Top estudiantes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <p className="p-6 text-center text-platinum-dim text-sm">Cargando ranking…</p>
              ) : rows.length === 0 ? (
                <p className="p-6 text-center text-platinum-dim text-sm">
                  Aún no hay estudiantes en el ranking. Sé el primero en obtener una insignia.
                </p>
              ) : (
                <div className="divide-y divide-platinum/5">
                  {rows.map((r, i) => {
                    const rank = i + 1;
                    const rankIcon =
                      rank === 1 ? <Trophy size={16} className="text-[#C9A84C]" /> :
                      rank === 2 ? <Medal size={16} className="text-[#C0C0C0]" /> :
                      rank === 3 ? <Medal size={16} className="text-[#CD7F32]" /> :
                      <span className="text-xs text-platinum-dim font-ui">#{rank}</span>;
                    return (
                      <div
                        key={r.user_id}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-platinum/[0.03] transition-colors"
                      >
                        <div className="w-8 flex justify-center">{rankIcon}</div>
                        <Avatar className="h-10 w-10 border border-platinum/20">
                          <AvatarImage src={r.avatar_url || undefined} />
                          <AvatarFallback className="bg-platinum/10 text-platinum text-xs">
                            {r.display_name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-platinum text-sm truncate">
                            {r.display_name}
                          </p>
                          <p className="font-ui text-[11px] text-platinum-dim">
                            Nivel {r.level}
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-platinum-dim font-ui">
                            <BookOpen size={12} /> {r.lessons_completed}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-platinum-dim font-ui">
                            <Award size={12} /> {r.badges_count}
                          </div>
                          <div className="flex items-center gap-1.5 text-sm font-display text-[#C9A84C]">
                            <Coins size={14} /> {r.tokens}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link
              to="/campus"
              className="font-ui text-xs text-platinum-dim hover:text-platinum underline-offset-4 hover:underline"
            >
              ← Volver al campus
            </Link>
          </div>
        </main>
        <UTAMVFooter />
      </div>
    </div>
  );
}
