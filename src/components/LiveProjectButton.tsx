import { ArrowUpRight } from 'lucide-react';

type LiveProjectButtonProps = {
  className?: string;
  href: string;
  label?: string;
};

export default function LiveProjectButton({
  className = '',
  href,
  label = 'Live Project',
}: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 shrink-0 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-300 hover:bg-[#D7E2EA]/10 ${className}`}
    >
      {label}
      <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" />
    </a>
  );
}
