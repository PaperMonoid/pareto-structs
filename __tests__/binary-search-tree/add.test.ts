import MultiMap from "../../src/collection/multimap";
import BinarySearchTree from "../../src/collection/multimap/binary-search-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree empty test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  expect(tree.values()).toEqual([]);
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree insert (0, 0) test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  expect(tree.entries()).toEqual([[0, 0]]);
  expect(tree.size()).toBe(1);
});

test("BinarySearchTree insert (0, 0), (-1, 0) test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(-1, 0);
  expect(tree.entries()).toEqual([[-1, 0], [0, 0]]);
  expect(tree.size()).toBe(2);
});

test("BinarySearchTree insert (0, 0), (-1, 0), (1, 0) test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(-1, 0);
  tree = tree.put(1, 0);
  expect(tree.entries()).toEqual([[-1, 0], [0, 0], [1, 0]]);
  expect(tree.size()).toBe(3);
});

test("BinarySearchTree insert (0, 0), (0, 1), (0, -1) test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(0, 1);
  tree = tree.put(0, -1);
  expect(tree.entries()).toEqual([[0, 0], [0, 1], [0, -1]]);
  expect(tree.size()).toBe(3);
});

test("BinarySearchTree inserts test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(0, 1);
  tree = tree.put(0, -1);
  tree = tree.put(1, 1);
  tree = tree.put(1, 0);
  tree = tree.put(1, -1);
  tree = tree.put(-1, 0);
  tree = tree.put(-3, 0);
  tree = tree.put(2, 0);
  tree = tree.put(-2, 0);
  expect(tree.entries()).toEqual([
    [-3, 0],
    [-2, 0],
    [-1, 0],
    [0, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, 0],
    [1, -1],
    [2, 0]
  ]);
  expect(tree.size()).toBe(10);
});
