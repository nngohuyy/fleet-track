export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function replaceUnderscore(str: string) {
  let result = str.replace(/_/g, " ");
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result;
}

export function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleString();
}