import Comparator from "../../function/Comparator";
import Equals from "../../function/Equals";
import Node from "./Node";
import Optional from "../../data/Optional";
import SortedCollection from "../SortedCollection";
import SortedCollectionFactory from "../SortedCollectionFactory";

abstract class AbstractRedBlackTree<E> extends SortedCollection<E> {
  public readonly root: Node<E>;
  public readonly count: number;

  constructor(
    factory: SortedCollectionFactory,
    comparator: Comparator<E>,
    equals?: Equals<E>,
    root?: Node<E>,
    count?: number
  ) {
    super(factory, comparator, equals);
    this.root = root;
    this.count = count || 0;
  }

  public abstract setRoot(node: Node<E>): AbstractRedBlackTree<E>;

  public abstract setCount(count: number): AbstractRedBlackTree<E>;

  public nth(index: number): Optional<E> {
    let i = 0;
    for (let element of this) {
      if (i++ == index) {
        return Optional.ofValue(element);
      }
    }
    return Optional.empty();
  }

  public slice(lower?: number, upper?: number): SortedCollection<E> {
    const min = lower < 0 ? this.size() + lower : lower;
    const max = upper < 0 ? this.size() + upper : upper;
    let i = 0;
    let tree: SortedCollection<E> = this;
    for (let element of this) {
      if (i < min || i >= max) {
        tree = tree.remove(element);
      }
      i++;
    }
    return tree;
  }

  public toArray(): E[] {
    const array = [];
    for (let element of this) {
      array.push(element);
    }
    return array;
  }
}

export default AbstractRedBlackTree;
