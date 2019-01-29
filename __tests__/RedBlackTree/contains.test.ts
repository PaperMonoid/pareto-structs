import validateProperties from "./validateProperties";
import SortedCollection from "../../src/sorted-collection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty contains null test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  expect(tree.contains(null)).toBe(false);
});

test("RedBlackTree empty contains undefined test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  expect(tree.contains(undefined)).toBe(false);
});

test("RedBlackTree empty contains 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  expect(tree.contains(0)).toBe(false);
});

test("RedBlackTree empty contains 1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  expect(tree.contains(1)).toBe(false);
});

test("RedBlackTree add 0 contains null test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(null)).toBe(false);
});

test("RedBlackTree add 0 contains undefined test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(undefined)).toBe(false);
});

test("RedBlackTree add 0 contains 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(0)).toBe(true);
});

test("RedBlackTree add 0 contains 1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(1)).toBe(false);
});

test("RedBlackTree add 0 remove 0 contains 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.remove(0);
  expect(tree.contains(0)).toBe(false);
});

test("RedBlackTree add 0, 1, 2, 3 contains 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  expect(tree.contains(0)).toBe(true);
});

test("RedBlackTree add 0, 1, 2, 3 contains 1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  expect(tree.contains(1)).toBe(true);
});

test("RedBlackTree add 0, 1, 2, 3 remove 0 contains 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  tree = tree.remove(0);
  expect(tree.contains(0)).toBe(false);
});

test("RedBlackTree add 0, 1, 2, 3 remove 1 contains 1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  tree = tree.remove(1);
  expect(tree.contains(1)).toBe(false);
});
