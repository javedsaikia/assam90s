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

      {/* ---------------- Discreet site chrome ---------------- */}
      <header className="pointer-events-none absolute left-[max(1.5rem,env(safe-area-inset-left))] top-[max(1.5rem,env(safe-area-inset-top))] z-30 flex items-center gap-3 sm:left-10 sm:top-8">
        <span className="grid h-7 w-7 place-items-center rounded-sm border border-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.35em] text-white/70">90's Assam</span>
      </header>

      <div className="pointer-events-none absolute right-[max(1.5rem,env(safe-area-inset-right))] top-[max(1.5rem,env(safe-area-inset-top))] z-30 hidden font-label text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex md:items-center md:gap-3 md:right-10 md:top-8">
        <span>Index 01</span>
        <span className="h-3 w-px bg-white/20" />
        <span className="text-white/60">Analog Session</span>
      </div>

      <footer className="pointer-events-none absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-[max(1.5rem,env(safe-area-inset-left))] z-30 flex flex-col gap-1 font-label text-[9px] uppercase tracking-[0.28em] text-white/35 sm:bottom-8 sm:left-10">
        <span>26.2006° N — 92.9376° E</span>
        <span className="text-white/60">Built by Javed Saikia</span>
      </footer>

      <div className="pointer-events-none absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] z-30 hidden font-label text-[9px] uppercase tracking-[0.28em] text-white/35 sm:bottom-8 sm:right-10 md:block">
        © 2026 · Sound on
      </div>

      {/* ---------------- Hero: the artwork, kept as-is ---------------- */}
      <section className="relative z-10 flex min-h-svh items-center px-[5vw] py-[6vh]">
        {/* blurred colour extension bleeding into the page (desktop only — saves mobile GPU) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden opacity-20 mix-blend-screen blur-3xl md:block">
          <img src="/cover.jpg" alt="" draggable={false} className="h-full w-full object-cover" />
        </div>

        {/* ambient glow behind the frame */}
        <div aria-hidden className="pointer-events-none absolute z-0 rounded-[24px] bg-[radial-gradient(circle_at_50%_50%,rgba(150,170,215,0.1),transparent_70%)] blur-md" />

        <div className="relative z-10 mx-auto my-auto flex w-fit flex-col items-center gap-7">
          <figure className="relative">
            <img
              src="/cover.jpg"
              srcSet="/cover-mobile.jpg 1600w, /cover.jpg 2528w"
              sizes="(min-width: 1024px) 70vw, 92vw"
              alt="A cinematic scene — press the record below to play"
              fetchPriority="high"
              draggable={false}
              className="block h-auto max-h-[64svh] w-auto max-w-[88vw] select-none rounded-xl object-contain shadow-[0_45px_90px_-25px_rgba(0,0,0,0.8),0_18px_40px_-18px_rgba(0,0,0,0.6)]"
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
          <div className="drop-shadow-[0_28px_45px_rgba(0,0,0,0.6)]">
            <MusicPlayer
              albumArt="/vinyl.jpg?v=2"
              songTitle="Mai Jaan Tuke dekha Pay"
              artistName="Ridip Dutta"
              audioSrc="/audio/track.mp3"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
