export default {
  label: 'Credential',
  icon: '🛡',
  canHandle(subject, store) {
    return store.match(subject, null, null, null)
      .some(s => s.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
              && s.object.value === 'https://www.w3.org/2018/credentials#VerifiableCredential')
  },
  render(subject, store, container) {
    const stmts = store.match(subject, null, null, null)
    const get = (pred) => stmts.find(s => s.predicate.value.endsWith(pred))?.object?.value
    const getNode = (pred) => stmts.find(s => s.predicate.value.endsWith(pred))?.object

    const name = get('name') || 'Verifiable Credential'
    const description = get('description') || ''

    // Issuer — may be a blank node with nested properties
    const issuerNode = getNode('issuer')
    let issuerName = '', issuerUrl = ''
    if (issuerNode) {
      const issuerStmts = store.match(issuerNode, null, null, null)
      issuerName = issuerStmts.find(s => s.predicate.value.endsWith('name'))?.object?.value || issuerNode.value || ''
      issuerUrl = issuerStmts.find(s => s.predicate.value.endsWith('url'))?.object?.value || ''
    }

    // Credential subject
    const csNode = getNode('credentialSubject')
    let subjectName = '', subjectDegree = '', subjectId = ''
    if (csNode) {
      const csStmts = store.match(csNode, null, null, null)
      subjectName = csStmts.find(s => s.predicate.value.endsWith('name'))?.object?.value || ''
      subjectId = csStmts.find(s => s.predicate.value.endsWith('identifier'))?.object?.value
        || csNode.value || ''
      // Look for degree / achievement nested node
      const degreeNode = csStmts.find(s => s.predicate.value.endsWith('degree') || s.predicate.value.endsWith('hasCredential'))?.object
      if (degreeNode) {
        const dStmts = store.match(degreeNode, null, null, null)
        subjectDegree = dStmts.find(s => s.predicate.value.endsWith('name'))?.object?.value || ''
      }
    }

    const issuanceDate = formatDate(get('issuanceDate') || get('validFrom'))
    const expirationDate = formatDate(get('expirationDate') || get('validUntil'))

    // Status
    const statusNode = getNode('credentialStatus')
    let statusType = ''
    if (statusNode) {
      const sStmts = store.match(statusNode, null, null, null)
      statusType = sStmts.find(s => s.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')?.object?.value || ''
      statusType = statusType.split(/[#/]/).pop()
    }

    // Determine if expired
    const now = new Date()
    const expDate = get('expirationDate') || get('validUntil')
    const isExpired = expDate && new Date(expDate) < now
    const statusColor = isExpired ? '#dc2626' : '#16a34a'
    const statusLabel = isExpired ? 'Expired' : 'Active'

    container.innerHTML = `
      <style>
        .vc { max-width:520px; margin:2em auto; font-family:system-ui,sans-serif }
        .vc-card {
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
          border-radius:16px; padding:2em; color:#e0e7ff; position:relative; overflow:hidden;
          box-shadow: 0 8px 32px rgba(30,27,75,.4);
        }
        .vc-card::before {
          content:''; position:absolute; top:-50%; right:-50%; width:100%; height:100%;
          background: radial-gradient(circle, rgba(139,92,246,.15) 0%, transparent 70%);
          pointer-events:none;
        }
        .vc-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.5em; position:relative }
        .vc-shield { font-size:2.2em; filter:drop-shadow(0 2px 8px rgba(139,92,246,.5)) }
        .vc-badge {
          display:inline-flex; align-items:center; gap:6px;
          background: ${statusColor}22; color: ${statusColor};
          border:1px solid ${statusColor}44; border-radius:99px; padding:4px 14px;
          font-size:.8em; font-weight:600;
        }
        .vc-badge::before { content:''; width:8px; height:8px; border-radius:50%; background:${statusColor} }
        .vc-title { font-size:1.4em; font-weight:700; color:#fff; margin-bottom:.3em; position:relative }
        .vc-desc { color:#a5b4fc; font-size:.9em; line-height:1.5; margin-bottom:1.5em; position:relative }
        .vc-divider { border:none; border-top:1px solid rgba(255,255,255,.1); margin:1.2em 0 }
        .vc-grid { display:grid; grid-template-columns:1fr 1fr; gap:1em; position:relative }
        .vc-field-label { font-size:.7em; text-transform:uppercase; letter-spacing:.08em; color:#818cf8; margin-bottom:.2em }
        .vc-field-value { font-size:.9em; color:#e0e7ff; font-weight:500; word-break:break-all }
        .vc-field-value a { color:#a5b4fc; text-decoration:none }
        .vc-field-value a:hover { text-decoration:underline }
        .vc-subject { background:rgba(255,255,255,.06); border-radius:10px; padding:1em; margin-top:1.2em; position:relative }
        .vc-subject-title { font-size:.75em; text-transform:uppercase; letter-spacing:.08em; color:#818cf8; margin-bottom:.6em }
        .vc-hologram {
          position:absolute; bottom:1em; right:1.5em; width:48px; height:48px;
          background: conic-gradient(from 0deg, #818cf8, #a78bfa, #c084fc, #818cf8);
          border-radius:50%; opacity:.3;
        }
      </style>
      <div class="vc">
        <div class="vc-card">
          <div class="vc-header">
            <span class="vc-shield">🛡</span>
            <span class="vc-badge">${esc(statusLabel)}</span>
          </div>
          <div class="vc-title">${esc(name)}</div>
          ${description ? `<div class="vc-desc">${esc(description)}</div>` : ''}
          <div class="vc-grid">
            <div>
              <div class="vc-field-label">Issuer</div>
              <div class="vc-field-value">${issuerUrl
                ? `<a href="${esc(issuerUrl)}" target="_blank">${esc(issuerName)}</a>`
                : esc(issuerName)}</div>
            </div>
            ${statusType ? `<div>
              <div class="vc-field-label">Status</div>
              <div class="vc-field-value">${esc(statusType)}</div>
            </div>` : ''}
            <div>
              <div class="vc-field-label">Issued</div>
              <div class="vc-field-value">${esc(issuanceDate || 'N/A')}</div>
            </div>
            <div>
              <div class="vc-field-label">Expires</div>
              <div class="vc-field-value">${esc(expirationDate || 'No expiry')}</div>
            </div>
          </div>
          ${csNode ? `
          <hr class="vc-divider">
          <div class="vc-subject">
            <div class="vc-subject-title">Credential Subject</div>
            <div class="vc-grid">
              ${subjectName ? `<div>
                <div class="vc-field-label">Name</div>
                <div class="vc-field-value">${esc(subjectName)}</div>
              </div>` : ''}
              ${subjectDegree ? `<div>
                <div class="vc-field-label">Degree</div>
                <div class="vc-field-value">${esc(subjectDegree)}</div>
              </div>` : ''}
              ${subjectId ? `<div>
                <div class="vc-field-label">ID</div>
                <div class="vc-field-value" style="font-size:.75em">${esc(subjectId)}</div>
              </div>` : ''}
            </div>
          </div>` : ''}
          <div class="vc-hologram"></div>
        </div>
      </div>
    `
  }
}

function formatDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch { return iso }
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}
