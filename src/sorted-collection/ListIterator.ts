export default interface ListIterator<E> extends Iterator<E> {
  search(value: E): void;
  previous(): { value: E; done: boolean };
}
