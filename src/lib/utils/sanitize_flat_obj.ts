import DOMPurify from "dompurify";

export function sanitizeFlatObj(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {};
  const keys = Object.keys(obj);

  for (const key of keys) {
    if (obj[key]) {
      if ((key === 'area' || key === 'livingArea') && typeof obj[key] === 'string') {
        newObj[key] = parseFloat(obj[key] as string);
      } else if (typeof obj[key] === "string") {
        // TODO: remove `as string`
        newObj[key] = DOMPurify.sanitize(obj[key] as string).trim();
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
}
