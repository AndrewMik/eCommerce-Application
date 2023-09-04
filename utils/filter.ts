export function getCapitalizedFirstLabel(name: string): string {
  const label = name.toString().split('-')[0];
  return label.charAt(0).toUpperCase() + label.slice(1);
}
