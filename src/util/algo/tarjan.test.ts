import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { adjacencyList, tarjan } from "./tarjan";

describe("tarjan", () => {
  test("finds a small cycle", () => {
    const graph = {
      nodes: [
        { id: "a", edges: ["b"] },
        { id: "b", edges: ["c", "a"] },
        { id: "c", edges: [] },
      ],
    };

    assert.deepEqual(tarjan(graph), [["a", "b"]]);
  });

  test("finds all cycles", () => {
    const graph = {
      nodes: [
        { id: "aa", edges: ["ba", "bb", "bc"] },
        { id: "ba", edges: ["ca", "cb"] },
        { id: "bb", edges: ["cc", "cd"] },
        { id: "bc", edges: ["ce", "cf"] },
        { id: "ca", edges: [] },
        { id: "cb", edges: ["cc"] }, // cycle
        { id: "cc", edges: ["cb"] }, // cycle
        { id: "cd", edges: ["aa"] }, // cycle
        { id: "ce", edges: [] },
        { id: "cf", edges: [] },
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
        { id: "aa", edges: ["ba", "bb", "bc"] },
        { id: "ba", edges: ["ca", "cb"] },
        { id: "bb", edges: ["cc", "cd"] },
        { id: "bc", edges: ["ce", "cf"] },
        { id: "ca", edges: [] },
        { id: "cb", edges: [] },
        { id: "cc", edges: [] },
        { id: "cd", edges: [] },
        { id: "ce", edges: [] },
        { id: "cf", edges: [] },
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
            edges: ["b"],
          },
          {
            id: "b",
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
