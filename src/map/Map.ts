import { ListIterator } from "../list";

export default interface Map<K, V> extends Iterable<[K, V]> {
  put(key: K, value: V): Map<K, V>;
  replace(key: K, value: V): Map<K, V>;
  remove(key: K, value: V): Map<K, V>;
  getValue(key: K): V;
  containsKey(key: K): boolean;
  containsValue(value: V): boolean;
  containsEntry(key: K, value: V): boolean;
  clear(): Map<K, V>;
  isEmpty(): boolean;
  size(): number;
  head(): [K, V];
  last(): [K, V];
  nth(index: number): [K, V];
  slice(lower?: number, upper?: number): Map<K, V>;
  keys(): K[];
  values(): V[];
  entries(): [K, V];
  [Symbol.iterator](): Iterator<[K, V]>;
  iterator(key: K): ListIterator<[K, V]>;
}
