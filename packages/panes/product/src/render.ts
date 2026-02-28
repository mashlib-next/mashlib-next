import type { NamedNode, Store } from '@mashlib-next/store'
import { SCHEMA, DCT } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

/**
 * Extract price info, checking both direct and offers.
 */
function getPrice(subject: NamedNode, store: Store): { price: string; currency: string } | null {
  // Direct price
  const directPrice = store.any(subject, SCHEMA('price'), null, null)?.value
  if (directPrice) {
    const currency = store.any(subject, SCHEMA('priceCurrency'), null, null)?.value ?? ''
    return { price: directPrice, currency }
  }

  // Via schema:offers
  const offerNode = store.any(subject, SCHEMA('offers'), null, null)
  if (offerNode) {
    const offerPrice = store.any(offerNode as NamedNode, SCHEMA('price'), null, null)?.value
    if (offerPrice) {
      const currency = store.any(offerNode as NamedNode, SCHEMA('priceCurrency'), null, null)?.value ?? ''
      return { price: offerPrice, currency }
    }
  }

  return null
}

/**
 * Format price for display.
 */
function formatPrice(price: string, currency: string): string {
  const num = parseFloat(price)
  if (isNaN(num)) return `${currency} ${price}`.trim()

  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency || 'USD',
    }).format(num)
  } catch {
    return `${currency} ${price}`.trim()
  }
}

/**
 * Render the product into the container.
 */
export function renderProduct(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'product-view'

  // Image
  const imageUrl =
    store.any(subject, SCHEMA('image'), null, null)?.value ??
    store.any(subject, SCHEMA('thumbnailUrl'), null, null)?.value
  if (imageUrl) {
    const img = document.createElement('img')
    img.className = 'product-image'
    img.src = imageUrl
    img.alt = 'Product image'
    wrapper.appendChild(img)
  }

  const info = document.createElement('div')
  info.className = 'product-info'

  // Name
  const name =
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    labelFromUri(subject.value)

  const nameEl = document.createElement('h2')
  nameEl.className = 'product-name'
  nameEl.textContent = name
  info.appendChild(nameEl)

  // Brand
  const brandNode = store.any(subject, SCHEMA('brand'), null, null)
  if (brandNode) {
    const brandName =
      store.any(brandNode as NamedNode, SCHEMA('name'), null, null)?.value ??
      brandNode.value
    // Only show if it looks like a name, not a URI
    if (brandName && !brandName.startsWith('http')) {
      const brandEl = document.createElement('p')
      brandEl.className = 'product-brand'
      brandEl.textContent = brandName
      info.appendChild(brandEl)
    }
  }

  // Price
  const priceInfo = getPrice(subject, store)
  if (priceInfo) {
    const priceEl = document.createElement('p')
    priceEl.className = 'product-price'
    priceEl.textContent = formatPrice(priceInfo.price, priceInfo.currency)
    info.appendChild(priceEl)
  }

  // Rating
  const ratingNode = store.any(subject, SCHEMA('aggregateRating'), null, null)
  if (ratingNode) {
    const ratingValue = store.any(ratingNode as NamedNode, SCHEMA('ratingValue'), null, null)?.value
    const reviewCount = store.any(ratingNode as NamedNode, SCHEMA('reviewCount'), null, null)?.value
    const bestRating = store.any(ratingNode as NamedNode, SCHEMA('bestRating'), null, null)?.value ?? '5'

    if (ratingValue) {
      const ratingEl = document.createElement('div')
      ratingEl.className = 'product-rating'

      const stars = Math.round(parseFloat(ratingValue))
      const maxStars = parseInt(bestRating)
      const starText = '\u2605'.repeat(Math.min(stars, maxStars)) +
                       '\u2606'.repeat(Math.max(maxStars - stars, 0))

      const starsEl = document.createElement('span')
      starsEl.className = 'product-stars'
      starsEl.textContent = starText
      ratingEl.appendChild(starsEl)

      const scoreEl = document.createElement('span')
      scoreEl.className = 'product-score'
      scoreEl.textContent = `${ratingValue}/${bestRating}`
      if (reviewCount) {
        scoreEl.textContent += ` (${reviewCount} reviews)`
      }
      ratingEl.appendChild(scoreEl)

      info.appendChild(ratingEl)
    }
  }

  // Description
  const description =
    store.any(subject, SCHEMA('description'), null, null)?.value ??
    store.any(subject, DCT('description'), null, null)?.value
  if (description) {
    const descEl = document.createElement('p')
    descEl.className = 'product-description'
    descEl.textContent = description
    info.appendChild(descEl)
  }

  // SKU / identifier
  const sku = store.any(subject, SCHEMA('sku'), null, null)?.value
  if (sku) {
    const skuEl = document.createElement('p')
    skuEl.className = 'product-sku'
    skuEl.textContent = `SKU: ${sku}`
    info.appendChild(skuEl)
  }

  // URL
  const url = store.any(subject, SCHEMA('url'), null, null)?.value
  if (url) {
    const linkEl = document.createElement('a')
    linkEl.className = 'product-link'
    linkEl.href = url
    linkEl.textContent = 'View product'
    linkEl.target = '_blank'
    linkEl.rel = 'noopener'
    info.appendChild(linkEl)
  }

  wrapper.appendChild(info)
  container.appendChild(wrapper)
}
