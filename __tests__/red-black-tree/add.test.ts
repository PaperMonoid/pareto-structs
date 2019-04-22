import MultiMap from "../../src/multimap";
import RedBlackTree from "../../src/multimap/red-black-tree";
import validateProperties from "./validateProperties";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  expect(tree.values()).toEqual([]);
  expect(tree.size()).toBe(0);
  validateProperties(tree);
});

test("RedBlackTree insert (0, 0) test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  expect(tree.entries()).toEqual([[0, 0]]);
  expect(tree.size()).toBe(1);
  validateProperties(tree);
});

test("RedBlackTree insert (0, 0), (-1, 0) test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(-1, 0);
  expect(tree.entries()).toEqual([[-1, 0], [0, 0]]);
  expect(tree.size()).toBe(2);
  validateProperties(tree);
});

test("RedBlackTree insert (0, 0), (-1, 0), (1, 0) test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(-1, 0);
  tree = tree.put(1, 0);
  expect(tree.entries()).toEqual([[-1, 0], [0, 0], [1, 0]]);
  expect(tree.size()).toBe(3);
  validateProperties(tree);
});

test("RedBlackTree insert (0, 0), (0, 1), (0, -1) test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(0, 1);
  tree = tree.put(0, -1);
  expect(tree.entries()).toEqual([[0, 0], [0, 1], [0, -1]]);
  expect(tree.size()).toBe(3);
  validateProperties(tree);
});

test("RedBlackTree inserts test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
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
  validateProperties(tree);
});
