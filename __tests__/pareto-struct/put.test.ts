import { MultiMap } from "../../src/multimap";
import { ParetoStruct, Frontier } from "../../src";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

function frontiers(frontier) {
  return [
    frontier.optimals.values(),
    frontier.dimentions.map(dimention => dimention.values())
  ];
}

test("ParetoStruct empty test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  expect(pareto.frontiers.entries()).toEqual([]);
});

test("ParetoStruct put root test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]]
  ]);
});

test("ParetoStruct put 2 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[], []]]
  ]);
});

test("ParetoStruct put 3 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0]], []]]
  ]);
});

test("ParetoStruct put 4 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0], [3, 0]], []]]
  ]);
});

test("ParetoStruct put 5 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.put([2, 0], [2, 0]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0], [2, 0], [3, 0]], []]]
  ]);
});

test("ParetoStruct put 6 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.put([2, 0], [2, 0]);
  pareto = pareto.put([0, 5], [0, 5]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[], []]],
    [[[0, 5]], [[[1, 0], [2, 0], [3, 0]], []]]
  ]);
});

test("ParetoStruct put 6 other values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.put([2, 0], [2, 0]);
  pareto = pareto.put([2, 5], [2, 5]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0], [2, 0]], []]],
    [[[2, 5]], [[[3, 0]], []]]
  ]);
});

test("ParetoStruct put 8 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.put([2, 0], [2, 0]);
  pareto = pareto.put([2, 5], [2, 5]);
  pareto = pareto.put([1, 6], [1, 6]);
  pareto = pareto.put([-1, 4], [-1, 4]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0], [2, 0]], [[-1, 4]]]],
    [[[2, 5]], [[[3, 0]], [[1, 6]]]]
  ]);
});

test("ParetoStruct put 9 values test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
  pareto = pareto.put([0, 0], [0, 0]);
  pareto = pareto.put([0, 1], [0, 1]);
  pareto = pareto.put([1, 0], [1, 0]);
  pareto = pareto.put([3, 0], [3, 0]);
  pareto = pareto.put([2, 0], [2, 0]);
  pareto = pareto.put([2, 5], [2, 5]);
  pareto = pareto.put([1, 6], [1, 6]);
  pareto = pareto.put([-1, 4], [-1, 4]);
  pareto = pareto.put([-1, -1], [-1, -1]);
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[-1, -1]], [[], []]],
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0], [2, 0]], [[-1, 4]]]],
    [[[2, 5]], [[[3, 0]], [[1, 6]]]]
  ]);
});

test("ParetoStruct put 9 and 1 in middle test", function() {
  let pareto = new ParetoStruct<number, number[]>([asc, asc]);
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
  expect(pareto.frontiers.values().map(frontiers)).toEqual([
    [[[-1, -1]], [[], []]],
    [[[0, 0]], [[], []]],
    [[[0, 1]], [[[1, 0]], []]],
    [[[1, 3]], [[[2, 0]], [[-1, 4]]]],
    [[[2, 5]], [[[3, 0]], [[1, 6]]]]
  ]);
});
