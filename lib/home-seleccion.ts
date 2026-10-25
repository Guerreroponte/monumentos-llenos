// Keep the first (most recent or highest-priority) card for each destination.
// Contributions remain available in the destination detail page.
export function destinosUnicos<T extends { href: string }>(items: T[]): T[] {
  const vistos = new Set<string>();
  return items.filter((item) => {
    if (vistos.has(item.href)) return false;
    vistos.add(item.href);
    return true;
  });
}
