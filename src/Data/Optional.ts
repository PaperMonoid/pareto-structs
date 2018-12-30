import Consumer from "../Function/Consumer";
import Function from "../Function/Function";
import Predicate from "../Function/Predicate";

abstract class Optional<T> {
  public static empty<T>(): Optional<T> {
    return EmptyOptional.getInstance() as Optional<T>;
  }

  public static ofValue<T>(value: T): Optional<T> {
    return new PresentOptional<T>(value);
  }

  public static ofNullable<T>(value?: T): Optional<T> {
    return value ? Optional.ofValue(value) : Optional.empty();
  }

  public isEmpty(): boolean {
    return !this.isPresent();
  }

  public abstract getValue(): T;
  public abstract orValue(value: T): T;
  public abstract isPresent(): boolean;
  public abstract ifPresent(action: Consumer<T>): void;
  public abstract filter(predicate: Predicate<T>): Optional<T>;
  public abstract map<R>(mapper: Function<T, R>): Optional<R>;
  public abstract flatMap<R>(mapper: Function<T, Optional<R>>): Optional<R>;
}

class PresentOptional<T> extends Optional<T> {
  private value: T;

  constructor(value: T) {
    super();
    this.value = value;
  }

  public getValue(): T {
    return this.value;
  }

  public orValue(value: T): T {
    return this.value;
  }

  public isPresent(): boolean {
    return true;
  }

  public ifPresent(action: Consumer<T>): void {
    action(this.value);
  }

  public filter(predicate: Predicate<T>): Optional<T> {
    return predicate(this.value) ? this : Optional.empty();
  }

  public map<R>(mapper: Function<T, R>): Optional<R> {
    return new PresentOptional<R>(mapper(this.value));
  }

  public flatMap<R>(mapper: Function<T, Optional<R>>): Optional<R> {
    return mapper(this.value);
  }
}

class EmptyOptional<T> extends Optional<T> {
  private static instance: EmptyOptional<any>;

  constructor() {
    super();
  }

  public static getInstance(): EmptyOptional<any> {
    return (
      EmptyOptional.instance ||
      (EmptyOptional.instance = new EmptyOptional<any>())
    );
  }

  public getValue(): T {
    throw new ReferenceError("reference to undefined variable");
  }

  public orValue(value: T): T {
    return value;
  }

  public isPresent(): boolean {
    return false;
  }

  public ifPresent(action: Consumer<T>): void {}

  public filter(predicate: Predicate<T>): Optional<T> {
    return Optional.empty();
  }

  public map<R>(mapper: Function<T, R>): Optional<R> {
    return Optional.empty();
  }

  public flatMap<R>(mapper: Function<T, Optional<R>>): Optional<R> {
    return Optional.empty();
  }
}

export default Optional;
