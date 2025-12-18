export function isoToDate(isoString) {
  const date = new Date(isoString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return date;
}
