import { useState } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import { PROFILE } from '../data/profile';

const FIELD_CLASS =
  'w-full rounded-2xl border border-[#D7E2EA]/25 bg-white/[0.03] px-5 py-3.5 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA]/35 outline-none transition-colors duration-200 focus:border-[#D7E2EA]/70';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const subject = `Portfolio enquiry${name ? ` from ${name}` : ''}`;
  const body = [
    name ? `Name: ${name}` : '',
    email ? `Email: ${email}` : '',
    '',
    message,
  ]
    .filter((line, index) => line !== '' || index === 2)
    .join('\n');

  /**
   * A bare mailto: does nothing at all when the visitor has no mail app wired up,
   * which is the common case on a fresh Windows install. Gmail's compose URL
   * always opens in the browser, so that is the primary path and mailto is the
   * fallback for anyone who does have a desktop client.
   */
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PROFILE.email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const mailtoHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    window.open(gmailHref, '_blank', 'noopener,noreferrer');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[560px] flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoComplete="name"
          className={FIELD_CLASS}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoComplete="email"
          className={FIELD_CLASS}
        />
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What would you like to build?"
        rows={4}
        className={`${FIELD_CLASS} resize-none`}
      />

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full font-medium uppercase tracking-widest text-white px-8 py-3.5 text-xs sm:text-sm transition-transform duration-300 hover:scale-[1.04]"
          style={{
            background:
              'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
            boxShadow:
              '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
            outline: '2px solid #FFFFFF',
            outlineOffset: '-3px',
          }}
        >
          <Send size={16} strokeWidth={2.2} aria-hidden="true" />
          Send Message
        </button>

        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 px-6 py-3.5 text-[#D7E2EA] font-light text-xs sm:text-sm transition-colors duration-300 hover:bg-[#D7E2EA]/10"
        >
          <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
          Use my mail app
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 px-6 py-3.5 text-[#D7E2EA] font-light text-xs sm:text-sm transition-colors duration-300 hover:bg-[#D7E2EA]/10"
        >
          {copied ? (
            <Check size={16} strokeWidth={2.2} aria-hidden="true" />
          ) : (
            <Copy size={16} strokeWidth={1.75} aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy address'}
        </button>
      </div>

      <p className="text-[#D7E2EA] font-light text-xs" style={{ opacity: 0.45 }}>
        Send Message opens a pre-filled draft to {PROFILE.email} in Gmail.
      </p>
    </form>
  );
}
