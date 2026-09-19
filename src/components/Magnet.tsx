import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

type MagnetProps = {
  children: ReactNode;
  /** Distance in px outside the element's edges where the magnet activates. */
  padding?: number;
  disabled?: boolean;
  /** Higher strength divides the offset further, so the pull is weaker. */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
};

export default function Magnet({
  children,
  padding = 100,
  disabled = false,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const isActive = useRef(false);

  useEffect(() => {
    // Fine-pointer only: on touch there is no hover, so skip the listener entirely.
    const canHover =
      typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
    if (disabled || !canHover) return;

    const apply = () => {
      frame.current = 0;
      const wrapper = wrapperRef.current;
      const inner = innerRef.current;
      if (!wrapper || !inner) return;

      const { left, top, width, height } = wrapper.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const withinX = Math.abs(centerX - pointer.current.x) < width / 2 + padding;
      const withinY = Math.abs(centerY - pointer.current.y) < height / 2 + padding;

      if (withinX && withinY) {
        if (!isActive.current) {
          isActive.current = true;
          inner.style.transition = activeTransition;
        }
        const x = (pointer.current.x - centerX) / strength;
        const y = (pointer.current.y - centerY) / strength;
        inner.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      } else if (isActive.current) {
        isActive.current = false;
        inner.style.transition = inactiveTransition;
        inner.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    // Writes the transform straight to the DOM, one update per animation frame,
    // so moving the mouse never triggers a React re-render.
    const handleMouseMove = (event: MouseEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      if (!frame.current) frame.current = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [padding, disabled, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <div
        ref={innerRef}
        className={innerClassName}
        style={{ transform: 'translate3d(0, 0, 0)', transition: inactiveTransition }}
      >
        {children}
      </div>
    </div>
  );
}
