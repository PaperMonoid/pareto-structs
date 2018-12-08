import Collection from "./Collection";

class Node<T> {
  public value: T;
  public left: Node<T>;
  public right: Node<T>;

  public constructor(value: T, left?: Node<T>, right?: Node<T>) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  public constructor(node: Node<T>) {
    this.value = node.value;
    this.left = node.left;
    this.right = node.right;
  }
}

class BinaryTree<T> extends Collection<T> {
  public comparator: Comparator<T>;
  public root: Node<T>;

  constructor(comparator: Comparator<T>, root?: Node<T>) {
    this.comparator = comparator;
    this.root = root;
  }

  constructor(tree: BinaryTree<T>) {
    this.comparator = tree.comparator;
    this.root = tree.root;
  }

  public add(value: T): Collection<T> {
    throw new Error("Not implemented error!");
  }

  public remove(value: T): Collection<T> {
    return new Error("Not implemented error!");
  }

  public union(collection: Collection<T>): Collection<T> {
    return new Error("Not implemented error!");
  }

  public intersection(collection: Collection<T>): Collection<T> {
    return new Error("Not implemented error!");
  }

  public except(collection: Collection<T>): Collection<T> {
    return new Error("Not implemented error!");
  }

  public clear(): Collection<T> {
    return new Error("Not implemented error!");
  }

  public contains(value: T): bool {
    return new Error("Not implemented error!");
  }

  public containsAll(collection: Collection<T>): bool {
    return new Error("Not implemented error!");
  }

  public isEmpty(): bool {
    return new Error("Not implemented error!");
  }

  public size(): number {
    return new Error("Not implemented error!");
  }

  public toArray(): T[] {
    return new Error("Not implemented error!");
  }

  public forEach(action: (value: T) => void): void {
    return new Error("Not implemented error!");
  }

  public filter(predicate: (value: T) => bool): Collection<T> {
    return new Error("Not implemented error!");
  }

  public map<R>(mapper: (value: T) => R): Collection<T> {
    return new Error("Not implemented error!");
  }

  public flatMap<R>(mapper: (value: T) => Collection<R>): Collection<T> {
    return new Error("Not implemented error!");
  }

  public reduce<U>(identity: U, accumulator: (value: T, accumulated: U) => U) {
    return new Error("Not implemented error!");
  }
}
