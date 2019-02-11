import ListIterator from "./ListIterator";

class ReversedListIterator<E> implements ListIterator<E> {
  public readonly iterator: ListIterator<E>;

  public constructor(iterator: ListIterator<E>) {
    this.iterator = iterator;
  }

  public head(): void {
    this.iterator.last();
  }

  public last(): void {
    this.iterator.head();
  }

  public search(value: E): void {
    this.iterator.search(value);
  }

  public previous(): { value: E; done: boolean } {
    return this.iterator.next();
  }

  public next(): { value: E; done: boolean } {
    return this.iterator.previous();
  }
}

export default ReversedListIterator;
