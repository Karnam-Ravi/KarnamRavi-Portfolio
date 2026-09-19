import { useEffect, useState } from 'react';
import { PORTRAIT_SLIDES } from '../data/media';

type PortraitSlideshowProps = {
  /** Milliseconds each photo stays on screen. */
  interval?: number;
};

/**
 * Cross-fades the hero photos. Only three stacked images changing opacity, so it
 * costs nothing on the main thread — and it holds on the first frame for anyone
 * who has asked for reduced motion.
 */
export default function PortraitSlideshow({ interval = 4200 }: PortraitSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (PORTRAIT_SLIDES.length < 2) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PORTRAIT_SLIDES.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval]);

  return (
    <div
      className="relative w-full aspect-[2/3] overflow-hidden rounded-t-[60px] sm:rounded-t-[80px] md:rounded-t-[100px]"
      style={{
        // Fades the photo into the black background so it reads like a cut-out
        // rather than a pasted rectangle.
        WebkitMaskImage:
          'linear-gradient(180deg, #000 0%, #000 74%, rgba(0,0,0,0.3) 92%, transparent 100%)',
        maskImage:
          'linear-gradient(180deg, #000 0%, #000 74%, rgba(0,0,0,0.3) 92%, transparent 100%)',
      }}
    >
      {PORTRAIT_SLIDES.map((slide, slideIndex) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slideIndex === index ? slide.alt : ''}
          aria-hidden={slideIndex !== index}
          width={800}
          height={1200}
          decoding="async"
          loading={slideIndex === 0 ? 'eager' : 'lazy'}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover object-center select-none transition-opacity duration-1000 ease-in-out"
          style={{ opacity: slideIndex === index ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
