import { MultiMap } from "../../src/multimap";
import { ParetoStruct, Frontier } from "../../src";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

function deepEq(first: number[], second: number[]) {
  for (let i in first) {
    if (first[i] != second[i]) {
      return false;
    }
  }
  return true;
}

function frontiers(frontier) {
  return [
    frontier.optimals.values(),
    frontier.dimentions.map(dimention => dimention.values())
  ];
}

test("ParetoStruct remove empty test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc], deepEq);
  pareto = pareto.remove([0, 0], [0, 0]);
  expect(pareto.frontiers.entries()).toEqual([]);
});

test("ParetoStruct remove only value test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc], deepEq);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.remove([0, 0], [0, 0]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([]);
});

test("ParetoStruct put 2 remove 1 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc], deepEq);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.remove([0, 1], [0, 1]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]]
  ]);
});

test("ParetoStruct put 3 remove 1 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc], deepEq);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.remove([0, 1], [0, 1]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[1, 0]], [[], []]]
  ]);
});

test("ParetoStruct put 4 values remove 1 test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc], deepEq);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.remove([0, 1], [0, 1]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[1, 0]], [[], []]],
    [[[3, 0]], [[], []]]
  ]);
});

test("ParetoStruct put 5 values removeall test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc], deepEq);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.put([2, 0], [2, 0]);
  pareto = pareto.removeAll([0, 1]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]]
  ]);
});

test("ParetoStruct put 9 and 1 in middle and removeall 1 test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc], deepEq);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.put([2, 0], [2, 0]);
  pareto = pareto.put([2, 5], [2, 5]);
  pareto = pareto.put([1, 6], [1, 6]);
  pareto = pareto.put([-1, 4], [-1, 4]);
  pareto = pareto.put([-1, -1], [-1, -1]);
  pareto = pareto.put([1, 3], [1, 3]);
  pareto = pareto.removeAll([-1, -1]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0]], []]],
    [[[1, 3]], [[[2, 0]], [[-1, 4]]]],
    [[[2, 5]], [[[3, 0]], [[1, 6]]]]
  ]);
});
