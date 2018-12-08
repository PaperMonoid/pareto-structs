interface Collection<T> extends Iterable<T> {
  public add(value: T): Collection<T>;
  public remove(value: T): Collection<T>;
  public union(collection: Collection<T>): Collection<T>;
  public intersection(collection: Collection<T>): Collection<T>;
  public except(collection: Collection<T>): Collection<T>;
  public clear(): Collection<T>;
  public contains(value: T): bool;
  public containsAll(collection: Collection<T>): bool;
  public isEmpty(): bool;
  public size(): number;
  public toArray(): T[];
  public forEach(action: (value: T) => void): void;
  public filter(predicate: (value: T) => bool): Collection<T>;
  public map<R>(mapper: (value: T) => R): Collection<T>;
  public flatMap<R>(mapper: (value: T) => Collection<R>): Collection<T>;
  public reduce<U>(identity: U, accumulator: (value: T, accumulated: U) => U);
}

export default Collection;
