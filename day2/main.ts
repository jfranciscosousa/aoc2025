import { readInputContent } from "../utils/files.ts";

function invalidId(id: bigint) {
  const idString = String(id);

  // If it's odd, the id is automatically valid
  if (idString.length % 2 !== 0) return false;

  const firstHalf = idString.slice(0, idString.length / 2);
  const secondHalf = idString.slice(idString.length / 2, idString.length);

  return firstHalf === secondHalf;
}

export async function part1(input: string) {
  const content = await readInputContent(input);
  const ranges = content.split(",").map((unparsedRange) => {
    const [start, end] = unparsedRange.split("-");

    return {
      start: BigInt(start),
      end: BigInt(end),
    };
  });
  const invalidRanges = ranges.reduce((memo, { start, end }) => {
    for (let id = start; id <= end; id++) {
      if (invalidId(id)) memo += id;
    }

    return memo;
  }, 0n);

  return invalidRanges;
}

function isRepeating(str: bigint): boolean {
  return /^(\d+)\1+$/.test(str.toString());
}

export async function part2(input: string) {
  const content = await readInputContent(input);
  const ranges = content.split(",").map((unparsedRange) => {
    const [start, end] = unparsedRange.split("-");

    return {
      start: BigInt(start),
      end: BigInt(end),
    };
  });
  const invalidRanges = ranges.reduce((memo, { start, end }) => {
    for (let id = start; id <= end; id++) {
      if (isRepeating(id)) memo += id;
    }

    return memo;
  }, 0n);

  return invalidRanges;
}
