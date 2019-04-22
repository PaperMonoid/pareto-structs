import RedBlackTree from "../../src/multimap/red-black-tree";
import MultiMap from "../../src/multimap";

enum Color {
  Red,
  Black
}

interface Node<K, V> {
  key: K;
  values: V[];
  color: Color;
  left: Node<K, V>;
  right: Node<K, V>;
}

function getBlackHeights<K, V>(node: Node<K, V>, height: number): number[] {
  if (node == null) {
    return [height];
  }
  if (node.color == Color.Black) {
    return getBlackHeights<K, V>(node.right, height + 1).concat(
      getBlackHeights<K, V>(node.left, height + 1)
    );
  } else {
    return getBlackHeights<K, V>(node.right, height).concat(
      getBlackHeights<K, V>(node.left, height)
    );
  }
}

function validateBlackHeights<K, V>(tree: RedBlackTree<K, V>): void {
  const heights = getBlackHeights(tree.root, 0);
  if (heights.length > 0) {
    const height = heights[0];
    for (let _height of heights) {
      expect(height).toBe(_height);
    }
  }
}

function validateBlackRoot<K, V>(tree: RedBlackTree<K, V>): void {
  if (tree.root != null) {
    expect(tree.root.color).toBe(Color.Black);
  }
}

function validateRedNodes<K, V>(
  tree: RedBlackTree<K, V>,
  node: Node<K, V>
): void {
  if (node != null) {
    if (node.left != null) {
      validateRedNodes<K, V>(tree, node.left);
      expect(
        node.color == Color.Red && node.left.color == Color.Red
      ).toBeFalsy();
    }
    if (node.right != null) {
      validateRedNodes<K, V>(tree, node.right);
      expect(
        node.color == Color.Red && node.right.color == Color.Red
      ).toBeFalsy();
    }
  }
}

function validateColors<K, V>(tree: RedBlackTree<K, V>): void {
  validateBlackRoot<K, V>(tree);
  validateRedNodes<K, V>(tree, tree.root);
}

function validateProperties<K, V>(tree: MultiMap<K, V>): void {
  validateColors<K, V>(tree as RedBlackTree<K, V>);
  validateBlackHeights<K, V>(tree as RedBlackTree<K, V>);
}

export default validateProperties;
