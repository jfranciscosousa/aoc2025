import { assertEquals } from "@std/assert";
import { part1, part2 } from "./main.ts";

Deno.test("day6 part1", async () => {
  const exampleResult = await part1("./day6/example.txt");
  const realResult = await part1("./day6/input.txt");

  assertEquals(exampleResult, 4277556n);
  assertEquals(realResult, 3525371263915n);
});

Deno.test("day6 part2", async () => {
  const exampleResult = await part2("./day6/example.txt");
  const realResult = await part2("./day6/input.txt");

  assertEquals(exampleResult, 3263827n);
  assertEquals(realResult, 6846480843636n);
});
