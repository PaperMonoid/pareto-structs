import Color from "./Color";

export default class Node<E> {
  public readonly element: E;
  public readonly color: Color;
  public readonly left: Node<E>;
  public readonly right: Node<E>;

  constructor(element: E, color: Color, left?: Node<E>, right?: Node<E>) {
    this.element = element;
    this.color = color;
    this.left = left;
    this.right = right;
  }

  public static isBlack(node: Node<any>): boolean {
    if (node) {
      return node.color == Color.Black;
    }
    return true;
  }

  public static isRed(node: Node<any>): boolean {
    if (node) {
      return node.color == Color.Red;
    }
    return false;
  }

  public setElement(element: E): Node<E> {
    return new Node<E>(element, this.color, this.left, this.right);
  }

  public setColor(color: Color): Node<E> {
    return new Node<E>(this.element, color, this.left, this.right);
  }

  public setLeft(node: Node<E>): Node<E> {
    return new Node<E>(this.element, this.color, node, this.right);
  }

  public setRight(node: Node<E>): Node<E> {
    return new Node<E>(this.element, this.color, this.left, node);
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

  public rotateRight(): Node<E> {
    if (!this.left) {
      return this;
    }
    return this.left.setRight(this.setLeft(this.left.right));
  }

  public rotateLeft(): Node<E> {
    if (!this.right) {
      return this;
    }
    return this.right.setLeft(this.setRight(this.right.left));
  }

  public fixRedViolation(): Node<E> {
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

  public hasRedViolation() {
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

  public shouldFix() {
    return Node.isBlack(this) && !this.right && !this.left;
  }

  public fixRightViolation(fix: boolean): [Node<E>, boolean] {
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

  public fixLeftViolation(fix: boolean): [Node<E>, boolean] {
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

  private removeMin(): [Node<E>, Node<E>, boolean] {
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

  public replaceWithSuccessor(): [Node<E>, boolean] {
    if (!this.right && !this.left) {
      return [null, this.shouldFix()];
    } else if (!this.right) {
      return [this.left.setColor(this.color), this.left.shouldFix()];
    } else {
      const [replaced, successor, fix] = this.right.removeMin();
      return this.setRight(replaced)
        .setElement(successor.element)
        .fixRightViolation(fix);
    }
  }
}
