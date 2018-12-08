import Comparator from "./Comparator";

interface SortedCollection<T> extends Iterable<T> {
  public add(value: T): SortedCollection<T>;
  public remove(value: T): SortedCollection<T>;
  public union(sortedCollection: SortedCollection<T>): SortedCollection<T>;
  public intersection(
    sortedCollection: SortedCollection<T>
  ): SortedCollection<T>;
  public except(sortedCollection: SortedCollection<T>): SortedCollection<T>;
  public clear(): SortedCollection<T>;
  public contains(value: T): boolean;
  public containsAll(sortedCollection: SortedCollection<T>): boolean;
  public isEmpty(): boolean;
  public size(): number;
  public toArray(): T[];
  public [Symbol.iterator](): Iterator<T>;
  public forEach(action: (value: T) => void): void;
  public filter(predicate: (value: T) => boolean): SortedCollection<T>;
  public map<R>(
    comparator: Comparator<R>,
    mapper: (value: T) => R
  ): SortedCollection<R>;
  public flatMap<R>(
    comparator: Comparator<R>,
    mapper: (value: T) => SortedCollection<R>
  ): SortedCollection<R>;
  public reduce<U>(
    identity: U,
    accumulator: (accumulated: U, value: T) => U
  ): U;
}

export default SortedCollection;
