import ListIterator from "../list/ListIterator";

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
  clear(): MultiMap<E>;
  isEmpty(): boolean;
  size(): number;
  keys(): K[];
  values(): V[];
  entries(): [K, V][];
  [Symbol.iterator](): Iterator<[K, V]>;
  iterator(key: K): ListIterator<[K, V]>;
}
