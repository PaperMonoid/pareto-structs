import AbstractBinarySearchTree from "./AbstractBinarySearchTree";
import BinarySearchTreeFactory from "./BinarySearchTreeFactory";
import BinarySearchTreeListIterator from "./BinarySearchTreeListIterator";
import Comparator from "../../function/Comparator";
import Equals from "../../function/Equals";
import ListIterator from "../ListIterator";
import Node from "./Node";
import Optional from "../../data/Optional";
import ReversedBinarySearchTree from "./ReversedBinarySearchTree";
import SortedCollection from "../SortedCollection";

export default class BinarySearchTree<E> extends AbstractBinarySearchTree<E> {
  public constructor(
    comparator: Comparator<E>,
    equals?: Equals<E>,
    root?: Node<E>,
    count?: number
  ) {
    super(
      BinarySearchTreeFactory.getInstance(),
      comparator,
      equals,
      root,
      count
    );
  }

  public setRoot(node: Node<E>): AbstractBinarySearchTree<E> {
    return new BinarySearchTree<E>(
      this.comparator,
      this.equals,
      node,
      this.count
    );
  }

  public setCount(count: number): AbstractBinarySearchTree<E> {
    return new BinarySearchTree<E>(
      this.comparator,
      this.equals,
      this.root,
      count
    );
  }

  private addNode(newNode: Node<E>, node: Node<E>): Node<E> {
    if (!newNode) {
      return node;
    } else if (!node) {
      return newNode;
    } else if (this.comparator(newNode.element, node.element) > 0) {
      return node.setRight(this.addNode(newNode, node.right));
    } else {
      return node.setLeft(this.addNode(newNode, node.left));
    }
  }

  public add(element: E): SortedCollection<E> {
    const node = this.addNode(new Node<E>(element), this.root);
    return this.setRoot(node).setCount(this.count + 1);
  }

  private removeNode(element: E, node: Node<E>): Optional<Node<E>> {
    if (!node) {
      return Optional.empty();
    }
    const comparison = this.comparator(element, node.element);
    if (comparison == 0 && this.equals(element, node.element)) {
      return Optional.ofValue(node.replaceWithSuccessor());
    } else if (comparison > 0) {
      return this.removeNode(element, node.right).map(node.setRight.bind(node));
    } else {
      return this.removeNode(element, node.left).map(node.setLeft.bind(node));
    }
  }

  public remove(element: E): SortedCollection<E> {
    const tree = this;
    return this.removeNode(element, this.root)
      .map(replaced => tree.setRoot(replaced).setCount(tree.count - 1))
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
    return new ReversedBinarySearchTree<E>(this);
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
    return new BinarySearchTreeListIterator<E>(this);
  }
}
