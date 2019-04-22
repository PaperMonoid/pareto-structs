import Color from "./Color";

export default class Node<K, V> {
  readonly key: K;
  readonly values: V[];
  readonly color: Color;
  readonly left: Node<K, V>;
  readonly right: Node<K, V>;

  constructor(
    key: K,
    values: V[],
    color: Color,
    left?: Node<K, V>,
    right?: Node<K, V>
  ) {
    this.key = key;
    this.values = values;
    this.color = color;
    this.left = left;
    this.right = right;
  }

  static isBlack(node: Node<any, any>): boolean {
    if (node) {
      return node.color == Color.Black;
    }
    return true;
  }

  static isRed(node: Node<any, any>): boolean {
    if (node) {
      return node.color == Color.Red;
    }
    return false;
  }

  setValues(values: V[]): Node<K, V> {
    return new Node<K, V>(this.key, values, this.color, this.left, this.right);
  }

  setColor(color: Color): Node<K, V> {
    return new Node<K, V>(this.key, this.values, color, this.left, this.right);
  }

  setLeft(node: Node<K, V>): Node<K, V> {
    return new Node<K, V>(this.key, this.values, this.color, node, this.right);
  }

  setRight(node: Node<K, V>): Node<K, V> {
    return new Node<K, V>(this.key, this.values, this.color, this.left, node);
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

  rotateRight(): Node<K, V> {
    if (!this.left) {
      return this;
    }
    return this.left.setRight(this.setLeft(this.left.right));
  }

  rotateLeft(): Node<K, V> {
    if (!this.right) {
      return this;
    }
    return this.right.setLeft(this.setRight(this.right.left));
  }

  fixRedViolation(): Node<K, V> {
    if (Node.isBlack(this)) {
      if (Node.isRed(this.left)) {
        if (Node.isRed(this.left.left)) {
          const rotated = this.rotateRight();
          return rotated
            .setLeft(rotated.left.setColor(Color.Black))
            .setColor(Color.Red);
        }
        if (Node.isRed(this.left.right)) {
          const rotated = this.setLeft(this.left.rotateLeft()).rotateRight();
          return rotated
            .setLeft(rotated.left.setColor(Color.Black))
            .setColor(Color.Red);
        }
      }
      if (Node.isRed(this.right)) {
        if (Node.isRed(this.right.right)) {
          const rotated = this.rotateLeft();
          return rotated
            .setRight(rotated.right.setColor(Color.Black))
            .setColor(Color.Red);
        }
        if (Node.isRed(this.right.left)) {
          const rotated = this.setRight(this.right.rotateRight()).rotateLeft();
          return rotated
            .setRight(rotated.right.setColor(Color.Black))
            .setColor(Color.Red);
        }
      }
    }
    return this;
  }

  hasRedViolation() {
    if (Node.isBlack(this)) {
      if (Node.isRed(this.left)) {
        return Node.isRed(this.left.left) || Node.isRed(this.left.right);
      }
      if (Node.isRed(this.right)) {
        return Node.isRed(this.right.left) || Node.isRed(this.right.right);
      }
    }
    return false;
  }

  shouldFix() {
    return Node.isBlack(this) && !this.right && !this.left;
  }

  fixRightViolation(fix: boolean): [Node<K, V>, boolean] {
    if (fix && this.left) {
      if (
        Node.isRed(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        return [
          this.setColor(Color.Black)
            .setLeft(this.left.setColor(Color.Red))
            .fixRedViolation()
            .setColor(Color.Black),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isRed(this.left) &&
        Node.isBlack(this.right) &&
        this.left.left &&
        this.left.right
      ) {
        const rotated = this.setLeft(this.left.rotateLeft()).rotateRight();
        return [
          rotated.setLeft(
            rotated.left
              .setColor(Color.Black)
              .setLeft(rotated.left.left.setColor(Color.Red))
              .fixRedViolation() // don't repaint it black for whatever reason
          ),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        const node = this.setLeft(this.left.setColor(Color.Red));
        return [
          node.fixRedViolation().setColor(Color.Black),
          !node.hasRedViolation()
        ];
      }
    }
    return [this, fix];
  }

  fixLeftViolation(fix: boolean): [Node<K, V>, boolean] {
    if (fix && this.right) {
      if (
        Node.isRed(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        return [
          this.setColor(Color.Black)
            .setRight(this.right.setColor(Color.Red))
            .fixRedViolation()
            .setColor(Color.Black),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isBlack(this.left) &&
        Node.isRed(this.right) &&
        this.right.left &&
        this.right.right
      ) {
        const rotated = this.setRight(this.right.rotateRight()).rotateLeft();
        return [
          rotated.setRight(
            rotated.right
              .setColor(Color.Black)
              .setRight(rotated.right.right.setColor(Color.Red))
              .fixRedViolation() // don't repaint it black for whatever reason
          ),
          false
        ];
      } else if (
        Node.isBlack(this) &&
        Node.isBlack(this.left) &&
        Node.isBlack(this.right)
      ) {
        const node = this.setRight(this.right.setColor(Color.Red));
        return [
          node.fixRedViolation().setColor(Color.Black),
          !node.hasRedViolation()
        ];
      }
    }
    return [this, fix];
  }

  removeMin(): [Node<K, V>, Node<K, V>, boolean] {
    if (!this.left && !this.right) {
      return [null, this, this.shouldFix()];
    } else if (!this.left) {
      return [this.right.setColor(this.color), this, this.right.shouldFix()];
    } else {
      const [replaced, minimum, fix] = this.left.removeMin();
      const [_replaced, _fix] = this.setLeft(replaced).fixLeftViolation(fix);
      return [_replaced, minimum, _fix];
    }
  }

  replaceWithSuccessor(): [Node<K, V>, boolean] {
    if (!this.right && !this.left) {
      return [null, this.shouldFix()];
    } else if (!this.right) {
      return [this.left.setColor(this.color), this.left.shouldFix()];
    } else {
      const [replaced, successor, fix] = this.right.removeMin();
      return this.setRight(replaced)
        .setValues(successor.values)
        .fixRightViolation(fix);
    }
  }
}
