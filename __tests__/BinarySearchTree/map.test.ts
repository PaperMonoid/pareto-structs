import BinarySearchTree from "../../src/BinarySearchTree";
import SortedCollection from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

function id(x) {
  return x;
}

function zero(x) {
  return 0;
}

function timesTwo(x) {
  return x * 2;
}

function square(x) {
  return x * x;
}

function additiveInverse(x) {
  return -x;
}

function multiplicativeInverse(x) {
  return 1 / x;
}

function fib(n) {
  if (n <= 2) {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

test("BinarySearchTree map empty timesTwo test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.map(timesTwo, asc);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree map empty zero test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.map(zero, asc);
  expect(tree.toArray()).toEqual([]);
  expect(tree.size()).toBe(0);
  expect(tree.isEmpty()).toBe(true);
});

test("BinarySearchTree map 0 timesTwo test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.map(timesTwo, asc);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1 zero test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.add(1);
  tree = tree.map(zero, asc);
  expect(tree.toArray()).toEqual([0]);
  expect(tree.size()).toBe(1);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0 timesTwo test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0]);
  tree = tree.map(timesTwo, asc);
  expect(tree.toArray()).toEqual([0, 2, 4]);
  expect(tree.size()).toBe(3);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0 zero test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0]);
  tree = tree.map(zero, asc);
  expect(tree.toArray()).toEqual([0, 0, 0]);
  expect(tree.size()).toBe(3);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0, 3, -4, -2, -1, 4, -3 timesTwo test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0, 3, -4, -2, -1, 4, -3]);
  tree = tree.map(timesTwo, asc);
  expect(tree.toArray()).toEqual([-8, -6, -4, -2, 0, 2, 4, 6, 8]);
  expect(tree.size()).toBe(9);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0, 3, -4, -2, -1, 4, -3 additiveInverse test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0, 3, -4, -2, -1, 4, -3]);
  tree = tree.map(additiveInverse, asc);
  expect(tree.toArray()).toEqual([-4, -3, -2, -1, -0, 1, 2, 3, 4]);
  expect(tree.size()).toBe(9);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0, 3, -4, -2, -1, 4, -3 multiplicativeInverse test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0, 3, -4, -2, -1, 4, -3]);
  tree = tree.map(multiplicativeInverse, asc);
  expect(tree.toArray()).toEqual([
    -1,
    -1 / 2,
    -1 / 3,
    -1 / 4,
    1 / 4,
    1 / 3,
    1 / 2,
    1,
    Infinity
  ]);
  expect(tree.size()).toBe(9);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0, 3, -4, -2, -1, 4, -3 square test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0, 3, -4, -2, -1, 4, -3]);
  tree = tree.map(square, asc);
  expect(tree.toArray()).toEqual([0, 1, 1, 4, 4, 9, 9, 16, 16]);
  expect(tree.size()).toBe(9);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0, 3, -4, -2, -1, 4, -3 zero test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0, 3, -4, -2, -1, 4, -3]);
  tree = tree.map(zero, asc);
  expect(tree.toArray()).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  expect(tree.size()).toBe(9);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 1, 2, 0, 3, -4, -2, -1, 4, -3 id test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([1, 2, 0, 3, -4, -2, -1, 4, -3]);
  tree = tree.map(id, asc);
  expect(tree.toArray()).toEqual([-4, -3, -2, -1, 0, 1, 2, 3, 4]);
  expect(tree.size()).toBe(9);
  expect(tree.isEmpty()).toBe(false);
});

test("BinarySearchTree map 5, 2, 6, 1, 4, 3 fibonacci test", function() {
  let tree = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  tree = tree.union([5, 2, 6, 1, 4, 3]);
  tree = tree.map(fib, asc);
  expect(tree.toArray()).toEqual([1, 1, 2, 3, 5, 8]);
  expect(tree.size()).toBe(6);
  expect(tree.isEmpty()).toBe(false);
});
