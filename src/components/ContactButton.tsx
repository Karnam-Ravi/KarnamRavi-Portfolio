type ContactButtonProps = {
  className?: string;
  label?: string;
  href?: string;
};

export default function ContactButton({
  className = '',
  label = 'Contact Me',
  // Sends the visitor to the contact form rather than a mailto: that silently
  // does nothing when no desktop mail client is configured.
  href = '#contact',
}: ContactButtonProps) {
  return (
    <a
      href={href}
      className={`inline-block shrink-0 rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-transform duration-300 hover:scale-[1.04] ${className}`}
      style={{
        background:
          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
}
