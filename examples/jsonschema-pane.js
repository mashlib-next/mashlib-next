/**
 * JSON Schema form pane — PoC
 *
 * Reads a JSON Schema from <script type="application/schema+json"> on the page,
 * generates a live-validated form pre-filled from the RDF store, and shows
 * a JSON-LD preview. No framework, no dependencies.
 */

function triplesFor(subject, store) {
  return store
    .statementsMatching(subject, undefined, undefined)
    .map((st) => ({
      predicate: st.predicate.value,
      object: st.object.value,
      type: st.object.termType,
    }))
}

function shorten(uri) {
  const i = Math.max(uri.lastIndexOf('#'), uri.lastIndexOf('/'))
  return i > 0 ? uri.slice(i + 1) : uri
}

function getSchema() {
  const el = document.querySelector('script[type="application/schema+json"]')
  if (!el) return null
  try {
    return JSON.parse(el.textContent)
  } catch {
    return null
  }
}

function inputTypeFor(prop) {
  if (prop.format === 'email') return 'email'
  if (prop.format === 'uri' || prop.format === 'url') return 'url'
  if (prop.format === 'date') return 'date'
  if (prop.format === 'date-time') return 'datetime-local'
  if (prop.type === 'number' || prop.type === 'integer') return 'number'
  if (prop.type === 'boolean') return 'checkbox'
  return 'text'
}

function validate(value, prop, required) {
  if (required && !value) return 'This field is required'
  if (!value) return null
  if (prop.minLength && value.length < prop.minLength)
    return `At least ${prop.minLength} characters`
  if (prop.maxLength && value.length > prop.maxLength)
    return `At most ${prop.maxLength} characters`
  if (prop.pattern) {
    try {
      if (!new RegExp(prop.pattern).test(value)) return `Must match pattern`
    } catch {}
  }
  if (prop.format === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    return 'Enter a valid email'
  if ((prop.format === 'uri' || prop.format === 'url') && !/^https?:\/\/.+/.test(value))
    return 'Enter a valid URL'
  if (prop.minimum != null && Number(value) < prop.minimum)
    return `Minimum ${prop.minimum}`
  if (prop.maximum != null && Number(value) > prop.maximum)
    return `Maximum ${prop.maximum}`
  if (prop.enum && !prop.enum.includes(value)) return 'Invalid choice'
  return null
}

export default {
  label: 'Form',
  icon: '📝',

  canHandle(subject) {
    const schema = getSchema()
    return subject.termType === 'NamedNode' && schema !== null
  },

  render(subject, store, container) {
    container.innerHTML = ''

    const schema = getSchema()
    if (!schema || !schema.properties) {
      container.innerHTML =
        '<p style="padding:1.5em;color:#dc2626;">No valid JSON Schema found on page.</p>'
      return
    }

    const triples = triplesFor(subject, store)
    const required = new Set(schema.required || [])
    const entries = Object.entries(schema.properties)
    const values = {}
    const errors = {}

    // Pre-fill from store
    for (const [key] of entries) {
      const short = shorten(key)
      const triple = triples.find(
        (t) => shorten(t.predicate) === short || t.predicate === key
      )
      values[key] = triple ? triple.object : ''
    }

    // --- Shell ---
    const shell = document.createElement('div')
    shell.style.cssText =
      'font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;padding:2em 1.5em;'

    // --- Header ---
    const header = document.createElement('div')
    header.style.cssText = 'margin-bottom:2em;'

    const title = document.createElement('h2')
    title.style.cssText =
      'margin:0 0 0.25em;font-size:1.5em;font-weight:700;color:#1e293b;letter-spacing:-0.01em;'
    title.textContent = schema.title || 'Edit resource'

    const subtitle = document.createElement('p')
    subtitle.style.cssText = 'margin:0;color:#64748b;font-size:0.9em;line-height:1.5;'
    subtitle.textContent =
      schema.description || `Editing ${shorten(subject.value)}`

    header.appendChild(title)
    header.appendChild(subtitle)

    // Pill showing the resource URI
    const pill = document.createElement('div')
    pill.style.cssText =
      'display:inline-flex;align-items:center;gap:0.4em;margin-top:0.75em;padding:0.3em 0.75em;background:#f1f5f9;border-radius:100px;font-size:0.75em;color:#475569;'
    pill.innerHTML = `<span style="color:#94a3b8;">&#9679;</span> ${subject.value}`
    header.appendChild(pill)

    shell.appendChild(header)

    // --- Form ---
    const form = document.createElement('form')
    form.setAttribute('novalidate', '')
    form.style.cssText = 'display:flex;flex-direction:column;gap:1.25em;'

    const fieldEls = {}
    const errorEls = {}

    for (const [key, prop] of entries) {
      const isReq = required.has(key)
      const label = prop.title || shorten(key)

      const group = document.createElement('div')
      group.style.cssText = 'display:flex;flex-direction:column;gap:0.35em;'

      // Label row
      const labelRow = document.createElement('div')
      labelRow.style.cssText = 'display:flex;align-items:baseline;gap:0.4em;'

      const lbl = document.createElement('label')
      lbl.style.cssText =
        'font-size:0.85em;font-weight:600;color:#334155;'
      lbl.textContent = label
      lbl.setAttribute('for', `field-${key}`)
      labelRow.appendChild(lbl)

      if (isReq) {
        const req = document.createElement('span')
        req.style.cssText = 'color:#ef4444;font-size:0.75em;font-weight:500;'
        req.textContent = 'required'
        labelRow.appendChild(req)
      }

      if (prop.description) {
        const hint = document.createElement('span')
        hint.style.cssText =
          'margin-left:auto;font-size:0.75em;color:#94a3b8;font-weight:400;'
        hint.textContent = prop.description
        labelRow.appendChild(hint)
      }

      group.appendChild(labelRow)

      // Input
      let input
      if (prop.enum) {
        input = document.createElement('select')
        const empty = document.createElement('option')
        empty.value = ''
        empty.textContent = `Select ${label.toLowerCase()}…`
        input.appendChild(empty)
        for (const opt of prop.enum) {
          const o = document.createElement('option')
          o.value = opt
          o.textContent = opt
          if (values[key] === opt) o.selected = true
          input.appendChild(o)
        }
      } else if (prop.type === 'string' && prop.maxLength > 200) {
        input = document.createElement('textarea')
        input.rows = 3
        input.value = values[key] || ''
      } else {
        input = document.createElement('input')
        input.type = inputTypeFor(prop)
        input.value = values[key] || ''
        if (prop.placeholder) input.placeholder = prop.placeholder
        if (prop.minimum != null) input.min = prop.minimum
        if (prop.maximum != null) input.max = prop.maximum
      }

      input.id = `field-${key}`
      input.name = key
      input.style.cssText =
        'padding:0.65em 0.85em;border:1.5px solid #e2e8f0;border-radius:10px;font-size:0.9em;' +
        'font-family:inherit;color:#1e293b;background:#fff;outline:none;' +
        'transition:border-color 0.2s,box-shadow 0.2s;'

      input.addEventListener('focus', () => {
        input.style.borderColor = '#818cf8'
        input.style.boxShadow = '0 0 0 3px rgba(129,140,248,0.15)'
      })
      input.addEventListener('blur', () => {
        const err = validate(input.value, prop, isReq)
        if (err) {
          input.style.borderColor = '#fca5a5'
          input.style.boxShadow = '0 0 0 3px rgba(252,165,165,0.15)'
        } else {
          input.style.borderColor = '#e2e8f0'
          input.style.boxShadow = 'none'
        }
      })

      input.addEventListener('input', () => {
        values[key] = input.value
        const err = validate(input.value, prop, isReq)
        errors[key] = err
        errorEls[key].textContent = err || ''
        errorEls[key].style.display = err ? 'block' : 'none'
        if (!err) {
          input.style.borderColor = '#818cf8'
          input.style.boxShadow = '0 0 0 3px rgba(129,140,248,0.15)'
        }
        updatePreview()
      })

      group.appendChild(input)
      fieldEls[key] = input

      // Error
      const errEl = document.createElement('div')
      errEl.style.cssText =
        'font-size:0.78em;color:#ef4444;display:none;padding-left:0.2em;'
      group.appendChild(errEl)
      errorEls[key] = errEl

      form.appendChild(group)
    }

    shell.appendChild(form)

    // --- Divider ---
    const divider = document.createElement('div')
    divider.style.cssText =
      'height:1px;background:linear-gradient(to right,transparent,#e2e8f0,transparent);margin:2em 0;'
    shell.appendChild(divider)

    // --- Preview ---
    const previewSection = document.createElement('div')

    const previewHeader = document.createElement('div')
    previewHeader.style.cssText =
      'display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75em;'

    const previewTitle = document.createElement('h3')
    previewTitle.style.cssText =
      'margin:0;font-size:0.85em;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.05em;'
    previewTitle.textContent = 'JSON-LD Output'

    const copyBtn = document.createElement('button')
    copyBtn.type = 'button'
    copyBtn.textContent = 'Copy'
    copyBtn.style.cssText =
      'padding:0.3em 0.7em;border:1px solid #e2e8f0;border-radius:6px;background:#fff;' +
      'font-size:0.75em;color:#64748b;cursor:pointer;transition:all 0.2s;'
    copyBtn.addEventListener('mouseenter', () => {
      copyBtn.style.borderColor = '#818cf8'
      copyBtn.style.color = '#818cf8'
    })
    copyBtn.addEventListener('mouseleave', () => {
      copyBtn.style.borderColor = '#e2e8f0'
      copyBtn.style.color = '#64748b'
    })
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(previewCode.textContent).then(() => {
        copyBtn.textContent = 'Copied!'
        setTimeout(() => (copyBtn.textContent = 'Copy'), 1500)
      })
    })

    previewHeader.appendChild(previewTitle)
    previewHeader.appendChild(copyBtn)
    previewSection.appendChild(previewHeader)

    const previewCode = document.createElement('pre')
    previewCode.style.cssText =
      'background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:1em 1.25em;' +
      'font-size:0.8em;line-height:1.6;color:#334155;overflow-x:auto;font-family:"SF Mono",Consolas,monospace;'
    previewSection.appendChild(previewCode)

    shell.appendChild(previewSection)
    container.appendChild(shell)

    function buildJsonLd() {
      const ctx = {}
      const data = {}
      for (const [key, prop] of entries) {
        const val = values[key]
        if (!val) continue
        const short = shorten(key)
        const ns = key.slice(0, key.length - short.length)
        if (ns) {
          const prefix = Object.entries(ctx).find(([, v]) => v === ns)?.[0]
          if (!prefix) {
            // Derive prefix from namespace
            const p = ns.replace(/[/#]$/, '').split('/').pop() || 'ns'
            ctx[p] = ns
          }
        }
        const prefix = Object.entries(ctx).find(([, v]) => v === key.slice(0, key.length - short.length))?.[0]
        const outKey = prefix ? `${prefix}:${short}` : key

        if (prop.format === 'uri' || prop.format === 'url' || prop.format === 'email') {
          data[outKey] = {
            '@id': prop.format === 'email' ? `mailto:${val}` : val,
          }
        } else if (prop.type === 'number' || prop.type === 'integer') {
          data[outKey] = Number(val)
        } else {
          data[outKey] = val
        }
      }

      return {
        '@context': ctx,
        '@id': subject.value,
        ...data,
      }
    }

    function syntaxHighlight(json) {
      return json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(
          /("@?\w+")\s*:/g,
          '<span style="color:#6366f1;">$1</span>:'
        )
        .replace(
          /:\s*(".*?")/g,
          (_, v) =>
            `: <span style="color:#059669;">${v}</span>`
        )
        .replace(
          /:\s*(\d+)/g,
          ': <span style="color:#d97706;">$1</span>'
        )
    }

    function updatePreview() {
      const ld = buildJsonLd()
      const json = JSON.stringify(ld, null, 2)
      previewCode.innerHTML = syntaxHighlight(json)
    }

    updatePreview()
  },
}
