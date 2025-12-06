import { assertEquals } from "@std/assert";
import { part1, part2 } from "./main.ts";

Deno.test("day3 part1", async () => {
  const exampleResult = await part1("./day3/example.txt");
  const realResult = await part1("./day3/input.txt");

  assertEquals(exampleResult, 357);
  assertEquals(realResult, 17142);
});

Deno.test("day3 part2", async () => {
  const exampleResult = await part2("./day3/example.txt");
  const realResult = await part2("./day3/input.txt");

  assertEquals(exampleResult, 3121910778619n);
  assertEquals(realResult, 169935154100102n);
});
