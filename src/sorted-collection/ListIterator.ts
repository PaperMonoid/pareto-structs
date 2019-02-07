export default interface ListIterator<E> extends Iterator<E> {
  search(value: E): boolean;
  previous(): { value: E; done: boolean };
}
