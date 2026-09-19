import { useEffect, useRef } from 'react';
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from '../data/media';

/** Two copies is enough to cover the widest viewport plus the scroll travel. */
const duplicate = (images: string[]) => [...images, ...images];

/** Pulled left so a positive shift never exposes a gap at the strip's start. */
const STRIP_LEAD = 640;

type MarqueeRowProps = {
  images: string[];
  rowRef: React.RefObject<HTMLDivElement>;
};

function MarqueeRow({ images, rowRef }: MarqueeRowProps) {
  const tiles = duplicate(images);

  return (
    <div className="overflow-hidden">
      <div
        ref={rowRef}
        className="flex gap-3 w-max"
        style={{
          marginLeft: `-${STRIP_LEAD}px`,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      >
        {tiles.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="shrink-0 overflow-hidden rounded-2xl bg-white/5"
            style={{ width: 420, height: 270 }}
          >
            <img
              src={src}
              alt=""
              width={420}
              height={270}
              decoding="async"
              loading={index < 4 ? 'eager' : 'lazy'}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    let visible = false;

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      // Same maths as (scrollY - sectionTop + innerHeight) * 0.3, but read from a
      // single rect so we never force an extra layout pass.
      const shift = (window.innerHeight - rect.top) * 0.3 - 200;

      if (rowOneRef.current) {
        rowOneRef.current.style.transform = `translate3d(${shift}px, 0, 0)`;
      }
      if (rowTwoRef.current) {
        rowTwoRef.current.style.transform = `translate3d(${-shift}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      // Only do work while the strip is actually on screen, and at most once per frame.
      if (!visible || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
      },
      { rootMargin: '200px' }
    );
    observer.observe(section);

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10"
      style={{ overflowX: 'clip', contain: 'paint' }}
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow images={MARQUEE_ROW_ONE} rowRef={rowOneRef} />
        <MarqueeRow images={MARQUEE_ROW_TWO} rowRef={rowTwoRef} />
      </div>
    </section>
  );
}
