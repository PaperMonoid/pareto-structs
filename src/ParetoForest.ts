import Frontier from "./frontier";
import SortedCollection from "./sorted-collection";

export default class ParetoForest<E> {
  public readonly frontiers: SortedCollection<Frontier<E>>;

  public add(element: E): ParetoForest<E> {
    throw new ReferenceError("Not implemented");
  }

  public remove(element: E): ParetoForest<E> {
    throw new ReferenceError("Not implemented");
  }
}
