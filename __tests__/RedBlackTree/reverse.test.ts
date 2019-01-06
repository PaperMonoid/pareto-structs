import validateProperties from "./validateProperties";
import SortedCollection from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty reverse test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0 reverse test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.reverse();
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 1, -1 reverse test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.reverse();
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([1, 0, -1]);
  expect(tree.size()).toBe(3);
  validateProperties<number>(tree);
});

test("RedBlackTree add -1, 0, 1 reverse test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.reverse();
  tree = tree.add(-1);
  tree = tree.add(0);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([1, 0, -1]);
  expect(tree.size()).toBe(3);
  validateProperties<number>(tree);
});

test("RedBlackTree add 1, 0, -1 reverse test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.reverse();
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([1, 0, -1]);
  expect(tree.size()).toBe(3);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, -1, 1 reverse test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
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
  let tree = SortedCollection.asRedBlackTree<number>(asc);
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
  let tree = SortedCollection.asRedBlackTree<number>(desc);
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
  let tree = SortedCollection.asRedBlackTree<number>(desc);
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
  let tree = SortedCollection.asRedBlackTree<number>(desc);
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
  let tree = SortedCollection.asRedBlackTree<number>(desc);
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

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 desc  reverse test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(desc);
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
