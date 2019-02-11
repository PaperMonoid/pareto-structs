import AbstractRedBlackTree from "./AbstractRedBlackTree";
import BiFunction from "../../function/BiFunction";
import Color from "./Color";
import Comparator from "../../function/Comparator";
import Consumer from "../../function/Consumer";
import Equals from "../../function/Equals";
import Function from "../../function/Function";
import ListIterator from "../ListIterator";
import Node from "./Node";
import Optional from "../../data/Optional";
import Predicate from "../../function/Predicate";
import RedBlackTreeFactory from "./RedBlackTreeFactory";
import RedBlackTreeListIterator from "./RedBlackTreeListIterator";
import ReversedRedBlackTree from "./ReversedRedBlackTree";
import SortedCollection from "../SortedCollection";
import StrictEquality from "../../function/StrictEquality";

export default class RedBlackTree<E> extends AbstractRedBlackTree<E> {
  constructor(
    comparator: Comparator<E>,
    equals?: Equals<E>,
    root?: Node<E>,
    count?: number
  ) {
    super(RedBlackTreeFactory.getInstance(), comparator, equals, root, count);
  }

  public static create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E> {
    return new RedBlackTree<E>(comparator, equals);
  }

  public setRoot(node: Node<E>): AbstractRedBlackTree<E> {
    return new RedBlackTree<E>(
      this.comparator,
      this.equals,
      node && node.setColor(Color.Black),
      this.count
    );
  }

  public setCount(count: number): AbstractRedBlackTree<E> {
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

  public reverse(): SortedCollection<E> {
    return new ReversedRedBlackTree<E>(this);
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

  public listIterator(): ListIterator<E> {
    return new RedBlackTreeListIterator<E>(this);
  }
}
