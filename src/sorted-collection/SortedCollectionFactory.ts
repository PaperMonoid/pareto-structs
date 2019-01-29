import Comparator from "../function/Comparator";
import Equals from "../function/Equals";
import SortedCollection from "./SortedCollection";

interface SortedCollectionFactory {
  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E>;
}

export default SortedCollectionFactory;
