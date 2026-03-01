import { describe, it, expect, beforeEach } from 'vitest'
import { graph, sym, lit, Namespace } from 'rdflib'
import type { IndexedFormula } from 'rdflib'
import { recipePane } from '../recipe-pane.js'

const RDF = Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
const SCHEMA = Namespace('https://schema.org/')
const FOAF = Namespace('http://xmlns.com/foaf/0.1/')

describe('recipePane', () => {
  let store: IndexedFormula

  beforeEach(() => {
    store = graph()
  })

  describe('canHandle', () => {
    it('matches schema:Recipe type', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      expect(recipePane.canHandle(subject, store)).toBe(true)
    })

    it('matches schema:HowTo type', () => {
      const subject = sym('https://example.com/howto')
      store.add(subject, RDF('type'), SCHEMA('HowTo'), subject.doc())
      expect(recipePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with recipeIngredient', () => {
      const subject = sym('https://example.com/item')
      store.add(subject, SCHEMA('recipeIngredient'), lit('2 cups flour'), subject.doc())
      expect(recipePane.canHandle(subject, store)).toBe(true)
    })

    it('matches duck-typing with recipeInstructions', () => {
      const subject = sym('https://example.com/item')
      store.add(subject, SCHEMA('recipeInstructions'), lit('Mix well'), subject.doc())
      expect(recipePane.canHandle(subject, store)).toBe(true)
    })

    it('rejects non-recipe resources', () => {
      const subject = sym('https://example.com/person')
      store.add(subject, RDF('type'), FOAF('Person'), subject.doc())
      expect(recipePane.canHandle(subject, store)).toBe(false)
    })
  })

  describe('render', () => {
    it('renders recipe name', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Chocolate Cake'), subject.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      expect(container.querySelector('.recipe-name')!.textContent).toBe('Chocolate Cake')
    })

    it('renders recipe image', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Cake'), subject.doc())
      store.add(subject, SCHEMA('image'), sym('https://example.com/cake.jpg'), subject.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      const img = container.querySelector('.recipe-image') as HTMLImageElement
      expect(img).not.toBeNull()
      expect(img.src).toBe('https://example.com/cake.jpg')
    })

    it('renders time metadata', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Cake'), subject.doc())
      store.add(subject, SCHEMA('prepTime'), lit('PT30M'), subject.doc())
      store.add(subject, SCHEMA('cookTime'), lit('PT1H'), subject.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      const meta = container.querySelector('.recipe-meta')
      expect(meta).not.toBeNull()
      expect(meta!.textContent).toContain('30 min')
      expect(meta!.textContent).toContain('1 hr')
    })

    it('renders ingredients list', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Cake'), subject.doc())
      store.add(subject, SCHEMA('recipeIngredient'), lit('2 cups flour'), subject.doc())
      store.add(subject, SCHEMA('recipeIngredient'), lit('1 cup sugar'), subject.doc())
      store.add(subject, SCHEMA('recipeIngredient'), lit('3 eggs'), subject.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      const items = container.querySelectorAll('.recipe-ingredients li')
      expect(items.length).toBe(3)
    })

    it('renders instructions as ordered list', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Cake'), subject.doc())
      store.add(subject, SCHEMA('recipeInstructions'), lit('Preheat oven to 350F'), subject.doc())
      store.add(subject, SCHEMA('recipeInstructions'), lit('Mix dry ingredients'), subject.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      const steps = container.querySelectorAll('.recipe-instructions li')
      expect(steps.length).toBe(2)
      expect(steps[0].textContent).toBe('Preheat oven to 350F')
    })

    it('renders nutrition information', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Cake'), subject.doc())

      const nutrition = sym('https://example.com/recipe#nutrition')
      store.add(subject, SCHEMA('nutrition'), nutrition, subject.doc())
      store.add(nutrition, SCHEMA('calories'), lit('350 cal'), nutrition.doc())
      store.add(nutrition, SCHEMA('proteinContent'), lit('8g'), nutrition.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      const nutritionEl = container.querySelector('.recipe-nutrition')
      expect(nutritionEl).not.toBeNull()
      expect(nutritionEl!.textContent).toContain('350 cal')
      expect(nutritionEl!.textContent).toContain('8g')
    })

    it('renders category and cuisine tags', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Cake'), subject.doc())
      store.add(subject, SCHEMA('recipeCategory'), lit('Dessert'), subject.doc())
      store.add(subject, SCHEMA('recipeCuisine'), lit('French'), subject.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      const tags = container.querySelectorAll('.recipe-tag')
      expect(tags.length).toBe(2)
      expect(tags[0].textContent).toBe('Dessert')
      expect(tags[1].textContent).toBe('French')
    })

    it('renders star rating', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Cake'), subject.doc())

      const rating = sym('https://example.com/recipe#rating')
      store.add(subject, SCHEMA('aggregateRating'), rating, subject.doc())
      store.add(rating, SCHEMA('ratingValue'), lit('4.5'), rating.doc())
      store.add(rating, SCHEMA('reviewCount'), lit('42'), rating.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      expect(container.querySelector('.recipe-stars')!.textContent).toContain('\u2605')
      expect(container.querySelector('.recipe-score')!.textContent).toContain('4.5')
      expect(container.querySelector('.recipe-score')!.textContent).toContain('42 reviews')
    })

    it('renders without optional fields', () => {
      const subject = sym('https://example.com/recipe')
      store.add(subject, RDF('type'), SCHEMA('Recipe'), subject.doc())
      store.add(subject, SCHEMA('name'), lit('Simple Dish'), subject.doc())

      const container = document.createElement('div')
      recipePane.render(subject, store, container)

      expect(container.querySelector('.recipe-name')!.textContent).toBe('Simple Dish')
      expect(container.querySelector('.recipe-image')).toBeNull()
      expect(container.querySelector('.recipe-meta')).toBeNull()
      expect(container.querySelector('.recipe-ingredients')).toBeNull()
      expect(container.querySelector('.recipe-instructions')).toBeNull()
      expect(container.querySelector('.recipe-nutrition')).toBeNull()
    })
  })
})
