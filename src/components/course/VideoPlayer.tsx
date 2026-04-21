import React, { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw, 
  Settings, 
  SkipForward,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface VideoPlayerProps {
  videoUrl: string;
  onEnded?: () => void;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, onEnded, title }) => {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onReady: YouTubeProps['onReady'] = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
    setIsReady(true);
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    // 1 = playing, 2 = paused
    if (event.data === 1) setIsPlaying(true);
    else setIsPlaying(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (player && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [player, isPlaying]);

  useEffect(() => {
    if (isHovering) {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    } else {
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isHovering, isPlaying]);

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    player?.seekTo(time, true);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setVolume(val);
    player?.setVolume(val);
    if (val === 0) setIsMuted(true);
    else {
      setIsMuted(false);
      player?.unMute();
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      disablekb: 1,
    },
  };

  return (
    <div 
      className="relative w-full aspect-video bg-slate-950 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/5 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={() => {
        setIsHovering(true);
        setTimeout(() => setIsHovering(false), 2000);
      }}
    >
      {/* Loading State */}
      <AnimatePresence>
        {!isReady && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900 gap-4"
          >
            <Loader2 className="w-10 h-10 text-med-blue animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Carregando Player Premium...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <YouTube 
        videoId={videoUrl} 
        opts={opts} 
        onReady={onReady} 
        onStateChange={onStateChange}
        onEnd={onEnded}
        className="w-full h-full pointer-events-none"
      />

      {/* Interaction Layer */}
      <div 
        className="absolute inset-0 z-10 cursor-pointer"
        onClick={togglePlay}
      />

      {/* Large Central Play Button */}
      <AnimatePresence>
        {!isPlaying && isReady && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <div className="w-24 h-24 bg-med-blue/90 rounded-full flex items-center justify-center shadow-2xl shadow-med-blue/40">
              <Play fill="white" className="text-white ml-2" size={40} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute inset-x-0 bottom-0 z-30 p-6 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"
      >
        <div className="max-w-[1200px] mx-auto space-y-4 pointer-events-auto">
          {/* Progress Bar */}
          <div className="relative group/progress h-1.5 flex items-center">
            <input 
              type="range" 
              min={0} 
              max={duration || 100} 
              value={currentTime} 
              onChange={handleSeek}
              className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-med-blue shadow-[0_0_10px_rgba(59,130,246,0.8)] relative"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button 
                onClick={togglePlay}
                className="text-white hover:text-med-blue transition-colors outline-none"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
              </button>

              <button className="text-white hover:text-med-blue transition-colors">
                <SkipForward size={20} fill="currentColor" />
              </button>

              <div className="flex items-center gap-4 group/volume">
                <button 
                  onClick={toggleMute}
                  className="text-white hover:text-med-blue transition-colors"
                >
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <div className="w-0 group-hover/volume:w-20 overflow-hidden transition-all duration-300">
                  <input 
                    type="range" 
                    min={0} 
                    max={100} 
                    value={volume}
                    onChange={handleVolume}
                    className="w-full accent-med-blue"
                  />
                </div>
              </div>

              <div className="text-xs font-bold text-white/80 tabular-nums">
                {formatTime(currentTime)} <span className="text-white/30 mx-1">/</span> {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white/60 hover:text-white cursor-pointer transition-colors">
                <Settings size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Qualidade</span>
              </div>
              <button 
                onClick={() => {
                  const element = document.querySelector('.aspect-video');
                  if (element?.requestFullscreen) element.requestFullscreen();
                }}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header Info (Visible on Hover) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -20 }}
        className="absolute top-0 inset-x-0 p-8 pt-10 z-30 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-med-blue rounded-xl">
             <Play size={16} fill="white" className="text-white ml-0.5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white truncate">{title}</h4>
            <p className="text-[10px] text-white/50 font-black uppercase tracking-[0.2em]">Nexus Premium • Streaming Mode</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
