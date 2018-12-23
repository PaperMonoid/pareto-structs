import BiFunction from "./Function/BiFunction";
import Comparator from "./Function/Comparator";
import Consumer from "./Function/Consumer";
import Function from "./Function/Function";
import Predicate from "./Function/Predicate";
import SortedCollection from "./SortedCollection";

class Node<E> {
  public readonly element: E;
  public readonly left: Node<E>;
  public readonly right: Node<E>;

  public constructor(element: E, left?: Node<E>, right?: Node<E>) {
    this.element = element;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree<E> implements SortedCollection<E> {
  public readonly comparator: Comparator<E>;
  public readonly root: Node<E>;
  public readonly count: number;

  constructor(comparator: Comparator<E>, root?: Node<E>, count?: number) {
    this.comparator = comparator;
    this.root = root;
    this.count = count || 0;
  }

  private static fromIteratorBalance<E>(
    iterator: Iterator<E>,
    count: number
  ): Node<E> {
    if (count <= 0) {
      return null;
    }
    const countLeft = Math.floor(count / 2);
    const left = BinarySearchTree.fromIteratorBalance<E>(iterator, countLeft);
    const next = iterator.next();
    const element = next.value;
    const done = next.done;
    const countRight = count - 1 - countLeft;
    const right = BinarySearchTree.fromIteratorBalance<E>(iterator, countRight);
    if (done) {
      return null;
    } else {
      return new Node<E>(element, left, right);
    }
  }

  public static fromIterator<E>(
    comparator: Comparator<E>,
    iterator: Iterator<E>,
    count: number
  ): BinarySearchTree<E> {
    return new BinarySearchTree<E>(
      comparator,
      BinarySearchTree.fromIteratorBalance<E>(iterator, count),
      count
    );
  }

  private addNode(newNode: Node<E>, node: Node<E>): Node<E> {
    if (newNode == null) {
      return node;
    } else if (node == null) {
      return newNode;
    } else if (this.comparator(newNode.element, node.element) > 0) {
      return new Node<E>(
        node.element,
        node.left,
        this.addNode(newNode, node.right)
      );
    } else {
      return new Node<E>(
        node.element,
        this.addNode(newNode, node.left),
        node.right
      );
    }
  }

  public add(element: E): SortedCollection<E> {
    return new BinarySearchTree<E>(
      this.comparator,
      this.addNode(new Node<E>(element), this.root),
      this.count + 1
    );
  }

  public removeNode(element: E, node: Node<E>): Node<E>[] {
    if (node == null) {
      return null;
    }

    const comparison = this.comparator(element, node.element);
    if (comparison > 0) {
      const removed = this.removeNode(element, node.right);
      if (removed == null) {
        return null;
      } else {
        return [removed[0], new Node<E>(node.element, node.left, removed[1])];
      }
    } else if (comparison < 0) {
      const removed = this.removeNode(element, node.left);
      if (removed == null) {
        return null;
      } else {
        return [removed[0], new Node<E>(node.element, removed[1], node.right)];
      }
    } else {
      return [node.left, node.right];
    }
  }

  public remove(element: E): SortedCollection<E> {
    const removed = this.removeNode(element, this.root);
    if (removed == null) {
      return this;
    } else {
      return new BinarySearchTree<E>(
        this.comparator,
        this.addNode(removed[0], removed[1]),
        this.count - 1
      );
    }
  }

  public union(collection: SortedCollection<E>): SortedCollection<E> {
    return collection.reduce<SortedCollection<E>>(this, (tree, element) =>
      tree.add(element)
    );
  }

  public intersection(collection: SortedCollection<E>): SortedCollection<E> {
    const A = this[Symbol.iterator]();
    const B = this.clear()
      .union(collection)
      [Symbol.iterator]();
    let tree = this.clear();
    for (let a = A.next(), b = B.next(); !a.done && !b.done; ) {
      const comparison = this.comparator(a.value, b.value);
      if (comparison > 0) {
        b = B.next();
      } else if (comparison < 0) {
        a = A.next();
      } else {
        tree = tree.add(a.value);
        a = A.next();
        b = B.next();
      }
    }
    return tree;
  }

  public except(collection: SortedCollection<E>): SortedCollection<E> {
    return collection.reduce<SortedCollection<E>>(this, (tree, element) =>
      tree.remove(element)
    );
  }

  public clear(): SortedCollection<E> {
    return new BinarySearchTree<E>(this.comparator);
  }

  public search(element: E, node: Node<E>): Node<E> {
    if (node == null) {
      return null;
    }
    const comparison = this.comparator(element, node.element);
    if (comparison > 0) {
      return node.right;
    } else if (comparison < 0) {
      return node.left;
    } else {
      return node;
    }
  }

  public contains(element: E): boolean {
    return this.search(element, this.root) != null;
  }

  public containsAll(collection: SortedCollection<E>): boolean {
    const A = this[Symbol.iterator]();
    const B = this.clear()
      .union(collection)
      [Symbol.iterator]();
    for (let a = A.next(), b = B.next(); !a.done && !b.done; ) {
      const comparison = this.comparator(a.value, b.value);
      if (comparison > 0) {
        return false;
      } else if (comparison < 0) {
        a = A.next();
      } else {
        a = A.next();
        b = B.next();
      }
    }
    return b.done;
  }

  public isEmpty(): boolean {
    return this.root == null;
  }

  public size(): number {
    return this.count;
  }

  public toArray(): E[] {
    const array = [];
    for (let element of this) {
      array.push(element);
    }
    return array;
  }

  public [Symbol.iterator](): Iterator<E> {
    function* visit(node: Node<E>) {
      if (node != null) {
        yield* visit(node.left);
        yield node.element;
        yield* visit(node.right);
      }
    }
    return visit(this.root);
  }

  public forEach(action: Consumer<E>): void {
    for (let element of this) {
      action(element);
    }
  }

  public filter(predicate: Predicate<E>): SortedCollection<E> {
    return this.reduce<SortedCollection<E>>(this, (tree, element) =>
      predicate(element) ? tree : tree.remove(element)
    );
  }

  public map<R>(
    comparator: Comparator<R>,
    mapper: Function<E, R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new BinarySearchTree<R>(comparator),
      (tree, element) => tree.add(mapper(element))
    );
  }

  public flatMap<R>(
    comparator: Comparator<R>,
    mapper: Function<E, SortedCollection<R>>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new BinarySearchTree<R>(comparator),
      (tree, element) => tree.union(mapper(element))
    );
  }

  public reduce<U>(identity: U, accumulator: BiFunction<U, E, U>): U {
    let accumulated: U = identity;
    for (let element of this) {
      accumulated = accumulator(accumulated, element);
    }
    return accumulated;
  }
}

export default BinarySearchTree;
