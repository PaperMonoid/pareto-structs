import Frontier from "./Frontier";
import MultiMap from "../multimap";
import RedBlackTree from "../multimap/red-black-tree";
import { Equals, StrictEquality, Comparator } from "../function";

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
      frontiers = RedBlackTree.create<K[], Frontier<K, V>>(function(
        first,
        second
      ) {
        let equal = 0;
        let dominated = 0;
        let nonDominated = 0;
        for (let i in comparators) {
          const comparison = comparators[i](first[i], second[i]);
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
        if (equal == comparators.length) {
          return 0;
        } else if (dominated == comparators.length) {
          return 1;
        } else if (nonDominated == comparators.length) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    this.frontiers = frontiers;
  }

  setFrontiers(frontiers: MultiMap<K[], Frontier<K, V>>) {
    return new ParetoStruct<K, V>(this.comparators, this.equals, frontiers);
  }

  put(keys: K[], value: V): ParetoStruct<K, V> {
    let iterator = this.frontiers.iterator(keys);
    let current = iterator.next();
    if (current.done) {
      const frontier = new Frontier<K, V>(
        this.comparators,
        this.equals,
        keys,
        value
      );
      const frontiers = this.frontiers.put(keys, frontier);
      iterator = frontiers.iterator(keys);
      iterator.previous();
      let previous = iterator.previous();
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
        this.frontiers.replace(keys, [replaced.put(keys, value)])
      );
    }
  }

  removeAll(keys: K[]): ParetoStruct<K, V> {
    return this.setFrontiers(this.frontiers.removeAll(keys));
  }

  remove(keys: K[], value: V): ParetoStruct<K, V> {
    let iterator = this.frontiers.iterator(keys);
    let current = iterator.next();
    if (current.done) {
      return this;
    } else {
      let [_, frontier] = current.value;
      if (this.equals(frontier.optimal, value)) {
        let self = this.removeAll(keys);
        for (let dimention of frontier.dimentions) {
          for (let [_keys, _value] of dimention) {
            self = self.put(_keys, _value);
          }
        }
        return self;
      } else {
        return this.setFrontiers(
          this.frontiers.replace(keys, [frontier.remove(keys, value)])
        );
      }
    }
  }
}
