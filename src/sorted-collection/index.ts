import BinarySearchTreeFactory from "./binary-search-tree/BinarySearchTreeFactory";
import Comparator from "../function/Comparator";
import Equals from "../function/Equals";
import RedBlackTree from "./red-black-tree";
import SortedCollection from "./SortedCollection";
import SortedCollectionFactory from "./SortedCollectionFactory";

class RedBlackTreeFactory implements SortedCollectionFactory {
  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E> {
    return new RedBlackTree<E>(comparator, equals);
  }
}

SortedCollection.redBlackTreeFactory = new RedBlackTreeFactory();

export default SortedCollection;
