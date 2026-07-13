import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="eyebrow">
        <span className="h-px w-8 bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="section-title mt-4">{title}</h2>
      {description && <p className="lead mt-4">{description}</p>}
    </Reveal>
  );
}
