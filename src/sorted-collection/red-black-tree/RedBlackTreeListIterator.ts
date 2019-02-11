import AbstractRedBlackTree from "./AbstractRedBlackTree";
import ListIterator from "../ListIterator";
import Node from "./Node";
import Optional from "../../data/Optional";

class RedBlackTreeListIterator<E> implements ListIterator<E> {
  public readonly tree: AbstractRedBlackTree<E>;
  public node: Node<E>;

  public constructor(tree: AbstractRedBlackTree<E>) {
    this.tree = tree;
    this.node = tree.root;
  }

  public head(): void {
    if (this.tree.root) {
      this.node = this.tree.root.min();
    }
  }

  public last(): void {
    if (this.tree.root) {
      this.node = this.tree.root.max();
    }
  }

  private searchElement(element: E, node: Node<E>): Optional<Node<E>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.tree.comparator(element, node.element);
    if (comparison == 0 && this.tree.equals(element, node.element)) {
      return Optional.ofValue(node);
    } else if (comparison > 0) {
      return this.searchElement(element, node.right);
    } else {
      return this.searchElement(element, node.left);
    }
  }

  public search(value: E): void {
    const optionalNode = this.searchElement(value, this.tree.root);
    if (optionalNode.isPresent()) {
      this.node = optionalNode.getValue();
    }
  }

  private previousElement(current: Node<E>, node: Node<E>): Optional<Node<E>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.tree.comparator(current.element, node.element);
    if (comparison == 0 && current == node) {
      return Optional.ofValue(node.left && node.left.max());
    } else if (comparison > 0) {
      return this.previousElement(current, node.right).map(
        next => next || node
      );
    } else {
      return this.previousElement(current, node.left);
    }
  }

  public previous(): { value: E; done: boolean } {
    return this.previousElement(this.node, this.tree.root)
      .flatMap(node => Optional.ofNullable(node)) // TODO review this line
      .map(node => node.element)
      .map(value => ({ value: value, done: false }))
      .orValue({ value: undefined, done: true });
  }

  private nextElement(current: Node<E>, node: Node<E>): Optional<Node<E>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.tree.comparator(current.element, node.element);
    if (comparison == 0 && current == node) {
      return Optional.ofValue(node.right && node.right.min());
    } else if (comparison > 0) {
      return this.nextElement(current, node.right);
    } else {
      return this.nextElement(current, node.left).map(next => next || node);
    }
  }

  public next(): { value: E; done: boolean } {
    return this.nextElement(this.node, this.tree.root)
      .flatMap(node => Optional.ofNullable(node)) // TODO review this line
      .map(node => node.element)
      .map(value => ({ value: value, done: false }))
      .orValue({ value: undefined, done: true });
  }
}

export default RedBlackTreeListIterator;
