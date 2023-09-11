export function getUTCTimestamp(localTime?: string) {
  const local = localTime ? new Date(localTime) : new Date();
  return Date.UTC(
    local.getUTCFullYear(),
    local.getUTCMonth(),
    local.getUTCDate(),
    local.getUTCHours(),
    local.getUTCMinutes(),
    local.getUTCSeconds(),
    local.getUTCMilliseconds()
  );
}

export function getLocalTimeFromUTCTimestamp(utcTimestamp: number) {
  return new Date(utcTimestamp);
}

export function addMonths(date: Date | string, months = 1) {
  const local = new Date(date);
  return new Date(local.setMonth(local.getMonth() + months));
}

export function getTimestampForMonthlyData(localTime?: Date | string) {
  const local = localTime ? new Date(localTime) : new Date();
  return Date.UTC(
    local.getUTCFullYear(),
    local.getUTCMonth(),
  );
}

export function timestampToReadableDate(timestamp: number, monthFormat: 'short' | 'long' = 'short') {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-UK', {month: monthFormat, year: 'numeric'});
}
