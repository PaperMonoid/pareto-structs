import BiFunction from "../Function/BiFunction";
import Comparator from "../Function/Comparator";
import Consumer from "../Function/Consumer";
import Equals from "../Function/Equals";
import Function from "../Function/Function";
import Optional from "../Data/Optional";
import Predicate from "../Function/Predicate";

abstract class SortedCollection<E> implements Iterable<E> {
  public abstract add(element: E): SortedCollection<E>;
  public abstract remove(element: E): SortedCollection<E>;
  public abstract union(collection: Iterable<E>): SortedCollection<E>;
  public abstract intersection(collection: Iterable<E>): SortedCollection<E>;
  public abstract except(collection: Iterable<E>): SortedCollection<E>;
  public abstract clear(): SortedCollection<E>;
  public abstract search(element: E): Optional<E>;
  public abstract next(element: E): Optional<E>;
  public abstract previous(element: E): Optional<E>;
  public abstract contains(element: E): boolean;
  public abstract containsAll(collection: Iterable<E>): boolean;
  public abstract isEmpty(): boolean;
  public abstract size(): number;
  public abstract min(): Optional<E>;
  public abstract max(): Optional<E>;
  public abstract nth(index: number): Optional<E>;
  public abstract slice(lower?: number, upper?: number): SortedCollection<E>;
  public abstract reverse(): SortedCollection<E>;
  public abstract toArray(): E[];
  public abstract [Symbol.iterator](): Iterator<E>;
  public abstract forEach(action: Consumer<E>): void;
  public abstract filter(predicate: Predicate<E>): SortedCollection<E>;
  public abstract map<R>(
    mapper: Function<E, R>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>;
  public abstract flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>;
  public abstract reduce<U>(identity: U, accumulator: BiFunction<U, E, U>): U;
}

export default SortedCollection;
