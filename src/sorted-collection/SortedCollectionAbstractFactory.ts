import Comparator from "../function/Comparator";
import Equals from "../function/Equals";
import SortedCollection from "./SortedCollection";

export default abstract class SortedCollectionAbstractFactory {
  public abstract create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E>;
}
