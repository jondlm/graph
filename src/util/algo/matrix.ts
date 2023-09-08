export type Matrix = {
  size: [number, number];
  matrix: number[];
};

function isSameSize(a: Matrix, b: Matrix): void {
  if (a.size[0] !== b.size[0] || a.size[1] !== b.size[1]) {
    throw new Error("`a` and `b` must be of the same size.");
  }
}

export function add(a: Matrix, b: Matrix): Matrix {
  isSameSize(a, b);

  // Preallocate the result matrix for better performance
  const resultMatrix = new Array(a.matrix.length);

  for (let i = 0; i < a.matrix.length; i++) {
    resultMatrix[i] = a.matrix[i] + b.matrix[i];
  }

  return {
    size: [a.size[0], a.size[1]],
    matrix: resultMatrix,
  };
}

export function subtract(a: Matrix, b: Matrix): Matrix {
  isSameSize(a, b);

  // Preallocate the result matrix for better performance
  const resultMatrix = new Array(a.matrix.length);

  for (let i = 0; i < a.matrix.length; i++) {
    resultMatrix[i] = a.matrix[i] - b.matrix[i];
  }

  return {
    size: [a.size[0], a.size[1]],
    matrix: resultMatrix,
  };
}

function cellIndex(row: number, col: number, numberOfCols: number) {
  return row * numberOfCols + col;
}

// Roughly O(n^3)
export function multiply(a: Matrix, b: Matrix): Matrix {
  // Invartiant: number of columns on the first matrix must equal the number of
  // rows on the second.
  //
  // This image helps illustrate why:
  // https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Matrix_multiplication_diagram_2.svg/626px-Matrix_multiplication_diagram_2.svg.png
  if (a.size[1] !== b.size[0]) {
    throw new Error(
      "Matrices sizes are invalid. Number of columns in `a` must equal the number of rows in `b`."
    );
  }

  const size = a.size[1];
  const rows = a.size[0];
  const cols = b.size[1];

  // Preallocate the result matrix for better performance. The resulting matrix
  // will have the same number of rows as `a` and columns as `b`.
  const result: number[] = new Array(rows * cols);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;

      // Calculate the dot product of the row from `a` and the column from `b`.
      let n = 0;
      for (let s = 0; s < size; s++) {
        const first = a.matrix[cellIndex(row, s, size)];
        const second = b.matrix[cellIndex(s, col, cols)];
        n += first * second;
      }
      result[index] = n;
    }
  }

  return {
    // The result has the number of rows from `a` and the # of cols from `b`
    size: [a.size[0], b.size[1]],
    matrix: result,
  };
}
