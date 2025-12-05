import { assertEquals } from "@std/assert";
import { part1, part2 } from "./main.ts";

Deno.test("day2 part1", async () => {
  const exampleResult = await part1("./day2/example.txt");
  const realResult = await part1("./day2/input.txt");

  assertEquals(exampleResult, 1227775554n);
  assertEquals(realResult, 44854383294n);
});

Deno.test("day2 part2", async () => {
  const exampleResult = await part2("./day2/example.txt");
  const realResult = await part2("./day2/input.txt");

  assertEquals(exampleResult, 4174379265n);
  assertEquals(realResult, 55647141923n);
});
