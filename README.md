# mashlib-next

A lightweight, modular [Solid](https://solidproject.org) data browser. Drop a single `<script>` tag into any HTML page with JSON-LD data and get a tabbed UI that renders it.

**[Live demo](https://mashlib.com)** · **[Examples](https://mashlib.com/examples/)** · **[npm](https://www.npmjs.com/package/mashlib-next)**

## Quick start

```html
<link rel="stylesheet" href="https://mashlib.com/mashlib.css">

<script type="application/ld+json">
{
  "@context": { "schema": "https://schema.org/" },
  "@id": "",
  "@type": "schema:Person",
  "schema:name": "Alice",
  "schema:email": "alice@example.org"
}
</script>

<div id="mashlib"></div>
<script type="module" src="https://mashlib.com/mashlib.js"></script>
```

That's it. The shell parses the JSON-LD, finds matching panes, and renders tabs.

## Pane API

A pane is a plain JavaScript object with three properties:

```js
export default {
  label: 'My Pane',       // tab label
  icon: '🔧',             // tab icon (emoji or URL)

  canHandle(subject, store) {
    // subject: rdflib NamedNode (the resource URL)
    // store:   rdflib IndexedFormula (all triples)
    // return true if this pane can render this data
    return store.match(subject, null, null, null)
      .some(s => s.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
              && s.object.value === 'https://schema.org/Recipe')
  },

  render(subject, store, container) {
    // container: a plain DOM element — put anything in here
    // Use store.match(), store.any(), store.each() to read triples
    const name = store.any(subject, null, null, null)
    container.textContent = name?.value || 'Hello'
  }
}
```

### Loading external panes

Add a `data-pane` attribute to load a pane from any URL:

```html
<script type="module" data-pane src="my-pane.js"></script>
```

The module must `export default` a pane object (or export `{ pane }`). The shell discovers it, calls `canHandle`, and adds a tab if it matches.

### Using any UI framework

`container` is a plain DOM element. Render however you like:

```js
// React
import { createRoot } from 'react-dom/client'
render(subject, store, container) {
  createRoot(container).render(<MyComponent data={store} />)
}

// Vanilla
render(subject, store, container) {
  container.innerHTML = `<h1>${store.any(subject, SCHEMA('name'))}</h1>`
}

// Web Components
render(subject, store, container) {
  container.appendChild(document.createElement('my-element'))
}
```

### Registering panes from script

```js
window.mashlib.register({
  label: 'Custom',
  icon: '⚡',
  canHandle(subject, store) { /* ... */ },
  render(subject, store, container) { /* ... */ }
})
```

## Built-in panes

37 panes ship with mashlib-next, all written in plain JS (no transpiler needed):

| Pane | Type | Description |
|------|------|-------------|
| Profile | foaf:Person | Photo, name, email, role |
| Chat | mee:LongChat | Messages with avatars and timestamps |
| Playlist | olo:OrderedList | Video player with prev/next navigation |
| Event | schema:Event | Date, location, organizer |
| Article | schema:BlogPosting | Full text with author and date |
| Product | schema:Product | Price, rating, brand |
| Organization | schema:Organization | Team, address, founding date |
| Bookmarks | bookmark:BookmarkList | Reading list with descriptions |
| Schedule | schema:EventSeries | Timeline of events |
| Trip | schema:Trip | Itinerary with legs |
| Contacts | vcard:AddressBook | Address book |
| Gallery | schema:ImageGallery | Photo grid |
| Folder | ldp:Container | File browser |
| Source | *(any)* | Raw RDF source editor |
| Properties | *(any)* | Triple table |
| Outline | *(any)* | Tree view of triples |
| HTML | *.html | Sandboxed iframe |
| *...and 20 more* | | |

See all panes in [`packages/panes/`](packages/panes/).

## Examples

15 example pages at [mashlib.com/examples/](https://mashlib.com/examples/), each a self-contained HTML file with embedded JSON-LD. View source on any page to see how it works.

Includes two **external data-pane** examples (Recipe, Verifiable Credential) that load custom panes via `<script data-pane>`.

## Development

```bash
pnpm install
pnpm dev          # dev server at localhost:5173
pnpm test         # 519 tests
pnpm build        # production build
```

## Architecture

```
packages/
  core/
    store/          # rdflib wrapper, JSON-LD data island parser
    utils/          # RDF namespaces, URI helpers
    pane-registry/  # pane registration and matching
  panes/            # 37 built-in panes (plain JS, copy-pasteable)
  shell/            # tab UI, auth, CSS, shim build
```

The shell is the only entry point. It loads data, finds matching panes, and renders tabs. Panes are independent — they only depend on `@mashlib-next/utils` for namespace constants.

## License

AGPL-3.0-or-later
