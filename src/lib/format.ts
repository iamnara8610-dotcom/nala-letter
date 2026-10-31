const MONTHS_EN = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

export function parseSlug(slug: string) {
  const [y, m] = slug.split('-');
  const month = Number(m);
  return { year: y, month, monthEn: MONTHS_EN[month - 1] ?? '', monthShort: (MONTHS_EN[month - 1] ?? '').slice(0, 3) };
}

/** '2026-11' → '2026년 11월호' */
export function issueLabelKo(slug: string) {
  const { year, month } = parseSlug(slug);
  return `${year}년 ${month}월호`;
}

/** '2026-11' → 'NOVEMBER 2026' */
export function issueLabelEn(slug: string) {
  const { year, monthEn } = parseSlug(slug);
  return `${monthEn} ${year}`;
}

/** 3 → 'VOL.03' */
export function volLabel(n: number) {
  return n > 0 ? `VOL.${String(n).padStart(2, '0')}` : 'DRAFT';
}

/** '2026-11-01' → '2026.11.01' */
export function dotDate(iso: string) {
  return iso.split('-').join('.');
}

export function pad2(n: number) {
  return String(n).padStart(2, '0');
}
