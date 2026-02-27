import type { NamedNode, Store } from '@mashlib-next/store'
import { OLO, DC, DCT, SCHEMA } from '@mashlib-next/utils'

interface TrackInfo {
  index: number
  title: string
  uri: string
  videoUrl?: string
}

/**
 * Extract ordered tracks from the store for a given playlist subject.
 *
 * Playlist structure (OLO):
 *   <playlist> olo:slot <slot1>, <slot2>, ...
 *   <slot1> olo:index 1 ;
 *           olo:item <track1> .
 *   <track1> dc:title "Track Title" ;
 *            schema:video <videoUrl> .
 */
function extractTracks(subject: NamedNode, store: Store): TrackInfo[] {
  const slots = store.each(subject, OLO('slot'), null, null)
  const tracks: TrackInfo[] = []

  for (const slot of slots) {
    const indexNode = store.any(slot as NamedNode, OLO('index'), null, null)
    const itemNode = store.any(slot as NamedNode, OLO('item'), null, null)

    if (!itemNode) continue

    const item = itemNode as NamedNode
    const title =
      store.any(item, DC('title'), null, null)?.value ??
      store.any(item, DCT('title'), null, null)?.value ??
      store.any(item, SCHEMA('name'), null, null)?.value ??
      item.value

    const videoUrl =
      store.any(item, SCHEMA('video'), null, null)?.value ??
      store.any(item, SCHEMA('contentUrl'), null, null)?.value ??
      undefined

    tracks.push({
      index: indexNode ? Number(indexNode.value) : 0,
      title,
      uri: item.value,
      videoUrl,
    })
  }

  tracks.sort((a, b) => a.index - b.index)
  return tracks
}

/**
 * Extract YouTube video ID from various YouTube URL formats.
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

/**
 * Render the playlist into the container element.
 */
export function renderPlaylist(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  // Playlist title
  const playlistTitle =
    store.any(subject, DC('title'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    'Untitled Playlist'

  const header = document.createElement('h2')
  header.textContent = playlistTitle
  container.appendChild(header)

  const tracks = extractTracks(subject, store)

  if (tracks.length === 0) {
    const empty = document.createElement('p')
    empty.textContent = 'No tracks found in this playlist.'
    container.appendChild(empty)
    return
  }

  const list = document.createElement('ol')
  list.className = 'playlist-tracks'

  for (const track of tracks) {
    const li = document.createElement('li')
    li.className = 'playlist-track'
    li.dataset.uri = track.uri

    const titleEl = document.createElement('span')
    titleEl.className = 'track-title'
    titleEl.textContent = track.title
    li.appendChild(titleEl)

    if (track.videoUrl) {
      const videoContainer = document.createElement('div')
      videoContainer.className = 'track-video'

      const youtubeId = extractYouTubeId(track.videoUrl)
      if (youtubeId) {
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}`
        iframe.width = '560'
        iframe.height = '315'
        iframe.allowFullscreen = true
        iframe.setAttribute('loading', 'lazy')
        iframe.setAttribute(
          'allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        )
        videoContainer.appendChild(iframe)
      } else {
        const video = document.createElement('video')
        video.src = track.videoUrl
        video.controls = true
        video.width = 560
        videoContainer.appendChild(video)
      }

      li.appendChild(videoContainer)
    }

    list.appendChild(li)
  }

  container.appendChild(list)
}
