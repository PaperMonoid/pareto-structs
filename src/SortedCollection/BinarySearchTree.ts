import BiFunction from "../Function/BiFunction";
import Comparator from "../Function/Comparator";
import Consumer from "../Function/Consumer";
import Equals from "../Function/Equals";
import Function from "../Function/Function";
import Predicate from "../Function/Predicate";
import SortedCollection from "./SortedCollection";
import StrictEquality from "../Function/StrictEquality";

class Node<E> {
  public readonly element: E;
  public readonly left: Node<E>;
  public readonly right: Node<E>;

  public constructor(element: E, left?: Node<E>, right?: Node<E>) {
    this.element = element;
    this.left = left;
    this.right = right;
  }

  public setElement(element: E): Node<E> {
    return new Node<E>(element, this.left, this.right);
  }

  public setLeft(node: Node<E>): Node<E> {
    return new Node<E>(this.element, node, this.right);
  }

  public setRight(node: Node<E>): Node<E> {
    return new Node<E>(this.element, this.left, node);
  }

  public min(): Node<E> {
    if (this.left == null) {
      return this;
    } else {
      return this.left.min();
    }
  }

  public max(): Node<E> {
    if (this.right == null) {
      return this;
    } else {
      return this.right.max();
    }
  }
}

class BinarySearchTree<E> implements SortedCollection<E> {
  public readonly comparator: Comparator<E>;
  public readonly equals: Equals<E>;
  public readonly root: Node<E>;
  public readonly count: number;

  constructor(
    comparator: Comparator<E>,
    equals?: Equals<E>,
    root?: Node<E>,
    count?: number
  ) {
    this.comparator = comparator;
    this.root = root;
    this.count = count || 0;
    this.equals = equals || StrictEquality;
  }

  private addNode(newNode: Node<E>, node: Node<E>): Node<E> {
    if (newNode == null) {
      return node;
    } else if (node == null) {
      return newNode;
    } else if (this.comparator(newNode.element, node.element) > 0) {
      return node.setRight(this.addNode(newNode, node.right));
    } else {
      return node.setLeft(this.addNode(newNode, node.left));
    }
  }

  public add(element: E): SortedCollection<E> {
    return new BinarySearchTree<E>(
      this.comparator,
      this.equals,
      this.addNode(new Node<E>(element), this.root),
      this.count + 1
    );
  }

  private replaceWithSuccessor(node: Node<E>, first?: boolean): Node<E>[] {
    if (node == null) {
      return [null, null];
    }
    if (first) {
      if (node.right == null) {
        return [node.left, node];
      } else {
        const [replaced, successor] = this.replaceWithSuccessor(node.right);
        return [
          node.setRight(replaced).setElement(successor.element),
          successor
        ];
      }
    } else {
      if (node.left == null) {
        return [node.right, node];
      } else {
        const [replaced, successor] = this.replaceWithSuccessor(node.left);
        return [node.setLeft(replaced), successor];
      }
    }
  }

  private removeNode(element: E, node: Node<E>): Node<E>[] {
    if (node == null) {
      return null;
    }
    const comparison = this.comparator(element, node.element);
    if (comparison == 0 && this.equals(element, node.element)) {
      const [replaced, _] = this.replaceWithSuccessor(node, true);
      return [replaced];
    } else if (comparison > 0) {
      const replaced = this.removeNode(element, node.right);
      if (replaced == null) {
        return null;
      } else {
        return [node.setRight(replaced[0])];
      }
    } else {
      const replaced = this.removeNode(element, node.left);
      if (replaced == null) {
        return null;
      } else {
        return [node.setLeft(replaced[0])];
      }
    }
  }

  public remove(element: E): SortedCollection<E> {
    const replaced = this.removeNode(element, this.root);
    if (replaced == null) {
      return this;
    } else {
      return new BinarySearchTree<E>(
        this.comparator,
        this.equals,
        replaced[0],
        this.count - 1
      );
    }
  }

  public union(collection: Iterable<E>): SortedCollection<E> {
    let tree = this as SortedCollection<E>;
    for (let element of collection) {
      tree = tree.add(element);
    }
    return tree;
  }

  // TODO: fix implementation. sorted elements = worst case insert O(n).
  public intersection(collection: Iterable<E>): SortedCollection<E> {
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

  public except(collection: Iterable<E>): SortedCollection<E> {
    let tree = this as SortedCollection<E>;
    for (let element of collection) {
      tree = tree.remove(element);
    }
    return tree;
  }

  public clear(): SortedCollection<E> {
    return new BinarySearchTree<E>(this.comparator, this.equals);
  }

  public search(element: E, node: Node<E>): Node<E> {
    if (node == null) {
      return null;
    }
    const comparison = this.comparator(element, node.element);
    if (comparison == 0 && this.equals(element, node.element)) {
      return node;
    } else if (comparison > 0) {
      return this.search(element, node.right);
    } else {
      return this.search(element, node.left);
    }
  }

  public contains(element: E): boolean {
    return this.search(element, this.root) != null;
  }

  public containsAll(collection: Iterable<E>): boolean {
    const A = this[Symbol.iterator]();
    const B = this.clear()
      .union(collection)
      [Symbol.iterator]();
    let a, b;
    for (a = A.next(), b = B.next(); !a.done && !b.done; ) {
      const comparison = this.comparator(a.value, b.value);
      if (comparison == 0 && this.equals(a.value, b.value)) {
        a = A.next();
        b = B.next();
      } else if (comparison > 0) {
        return false;
      } else {
        a = A.next();
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

  public min(): E {
    if (this.root == null) {
      throw new RangeError();
    } else {
      return this.root.min().element;
    }
  }

  public max(): E {
    if (this.root == null) {
      throw new RangeError();
    } else {
      return this.root.max().element;
    }
  }

  public nth(index: number): E {
    let i = 0;
    for (let element of this) {
      if (i++ == index) {
        return element;
      }
    }
    throw new RangeError();
  }

  public slice(lower?: number, upper?: number): SortedCollection<E> {
    const min = lower < 0 ? this.size() + lower : lower;
    const max = upper < 0 ? this.size() + upper : upper;
    let i = 0;
    let tree: SortedCollection<E> = this;
    for (let element of this) {
      if (i < min || i >= max) {
        tree = tree.remove(element);
      }
      i++;
    }
    return tree;
  }

  public reverse(): SortedCollection<E> {
    return new Reversed<E>(this);
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
    mapper: Function<E, R>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new BinarySearchTree<R>(comparator, equals),
      (tree, element) => tree.add(mapper(element))
    );
  }

  public flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new BinarySearchTree<R>(comparator, equals),
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

class Reversed<E> extends BinarySearchTree<E> {
  public tree: BinarySearchTree<E>;

  constructor(collection: SortedCollection<E>) {
    super(null);
    this.tree = collection as BinarySearchTree<E>;
  }

  public add(element: E): SortedCollection<E> {
    return new Reversed<E>(this.tree.add(element));
  }

  public remove(element: E): SortedCollection<E> {
    return new Reversed<E>(this.tree.remove(element));
  }

  public union(collection: Iterable<E>): SortedCollection<E> {
    return new Reversed<E>(this.tree.union(collection));
  }

  public intersection(collection: Iterable<E>): SortedCollection<E> {
    return new Reversed<E>(this.tree.intersection(collection));
  }

  public except(collection: Iterable<E>): SortedCollection<E> {
    return new Reversed<E>(this.tree.except(collection));
  }

  public clear(): SortedCollection<E> {
    return new Reversed<E>(this.tree.clear());
  }

  public search(element: E, node: Node<E>): Node<E> {
    return this.tree.search(element, node);
  }

  public contains(element: E): boolean {
    return this.tree.contains(element);
  }

  public containsAll(collection: Iterable<E>): boolean {
    return this.tree.containsAll(collection);
  }

  public isEmpty(): boolean {
    return this.tree.isEmpty();
  }

  public size(): number {
    return this.tree.size();
  }

  public min(): E {
    return this.tree.max();
  }

  public max(): E {
    return this.tree.min();
  }

  public nth(index: number): E {
    let i = 0;
    for (let element of this) {
      if (i++ == index) {
        return element;
      }
    }
    throw new RangeError();
  }

  public slice(lower?: number, upper?: number): SortedCollection<E> {
    const min = lower < 0 ? this.size() + lower : lower;
    const max = upper < 0 ? this.size() + upper : upper;
    let i = 0;
    let tree: SortedCollection<E> = this;
    for (let element of this) {
      if (i < min || i >= max) {
        tree = tree.remove(element);
      }
      i++;
    }
    return tree;
  }

  public reverse(): SortedCollection<E> {
    return this.tree;
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
        yield* visit(node.right);
        yield node.element;
        yield* visit(node.left);
      }
    }
    return visit(this.tree.root);
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
    mapper: Function<E, R>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new Reversed<R>(new BinarySearchTree<R>(comparator, equals)),
      (tree, element) => tree.add(mapper(element))
    );
  }

  public flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new Reversed<R>(new BinarySearchTree<R>(comparator, equals)),
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
