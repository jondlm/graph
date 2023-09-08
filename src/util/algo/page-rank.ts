import type { GraphData, Module } from "../types";
import { multiply, Matrix } from "./matrix";

type ModuleWithPageRank = {
  pageRank: number;
} & Module;

export function pageRank(graph: GraphData): ModuleWithPageRank[] {
  const numNodes = graph.nodes.length;

  // Build up an array where each entry represents a node and the content is a
  // set of edges. This makes the next operations faster and easier.
  //
  // Example given:
  //    [
  //      { id: 'a'                    },
  //      { id: 'b', edges: ['a']      },
  //      { id: 'c', edges: ['a', 'b'] },
  //    ]
  //
  // Make:
  //    [
  //      Set(),
  //      Set(0),
  //      Set(0, 1),
  //    ]
  const nodes = graph.nodes.reduce<Set<number>[]>((acc, node) => {
    const edgeSet: Set<number> = new Set();

    for (const edgeId of node.edges ?? []) {
      const edgeIndex = graph.nodes.findIndex((node) => node.id === edgeId);

      if (edgeIndex === -1) {
        throw new Error(
          `Found edge with id=${edgeId} with no corresponding node. All edges must have a node with a matching id.`
        );
      }

      edgeSet.add(edgeIndex);
    }

    acc.push(edgeSet);

    return acc;
  }, []);

  // https://pi.math.cornell.edu/~mec/Winter2009/RalucaRemus/Lecture3/lecture3.html
  //
  // 1. build transition matrix that represents the probability of jumping from one node to another
  // 2. multiply that matrix by `1 \ numNodes` which becomes the "importance vector"
  // 3. repreat until things stabilize

  // This matrix represent the probability of jumping from one node to another.
  const transitionMatrix: Matrix = {
    size: [numNodes, numNodes],
    matrix: new Array(numNodes ** 2),
  };

  // Populate the transition matrix. Could boost perf by translating
  // ids to indexes ahead of time.
  //
  // Example given:
  //    [
  //      { id: 'a'                    },
  //      { id: 'b', edges: ['a']      },
  //      { id: 'c', edges: ['a', 'b'] },
  //    ]
  //
  // We represent the probability of jumping from one node to another with a
  // matrix as such:
  //              from
  //
  //    index-→  0  1  2
  //     |
  //     ↓       a  b  c
  //           +--------+
  // t   0   a | 0  1 .5|
  // o   1   b | 0  0 .5|
  //     2   c | 0  0  0|
  //           +--------+
  //
  for (let row = 0; row < numNodes; row++) {
    for (let col = 0; col < numNodes; col++) {
      const fromIndex = col;
      const toIndex = row;
      const targetIndex = row * numNodes + col;
      const fromSize = nodes[col].size;
      const potentialValue = fromSize === 0 ? 0 : 1 / fromSize;
      const hasEdge = nodes[fromIndex].has(toIndex);
      const isDanglingNode = nodes[fromIndex].size === 0;

      // To account for dangling nodes we do `1 / numNodes` in the case of a
      // node that has no outgoing edges.
      if (isDanglingNode) {
        transitionMatrix.matrix[targetIndex] = 1 / numNodes;
      } else {
        transitionMatrix.matrix[targetIndex] = hasEdge ? potentialValue : 0;
      }
    }
  }

  // This matrix will be "mutated" and converge to the actual page ranks of
  // each node over several iterations.
  let pageRankMatrix: Matrix = {
    size: [numNodes, 1],
    matrix: new Array(numNodes).fill(1 / numNodes),
  };

  // Start with a fixed number of iterations.
  for (let i = 0; i < 10; i++) {
    pageRankMatrix = multiply(transitionMatrix, pageRankMatrix);
  }

  const r: ModuleWithPageRank[] = graph.nodes.map((node, i) => {
    return {
      ...node,
      pageRank: pageRankMatrix.matrix[i],
    };
  });

  return r;
}
