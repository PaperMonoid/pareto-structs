import SortedCollection from "./SortedCollection";
import { Comparator, Equals } from "../function";

export default interface SortedCollectionFactory {
  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E>;
}
