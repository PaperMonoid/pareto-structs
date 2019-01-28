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

  constructor(element: E, color: Color, left?: Node<E>, right?: Node<E>) {
    this.element = element;
    this.color = color;
    this.left = left;
    this.right = right;
  }

  public static isBlack(node: Node<any>): boolean {
    if (node) {
      return node.color == Color.Black;
    }
    return true;
  }

  public static isRed(node: Node<any>): boolean {
    if (node) {
      return node.color == Color.Red;
    }
    return false;
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

  public fixRedViolation(): Node<E> {
    if (Node.isBlack(this)) {
      if (Node.isRed(this.left)) {
        if (Node.isRed(this.left.left)) {
          const rotated = this.rotateRight();
          return rotated
            .setLeft(rotated.left.setColor(Color.Black))
            .setColor(Color.Red);
        }
        if (Node.isRed(this.left.right)) {
          const rotated = this.setLeft(this.left.rotateLeft()).rotateRight();
          return rotated
            .setLeft(rotated.left.setColor(Color.Black))
            .setColor(Color.Red);
        }
      }
      if (Node.isRed(this.right)) {
        if (Node.isRed(this.right.right)) {
          const rotated = this.rotateLeft();
          return rotated
            .setRight(rotated.right.setColor(Color.Black))
            .setColor(Color.Red);
        }
        if (Node.isRed(this.right.left)) {
          const rotated = this.setRight(this.right.rotateRight()).rotateLeft();
          return rotated
            .setRight(rotated.right.setColor(Color.Black))
            .setColor(Color.Red);
        }
      }
    }
    return this;
  }

  public hasRedViolation() {
    if (Node.isBlack(this)) {
      if (Node.isRed(this.left)) {
        return Node.isRed(this.left.left) || Node.isRed(this.left.right);
      }
      if (Node.isRed(this.right)) {
        return Node.isRed(this.right.left) || Node.isRed(this.right.right);
      }
    }
    return false;
  }

  public shouldFix() {
    return Node.isBlack(this) && !this.right && !this.left;
  }

  public fixRightViolation(fix: boolean): [Node<E>, boolean] {
    if (fix && this.left) {
      if (
        Node.isRed(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        return [
          this.setColor(Color.Black)
            .setLeft(this.left.setColor(Color.Red))
            .fixRedViolation()
            .setColor(Color.Black),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isRed(this.left) &&
        Node.isBlack(this.right) &&
        this.left.left &&
        this.left.right
      ) {
        const rotated = this.setLeft(this.left.rotateLeft()).rotateRight();
        return [
          rotated.setLeft(
            rotated.left
              .setColor(Color.Black)
              .setLeft(rotated.left.left.setColor(Color.Red))
              .fixRedViolation() // don't repaint it black for whatever reason
          ),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        const node = this.setLeft(this.left.setColor(Color.Red));
        return [
          node.fixRedViolation().setColor(Color.Black),
          !node.hasRedViolation()
        ];
      }
    }
    return [this, fix];
  }

  public fixLeftViolation(fix: boolean): [Node<E>, boolean] {
    if (fix && this.right) {
      if (
        Node.isRed(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        return [
          this.setColor(Color.Black)
            .setRight(this.right.setColor(Color.Red))
            .fixRedViolation()
            .setColor(Color.Black),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isBlack(this.left) &&
        Node.isRed(this.right) &&
        this.right.left &&
        this.right.right
      ) {
        const rotated = this.setRight(this.right.rotateRight()).rotateLeft();
        return [
          rotated.setRight(
            rotated.right
              .setColor(Color.Black)
              .setRight(rotated.right.right.setColor(Color.Red))
              .fixRedViolation() // don't repaint it black for whatever reason
          ),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        const node = this.setRight(this.right.setColor(Color.Red));
        return [
          node.fixRedViolation().setColor(Color.Black),
          !node.hasRedViolation()
        ];
      }
    }
    return [this, fix];
  }

  private removeMin(): [Node<E>, Node<E>, boolean] {
    if (!this.left && !this.right) {
      return [null, this, this.shouldFix()];
    } else if (!this.left) {
      return [this.right.setColor(this.color), this, this.right.shouldFix()];
    } else {
      const [replaced, minimum, fix] = this.left.removeMin();
      const [_replaced, _fix] = this.setLeft(replaced).fixLeftViolation(fix);
      return [_replaced, minimum, _fix];
    }
  }

  public replaceWithSuccessor(): [Node<E>, boolean] {
    if (!this.right && !this.left) {
      return [null, this.shouldFix()];
    } else if (!this.right) {
      return [this.left.setColor(this.color), this.left.shouldFix()];
    } else {
      const [replaced, successor, fix] = this.right.removeMin();
      return this.setRight(replaced)
        .setElement(successor.element)
        .fixRightViolation(fix);
    }
  }
}

class RedBlackTree<E> extends SortedCollection<E> {
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
    super();
    this.comparator = comparator;
    this.equals = equals || StrictEquality;
    this.root = root;
    this.count = count || 0;
  }

  public static create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E> {
    return new RedBlackTree<E>(comparator, equals);
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

  private addNode(newNode: Node<E>, node: Node<E>): Node<E> {
    if (!newNode) {
      return node;
    } else if (!node) {
      return newNode;
    } else if (this.comparator(newNode.element, node.element) > 0) {
      return node.setRight(this.addNode(newNode, node.right)).fixRedViolation();
    } else {
      return node.setLeft(this.addNode(newNode, node.left)).fixRedViolation();
    }
  }

  public add(element: E): SortedCollection<E> {
    return this.setRoot(
      this.addNode(new Node<E>(element, Color.Red), this.root)
    ).setCount(this.count + 1);
  }

  private removeNode(element: E, node: Node<E>): Optional<[Node<E>, boolean]> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(element, node.element);
    if (comparison == 0 && this.equals(element, node.element)) {
      return Optional.ofValue(node.replaceWithSuccessor());
    } else if (comparison > 0) {
      return this.removeNode(element, node.right).map(([removed, fix]) =>
        node.setRight(removed).fixRightViolation(fix)
      );
    } else {
      return this.removeNode(element, node.left).map(([removed, fix]) =>
        node.setLeft(removed).fixLeftViolation(fix)
      );
    }
  }

  public remove(element: E): SortedCollection<E> {
    const tree = this;
    return this.removeNode(element, this.root)
      .map(([replaced, fix]) => tree.setRoot(replaced).setCount(tree.count - 1))
      .orValue(this);
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

  private searchElement(element: E, node: Node<E>): Optional<Node<E>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(element, node.element);
    if (comparison == 0 && this.equals(element, node.element)) {
      return Optional.ofValue(node);
    } else if (comparison > 0) {
      return this.searchElement(element, node.right);
    } else {
      return this.searchElement(element, node.left);
    }
  }

  public search(element: E): Optional<E> {
    return this.searchElement(element, this.root).map(node => node.element);
  }

  private nextElement(element: E, node: Node<E>): Optional<Node<E>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(element, node.element);
    if (comparison == 0 && this.equals(element, node.element)) {
      return Optional.ofValue(node.right && node.right.min());
    } else if (comparison > 0) {
      return this.nextElement(element, node.right);
    } else {
      return this.nextElement(element, node.left).map(next => next || node);
    }
  }

  public next(element: E): Optional<E> {
    return this.nextElement(element, this.root)
      .flatMap(node => Optional.ofNullable(node))
      .map(node => node.element);
  }

  private previousElement(element: E, node: Node<E>): Optional<Node<E>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(element, node.element);
    if (comparison == 0 && this.equals(element, node.element)) {
      return Optional.ofValue(node.left && node.left.max());
    } else if (comparison > 0) {
      return this.previousElement(element, node.right).map(
        next => next || node
      );
    } else {
      return this.previousElement(element, node.left);
    }
  }

  public previous(element: E): Optional<E> {
    return this.previousElement(element, this.root)
      .flatMap(node => Optional.ofNullable(node))
      .map(node => node.element);
  }

  public contains(element: E): boolean {
    return this.search(element).isPresent();
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

  public min(): Optional<E> {
    if (!this.root) {
      return Optional.empty();
    } else {
      return Optional.ofValue(this.root.min().element);
    }
  }

  public max(): Optional<E> {
    if (!this.root) {
      return Optional.empty();
    } else {
      return Optional.ofValue(this.root.max().element);
    }
  }

  public nth(index: number): Optional<E> {
    let i = 0;
    for (let element of this) {
      if (i++ == index) {
        return Optional.ofValue(element);
      }
    }
    return Optional.empty();
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

class Reversed<E> extends RedBlackTree<E> {
  public tree: RedBlackTree<E>;

  constructor(collection: SortedCollection<E>) {
    super(null);
    this.tree = collection as RedBlackTree<E>;
  }

  public setRoot(node: Node<E>): RedBlackTree<E> {
    return new Reversed<E>(this.tree.setRoot(node));
  }

  public setCount(count: number): RedBlackTree<E> {
    return new Reversed<E>(this.tree.setCount(count));
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

  public search(element: E): Optional<E> {
    return this.tree.search(element);
  }

  public next(element: E): Optional<E> {
    return this.tree.previous(element);
  }

  public previous(element: E): Optional<E> {
    return this.tree.next(element);
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

  public min(): Optional<E> {
    return this.tree.max();
  }

  public max(): Optional<E> {
    return this.tree.min();
  }

  public reverse(): SortedCollection<E> {
    return this.tree;
  }

  public [Symbol.iterator](): Iterator<E> {
    function* visit(node: Node<E>) {
      if (node) {
        yield* visit(node.right);
        yield node.element;
        yield* visit(node.left);
      }
    }
    return visit(this.tree.root);
  }
}

export default RedBlackTree;
