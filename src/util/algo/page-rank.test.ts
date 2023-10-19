import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { pageRank } from "/src/util/algo/page-rank";

describe("pageRank", () => {
  test("cornell example", () => {
    const graph = {
      nodes: [
        { id: "a", edges: ["b", "c", "d"] },
        { id: "b", edges: ["c", "d"] },
        { id: "c", edges: ["a"] },
        { id: "d", edges: ["a", "c"] },
      ],
    };

    const result = pageRank(graph);

    assert.equal(result[0].pageRank, 0.38758680555555547);
    assert.equal(result[1].pageRank, 0.128858024691358);
    assert.equal(result[2].pageRank, 0.2902440200617283);
    assert.equal(result[3].pageRank, 0.19331114969135796);
  });

  test("dangling node", () => {
    const graph = {
      nodes: [
        { id: "a" },
        { id: "b", edges: ["a"] },
        { id: "c", edges: ["a", "b"] },
      ],
    };

    const result = pageRank(graph);

    assert.equal(result[0].pageRank, 0.5454271381959612);
    assert.equal(result[1].pageRank, 0.27273676664013485);
    assert.equal(result[2].pageRank, 0.1818360951639033);
  });

  // TODO: fix this
  test.skip("disconnected components", () => {
    const graph = {
      nodes: [
        { id: "a", edges: ["b"] },
        { id: "b", edges: ["a"] },

        { id: "c", edges: ["d", "e"] },
        { id: "d", edges: ["c", "e"] },
        { id: "e", edges: ["c", "d"] },
      ],
    };

    const result = pageRank(graph);

    assert.notEqual(result[0].pageRank, 0);
  });
});
