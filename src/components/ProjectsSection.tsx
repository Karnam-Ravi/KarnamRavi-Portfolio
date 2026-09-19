import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from './FadeIn';
import LiveProjectButton from './LiveProjectButton';
import { PROFILE } from '../data/profile';
import { PROJECT_IMAGES } from '../data/media';

type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  href: string;
  images: [string, string, string];
};

const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Workflow Automation Suite',
    category: 'Han Digital Solution',
    description:
      'n8n and Airtable pipelines that replaced repetitive documentation and reporting steps, cutting manual effort across the team.',
    stack: ['n8n', 'Airtable', 'Excel'],
    href: PROFILE.github,
    images: PROJECT_IMAGES.automation,
  },
  {
    number: '02',
    name: 'JSON Chatbot Engine',
    category: 'Applied AI',
    description:
      'A chatbot driven entirely by structured JSON, where conversation flow and responses live in data rather than hard-coded logic.',
    stack: ['JSON', 'Chatbot Design'],
    href: PROFILE.github,
    images: PROJECT_IMAGES.chatbot,
  },
  {
    number: '03',
    name: 'Expression Analysis',
    category: 'Computer Vision',
    description:
      'A real-time facial expression analysis system built with computer vision techniques to read and classify emotion from a live feed.',
    stack: ['Computer Vision', 'Python'],
    href: PROFILE.github,
    images: PROJECT_IMAGES.vision,
  },
];

const CARD_RADIUS = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function ProjectCard({ project, index, total, progress }: ProjectCardProps) {
  // Cards deeper in the stack settle at a smaller scale, so the edges peek out.
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div className="h-[86vh] sticky top-20 md:top-24 flex items-start justify-center">
      <motion.article
        className={`relative w-full overflow-hidden border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 ${CARD_RADIUS}`}
        style={{ scale, top: `${index * 28}px`, transformOrigin: 'top center' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 px-1 sm:px-3 pb-4 sm:pb-6">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className="shrink-0 font-black leading-none text-[#D7E2EA] w-[64px] sm:w-[92px] md:w-[118px]"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 104px)', fontVariantNumeric: 'tabular-nums' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-1 sm:gap-2 text-[#D7E2EA]">
              <span
                className="font-light uppercase tracking-widest"
                style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)', opacity: 0.6 }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase leading-tight"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
              <p
                className="hidden sm:block font-light leading-relaxed max-w-md"
                style={{ fontSize: 'clamp(0.8rem, 1.1vw, 1rem)', opacity: 0.6 }}
              >
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-[#D7E2EA]/70 font-light text-[0.7rem] sm:text-xs tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <LiveProjectButton href={project.href} />
        </div>

        <div className="flex gap-3 sm:gap-4 md:gap-5 items-stretch min-h-0">
          <div className="w-[40%] flex flex-col gap-3 sm:gap-4 md:gap-5">
            <img
              src={project.images[0]}
              alt={`${project.name} detail one`}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover ${CARD_RADIUS}`}
              style={{ height: 'clamp(96px, 12vw, 168px)' }}
            />
            <img
              src={project.images[1]}
              alt={`${project.name} detail two`}
              loading="lazy"
              decoding="async"
              className={`w-full object-cover ${CARD_RADIUS}`}
              style={{ height: 'clamp(120px, 16vw, 236px)' }}
            />
          </div>

          {/*
            `relative` + an absolutely positioned image is load-bearing here: with
            the image in normal flow, h-full has no definite parent height to
            resolve against, so a portrait-orientation photo stretches the whole
            row and makes that card taller than the rest of the stack.
          */}
          <div className={`relative w-[60%] overflow-hidden ${CARD_RADIUS}`}>
            <img
              src={project.images[2]}
              alt={`${project.name} hero shot`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] scroll-mt-10"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading text-center font-black uppercase leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </FadeIn>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
