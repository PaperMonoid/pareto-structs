import AbstractBinarySearchTree from "./AbstractBinarySearchTree";
import BiFunction from "../../function/BiFunction";
import Comparator from "../../function/Comparator";
import Consumer from "../../function/Consumer";
import Equals from "../../function/Equals";
import Function from "../../function/Function";
import ListIterator from "../ListIterator";
import Node from "./Node";
import Optional from "../../data/Optional";
import Predicate from "../../function/Predicate";
import SortedCollection from "../SortedCollection";
import StrictEquality from "../../function/StrictEquality";

class ReversedBinarySearchTree<E> extends AbstractBinarySearchTree<E> {
  public tree: AbstractBinarySearchTree<E>;

  constructor(collection: SortedCollection<E>) {
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
    return this.tree;
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
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      this.factory.create<R>(comparator, equals),
      (tree, element) => tree.add(mapper(element))
    );
  }

  public flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce<SortedCollection<R>>(
      this.factory.create<R>(comparator, equals),
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

export default ReversedBinarySearchTree;
