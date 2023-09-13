import DOMPurify from "dompurify";

function sanitize(str: string) {
  return DOMPurify.sanitize?.(str).trim() ?? str;
}

export function sanitizeFlatObj(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {};
  const keys = Object.keys(obj);

  for (const key of keys) {
    if (obj[key]) {
      if ((key === 'area' || key === 'livingArea') && typeof obj[key] === 'string') {
        newObj[key] = parseFloat(obj[key] as string);
      } else if (typeof obj[key] === "string") {
        // TODO: remove `as string`
        newObj[key] = sanitize(obj[key] as string);
      } else if (obj[key] === undefined) {
        // Do nothing
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
}
