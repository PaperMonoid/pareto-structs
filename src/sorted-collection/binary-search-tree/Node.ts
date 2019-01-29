export default class Node<E> {
  public readonly element: E;
  public readonly left: Node<E>;
  public readonly right: Node<E>;

  constructor(element: E, left?: Node<E>, right?: Node<E>) {
    this.element = element;
    this.left = left;
    this.right = right;
  }

  private removeMin(): Node<E>[] {
    if (!this.left) {
      return [this.right, this];
    } else {
      const [replaced, minimum] = this.left.removeMin();
      return [this.setLeft(replaced), minimum];
    }
  }

  public replaceWithSuccessor(): Node<E> {
    if (!this.right) {
      return this.left;
    } else {
      const [replaced, successor] = this.right.removeMin();
      return this.setRight(replaced).setElement(successor.element);
    }
  }

  public setElement(element: E): Node<E> {
    return new Node<E>(element, this.left, this.right);
  }

  public setLeft(node: Node<E>): Node<E> {
    return new Node<E>(this.element, node, this.right);
  }

  public setRight(node: Node<E>): Node<E> {
    return new Node<E>(this.element, this.left, node);
  }

  public min(): Node<E> {
    if (!this.left) {
      return this;
    } else {
      return this.left.min();
    }
  }

  public max(): Node<E> {
    if (!this.right) {
      return this;
    } else {
      return this.right.max();
    }
  }
}
