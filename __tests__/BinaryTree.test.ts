import BinaryTree from "../src/BinaryTree";
import SortedCollection from "../src/SortedCollection";

function comparator(first: number, second: number): number {
  return first - second;
}

test("Binary tree add 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0]);
});

test("Binary tree add 0, 1, 2 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(2);
  expect(tree.toArray()).toEqual([0, 1, 2]);
});

test("Binary tree add 2, 1, 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  expect(tree.toArray()).toEqual([0, 1, 2]);
});

test("Binary tree add 2, 1, 0, -1, -2  test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  expect(tree.toArray()).toEqual([-2, -1, 0, 1, 2]);
});

test("Binary tree add 2, 1, 0.5, 0, -1, -2, -1.5  test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0.5);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.add(-1.5);
  expect(tree.toArray()).toEqual([-2, -1.5, -1, 0, 0.5, 1, 2]);
});

test("Binary tree add 0, 1, 2 remove 1 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.add(1);
  tree = tree.add(2);
  tree = tree.remove(1);
  expect(tree.toArray()).toEqual([0, 2]);
});

test("Binary tree add 2, 1, 0, -1, -2 remove 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([-2, -1, 1, 2]);
});

test("Binary tree add 2, 1, 0.5, 0, -1, -2, -1.5 remove 1, -1  test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(2);
  tree = tree.add(1);
  tree = tree.add(0.5);
  tree = tree.add(0);
  tree = tree.add(-1);
  tree = tree.add(-2);
  tree = tree.add(-1.5);
  tree = tree.remove(1);
  tree = tree.remove(-1);
  expect(tree.toArray()).toEqual([-2, -1.5, 0, 0.5, 2]);
});

test("Binary tree add 0 remove 0 test", function() {
  let tree = new BinaryTree<number>(comparator) as SortedCollection<number>;
  tree = tree.add(0);
  tree = tree.remove(0);
  expect(tree.toArray()).toEqual([]);
});
