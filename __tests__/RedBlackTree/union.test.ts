import validateProperties from "./validateProperties";
import { SortedCollection, RedBlackTree } from "../../src/SortedCollection";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree union empty and empty test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  let c = a.union(b);
  expect(c.toArray()).toEqual([]);
  expect(c.size()).toBe(0);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union empty and 1 test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1]);
  expect(c.size()).toBe(1);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 1 and empty test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  let c = a.union(b);
  expect(c.toArray()).toEqual([1]);
  expect(c.size()).toBe(1);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 1 and 1 test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1, 1]);
  expect(c.size()).toBe(2);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 1, 2, 3 and 1, 2, 3 test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1, 1, 2, 2, 3, 3]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 3, 2, 1 and 1, 2, 3 test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1, 1, 2, 2, 3, 3]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 1, 2, 3 and 3, 2, 1 test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  b = b.add(3);
  b = b.add(2);
  b = b.add(1);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1, 1, 2, 2, 3, 3]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 1, 2, 3 and 1, 2, 3 desc test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new RedBlackTree<number>(desc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1, 1, 2, 2, 3, 3]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 1, 2, 3 desc and 1, 2, 3 test", function() {
  let a = new RedBlackTree<number>(desc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.union(b);
  expect(c.toArray()).toEqual([3, 3, 2, 2, 1, 1]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 1, 2, 3 desc and 1, 2, 3 desc test", function() {
  let a = new RedBlackTree<number>(desc) as SortedCollection<number>;
  a = a.add(1);
  a = a.add(2);
  a = a.add(3);
  let b = new RedBlackTree<number>(desc) as SortedCollection<number>;
  b = b.add(1);
  b = b.add(2);
  b = b.add(3);
  let c = a.union(b);
  expect(c.toArray()).toEqual([3, 3, 2, 2, 1, 1]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 3, 2, 1 and 5, 4, 6 test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new RedBlackTree<number>(asc) as SortedCollection<number>;
  b = b.add(5);
  b = b.add(4);
  b = b.add(6);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1, 2, 3, 4, 5, 6]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});

test("RedBlackTree union 3, 2, 1 and 5, 4, 6 desc test", function() {
  let a = new RedBlackTree<number>(asc) as SortedCollection<number>;
  a = a.add(3);
  a = a.add(2);
  a = a.add(1);
  let b = new RedBlackTree<number>(desc) as SortedCollection<number>;
  b = b.add(5);
  b = b.add(4);
  b = b.add(6);
  let c = a.union(b);
  expect(c.toArray()).toEqual([1, 2, 3, 4, 5, 6]);
  expect(c.size()).toBe(6);
  validateProperties<number>(c as RedBlackTree<number>);
});
