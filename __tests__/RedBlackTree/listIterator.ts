import SortedCollection from "../../src/sorted-collection";
import RedBlackTree from "../../src/sorted-collection/binary-search-tree";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty listIterator test", function() {
  let tree = RedBlackTree.create<number>(asc);
  let iterator = tree.listIterator();
  expect(iterator.next()).toEqual({ value: undefined, done: true });
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("RedBlackTree union 0 listIterator test", function() {
  let tree = RedBlackTree.create<number>(asc).union([0]);
  let iterator = tree.listIterator();
  expect(iterator.next()).toEqual({ value: 0, done: false });
  expect(iterator.next()).toEqual({ value: undefined, done: true });
  expect(iterator.previous()).toEqual({ value: 0, done: false });
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(iterator.next()).toEqual({ value: 0, done: false });
  expect(iterator.next()).toEqual({ value: undefined, done: true });
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
});

test("RedBlackTree union 2, 1, 0 listIterator test", function() {
  let tree = RedBlackTree.create<number>(asc).union([2, 1, 0]);
  let iterator = tree.listIterator();
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(iterator.next()).toEqual({ value: 0, done: false });
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(iterator.next()).toEqual({ value: 0, done: false });
  expect(iterator.next()).toEqual({ value: 1, done: false });
  expect(iterator.previous()).toEqual({ value: 0, done: false });
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(iterator.next()).toEqual({ value: 0, done: false });
  expect(iterator.next()).toEqual({ value: 1, done: false });
  expect(iterator.next()).toEqual({ value: 2, done: false });
  expect(iterator.next()).toEqual({ value: undefined, done: true });
  expect(iterator.previous()).toEqual({ value: 2, done: false });
  expect(iterator.previous()).toEqual({ value: 1, done: false });
  expect(tree.toArray()).toEqual([0, 1, 2]);
  expect(tree.size()).toBe(3);
  expect(tree.isEmpty()).toBe(false);
});

test("RedBlackTree union 11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3 listIterator test", function() {
  let tree = RedBlackTree.create<number>(asc);
  tree = tree.union([11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3]);
  let iterator = tree.listIterator();
  iterator.last();
  expect(iterator.next()).toEqual({ value: undefined, done: true });
  expect(iterator.previous()).toEqual({ value: 11, done: false });
  expect(iterator.previous()).toEqual({ value: 10, done: false });
  expect(iterator.previous()).toEqual({ value: 9, done: false });
  expect(iterator.next()).toEqual({ value: 10, done: false });
  iterator.head();
  expect(iterator.previous()).toEqual({ value: undefined, done: true });
  expect(iterator.next()).toEqual({ value: -1, done: false });
  expect(iterator.next()).toEqual({ value: 0, done: false });
  expect(iterator.next()).toEqual({ value: 1, done: false });
  expect(iterator.previous()).toEqual({ value: 0, done: false });
  iterator.last();
  expect(iterator.previous()).toEqual({ value: 11, done: false });
  iterator.head();
  expect(iterator.next()).toEqual({ value: -1, done: false });
  expect(tree.toArray()).toEqual([-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.size()).toBe(13);
  expect(tree.isEmpty()).toBe(false);
});
