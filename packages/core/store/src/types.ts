import type {
  NamedNode,
  BlankNode,
  Literal,
  Statement,
  IndexedFormula,
} from 'rdflib'

export type { NamedNode, BlankNode, Literal, Statement }

/**
 * The Store type is rdflib's IndexedFormula (quad store).
 */
export type Store = IndexedFormula

/**
 * Any RDF node that can appear as a subject.
 */
export type SubjectNode = NamedNode | BlankNode
