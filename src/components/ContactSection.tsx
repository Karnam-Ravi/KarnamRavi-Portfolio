import { Mail, Phone, Linkedin, Github, MapPin } from 'lucide-react';
import FadeIn from './FadeIn';
import ContactForm from './ContactForm';
import { PROFILE } from '../data/profile';

const CHANNELS = [
  { Icon: Mail, label: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { Icon: Phone, label: PROFILE.phone, href: `tel:${PROFILE.phoneHref}` },
  { Icon: Linkedin, label: 'LinkedIn', href: PROFILE.linkedin },
  { Icon: Github, label: 'GitHub', href: PROFILE.github },
];

export default function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-10 scroll-mt-10"
      style={{ overflowX: 'clip' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10 sm:gap-14">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Let&apos;s talk
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          className="text-[#D7E2EA] font-light text-center leading-relaxed max-w-[520px]"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)', opacity: 0.7 }}
        >
          Open to data analyst and automation roles. Send a brief and I will reply with how I
          would approach it.
        </FadeIn>

        <FadeIn delay={0.2} className="w-full flex justify-center">
          <ContactForm />
        </FadeIn>

        <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {CHANNELS.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center gap-2 rounded-full border border-[#D7E2EA]/25 px-5 py-2.5 text-[#D7E2EA] font-light text-xs sm:text-sm transition-colors duration-300 hover:bg-[#D7E2EA]/10"
            >
              <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              {label}
            </a>
          ))}
        </FadeIn>

        <FadeIn
          delay={0.35}
          className="flex items-center gap-2 text-[#D7E2EA] font-light text-xs sm:text-sm"
          style={{ opacity: 0.5 }}
        >
          <MapPin size={15} strokeWidth={1.75} aria-hidden="true" />
          {PROFILE.location}
        </FadeIn>

        <div
          className="w-full pt-8 text-center text-[#D7E2EA] font-light text-xs uppercase tracking-widest"
          style={{ borderTop: '1px solid rgba(215, 226, 234, 0.12)', opacity: 0.45 }}
        >
          © {new Date().getFullYear()} {PROFILE.fullName} — {PROFILE.role}
        </div>
      </div>
    </footer>
  );
}
