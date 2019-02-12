import SortedCollection from "../../src/sorted-collection";
import BinarySearchTree from "../../src/sorted-collection/binary-search-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree empty listIterator test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  let iterator = tree.listIterator();
  expect(iterator.next()).toEqual({ value: undefined, done: true });
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree union 0 listIterator test", function() {
  let tree = BinarySearchTree.create<number>(asc).union([0]);
  let iterator = tree.listIterator();
  expect(iterator.next()).toEqual({ value: 0, done: false });
  expect(iterator.next()).toEqual({ value: undefined, done: true });
  expect(iterator.previous()).toEqual({ value: 0, done: false });
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree union 11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3 listIterator test", function() {
  let tree = BinarySearchTree.create<number>(asc);
  tree = tree.union([11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3]);
  expect(tree.toArray()).toEqual([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.size()).toBe(13);
  expect(tree.isEmpty()).toBe(false);
});
