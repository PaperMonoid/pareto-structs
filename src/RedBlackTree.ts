import BiFunction from "./Function/BiFunction";
import Comparator from "./Function/Comparator";
import Consumer from "./Function/Consumer";
import Equals from "./Function/Equals";
import Function from "./Function/Function";
import Predicate from "./Function/Predicate";
import SortedCollection from "./SortedCollection";
import StrictEquality from "./Function/StrictEquality";

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
    this.root = root;
    this.count = count || 0;
    this.equals = equals || StrictEquality;
  }

  private rotateRight(node: Node<E>): Node<E> {
    if (node == null) {
      return null;
    }
    if (node.left == null) {
      return node;
    }
    return new Node<E>(
      node.left.element,
      node.left.color,
      node.left.left,
      new Node<E>(node.element, node.color, node.left.right, node.right)
    );
  }

  private rotateLeft(node: Node<E>): Node<E> {
    if (node == null) {
      return null;
    }
    if (node.right == null) {
      return node;
    }
    return new Node<E>(
      node.right.element,
      node.right.color,
      new Node<E>(node.element, node.color, node.left, node.right.left),
      node.right.right
    );
  }

  private makeBlack(node: Node<E>): Node<E> {
    if (node == null) {
      return null;
    } else if (node.color != Color.Black) {
      return new Node<E>(node.element, Color.Black, node.left, node.right);
    } else {
      return node;
    }
  }

  private balance(node: Node<E>): Node<E> {
    if (node.color == Color.Black) {
      if (node.left != null && node.left.color == Color.Red) {
        if (node.left.left != null && node.left.left.color == Color.Red) {
          const rotated = this.rotateRight(node);
          return new Node<E>(
            rotated.element,
            Color.Red,
            this.makeBlack(rotated.left),
            rotated.right
          );
        }
        if (node.left.right != null && node.left.right.color == Color.Red) {
          const rotated = this.rotateRight(
            new Node<E>(
              node.element,
              node.color,
              this.rotateLeft(node.left),
              node.right
            )
          );
          return new Node<E>(
            rotated.element,
            Color.Red,
            this.makeBlack(rotated.left),
            rotated.right
          );
        }
      }
      if (node.right != null && node.right.color == Color.Red) {
        if (node.right.right != null && node.right.right.color == Color.Red) {
          const rotated = this.rotateLeft(node);
          return new Node<E>(
            rotated.element,
            Color.Red,
            rotated.left,
            this.makeBlack(rotated.right)
          );
        }
        if (node.right.left != null && node.right.left.color == Color.Red) {
          const rotated = this.rotateLeft(
            new Node<E>(
              node.element,
              node.color,
              node.left,
              this.rotateRight(node.right)
            )
          );
          return new Node<E>(
            rotated.element,
            Color.Red,
            rotated.left,
            this.makeBlack(rotated.right)
          );
        }
      }
    }
    return node;
  }

  private addNode(newNode: Node<E>, node: Node<E>): Node<E> {
    if (newNode == null) {
      return node;
    } else if (node == null) {
      return newNode;
    } else if (this.comparator(newNode.element, node.element) > 0) {
      return this.balance(
        new Node<E>(
          node.element,
          node.color,
          node.left,
          this.addNode(newNode, node.right)
        )
      );
    } else {
      return this.balance(
        new Node<E>(
          node.element,
          node.color,
          this.addNode(newNode, node.left),
          node.right
        )
      );
    }
  }

  public add(element: E): SortedCollection<E> {
    return new RedBlackTree<E>(
      this.comparator,
      this.equals,
      this.makeBlack(this.addNode(new Node<E>(element, Color.Red), this.root)),
      this.count + 1
    );
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
