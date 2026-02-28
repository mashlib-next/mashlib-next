import type { Pane } from '@mashlib-next/pane-registry'
import type { NamedNode, Store } from '@mashlib-next/store'
import { RDF, SCHEMA } from '@mashlib-next/utils'
import { renderCode } from './render.js'

const CODE_EXTENSIONS: Record<string, string> = {
  '.js': 'JavaScript',
  '.mjs': 'JavaScript',
  '.cjs': 'JavaScript',
  '.jsx': 'JSX',
  '.ts': 'TypeScript',
  '.tsx': 'TSX',
  '.py': 'Python',
  '.rb': 'Ruby',
  '.rs': 'Rust',
  '.go': 'Go',
  '.java': 'Java',
  '.kt': 'Kotlin',
  '.scala': 'Scala',
  '.c': 'C',
  '.h': 'C Header',
  '.cpp': 'C++',
  '.cc': 'C++',
  '.hpp': 'C++ Header',
  '.cs': 'C#',
  '.swift': 'Swift',
  '.php': 'PHP',
  '.pl': 'Perl',
  '.lua': 'Lua',
  '.r': 'R',
  '.sh': 'Shell',
  '.bash': 'Bash',
  '.zsh': 'Zsh',
  '.fish': 'Fish',
  '.ps1': 'PowerShell',
  '.sql': 'SQL',
  '.json': 'JSON',
  '.yaml': 'YAML',
  '.yml': 'YAML',
  '.toml': 'TOML',
  '.xml': 'XML',
  '.css': 'CSS',
  '.scss': 'SCSS',
  '.less': 'LESS',
  '.sass': 'Sass',
  '.graphql': 'GraphQL',
  '.gql': 'GraphQL',
  '.proto': 'Protocol Buffers',
  '.dockerfile': 'Dockerfile',
  '.tf': 'Terraform',
  '.vim': 'Vim Script',
  '.el': 'Emacs Lisp',
  '.clj': 'Clojure',
  '.ex': 'Elixir',
  '.exs': 'Elixir',
  '.erl': 'Erlang',
  '.hs': 'Haskell',
  '.ml': 'OCaml',
  '.fs': 'F#',
  '.dart': 'Dart',
  '.zig': 'Zig',
  '.v': 'V',
  '.nim': 'Nim',
  '.wasm': 'WebAssembly',
  '.wat': 'WebAssembly Text',
}

/**
 * Get the language label for a URI based on file extension.
 * Returns null if not a recognized code file.
 */
export function getLanguage(uri: string): string | null {
  const path = uri.split('?')[0].split('#')[0]
  const basename = path.split('/').pop() ?? ''

  // Special filenames
  const lowerBasename = basename.toLowerCase()
  if (lowerBasename === 'dockerfile') return 'Dockerfile'
  if (lowerBasename === 'makefile' || lowerBasename === 'gnumakefile') return 'Makefile'
  if (lowerBasename === 'rakefile') return 'Ruby'
  if (lowerBasename === 'gemfile') return 'Ruby'
  if (lowerBasename === 'cmakelists.txt') return 'CMake'

  const dotIdx = basename.lastIndexOf('.')
  if (dotIdx === -1) return null

  const ext = basename.slice(dotIdx).toLowerCase()
  return CODE_EXTENSIONS[ext] ?? null
}

function isCode(subject: NamedNode, store: Store): boolean {
  // Check by file extension
  if (getLanguage(subject.value)) return true

  // Check by RDF type
  const types = store.each(subject, RDF('type'), null, null).map(t => t.value)
  if (types.includes(SCHEMA('SoftwareSourceCode').value)) return true

  return false
}

export const codePane: Pane = {
  label: 'Code',
  icon: '\u{1F4BB}',

  canHandle(subject: NamedNode, store: Store): boolean {
    return isCode(subject, store)
  },

  render(subject: NamedNode, store: Store, container: HTMLElement): void {
    renderCode(subject, store, container)
  },
}
