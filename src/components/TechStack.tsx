import { FiGithub } from 'react-icons/fi';
import { getLanguageChart } from '../data/github';
import { useInView } from '../hooks/useInView';

export function TechStack() {
  const languages = getLanguageChart();
  const [ref, inView] = useInView<HTMLDivElement>();

  if (languages.length === 0) return null;

  return (
    <div ref={ref} className="card p-6 sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-bold">Stack técnico</h3>
        <span className="inline-flex items-center gap-1.5 text-xs text-faint">
          <FiGithub size={13} />
          Calculado desde GitHub
        </span>
      </div>

      <div className="space-y-4">
        {languages.map((lang, i) => (
          <div key={lang.language}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: lang.color }}
                  aria-hidden="true"
                />
                {lang.language}
              </span>
              <span className="tabular-nums text-muted">{lang.percentage}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-smooth"
                style={{
                  width: inView ? `${lang.percentage}%` : '0%',
                  backgroundColor: lang.color,
                  transitionDelay: `${i * 90}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
