import ListIterator from "./ListIterator";

export default class ReversedListIterator<V> implements ListIterator<V> {
  readonly iterator: ListIterator<V>;

  constructor(iterator: ListIterator<V>) {
    this.iterator = iterator;
  }

  head(): void {
    this.iterator.last();
  }

  last(): void {
    this.iterator.head();
  }

  previous(): { value: V; done: boolean } {
    return this.iterator.next();
  }

  next(): { value: V; done: boolean } {
    return this.iterator.previous();
  }
}
