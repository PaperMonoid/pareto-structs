import validateProperties from "./validateProperties";
import SortedCollection from "../../src/sorted-collection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree empty remove nothing test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0 remove nothing test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0 remove 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 1, -1 remove 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([-1, 1]);
  expect(tree.size()).toBe(2);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 1, -1 remove 1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  tree = tree.remove(1);
  expect(tree.toArray()).toEqual([-1, 0]);
  expect(tree.size()).toBe(2);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 1, -1 remove -1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(-1);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([0, 1]);
  expect(tree.size()).toBe(2);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, -1, 1 remove 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([-2, -1, 1, 2]);
  expect(tree.size()).toBe(4);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, -1, 1 remove 1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(1);
  expect(tree.toArray()).toEqual([-2, -1, 0, 2]);
  expect(tree.size()).toBe(4);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, -1, 1 remove -1 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.add(2);
  tree = tree.add(-2);
  tree = tree.add(-1);
  tree = tree.add(1);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([-2, 0, 1, 2]);
  expect(tree.size()).toBe(4);
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 remove 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
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
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 remove 2 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
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
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 remove -2 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
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
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 remove 0 desc test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(desc);
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
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 remove undefined test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
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
  validateProperties<number>(tree);
});

test("RedBlackTree add 0, 2, -2, 3, -3, -1, 1 remove null test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
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
  validateProperties<number>(tree);
});

test("RedBlackTree add 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 remove 10 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(1);
  tree = tree.add(2);
  tree = tree.add(3);
  tree = tree.add(4);
  tree = tree.add(5);
  tree = tree.add(6);
  tree = tree.add(7);
  tree = tree.add(8);
  tree = tree.add(9);
  tree = tree.add(10);
  tree = tree.add(11);
  tree = tree.add(12);
  tree = tree.add(13);
  tree = tree.add(14);
  tree = tree.add(15);
  tree = tree.add(16);
  tree = tree.add(17);
  tree = tree.add(18);
  tree = tree.add(19);
  tree = tree.add(20);
  tree = tree.remove(10);
  expect(tree.toArray()).toEqual([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ]);
  expect(tree.size()).toBe(19);
  validateProperties<number>(tree);
});
