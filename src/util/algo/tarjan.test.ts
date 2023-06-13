import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { adjacencyList, tarjan } from "./tarjan";

describe("tarjan", () => {
  test("finds a small cycle", () => {
    const graph = {
      nodes: [
        { id: "a", label: "", edges: ["b"] },
        { id: "b", label: "", edges: ["c", "a"] },
        { id: "c", label: "", edges: [] },
      ],
    };

    assert.deepEqual(tarjan(graph), [["a", "b"]]);
  });

  test("finds all cycles", () => {
    const graph = {
      nodes: [
        { id: "aa", label: "", edges: ["ba", "bb", "bc"] },
        { id: "ba", label: "", edges: ["ca", "cb"] },
        { id: "bb", label: "", edges: ["cc", "cd"] },
        { id: "bc", label: "", edges: ["ce", "cf"] },
        { id: "ca", label: "", edges: [] },
        { id: "cb", label: "", edges: ["cc"] }, // cycle
        { id: "cc", label: "", edges: ["cb"] }, // cycle
        { id: "cd", label: "", edges: ["aa"] }, // cycle
        { id: "ce", label: "", edges: [] },
        { id: "cf", label: "", edges: [] },
      ],
    };

    assert.deepEqual(tarjan(graph), [
      ["aa", "bb", "cd"],
      ["cb", "cc"],
    ]);
  });

  test("no cycle", () => {
    const graph = {
      nodes: [
        { id: "aa", label: "", edges: ["ba", "bb", "bc"] },
        { id: "ba", label: "", edges: ["ca", "cb"] },
        { id: "bb", label: "", edges: ["cc", "cd"] },
        { id: "bc", label: "", edges: ["ce", "cf"] },
        { id: "ca", label: "", edges: [] },
        { id: "cb", label: "", edges: [] },
        { id: "cc", label: "", edges: [] },
        { id: "cd", label: "", edges: [] },
        { id: "ce", label: "", edges: [] },
        { id: "cf", label: "", edges: [] },
      ],
    };

    assert.deepEqual(tarjan(graph), []);
  });

  describe("adjacencyList", () => {
    test("basic", () => {
      const graph = {
        nodes: [
          {
            id: "a",
            label: "a",
            edges: ["b"],
          },
          {
            id: "b",
            label: "b",
            edges: ["a"],
          },
        ],
      };

      assert.deepEqual(adjacencyList(graph)[0], {
        0: [1],
        1: [0],
      });
    });
  });
});
