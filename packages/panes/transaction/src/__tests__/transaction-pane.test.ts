import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { transactionPane } from '../transaction-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const QU = Namespace('http://www.w3.org/ns/pim/transaction#')
const SCHEMA = Namespace('https://schema.org/')
const DCT = Namespace('http://purl.org/dc/terms/')
const RDFS = Namespace('http://www.w3.org/2000/01/rdf-schema#')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('transactionPane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches qu:Transaction type', () => {
      const subject = sym('https://example.com/txn/1')
      store.add(subject, RDF('type'), QU('Transaction'), subject.doc())
      expect(transactionPane.canHandle(subject, store)).toBe(true)
    })

    it('matches qu:BankAccount type', () => {
      const subject = sym('https://example.com/account')
      store.add(subject, RDF('type'), QU('BankAccount'), subject.doc())
      expect(transactionPane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:Invoice type', () => {
      const subject = sym('https://example.com/invoice')
      store.add(subject, RDF('type'), SCHEMA('Invoice'), subject.doc())
      expect(transactionPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with qu:transaction', () => {
      const subject = sym('https://example.com/account')
      const txn = sym('https://example.com/account#txn1')
      store.add(subject, QU('transaction'), txn, subject.doc())
      expect(transactionPane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with qu:amount', () => {
      const subject = sym('https://example.com/txn')
      store.add(subject, QU('amount'), lit('-50.00'), subject.doc())
      expect(transactionPane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-transaction resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(transactionPane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render - account view', () => {
    it('renders account title and transaction count', () => {
      const account = sym('https://example.com/account')
      store.add(account, RDF('type'), QU('BankAccount'), account.doc())
      store.add(account, SCHEMA('name'), lit('Checking Account'), account.doc())

      const txn1 = sym('https://example.com/account#t1')
      const txn2 = sym('https://example.com/account#t2')
      store.add(account, QU('transaction'), txn1, account.doc())
      store.add(account, QU('transaction'), txn2, account.doc())
      store.add(txn1, QU('description'), lit('Grocery'), txn1.doc())
      store.add(txn1, QU('amount'), lit('-45.50'), txn1.doc())
      store.add(txn2, QU('description'), lit('Salary'), txn2.doc())
      store.add(txn2, QU('amount'), lit('3000.00'), txn2.doc())

      const container = document.createElement('div')
      transactionPane.render(account, store, container)

      expect(container.querySelector('.txn-title')!.textContent).toBe('Checking Account')
      expect(container.querySelector('.txn-count')!.textContent).toBe('2 transactions')
    })

    it('renders transaction rows in table', () => {
      const account = sym('https://example.com/account')
      store.add(account, RDF('type'), QU('BankAccount'), account.doc())
      store.add(account, SCHEMA('name'), lit('Account'), account.doc())

      const txn1 = sym('https://example.com/account#t1')
      store.add(account, QU('transaction'), txn1, account.doc())
      store.add(txn1, QU('description'), lit('Coffee'), txn1.doc())
      store.add(txn1, QU('amount'), lit('-4.50'), txn1.doc())
      store.add(txn1, QU('date'), lit('2025-07-10'), txn1.doc())

      const container = document.createElement('div')
      transactionPane.render(account, store, container)

      const rows = container.querySelectorAll('.txn-row')
      expect(rows.length).toBe(1)
      expect(rows[0].querySelector('.txn-desc')!.textContent).toBe('Coffee')
    })

    it('renders negative amounts with negative class', () => {
      const account = sym('https://example.com/account')
      store.add(account, RDF('type'), QU('BankAccount'), account.doc())
      store.add(account, SCHEMA('name'), lit('Account'), account.doc())

      const txn = sym('https://example.com/account#t1')
      store.add(account, QU('transaction'), txn, account.doc())
      store.add(txn, QU('description'), lit('Expense'), txn.doc())
      store.add(txn, QU('amount'), lit('-25.00'), txn.doc())

      const container = document.createElement('div')
      transactionPane.render(account, store, container)

      const amountEl = container.querySelector('.txn-amount')
      expect(amountEl!.classList.contains('txn-negative')).toBe(true)
    })

    it('renders positive amounts with positive class', () => {
      const account = sym('https://example.com/account')
      store.add(account, RDF('type'), QU('BankAccount'), account.doc())
      store.add(account, SCHEMA('name'), lit('Account'), account.doc())

      const txn = sym('https://example.com/account#t1')
      store.add(account, QU('transaction'), txn, account.doc())
      store.add(txn, QU('description'), lit('Income'), txn.doc())
      store.add(txn, QU('amount'), lit('1000.00'), txn.doc())

      const container = document.createElement('div')
      transactionPane.render(account, store, container)

      const amountEl = container.querySelector('.txn-amount')
      expect(amountEl!.classList.contains('txn-positive')).toBe(true)
    })

    it('renders empty account', () => {
      const account = sym('https://example.com/account')
      store.add(account, RDF('type'), QU('BankAccount'), account.doc())
      store.add(account, SCHEMA('name'), lit('Empty Account'), account.doc())

      const container = document.createElement('div')
      transactionPane.render(account, store, container)

      expect(container.querySelector('.txn-count')!.textContent).toBe('0 transactions')
      expect(container.querySelector('.txn-empty')!.textContent).toBe('No transactions found.')
    })

    it('renders category from category node', () => {
      const account = sym('https://example.com/account')
      store.add(account, RDF('type'), QU('BankAccount'), account.doc())
      store.add(account, SCHEMA('name'), lit('Account'), account.doc())

      const txn = sym('https://example.com/account#t1')
      store.add(account, QU('transaction'), txn, account.doc())
      store.add(txn, QU('description'), lit('Dinner'), txn.doc())
      store.add(txn, QU('amount'), lit('-35.00'), txn.doc())

      const cat = sym('https://example.com/categories#food')
      store.add(txn, QU('category'), cat, txn.doc())
      store.add(cat, RDFS('label'), lit('Food & Dining'), cat.doc())

      const container = document.createElement('div')
      transactionPane.render(account, store, container)

      expect(container.querySelector('.txn-category')!.textContent).toBe('Food & Dining')
    })
  })

  describe('render - single transaction', () => {
    it('renders single transaction details', () => {
      const txn = sym('https://example.com/txn/1')
      store.add(txn, RDF('type'), QU('Transaction'), txn.doc())
      store.add(txn, SCHEMA('name'), lit('Monthly Rent'), txn.doc())
      store.add(txn, QU('amount'), lit('-1200.00'), txn.doc())
      store.add(txn, QU('currency'), lit('USD'), txn.doc())
      store.add(txn, QU('date'), lit('2025-07-01'), txn.doc())

      const container = document.createElement('div')
      transactionPane.render(txn, store, container)

      expect(container.querySelector('.txn-title')!.textContent).toBe('Monthly Rent')
      const details = container.querySelector('.txn-details')
      expect(details).not.toBeNull()
      expect(details!.textContent).toContain('2025')
    })

    it('renders payee in single transaction', () => {
      const txn = sym('https://example.com/txn/1')
      store.add(txn, RDF('type'), QU('Transaction'), txn.doc())
      store.add(txn, SCHEMA('name'), lit('Payment'), txn.doc())
      store.add(txn, QU('amount'), lit('-50.00'), txn.doc())

      const payee = sym('https://example.com/payee/store')
      store.add(txn, QU('payee'), payee, txn.doc())
      store.add(payee, SCHEMA('name'), lit('Corner Store'), payee.doc())

      const container = document.createElement('div')
      transactionPane.render(txn, store, container)

      expect(container.querySelector('.txn-details')!.textContent).toContain('Corner Store')
    })
  })
})
