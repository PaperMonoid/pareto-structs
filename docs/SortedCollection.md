## [Index](/#documentation)
# SortedCollection
`interface SortedCollection<E> extends Iterable<E>`

This interface represents an immutable sorted collection of objects. It may allow duplicate elements depending on the implementation.

Due to the fact that Typescript doesn't currently support higher kinded types all implementations updates return `SortedCollection<E>` instead of it's own type. This can be an inconvenience since it makes it imposible to access any of the implementation methods and attributes.

## Overview
* [add](#add)
* [remove](#remove)
* union
* intersection
* except
* clear
* search
* next
* previous
* contains
* containsAll
* isEmpty
* size
* min
* max
* nth
* slice
* reverse
* toArray
* [Symbol.iterator]
* forEach
* [filter](#filter)
* [map](#map)
* [flatMap](#flatMap)
* reduce

## add
`public add(element: E): SortedCollection<E>`

Adds an element to the collection and returns a new collection with these changes.

#### Example
```typescript
console.log(collection.toArray()); // []

// adds 1 and returns a new collection
// the original collection doesn't change
collection.add(1);
console.log(collection.toArray()); // []

// adds 1 and returns a new collection
// replaces the old collection with the updated one
collection = collection.add(1);
console.log(collection.toArray()); // [1]

// adds 2, adds 1 and returns a new collection
// replaces the old collection with the updated one
collection = collection.add(2).add(1);
console.log(collection.toArray()); // [1, 2]
```
## remove
`public remove(element: E): SortedCollection<E>`

Removes an element from collection and returns a new collection with these changes.

#### Example
```typescript
console.log(collection.toArray()); // [1,2,3]

// removes 1 and returns a new collection
// the original collection doesn't change
collection.remove(1);
console.log(collection.toArray()); // [1,2,3]

// removes 1 and returns a new collection
// replaces the old collection with the updated one
collection = collection.remove(1);
console.log(collection.toArray()); // [2,3]

// removes 2, removes 1 and returns a new collection
// replaces the old collection with the updated one
collection = collection.remove(2).remove(1);
console.log(collection.toArray()); // [2, 1]
```
## union
## intersection
## except
## clear
## search
## next
## previous
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
