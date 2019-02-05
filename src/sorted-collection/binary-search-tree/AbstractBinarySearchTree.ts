import BiFunction from "../../function/BiFunction";
import Comparator from "../../function/Comparator";
import Consumer from "../../function/Consumer";
import Equals from "../../function/Equals";
import Function from "../../function/Function";
import Node from "./Node";
import Optional from "../../data/Optional";
import Predicate from "../../function/Predicate";
import SortedCollection from "../SortedCollection";
import SortedCollectionAbstractFactory from "../SortedCollectionAbstractFactory";
import StrictEquality from "../../function/StrictEquality";

abstract class AbstractBinarySearchTree<E> extends SortedCollection<E> {
  public readonly comparator: Comparator<E>;
  public readonly equals: Equals<E>;
  public readonly root: Node<E>;
  public readonly count: number;
  public readonly factory: SortedCollectionAbstractFactory;

  constructor(
    factory: SortedCollectionAbstractFactory,
    comparator: Comparator<E>,
    equals?: Equals<E>,
    root?: Node<E>,
    count?: number
  ) {
    super();
    this.factory = factory;
    this.comparator = comparator;
    this.equals = equals || StrictEquality;
    this.root = root;
    this.count = count || 0;
  }

  public abstract setRoot(node: Node<E>): AbstractBinarySearchTree<E>;

  public abstract setCount(count: number): AbstractBinarySearchTree<E>;

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

  public toArray(): E[] {
    const array = [];
    for (let element of this) {
      array.push(element);
    }
    return array;
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

export default AbstractBinarySearchTree;
