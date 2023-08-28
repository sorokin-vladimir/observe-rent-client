export function getUTCTimestamp(localTime?: string) {
  const local = localTime ? new Date(localTime) : new Date();
  return new Date(Date.UTC(
    local.getUTCFullYear(),
    local.getUTCMonth(),
    local.getUTCDate(),
    local.getUTCHours(),
    local.getUTCMinutes(),
    local.getUTCSeconds(),
    local.getUTCMilliseconds()
  )).getTime();
}

export function getLocalTimeFromUTCTimestamp(utcTimestamp: number) {
  return new Date(utcTimestamp);
}

export function addMonths(date: Date | string, months = 1) {
  const local = new Date(date);
  return new Date(local.setMonth(local.getMonth() + months));
}

export function getTimestampForMonthlyData() {
  // TODO: implement it

  // tmp
  return getUTCTimestamp();
}
