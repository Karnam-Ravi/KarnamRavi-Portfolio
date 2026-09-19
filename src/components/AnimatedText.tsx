import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

type CharProps = {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
};

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  // One inline span per character — no absolute overlay copy, which halves the
  // node count and keeps the paragraph off the layout critical path.
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const total = text.length;
  let cursor = 0;

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wordIndex) => {
        const chars = word.split('').map((char) => {
          const index = cursor;
          cursor += 1;
          return (
            <Char
              key={`${wordIndex}-${index}`}
              char={char}
              progress={scrollYProgress}
              range={[index / total, (index + 1) / total]}
            />
          );
        });
        cursor += 1; // account for the space that follows this word

        return (
          <span key={wordIndex}>
            <span className="inline-block">{chars}</span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </p>
  );
}
