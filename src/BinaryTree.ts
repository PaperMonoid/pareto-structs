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
    throw new Error("Not implemented error!");
  }

  public union(sortedCollection: SortedCollection<T>): SortedCollection<T> {
    throw new Error("Not implemented error!");
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
    throw new Error("Not implemented error!");
  }

  public containsAll(sortedCollection: SortedCollection<T>): boolean {
    throw new Error("Not implemented error!");
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
