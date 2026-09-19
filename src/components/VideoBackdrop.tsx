import { useEffect, useRef, useState } from 'react';
import { HERO_VIDEO, HERO_VIDEO_LIGHT, HERO_VIDEO_POSTER } from '../data/media';

type VideoBackdropProps = {
  /** How strongly the footage reads through the black background. */
  opacity?: number;
};

/**
 * Ambient motion layer behind the hero. Kept cheap on purpose: the small file on
 * phones, paused whenever it scrolls out of view, and skipped entirely for
 * anyone who asks for reduced motion.
 */
export default function VideoBackdrop({ opacity = 0.4 }: VideoBackdropProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<{ src: string; blur: boolean } | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const wide = window.matchMedia('(min-width: 1024px)').matches;
    setSource({ src: wide ? HERO_VIDEO : HERO_VIDEO_LIGHT, blur: !wide });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !source) return;

    // Decoding a video the viewer cannot see is pure waste, so stop when it leaves.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [source]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {source ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{
            opacity,
            // Softens the upscale on the low-resolution file; the footage is a
            // defocused particle field, so the blur is invisible either way.
            filter: source.blur ? 'blur(1.5px)' : undefined,
            transform: source.blur ? 'scale(1.04)' : undefined,
          }}
          src={source.src}
          poster={HERO_VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={HERO_VIDEO_POSTER}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity }}
        />
      )}
      {/* Vignette keeps the headline readable over the moving footage. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 40%, rgba(12,12,12,0.25) 0%, rgba(12,12,12,0.75) 55%, #0C0C0C 100%)',
        }}
      />
    </div>
  );
}
