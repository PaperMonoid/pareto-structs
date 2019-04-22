export default class Node<K, V> {
  public readonly key: K;
  public readonly values: V[];
  public readonly left: Node<K, V>;
  public readonly right: Node<K, V>;

  public constructor(
    key: K,
    values: V[],
    left?: Node<K, V>,
    right?: Node<K, V>
  ) {
    this.key = key;
    this.values = values;
    this.left = left;
    this.right = right;
  }

  private removeMin(): Node<K, V>[] {
    if (!this.left) {
      return [this.right, this];
    } else {
      const [replaced, minimum] = this.left.removeMin();
      return [this.setLeft(replaced), minimum];
    }
  }

  public replaceWithSuccessor(): Node<K, V> {
    if (!this.right) {
      return this.left;
    } else {
      const [replaced, successor] = this.right.removeMin();
      return this.setRight(replaced).setValues(successor.values);
    }
  }

  public setValues(values: V[]): Node<K, V> {
    return new Node<K, V>(this.key, values, this.left, this.right);
  }

  public setLeft(node: Node<K, V>): Node<K, V> {
    return new Node<K, V>(this.key, this.values, node, this.right);
  }

  public setRight(node: Node<K, V>): Node<K, V> {
    return new Node<K, V>(this.key, this.values, this.left, node);
  }

  public min(): Node<K, V> {
    if (!this.left) {
      return this;
    } else {
      return this.left.min();
    }
  }

  public max(): Node<K, V> {
    if (!this.right) {
      return this;
    } else {
      return this.right.max();
    }
  }
}
