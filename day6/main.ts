import { last, sum } from "lodash";
import { readInputContent } from "../utils/files.ts";
import { Matrix } from "../utils/matrix.ts";

type Operation = "*" | "+";

function applyOperation(numbers: bigint[], operation: Operation): bigint {
  return numbers.reduce((prev, n, currentIndex) => {
    if (operation === "*") {
      if (prev === 0n && currentIndex === 0) return n;
      return prev * n;
    }
    if (operation === "+") return prev + n;
    return prev;
  }, 0n);
}

async function buildMatrix(input: string) {
  const content = await readInputContent(input);
  const normalized = content.trim().replace(/[ ]+/g, " ");

  return new Matrix<string>(
    normalized.split("\n").map((line) => line.trim().split(" "))
  );
}

export async function part1(input: string) {
  const matrix = await buildMatrix(input);
  let total = 0n;

  for (let x = 0; x < matrix.width; x++) {
    const numbers: bigint[] = [];
    let operation: Operation | null = null;

    for (const [value] of matrix.column(x)) {
      if (/\d/.test(value)) {
        numbers.push(BigInt(value));
      }
      if (value === "*" || value === "+") {
        operation = value;
      }
    }

    if (!operation) throw new Error("lacking operator");

    total += applyOperation(numbers, operation);
  }

  return total;
}

export async function part2(input: string) {
  const lines = (await Deno.readTextFile(input)).split("\n");
  const operatorLine = last(lines) ?? "";
  const dataRows = lines.slice(0, -1);

  const columnWidths: number[] = [];
  let spacesCount = 0;

  operatorLine.split("").forEach((char, index) => {
    if (char === " ") {
      spacesCount++;
    } else {
      if (index > 0) {
        columnWidths.push(spacesCount);
      }
      spacesCount = 0;
    }
  });
  columnWidths.push(spacesCount + 1);

  const operators = operatorLine.replaceAll(" ", "").split("") as Operation[];
  let total = 0n;

  columnWidths.forEach((width, colIndex) => {
    const startPos = sum(columnWidths.slice(0, colIndex)) + colIndex;
    const columnData: string[][] = [];

    dataRows.forEach((row) => {
      columnData.push(
        row
          .slice(startPos, width + startPos)
          .replaceAll(" ", ".")
          .split("")
      );
    });

    const numbers: bigint[] = [];
    for (let digitPos = width - 1; digitPos >= 0; digitPos--) {
      let numberStr = "";

      columnData.forEach((row) => {
        if (row[digitPos]?.match(/\d+/)) {
          numberStr += row[digitPos];
        }
      });

      numbers.push(BigInt(numberStr));
    }

    total += applyOperation(numbers, operators[colIndex]);
  });

  return total;
}
