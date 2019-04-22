export default class Node<K, V> {
  readonly key: K;
  readonly values: V[];
  readonly left: Node<K, V>;
  readonly right: Node<K, V>;

  constructor(key: K, values: V[], left?: Node<K, V>, right?: Node<K, V>) {
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

  replaceWithSuccessor(): Node<K, V> {
    if (!this.right) {
      return this.left;
    } else {
      const [replaced, successor] = this.right.removeMin();
      return this.setRight(replaced).setValues(successor.values);
    }
  }

  setValues(values: V[]): Node<K, V> {
    return new Node<K, V>(this.key, values, this.left, this.right);
  }

  setLeft(node: Node<K, V>): Node<K, V> {
    return new Node<K, V>(this.key, this.values, node, this.right);
  }

  setRight(node: Node<K, V>): Node<K, V> {
    return new Node<K, V>(this.key, this.values, this.left, node);
  }

  min(): Node<K, V> {
    if (!this.left) {
      return this;
    } else {
      return this.left.min();
    }
  }

  max(): Node<K, V> {
    if (!this.right) {
      return this;
    } else {
      return this.right.max();
    }
  }
}
