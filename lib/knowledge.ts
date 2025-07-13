import { marked } from "marked";
import Fuse from "fuse.js";
import { tracekidKb } from "~/knowledge/tracekidkb";

export async function loadKnowledgeBase(): Promise<string> {
  return tracekidKb;
}

// Parse sections by heading level
export function extractSections(markdown: string): { heading: string; content: string }[] {
  const tokens = marked.lexer(markdown);
  const sections: { heading: string; content: string }[] = [];

  let current: { heading: string; content: string } | null = null;

  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 1) {
      if (current) {
        sections.push(current);
      }
      current = { heading: token.text, content: '' };
    } else if (current) {
      if ('raw' in token && typeof token.raw === 'string') {
        current.content += token.raw + '\n';
      }
    }
  }

  if (current) {
    sections.push(current);
  }

  return sections;
}

// Search for relevant sections based on keywords
export function findRelevantSections(
  userQuery: string,
  sections: { heading: string; content: string }[]
): string {
  const options = {
    includeScore: true,
    threshold: 0.7,
    ignoreLocation: true,
    distance: 10000,
    ignoreFieldNorm: true,
    keys: ['heading', 'content'],
  };

  const fuse = new Fuse(sections, options);
  const results = fuse.search(userQuery);

  const topResults = results
    .filter(r => r.score !== undefined && r.score <= options.threshold)
    .slice(0, 2) // take top 2
    .map(r => `### ${r.item.heading}\n${r.item.content.trim()}`);

  return topResults.join('\n\n');
}
