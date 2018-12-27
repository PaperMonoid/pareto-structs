import RedBlackTree from "../../src/RedBlackTree";
import SortedCollection from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty test", function() {
  let tree = new RedBlackTree<number>(asc) as SortedCollection<number>;
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
});

test("RedBlackTree add 0 test", function() {
  let tree = new RedBlackTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
});

test("RedBlackTree add 0, 1, -1 test", function() {
  let tree = new RedBlackTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([-1, 0, 1]);
  expect(tree.size()).toBe(3);
});

test("RedBlackTree add -1, 0, 1 test", function() {
  let tree = new RedBlackTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(-1);
  tree = tree.add(0);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-1, 0, 1]);
  expect(tree.size()).toBe(3);
});

test("RedBlackTree add 1, 0, -1 test", function() {
  let tree = new RedBlackTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  expect(tree.toArray()).toEqual([-1, 0, 1]);
  expect(tree.size()).toBe(3);
});

test("RedBlackTree add 0, 2, -2, -1, 1 test", function() {
  let tree = new RedBlackTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  expect(tree.toArray()).toEqual([-2, -1, 0, 1, 2]);
  expect(tree.size()).toBe(5);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 test", function() {
  let tree = new RedBlackTree<number>(asc) as SortedCollection<number>;
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

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 desc test", function() {
  let tree = new RedBlackTree<number>(desc) as SortedCollection<number>;
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
