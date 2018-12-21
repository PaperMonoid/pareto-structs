import SortedCollection from "./SortedCollection";
import Comparator from "./Comparator";

enum Color {
  Red,
  Black
}

class Node<T> {
  public readonly value: T;
  public readonly color: Color;
  public readonly left: Node<T>;
  public readonly right: Node<T>;

  public constructor(value: T, color?: Color, left?: Node<T>, right?: Node<T>) {
    this.value = value;
    this.color = color ? color : Color.Black;
    this.left = left;
    this.right = right;
  }
}

class RedBlackTree<T> implements SortedCollection<T> {
  public readonly comparator: Comparator<T>;
  public readonly root: Node<T>;
  public readonly count: number;

  constructor(comparator: Comparator<T>, root?: Node<T>, count?: number) {
    this.comparator = comparator;
    this.root = root;
    this.count = count;
  }

  public add(value: T): SortedCollection<T> {
    throw new Error("Not implemented");
  }

  public remove(value: T): SortedCollection<T> {
    throw new Error("Not implemented");
  }

  public union(sortedCollection: SortedCollection<T>): SortedCollection<T> {
    throw new Error("Not implemented");
  }

  public intersection(
    sortedCollection: SortedCollection<T>
  ): SortedCollection<T> {
    throw new Error("Not implemented");
  }

  public except(sortedCollection: SortedCollection<T>): SortedCollection<T> {
    throw new Error("Not implemented");
  }

  public clear(): SortedCollection<T> {
    throw new Error("Not implemented");
  }

  public contains(value: T): boolean {
    throw new Error("Not implemented");
  }

  public containsAll(sortedCollection: SortedCollection<T>): boolean {
    throw new Error("Not implemented");
  }

  public isEmpty(): boolean {
    throw new Error("Not implemented");
  }

  public size(): number {
    throw new Error("Not implemented");
  }

  public toArray(): T[] {
    throw new Error("Not implemented");
  }

  public [Symbol.iterator](): Iterator<T> {
    throw new Error("Not implemented");
  }

  public forEach(action: (value: T) => void): void {
    throw new Error("Not implemented");
  }

  public filter(predicate: (value: T) => boolean): SortedCollection<T> {
    throw new Error("Not implemented");
  }

  public map<R>(
    comparator: Comparator<R>,
    mapper: (value: T) => R
  ): SortedCollection<R> {
    throw new Error("Not implemented");
  }

  public flatMap<R>(
    comparator: Comparator<R>,
    mapper: (value: T) => SortedCollection<R>
  ): SortedCollection<R> {
    throw new Error("Not implemented");
  }

  public reduce<U>(
    identity: U,
    accumulator: (accumulated: U, value: T) => U
  ): U {
    throw new Error("Not implemented");
  }
}

export default RedBlackTree;
