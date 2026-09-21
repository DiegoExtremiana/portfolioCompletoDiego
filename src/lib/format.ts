const MONTHS = [
  'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
  'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.',
];

/** 'YYYY-MM' becomes 'feb. 2021', 'YYYY' stays '2021' and 'present' becomes 'Actualidad'. */
export function formatMonthYear(value: string): string {
  if (value === 'present') return 'Actualidad';
  const [year, month] = value.split('-');
  if (!month) return year;
  return `${MONTHS[parseInt(month, 10) - 1]} ${year}`;
}

export function formatRange(start: string, end?: string): string {
  return end ? `${formatMonthYear(start)} – ${formatMonthYear(end)}` : formatMonthYear(start);
}

/** Numeric key for chronological sorting; 'present' sorts last. */
export function toSortKey(value: string): number {
  if (value === 'present') return 999999;
  const [year, month] = value.split('-');
  return parseInt(year, 10) * 100 + (month ? parseInt(month, 10) : 1);
}

export function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
