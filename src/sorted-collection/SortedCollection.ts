import ListIterator from "./list-iterator";
import {
  BiFunction,
  Comparator,
  Consumer,
  Equals,
  Function,
  Predicate
} from "../function";

export default interface SortedCollection<E> extends Iterable<E> {
  add(element: E): SortedCollection<E>;
  remove(element: E): SortedCollection<E>;
  union(collection: Iterable<E>): SortedCollection<E>;
  intersection(collection: Iterable<E>): SortedCollection<E>;
  except(collection: Iterable<E>): SortedCollection<E>;
  clear(): SortedCollection<E>;
  contains(element: E): boolean;
  containsAll(collection: Iterable<E>): boolean;
  isEmpty(): boolean;
  size(): number;
  min(): E;
  max(): E;
  nth(index: number): E;
  slice(lower?: number, upper?: number): SortedCollection<E>;
  reverse(): SortedCollection<E>;
  toArray(): E[];
  [Symbol.iterator](): Iterator<E>;
  listIterator(): ListIterator<E>;
  forEach(action: Consumer<E>): void;
  filter(predicate: Predicate<E>): SortedCollection<E>;
  map<R>(
    mapper: Function<E, R>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>;
  flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>;
  reduce<U>(identity: U, accumulator: BiFunction<U, E, U>): U;
}
