import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { parseDotGraph } from "./dot";

describe("dot", () => {
  describe("parseDotGraph", () => {
    test("basic", () => {
      const dot = `digraph my_graph {
  joe   -> sally;
  "joe" -> frank;
  frank -> susan;
  sally -> frank;
  sally -> "susan";
}`;

      const graph = parseDotGraph(dot);

      const expected = {
        nodes: [
          { id: "joe", edges: ["sally", "frank"] },
          { id: "sally", edges: ["frank", "susan"] },
          { id: "frank", edges: ["susan"] },
          { id: "susan" },
        ],
      };

      console.log(graph);

      assert.deepEqual(graph, expected);
    });

    test("handles edgeless nodes", () => {
      const dot = `digraph my_graph {
  joe -> sally;
  sue;
}`;

      const graph = parseDotGraph(dot);

      const expected = {
        nodes: [
          { id: "joe", edges: ["sally"] },
          { id: "sally" },
          { id: "sue" },
        ],
      };

      console.log(graph);

      assert.deepEqual(graph, expected);
    });
  });
});
