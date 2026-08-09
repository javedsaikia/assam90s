import { useState } from 'react'
import { Plus } from 'lucide-react'
import { MusicPlayer } from '@/components/ui/music-player'

export default function App() {
  const [videoSrc] = useState(() =>
    window.matchMedia('(max-width: 767px)').matches ? '/cover-mobile.mp4' : '/cover-web.mp4',
  )

  return (
    <main className="relative flex min-h-svh w-full flex-col overflow-x-hidden bg-[#040508] text-white">
      {/* ---------------- Atmospheric environment ---------------- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          loop={false}
          preload="auto"
          disablePictureInPicture
          src={videoSrc}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(130%_95%_at_50%_0%,rgba(7,9,16,0.5)_0%,rgba(3,4,8,0.3)_45%,rgba(2,3,6,0.65)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(120,140,190,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_52%,rgba(0,0,0,0.6)_100%)]" />
        <div className="grain absolute inset-0 opacity-[0.06]" />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col justify-center gap-3 px-[4vw] pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:gap-5">
        {/* top row — brand */}
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-3 font-label text-sm uppercase tracking-[0.3em] text-white/80 sm:text-base">
            <span className="grid h-8 w-8 place-items-center rounded-sm border border-white/25">
              <span className="h-2 w-2 rounded-full bg-white/80" />
            </span>
            <span>
              90's Assam
              <span className="mx-2 text-white/40">—</span>
              <span className="text-white/55">Jakhalabandha</span>
            </span>
          </p>
          <p className="hidden items-center gap-3 font-label text-[10px] uppercase tracking-[0.3em] text-white/40 md:flex">
            <span>Index 01</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-white/60">Analog Session</span>
          </p>
        </div>

        {/* central image — foreground layer above the background video */}
        <figure className="relative mx-auto w-fit">
          <img
            src="/cover.jpg"
            srcSet="/cover-mobile.jpg 1600w, /cover.jpg 2528w"
            sizes="(min-width: 1024px) 90vw, 96vw"
            alt="A cinematic scene — press the record below to play"
            fetchPriority="high"
            draggable={false}
            className="block h-auto max-h-[74svh] w-auto max-w-[96vw] select-none rounded-xl object-contain shadow-[0_45px_90px_-25px_rgba(0,0,0,0.85),0_18px_40px_-18px_rgba(0,0,0,0.6)]"
          />
          {/* hairline frame */}
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
          {/* corner markers */}
          <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -left-2 -top-2 text-white/35" />
          <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -right-2 -top-2 text-white/35" />
          <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -bottom-2 -left-2 text-white/35" />
          <Plus size={11} strokeWidth={1.5} className="pointer-events-none absolute -bottom-2 -right-2 text-white/35" />
        </figure>

        {/* the record, below the artwork */}
        <div className="mx-auto drop-shadow-[0_28px_45px_rgba(0,0,0,0.6)]">
          <MusicPlayer
            albumArt="/vinyl.jpg?v=2"
            songTitle="Mai Jaan Tuke dekha Pay"
            artistName="Ridip Dutta"
            audioSrc="/audio/track.mp3"
          />
        </div>

        {/* bottom row */}
        <div className="flex items-center justify-between font-label text-[9px] uppercase tracking-[0.28em]">
          <span className="text-white/35">26.2006° N — 92.9376° E</span>
          <span className="hidden text-white/30 sm:inline">33⅓ RPM</span>
          <span className="text-white/60">Built by Javed Saikia — © 2026</span>
        </div>
      </div>
    </main>
  )
}
