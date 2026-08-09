import { MusicPlayer } from '@/components/ui/music-player'; // Adjust the import path as needed

const MusicPlayerDemo = () => {
  const song = {
    albumArt: 'https://images.unsplash.com/photo-1666932999834-9be147eb9610?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA0fHxnaXJsfGVufDB8MHwwfHx8MA%3D%3D', // Replace with a real image URL
    songTitle: 'Sunshine Mix',
    artistName: 'Lookee Stefane',
    // A placeholder audio file. Replace with your own audio file URL.
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-black flex items-center justify-center p-4">
        <MusicPlayer
          albumArt={song.albumArt}
          songTitle={song.songTitle}
          artistName={song.artistName}
          audioSrc={song.audioSrc}
        />
    </div>
  );
};

export default MusicPlayerDemo;
