/** Combine conditional Tailwind class names without an additional runtime dependency. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
