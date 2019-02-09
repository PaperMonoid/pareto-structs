import AbstractBinarySearchTree from "./AbstractBinarySearchTree";
import Comparator from "../../function/Comparator";
import Equals from "../../function/Equals";
import ListIterator from "../ListIterator";
import Node from "./Node";
import Optional from "../../data/Optional";
import SortedCollection from "../SortedCollection";

class ReversedBinarySearchTree<E> extends AbstractBinarySearchTree<E> {
  public tree: AbstractBinarySearchTree<E>;

  public constructor(collection: SortedCollection<E>) {
    let tree = collection as AbstractBinarySearchTree<E>;
    super(tree.factory, null);
    this.tree = tree;
  }

  public setRoot(node: Node<E>): AbstractBinarySearchTree<E> {
    return new ReversedBinarySearchTree<E>(this.tree.setRoot(node));
  }

  public setCount(count: number): AbstractBinarySearchTree<E> {
    return new ReversedBinarySearchTree<E>(this.tree.setCount(count));
  }

  public add(element: E): SortedCollection<E> {
    return new ReversedBinarySearchTree<E>(this.tree.add(element));
  }

  public remove(element: E): SortedCollection<E> {
    return new ReversedBinarySearchTree<E>(this.tree.remove(element));
  }

  public union(collection: Iterable<E>): SortedCollection<E> {
    return new ReversedBinarySearchTree<E>(this.tree.union(collection));
  }

  public intersection(collection: Iterable<E>): SortedCollection<E> {
    return new ReversedBinarySearchTree<E>(this.tree.intersection(collection));
  }

  public except(collection: Iterable<E>): SortedCollection<E> {
    return new ReversedBinarySearchTree<E>(this.tree.except(collection));
  }

  public clear(): SortedCollection<E> {
    return new ReversedBinarySearchTree<E>(this.tree.clear());
  }

  public search(element: E): Optional<E> {
    return this.tree.search(element);
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

  public listIterator(): ListIterator<E> {
    throw new ReferenceError("Not immplemented");
  }
}

export default ReversedBinarySearchTree;
