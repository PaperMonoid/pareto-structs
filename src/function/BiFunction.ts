export default interface BiFunction<T, U, R> {
  (first: T, second: U): R;
}
