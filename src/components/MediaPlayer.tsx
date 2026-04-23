import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Gauge, Subtitles, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MediaPlayerProps {
  videoUrl?: string | null;
  audioUrl?: string | null;
  poster?: string;
  transcript?: string | null;
  title?: string;
  onComplete?: () => void;
  onProgress?: (pct: number, position: number) => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];

export function MediaPlayer({
  videoUrl, audioUrl, poster, transcript, title, onComplete, onProgress,
}: MediaPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showSubs, setShowSubs] = useState(true);
  const [hasFiredComplete, setHasFiredComplete] = useState(false);

  const primary = videoRef.current ?? audioRef.current;

  useEffect(() => {
    setHasFiredComplete(false);
    setProgress(0);
  }, [videoUrl, audioUrl]);

  const togglePlay = async () => {
    if (!primary) return;
    if (playing) primary.pause();
    else await primary.play().catch(() => {});
  };

  const handleTimeUpdate = () => {
    if (!primary) return;
    const pct = primary.duration ? (primary.currentTime / primary.duration) * 100 : 0;
    setProgress(pct);
    setDuration(primary.duration || 0);
    onProgress?.(pct, primary.currentTime);
    if (pct >= 95 && !hasFiredComplete) {
      setHasFiredComplete(true);
      onComplete?.();
    }
  };

  const seekTo = (pct: number) => {
    if (!primary || !primary.duration) return;
    primary.currentTime = (pct / 100) * primary.duration;
  };

  const changeSpeed = (s: number) => {
    setSpeed(s);
    if (videoRef.current) videoRef.current.playbackRate = s;
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  const handleVolume = (v: number) => {
    setVolume(v);
    if (videoRef.current) videoRef.current.volume = v;
    if (audioRef.current) audioRef.current.volume = v;
    setMuted(v === 0);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const fullscreen = () => {
    const el = videoRef.current;
    if (el?.requestFullscreen) el.requestFullscreen();
  };

  return (
    <div className="space-y-3">
      <div className="relative group rounded-xl overflow-hidden bg-[hsl(222_38%_3%)] border border-platinum/10 aspect-video">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={poster}
            className="w-full h-full object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onEnded={() => { setPlaying(false); if (!hasFiredComplete) { setHasFiredComplete(true); onComplete?.(); } }}
            playsInline
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222_38%_8%)] via-[hsl(222_38%_5%)] to-[hsl(222_38%_3%)] flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#a0822e] flex items-center justify-center mx-auto shadow-2xl">
                <Volume2 size={32} className="text-background" />
              </div>
              <p className="font-ui text-xs text-platinum-dim">Audio narración · Sarah ElevenLabs</p>
            </div>
          </div>
        )}

        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={!videoUrl ? handleTimeUpdate : undefined}
            onLoadedMetadata={(e) => !videoUrl && setDuration(e.currentTarget.duration)}
            onEnded={() => !videoUrl && setPlaying(false)}
          />
        )}

        {/* Center play overlay */}
        {!playing && (videoUrl || audioUrl) && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-sm hover:bg-background/40 transition-colors"
          >
            <div className="w-20 h-20 rounded-full bg-platinum/15 border border-platinum/30 flex items-center justify-center backdrop-blur">
              <Play size={32} className="text-platinum ml-1" />
            </div>
          </button>
        )}
      </div>

      {/* Controls */}
      {(videoUrl || audioUrl) && (
        <div className="space-y-2 px-1">
          {/* Progress */}
          <div className="flex items-center gap-3 text-[10px] text-platinum-dim font-ui">
            <span className="tabular-nums w-10">{fmt((progress / 100) * duration)}</span>
            <Slider
              value={[progress]}
              max={100}
              step={0.1}
              onValueChange={(v) => seekTo(v[0])}
              className="flex-1"
            />
            <span className="tabular-nums w-10 text-right">{fmt(duration)}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <Button size="icon" variant="ghost" onClick={togglePlay} className="h-8 w-8">
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </Button>

            <div className="flex items-center gap-1.5 ml-1">
              <Button size="icon" variant="ghost" onClick={() => handleVolume(muted ? 0.85 : 0)} className="h-8 w-8">
                {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </Button>
              <Slider
                value={[muted ? 0 : volume * 100]}
                max={100}
                step={1}
                onValueChange={(v) => handleVolume(v[0] / 100)}
                className="w-20"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 gap-1 text-xs font-ui">
                  <Gauge size={12} /> {speed}×
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[hsl(222_38%_6%)] border-platinum/15">
                {SPEEDS.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => changeSpeed(s)} className="text-xs">
                    {s}× {s === speed && "•"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {transcript && (
              <Button
                size="sm"
                variant={showSubs ? "secondary" : "ghost"}
                onClick={() => setShowSubs((s) => !s)}
                className="h-8 gap-1 text-xs font-ui"
              >
                <Subtitles size={12} /> CC
              </Button>
            )}

            {videoUrl && (
              <Button size="icon" variant="ghost" onClick={fullscreen} className="h-8 w-8 ml-auto">
                <Maximize2 size={14} />
              </Button>
            )}
          </div>

          {/* Transcript / subtitles panel */}
          {transcript && showSubs && (
            <div className="mt-3 p-4 rounded-lg bg-[hsl(222_38%_3%)]/80 border border-platinum/10 max-h-40 overflow-y-auto">
              <p className="font-ui text-[10px] uppercase tracking-wider text-platinum-dim mb-2">
                Transcripción · {title || "Lección"}
              </p>
              <p className="font-ui text-xs text-foreground/85 leading-relaxed whitespace-pre-line">
                {transcript}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
