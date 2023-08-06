export function isValidPath(path: string): boolean {
  return path.startsWith('/') && (
    path === '/' ||
    path === '/h'
  )
}
