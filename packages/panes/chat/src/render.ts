import type { NamedNode, Store } from '@mashlib-next/store'
import { WF, SIOC, DCT, FOAF, SCHEMA, RDF, DC } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface ChatMessage {
  uri: string
  content: string
  created: Date | null
  maker: string | null
  makerUri: string | null
}

const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg|bmp|ico)(\?.*)?$/i

/**
 * Extract the chat title.
 */
function getChatTitle(subject: NamedNode, store: Store): string {
  return (
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, DC('title'), null, null)?.value ??
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, FOAF('name'), null, null)?.value ??
    'Chat'
  )
}

/**
 * Get the display name for a message author.
 */
function getMakerName(makerNode: NamedNode, store: Store): string {
  return (
    store.any(makerNode, FOAF('name'), null, null)?.value ??
    store.any(makerNode, SCHEMA('name'), null, null)?.value ??
    labelFromUri(makerNode.value)
  )
}

/**
 * Collect all messages from the chat.
 */
function getMessages(subject: NamedNode, store: Store): ChatMessage[] {
  const messageNodes = store.each(subject, WF('message'), null, null)
  const messages: ChatMessage[] = []

  for (const node of messageNodes) {
    const msg = node as NamedNode

    const content =
      store.any(msg, SIOC('content'), null, null)?.value ??
      store.any(msg, DCT('content'), null, null)?.value ??
      store.any(msg, DC('description'), null, null)?.value ??
      ''

    const createdStr =
      store.any(msg, DCT('created'), null, null)?.value ??
      store.any(msg, DC('date'), null, null)?.value
    const created = createdStr ? new Date(createdStr) : null

    const makerNode =
      store.any(msg, FOAF('maker'), null, null) ??
      store.any(msg, DC('creator'), null, null)
    let maker: string | null = null
    let makerUri: string | null = null
    if (makerNode) {
      makerUri = makerNode.value
      if (makerNode.termType === 'NamedNode') {
        maker = getMakerName(makerNode as NamedNode, store)
      } else {
        maker = makerNode.value
      }
    }

    messages.push({ uri: msg.value, content, created, maker, makerUri })
  }

  // Sort by creation date (oldest first)
  messages.sort((a, b) => {
    if (!a.created && !b.created) return 0
    if (!a.created) return -1
    if (!b.created) return 1
    return a.created.getTime() - b.created.getTime()
  })

  return messages
}

/**
 * Format a date for the time column.
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format a date as a day header.
 */
function formatDateHeader(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get date key for grouping (YYYY-MM-DD).
 */
function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Render message content with inline link detection and image embedding.
 */
function renderContent(content: string, contentEl: HTMLElement): void {
  // Split content by URL pattern
  const urlPattern = /(https?:\/\/[^\s<>"]+)/g
  const parts = content.split(urlPattern)

  for (const part of parts) {
    if (urlPattern.test(part)) {
      // Reset lastIndex since we're using the same regex
      urlPattern.lastIndex = 0

      if (IMAGE_EXTENSIONS.test(part)) {
        // Render inline image
        const img = document.createElement('img')
        img.className = 'chat-inline-image'
        img.src = part
        img.alt = 'Shared image'
        img.loading = 'lazy'
        contentEl.appendChild(img)
      } else {
        // Render as clickable link
        const link = document.createElement('a')
        link.href = part
        link.textContent = part
        link.target = '_blank'
        link.rel = 'noopener'
        contentEl.appendChild(link)
      }
    } else if (part) {
      contentEl.appendChild(document.createTextNode(part))
    }
  }
}

/**
 * Render the chat into the container.
 */
export function renderChat(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'chat-view'

  // Header
  const title = getChatTitle(subject, store)
  const header = document.createElement('h2')
  header.className = 'chat-title'
  header.textContent = title
  wrapper.appendChild(header)

  // Chat creator
  const author =
    store.any(subject, DC('author'), null, null) ??
    store.any(subject, DCT('creator'), null, null)
  if (author && author.termType === 'NamedNode') {
    const authorName = getMakerName(author as NamedNode, store)
    const creatorEl = document.createElement('p')
    creatorEl.className = 'chat-creator'
    creatorEl.textContent = `Created by ${authorName}`
    wrapper.appendChild(creatorEl)
  }

  const messages = getMessages(subject, store)

  // Message count
  const countEl = document.createElement('p')
  countEl.className = 'chat-count'
  countEl.textContent = `${messages.length} message${messages.length !== 1 ? 's' : ''}`
  wrapper.appendChild(countEl)

  if (messages.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'chat-empty'
    empty.textContent = 'No messages yet.'
    wrapper.appendChild(empty)
    container.appendChild(wrapper)
    return
  }

  // Messages grouped by date
  const messageList = document.createElement('div')
  messageList.className = 'chat-messages'

  let currentDateKey: string | null = null

  for (const msg of messages) {
    // Date header for grouping
    if (msg.created) {
      const dk = dateKey(msg.created)
      if (dk !== currentDateKey) {
        currentDateKey = dk
        const dateHeader = document.createElement('div')
        dateHeader.className = 'chat-date-header'
        dateHeader.textContent = formatDateHeader(msg.created)
        messageList.appendChild(dateHeader)
      }
    }

    const msgEl = document.createElement('div')
    msgEl.className = 'chat-message'

    // Header row: author + time
    const headerRow = document.createElement('div')
    headerRow.className = 'chat-message-header'

    if (msg.maker) {
      const authorEl = document.createElement('a')
      authorEl.className = 'chat-author'
      authorEl.textContent = msg.maker
      if (msg.makerUri) {
        authorEl.href = `?uri=${encodeURIComponent(msg.makerUri)}`
        authorEl.title = msg.makerUri
        authorEl.addEventListener('click', (e) => {
          e.preventDefault()
          const input = document.getElementById('url-input') as HTMLInputElement | null
          if (input) {
            input.value = msg.makerUri!
            input.form?.dispatchEvent(new Event('submit', { cancelable: true }))
          }
        })
      }
      headerRow.appendChild(authorEl)
    }

    if (msg.created) {
      const timeEl = document.createElement('time')
      timeEl.className = 'chat-time'
      timeEl.dateTime = msg.created.toISOString()
      timeEl.textContent = formatTime(msg.created)
      headerRow.appendChild(timeEl)
    }

    msgEl.appendChild(headerRow)

    // Content with link/image detection
    const contentEl = document.createElement('div')
    contentEl.className = 'chat-content'
    renderContent(msg.content, contentEl)
    msgEl.appendChild(contentEl)

    messageList.appendChild(msgEl)
  }

  wrapper.appendChild(messageList)
  container.appendChild(wrapper)
}
