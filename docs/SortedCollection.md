## [Index](/README.md#documentation)
# SortedCollection
`abstract class SortedCollection<E> implements Iterable<E>`

This abstract class represents an immutable sorted collection of objects. It may allow duplicate elements depending on the implementation.

Due to the fact that Typescript doesn't currently support higher kinded types all implementations updates return `SortedCollection<E>` instead of it's own type. This can be an inconvenience since it makes it imposible to access any of the implementation methods and attributes.

## Overview
* [Factory Methods](#factory-methods)
  * [asBinarySearchTree](#asbinarysearchtree)
  * [asRedBlackTree](#asredblacktree)
* [add](#add)
* [remove](#remove)
* [union](#union)
* [intersection](#intersection)
* [except](#except)
* [clear](#clear)
* [search](#search)
* [next](#next)
* [previous](#previous)
* [contains](#contains)
* [containsAll](#containsall)
* [isEmpty](#isempty)
* [size](#size)
* [min](#min)
* [max](#max)
* [nth](#nth)
* [slice](#slice)
* [reverse](#reverse)
* [toArray](#toarray)
* [[Symbol.Iterator]](#symboliterator)
* [forEach](#foreach)
* [filter](#filter)
* [map](#map)
* [flatMap](#flatmap)
* [reduce](#reduce)

## Factory Methods

### asBinarySearchTree
`public static asBinarySearchTree<E>(
  comparator: Comparator<E>,
  equals?: Equals<E>
): SortedCollection<E>`

Returns an empty BinarySearchTree instance.

**Type Parameters**
* `E` - The type of the elements of the collection.

**Parameters**
* `comparator` - The comparator function defines the sort order of the collection.
* `equals?` - The equality function defines if two objects are the same. If ommited, it uses strict equality (`===`) to test values.

**Returns**
* An empty BinarySearchTree.

**Notes**
* It allows duplicate elements.

**Example**
```typescript
import SortedCollection from "pareto-structs/SortedCollection";

function comparator(first: number, second: number) {
  return first - second;
}

function equals(first: number, second: number) {
  return first === second;
}

// using comparator.
const a = SortedCollection.asBinarySearchTree<number>(comparator);

// using comparator and equals.
const b = SortedCollection.asBinarySearchTree<number>(comparator, equals);
```

**Further reading**
* [Binary search tree](https://en.wikipedia.org/wiki/Binary_search_tree)

---

### asRedBlackTree
`public static asRedBlackTree<E>(
  comparator: Comparator<E>,
  equals?: Equals<E>
): SortedCollection<E>`

Returns an empty RedBlackTree instance.

**Type Parameters**
* `E` - The type of the elements of the collection

**Parameters**
* `comparator` - The comparator function defines the sort order of the collection.
* `equals?` - The equality function defines if two objects are the same. If ommited, it uses strict equality (`===`) to test values.

**Returns**
* An empty RedBlackTree.

**Notes**
* It allows duplicate elements.

**Example**
```typescript
import SortedCollection from "pareto-structs/SortedCollection";

function comparator(first: number, second: number) {
  return first - second;
}

function equals(first: number, second: number) {
  return first === second;
}

// using comparator.
const a = SortedCollection.asRedBlackTree<number>(comparator);

// using comparator and equals.
const b = SortedCollection.asRedBlackTree<number>(comparator, equals);
```

**Further reading**
* [Red–black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
* [Red/Black Tree](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)
* [CS 310: Red-Black trees](https://cs.gmu.edu/~kauffman/cs310/14-redblack-trees.pdf)
* [CS211 - Data Structures](http://www.cs.middlebury.edu/~candrews/mhc/cs211/cs211_red-black%20trees2.pdf)
* [FUNCTIONAL PEARLS Red-Black Trees in a Functional Setting](https://www.cs.tufts.edu/~nr/cs257/archive/chris-okasaki/redblack99.pdf)

---

## add
`public abstract add(element: E): SortedCollection<E>`

Adds an element to this collection and returns a new collection with these changes.

**Parameters**
* `element` - The element to be added to this collection.

**Returns**
* A new collection with the element.

---

## remove
`public abstract remove(element: E): SortedCollection<E>`

Removes an element from this collection and returns a new collection with these changes.

**Parameters**
* `element` - The element to be removed from this collection.

**Returns**
* A new collection without the element.

---

## union
`public abstract union(collection: Iterable<E>): SortedCollection<E>`

Adds all the elements of an iterable to this collection and returns a new collection with these changes.

**Parameters**
* `collection` - The iterable with the elements to be added to this collection.

**Returns**
* A new collection with the elements.

---

## intersection
`public abstract intersection(collection: Iterable<E>): SortedCollection<E>`

Retains all the elements shared in common between this collection and an iterable and returns a new collection with these changes.

**Parameters**
* `collection` - The iterable with the elements to be retained from this collection.

**Returns**
* An new collection with the elements shared in common.

---

## except
`public abstract except(collection: Iterable<E>): SortedCollection<E>`

Removes all the elements of an iterable from this collection and returns a new collection with these changes.

**Parameters**
* `collection` - The iterable with the elements to be removed from this collection.

**Returns**
* An new collection without the elements.

---

## clear
`public abstract clear(): SortedCollection<E>`

Returns an emtpy collection.

**Returns**
* An empty collection.

---

## search
`public abstract search(element: E): Optional<E>`

Searches an element in this collection and returns it as an [Optional](/docs/Optional.md).

**Parameters**
* `element` - The element to be searched in this collection.

**Returns**
* An [Optional](/docs/Optional.md) of the found element, otherwise returns an empty [Optional](/docs/Optional.md).

---

## contains
`public abstract contains(element: E): boolean`

Searches an element in this collection and returns true if the element is found.

**Parameters**
* `element` - The element to be searched in this collection.

**Returns**
* `true` if this collection contains the specified element.

---

## containsAll
`public abstract containsAll(collection: Iterable<E>): boolean`

Searches all the elements of an iterable in this collection and returns true if all the elements are found.

**Parameters**
* `collection` - The iterable with the elements to be searched in this collection.

**Returns**
* `true` if this collection contains all the elements.

---

## isEmpty
`public abstract isEmpty(): boolean`

Returns true if this collection has no elements.

**Returns**
* `true` if this collection is empty.

---

## size
`public abstract size(): number`

Returns the number of elements of this collection.

**Returns**
* The number of elements in this collection.

---

## min
`public abstract min(): Optional<E>`

Finds the first element in this collection and returns it as an [Optional](/docs/Optional.md).

**Returns**
* An [Optional](/docs/Optional.md) of the first element. If the collection is empty it returns an empty [Optional](/docs/Optional.md).

---

## max
`public abstract min(): Optional<E>`

Finds the last element in this collection and returns it as an [Optional](/docs/Optional.md).

**Returns**
* An [Optional](/docs/Optional.md) of the last element. If the collection is empty it returns an empty [Optional](/docs/Optional.md).

---

## nth
`public abstract nth(index: number): Optional<E>`

Searches an element by index in this collection and returns it as an [Optional](/docs/Optional.md).

**Parameters**
* `index` - The index of the element to be searched in this collection.

**Returns**
* An [Optional](/docs/Optional.md) of the found element, otherwise returns an empty [Optional](/docs/Optional.md).

---

## slice
`public abstract slice(lower?: number, upper?: number): SortedCollection<E>`

Returns a new collection with the elements of this collection starting from the lower index to the upper index.

**Parameters**
* `lower` - The lower index of the subset. If it's negative then it gets subtracted from the collection size.
* `upper` - The upper index of the subset. If it's negative then it gets subtracted from the collection size.

**Returns**
* A new collection of the elements of this collection starting from the lower index to the upper index.

---

## reverse
`public abstract reverse(): SortedCollection<E>`

Returns a new reversed collection with the elements of this collection.

**Returns**
* A new reversed collection with the elements of this collection.

**Notes**
* This method behaves the same way as [Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

---

## toArray
`public abstract toArray(): E[]`

Returns an array with the elements of this collection.

**Returns**
* An array with the elements of this collection.

---

## [Symbol.iterator]
`public abstract [Symbol.iterator](): Iterator<E>`

Returns an iterator with the elements of this collection.

**Returns**
* An iterator with the elements of this collection.

---

## forEach
`public abstract forEach(action: Consumer<E>): void`

Performs an action on each element of this collection.

**Parameters**
* `action` - The action to be performed with each element.

---

## filter
`public abstract filter(predicate: Predicate<E>): SortedCollection<E>`

Removes the elements of this collection on which the predicate matches false and returns a new collection with these changes.

**Parameters**
* `predicate` - The predicate function to test each element for removal.

**Returns**
* A new collection with the elements on which the predicate matches true.

---

## map
`public abstract map<R>(
	mapper: Function<E, R>,
	comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>`

Maps the elements of this collection and returns a new collection with these changes.

**Type Parameters**
* `R` - The type of the elements of the new collection.

**Parameters**
* `mapper` - The mapper function transforms an element from this collection to another type `R`.
* `comparator` - The comparator function defines the sort order of the new collection of type `R`.
* `equals?` - The equality function defines if two objects of type `R` are the same. If ommited, it uses strict equality (`===`) to test values.

**Returns**
* A new collection with the mapped elements.

---

## flatMap
`public abstract flatMap<R>(
    mapper: Function<E, Iterable<R>>,
    comparator: Comparator<R>,
    equals?: Equals<R>
  ): SortedCollection<R>`

Maps the elements of this collection and returns a new collection with these changes.

**Type Parameters**
* `R` - The type of the elements of the new collection.

**Parameters**
* `mapper` - The mapper function transforms an element from this collection to an iterable of elements of type `R`.
* `comparator` - The comparator function defines the sort order of the new collection of type `R`.
* `equals?` - The equality function defines if two objects of type `R` are the same. If ommited, it uses strict equality (`===`) to test values.

**Returns**
* A new collection with the mapped elements.

---

## reduce
`public abstract reduce<U>(identity: U, accumulator: BiFunction<U, E, U>): U`

Iterates over each element of this collection, accumulates a value and returns it.

**Type Parameters**
* `U` - The type of the accumulated value.

**Parameters**
* `identity` - The starting value of the accumulator.
* `accumulator` - The acumulator function defines how to accumulate each element with the accumulated value.

**Returns**
* The accumulated value.
