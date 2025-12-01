import { assertEquals } from "@std/assert";
import { part1, part2 } from "./main.ts";

Deno.test("day1 part1", async () => {
  const exampleResult = await part1("./day1/example.txt");
  const realResult = await part1("./day1/input.txt");

  assertEquals(exampleResult, 3);
  assertEquals(realResult, 1052);
});

Deno.test("day1 part2", async () => {
  const exampleResult = await part2("./day1/example.txt");
  const realResult = await part2("./day1/input.txt");

  assertEquals(exampleResult, 6);
  assertEquals(realResult, 6295);
});
