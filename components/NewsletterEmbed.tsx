'use client';

interface Props {
  src?: string;
}

export default function NewsletterEmbed({
  src = '/newsletters/imo_emissions_newsletter.html',
}: Props) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <iframe
        src={src}
        width="100%"
        height="900"
        style={{ border: 'none', display: 'block' }}
        scrolling="yes"
        loading="lazy"
        title="Newsletter"
      />
    </div>
  );
}