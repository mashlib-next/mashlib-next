import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderCode } from "./render.js";
const CODE_EXTENSIONS = {
  ".js": "JavaScript",
  ".mjs": "JavaScript",
  ".cjs": "JavaScript",
  ".jsx": "JSX",
  ".ts": "TypeScript",
  ".tsx": "TSX",
  ".py": "Python",
  ".rb": "Ruby",
  ".rs": "Rust",
  ".go": "Go",
  ".java": "Java",
  ".kt": "Kotlin",
  ".scala": "Scala",
  ".c": "C",
  ".h": "C Header",
  ".cpp": "C++",
  ".cc": "C++",
  ".hpp": "C++ Header",
  ".cs": "C#",
  ".swift": "Swift",
  ".php": "PHP",
  ".pl": "Perl",
  ".lua": "Lua",
  ".r": "R",
  ".sh": "Shell",
  ".bash": "Bash",
  ".zsh": "Zsh",
  ".fish": "Fish",
  ".ps1": "PowerShell",
  ".sql": "SQL",
  ".json": "JSON",
  ".yaml": "YAML",
  ".yml": "YAML",
  ".toml": "TOML",
  ".xml": "XML",
  ".css": "CSS",
  ".scss": "SCSS",
  ".less": "LESS",
  ".sass": "Sass",
  ".graphql": "GraphQL",
  ".gql": "GraphQL",
  ".proto": "Protocol Buffers",
  ".dockerfile": "Dockerfile",
  ".tf": "Terraform",
  ".vim": "Vim Script",
  ".el": "Emacs Lisp",
  ".clj": "Clojure",
  ".ex": "Elixir",
  ".exs": "Elixir",
  ".erl": "Erlang",
  ".hs": "Haskell",
  ".ml": "OCaml",
  ".fs": "F#",
  ".dart": "Dart",
  ".zig": "Zig",
  ".v": "V",
  ".nim": "Nim",
  ".wasm": "WebAssembly",
  ".wat": "WebAssembly Text"
};
function getLanguage(uri) {
  const path = uri.split("?")[0].split("#")[0];
  const basename = path.split("/").pop() ?? "";
  const lowerBasename = basename.toLowerCase();
  if (lowerBasename === "dockerfile") return "Dockerfile";
  if (lowerBasename === "makefile" || lowerBasename === "gnumakefile") return "Makefile";
  if (lowerBasename === "rakefile") return "Ruby";
  if (lowerBasename === "gemfile") return "Ruby";
  if (lowerBasename === "cmakelists.txt") return "CMake";
  const dotIdx = basename.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const ext = basename.slice(dotIdx).toLowerCase();
  return CODE_EXTENSIONS[ext] ?? null;
}
function isCode(subject, store) {
  if (getLanguage(subject.value)) return true;
  const types = store.each(subject, RDF("type"), null, null).map((t) => t.value);
  if (types.includes(SCHEMA("SoftwareSourceCode").value)) return true;
  return false;
}
const codePane = {
  label: "Code",
  icon: "\u{1F4BB}",
  canHandle(subject, store) {
    return isCode(subject, store);
  },
  render(subject, store, container) {
    renderCode(subject, store, container);
  }
};
export {
  codePane,
  getLanguage
};
