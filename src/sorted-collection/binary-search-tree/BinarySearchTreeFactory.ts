import BinarySearchTree from "./BinarySearchTree";
import SortedCollection from "../SortedCollection";
import SortedCollectionFactory from "../SortedCollectionFactory";
import { Comparator, Equals } from "../../function";

export default class BinarySearchTreeFactory
  implements SortedCollectionFactory {
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
