import MultiMap from "../../src/multimap";
import RedBlackTree from "../../src/multimap/red-black-tree";
import validateProperties from "./validateProperties";

function asc(first: number, second: number): number {
  return first - second;
}

function desc(first: number, second: number): number {
  return second - first;
}

test("RedBlackTree replace empty test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  tree = tree.replace(0, [0]);
  tree = tree.replace(1, [0]);
  tree = tree.replace(-1, [0]);
  expect(tree.entries()).toEqual([[-1, 0], [0, 0], [1, 0]]);
  expect(tree.isEmpty()).toBeFalsy();
  expect(tree.size()).toBe(3);
  validateProperties(tree);
});

test("RedBlackTree replace put test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(1, 0);
  tree = tree.put(-1, 0);
  tree = tree.replace(0, [3, 2, 1]);
  expect(tree.entries()).toEqual([[-1, 0], [0, 3], [0, 2], [0, 1], [1, 0]]);
  expect(tree.isEmpty()).toBeFalsy();
  expect(tree.size()).toBe(5);
  validateProperties(tree);
});

test("RedBlackTree replace replacement put test", function() {
  let tree = RedBlackTree.create<number, number>(asc);
  tree = tree.put(0, 0);
  tree = tree.put(1, 0);
  tree = tree.put(-1, 0);
  tree = tree.replace(0, [3, 2, 1]);
  tree = tree.replace(0, [4, 5]);
  expect(tree.entries()).toEqual([[-1, 0], [0, 4], [0, 5], [1, 0]]);
  expect(tree.isEmpty()).toBeFalsy();
  expect(tree.size()).toBe(4);
  validateProperties(tree);
});
