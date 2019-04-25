import { MultiMap, BinarySearchTree } from "../../src/multimap";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree remove empty test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.remove(0, 0);
  tree = tree.remove(1, 0);
  tree = tree.remove(-1, 0);
  expect(tree.entries()).toEqual([]);
  expect(tree.isEmpty()).toBeTruthy();
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree remove only value test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.remove(0, 0);
  expect(tree.entries()).toEqual([]);
  expect(tree.isEmpty()).toBeTruthy();
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree remove one value test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(0, 1);
  tree = tree.remove(0, 0);
  expect(tree.entries()).toEqual([[0, 1]]);
  expect(tree.isEmpty()).toBeFalsy();
  expect(tree.size()).toBe(1);
});

test("BinarySearchTree remove many values test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.put(3, 0);
  tree = tree.put(0, 0);
  tree = tree.put(0, 1);
  tree = tree.put(0, 2);
  tree = tree.put(-1, 0);
  tree = tree.put(1, 0);
  tree = tree.put(2, 0);
  tree = tree.remove(0, 1);
  tree = tree.remove(0, 3);
  tree = tree.remove(3, 0);
  tree = tree.remove(-1, 0);
  expect(tree.entries()).toEqual([[0, 0], [0, 2], [1, 0], [2, 0]]);
  expect(tree.isEmpty()).toBeFalsy();
  expect(tree.size()).toBe(4);
});

test("BinarySearchTree removeAll empty test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.removeAll(0);
  expect(tree.entries()).toEqual([]);
  expect(tree.isEmpty()).toBeTruthy();
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree removeAll only test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.putAll(0, [1, 2, 3]);
  tree = tree.removeAll(0);
  expect(tree.entries()).toEqual([]);
  expect(tree.isEmpty()).toBeTruthy();
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree removeAll one test", function() {
  let tree = BinarySearchTree.create<number, number>(asc);
  tree = tree.putAll(0, [1, 2, 3]);
  tree = tree.putAll(1, [1, 2, 3]);
  tree = tree.putAll(2, [1, 2, 3]);
  tree = tree.removeAll(0);
  expect(tree.entries()).toEqual([
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3]
  ]);
  expect(tree.isEmpty()).toBeFalsy();
  expect(tree.size()).toBe(6);
});
