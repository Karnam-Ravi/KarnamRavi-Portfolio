import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import VideoBackdrop from './VideoBackdrop';
import PortraitSlideshow from './PortraitSlideshow';
import { NAV_LINKS, PROFILE } from '../data/profile';

const NAV_CLASS =
  'text-[#D7E2EA] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen md:h-screen flex flex-col overflow-hidden">
      <VideoBackdrop opacity={0.4} />

      {/* Narrow screens get the nav across the top; on md+ it sits above the photo. */}
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="md:hidden relative z-30 flex justify-between px-6 pt-6 text-sm"
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={NAV_CLASS}>
            {link.label}
          </a>
        ))}
      </FadeIn>

      <div className="relative z-20 flex-1 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] min-h-0">
        {/* Left — the words */}
        <div className="flex flex-col justify-center gap-6 md:gap-8 px-6 md:pl-10 md:pr-4 pt-10 md:pt-0 pb-4 md:pb-0">
          <FadeIn delay={0.15} y={40} className="flex flex-col gap-1 md:gap-2">
            <span
              className="text-[#D7E2EA] font-light uppercase tracking-[0.22em] text-[3.6vw] md:text-[1.7vw] lg:text-[1.35rem]"
              style={{ opacity: 0.7 }}
            >
              Hi, i&apos;m
            </span>
            {/* Full name carries the h1 — it wraps to KARNAM / RAVI in the column. */}
            <h1 className="hero-heading font-black uppercase tracking-tight leading-[0.85] text-[15vw] md:text-[11vw] lg:text-[11.5vw]">
              {PROFILE.fullName}
            </h1>
          </FadeIn>

          <FadeIn
            as="p"
            delay={0.35}
            y={20}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[300px] md:max-w-[360px]"
            style={{ fontSize: 'clamp(0.75rem, 1.1vw, 1.15rem)' }}
          >
            {PROFILE.tagline}
          </FadeIn>

          <FadeIn delay={0.5} y={20} className="pt-1">
            <ContactButton />
          </FadeIn>
        </div>

        {/* Right — nav sitting above the photo */}
        <div className="flex flex-col min-h-0">
          <FadeIn
            as="nav"
            delay={0}
            y={-20}
            className="hidden md:flex justify-end gap-6 lg:gap-10 pr-10 pt-8 text-base lg:text-[1.15rem]"
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={NAV_CLASS}>
                {link.label}
              </a>
            ))}
          </FadeIn>

          <div className="flex-1 flex items-end justify-center md:justify-end md:pr-8 lg:pr-10 min-h-0 pointer-events-none">
            <FadeIn
              delay={0.6}
              y={30}
              className="w-[290px] sm:w-[330px] md:w-full max-w-[min(290px,38vh)] sm:max-w-[min(330px,42vh)] md:max-w-[min(440px,50vh)] lg:max-w-[min(520px,54vh)]"
            >
              <PortraitSlideshow />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
