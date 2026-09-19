import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';
import { PROFILE, STATS } from '../data/profile';

const ASSET_BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7';

const DECORATIONS = [
  {
    src: `${ASSET_BASE}/moon_icon.11395d36.png`,
    alt: '3D moon',
    className:
      'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: `${ASSET_BASE}/p59_1.4659672e.png`,
    alt: '3D object',
    className:
      'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: `${ASSET_BASE}/lego_icon-1.703bb594.png`,
    alt: '3D lego brick',
    className:
      'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: `${ASSET_BASE}/Group_134-1.2e04f3ce.png`,
    alt: '3D shapes',
    className:
      'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 scroll-mt-10"
      style={{ overflowX: 'clip' }}
    >
      {DECORATIONS.map((item) => (
        <FadeIn
          key={item.src}
          delay={item.delay}
          duration={0.9}
          x={item.x}
          y={0}
          className={`absolute pointer-events-none select-none ${item.className}`}
        >
          <img src={item.src} alt={item.alt} className="w-full h-auto" draggable={false} />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </FadeIn>

          <AnimatedText
            text={PROFILE.summary}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <FadeIn
            delay={0.15}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                <span
                  className="hero-heading font-black leading-none"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[#D7E2EA] font-light uppercase tracking-widest max-w-[140px] leading-snug"
                  style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.85rem)', opacity: 0.6 }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
