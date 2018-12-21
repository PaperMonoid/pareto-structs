import SortedCollection from "./SortedCollection";
import Comparator from "./Comparator";

class Node<T> {
  public readonly value: T;
  public readonly left: Node<T>;
  public readonly right: Node<T>;

  public constructor(value: T, left?: Node<T>, right?: Node<T>) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree<T> implements SortedCollection<T> {
  public readonly comparator: Comparator<T>;
  public readonly root: Node<T>;
  public readonly count: number;

  constructor(comparator: Comparator<T>, root?: Node<T>, count?: number) {
    this.comparator = comparator;
    this.root = root;
    this.count = count;
  }

  private static fromIteratorBalance<T>(iterator: Iterator<T>): Node<T> {
    const left = BinarySearchTree.fromIteratorBalance<T>(iterator);
    const next = iterator.next();
    const node = next.value;
    const done = next.done;
    const right = BinarySearchTree.fromIteratorBalance<T>(iterator);
    if (done) {
      return null;
    } else {
      return new Node<T>(node.value, left, right);
    }
  }

  public static fromIterator<T>(
    comparator: Comparator<T>,
    iterator: Iterator<T>,
    count: number
  ): BinarySearchTree<T> {
    return new BinarySearchTree<T>(
      comparator,
      BinarySearchTree.fromIteratorBalance<T>(iterator),
      count
    );
  }

  private addNode(newNode: Node<T>, node: Node<T>): Node<T> {
    if (newNode == null) {
      return node;
    } else if (node == null) {
      return newNode;
    } else if (this.comparator(newNode.value, node.value) > 0) {
      return new Node<T>(
        node.value,
        node.left,
        this.addNode(newNode, node.right)
      );
    } else {
      return new Node<T>(
        node.value,
        this.addNode(newNode, node.left),
        node.right
      );
    }
  }

  private addValue(value: T, node: Node<T>): Node<T> {
    if (node == null) {
      return new Node<T>(value);
    } else if (this.comparator(value, node.value) > 0) {
      return new Node<T>(
        node.value,
        node.left,
        this.addValue(value, node.right)
      );
    } else {
      return new Node<T>(
        node.value,
        this.addValue(value, node.left),
        node.right
      );
    }
  }

  public add(value: T): SortedCollection<T> {
    return new BinarySearchTree<T>(
      this.comparator,
      this.addValue(value, this.root),
      this.count + 1
    );
  }

  public removeNode(value: T, node: Node<T>): Node<T>[] {
    if (node == null) {
      return null;
    }

    const comparison = this.comparator(value, node.value);
    if (comparison > 0) {
      const removed = this.removeNode(value, node.right);
      if (removed == null) {
        return null;
      } else {
        return [removed[0], new Node<T>(node.value, node.left, removed[1])];
      }
    } else if (comparison < 0) {
      const removed = this.removeNode(value, node.left);
      if (removed == null) {
        return null;
      } else {
        return [removed[0], new Node<T>(node.value, removed[1], node.right)];
      }
    } else {
      return [node.left, node.right];
    }
  }

  public remove(value: T): SortedCollection<T> {
    const removed = this.removeNode(value, this.root);
    if (removed == null) {
      return this;
    } else {
      return new BinarySearchTree<T>(
        this.comparator,
        this.addNode(removed[0], removed[1]),
        this.count - 1
      );
    }
  }

  public union(sortedCollection: SortedCollection<T>): SortedCollection<T> {
    return sortedCollection.reduce<SortedCollection<T>>(this, function(
      tree,
      value
    ) {
      return tree.add(value);
    });
  }

  // repeated values make implementation slow
  // TODO fix implementation
  public intersection(
    sortedCollection: SortedCollection<T>
  ): SortedCollection<T> {
    const A: Iterator<T> = this[Symbol.iterator]();
    const B: Iterator<T> = this.clear()
      .union(sortedCollection)
      [Symbol.iterator]();
    let tree = this.clear();
    let a: { value: T; done: boolean; skip?: boolean };
    let b: { value: T; done: boolean; skip?: boolean };
    a = A.next();
    b = B.next();
    while (!a.done && !b.done) {
      const comparison = this.comparator(a.value, b.value);
      if (comparison > 0) {
        a.skip = true;
        b.skip = false;
      } else if (comparison < 0) {
        a.skip = false;
        b.skip = true;
      } else {
        tree = tree.add(a.value);
        a.skip = false;
        b.skip = false;
      }
      if (!a.skip) {
        a = A.next();
      }
      if (!b.skip) {
        b = B.next();
      }
    }
    return tree;
  }

  public except(sortedCollection: SortedCollection<T>): SortedCollection<T> {
    return sortedCollection.reduce<SortedCollection<T>>(this, function(
      tree,
      value
    ) {
      return tree.remove(value);
    });
  }

  public clear(): SortedCollection<T> {
    return new BinarySearchTree<T>(this.comparator);
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
    return this.count;
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
    return this.reduce<SortedCollection<T>>(this.clear(), function(
      tree,
      value
    ) {
      return predicate(value) ? tree.add(value) : tree;
    });
  }

  public map<R>(
    comparator: Comparator<R>,
    mapper: (value: T) => R
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new BinarySearchTree<R>(comparator),
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
      new BinarySearchTree<R>(comparator),
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

export default BinarySearchTree;
