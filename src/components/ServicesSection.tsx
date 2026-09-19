import FadeIn from './FadeIn';
import { SERVICES, SKILL_GROUPS } from '../data/profile';
import { SERVICE_IMAGES } from '../data/media';

export default function ServicesSection() {
  return (
    <section
      id="expertise"
      className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 scroll-mt-10"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="text-center font-black uppercase text-[#0C0C0C] leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Expertise
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={index * 0.1}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 md:gap-10 py-8 sm:py-10 md:py-12"
            style={{
              borderTop: '1px solid rgba(12, 12, 12, 0.15)',
              borderBottom:
                index === SERVICES.length - 1
                  ? '1px solid rgba(12, 12, 12, 0.15)'
                  : undefined,
            }}
          >
            <div className="flex items-start gap-5 sm:gap-8 md:gap-10 flex-1 min-w-0">
              <span
                className="shrink-0 font-black leading-none text-[#0C0C0C] w-[72px] sm:w-[110px] md:w-[150px]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', fontVariantNumeric: 'tabular-nums' }}
              >
                {service.number}
              </span>

              <div className="flex flex-col gap-2 sm:gap-3 text-[#0C0C0C] min-w-0">
                <h3
                  className="font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>

            <img
              src={SERVICE_IMAGES[service.number]}
              alt=""
              loading="lazy"
              decoding="async"
              className="shrink-0 w-full h-44 sm:w-[180px] sm:h-[124px] md:w-[240px] md:h-[160px] object-cover rounded-2xl"
            />
          </FadeIn>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-16 sm:mt-20 md:mt-24 grid gap-8 sm:gap-10 sm:grid-cols-2">
        {SKILL_GROUPS.map((group, index) => (
          <FadeIn key={group.label} delay={index * 0.08} className="flex flex-col gap-3">
            <h4 className="text-[#0C0C0C] font-medium uppercase tracking-widest text-xs sm:text-sm">
              {group.label}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#0C0C0C]/20 px-4 py-1.5 text-[#0C0C0C] font-light text-xs sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
