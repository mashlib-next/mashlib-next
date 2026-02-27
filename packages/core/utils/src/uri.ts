/**
 * Extract the fragment identifier from a URI (the part after #).
 * Returns empty string if no fragment present.
 */
export function fragment(uri: string): string {
  const idx = uri.indexOf('#')
  return idx >= 0 ? uri.slice(idx + 1) : ''
}

/**
 * Extract the document URL (everything before the #).
 * If no fragment, returns the URI unchanged.
 */
export function docUrl(uri: string): string {
  const idx = uri.indexOf('#')
  return idx >= 0 ? uri.slice(0, idx) : uri
}

/**
 * Get a human-readable label from a URI:
 * uses the fragment if present, otherwise the last path segment.
 */
export function labelFromUri(uri: string): string {
  const frag = fragment(uri)
  if (frag) return decodeURIComponent(frag)
  const path = new URL(uri).pathname
  const segments = path.split('/').filter(Boolean)
  return segments.length > 0
    ? decodeURIComponent(segments[segments.length - 1])
    : uri
}
