import type { Id, GraphData, Module } from "../types";

export function tarjan(input: GraphData) {
  const UNVISITED = -1;
  const n = input.nodes.length;
  const [g, indexToId] = adjacencyList(input);

  let id = 0;

  const ids = Array(n).fill(UNVISITED);
  const low = Array(n).fill(0);
  const onStack = Array(n).fill(false);
  const stack: number[] = [];

  const dfs = (at: number) => {
    stack.push(at);
    onStack[at] = true;
    ids[at] = id;
    low[at] = id;
    id += 1;

    // Visit all neighbors and min low-link on callback
    for (let to of g[at]) {
      // v = at
      // w = to
      if (ids[to] === UNVISITED) {
        dfs(to);
        low[at] = Math.min(low[at], low[to]);
      } else if (onStack[to] === true) {
        low[at] = Math.min(low[at], ids[to]);
      }
    }

    // After visiting all `at` neighbors if we're at the start of an SCC, empty
    // the seen stack until we back to the start of the SCC.
    if (ids[at] === low[at]) {
      let node;

      do {
        node = stack.pop()!;
        onStack[node] = false;
        low[node] = ids[at];
      } while (node !== at);
    }
  };

  for (let i = 0; i < n; i++) {
    if (ids[i] === UNVISITED) {
      dfs(i);
    }
  }

  // This transformed the `low` array into groupings of cycles. If multiple
  // entries share the same "lowlink" value then they are part of an SCC.
  const cyclesIndex: { [n: number]: number[] } = {};
  for (let i = 0; i < n; i++) {
    if (cyclesIndex[low[i]] == null) {
      cyclesIndex[low[i]] = [];
    }

    cyclesIndex[low[i]].push(i);
  }

  const cycles: Id[][] = [];
  for (const [, indexes] of Object.entries(cyclesIndex)) {
    // With tarjan's, cycles are only SCCs with more than 1 node
    if (indexes.length > 1) {
      // Map the indexes back to the user-provided IDs
      cycles.push(indexes.map((i) => indexToId[i]));
    }
  }

  return cycles;
}

export function adjacencyList(
  input: GraphData
): [{ [i: number]: number[] }, { [n: number]: Id }] {
  const list: { [i: number]: number[] } = {};

  const idToIndex: { [id: Id]: number } = {};
  const indexToId: { [n: number]: Id } = {};

  input.nodes.forEach((node, i) => {
    idToIndex[node.id] = i;
    indexToId[i] = node.id;
  });

  for (let i = 0; i < input.nodes.length; i++) {
    const node = input.nodes[i];
    list[i] = [];

    for (let edge of node.edges ?? []) {
      list[i].push(idToIndex[edge]);
    }
  }

  return [list, indexToId];
}
