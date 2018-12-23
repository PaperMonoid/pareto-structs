import BiFunction from "./Function/BiFunction";
import Comparator from "./Function/Comparator";
import Consumer from "./Function/Consumer";
import Function from "./Function/Function";
import Predicate from "./Function/Predicate";
import SortedCollection from "./SortedCollection";

enum Color {
  Red,
  Black
}

class Node<E> {
  public readonly element: E;
  public readonly color: Color;
  public readonly left: Node<E>;
  public readonly right: Node<E>;

  public constructor(
    element: E,
    color?: Color,
    left?: Node<E>,
    right?: Node<E>
  ) {
    this.element = element;
    this.color = color ? color : Color.Black;
    this.left = left;
    this.right = right;
  }
}

class RedBlackTree<E> implements SortedCollection<E> {
  public readonly comparator: Comparator<E>;
  public readonly root: Node<E>;
  public readonly count: number;

  constructor(comparator: Comparator<E>, root?: Node<E>, count?: number) {
    this.comparator = comparator;
    this.root = root;
    this.count = count;
  }
  public add(element: E): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public remove(element: E): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public union(collection: SortedCollection<E>): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public intersection(collection: SortedCollection<E>): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public except(collection: SortedCollection<E>): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public clear(): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public contains(element: E): boolean {
    throw new Error("Not implemented");
  }

  public containsAll(collection: SortedCollection<E>): boolean {
    throw new Error("Not implemented");
  }

  public isEmpty(): boolean {
    throw new Error("Not implemented");
  }

  public size(): number {
    throw new Error("Not implemented");
  }

  public toArray(): E[] {
    throw new Error("Not implemented");
  }

  public [Symbol.iterator](): Iterator<E> {
    throw new Error("Not implemented");
  }

  public forEach(action: Consumer<E>): void {
    throw new Error("Not implemented");
  }

  public filter(predicate: Predicate<E>): SortedCollection<E> {
    throw new Error("Not implemented");
  }

  public map<R>(
    comparator: Comparator<R>,
    mapper: Function<E, R>
  ): SortedCollection<R> {
    throw new Error("Not implemented");
  }

  public flatMap<R>(
    comparator: Comparator<R>,
    mapper: Function<E, SortedCollection<R>>
  ): SortedCollection<R> {
    throw new Error("Not implemented");
  }

  public reduce<U>(identity: U, accumulator: BiFunction<U, E, U>): U {
    throw new Error("Not implemented");
  }
}

export default RedBlackTree;
