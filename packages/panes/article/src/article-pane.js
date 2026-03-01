import { RDF, SCHEMA } from "@mashlib-next/utils";
import { renderArticle } from "./render.js";
const ARTICLE_TYPES = [
  "Article",
  "BlogPosting",
  "NewsArticle",
  "ScholarlyArticle",
  "TechArticle",
  "SocialMediaPosting",
  "Report"
];
function isArticle(subject, store) {
  const types = store.each(subject, RDF("type"), null, null);
  const typeUris = types.map((t) => t.value);
  for (const t of ARTICLE_TYPES) {
    if (typeUris.includes(SCHEMA(t).value)) return true;
  }
  if (store.any(subject, SCHEMA("articleBody"), null, null)) return true;
  if (store.any(subject, SCHEMA("headline"), null, null)) return true;
  return false;
}
const articlePane = {
  label: "Article",
  icon: "\u{1F4F0}",
  canHandle(subject, store) {
    return isArticle(subject, store);
  },
  render(subject, store, container) {
    renderArticle(subject, store, container);
  }
};
export {
  articlePane
};
