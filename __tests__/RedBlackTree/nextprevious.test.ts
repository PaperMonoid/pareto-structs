import validateProperties from "./validateProperties";
import SortedCollection from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty next 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  const e = tree.search(0).flatMap(element => tree.next(element));
  expect(e.orValue(null)).toBe(null);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
});

test("RedBlackTree empty previous 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  const e = tree.search(0).flatMap(element => tree.previous(element));
  expect(e.orValue(null)).toBe(null);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 next 2 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(2).flatMap(element => tree.next(element));
  expect(e.orValue(null)).toBe(3);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 next 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(0).flatMap(element => tree.next(element));
  expect(e.orValue(null)).toBe(1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 next -2 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(-2).flatMap(element => tree.next(element));
  expect(e.orValue(null)).toBe(-1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 next 3 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(3).flatMap(element => tree.next(element));
  expect(e.orValue(null)).toBe(null);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 next -3 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(-3).flatMap(element => tree.next(element));
  expect(e.orValue(null)).toBe(-2);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 previous 2 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(2).flatMap(element => tree.previous(element));
  expect(e.orValue(null)).toBe(1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 previous 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(0).flatMap(element => tree.previous(element));
  expect(e.orValue(null)).toBe(-1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 previous -2 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(-2).flatMap(element => tree.previous(element));
  expect(e.orValue(null)).toBe(-3);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 previous 3 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(3).flatMap(element => tree.previous(element));
  expect(e.orValue(null)).toBe(2);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 previous -3 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  const e = tree.search(-3).flatMap(element => tree.previous(element));
  expect(e.orValue(null)).toBe(null);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});
