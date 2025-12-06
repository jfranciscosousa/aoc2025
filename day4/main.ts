import { readInputLines, readInputMatrix } from "../utils/files.ts";
import { Matrix } from "../utils/matrix.ts";

const PAPER = "@";

function parseInput(input: string) {
  return readInputMatrix(input, (s) => s);
}

export async function part1(input: string) {
  const matrix = await parseInput(input);
  let result = 0;

  for (const [value, y, x] of matrix) {
    if (value !== PAPER) continue;

    const adjacents = Array.from(matrix.adjacents(y, x)).map(([v]) => v);
    const stacksOfPaper = adjacents.filter((v) => v === PAPER).length;

    if (stacksOfPaper < 4) result++;
  }

  return result;
}

function removePaper(matrix: Matrix<string>, alreadyDeleted = 0) {
  const positions: [number, number][] = [];

  for (const [value, y, x] of matrix) {
    if (value !== PAPER) continue;

    const adjacents = Array.from(matrix.adjacents(y, x)).map(([v]) => v);
    const stacksOfPaper = adjacents.filter((v) => v === PAPER).length;

    if (stacksOfPaper < 4) positions.push([y, x]);
  }

  if (!positions.length) return alreadyDeleted;

  positions.forEach(([y, x]) => matrix.set(y, x, "."));

  return removePaper(matrix, alreadyDeleted + positions.length);
}

export async function part2(input: string) {
  const matrix = await parseInput(input);

  return removePaper(matrix);
}
