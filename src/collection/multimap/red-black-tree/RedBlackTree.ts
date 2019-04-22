import AbstractRedBlackTree from "./AbstractRedBlackTree";
import Color from "./Color";
import ListIterator from "../list-iterator";
import Node from "./Node";
import RedBlackTreeFactory from "./RedBlackTreeFactory";
import RedBlackTreeListIterator from "./RedBlackTreeListIterator";
import ReversedRedBlackTree from "./ReversedRedBlackTree";
import SortedCollection from "../SortedCollection";
import { Comparator, Equals } from "../../function";
import { Optional } from "../../data";

export default class RedBlackTree<E> extends AbstractRedBlackTree<E> {
  constructor(
    comparator: Comparator<E>,
    equals?: Equals<E>,
    root?: Node<E>,
    count?: number
  ) {
    super(RedBlackTreeFactory.getInstance(), comparator, equals, root, count);
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
