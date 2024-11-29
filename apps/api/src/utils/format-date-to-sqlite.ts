export function formatDateToSQLite(date: Date): string {
  const [formattedDate] = date.toISOString().split("T");

  if (!formattedDate) {
    throw new Error("Date is not valid");
  }

  return formattedDate;
}

export function readDateFromSQLite(date: string): Date {
  return new Date(date);
}
