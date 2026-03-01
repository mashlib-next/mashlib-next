# Creating Data Panes for mashlib-next

## Overview

mashlib-next is a modular Linked Data browser. It renders RDF data using **panes** — small plugins that know how to display specific types of data. You can create custom panes as standalone ES module files with zero build step.

## The Pane Contract

A pane is an ES module with a default export:

```js
export default {
  label: 'My Pane',        // Tab label shown in the UI
  icon: '🎨',              // Emoji icon for the tab
  canHandle(subject, store) {
    // subject: rdflib NamedNode — the resource being viewed
    // store: rdflib IndexedFormula — the RDF graph
    // Return true if this pane can render this subject
    return true;
  },
  render(subject, store, container) {
    // subject: rdflib NamedNode
    // store: rdflib IndexedFormula
    // container: plain DOM element — render into this
    container.innerHTML = '<p>Hello from my pane</p>';
  }
}
```

### Rules

- `canHandle` must return a boolean. Return `false` to skip this pane for a given resource.
- `render` receives a plain DOM element. Use any method to fill it: vanilla JS, React, Vue, anything.
- `container.innerHTML = ''` is called before render, but clear it yourself if doing async work.
- For async rendering, guard against stale renders if the user switches tabs quickly.
- Only match `subject.termType === 'NamedNode'` unless you specifically want blank nodes.

## Creating a Page with a Data Pane

A complete example has three parts: data, pane, and shell.

### 1. The HTML page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My Example</title>
  <link rel="stylesheet" href="https://mashlib.com/mashlib.css">
</head>
<body>
  <!-- DATA: JSON-LD data island. @id "" resolves to the page URL -->
  <script type="application/ld+json">
  {
    "@context": {
      "schema": "https://schema.org/",
      "foaf": "http://xmlns.com/foaf/0.1/"
    },
    "@id": "",
    "@type": "schema:Person",
    "foaf:name": "Alice Example",
    "schema:jobTitle": "Engineer",
    "foaf:mbox": { "@id": "mailto:alice@example.org" },
    "foaf:homepage": { "@id": "https://example.org" }
  }
  </script>

  <!-- PANE: external pane loaded as ES module -->
  <script type="module" data-pane src="my-pane.js"></script>

  <!-- SHELL: mashlib-next renders into #mashlib -->
  <div id="mashlib"></div>
  <script type="module" src="https://mashlib.com/mashlib.js"></script>
</body>
</html>
```

### 2. The pane file (my-pane.js)

```js
export default {
  label: 'My View',
  icon: '✨',

  canHandle(subject, store) {
    if (subject.termType !== 'NamedNode') return false;
    // Get all triples and check for a Person rdf:type
    const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
    const stmts = store.statementsMatching(subject, undefined, undefined);
    return stmts.some(st =>
      st.predicate.value === RDF_TYPE && st.object.value.includes('Person')
    );
  },

  render(subject, store, container) {
    // Read triples from the store
    const triples = store
      .statementsMatching(subject, undefined, undefined)
      .map(st => ({
        predicate: st.predicate.value,
        object: st.object.value,
        type: st.object.termType,
      }));

    // Helper to shorten URIs
    const shorten = uri => {
      const i = Math.max(uri.lastIndexOf('#'), uri.lastIndexOf('/'));
      return i > 0 ? uri.slice(i + 1) : uri;
    };

    // Find specific values
    const name = triples.find(t => t.predicate.includes('name'))?.object ?? subject.value;
    const image = triples.find(t =>
      t.predicate.includes('img') || t.predicate.includes('image')
    )?.object;

    // Build DOM
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding:1.5em;font-family:system-ui,sans-serif;';

    if (image) {
      const img = document.createElement('img');
      img.src = image;
      img.alt = name;
      img.style.cssText = 'width:80px;height:80px;border-radius:50%;object-fit:cover;';
      wrapper.appendChild(img);
    }

    const h = document.createElement('h2');
    h.textContent = name;
    wrapper.appendChild(h);

    // Property table
    const table = document.createElement('table');
    table.style.cssText = 'border-collapse:collapse;width:100%;font-size:0.9em;';
    for (const t of triples) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.style.cssText = 'padding:0.3em 0.6em;border-bottom:1px solid #eee;font-weight:600;';
      td1.textContent = shorten(t.predicate);
      const td2 = document.createElement('td');
      td2.style.cssText = 'padding:0.3em 0.6em;border-bottom:1px solid #eee;';
      if (t.type === 'NamedNode') {
        const a = document.createElement('a');
        a.href = t.object;
        a.textContent = shorten(t.object);
        a.target = '_blank';
        td2.appendChild(a);
      } else {
        td2.textContent = t.object;
      }
      tr.appendChild(td1);
      tr.appendChild(td2);
      table.appendChild(tr);
    }
    wrapper.appendChild(table);

    container.appendChild(wrapper);
  }
}
```

## JSON-LD Data Island Reference

The `<script type="application/ld+json">` block is the data source. Key rules:

- `"@id": ""` resolves to the current page URL (the subject)
- `"@id": "#me"` creates a fragment subject (page URL + #me)
- `"@type"` sets the RDF type — use this in `canHandle` to match
- Nested objects with `"@id"` create links (NamedNode), without `"@id"` create blank nodes
- Multiple data islands are supported — all get parsed into the same store

### Common types and their prefixes

```json
{
  "@context": {
    "foaf": "http://xmlns.com/foaf/0.1/",
    "schema": "https://schema.org/",
    "vcard": "http://www.w3.org/2006/vcard/ns#",
    "as": "https://www.w3.org/ns/activitystreams#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  }
}
```

| Type | URI | Use for |
|------|-----|---------|
| Person | `schema:Person` or `foaf:Person` | Profiles, contacts |
| Event | `schema:Event` | Calendar events |
| Article | `schema:Article` | Blog posts, news |
| Product | `schema:Product` | Shop items |
| Organization | `schema:Organization` | Companies, groups |
| Recipe | `schema:Recipe` | Cooking recipes |
| ImageGallery | `schema:ImageGallery` | Photo collections |
| MusicPlaylist | `schema:MusicPlaylist` | Playlists |

## Reading Data from the Store

The `store` parameter is an rdflib `IndexedFormula`. Common patterns:

```js
// All triples for a subject
const stmts = store.statementsMatching(subject, undefined, undefined);

// Find a specific predicate value
const name = stmts.find(st =>
  st.predicate.value === 'http://xmlns.com/foaf/0.1/name'
)?.object.value;

// Check rdf:type
const types = stmts
  .filter(st => st.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
  .map(st => st.object.value);

// Each statement has: .subject, .predicate, .object, .graph
// Each term has: .value (the URI or literal string), .termType ('NamedNode', 'Literal', 'BlankNode')
```

> **Note:** External panes don't have direct access to rdflib's `sym()` helper.
> Use `store.statementsMatching(subject, undefined, undefined)` to get all triples,
> then filter by checking `.predicate.value` and `.object.value` strings.

## Using Frameworks

The `container` is a plain DOM element. Any framework works:

### React (lazy-loaded from CDN)
```js
render(subject, store, container) {
  import('https://esm.sh/react@19').then(React => {
    import('https://esm.sh/react-dom@19/client').then(ReactDOM => {
      const root = ReactDOM.createRoot(container);
      root.render(React.createElement('div', null, 'Hello React'));
    });
  });
}
```

### Preact + HTM (tiny, no build)
```js
render(subject, store, container) {
  Promise.all([
    import('https://esm.sh/preact@10'),
    import('https://esm.sh/preact@10/hooks'),
    import('https://esm.sh/htm@3'),
  ]).then(([preact, hooks, htmMod]) => {
    const html = htmMod.default.bind(preact.h);
    preact.render(html`<div>Hello Preact</div>`, container);
  });
}
```

### Vue (runtime compiler from CDN)
```js
render(subject, store, container) {
  import('https://esm.sh/vue@3/dist/vue.esm-browser.js').then(Vue => {
    const mountEl = document.createElement('div');
    container.appendChild(mountEl);
    Vue.createApp({ template: '<div>Hello Vue</div>' }).mount(mountEl);
  });
}
```

## Navigation Between Panes

To navigate to another resource from within a pane:

```js
window.dispatchEvent(new CustomEvent('mashlib:navigate', {
  detail: { uri: 'https://example.org/other-resource' }
}));
```

## File Structure

A minimal pane project is just two files:

```
my-example/
  index.html      ← page with data island + pane script
  my-pane.js      ← the pane ES module
```

No `package.json`, no build, no dependencies. Open `index.html` in a browser (via any HTTP server) and it works.

## Checklist

- [ ] JSON-LD data island with `@context`, `@id`, and `@type`
- [ ] Pane file with `canHandle` and `render` exported as default
- [ ] `<script type="module" data-pane src="my-pane.js">` before the mashlib script
- [ ] `<div id="mashlib"></div>` as the render target
- [ ] `<script type="module" src="https://mashlib.com/mashlib.js">` loads the shell
- [ ] `canHandle` checks `subject.termType === 'NamedNode'`
- [ ] `render` only uses the `container` DOM element — no globals
