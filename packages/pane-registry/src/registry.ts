import type { NamedNode, Store } from '@mashlib-next/store'
import type { Pane } from './types.js'

const panes: Pane[] = []

/**
 * Register a pane with the registry.
 * Panes registered later take priority (checked first),
 * so more specific panes should be registered after generic ones.
 */
export function register(pane: Pane): void {
  panes.push(pane)
}

/**
 * Find the best pane for the given subject.
 * Iterates panes in reverse registration order (last registered = highest priority).
 * Returns undefined if no pane can handle the subject.
 */
export function findPane(subject: NamedNode, store: Store): Pane | undefined {
  for (let i = panes.length - 1; i >= 0; i--) {
    try {
      if (panes[i].canHandle(subject, store)) {
        return panes[i]
      }
    } catch {
      // Skip panes whose canHandle throws (e.g. invalid URL parsing)
    }
  }
  return undefined
}

/**
 * Find all panes that can handle the given subject.
 * Returns panes in priority order (highest priority first).
 */
export function findMatchingPanes(subject: NamedNode, store: Store): Pane[] {
  const matching: Pane[] = []
  for (let i = panes.length - 1; i >= 0; i--) {
    try {
      if (panes[i].canHandle(subject, store)) {
        matching.push(panes[i])
      }
    } catch {
      // Skip panes whose canHandle throws
    }
  }
  return matching
}

/**
 * Return all registered panes (in registration order).
 */
export function listPanes(): readonly Pane[] {
  return panes
}

/**
 * Remove all registered panes. Used in testing.
 */
export function clearRegistry(): void {
  panes.length = 0
}
