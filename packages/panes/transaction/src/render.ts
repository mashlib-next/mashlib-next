import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, DCT, RDFS, QU } from '@mashlib-next/utils'
import { labelFromUri } from '@mashlib-next/utils'

interface TransactionRecord {
  uri: string
  date: string | null
  description: string
  amount: number | null
  currency: string
  category: string | null
  payee: string | null
}

/**
 * Format currency amount.
 */
function formatAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency || 'USD',
    }).format(amount)
  } catch {
    const prefix = currency ? `${currency} ` : ''
    return `${prefix}${amount.toFixed(2)}`
  }
}

/**
 * Check if this is an account (container of transactions) vs a single transaction.
 */
function isAccount(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)
  if (types.includes(QU('BankAccount').value)) return true
  if (types.includes(QU('PaymentCard').value)) return true
  if (types.includes(SCHEMA('BankAccount').value)) return true
  if (store.any(subject, QU('transaction'), null, null)) return true
  return false
}

/**
 * Extract a transaction record from a node.
 */
function extractTransaction(node: NamedNode, store: Store): TransactionRecord {
  const description =
    store.any(node, QU('description'), null, null)?.value ??
    store.any(node, DCT('title'), null, null)?.value ??
    store.any(node, SCHEMA('description'), null, null)?.value ??
    store.any(node, SCHEMA('name'), null, null)?.value ??
    labelFromUri(node.value)

  const amountStr =
    store.any(node, QU('amount'), null, null)?.value ??
    store.any(node, SCHEMA('price'), null, null)?.value ??
    store.any(node, SCHEMA('amount'), null, null)?.value
  const amount = amountStr ? parseFloat(amountStr) : null

  const currency =
    store.any(node, QU('currency'), null, null)?.value ??
    store.any(node, SCHEMA('priceCurrency'), null, null)?.value ??
    store.any(node, SCHEMA('currency'), null, null)?.value ??
    ''

  const date =
    store.any(node, QU('date'), null, null)?.value ??
    store.any(node, DCT('date'), null, null)?.value ??
    store.any(node, SCHEMA('dateCreated'), null, null)?.value ??
    null

  const categoryNode = store.any(node, QU('category'), null, null)
  const category = categoryNode
    ? (store.any(categoryNode as NamedNode, RDFS('label'), null, null)?.value ??
       store.any(categoryNode as NamedNode, SCHEMA('name'), null, null)?.value ??
       labelFromUri(categoryNode.value))
    : null

  const payeeNode = store.any(node, QU('payee'), null, null) ??
                    store.any(node, SCHEMA('recipient'), null, null)
  const payee = payeeNode
    ? (store.any(payeeNode as NamedNode, SCHEMA('name'), null, null)?.value ??
       (payeeNode.value.startsWith('http') ? labelFromUri(payeeNode.value) : payeeNode.value))
    : null

  return { uri: node.value, date, description, amount, currency, category, payee }
}

/**
 * Render account (list of transactions).
 */
function renderAccount(
  subject: NamedNode,
  store: Store,
  wrapper: HTMLElement
): void {
  const transactions = store.each(subject, QU('transaction'), null, null)

  const records = transactions.map(t => extractTransaction(t as NamedNode, store))

  // Sort by date (newest first)
  records.sort((a, b) => {
    if (!a.date && !b.date) return 0
    if (!a.date) return 1
    if (!b.date) return -1
    return b.date.localeCompare(a.date)
  })

  const countEl = document.createElement('p')
  countEl.className = 'txn-count'
  countEl.textContent = `${records.length} transaction${records.length !== 1 ? 's' : ''}`
  wrapper.appendChild(countEl)

  if (records.length === 0) {
    const empty = document.createElement('p')
    empty.className = 'txn-empty'
    empty.textContent = 'No transactions found.'
    wrapper.appendChild(empty)
    return
  }

  // Summary: total
  const total = records.reduce((sum, r) => sum + (r.amount ?? 0), 0)
  const mainCurrency = records.find(r => r.currency)?.currency ?? ''
  if (total !== 0) {
    const totalEl = document.createElement('p')
    totalEl.className = 'txn-total'
    totalEl.textContent = `Balance: ${formatAmount(total, mainCurrency)}`
    wrapper.appendChild(totalEl)
  }

  // Transaction table
  const tableWrapper = document.createElement('div')
  tableWrapper.className = 'txn-table-wrapper'

  const table = document.createElement('table')
  table.className = 'txn-table'

  const thead = document.createElement('thead')
  thead.innerHTML = '<tr><th>Date</th><th>Description</th><th>Category</th><th class="txn-amount-col">Amount</th></tr>'
  table.appendChild(thead)

  const tbody = document.createElement('tbody')
  for (const rec of records) {
    const tr = document.createElement('tr')
    tr.className = 'txn-row'

    const dateTd = document.createElement('td')
    dateTd.className = 'txn-date'
    if (rec.date) {
      const d = new Date(rec.date)
      dateTd.textContent = isNaN(d.getTime())
        ? rec.date
        : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }
    tr.appendChild(dateTd)

    const descTd = document.createElement('td')
    descTd.className = 'txn-desc'
    descTd.textContent = rec.payee ? `${rec.description} — ${rec.payee}` : rec.description
    tr.appendChild(descTd)

    const catTd = document.createElement('td')
    catTd.className = 'txn-category'
    catTd.textContent = rec.category ?? ''
    tr.appendChild(catTd)

    const amountTd = document.createElement('td')
    amountTd.className = 'txn-amount'
    if (rec.amount !== null) {
      amountTd.textContent = formatAmount(rec.amount, rec.currency)
      if (rec.amount < 0) amountTd.classList.add('txn-negative')
      if (rec.amount > 0) amountTd.classList.add('txn-positive')
    }
    tr.appendChild(amountTd)

    tbody.appendChild(tr)
  }

  table.appendChild(tbody)
  tableWrapper.appendChild(table)
  wrapper.appendChild(tableWrapper)
}

/**
 * Render a single transaction.
 */
function renderSingleTransaction(
  subject: NamedNode,
  store: Store,
  wrapper: HTMLElement
): void {
  const rec = extractTransaction(subject, store)

  const details = document.createElement('div')
  details.className = 'txn-details'

  const rows: [string, string][] = []
  if (rec.date) {
    const d = new Date(rec.date)
    const formatted = isNaN(d.getTime())
      ? rec.date
      : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    rows.push(['Date', formatted])
  }
  if (rec.amount !== null) rows.push(['Amount', formatAmount(rec.amount, rec.currency)])
  if (rec.payee) rows.push(['Payee', rec.payee])
  if (rec.category) rows.push(['Category', rec.category])

  for (const [label, value] of rows) {
    const row = document.createElement('div')
    row.className = 'txn-detail'
    row.innerHTML = `<span class="txn-label">${label}</span><span class="txn-value">${value}</span>`
    details.appendChild(row)
  }

  wrapper.appendChild(details)

  // Description as body text if it wasn't used as title
  const desc = store.any(subject, SCHEMA('description'), null, null)?.value ??
               store.any(subject, DCT('description'), null, null)?.value
  if (desc && desc !== rec.description) {
    const descEl = document.createElement('p')
    descEl.className = 'txn-body'
    descEl.textContent = desc
    wrapper.appendChild(descEl)
  }
}

/**
 * Render transaction(s) into the container.
 */
export function renderTransaction(
  subject: NamedNode,
  store: Store,
  container: HTMLElement
): void {
  container.innerHTML = ''

  const wrapper = document.createElement('div')
  wrapper.className = 'txn-view'

  // Title
  const title =
    store.any(subject, SCHEMA('name'), null, null)?.value ??
    store.any(subject, DCT('title'), null, null)?.value ??
    store.any(subject, QU('description'), null, null)?.value ??
    store.any(subject, RDFS('label'), null, null)?.value ??
    labelFromUri(subject.value)

  const titleEl = document.createElement('h2')
  titleEl.className = 'txn-title'
  titleEl.textContent = title
  wrapper.appendChild(titleEl)

  if (isAccount(subject, store)) {
    renderAccount(subject, store, wrapper)
  } else {
    renderSingleTransaction(subject, store, wrapper)
  }

  container.appendChild(wrapper)
}
