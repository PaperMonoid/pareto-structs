import BiFunction from "../function/BiFunction";
import Comparator from "../function/Comparator";
import Consumer from "../function/Consumer";
import Equals from "../function/Equals";
import Function from "../function/Function";
import ListIterator from "./ListIterator";
import Optional from "../data/Optional";
import Predicate from "../function/Predicate";
import SortedCollectionFactory from "./SortedCollectionFactory";
import StrictEquality from "../function/StrictEquality";

export default abstract class SortedCollection<E> implements Iterable<E> {
  public readonly factory: SortedCollectionFactory;
  public readonly comparator: Comparator<E>;
  public readonly equals: Equals<E>;

  public constructor(
    factory: SortedCollectionFactory,
    comparator: Comparator<E>,
    equals?: Equals<E>
  ) {
    this.factory = factory;
    this.comparator = comparator;
    this.equals = equals || StrictEquality;
  }

  public abstract add(element: E): SortedCollection<E>;

  public abstract remove(element: E): SortedCollection<E>;

  public union(collection: Iterable<E>): SortedCollection<E> {
    let _collection = this as SortedCollection<E>;
    for (let element of collection) {
      _collection = _collection.add(element);
    }
    return _collection;
  }

  public intersection(collection: Iterable<E>): SortedCollection<E> {
    const A = this[Symbol.iterator]();
    const B = this.clear()
      .union(collection)
      [Symbol.iterator]();
    let _collection = this.clear();
    for (let a = A.next(), b = B.next(); !a.done && !b.done; ) {
      const comparison = this.comparator(a.value, b.value);
      if (comparison > 0) {
        b = B.next();
      } else if (comparison < 0) {
        a = A.next();
      } else {
        _collection = _collection.add(a.value);
        a = A.next();
        b = B.next();
      }
    }
    return _collection;
  }

  public except(collection: Iterable<E>): SortedCollection<E> {
    let _collection = this as SortedCollection<E>;
    for (let element of collection) {
      _collection = _collection.remove(element);
    }
    return _collection;
  }

  public clear(): SortedCollection<E> {
    return this.factory.create<E>(this.comparator, this.equals);
  }

  public abstract search(element: E): Optional<E>;

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
    return this.size() == 0;
  }

  public abstract size(): number;

  public abstract min(): Optional<E>;

  public abstract max(): Optional<E>;

  public abstract nth(index: number): Optional<E>;

  public abstract slice(lower?: number, upper?: number): SortedCollection<E>;

  public abstract reverse(): SortedCollection<E>;

  public abstract toArray(): E[];

  public abstract [Symbol.iterator](): Iterator<E>;

  public abstract listIterator(): ListIterator<E>;

  public forEach(action: Consumer<E>): void {
    for (let element of this) {
      action(element);
    }
  }

  public filter(predicate: Predicate<E>): SortedCollection<E> {
    return this.reduce(this as SortedCollection<E>, (collection, element) =>
      predicate(element) ? collection : collection.remove(element)
    );
  }

  public map<R>(
    mapper: Function<E, R>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce(
      this.factory.create<R>(comparator, equals),
      (collection, element) => collection.add(mapper(element))
    );
  }

  public flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R> {
    return this.reduce(
      this.factory.create<R>(comparator, equals),
      (collection, element) => collection.union(mapper(element))
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
