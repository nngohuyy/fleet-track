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

export function formatISODate(dateString: string): string {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
  };
  
  const formattedDate = date.toLocaleDateString('en-US', options);

  const day = date.getDate();
  const daySuffix = getDaySuffix(day);

  return formattedDate.replace(day.toString(), day.toString() + daySuffix);
}

function getDaySuffix(day: number): string {
  if (day > 3 && day < 21) return 'th'; // Exception for 11th to 13th
  switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
  }
}
