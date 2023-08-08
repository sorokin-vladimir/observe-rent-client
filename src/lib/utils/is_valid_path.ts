const singleHousing = new RegExp('^/h/[a-zA-Z0-9]{24}$')

export function isValidPath(path: string): boolean {
  return path.startsWith('/') && (
    path === '/' ||
    path === '/h' ||
    singleHousing.test(path)
  )
}
