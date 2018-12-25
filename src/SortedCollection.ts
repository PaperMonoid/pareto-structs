import BiFunction from "./Function/BiFunction";
import Comparator from "./Function/Comparator";
import Consumer from "./Function/Consumer";
import Function from "./Function/Function";
import Predicate from "./Function/Predicate";

interface SortedCollection<E> extends Iterable<E> {
  public add(element: E): SortedCollection<E>;
  public remove(element: E): SortedCollection<E>;
  public union(collection: Iterable<E>): SortedCollection<E>;
  public intersection(collection: Iterable<E>): SortedCollection<E>;
  public except(collection: Iterable<E>): SortedCollection<E>;
  public clear(): SortedCollection<E>;
  public contains(element: E): boolean;
  public containsAll(collection: Iterable<E>): boolean;
  public isEmpty(): boolean;
  public size(): number;
  public toArray(): E[];
  public [Symbol.iterator](): Iterator<E>;
  public forEach(action: Consumer<E>): void;
  public filter(predicate: Predicate<E>): SortedCollection<E>;
  public map<R>(
    comparator: Comparator<R>,
    mapper: Function<E, R>
  ): SortedCollection<R>;
  public flatMap<R>(
    comparator: Comparator<R>,
    mapper: Function<E, Iterable<R>>
  ): SortedCollection<R>;
  public reduce<U>(identity: U, accumulator: BiFunction<U, E, U>): U;
}

export default SortedCollection;
