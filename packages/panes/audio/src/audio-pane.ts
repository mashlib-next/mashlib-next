import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, DCT, MO } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

const AUDIO_EXTENSIONS: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.oga': 'audio/ogg',
  '.flac': 'audio/flac',
  '.aac': 'audio/aac',
  '.m4a': 'audio/mp4',
  '.opus': 'audio/opus',
  '.weba': 'audio/webm',
}

/**
 * Check if the URI looks like an audio file and return its MIME type.
 */
function getAudioType(uri: string): string | undefined {
  try {
    const path = new URL(uri).pathname.toLowerCase()
    for (const [ext, mime] of Object.entries(AUDIO_EXTENSIONS)) {
      if (path.endsWith(ext)) return mime
    }
  } catch {
    // invalid URL
  }
  return undefined
}

/**
 * Check if the subject has an RDF type indicating it's audio.
 */
function hasAudioType(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null)
  const typeUris = types.map(t => t.value)

  if (typeUris.includes(SCHEMA('AudioObject').value)) return true
  if (typeUris.includes(MO('Track').value)) return true

  return false
}

export const audioPane: Pane = {
  label: 'Audio',
  icon: '\u{1F3B5}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return getAudioType(subject.value) !== undefined || hasAudioType(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'audio-view'

    // Title
    const title =
      store.any(subject, DCT('title'), null, null)?.value ??
      store.any(subject, SCHEMA('name'), null, null)?.value ??
      labelFromUri(subject.value)

    const titleEl = document.createElement('h3')
    titleEl.className = 'audio-title'
    titleEl.textContent = title
    wrapper.appendChild(titleEl)

    // Artist
    const artist =
      store.any(subject, SCHEMA('byArtist'), null, null)?.value ??
      store.any(subject, DCT('creator'), null, null)?.value
    if (artist) {
      const artistEl = document.createElement('p')
      artistEl.className = 'audio-artist'
      artistEl.textContent = artist
      wrapper.appendChild(artistEl)
    }

    // Player
    const audio = document.createElement('audio')
    audio.className = 'audio-player'
    audio.controls = true
    audio.preload = 'metadata'

    const mimeType = getAudioType(subject.value)
    if (mimeType) {
      const source = document.createElement('source')
      source.src = subject.value
      source.type = mimeType
      audio.appendChild(source)
    } else {
      audio.src = subject.value
    }

    const fallback = document.createElement('p')
    fallback.textContent = 'Your browser does not support this audio format.'
    audio.appendChild(fallback)

    wrapper.appendChild(audio)

    // Description
    const description =
      store.any(subject, DCT('description'), null, null)?.value ??
      store.any(subject, SCHEMA('description'), null, null)?.value
    if (description) {
      const descEl = document.createElement('p')
      descEl.className = 'audio-description'
      descEl.textContent = description
      wrapper.appendChild(descEl)
    }

    container.appendChild(wrapper)
  },
}
