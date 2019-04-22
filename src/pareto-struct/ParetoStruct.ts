import Frontier from "./frontier";
import MultiMap from "../collection/multimap";

export default class ParetoForest<V> {
  public readonly frontiers: MultiMap<V, Frontier<V>>;

  public put(value: V): ParetoForest<V> {
    let iterator = this.frontiers.iterator(value);
    let current = iterator.next();
    if (current.done) {
      let previous = iterator.previous();
      if (previous.done) {
        return this.frontiers.put(value, new Frontier<V>(value));
      } else {
        const [_, replaced] = previous.value;
        const [replacement, put] = new Frontier<V>(value).dominate(replaced);
        return this.frontiers
          .replace(replaced.value, replacement)
          .put(value, put);
      }
    } else {
      const [_, replaced] = current.value;
      return this.frontiers.replace(value, replaced.put(value));
    }
  }

  public remove(value: V): ParetoForest<V> {
    throw new ReferenceError("Not implemented");
  }
}
