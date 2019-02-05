import BinarySearchTree from "./BinarySearchTree";
import Comparator from "../../function/Comparator";
import Equals from "../../function/Equals";
import SortedCollection from "../SortedCollection";
import SortedCollectionAbstractFactory from "../SortedCollectionAbstractFactory";

export default class BinarySearchTreeFactory
  implements SortedCollectionAbstractFactory {
  private static instance: BinarySearchTreeFactory;

  public static getInstance(): BinarySearchTreeFactory {
    return (
      BinarySearchTreeFactory.instance ||
      (BinarySearchTreeFactory.instance = new BinarySearchTreeFactory())
    );
  }

  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E> {
    return new BinarySearchTree<E>(comparator, equals);
  }
}
