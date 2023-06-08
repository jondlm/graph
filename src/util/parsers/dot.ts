import type { Module, GraphData } from "../types";

// really poor man's digraph parser written mostly by chat gpt
export function parseDotGraph(input: string): GraphData {
  const lines = input.split("\n");
  const nodes: Module[] = [];

  for (const line of lines) {
    if (!line.includes("->")) continue;

    const matches = line.trim().match(/^\s*"?(\S+?)"?\s*->\s*"?(\S+?)"?\s*;?\s*$/);
    if (matches == null) continue;

    const from = matches[1];
    const to = matches[2];

    if (!from || !to) continue;

    const fromNode = nodes.find((n) => n.id === from);
    if (fromNode != null) {
      fromNode.edges?.push(to);
    } else {
      nodes.push({ id: from, label: from, edges: [to] });
    }

    const toNode = nodes.find((n) => n.id === to);
    if (!toNode) {
      nodes.push({ id: to, label: to, edges: [] });
    }
  }

  return { nodes };
}
