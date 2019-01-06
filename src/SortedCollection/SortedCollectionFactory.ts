import Comparator from "../Function/Comparator";
import Equals from "../Function/Equals";
import SortedCollection from "./SortedCollection";

interface SortedCollectionFactory {
  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E>;
}

export default SortedCollectionFactory;
