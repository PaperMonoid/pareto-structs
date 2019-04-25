import { ListIterator } from "../list";

export default interface MultiMap<K, V> extends Iterable<[K, V]> {
  put(key: K, value: V): MultiMap<K, V>;
  putAll(key: K, values: Iterable<V>): MultiMap<K, V>;
  replace(key: K, values: Iterable<V>): MultiMap<K, V>;
  remove(key: K, value: V): MultiMap<K, V>;
  removeAll(key: K): MultiMap<K, V>;
  getAll(key: K): V[];
  containsKey(key: K): boolean;
  containsValue(value: V): boolean;
  containsEntry(key: K, value: V): boolean;
  clear(): MultiMap<K, V>;
  isEmpty(): boolean;
  size(): number;
  nth(index: number): [K, V];
  slice(lower?: number, upper?: number): MultiMap<K, V>;
  keys(): K[];
  values(): V[];
  entries(): [K, V][];
  [Symbol.iterator](): Iterator<[K, V]>;
  iterator(key: K): ListIterator<[K, V]>;
}
