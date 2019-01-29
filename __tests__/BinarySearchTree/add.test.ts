import SortedCollection from "../../src/sorted-collection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree empty test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(asc);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
});

test("BinarySearchTree add 0 test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(asc);
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
});

test("BinarySearchTree add 0, 1, -1 test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([-1, 0, 1]);
  expect(tree.size()).toBe(3);
});

test("BinarySearchTree add -1, 0, 1 test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(asc);
  tree = tree.add(-1);
  tree = tree.add(0);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-1, 0, 1]);
  expect(tree.size()).toBe(3);
});

test("BinarySearchTree add 1, 0, -1 test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(asc);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([-1, 0, 1]);
  expect(tree.size()).toBe(3);
});

test("BinarySearchTree add 0, 2, -2, -1, 1 test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-2, -1, 0, 1, 2]);
  expect(tree.size()).toBe(5);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  expect(tree.size()).toBe(7);
});

test("BinarySearchTree add 0, 2, -2, 3, -3, -1, 1 desc test", function() {
  let tree = SortedCollection.asBinarySearchTree<number>(desc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(3);
  tree = tree.add(-3);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([3, 2, 1, 0, -1, -2, -3]);
  expect(tree.size()).toBe(7);
});
