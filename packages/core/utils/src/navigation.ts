/**
 * Custom event name used for in-app navigation.
 * Panes dispatch this event; the shell listens for it.
 */
export const NAVIGATE_EVENT = 'mashlib:navigate'

export interface NavigateDetail {
  uri: string
}

/**
 * Request navigation to a URI.
 * Dispatches a CustomEvent on window that the shell listens for.
 */
export function navigate(uri: string): void {
  window.dispatchEvent(
    new CustomEvent<NavigateDetail>(NAVIGATE_EVENT, { detail: { uri } })
  )
}

/**
 * Create an <a> element that navigates within the app on click.
 * Sets href for right-click / open-in-new-tab support.
 */
export function createNavLink(uri: string, text: string): HTMLAnchorElement {
  const link = document.createElement('a')
  link.href = `?uri=${encodeURIComponent(uri)}`
  link.textContent = text
  link.addEventListener('click', (e) => {
    e.preventDefault()
    navigate(uri)
  })
  return link
}
