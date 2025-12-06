import { assertEquals } from "@std/assert";
import { part1, part2 } from "./main.ts";

Deno.test("day5 part1", async () => {
  const exampleResult = await part1("./day5/example.txt");
  const realResult = await part1("./day5/input.txt");

  assertEquals(exampleResult, 3n);
  assertEquals(realResult, 517n);
});

Deno.test("day5 part2", async () => {
  const exampleResult = await part2("./day5/example.txt");
  const realResult = await part2("./day5/input.txt");

  assertEquals(exampleResult, 14n);
  assertEquals(realResult, 336173027056994n);
});
