export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return formattedDate;
}
