import MultiMap from "../collection/multimap";

export default class Frontier<V> {
  public readonly optimal: V;
  public readonly dimentions: MultiMap<V, V>[];

  public dominate(frontier: Frontier<V>) {}

  public put(value: V): ParetoForest<V> {
    throw new ReferenceError("Not implemented");
  }

  public remove(value: V): ParetoForest<V> {
    throw new ReferenceError("Not implemented");
  }
}
