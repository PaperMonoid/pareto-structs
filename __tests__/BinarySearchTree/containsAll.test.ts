import BinarySearchTree from "../../src/BinarySearchTree";
import SortedCollection from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree empty containsAll empty test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree empty containsAll 0 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.union([0]);
  expect(a.containsAll(b)).toBe(false);
});

test("BinarySearchTree 0 containsAll empty test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 0, 2, 1 containsAll empty test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0, 2, 1]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 0, 2, 1 containsAll 0 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0, 2, 1]);
  b = b.union([0]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 0, 2, 1 containsAll undefined test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0, 2, 1]);
  b = b.union([undefined]);
  expect(a.containsAll(b)).toBe(false);
});

test("BinarySearchTree 0, 2, 1 containsAll 0, 0 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0, 2, 1]);
  b = b.union([0, 0]);
  expect(a.containsAll(b)).toBe(false);
});

test("BinarySearchTree 0, 2, 1 containsAll 1, 2, 0 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0, 2, 1]);
  b = b.union([1, 2, 0]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 0, 2, 1, 3 containsAll 3, 1 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0, 2, 1, 3]);
  b = b.union([3, 1]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 0, 2, 1, 3 containsAll 3, 1 desc test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(desc) as SortedCollection<number>;
  a = a.union([0, 2, 1, 3]);
  b = b.union([3, 1]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 0, 2, 1, 3 containsAll 3, 1, 7 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([0, 2, 1, 3]);
  b = b.union([3, 1, 7]);
  expect(a.containsAll(b)).toBe(false);
});

test("BinarySearchTree 1, 1, 0, 0, 2, 2 containsAll 2, 1, 0 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([2, 1, 0]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 1, 1, 0, 0, 2, 2 containsAll 0, 0 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([0, 0]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 1, 1, 0, 0, 2, 2 containsAll 0, 0, 0 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([0, 0, 0]);
  expect(a.containsAll(b)).toBe(false);
});

test("BinarySearchTree 1, 1, 0, 0, 2, 2 containsAll 0, 0, 1, 1, 2, 2 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([0, 0, 1, 1, 2, 2]);
  expect(a.containsAll(b)).toBe(true);
});

test("BinarySearchTree 1, 1, 0, 0, 2, 2 containsAll 2, 0, 0, 1, 1, 2, 2 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.union([1, 1, 0, 0, 2, 2]);
  b = b.union([2, 0, 0, 1, 1, 2, 2]);
  expect(a.containsAll(b)).toBe(false);
});
