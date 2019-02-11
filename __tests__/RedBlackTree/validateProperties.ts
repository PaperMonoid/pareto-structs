import RedBlackTree from "../../src/sorted-collection/red-black-tree/RedBlackTree";
import SortedCollection from "../../src/sorted-collection";

enum Color {
  Red,
  Black
}

interface Node<E> {
  element: E;
  color: Color;
  left: Node<E>;
  right: Node<E>;
}

function getBlackHeights<E>(node: Node<E>, height: number): number[] {
  if (node == null) {
    return [height];
  }
  if (node.color == Color.Black) {
    return getBlackHeights<E>(node.right, height + 1).concat(
      getBlackHeights<E>(node.left, height + 1)
    );
  } else {
    return getBlackHeights<E>(node.right, height).concat(
      getBlackHeights<E>(node.left, height)
    );
  }
}

function validateBlackHeights<E>(tree: RedBlackTree<E>): void {
  const heights = getBlackHeights(tree.root, 0);
  if (heights.length > 0) {
    const height = heights[0];
    for (let _height of heights) {
      expect(height).toBe(_height);
    }
  }
}

function validateBlackRoot<E>(tree: RedBlackTree<E>): void {
  if (tree.root != null) {
    expect(tree.root.color).toBe(Color.Black);
  }
}

function validateRedNodes<E>(tree: RedBlackTree<E>, node: Node<E>): void {
  if (node != null) {
    if (node.left != null) {
      validateRedNodes<E>(tree, node.left);
      expect(
        node.color == Color.Red && node.left.color == Color.Red
      ).toBeFalsy();
    }
    if (node.right != null) {
      validateRedNodes<E>(tree, node.right);
      expect(
        node.color == Color.Red && node.right.color == Color.Red
      ).toBeFalsy();
    }
  }
}

function validateColors<E>(tree: RedBlackTree<E>): void {
  validateBlackRoot<E>(tree);
  validateRedNodes<E>(tree, tree.root);
}

function validateProperties<E>(tree: SortedCollection<E>): void {
  validateColors<E>(tree as RedBlackTree<E>);
  validateBlackHeights<E>(tree as RedBlackTree<E>);
}

export default validateProperties;
