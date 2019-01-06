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
* [[Symbol.Iterator]](#symbol.iterator])
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

Retuns an empty BinarySearchTree instance.

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

*More information*
* [General information and implementation](https://en.wikipedia.org/wiki/Binary_search_tree)

### asRedBlackTree
`public static asRedBlackTree<E>(
  comparator: Comparator<E>,
  equals?: Equals<E>
): SortedCollection<E>`

Retuns an empty RedBlackTree instance.

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

*More information*
* [General information](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree)
* [More general information](https://cs.gmu.edu/~kauffman/cs310/14-redblack-trees.pdf)
* [Visualization](https://www.cs.usfca.edu/~galles/visualization/RedBlack.html)
* [Implementation details](http://www.cs.middlebury.edu/~candrews/mhc/cs211/cs211_red-black%20trees2.pdf)
* [More implementation details](https://www.cs.tufts.edu/~nr/cs257/archive/chris-okasaki/redblack99.pdf)

## add
`public abstract add(element: E): SortedCollection<E>`

Adds an element to the collection and returns a new collection with these changes.

**Parameters**
* `element` - The element to be added to the collection.

**Returns**
* A new collection with the changes.

## remove
`public abstract remove(element: E): SortedCollection<E>`

Removes an element from collection and returns a new collection with these changes.

**Parameters**
* `element` - The element to be removed from the collection.

**Returns**
* A new collection with the changes.

## union
`public abstract union(collection: Iterable<E>): SortedCollection<E>`

Adds all the elements of an iterable to the collection and returns a new collection with these changes.

**Parameters**
* `collection` - The iterable with the elements to be added to the collection.

**Returns**
* A new collection with the changes.

## intersection
`public abstract intersection(collection: Iterable<E>): SortedCollection<E>`

Retains all the elements shared in common between the collection and an iterable and returns a new collection with these changes.

**Parameters**
* `collection` - The iterable with the elements to be retained from the collection.

**Returns**
* An new collection with the changes.

## except
`public abstract except(collection: Iterable<E>): SortedCollection<E>`

Removes all the elements of an iterable from the collection and returns a new collection with these changes.

**Parameters**
* `collection` - The iterable with the elements to be removed from the collection.

**Returns**
* An new collection with the changes.

## clear
`public abstract clear(): SortedCollection<E>`

Returns an emtpy collection.

**Returns**
* An empty collection.

## search
`public abstract search(element: E): Optional<E>`

Searches an element in the collection and returns it as an [Optional](/docs/Optional.md).

**Parameters**
* `element` - The element to be searched in the collection.

**Returns**
* An [Optional](/docs/Optional.md) element. If the element isn't found, then returns an empty [Optional](/docs/Optional.md).

## contains
## containsAll
## isEmpty
## size
## min
## max
## nth
## slice
## reverse
## toArray
## [Symbol.iterator]
## forEach
## filter
## map
## flatMap
## reduce
