// For some odd reason parcel can't do `import {parse} from 'ts-graphviz/ast'`
// even though it appears supported via the export map in `package.json`. Seems
// like it could be Parcel bug.
//
// Oddly it works with node.js but not Parcel so I have a bit of a problem
// here. For tests to work I need to use `ts-graphviz/ast` but for Parcel I
// need the full path :(
import { parse } from "ts-graphviz/lib/ast/index.js"; // parcel
// import { parse, EdgeASTNode } from "ts-graphviz/ast"; // node (correct)

import type { Module, GraphData } from "/src/util/types";

// really poor man's digraph parser written mostly by chat gpt
export function parseDotGraph(input: string): GraphData {
  const ast = parse(input);

  const modules: Module[] = [];
  const idToIndex: { [id: string]: number } = {};

  const addModule = (id: string): number => {
    let index;

    if (idToIndex[id] == null) {
      index = modules.push({ id }) - 1;
      idToIndex[id] = index;
    } else {
      index = idToIndex[id];
    }

    return index;
  };

  const graph = ast.children.find((node) => node.type === "Graph");

  if (graph == null || graph.type != "Graph") {
    throw new Error("Must have one graph.");
  }

  if (graph.directed === false) {
    throw new Error("Must have a directed graph.");
  }

  const edges = graph.children.filter((node) => node.type === "Edge");
  const nodes = graph.children.filter((node) => node.type === "Node");

  edges.forEach((edge) => {
    if (edge.type !== "Edge") {
      // Make TS happy. For some reason it can't infer that the `.filter` above
      // only returns edges.
      throw new Error("Edges must be edges");
    }

    const from = edge.targets[0];
    const to = edge.targets[1];

    if (from == null || from.type !== "NodeRef") {
      throw new Error("First target must be NodeRef target");
    }

    if (to == null || to.type !== "NodeRef") {
      throw new Error("Second target must be NodeRef target");
    }

    const fromId = from.id.value;
    const toId = to.id.value;

    const fromIndex = addModule(fromId);
    const toIndex = addModule(toId);

    if (modules[fromIndex] == null) {
      throw new Error("Module unexpected missing");
    }

    if (modules[fromIndex].edges == null) {
      modules[fromIndex].edges = [toId];
    } else {
      modules[fromIndex].edges!.push(toId);
    }
  });

  // Handle dangling nodes
  nodes.forEach((node) => {
    if (node.type !== "Node") {
      // Make TS happy. For some reason it can't infer that the `.filter` above
      // only returns nodes.
      throw new Error("Nodes must be nodes");
    }
    addModule(node.id.value);
  });

  return { nodes: modules };
}
