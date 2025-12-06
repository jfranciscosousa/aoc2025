import { readInputContent } from "../utils/files.ts";

const RANGE_REGEX = /^(\d+)-(\d+)$/gm;
const ID_REGEX = /^(\d+)$/gm;

export async function part1(input: string) {
  const content = await readInputContent(input);
  const ranges = Array.from(content.matchAll(RANGE_REGEX)).map((match) => {
    const [, start, end] = match;

    return [BigInt(start), BigInt(end)];
  });
  const ids = Array.from(content.matchAll(ID_REGEX)).map((match) => {
    const [, id] = match;

    return BigInt(id);
  });
  const freshIngredients = ids.reduce((memo, id) => {
    if (ranges.some((range) => id >= range[0] && id <= range[1])) {
      memo++;
    }

    return memo;
  }, 0n);

  return freshIngredients;
}

export async function part2(input: string) {
  const content = await readInputContent(input);
  const ranges = Array.from(content.matchAll(RANGE_REGEX)).map((match) => {
    const [, start, end] = match;
    return [BigInt(start), BigInt(end)] as [bigint, bigint];
  });

  // Sort ranges by start position
  ranges.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));

  // Merge overlapping ranges
  const merged: [bigint, bigint][] = [];

  for (const [start, end] of ranges) {
    if (merged.length === 0) {
      merged.push([start, end]);
    } else {
      const last = merged[merged.length - 1];

      // If current range overlaps or touches the last merged range
      if (start <= last[1] + 1n) {
        // Extend the last range
        last[1] = last[1] > end ? last[1] : end;
      } else {
        // No overlap, add new range
        merged.push([start, end]);
      }
    }
  }

  // Count total numbers across all merged ranges
  return merged.reduce((sum, [start, end]) => sum + (end - start + 1n), 0n);
}
