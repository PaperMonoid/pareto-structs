import BiFunction from "../Function/BiFunction";
import Comparator from "../Function/Comparator";
import Consumer from "../Function/Consumer";
import Equals from "../Function/Equals";
import Function from "../Function/Function";
import Optional from "../Data/Optional";
import Predicate from "../Function/Predicate";

interface SortedCollection<E> extends Iterable<E> {
  public add(element: E): SortedCollection<E>;
  public remove(element: E): SortedCollection<E>;
  public union(collection: Iterable<E>): SortedCollection<E>;
  public intersection(collection: Iterable<E>): SortedCollection<E>;
  public except(collection: Iterable<E>): SortedCollection<E>;
  public clear(): SortedCollection<E>;
  public search(element: E): Optional<E>;
  public next(element: E): Optional<E>;
  public previous(element: E): Optional<E>;
  public contains(element: E): boolean;
  public containsAll(collection: Iterable<E>): boolean;
  public isEmpty(): boolean;
  public size(): number;
  public min(): Optional<E>;
  public max(): Optional<E>;
  public nth(index: number): Optional<E>;
  public slice(lower?: number, upper?: number): SortedCollection<E>;
  public reverse(): SortedCollection<E>;
  public toArray(): E[];
  public [Symbol.iterator](): Iterator<E>;
  public forEach(action: Consumer<E>): void;
  public filter(predicate: Predicate<E>): SortedCollection<E>;
  public map<R>(
    mapper: Function<E, R>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>;
  public flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>;
  public reduce<U>(identity: U, accumulator: BiFunction<U, E, U>): U;
}

export default SortedCollection;
