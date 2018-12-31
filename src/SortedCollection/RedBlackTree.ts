import BiFunction from "../Function/BiFunction";
import Comparator from "../Function/Comparator";
import Consumer from "../Function/Consumer";
import Equals from "../Function/Equals";
import Function from "../Function/Function";
import Optional from "../Data/Optional";
import Predicate from "../Function/Predicate";
import SortedCollection from "./SortedCollection";
import StrictEquality from "../Function/StrictEquality";

enum Color {
  Red,
  Black
}

class Node<E> {
  public readonly element: E;
  public readonly color: Color;
  public readonly left: Node<E>;
  public readonly right: Node<E>;

  public constructor(
    element: E,
    color: Color,
    left?: Node<E>,
    right?: Node<E>
  ) {
    this.element = element;
    this.color = color;
    this.left = left;
    this.right = right;
  }

  private removeMin(): Node<E>[] {
    if (!this.left) {
      return [this.right, this];
    } else {
      const [replaced, minimum] = this.left.removeMin();
      return [this.setLeft(replaced), minimum];
    }
  }

  public replaceWithSuccessor(): Node<E> {
    if (!this.right) {
      return this.left;
    } else {
      const [replaced, successor] = this.right.removeMin();
      return this.setRight(replaced).setElement(successor.element);
    }
  }

  public setElement(element: E): Node<E> {
    return new Node<E>(element, this.color, this.left, this.right);
  }

  public setColor(color: Color): Node<E> {
    return new Node<E>(this.element, color, this.left, this.right);
  }

  public setLeft(node: Node<E>): Node<E> {
    return new Node<E>(this.element, this.color, node, this.right);
  }

  public setRight(node: Node<E>): Node<E> {
    return new Node<E>(this.element, this.color, this.left, node);
  }

  public min(): Node<E> {
    if (!this.left) {
      return this;
    } else {
      return this.left.min();
    }
  }

  public max(): Node<E> {
    if (!this.right) {
      return this;
    } else {
      return this.right.max();
    }
  }

  public rotateRight(): Node<E> {
    if (!this.left) {
      return this;
    }
    return this.left.setRight(this.setLeft(this.left.right));
  }

  public rotateLeft(): Node<E> {
    if (!this.right) {
      return this;
    }
    return this.right.setLeft(this.setRight(this.right.left));
  }
}

class RedBlackTree<E> implements SortedCollection<E> {
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
    this.equals = equals || StrictEquality;
    this.root = root;
    this.count = count || 0;
  }

  public setRoot(node: Node<E>): RedBlackTree<E> {
    return new RedBlackTree<E>(
      this.comparator,
      this.equals,
      node && node.setColor(Color.Black),
      this.count
    );
  }

  public setCount(count: number): RedBlackTree<E> {
    return new RedBlackTree<E>(this.comparator, this.equals, this.root, count);
  }

  private balance(node: Node<E>): Node<E> {
    if (node.color == Color.Black) {
      if (node.left && node.left.color == Color.Red) {
        if (node.left.left && node.left.left.color == Color.Red) {
          const rotated = node.rotateRight();
          return rotated
            .setLeft(rotated.left.setColor(Color.Black))
            .setColor(Color.Red);
        }
        if (node.left.right && node.left.right.color == Color.Red) {
          const rotated = node.setLeft(node.left.rotateLeft()).rotateRight();
          return rotated
            .setLeft(rotated.left.setColor(Color.Black))
            .setColor(Color.Red);
        }
      }
      if (node.right && node.right.color == Color.Red) {
        if (node.right.right && node.right.right.color == Color.Red) {
          const rotated = node.rotateLeft();
          return rotated
            .setRight(rotated.right.setColor(Color.Black))
            .setColor(Color.Red);
        }
        if (node.right.left && node.right.left.color == Color.Red) {
          const rotated = node.setRight(node.right.rotateRight()).rotateLeft();
          return rotated
            .setRight(rotated.right.setColor(Color.Black))
            .setColor(Color.Red);
        }
      }
    }
    return node;
  }

  private addNode(newNode: Node<E>, node: Node<E>): Node<E> {
    if (!newNode) {
      return node;
    } else if (!node) {
      return newNode;
    } else if (this.comparator(newNode.element, node.element) > 0) {
      return this.balance(node.setRight(this.addNode(newNode, node.right)));
    } else {
      return this.balance(node.setLeft(this.addNode(newNode, node.left)));
    }
  }

  public add(element: E): SortedCollection<E> {
    return this.setRoot(
      this.addNode(new Node<E>(element, Color.Red), this.root)
    ).setCount(this.count + 1);
  }

  public remove(element: E): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public union(collection: Iterable<E>): SortedCollection<E> {
    let tree = this as SortedCollection<E>;
    for (let element of collection) {
      tree = tree.add(element);
    }
    return tree;
  }

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
    return new RedBlackTree<E>(this.comparator, this.equals);
  }

  public search(element: E, node: Node<E>): Node<E> {
    if (!node) {
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
    if (!this.root) {
      throw new RangeError();
    } else {
      return this.root.min().element;
    }
  }

  public max(): E {
    if (!this.root) {
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
    throw new ReferenceError();
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
      if (node) {
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
    equals: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new RedBlackTree<R>(comparator, equals),
      (tree, element) => tree.add(mapper(element))
    );
  }

  public flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      new RedBlackTree<R>(comparator, equals),
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

export default RedBlackTree;
