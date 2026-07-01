export function normalizeLimaDateTime(value: string) {
  if (/([zZ]|[+-]\d{2}:?\d{2})$/.test(value)) {
    return value;
  }

  if (value.includes("T")) {
    return `${value}-05:00`;
  }

  return `${value}T00:00:00-05:00`;
}
