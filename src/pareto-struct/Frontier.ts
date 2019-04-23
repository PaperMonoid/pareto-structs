import MultiMap from "../multimap";
import RedBlackTree from "../multimap/red-black-tree";
import { Equals, Comparator } from "../function";

export default class Frontier<K, V> {
  readonly comparators: Comparator<K>[];
  readonly equals?: Equals<V>;
  readonly keys: K[];
  readonly optimal: V;
  readonly dimentions: MultiMap<K[], V>[];

  constructor(
    comparators: Comparator<K>[],
    equals: Equals<V>,
    keys: K[],
    optimal: V,
    dimentions?: MultiMap<K[], V>[]
  ) {
    this.comparators = comparators;
    this.equals = equals;
    this.equals;
    this.keys = keys;
    this.optimal = optimal;
    if (!dimentions) {
      dimentions = [];
      for (let i in keys) {
        dimentions.push(
          RedBlackTree.create<K[], V>(function(first, second) {
            return comparators[i](first[i], second[i]);
          }, equals)
        );
      }
    }
    this.dimentions = dimentions;
  }

  setDimentions(dimentions: MultiMap<K[], V>[]) {
    return new Frontier<K, V>(
      this.comparators,
      this.equals,
      this.keys,
      this.optimal,
      dimentions
    );
  }

  steal(frontier: Frontier<K, V>): [Frontier<K, V>, Frontier<K, V>] {
    let self = this as Frontier<K, V>;
    let other = frontier;
    for (let i in this.comparators) {
      for (let [keys, value] of frontier.dimentions[i]) {
        if (this.dominatesInSomething(keys, this.keys)) {
          self = self.put(keys, value);
          other = other.remove(keys, value);
        }
      }
    }
    return [other, self];
  }

  private setNthDimention(
    index: number,
    dimention: MultiMap<K[], V>
  ): Frontier<K, V> {
    const dimentions = [];
    for (let i in this.dimentions) {
      if (parseInt(i) == index) {
        dimentions.push(dimention);
      } else {
        dimentions.push(this.dimentions[i]);
      }
    }
    return this.setDimentions(dimentions);
  }

  private dominatesIn(index: string, first: K[], second: K[]): boolean {
    return this.comparators[index](first[index], second[index]) > 0;
  }

  private dominatedDimention(first: K[], second: K[]): number {
    for (let i in this.comparators) {
      if (this.dominatesIn(i, first, second)) {
        return parseInt(i);
      }
    }
    return -1;
  }

  private dominatesInSomething(first: K[], second: K[]): boolean {
    return this.dominatedDimention(first, second) > -1;
  }

  put(keys: K[], value: V): Frontier<K, V> {
    const index = this.dominatedDimention(keys, this.keys);
    if (index > -1) {
      const dimention = this.dimentions[index].put(keys, value);
      return this.setNthDimention(index, dimention);
    }
    return this;
  }

  remove(keys: K[], value: V): Frontier<K, V> {
    const index = this.dominatedDimention(keys, this.keys);
    if (index > -1) {
      const dimention = this.dimentions[index].remove(keys, value);
      return this.setNthDimention(index, dimention);
    }
    return this;
  }
}
