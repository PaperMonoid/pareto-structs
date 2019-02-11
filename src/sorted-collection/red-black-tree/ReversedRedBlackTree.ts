import AbstractRedBlackTree from "./AbstractRedBlackTree";
import Comparator from "../../function/Comparator";
import Equals from "../../function/Equals";
import ListIterator from "../ListIterator";
import Node from "./Node";
import Optional from "../../data/Optional";
import SortedCollection from "../SortedCollection";
import ReversedListIterator from "../ReversedListIterator";

class ReversedRedBlackTree<E> extends AbstractRedBlackTree<E> {
  public tree: AbstractRedBlackTree<E>;

  public constructor(collection: SortedCollection<E>) {
    let tree = collection as AbstractRedBlackTree<E>;
    super(tree.factory, null);
    this.tree = tree;
  }

  public setRoot(node: Node<E>): AbstractRedBlackTree<E> {
    return new ReversedRedBlackTree<E>(this.tree.setRoot(node));
  }

  public setCount(count: number): AbstractRedBlackTree<E> {
    return new ReversedRedBlackTree<E>(this.tree.setCount(count));
  }

  public add(element: E): SortedCollection<E> {
    return new ReversedRedBlackTree<E>(this.tree.add(element));
  }

  public remove(element: E): SortedCollection<E> {
    return new ReversedRedBlackTree<E>(this.tree.remove(element));
  }

  public union(collection: Iterable<E>): SortedCollection<E> {
    return new ReversedRedBlackTree<E>(this.tree.union(collection));
  }

  public intersection(collection: Iterable<E>): SortedCollection<E> {
    return new ReversedRedBlackTree<E>(this.tree.intersection(collection));
  }

  public except(collection: Iterable<E>): SortedCollection<E> {
    return new ReversedRedBlackTree<E>(this.tree.except(collection));
  }

  public clear(): SortedCollection<E> {
    return new ReversedRedBlackTree<E>(this.tree.clear());
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
    return new ReversedListIterator<E>(this.tree.listIterator());
  }
}

export default ReversedRedBlackTree;
