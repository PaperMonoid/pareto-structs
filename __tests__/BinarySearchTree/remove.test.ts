import SortedCollection from "../../src/sorted-collection";
import BinarySearchTree from "../../src/sorted-collection/binary-search-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree empty remove nothing test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree add 0 remove nothing test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
});

test("BinarySearchTree add 0 remove 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree add 0, 1, -1 remove 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([-1, 1]);
  expect(tree.size()).toBe(2);
});

test("BinarySearchTree add 0, 1, -1 remove 1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  tree = tree.remove(1);
  expect(tree.toArray()).toEqual([-1, 0]);
  expect(tree.size()).toBe(2);
});

test("BinarySearchTree add 0, 1, -1 remove -1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([0, 1]);
  expect(tree.size()).toBe(2);
});

test("BinarySearchTree add 0, 2, -2, -1, 1 remove 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([-2, -1, 1, 2]);
  expect(tree.size()).toBe(4);
});

test("BinarySearchTree add 0, 2, -2, -1, 1 remove 1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(1);
  expect(tree.toArray()).toEqual([-2, -1, 0, 2]);
  expect(tree.size()).toBe(4);
});

test("BinarySearchTree add 0, 2, -2, -1, 1 remove -1 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([-2, 0, 1, 2]);
  expect(tree.size()).toBe(4);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 remove 0 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([-3, -2, -1, 1, 2, 3]);
  expect(tree.size()).toBe(6);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 remove 2 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(2);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 3]);
  expect(tree.size()).toBe(6);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 remove -2 test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(-2);
  expect(tree.toArray()).toEqual([-3, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(6);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 remove 0 desc test", function() {
  let tree = BinarySearchTree.create<number>(desc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([3, 2, 1, -1, -2, -3]);
  expect(tree.size()).toBe(6);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 remove undefined test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(undefined);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 remove null test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(null);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});
