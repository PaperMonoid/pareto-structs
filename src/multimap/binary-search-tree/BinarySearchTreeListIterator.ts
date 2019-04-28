import BinarySearchTree from "./BinarySearchTree";
import Node from "./Node";
import { ListIterator } from "../../list";
import { Optional } from "../../data";

enum ListIteratorState {
  Head,
  Middle,
  Last,
  NotFound
}

class BinarySearchTreeListIterator<K, V> implements ListIterator<[K, V]> {
  readonly tree: BinarySearchTree<K, V>;
  node: Node<K, V>;
  state: ListIteratorState;
  index: number;

  constructor(tree: BinarySearchTree<K, V>, key: K) {
    this.tree = tree;
    this.node = null;
    this.state = ListIteratorState.Head;
    this.index = -1;
    this.search(key);
  }

  head(): void {
    this.node = null;
    this.state = ListIteratorState.Head;
    this.index = -1;
  }

  last(): void {
    this.node = null;
    this.state = ListIteratorState.Last;
    this.index = -1;
  }

  private searchKey(key: K, node: Node<K, V>): Optional<Node<K, V>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.tree.comparator(key, node.key);
    if (comparison == 0) {
      return Optional.ofValue(node);
    } else if (comparison > 0) {
      return this.searchKey(key, node.right);
    } else {
      return this.searchKey(key, node.left);
    }
  }

  private search(key: K): void {
    const optionalNode = this.searchKey(key, this.tree.root);
    if (optionalNode.isPresent()) {
      this.index = 0;
      this.node = optionalNode.getValue();
      this.state = ListIteratorState.Middle;
    } else {
      this.node = null;
      this.state = ListIteratorState.NotFound;
      this.index = -1;
    }
  }

  private previousValue(
    current: Node<K, V>,
    node: Node<K, V>
  ): Optional<Node<K, V>> {
    if (!node || !current) {
      return Optional.empty();
    }
    const comparison = this.tree.comparator(current.key, node.key);
    if (comparison == 0 && current == node) {
      return Optional.ofValue(node.left && node.left.max());
    } else if (comparison > 0) {
      return this.previousValue(current, node.right).map(next => next || node);
    } else {
      return this.previousValue(current, node.left);
    }
  }

  previous(): { value: [K, V]; done: boolean } {
    if (this.state == ListIteratorState.NotFound) {
      return { value: undefined, done: true };
    }
    if (this.state == ListIteratorState.Last && this.tree.root) {
      this.state = ListIteratorState.Middle;
      this.node = this.tree.root.max();
      this.index = this.node.values.length - 1;
      return {
        value: [this.node.key, this.node.values[this.index]],
        done: false
      };
    }
    if (this.node && --this.index >= 0) {
      return {
        value: [this.node.key, this.node.values[this.index]],
        done: false
      };
    }
    const optionalPrevious = this.previousValue(
      this.node,
      this.tree.root
    ).flatMap(node => Optional.ofNullable(node));
    if (optionalPrevious.isPresent()) {
      this.state = ListIteratorState.Middle;
      this.node = optionalPrevious.getValue();
      this.index = this.node.values.length - 1;
      return {
        value: [this.node.key, this.node.values[this.index]],
        done: false
      };
    } else {
      this.state = ListIteratorState.Head;
      this.node = null;
      this.index = -1;
      return { value: undefined, done: true };
    }
  }

  private nextValue(
    current: Node<K, V>,
    node: Node<K, V>
  ): Optional<Node<K, V>> {
    if (!node || !current) {
      return Optional.empty();
    }
    const comparison = this.tree.comparator(current.key, node.key);
    if (comparison == 0 && current == node) {
      return Optional.ofValue(node.right && node.right.min());
    } else if (comparison > 0) {
      return this.nextValue(current, node.right);
    } else {
      return this.nextValue(current, node.left).map(next => next || node);
    }
  }

  public next(): { value: [K, V]; done: boolean } {
    if (this.state == ListIteratorState.NotFound) {
      return { value: undefined, done: true };
    }
    if (this.state == ListIteratorState.Head && this.tree.root) {
      this.state = ListIteratorState.Middle;
      this.node = this.tree.root.min();
      this.index = 0;
      return {
        value: [this.node.key, this.node.values[this.index]],
        done: false
      };
    }
    if (this.node && ++this.index < this.node.values.length) {
      return {
        value: [this.node.key, this.node.values[this.index]],
        done: false
      };
    }
    const optionalNext = this.nextValue(this.node, this.tree.root).flatMap(
      node => Optional.ofNullable(node)
    );
    if (optionalNext.isPresent()) {
      this.state = ListIteratorState.Middle;
      this.node = optionalNext.getValue();
      this.index = 0;
      return {
        value: [this.node.key, this.node.values[this.index]],
        done: false
      };
    } else {
      this.state = ListIteratorState.Last;
      this.node = null;
      this.index = -1;
      return { value: undefined, done: true };
    }
  }
}

export default BinarySearchTreeListIterator;
