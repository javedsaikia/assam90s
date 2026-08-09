import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Plus } from 'lucide-react';

// Helper to format time from seconds to MM:SS
const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds)) return '00:00';
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Interface for the component props
interface MusicPlayerProps {
  albumArt: string;
  songTitle: string;
  artistName: string;
  audioSrc: string;
}

// The main MusicPlayer component — a compact, horizontal bar
export const MusicPlayer: React.FC<MusicPlayerProps> = ({ albumArt, songTitle, artistName, audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  // Effect to handle audio updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    }

    const setAudioTime = () => {
        setCurrentTime(audio.currentTime);
        if (progressBarRef.current) {
            const progress = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;
            progressBarRef.current.style.setProperty('--progress', `${progress}%`);
        }
    };

    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', onEnded);
    
    // Cleanup event listeners
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', onEnded);
    }
  }, [audioSrc]);

  // Handle seeking through the song
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  };

  // Play/pause directly inside the user gesture so the browser allows playback
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused || audio.ended) {
      setIsPlaying(true);
      audio.play().catch(error => console.error("Error playing audio:", error));
    } else {
      setIsPlaying(false);
      audio.pause();
    }
  };
  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const toggleRepeat = () => setIsRepeat(!isRepeat);

  return (
    <div className="relative flex w-[min(620px,96vw)] items-center gap-4 rounded-xl border border-[#2F323B] bg-[#0B0B0E]/95 p-4 text-white shadow-[0_35px_70px_-25px_rgba(0,0,0,0.85)] backdrop-blur-md sm:gap-5 sm:p-5">
       <style>{`
        .player-progress {
            --progress: 0%;
            -webkit-appearance: none;
            appearance: none;
            width: 100%;
            /* tall hit area for touch, thin track below */
            height: 24px;
            background: transparent;
            outline: none;
            cursor: pointer;
            background-image:
                linear-gradient(#ffffff, #ffffff),
                linear-gradient(#2F323B, #2F323B);
            background-size: var(--progress) 3px, 100% 3px;
            background-position: left center, left center;
            background-repeat: no-repeat;
        }

        .player-progress::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            background: #ffffff;
            border: 2px solid #0B0B0E;
            border-radius: 50%;
            cursor: pointer;
            margin-top: 0;
        }

        .player-progress::-moz-range-track {
            height: 3px;
            background: #2F323B;
            border-radius: 999px;
        }

        .player-progress::-moz-range-progress {
            height: 3px;
            background: #ffffff;
            border-radius: 999px;
        }

        .player-progress::-moz-range-thumb {
            width: 14px;
            height: 14px;
            background: #ffffff;
            border: 2px solid #0B0B0E;
            border-radius: 50%;
            cursor: pointer;
        }
       `}</style>

      {/* corner markers */}
      <Plus size={10} strokeWidth={1.5} className="pointer-events-none absolute left-1.5 top-1.5 text-white/25" />
      <Plus size={10} strokeWidth={1.5} className="pointer-events-none absolute bottom-1.5 right-1.5 text-white/25" />

      <audio ref={audioRef} src={audioSrc} loop={isRepeat} preload="metadata" />

      {/* Disc */}
      <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
        <div className={`disc-spin h-full w-full rounded-full ${isPlaying ? 'spinning' : ''}`}>
          <img
            src={albumArt}
            alt={`${songTitle} album art`}
            className="h-full w-full rounded-full object-cover ring-1 ring-white/15"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/224x224/1a1a1a/ffffff?text=Music'; }}
          />
        </div>
        <span className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black ring-1 ring-white/30" />
      </div>

      {/* Track info + progress */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-editorial truncate text-lg leading-tight text-white sm:text-xl">{songTitle}</h2>
          <p className="font-label hidden shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/45 sm:block">
            {artistName}
          </p>
        </div>

        <p className="font-label mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45 sm:hidden">
          {artistName}
        </p>

        <input
          ref={progressBarRef}
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="player-progress -mb-1.5 -mt-0.5 block w-full"
          aria-label="Seek through track"
        />
        <div className="flex justify-between font-label text-[10px] uppercase tracking-[0.12em] text-white/35">
          <span className="tabular-nums">{formatTime(currentTime)}</span>
          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-2">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={toggleShuffle}
          aria-pressed={isShuffle}
          aria-label="Shuffle"
          className={`hidden rounded-full p-1.5 transition-colors duration-300 sm:block ${isShuffle ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
        >
          <Shuffle size={15} strokeWidth={1.5} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          aria-label="Previous track"
          className="rounded-full p-1.5 text-white/60 transition-colors hover:text-white"
        >
          <SkipBack size={18} strokeWidth={1.5} />
        </motion.button>

        <motion.button
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white transition-colors hover:bg-white/10"
          whileTap={{ scale: 0.92 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isPlaying ? 'pause' : 'play'}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              {isPlaying ? <Pause size={20} strokeWidth={1.75} /> : <Play size={20} strokeWidth={1.75} className="ml-0.5" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.8 }}
          aria-label="Next track"
          className="rounded-full p-1.5 text-white/60 transition-colors hover:text-white"
        >
          <SkipForward size={18} strokeWidth={1.5} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={toggleRepeat}
          aria-pressed={isRepeat}
          aria-label="Repeat"
          className={`hidden rounded-full p-1.5 transition-colors duration-300 sm:block ${isRepeat ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
        >
          <Repeat size={15} strokeWidth={1.5} />
        </motion.button>
      </div>
    </div>
  );
};
