import Frontier from "./Frontier";
import { Equals, StrictEquality, Comparator } from "../function";
import { ListIterator } from "../list";
import { MultiMap, RedBlackTree } from "../multimap";

export default class ParetoStruct<K, V> {
  readonly comparators: Comparator<K>[];
  readonly equals?: Equals<V>;
  readonly frontiers: MultiMap<K[], Frontier<K, V>>;

  constructor(
    comparators: Comparator<K>[],
    equals?: Equals<V>,
    frontiers?: MultiMap<K[], Frontier<K, V>>
  ) {
    this.comparators = comparators;
    this.equals = equals || StrictEquality;
    if (!frontiers) {
      frontiers = RedBlackTree.create<K[], Frontier<K, V>>(
        this.compare.bind(this)
      );
    }
    this.frontiers = frontiers;
  }

  private compare(first: K[], second: K[]) {
    let equal = 0;
    let dominated = 0;
    let nonDominated = 0;
    for (let i in this.comparators) {
      const comparison = this.comparators[i](first[i], second[i]);
      if (comparison == 0) {
        equal++;
      }
      if (comparison >= 0) {
        dominated++;
      }
      if (comparison <= 0) {
        nonDominated++;
      }
    }
    if (equal == this.comparators.length) {
      return 0;
    } else if (dominated == this.comparators.length) {
      return 1;
    } else if (nonDominated == this.comparators.length) {
      return -1;
    } else {
      return 0;
    }
  }

  setFrontiers(frontiers: MultiMap<K[], Frontier<K, V>>) {
    return new ParetoStruct<K, V>(this.comparators, this.equals, frontiers);
  }

  put(keys: K[], value: V): ParetoStruct<K, V> {
    let iterator = this.frontiers.iterator(keys);
    let current = iterator.previous();
    current = this.lastMatch(iterator, keys);
    if (current.done) {
      const optimals = RedBlackTree.create<K[], V>(
        this.compare.bind(this),
        this.equals
      );
      const frontier = new Frontier<K, V>(
        this.comparators,
        this.equals,
        keys,
        optimals.put(keys, value)
      );
      const frontiers = this.frontiers.put(keys, frontier);
      iterator = frontiers.iterator(keys);
      let previous = iterator.previous();
      previous = this.lastMatch(iterator, keys);
      previous = iterator.previous();
      if (previous.done) {
        return this.setFrontiers(frontiers);
      } else {
        const [_, replaced] = previous.value;
        const [replacement, put] = frontier.steal(replaced);
        return this.setFrontiers(
          frontiers.replace(replaced.keys, [replacement]).replace(keys, [put])
        );
      }
    } else {
      const [_, replaced] = current.value;
      return this.setFrontiers(
        this.frontiers.replace(replaced.keys, [replaced.put(keys, value)])
      );
    }
  }

  removeAll(keys: K[]): ParetoStruct<K, V> {
    return this.setFrontiers(this.frontiers.removeAll(keys));
  }

  remove(keys: K[], value: V): ParetoStruct<K, V> {
    let iterator = this.frontiers.iterator(keys);
    let current = iterator.previous();
    current = this.lastMatch(iterator, keys);
    if (current.done) {
      return this;
    } else {
      let [_keys, frontier] = current.value;
      frontier = frontier.remove(keys, value);
      if (frontier.optimals.isEmpty()) {
        let self = this.removeAll(_keys);
        for (let dimention of frontier.dimentions) {
          for (let [__keys, __value] of dimention) {
            self = self.put(__keys, __value);
          }
        }
        return self;
      } else {
        return this.setFrontiers(this.frontiers.replace(_keys, [frontier]));
      }
    }
  }

  size(): number {
    let count = 0;
    for (let [_, frontier] of this.frontiers) {
      count += frontier.optimals.size();
      for (let dimention of frontier.dimentions) {
        count += dimention.size();
      }
    }
    return count;
  }

  private lastMatch(
    iterator: ListIterator<[K[], Frontier<K, V>]>,
    keys: K[]
  ): { value: [K[], Frontier<K, V>]; done: boolean } {
    let current = iterator.next();
    while (!current.done) {
      if (this.compare(keys, current.value[0]) == 0) {
        current = iterator.next();
      } else {
        break;
      }
    }
    current = iterator.previous();
    return current;
  }
}
