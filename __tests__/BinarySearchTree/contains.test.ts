import SortedCollection from "../../src/sorted-collection";
import BinarySearchTree from "../../src/sorted-collection/binary-search-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree empty contains null test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  expect(tree.contains(null)).toBe(false);
});

test("BinarySearchTree empty contains undefined test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  expect(tree.contains(undefined)).toBe(false);
});

test("BinarySearchTree empty contains 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  expect(tree.contains(0)).toBe(false);
});

test("BinarySearchTree empty contains 1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  expect(tree.contains(1)).toBe(false);
});

test("BinarySearchTree add 0 contains null test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(null)).toBe(false);
});

test("BinarySearchTree add 0 contains undefined test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(undefined)).toBe(false);
});

test("BinarySearchTree add 0 contains 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(0)).toBe(true);
});

test("BinarySearchTree add 0 contains 1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  expect(tree.contains(1)).toBe(false);
});

test("BinarySearchTree add 0 remove 0 contains 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.remove(0);
  expect(tree.contains(0)).toBe(false);
});

test("BinarySearchTree add 0, 1, 2, 3 contains 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  expect(tree.contains(0)).toBe(true);
});

test("BinarySearchTree add 0, 1, 2, 3 contains 1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  expect(tree.contains(1)).toBe(true);
});

test("BinarySearchTree add 0, 1, 2, 3 remove 0 contains 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  tree = tree.remove(0);
  expect(tree.contains(0)).toBe(false);
});

test("BinarySearchTree add 0, 1, 2, 3 remove 1 contains 1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([0, 1, 2, 3]);
  tree = tree.remove(1);
  expect(tree.contains(1)).toBe(false);
});
