import Comparator from "../../function/Comparator";
import Equals from "../../function/Equals";
import RedBlackTree from "./RedBlackTree";
import SortedCollection from "../SortedCollection";
import SortedCollectionFactory from "../SortedCollectionFactory";

export default class RedBlackTreeFactory implements SortedCollectionFactory {
  private static instance: RedBlackTreeFactory;

  public static getInstance(): RedBlackTreeFactory {
    return (
      RedBlackTreeFactory.instance ||
      (RedBlackTreeFactory.instance = new RedBlackTreeFactory())
    );
  }

  public create<E>(
    comparator: Comparator<E>,
    equals?: Equals<E>
  ): SortedCollection<E> {
    return new RedBlackTree<E>(comparator, equals);
  }
}
