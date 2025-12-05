import { readInputLines } from "../utils/files.ts";

type Instruction = {
  direction: "L" | "R";
  amount: number;
};

async function parseInstructions(input: string): Promise<Instruction[]> {
  const lines = await readInputLines(input);

  return lines.map((line) => {
    const match = line.trim().match(/^([LR])(\d+)$/);

    if (!match) throw new Error("wrong_input");

    const dir = match[1] as "L" | "R";
    const amt = BigInt(match[2]);

    if (!BigInt.isFinite(amt) || amt < 0) throw new Error("wrong_input");

    return {
      direction: dir,
      amount: amt,
    };
  });
}

const DIAL_START = 50;

function mod100(n: number): number {
  return ((n % 100) + 100) % 100;
}

export async function part1(input: string) {
  const instructions = await parseInstructions(input);
  let dial = DIAL_START;

  function moveDial(instruction: Instruction): number {
    const step =
      instruction.direction === "L" ? -instruction.amount : instruction.amount;

    dial = mod100(dial + step);

    return dial;
  }

  const dials = instructions.map(moveDial);
  const zerosAtEnd = dials.filter((d) => d === 0).length;

  return zerosAtEnd;
}

export async function part2(input: string) {
  const instructions = await parseInstructions(input);
  let dial = DIAL_START;

  let zeros = 0;

  for (const instruction of instructions) {
    const { direction, amount } = instruction;

    if (direction === "R") {
      // Count every time dial hits 0 while moving right
      zeros += Math.floor((dial + amount) / 100);

      // Update dial
      dial = mod100(dial + amount);
    } else {
      // Count every time dial hits 0 while moving left
      const dPrime = (100 - dial) % 100;
      zeros += Math.floor((dPrime + amount) / 100);

      dial = mod100(dial - amount);
    }
  }

  return zeros;
}
