export default interface ListIterator<E> extends Iterator<E> {
  public head(): void;
  public last(): void;
  public search(value: E): void;
  public previous(): { value: E; done: boolean };
}
