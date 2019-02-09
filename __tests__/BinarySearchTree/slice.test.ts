import SortedCollection from "../../src/sorted-collection";
import BinarySearchTree from "../../src/sorted-collection/binary-search-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree empty slice nothing test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.slice();
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree empty slice 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.slice(0);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree empty slice 0, 1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.slice(0, 1);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice empty test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice();
  expect(tree.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  expect(tree.size()).toBe(10);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(0);
  expect(tree.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  expect(tree.size()).toBe(10);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice 0, 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(0, 0);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice 0, 5 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(0, 5);
  expect(tree.toArray()).toEqual([0, 1, 2, 3, 4]);
  expect(tree.size()).toBe(5);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice 5 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(5);
  expect(tree.toArray()).toEqual([5, 6, 7, 8, 9]);
  expect(tree.size()).toBe(5);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice 4 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(4);
  expect(tree.toArray()).toEqual([4, 5, 6, 7, 8, 9]);
  expect(tree.size()).toBe(6);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice -1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(-1);
  expect(tree.toArray()).toEqual([9]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice -4 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(-4);
  expect(tree.toArray()).toEqual([6, 7, 8, 9]);
  expect(tree.size()).toBe(4);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice -4, -1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(-4, -1);
  expect(tree.toArray()).toEqual([6, 7, 8]);
  expect(tree.size()).toBe(3);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice -8, -4 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(-8, -4);
  expect(tree.toArray()).toEqual([2, 3, 4, 5]);
  expect(tree.size()).toBe(4);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice 2, -4 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(2, -4);
  expect(tree.toArray()).toEqual([2, 3, 4, 5]);
  expect(tree.size()).toBe(4);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree add 6, 2, 1, 8, 5, 4, 0, 9, 7, 3 slice 0, 3 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([6, 2, 1, 8, 5, 4, 0, 9, 7, 3]).slice(0, 3);
  expect(tree.toArray()).toEqual([0, 1, 2]);
  expect(tree.size()).toBe(3);
  expect(tree.isEmpty()).toBe(false);
});
