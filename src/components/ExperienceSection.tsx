import FadeIn from './FadeIn';
import { EXPERIENCE } from '../data/profile';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 scroll-mt-10"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </FadeIn>

      <div className="max-w-4xl mx-auto">
        {EXPERIENCE.map((item, index) => (
          <FadeIn
            key={`${item.org}-${item.period}`}
            delay={index * 0.1}
            className="flex flex-col md:flex-row gap-3 md:gap-10 py-8 sm:py-10"
            style={{ borderTop: '1px solid rgba(215, 226, 234, 0.15)' }}
          >
            <span
              className="shrink-0 text-[#D7E2EA] font-light uppercase tracking-widest md:w-56 pt-1"
              style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)', opacity: 0.6 }}
            >
              {item.period}
            </span>

            <div className="flex flex-col gap-2 sm:gap-3 text-[#D7E2EA]">
              <h3
                className="font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.75rem)' }}
              >
                {item.title}
              </h3>
              <p
                className="font-light"
                style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', opacity: 0.7 }}
              >
                {item.org}
              </p>

              {item.points.length > 0 && (
                <ul className="flex flex-col gap-2 pt-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="font-light leading-relaxed pl-4 relative"
                      style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)', opacity: 0.6 }}
                    >
                      <span className="absolute left-0 top-0">—</span>
                      <span className="pl-2">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
