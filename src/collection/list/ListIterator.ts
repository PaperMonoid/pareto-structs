export default interface ListIterator<V> extends Iterator<V> {
  head(): void;
  last(): void;
  previous(): { value: V; done: boolean };
}
