import BinarySearchTree from "../../src/BinarySearchTree";
import SortedCollection from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("BinarySearchTree intersection empty and empty test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([]);
  expect(c.size()).toBe(0);
});

test("BinarySearchTree intersection empty and 1 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([]);
  expect(c.size()).toBe(0);
});

test("BinarySearchTree intersection 1 and empty test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([]);
  expect(c.size()).toBe(0);
});

test("BinarySearchTree intersection 1 and 1 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1]);
  expect(c.size()).toBe(1);
});

test("BinarySearchTree intersection 1, 1 and 1 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1]);
  expect(c.size()).toBe(1);
});

test("BinarySearchTree intersection 1 and 1, 1 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(1);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1]);
  expect(c.size()).toBe(1);
});

test("BinarySearchTree intersection 1, 1 and 1, 1 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(1);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1, 1]);
  expect(c.size()).toBe(2);
});

test("BinarySearchTree intersection 1, 2, 3 and 1, 2, 3 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1, 2, 3]);
  expect(c.size()).toBe(3);
});

test("BinarySearchTree intersection 3, 2, 1 and 1, 2, 3 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1, 2, 3]);
  expect(c.size()).toBe(3);
});

test("BinarySearchTree intersection 1, 2, 3 and 3, 2, 1 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(3);
  b = b.add(2);
  b = b.add(1);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1, 2, 3]);
  expect(c.size()).toBe(3);
});

test("BinarySearchTree intersection 1, 2, 3 and 1, 2, 3 desc test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new BinarySearchTree<number>(desc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([1, 2, 3]);
  expect(c.size()).toBe(3);
});

test("BinarySearchTree intersection 1, 2, 3 desc and 1, 2, 3 test", function() {
  let a = new BinarySearchTree<number>(desc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([3, 2, 1]);
  expect(c.size()).toBe(3);
});

test("BinarySearchTree intersection 1, 2, 3 desc and 1, 2, 3 desc test", function() {
  let a = new BinarySearchTree<number>(desc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new BinarySearchTree<number>(desc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([3, 2, 1]);
  expect(c.size()).toBe(3);
});

test("BinarySearchTree intersection 3, 2, 1 and 5, 4, 6 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(5);
  b = b.add(4);
  b = b.add(6);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([]);
  expect(c.size()).toBe(0);
});

test("BinarySearchTree intersection 3, 2, 1 and 5, 4, 6 desc test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new BinarySearchTree<number>(desc) as SortedCollection<number>;
  b = b.add(5);
  b = b.add(4);
  b = b.add(6);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([]);
  expect(c.size()).toBe(0);
});

test("BinarySearchTree intersection 3, 2, 1 and 3, 4, 6 test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  b = b.add(3);
  b = b.add(4);
  b = b.add(5);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([3]);
  expect(c.size()).toBe(1);
});

test("BinarySearchTree intersection 3, 2, 1 and 2, 3, 6 desc test", function() {
  let a = new BinarySearchTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new BinarySearchTree<number>(desc) as SortedCollection<number>;
  b = b.add(2);
  b = b.add(3);
  b = b.add(5);
  let c = a.intersection(b);
  expect(c.toArray()).toEqual([2, 3]);
  expect(c.size()).toBe(2);
});
