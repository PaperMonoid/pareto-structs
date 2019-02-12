import validateProperties from "./validateProperties";
import SortedCollection from "../../src/sorted-collection";
import RedBlackTree from "../../src/sorted-collection/red-black-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty reverse test", function() {
  let tree = RedBlackTree.create<number>(asc);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0 reverse test", function() {
  let tree = RedBlackTree.create<number>(asc);
  tree = tree.reverse();
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 1, -1 reverse test", function() {
  let tree = RedBlackTree.create<number>(asc);
  tree = tree.reverse();
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([1, 0, -1]);
  expect(tree.size()).toBe(3);
  validateProperties<number>(tree);
});

test("RedBlackTree add -1, 0, 1 reverse test", function() {
  let tree = RedBlackTree.create<number>(asc);
  tree = tree.reverse();
  tree = tree.add(-1);
  tree = tree.add(0);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([1, 0, -1]);
  expect(tree.size()).toBe(3);
  validateProperties<number>(tree);
});

test("RedBlackTree add 1, 0, -1 reverse test", function() {
  let tree = RedBlackTree.create<number>(asc);
  tree = tree.reverse();
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([1, 0, -1]);
  expect(tree.size()).toBe(3);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, -1, 1 reverse test", function() {
  let tree = RedBlackTree.create<number>(asc);
  tree = tree.reverse();
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([2, 1, 0, -1, -2]);
  expect(tree.size()).toBe(5);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 reverse test", function() {
  let tree = RedBlackTree.create<number>(asc);
  tree = tree.reverse();
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([3, 2, 1, 0, -1, -2, -3]);
  expect(tree.size()).toBe(7);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 desc  reverse test", function() {
  let tree = RedBlackTree.create<number>(desc);
  tree = tree.reverse();
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 desc  reverse test", function() {
  let tree = RedBlackTree.create<number>(desc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.reverse();
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 desc  reverse test", function() {
  let tree = RedBlackTree.create<number>(desc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.reverse();
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 desc  reverse test", function() {
  let tree = RedBlackTree.create<number>(desc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.reverse();
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 desc reverse test", function() {
  let tree = RedBlackTree.create<number>(desc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.reverse();
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.reverse();
  expect(tree.size()).toBe(7);
  expect(tree.toArray()).toEqual([3, 2, 1, 0, -1, -2, -3]);
  validateProperties<number>(tree);
});

test("RedBlackTree union 2, 3, 1, 0, 4, 5 stateful filter", function() {
  let tree = RedBlackTree.create<number>(asc).union([2, 3, 1, 0, 4, 5]);
  let state = 0;
  tree = tree.reverse().filter(element => state++ < 3);
  expect(tree.size()).toBe(3);
  expect(tree.toArray()).toEqual([5, 4, 3]);
});

test("RedBlackTree union 2, 3, 1, 0, 4, 5 map", function() {
  let tree = RedBlackTree.create<number>(asc).union([2, 3, 1, 0, 4, 5]);
  let last = null;
  tree = tree
    .reverse()
    .map(element => (last = element * 2), asc)
    .reverse();
  expect(last).toBe(0);
  expect(tree.size()).toBe(6);
  expect(tree.toArray()).toEqual([10, 8, 6, 4, 2, 0]);
});

test("RedBlackTree union 2, 3, 1, 0, 4, 5 flatMap", function() {
  let tree = RedBlackTree.create<number>(asc).union([2, 3, 1, 0, 4, 5]);
  let last = null;
  tree = tree
    .reverse()
    .flatMap(element => (last = [element, element + 1]), asc)
    .reverse();
  expect(last).toEqual([0, 1]);
  expect(tree.size()).toBe(12);
  expect(tree.toArray()).toEqual([6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 0]);
});

test("RedBlackTree union 2, 3, 1, 4, 5 reduce", function() {
  let tree = RedBlackTree.create<number>(asc).union([2, 3, 1, 4, 5]);
  let result = tree.reverse().reduce(1, (a, b) => b + a * b);
  expect(result).toBe(273);
});
