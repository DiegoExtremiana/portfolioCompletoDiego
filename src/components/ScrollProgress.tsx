import { useScrollProgress } from '../hooks/useScrollProgress';

export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-accent to-accent2"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
