import { chain, max } from "lodash";
import { readInputLines } from "../utils/files.ts";

function findLargestJoltage(bank: string[]) {
  const permutations = new Set<number>();

  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      permutations.add(Number(bank[i] + bank[j]));
    }
  }

  return max(Array.from(permutations));
}

export async function part1(input: string) {
  return chain(await readInputLines(input))
    .map((l) => l.split(""))
    .map(findLargestJoltage)
    .sum()
    .value();
}

const digitcount = 12;

function findLargestJoltageOnPart2(digits: string[]): bigint {
  const choose = digitcount;
  const n = digits.length;
  const result: string[] = [];

  let startPos = 0;

  for (let picked = 0; picked < choose; picked++) {
    // How many more digits do we need after this one?
    const remaining = choose - picked - 1;
    // We must leave enough digits to pick the rest
    const canSearchUntil = n - remaining;

    // Find the largest digit in the valid range
    let maxDigit = '0';
    let maxPos = startPos;

    for (let i = startPos; i < canSearchUntil; i++) {
      if (digits[i] > maxDigit) {
        maxDigit = digits[i];
        maxPos = i;
      }
    }

    result.push(maxDigit);
    startPos = maxPos + 1;
  }

  return BigInt(result.join(''));
}

export async function part2(input: string) {
  return chain(await readInputLines(input))
    .map((l) => l.split(""))
    .map(findLargestJoltageOnPart2)
    .reduce((prev, curr) => prev + curr, 0n)
    .value();
}
