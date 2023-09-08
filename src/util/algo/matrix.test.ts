import assert from "node:assert/strict";
import test, { describe } from "node:test";
import { add, multiply } from "./matrix";
import type { Matrix } from "./matrix";

describe("matrix", () => {
  describe("add", () => {
    test("basic", () => {
      const a: Matrix = {
        size: [2, 2],
        // prettier-ignore
        matrix: [
          1, 2,
          3, 4,
        ],
      };

      const b: Matrix = {
        size: [2, 2],
        // prettier-ignore
        matrix: [
          5, 6,
          7, 8
        ],
      };

      const expected = {
        size: [2, 2],
        // prettier-ignore
        matrix: [
           6,  8,
          10, 12,
        ],
      };

      assert.deepEqual(add(a, b), expected);
    });
  });

  describe("multiply", () => {
    test("same sized square matrices", () => {
      const a: Matrix = {
        size: [3, 3],
        // prettier-ignore
        matrix: [
          5, 7, 9,
          8, 2, 1,
          3, 5, 7,
        ],
      };

      const b: Matrix = {
        size: [3, 3],
        // prettier-ignore
        matrix: [
          5, 6, 8,
          1, 2, 3,
          5, 3, 7,
        ],
      };

      const expected = {
        size: [3, 3],
        // prettier-ignore
        matrix: [
          77, 71, 124,
          47, 55,  77,
          55, 49,  88,
        ],
      };

      assert.deepEqual(multiply(a, b), expected);
    });

    test("same sized square matrices", () => {
      const a: Matrix = {
        size: [3, 3],
        // prettier-ignore
        matrix: [
          5, 7, 9,
          8, 2, 1,
          3, 5, 7,
        ],
      };

      const b: Matrix = {
        size: [3, 3],
        // prettier-ignore
        matrix: [
          5, 6, 8,
          1, 2, 3,
          5, 3, 7,
        ],
      };

      const expected = {
        size: [3, 3],
        // prettier-ignore
        matrix: [
          77, 71, 124,
          47, 55,  77,
          55, 49,  88,
        ],
      };

      assert.deepEqual(multiply(a, b), expected);
    });

    test("variable sized matrices", () => {
      const a: Matrix = {
        size: [2, 3],
        // prettier-ignore
        matrix: [
          5, 7, 9,
          8, 2, 1,
        ],
      };

      const b: Matrix = {
        size: [3, 2],
        // prettier-ignore
        matrix: [
          5, 6,
          1, 2,
          5, 3,
        ],
      };

      const expected = {
        size: [2, 2],
        // prettier-ignore
        matrix: [
          77, 71,
          47, 55,
        ],
      };

      assert.deepEqual(multiply(a, b), expected);
    });

    test("variable sized matrices - large & small", () => {
      const a: Matrix = {
        size: [3, 3],
        // prettier-ignore
        matrix: [
          5, 7, 9,
          8, 2, 1,
          8, 2, 3,
        ],
      };

      const b: Matrix = {
        size: [3, 1],
        // prettier-ignore
        matrix: [
          2,
          2,
          2,
        ],
      };

      const expected = {
        size: [3, 1],
        // prettier-ignore
        matrix: [
          42,
          22,
          26
        ],
      };

      assert.deepEqual(multiply(a, b), expected);
    });

    // https://pi.math.cornell.edu/~mec/Winter2009/RalucaRemus/Lecture3/lecture3.html
    test("variable sized matrices - cornell pagerank example", () => {
      const a: Matrix = {
        size: [4, 4],
        // prettier-ignore
        matrix: [
          0,    0,   1, 0.5,
          0.33, 0,   0,   0,
          0.33, 0.5, 0, 0.5,
          0.33, 0.5, 0,   0,
        ],
      };

      const b: Matrix = {
        size: [4, 1],
        // prettier-ignore
        matrix: [
          0.25,
          0.25,
          0.25,
          0.25,
        ],
      };

      const expected = {
        size: [4, 1],
        // prettier-ignore
        matrix: [
          0.375,
          0.0825,
          0.3325,
          0.20750000000000002, // eh...
        ],
      };

      assert.deepEqual(multiply(a, b), expected);
    });

    test("handle missized matrices", () => {
      const a: Matrix = {
        size: [3, 2],
        // prettier-ignore
        matrix: [
          1, 1,
          1, 1,
          1, 1,
        ],
      };

      const b: Matrix = {
        size: [1, 2],
        // prettier-ignore
        matrix: [
          1, 1,
        ],
      };

      assert.throws(() => multiply(a, b));
    });
  });
});
