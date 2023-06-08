import type { Id, GraphData, Module } from "../types";

function tarjan(input: GraphData) {
  const modulesById = input.nodes.reduce((acc, node) => {
    acc.set(node.id, node);
    return acc;
  }, new Map());
  const scc: Array<Array<Id>> = [];
  const stack: Array<Id> = [];
  const visitied = new Set<string | number>(); // by id

  const traverse = (node: Module) => {
    visitied.add(node.id);
    stack.push(node.id);

    if (node.edges != null && node.edges.length > 0) {
      for (const edge of node.edges) {
        if (!visitied.has(edge)) {
          traverse(modulesById.get(edge));
        } else if (stack.includes(edge)) {
          const sccNode = stack.pop()!;
          const sccComponent = [sccNode];
          while (stack[stack.length - 1] !== edge) {
            sccComponent.push(stack.pop()!);
          }
          sccComponent.push(stack.pop()!);
          scc.push(sccComponent);
        }
      }
    }
  };

  for (const node of input.nodes) {
    if (!visitied.has(node.id)) {
      traverse(node);
    }
  }

  return scc;
}
