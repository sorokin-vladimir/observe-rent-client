const regexpId = new RegExp('^[a-zA-Z0-9]{24}$')

export function isValidId(id: string): boolean {
  return regexpId.test(id);
}
