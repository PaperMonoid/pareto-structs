import SortedCollection from "./SortedCollection";
import Comparator from "./Comparator";

class Node<T> {
  public value: T;
  public left: Node<T>;
  public right: Node<T>;

  public constructor(value: T, left?: Node<T>, right?: Node<T>) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  public copy(): Node<T> {
    return new Node<T>(this.value, this.left, this.right);
  }
}

class BinaryTree<T> implements SortedCollection<T> {
  public comparator: Comparator<T>;
  public root: Node<T>;

  constructor(comparator: Comparator<T>, root?: Node<T>) {
    this.comparator = comparator;
    this.root = root;
  }

  public copy(): BinaryTree<T> {
    return new BinaryTree<T>(this.comparator, this.root && this.root.copy());
  }

  public add(value: T): SortedCollection<T> {
    const tree = this.copy();
    if (tree.root == null) {
      tree.root = new Node<T>(value);
    } else {
      let node = tree.root;
      while (node != null) {
        if (this.comparator(value, node.value) > 0) {
          if (node.right == null) {
            node.right = new Node<T>(value);
            node = null;
          } else {
            node.right = node.right.copy();
            node = node.right;
          }
        } else {
          if (node.left == null) {
            node.left = new Node<T>(value);
            node = null;
          } else {
            node.left = node.left.copy();
            node = node.left;
          }
        }
      }
    }
    return tree;
  }

  public remove(value: T): SortedCollection<T> {
    if (this.root == null) {
      return this;
    } else {
      const tree = this.copy();
      let parent = null;
      let node = tree.root;
      while (node != null) {
        let comparison = this.comparator(value, node.value);
        if (comparison > 0) {
          node.right = node.right.copy();
          parent = node;
          node = node.right;
        } else if (comparison < 0) {
          node.left = node.left.copy();
          parent = node;
          node = node.left;
        } else {
          if (parent == null) {
            const left = this.copy();
            left.root = left.root.left;
            const right = this.copy();
            right.root = right.root.right;
            return right.union(left);
          } else if (parent.right == node) {
            parent.right = node.right;
            const left = this.copy();
            left.root = node.left;
            return tree.union(left);
          } else {
            parent.left = node.right;
            const left = this.copy();
            left.root = node.left;
            return tree.union(left);
          }
          node = null;
        }
      }
    }
  }

  public unionBinaryTree(binaryTree: BinaryTree<T>): BinaryTree<T> {
    const tree = this.copy();
    if (tree.root == null) {
      tree.root = binaryTree.root;
    } else if (binaryTree.root != null) {
      let node = tree.root;
      while (node != null) {
        if (this.comparator(binaryTree.root.value, node.value) > 0) {
          if (node.right == null) {
            node.right = binaryTree.root;
            node = null;
          } else {
            node.right = node.right.copy();
            node = node.right;
          }
        } else {
          if (node.left == null) {
            node.left = binaryTree.root;
            node = null;
          } else {
            node.left = node.left.copy();
            node = node.left;
          }
        }
      }
    }
    return tree;
  }

  public union(sortedCollection: SortedCollection<T>): SortedCollection<T> {
    if (sortedCollection instanceof BinaryTree) {
      return this.unionBinaryTree(sortedCollection as BinaryTree<T>);
    } else {
      return this.reduce<SortedCollection<T>>(
        new BinaryTree<T>(this.comparator),
        function(tree, value) {
          return tree.add(value);
        }
      );
    }
  }

  public intersection(
    sortedCollection: SortedCollection<T>
  ): SortedCollection<T> {
    throw new Error("Not implemented error!");
  }

  public except(sortedCollection: SortedCollection<T>): SortedCollection<T> {
    throw new Error("Not implemented error!");
  }

  public clear(): SortedCollection<T> {
    const tree = this.copy();
    tree.root = null;
    return tree;
  }

  public contains(value: T): boolean {
    // short-circuit with for of
    for (let _value of this) {
      if (value == _value) {
        return true;
      }
    }
    return false;
  }

  public containsAll(sortedCollection: SortedCollection<T>): boolean {
    // short-circuit with for of
    for (let value of sortedCollection) {
      let frequency = 0;
      for (let _value of sortedCollection) {
        if (value == _value) {
          frequency++;
        }
      }
      let _frequency = 0;
      for (let _value of this) {
        if (value == _value) {
          _frequency++;
        }
      }
      if (frequency != _frequency) {
        return false;
      }
    }
    return true;
  }

  public isEmpty(): boolean {
    return this.root == null;
  }

  public size(): number {
    return this.reduce<number>(0, function(accumulator, _) {
      return accumulator + 1;
    });
  }

  public toArray(): T[] {
    return this.reduce<T[]>([], function(array, value) {
      array.push(value);
      return array;
    });
  }

  public [Symbol.iterator](): Iterator<T> {
    function* visit(node: Node<T>) {
      if (node != null) {
        yield* visit(node.left);
        yield node.value;
        yield* visit(node.right);
      }
    }
    return visit(this.root);
  }

  public forEach(action: (value: T) => void): void {
    for (let value of this) {
      action(value);
    }
  }

  public filter(predicate: (value: T) => boolean): SortedCollection<T> {
    return this.reduce<SortedCollection<T>>(
      new BinaryTree<T>(this.comparator),
      function(tree, value) {
        return predicate(value) ? tree.add(value) : tree;
      }
    );
  }

  public map<R>(
    comparator: Comparator<R>,
    mapper: (value: T) => R
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new BinaryTree<R>(comparator),
      function(tree, value) {
        return tree.add(mapper(value));
      }
    );
  }

  public flatMap<R>(
    comparator: Comparator<R>,
    mapper: (value: T) => SortedCollection<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new BinaryTree<R>(comparator),
      function(tree, value) {
        return tree.union(mapper(value));
      }
    );
  }

  public reduce<U>(
    identity: U,
    accumulator: (accumulated: U, value: T) => U
  ): U {
    let accumulated: U = identity;
    this.forEach(function(value) {
      accumulated = accumulator(accumulated, value);
    });
    return accumulated;
  }
}

export default BinaryTree;
