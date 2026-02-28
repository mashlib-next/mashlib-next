import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, DCT } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

const VIDEO_EXTENSIONS: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',
  '.ogv': 'video/ogg',
  '.mov': 'video/mp4',
  '.m4v': 'video/mp4',
}

/**
 * Check if the URI looks like a video file based on extension.
 */
function getVideoType(uri: string): string | undefined {
  try {
    const path = new URL(uri).pathname.toLowerCase()
    for (const [ext, mime] of Object.entries(VIDEO_EXTENSIONS)) {
      if (path.endsWith(ext)) return mime
    }
  } catch {
    // invalid URL
  }
  return undefined
}

/**
 * Check if the subject has an RDF type indicating it's a video.
 */
function hasVideoType(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(SCHEMA('VideoObject').value)) return true

  return false
}

export const videoPane: Pane = {
  label: 'Video',
  icon: '\u{1F3AC}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return getVideoType(subject.value) !== undefined || hasVideoType(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'video-view'

    const video = document.createElement('video')
    video.className = 'video-main'
    video.controls = true
    video.preload = 'metadata'

    const mimeType = getVideoType(subject.value)
    if (mimeType) {
      const source = document.createElement('source')
      source.src = subject.value
      source.type = mimeType
      video.appendChild(source)
    } else {
      video.src = subject.value
    }

    const fallback = document.createElement('p')
    fallback.textContent = 'Your browser does not support this video format.'
    video.appendChild(fallback)

    wrapper.appendChild(video)

    // Caption from RDF metadata if available
    const title =
      store.any(subject, DCT('title'), null, null)?.value ??
      store.any(subject, SCHEMA('name'), null, null)?.value
    const description =
      store.any(subject, DCT('description'), null, null)?.value ??
      store.any(subject, SCHEMA('description'), null, null)?.value

    if (title || description) {
      const caption = document.createElement('div')
      caption.className = 'video-caption'
      if (title) {
        const titleEl = document.createElement('h3')
        titleEl.textContent = title
        caption.appendChild(titleEl)
      }
      if (description) {
        const descEl = document.createElement('p')
        descEl.textContent = description
        caption.appendChild(descEl)
      }
      wrapper.appendChild(caption)
    }

    container.appendChild(wrapper)
  },
}
