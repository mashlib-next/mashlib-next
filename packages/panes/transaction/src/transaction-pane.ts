import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA, QU } from '@mashlib-next/utils'
import { renderTransaction } from './render.js'

const TRANSACTION_TYPES = [
  QU('Transaction').value,
  QU('BankAccount').value,
  QU('PaymentCard').value,
  SCHEMA('Invoice').value,
  SCHEMA('MoneyTransfer').value,
  SCHEMA('PayAction').value,
  SCHEMA('BankAccount').value,
]

function isTransaction(subject: NamedNode, store: Store): boolean {
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)

  for (const t of TRANSACTION_TYPES) {
    if (types.includes(t)) return true
  }

  // Duck-typing: has qu:transaction children (account with transactions)
  if (store.any(subject, QU('transaction'), null, null)) return true

  // Duck-typing: has schema:totalPaymentDue or schema:paymentStatus (invoice)
  if (store.any(subject, SCHEMA('totalPaymentDue'), null, null)) return true

  // Duck-typing: has qu:amount (single transaction)
  if (store.any(subject, QU('amount'), null, null)) return true

  return false
}

export const transactionPane: Pane = {
  label: 'Transactions',
  icon: '\u{1F4B3}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isTransaction(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderTransaction(subject, store, container)
  },
}
