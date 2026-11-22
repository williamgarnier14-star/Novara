import { useState } from 'react'
import { Play } from 'lucide-react'

export default function PresentationVideo({ src, poster, duration, label, className = "" }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={`relative mx-auto max-w-[640px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm ${className}`}>
      <div className="relative aspect-video bg-navy-900">
        {playing ? (
          <video
            className="absolute inset-0 h-full w-full"
            src={src}
            poster={poster}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${label} (vidéo de ${duration})`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            <img src={poster} alt="" width="1280" height="720" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/30" />
            <span
              className="relative flex h-16 w-16 flex-none items-center justify-center rounded-full bg-blue-glow text-white transition-transform duration-200 group-hover:scale-105"
              style={{ boxShadow: '0 0 30px rgba(59,108,224,0.5)' }}
            >
              <Play size={22} className="ml-0.5" fill="currentColor" />
            </span>
            <span className="absolute inset-x-5 bottom-5 flex items-center justify-between text-[13px] text-white/85">
              <span>{label}</span>
              <span className="rounded-full border border-white/25 px-3 py-1 text-xs">{duration}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  )
}

