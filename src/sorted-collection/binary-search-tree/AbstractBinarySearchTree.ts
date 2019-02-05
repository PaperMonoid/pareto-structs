import Comparator from "../../function/Comparator";
import Equals from "../../function/Equals";
import Node from "./Node";
import SortedCollection from "../SortedCollection";
import StrictEquality from "../../function/StrictEquality";

abstract class AbstractBinarySearchTree<E> extends SortedCollection<E> {
  public readonly comparator: Comparator<E>;
  public readonly equals: Equals<E>;
  public readonly root: Node<E>;
  public readonly count: number;

  constructor(
    comparator: Comparator<E>,
    equals?: Equals<E>,
    root?: Node<E>,
    count?: number
  ) {
    super();
    this.comparator = comparator;
    this.equals = equals || StrictEquality;
    this.root = root;
    this.count = count || 0;
  }

  public abstract setRoot(node: Node<E>): AbstractBinarySearchTree<E>;
  public abstract setCount(count: number): AbstractBinarySearchTree<E>;
}

export default AbstractBinarySearchTree;
