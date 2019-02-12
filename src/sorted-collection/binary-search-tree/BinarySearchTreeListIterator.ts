import AbstractBinarySearchTree from "./AbstractBinarySearchTree";
import ListIterator from "../list-iterator";
import Node from "./Node";
import { Optional } from "../../data";

enum ListIteratorState {
  Head,
  Middle,
  Last
}

class BinarySearchTreeListIterator<E> implements ListIterator<E> {
  public readonly tree: AbstractBinarySearchTree<E>;
  public node: Node<E>;
  public state: ListIteratorState;

  public constructor(tree: AbstractBinarySearchTree<E>) {
    this.tree = tree;
    this.node = null;
    this.state = ListIteratorState.Head;
  }

  public head(): void {
    this.node = null;
    this.state = ListIteratorState.Head;
  }

  public last(): void {
    this.node = null;
    this.state = ListIteratorState.Last;
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
      this.state = ListIteratorState.Middle;
    }
  }

  private previousElement(current: Node<E>, node: Node<E>): Optional<Node<E>> {
    if (!node || !current) {
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
    if (this.state == ListIteratorState.Last && this.tree.root) {
      this.state = ListIteratorState.Middle;
      this.node = this.tree.root.max();
      return { value: this.node.element, done: false };
    }
    const optionalPrevious = this.previousElement(
      this.node,
      this.tree.root
    ).flatMap(node => Optional.ofNullable(node));
    if (optionalPrevious.isPresent()) {
      this.state = ListIteratorState.Middle;
      this.node = optionalPrevious.getValue();
      return { value: this.node.element, done: false };
    } else {
      this.state = ListIteratorState.Head;
      this.node = null;
      return { value: undefined, done: true };
    }
  }

  private nextElement(current: Node<E>, node: Node<E>): Optional<Node<E>> {
    if (!node || !current) {
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
    if (this.state == ListIteratorState.Head && this.tree.root) {
      this.state = ListIteratorState.Middle;
      this.node = this.tree.root.min();
      return { value: this.node.element, done: false };
    }
    const optionalNext = this.nextElement(this.node, this.tree.root).flatMap(
      node => Optional.ofNullable(node)
    );
    if (optionalNext.isPresent()) {
      this.state = ListIteratorState.Middle;
      this.node = optionalNext.getValue();
      return { value: this.node.element, done: false };
    } else {
      this.state = ListIteratorState.Last;
      this.node = null;
      return { value: undefined, done: true };
    }
  }
}

export default BinarySearchTreeListIterator;
