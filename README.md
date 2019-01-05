# pareto-structs
A typescript data structure library for pareto optimization.

# Overview
* [SortedCollection](#SortedCollection)
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
  * filter
  * map
  * flatMap
  * reduce

# SortedCollection
`interface SortedCollection<E> extends Iterable<E>`
This interface represents an immutable sorted collection of objects. It may allow duplicate elements depending on the implementation.

Due to the fact that Typescript doesn't currently support higher kinded types all implementations updates return `SortedCollection<E>` instead of it's own type. This can be an inconvenience since it makes it imposible to access any of the implementation methods and attributes.
## add
`public add(element: E): SortedCollection<E>`
Adds an element to the collection and returns a new collection with these changes.
## remove
`public remove(element: E): SortedCollection<E>`
Removes an element from collection and returns a new collection with these changes.
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
