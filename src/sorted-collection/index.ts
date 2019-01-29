import BinarySearchTree from "./BinarySearchTree";
import Comparator from "../function/Comparator";
import Equals from "../function/Equals";
import RedBlackTree from "./RedBlackTree";
import SortedCollection from "./SortedCollection";
import SortedCollectionFactory from "./SortedCollectionFactory";

class BinarySearchTreeFactory {
  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E> {
    return new BinarySearchTree<E>(comparator, equals);
  }
}

class RedBlackTreeFactory {
  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E> {
    return new RedBlackTree<E>(comparator, equals);
  }
}

SortedCollection.binarySearchTreeFactory = new BinarySearchTreeFactory();
SortedCollection.redBlackTreeFactory = new RedBlackTreeFactory();

export default SortedCollection;
