import { Plus } from 'lucide-react'
import { MusicPlayer } from '@/components/ui/music-player'

export default function App() {
  return (
    <main className="relative min-h-svh w-full overflow-x-hidden bg-[#040508] text-white">
      {/* ---------------- Atmospheric environment ---------------- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(130%_95%_at_50%_0%,#0b0e15_0%,#070910_45%,#030408_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(120,140,190,0.1),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_52%,rgba(0,0,0,0.5)_100%)]" />
        <div className="grain absolute inset-0 opacity-[0.05]" />
      </div>

      {/* ---------------- Hero: the artwork, kept as-is ---------------- */}
      <section className="relative z-10 flex min-h-svh items-center px-[3vw] py-[3vh]">
        {/* blurred colour extension bleeding into the page (desktop only — saves mobile GPU) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden opacity-20 mix-blend-screen blur-3xl md:block">
          <img src="/cover.jpg" alt="" draggable={false} className="h-full w-full object-cover" />
        </div>

        {/* ambient glow behind the frame */}
        <div aria-hidden className="pointer-events-none absolute z-0 rounded-[24px] bg-[radial-gradient(circle_at_50%_50%,rgba(150,170,215,0.1),transparent_70%)] blur-md" />

        <div className="relative z-10 mx-auto my-auto flex w-[min(96vw,1800px)] flex-col items-stretch gap-4">
          {/* top row — above the image, never overlapping it */}
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.35em] text-white/70">
              <span className="grid h-6 w-6 place-items-center rounded-sm border border-white/20">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              </span>
              90's Assam
            </p>
            <p className="hidden items-center gap-3 font-label text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex">
              <span>Index 01</span>
              <span className="h-3 w-px bg-white/20" />
              <span className="text-white/60">Analog Session</span>
            </p>
          </div>

          <figure className="relative">
            <img
              src="/cover.jpg"
              srcSet="/cover-mobile.jpg 1600w, /cover.jpg 2528w"
              sizes="(min-width: 1024px) 90vw, 96vw"
              alt="A cinematic scene — press the record below to play"
              fetchPriority="high"
              draggable={false}
              className="block h-auto max-h-[74svh] w-full max-w-[96vw] select-none rounded-xl object-contain shadow-[0_45px_90px_-25px_rgba(0,0,0,0.8),0_18px_40px_-18px_rgba(0,0,0,0.6)]"
            />
            {/* hairline frame */}
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            {/* corner markers */}
            <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -left-2 -top-2 text-white/35" />
            <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -right-2 -top-2 text-white/35" />
            <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -bottom-2 -left-2 text-white/35" />
            <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -bottom-2 -right-2 text-white/35" />
          </figure>

          {/* The record, resting below the artwork */}
          <div className="mx-auto drop-shadow-[0_28px_45px_rgba(0,0,0,0.6)]">
            <MusicPlayer
              albumArt="/vinyl.jpg?v=2"
              songTitle="Mai Jaan Tuke dekha Pay"
              artistName="Ridip Dutta"
              audioSrc="/audio/track.mp3"
            />
          </div>

          {/* bottom row — below the image and player, never overlapping */}
          <div className="flex items-center justify-between font-label text-[9px] uppercase tracking-[0.28em]">
            <span className="text-white/35">26.2006° N — 92.9376° E</span>
            <span className="hidden text-white/30 sm:inline">33⅓ RPM</span>
            <span className="text-white/60">Built by Javed Saikia — © 2026</span>
          </div>
        </div>
      </section>
    </main>
  )
}
