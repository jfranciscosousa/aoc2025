import { assertEquals } from "@std/assert";
import { part1, part2 } from "./main.ts";

Deno.test("day4 part1", async () => {
  const exampleResult = await part1("./day4/example.txt");
  const realResult = await part1("./day4/input.txt");

  assertEquals(exampleResult, 13);
  assertEquals(realResult, 1376);
});

Deno.test("day4 part2", async () => {
  const exampleResult = await part2("./day4/example.txt");
  const realResult = await part2("./day4/input.txt");

  assertEquals(exampleResult, 43);
  assertEquals(realResult, 8587);
});
