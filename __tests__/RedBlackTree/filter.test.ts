import validateProperties from "./validateProperties";
import SortedCollection from "../../src/sorted-collection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

function greaterThanZero(x) {
  return x > 0;
}

function isZero(x) {
  return x == 0;
}

function isPrime(x) {
  if (x <= 1) {
    return false;
  }
  for (let i = 2; i < x - 1; i++) {
    if (x % i == 0) {
      return false;
    }
  }
  return true;
}

test("RedBlackTree filter empty > 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.filter(greaterThanZero);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 0 > 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.filter(greaterThanZero);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 1 > 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(1);
  tree = tree.filter(greaterThanZero);
  expect(tree.toArray()).toEqual([1]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 0 == 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(0);
  tree = tree.filter(isZero);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 1 == 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.add(1);
  tree = tree.filter(isZero);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 0, 1 > 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([0, 1]);
  tree = tree.filter(greaterThanZero);
  expect(tree.toArray()).toEqual([1]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 0, 2, 1, 3, -2, -1, -3 > 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([0, 2, 1, 3, -2, -1, -3]);
  tree = tree.filter(greaterThanZero);
  expect(tree.toArray()).toEqual([1, 2, 3]);
  expect(tree.size()).toBe(3);
  expect(tree.isEmpty()).toBe(false);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 0, 2, 1, 3, -2, -1, -3 == 0 test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([0, 2, 1, 3, -2, -1, -3]);
  tree = tree.filter(isZero);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
  validateProperties<number>(tree);
});

test("RedBlackTree filter 11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3 isPrime test", function() {
  let tree = SortedCollection.asRedBlackTree<number>(asc);
  tree = tree.union([11, 7, -1, 4, 5, 6, 8, 2, 0, 1, 10, 9, 3]);
  tree = tree.filter(isPrime);
  expect(tree.toArray()).toEqual([2, 3, 5, 7, 11]);
  expect(tree.size()).toBe(5);
  expect(tree.isEmpty()).toBe(false);
  validateProperties<number>(tree);
});
