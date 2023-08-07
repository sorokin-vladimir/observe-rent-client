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
